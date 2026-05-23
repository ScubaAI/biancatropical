// lib/blink/webhookProcessor.ts
import { createClient } from '@supabase/supabase-js';

// Define the invoice type for better type safety
interface Invoice {
  id: string;
  tenant_id: string;
  status: string;
  blink_invoice_id?: string;
  paid_at?: string | null;
  metadata?: Record<string, unknown>;
  // Add other fields as needed
}

/**
 * Updates invoice status in database with tenant scoping for RLS compliance
 * Should be called from webhook handlers after validation
 */
export async function updateInvoiceStatus(
  blinkInvoiceId: string,
  status: 'paid' | 'failed' | 'expired',
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    // Create Supabase client with service role for webhook processing
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // First, get the invoice to verify it exists and get tenant_id
    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('id, tenant_id, status, metadata')
      .eq('blink_invoice_id', blinkInvoiceId)
      .single<Invoice>();

    if (fetchError) {
      throw new Error(`Failed to fetch invoice: ${fetchError.message}`);
    }

    if (!invoice) {
      throw new Error(`Invoice with blink_invoice_id ${blinkInvoiceId} not found`);
    }

    // Create a regular Supabase client but add tenant_id condition manually
    // Since we're using service role, we bypass RLS but still need to scope to tenant
    const updateData: Record<string, unknown> = {
      status,
      paid_at: status === 'paid' ? new Date().toISOString() : null,
    };

    // Merge metadata if provided
    if (metadata && invoice.metadata) {
      updateData.metadata = { ...invoice.metadata, ...metadata };
    } else if (metadata) {
      updateData.metadata = metadata;
    }

    // Update invoice status with tenant_id condition
    const { error: updateError } = await supabase
      .from('invoices')
      .update(updateData)
      .eq('id', invoice.id)
      .eq('tenant_id', invoice.tenant_id);

    if (updateError) {
      throw new Error(`Failed to update invoice: ${updateError.message}`);
    }

  } catch (error) {
    console.error('[WebhookProcessor] Error updating invoice status:', error);
    throw error;
  }
}