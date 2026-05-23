// ============================================================
// HOOK: useBlinkInvoice (Deprecated)
// ============================================================

'use client'

/**
 * @deprecated Use useLightningInvoice instead for a secure client-server flow.
 */
export function useBlinkInvoice() {
  return {
    createBlinkInvoice: async () => {
      console.warn('useBlinkInvoice is deprecated. Please use useLightningInvoice.');
      return null;
    }
  }
}