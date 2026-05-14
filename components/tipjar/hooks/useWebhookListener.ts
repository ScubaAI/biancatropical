// ============================================================
// HOOK: useWebhookListener — Listen for Blink webhook events
// ============================================================

'use client'

import { useEffect, useState } from 'react'

interface WebhookEvent {
  type: 'invoice.paid' | 'invoice.expired' | 'invoice.created'
  invoice: string
  amount: number
  metadata?: Record<string, string>
}

export function useWebhookListener(mesaId?: string) {
  const [events, setEvents] = useState<WebhookEvent[]>([])
  const [lastEvent, setLastEvent] = useState<WebhookEvent | null>(null)

  useEffect(() => {
    // TODO: implement SSE or WebSocket connection to /api/tipjar/webhook
    // For now, this is a placeholder that would be replaced with:
    // - EventSource (SSE)
    // - or a polling mechanism
    // - or a Pusher/Socket.io connection

    console.log(`[useWebhookListener] Listening for mesa: ${mesaId}`)

    return () => {
      // Cleanup connection
    }
  }, [mesaId])

  return { events, lastEvent }
}