// ============================================================
// HOOK: useWebSocket — Optional real-time connection
// ============================================================

'use client'

import { useEffect, useRef, useState } from 'react'

interface WebSocketMessage {
  type: string
  data: unknown
}

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [error, setError] = useState<Event | null>(null)

  useEffect(() => {
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => setIsConnected(true)
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setMessages((prev) => [...prev, { type: 'message', data }])
      } catch {
        // Non-JSON message
      }
    }
    ws.onerror = (e) => setError(e)
    ws.onclose = () => setIsConnected(false)

    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])

  return { isConnected, messages, error, sendMessage }
}