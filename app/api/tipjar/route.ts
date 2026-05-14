// ============================================================
// API: POST /api/tipjar — Create Lightning invoice via Blink
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createInvoice } from '@/lib/blink/invoice'

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

    const invoice = await createInvoice({
      amount,
      mesaId,
      meseroId,
    })

    if (!invoice) {
      return NextResponse.json(
        { error: 'Error al crear invoice' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      invoice,
      lightningUrl: `lightning:${invoice}`,
    })
  } catch (error) {
    console.error('[TipJar API] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}