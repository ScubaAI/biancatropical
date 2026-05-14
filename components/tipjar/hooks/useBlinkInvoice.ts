// ============================================================
// HOOK: useBlinkInvoice — Create invoice via Blink GraphQL
// ============================================================

'use client'

import { useCallback } from 'react'
import { createInvoice } from '../../lib/blink/invoice'

export function useBlinkInvoice() {
  const createBlinkInvoice = useCallback(async ({
    amount,
    mesaId,
    meseroId,
    currency = 'MXN',
  }: {
    amount: number
    mesaId?: string
    meseroId?: string
    currency?: string
  }): Promise<string | null> => {
    try {
      // TODO: implement actual Blink GraphQL mutation
      // const { data } = await blinkClient.mutate({ ... })
      const invoice = await createInvoice({
        amount,
        metadata: {
          mesaId: mesaId ?? 'unknown',
          meseroId: meseroId ?? 'unknown',
          currency,
        },
      })
      return invoice
    } catch (error) {
      console.error('Blink invoice error:', error)
      return null
    }
  }, [])

  return { createBlinkInvoice }
}