// ============================================================
// QR GENERATOR — Generate QR with embedded metadata
// ============================================================

export interface QRMetadata {
  mesaId?: string
  meseroId?: string
  businessId?: string
  timestamp: number
}

export function generateQRPayload(metadata: QRMetadata): string {
  const payload = JSON.stringify({
    ...metadata,
    timestamp: metadata.timestamp ?? Date.now(),
  })

  // Encode as a URL that can be scanned by any QR reader
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://la-bianca.com'
  return `${baseUrl}/tipjar?data=${encodeURIComponent(payload)}`
}

export function parseQRPayload(qrData: string): QRMetadata | null {
  try {
    const url = new URL(qrData)
    const dataParam = url.searchParams.get('data')

    if (!dataParam) {
      // Try parsing as raw JSON
      return JSON.parse(qrData) as QRMetadata
    }

    return JSON.parse(decodeURIComponent(dataParam)) as QRMetadata
  } catch {
    return null
  }
}