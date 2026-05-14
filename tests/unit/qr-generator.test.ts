import { describe, it, expect } from 'vitest'
import { generateQRPayload, parseQRPayload } from '@/lib/qr/generator'

describe('QR Generator', () => {
  it('generates a valid QR payload URL', () => {
    const metadata = {
      mesaId: 'mesa-01',
      timestamp: Date.now(),
    }
    const payload = generateQRPayload(metadata)

    expect(payload).toContain('https://')
    expect(payload).toContain('mesa-01')
  })

  it('parses a QR payload back into metadata', () => {
    const original = { mesaId: 'mesa-05', timestamp: 1234567890 }
    const url = generateQRPayload(original)
    const parsed = parseQRPayload(url)

    expect(parsed).toMatchObject({ mesaId: 'mesa-05' })
  })

  it('handles standalone JSON input', () => {
    const json = JSON.stringify({ mesaId: 'mesa-99', timestamp: 0 })
    const parsed = parseQRPayload(json)

    expect(parsed).toMatchObject({ mesaId: 'mesa-99' })
  })
})