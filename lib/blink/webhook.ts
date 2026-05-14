// ============================================================
// WEBHOOK VALIDATOR — Validate Blink webhook signatures
// ============================================================

export interface WebhookVerificationResult {
  valid: boolean
  payload?: Record<string, unknown>
  error?: string
}

export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): Promise<WebhookVerificationResult> {
  // TODO: implement HMAC-SHA256 signature verification
  // Blink signs webhook payloads with a shared secret

  return {
    valid: true,
    payload: {},
  }
}

export function parseWebhookEvent(payload: Record<string, unknown>) {
  const eventType = payload['event'] as string

  switch (eventType) {
    case 'invoice.paid':
      // Handle successful payment
      console.log('[Webhook] Invoice paid:', payload)
      break
    case 'invoice.expired':
      // Handle expired invoice
      console.log('[Webhook] Invoice expired:', payload)
      break
    case 'invoice.created':
      // Handle invoice creation
      console.log('[Webhook] Invoice created:', payload)
      break
    default:
      console.log(`[Webhook] Unknown event: ${eventType}`)
  }
}