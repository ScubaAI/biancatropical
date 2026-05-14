// ============================================================
// API: GET /api/qr — Generate QR code for mesa/mesero
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { generateQRPayload } from '@/lib/qr/generator'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const mesaId = searchParams.get('mesaId')
  const meseroId = searchParams.get('meseroId')

  if (!mesaId && !meseroId) {
    return NextResponse.json(
      { error: 'Se requiere mesaId o meseroId' },
      { status: 400 }
    )
  }

  try {
    const payload = generateQRPayload({
      mesaId: mesaId ?? undefined,
      meseroId: meseroId ?? undefined,
      businessId: 'la-bianca',
    })

    return NextResponse.json({
      success: true,
      data: payload,
      qrUrl: `${payload}`,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error generando QR' },
      { status: 500 }
    )
  }
}