// ============================================================
// FEATURE FLAGS — SaaS module toggles
// ============================================================

export const FEATURE_FLAGS = {
  // Core features (always on)
  tipJar: true,
  qrGeneration: true,
  lightningPayments: true,

  // Premium features (tier-based)
  advancedAnalytics: false,
  multiLocation: false,
  customBranding: false,
  webhookIntegrations: false,
  apiAccess: false,

  // Experimental
  aiRecommendations: false,
  voiceOrdering: false,
  loyaltyProgram: false,
} as const

// Runtime feature flag checker
export function isFeatureEnabled(
  key: keyof typeof FEATURE_FLAGS
): boolean {
  // In production, this could be fetched from a remote config service
  // or read from environment variables per tenant
  return FEATURE_FLAGS[key]
}

// Feature flag middleware (for API routes)
export function requireFeature(feature: keyof typeof FEATURE_FLAGS) {
  return function (
    handler: (req: Request) => Response | Promise<Response>
  ) {
    return async function (req: Request) {
      if (!isFeatureEnabled(feature)) {
        return new Response(
          JSON.stringify({ error: 'Feature not available' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return handler(req)
    }
  }
}