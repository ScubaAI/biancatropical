// ============================================================
// QR PRINTER — Generate printable PDF for QR codes
// ============================================================

export interface QRPrintOptions {
  mesaNombre: string
  mesaId: string
  businessName: string
  logoUrl?: string
}

export function generateQRPrintHTML(options: QRPrintOptions): string {
  // TODO: generate full HTML for PDF printing
  // Use libraries like @react-pdf/renderer or html-pdf
  return `
    <div style="text-align: center; padding: 20px;">
      <h2>${options.businessName}</h2>
      <h3>Mesa: ${options.mesaNombre}</h3>
      <p>Escanea para dejar propina ⚡</p>
      <!-- QR code placeholder -->
      <div style="margin-top: 20px;">QR_CODE_HERE</div>
      <p style="font-size: 12px; color: #999; margin-top: 10px;">
        Powered by Acepta Bitcoin
      </p>
    </div>
  `
}

export async function generateQRPrintPDF(options: QRPrintOptions): Promise<Buffer> {
  // TODO: implement PDF generation
  // Libraries: @react-pdf/renderer, pdfkit, puppeteer
  return Buffer.from([])
}