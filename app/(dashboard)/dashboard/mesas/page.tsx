// ============================================================
// MESAS MANAGEMENT — Table list and QR generation
// ============================================================

export default function MesasPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Mesas</h1>

      {/* Add Table button */}
      <div className="mb-6">
        {/* <Button>Agregar mesa</Button> */}
        <button className="btn-primary">Agregar mesa</button>
      </div>

      {/* Tables list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder: no mesas yet */}
        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
          <p>No hay mesas configuradas</p>
          <p className="text-sm mt-2">Crea tu primera mesa para empezar a aceptar propinas Lightning</p>
        </div>
      </div>

      {/* QR Generator section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Generar QRs para imprimir</h2>
        {/* <QRGenerator /> */}
      </div>
    </div>
  )
}