// ============================================================
// QR PARSER — Extract metadata from scanned QR
// ============================================================

import { QRMetadata } from './generator'

export interface ParsedQR {
  mesaNombre?: string
  meseroNombre?: string
  businessId?: string
  paymentUrl?: string
  rawData: QRMetadata | string
}

export function parseScannedQR(scannedData: string): ParsedQR {
  // Try to extract metadata from the raw scanned data
  const metadata = extractMetadata(scannedData)

  return {
    rawData: metadata,
    mesaNombre: metadata.mesaId ?? undefined,
    meseroNombre: metadata.meseroId ?? undefined,
    businessId: metadata.businessId ?? undefined,
    paymentUrl: typeof metadata === 'string' ? metadata : undefined,
  }
}

function extractMetadata(data: string): QRMetadata | string {
  try {
    const parsed = JSON.parse(data)
    if (parsed && typeof parsed === 'object') {
      return parsed
    }
  } catch {
    // Not JSON, return raw string
  }
  return data
}