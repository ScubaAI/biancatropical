import { createHmac, timingSafeEqual } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

// ==========================================================
// 🔹 CONFIG & TYPES
// ==========================================================
const WEBHOOK_SECRET = process.env.BLINK_WEBHOOK_SECRET!;
const SIGNATURE_HEADER = process.env.BLINK_SIGNATURE_HEADER || 'x-blink-signature';
const MAX_PAYLOAD_BYTES = 15 * 1024; // 15KB limit

export interface WebhookEvent {
  id: string;
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface WebhookValidationResult {
  isValid: boolean;
  eventId?: string;
  tenantSlug?: string;
  error?: string;
  isDuplicate?: boolean;
}

// ==========================================================
// 🔹 HMAC VERIFICATION (Timing-Safe)
// ==========================================================
export function verifySignature(rawBody: string, signatureHeader: string): boolean {
  if (!WEBHOOK_SECRET || !signatureHeader) return false;

  const expectedPrefix = 'sha256=';
  if (!signatureHeader.startsWith(expectedPrefix)) return false;

  const provided = signatureHeader.slice(expectedPrefix.length);
  const expected = createHmac('sha256', WEBHOOK_SECRET).update(rawBody, 'utf8').digest('hex');

  // Pre-length check avoids timingSafeEqual crash on mismatched lengths
  if (provided.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(provided, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

// ==========================================================
// 🔹 IDEMPOTENCY (Supabase-backed)
// ==========================================================
const _getSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function checkIdempotency(eventId: string): Promise<boolean> {
  const { data, error } = await _getSupabase()
    .from('webhook_logs')
    .select('id')
    .eq('event_id', eventId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('[Webhook] Idempotency DB error:', error.message);
    return false;
  }

  return !!data;
}

export async function markProcessed(
  eventId: string,
  status: 'success' | 'failed' | 'duplicate',
  metadata?: Record<string, unknown>
): Promise<void> {
  const { error } = await _getSupabase()
    .from('webhook_logs')
    .insert({
      event_id: eventId,
      status,
      processed_at: new Date().toISOString(),
      metadata: metadata || {},
    });

  if (error) console.error('[Webhook] Failed to log processing:', error.message);
}

// ==========================================================
// 🔹 STRUCTURED LOGGING (Vercel/Logdrain Ready)
// ==========================================================
export function logWebhook(eventId: string, event: string, isValid: boolean, ip?: string) {
  const log = {
    ts: new Date().toISOString(),
    event_id: eventId,
    event,
    valid: isValid,
    ip: ip || 'unknown',
    level: isValid ? 'info' : 'warn',
  };

  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(log));
  } else {
    console.log(`[Webhook] ${log.level.toUpperCase()} | ${event} | ID: ${eventId}`);
  }
}

// ==========================================================
// 🔹 ORCHESTRATOR: Validate & Extract Context
// ==========================================================
export async function validateBlinkWebhook(request: NextRequest): Promise<WebhookValidationResult> {
  const rawBody = await request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return { isValid: false, error: 'Payload exceeds size limit' };
  }

  const signature = request.headers.get(SIGNATURE_HEADER) || '';
  if (!verifySignature(rawBody, signature)) {
    return { isValid: false, error: 'Invalid HMAC signature' };
  }

  let payload: WebhookEvent;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return { isValid: false, error: 'Malformed JSON payload' };
  }

  const { id: eventId, event, data } = payload;
  if (!eventId || !event) {
    return { isValid: false, error: 'Missing required fields: id or event' };
  }

  // Idempotency guard
  const isDuplicate = await checkIdempotency(eventId);
  if (isDuplicate) {
    logWebhook(eventId, event, true, request.headers.get('x-forwarded-for')?.split(',')[0]);
    return { isValid: true, eventId, isDuplicate: true, tenantSlug: data?.metadata?.tenant_slug as string };
  }

  // Extract tenant context (supports slug or direct ID from Blink metadata)
  const tenantSlug = (data?.metadata?.tenant_slug || data?.metadata?.tenant_id) as string | undefined;

  return { isValid: true, eventId, tenantSlug };
}

// ==========================================================
// 🔹 SECURE RESPONSE FACTORY
// ==========================================================
export function webhookResponse(status: 200 | 400 | 401 | 500, message: string) {
  return new Response(JSON.stringify({ success: status === 200, message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}