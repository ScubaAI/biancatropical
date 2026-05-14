// ============================================================
// SCRIPT: Generate QR codes in batch for printing
// ============================================================

// Usage: npx tsx scripts/generate-qr-batch.ts [--mesas 10] [--meseros 5]

const DEFAULT_MESAS = 10
const DEFAULT_MESEROS = 5

// TODO: implement actual PDF generation
// const PDFDocument = require('pdfkit')
// const fs = require('fs')

async function generateQRs() {
  const mesas = parseInt(process.argv[2]?.split('=')[1] || String(DEFAULT_MESAS))
  const meseros = parseInt(process.argv[3]?.split('=')[1] || String(DEFAULT_MESEROS))

  console.log(`Generating ${mesas} mesa QR codes and ${meseros} mesero QR codes...`)

  const outputDir = './public/qr-templates'

  // Generate mesa QR configs
  for (let i = 1; i <= mesas; i++) {
    const payload = JSON.stringify({
      mesaId: `mesa-${String(i).padStart(2, '0')}`,
      nombre: `Mesa ${i}`,
      timestamp: Date.now(),
    })
    console.log(`  Mesa ${i}: mesa-${String(i).padStart(2, '0')}`)
    // TODO: generate and save PDF
  }

  // Generate mesero QR configs
  for (let i = 1; i <= meseros; i++) {
    const payload = JSON.stringify({
      meseroId: `mesero-${String(i).padStart(2, '0')}`,
      nombre: `Mesero ${i}`,
      timestamp: Date.now(),
    })
    console.log(`  Mesero ${i}: mesero-${String(i).padStart(2, '0')}`)
    // TODO: generate and save PDF
  }

  console.log(`\n📄 QR code configs generated. Open in browser to print.`)
}

generateQRs().catch(console.error)