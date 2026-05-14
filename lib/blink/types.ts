// ============================================================
// BLINK TYPES — TypeScript interfaces for Blink API responses
// ============================================================

// Invoice type from Blink GraphQL API
export interface BlinkInvoice {
  id: string
  paymentHash: string
  paymentRequest: string
  amount: number
  satoshis: number
  memo: string | null
  createdAt: string
  expiresAt: string
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED'
}

// Webhook event payload
export interface BlinkWebhookPayload {
  event: string
  data: {
    id: string
    payment_hash: string
    payment_request: string
    amount_msat: number
    status: string
    memo?: string
    metadata?: Record<string, unknown>
  }
  timestamp: string
  signature: string
}

// Internal transaction record
export interface TransactionRecord {
  id: string
  mesaId?: string
  meseroId?: string
  amountMXN: number
  amountBTC: string
  invoiceId: string
  lightningInvoice: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  paidAt?: string
}

// Customer-facing tip jar request
export interface TipJarRequest {
  amount: number
  currency: 'MXN' | 'USD'
  mesaId?: string
  meseroId?: string
  metadata?: Record<string, string>
}

// Price feed response
export interface PriceFeed {
  price: number
  currency: string
  timestamp: number
  source: string
}