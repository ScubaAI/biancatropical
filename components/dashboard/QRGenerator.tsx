// ============================================================
// QR GENERATOR — Visual QR generator for printing
// ============================================================

'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export function QRGenerator() {
  const [mesas, setMesas] = useState([
    { id: 'mesa-01', nombre: 'Mesa 1', url: '' },
    { id: 'mesa-02', nombre: 'Mesa 2', url: '' },
    { id: 'mesa-03', nombre: 'Mesa 3', url: '' },
  ])

  // TODO: generate real QR data with encoded metadata
  const generateQRData = (mesaId: string, nombre: string) => {
    const payload = JSON.stringify({ mesaId, nombre })
    return `https://la-bianca.com/tipjar?data=${encodeURIComponent(payload)}`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mesas.map((mesa) => (
          <div key={mesa.id} className="border rounded-lg p-4 text-center">
            <h3 className="text-sm font-semibold mb-2">{mesa.nombre}</h3>
            <div className="flex justify-center mb-2">
              <QRCodeSVG
                value={generateQRData(mesa.id, mesa.nombre)}
                size={120}
                level="H"
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{mesa.id}</p>
            <button className="mt-2 text-sm text-gold hover:underline">
              Imprimir
            </button>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
        <p>💡 Imprime cada QR y colócalo en la mesa correspondiente. Los clientes escanean para dejar propina vía Lightning.</p>
      </div>
    </div>
  )
}