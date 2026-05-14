// ============================================================
// API: POST /api/tipjar/webhook — Blink webhook receiver
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, parseWebhookEvent } from '@/lib/blink/webhook'

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('X-Signature') || ''

    // Verify webhook signature
    // TODO: uncomment when webhook secret is configured
    // const { valid, error } = await verifyWebhookSignature(
    //   rawBody,
    //   signature,
    //   process.env.BLINK_WEBHOOK_SECRET!
    // )
    // if (!valid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const payload = JSON.parse(rawBody)

    // Process the webhook event
    parseWebhookEvent(payload)

    // TODO: update transaction status in database
    // TODO: notify connected clients via WebSocket/SSE

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Error:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}