// ============================================================
// BLINK CONFIG — API endpoints and keys
// ============================================================

export const BLINK_CONFIG = {
  // GraphQL endpoint (replace with actual Blink wallet URL)
  graphqlUrl:
    process.env.NEXT_PUBLIC_BLINK_GRAPHQL_URL ||
    'https://your-blink-wallet.com/graphql',

  // API key for authentication (set in environment)
  apiKey: process.env.BLINK_API_KEY || '',

  // Webhook secret for signature verification
  webhookSecret: process.env.BLINK_WEBHOOK_SECRET || '',

  // Invoice expiration time (in seconds)
  invoiceExpirySeconds: 900, // 15 minutes

  // Default tip amount (in MXN)
  defaultTipAmount: 50,

  // Currency for invoices
  currency: 'MXN',

  // Fee reserve (percentage kept as platform fee)
  feeReservePercent: 0, // 0% for now, adjust for SaaS model
} as const

// Helper to check config validity
export function validateBlinkConfig() {
  const missing: string[] = []
  if (!BLINK_CONFIG.graphqlUrl?.includes('your-')) {
    // Valid URL check
  }
  if (!BLINK_CONFIG.apiKey) {
    missing.push('BLINK_API_KEY')
  }
  if (!BLINK_CONFIG.webhookSecret) {
    missing.push('BLINK_WEBHOOK_SECRET')
  }
  return missing
}