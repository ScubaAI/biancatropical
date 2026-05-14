// ============================================================
// HOOK: useTipJar — State management for tip jar
// ============================================================

'use client'

import { useState, useCallback } from 'react'
import { createBlinkInvoice } from '../../lib/blink/invoice'

export function useTipJar({
  mesaId,
  meseroId,
}: {
  mesaId?: string
  meseroId?: string
}) {
  const [amount, setAmount] = useState(0)
  const [invoice, setInvoice] = useState<string | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createInvoice = useCallback(async () => {
    if (amount <= 0) return

    setIsLoading(true)
    setError(null)

    try {
      // TODO: replace with real Blink API call
      const newInvoice = await createBlinkInvoice({
        amount,
        mesaId,
        meseroId,
      })
      setInvoice(newInvoice)
    } catch (e) {
      setError('Error al generar invoice')
    } finally {
      setIsLoading(false)
    }
  }, [amount, mesaId, meseroId])

  // TODO: add payment status polling / webhook listener

  return {
    amount,
    setAmount,
    invoice,
    isPaid,
    isLoading,
    error,
    createInvoice,
  }
}