// ============================================================
// API: POST /api/tipjar/webhook — Blink webhook receiver
// ============================================================

import { NextRequest } from 'next/server'
import { validateBlinkWebhook, webhookResponse, markProcessed, logWebhook } from '@/lib/security/webhooks'
import { createClient } from '@supabase/supabase-js'
import { updateInvoiceStatus } from '@/lib/blink/webhookProcessor'

export async function POST(request: NextRequest) {
  // Validate webhook signature and extract context
  const validation = await validateBlinkWebhook(request);
  
  // If validation fails or eventId is missing, return error
  if (!validation.isValid || !validation.eventId) {
    const logEventId = validation.eventId ?? 'unknown';
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined;
    logWebhook(logEventId, 'unknown', false, ip);
    return webhookResponse(401, validation.error ?? 'Invalid webhook');
  }

  const eventId = validation.eventId; // Now known to be string
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined;

  // Handle duplicate webhooks (idempotency)
  if (validation.isDuplicate) {
    logWebhook(eventId, 'invoice.paid', true, ip);
    return webhookResponse(200, 'Duplicate webhook - already processed');
  }

  try {
    // Parse the payload to get invoice details
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    
    // Process based on event type
    if (payload.event === 'invoice.paid') {
      const invoiceId = payload.data?.invoice_id;
      
      if (invoiceId) {
        // Update invoice status in database
        await updateInvoiceStatus(invoiceId, 'paid');
        
        // Mark webhook as processed
        await markProcessed(eventId, 'success', { invoiceId });
        
        // Log successful processing
        logWebhook(eventId, 'invoice.paid', true, ip);
        
        return webhookResponse(200, 'Webhook processed successfully');
      }
    }
    
    // For other event types or if no invoice ID
    await markProcessed(eventId, 'success', { eventType: payload.event });
    logWebhook(eventId, payload.event, true, ip);
    
    return webhookResponse(200, 'Webhook received');
  } catch (error) {
    console.error('[Webhook] Processing error:', error);
    
    // Mark as failed
    await markProcessed(eventId, 'failed', { error: String(error) });
    
    logWebhook(eventId, 'unknown', false, ip);
    
    return webhookResponse(500, 'Internal server error');
  }
}