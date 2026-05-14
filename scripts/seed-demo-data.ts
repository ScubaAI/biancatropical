// ============================================================
// SCRIPT: Seed demo data for development
// ============================================================

// Usage: npx tsx scripts/seed-demo-data.ts

const demoData = {
  mesas: [
    { id: 'mesa-01', nombre: 'Mesa 1', capacidad: 4 },
    { id: 'mesa-02', nombre: 'Mesa 2', capacidad: 4 },
    { id: 'mesa-03', nombre: 'Mesa 3', capacidad: 2 },
    { id: 'mesa-04', nombre: 'Mesa 4', capacidad: 6 },
    { id: 'mesa-05', nombre: 'Mesa 5', capacidad: 4 },
  ],
  meseros: [
    { id: 'mesero-01', nombre: 'Carlos', wallet: 'LNbits_wallet_001' },
    { id: 'mesero-02', nombre: 'María', wallet: 'LNbits_wallet_002' },
    { id: 'mesero-03', nombre: 'Luis', wallet: 'LNbits_wallet_003' },
  ],
  transacciones: [
    { mesaId: 'mesa-01', meseroId: 'mesero-01', montoMXN: 150, montoBTC: '0.0000078', estado: 'completado' },
    { mesaId: 'mesa-03', meseroId: 'mesero-02', montoMXN: 80, montoBTC: '0.0000042', estado: 'completado' },
    { mesaId: 'mesa-02', meseroId: 'mesero-03', montoMXN: 220, montoBTC: '0.0000115', estado: 'pendiente' },
  ],
}

async function seed() {
  console.log('🌱 Seeding demo data...')

  // TODO: connect to Supabase DB and insert demo data
  console.log('Mesas:', demoData.mesas)
  console.log('Meseros:', demoData.meseros)
  console.log('Transacciones:', demoData.transacciones)

  console.log('\n✅ Demo data ready (database integration pending)')
}

seed().catch(console.error)