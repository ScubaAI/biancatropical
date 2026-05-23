// ============================================================
// WEBHOOK VALIDATOR — Validate Blink webhook signatures (Updated Implementation)
// ============================================================

import { validateBlinkWebhook, WebhookValidationResult } from '@/lib/security/webhooks'

export interface WebhookVerificationResult {
  valid: boolean
  payload?: Record<string, unknown>
  error?: string
  tenantSlug?: string
  isDuplicate?: boolean
}

export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): Promise<WebhookVerificationResult> {
  // This is now a wrapper for the more secure implementation
  // For backward compatibility, we'll adapt the interface
  
  // Create a mock request object for the new validation function
  const mockRequest = {
    text: () => Promise.resolve(rawBody),
    headers: {
      get: (key: string) => {
        if (key.toLowerCase() === 'x-blink-signature' || key === 'X-Signature') {
          return signature
        }
        return null
      }
    } as Headers
  } as unknown as Request

  // Use the new secure validation
  const result = await validateBlinkWebhook(mockRequest as any)
  
  return {
    valid: result.isValid,
    error: result.error,
    tenantSlug: result.tenantSlug,
    isDuplicate: result.isDuplicate
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