// ============================================================
// API: POST /api/tipjar — Create Lightning invoice via Blink
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createLightningInvoice } from '@/lib/blink/invoice'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, mesaId, meseroId } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    // TODO: add authentication check
    // const user = await getCurrentUser(request)

    const memo = `Propina La Bianca Tropical ⚡${mesaId ? ` - Mesa ${mesaId}` : ''}${meseroId ? ` - Mesero ${meseroId}` : ''}`
    
    const result = await createLightningInvoice({
      amountSat: amount,
      memo,
    })

    if (!result.success || !result.paymentRequest) {
      return NextResponse.json(
        { error: result.error || 'Error al crear invoice' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      paymentRequest: result.paymentRequest,
      expiresAt: result.expiresAt,
      lightningUrl: `lightning:${result.paymentRequest}`,
    })
  } catch (error) {
    console.error('[TipJar API] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}