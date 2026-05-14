// ============================================================
// MESEROS MANAGEMENT — Waiters and wallet assignment
// ============================================================

export default function MeserosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Meseros</h1>

      {/* Add Waiter button */}
      <div className="mb-6">
        <button className="btn-primary">Registrar mesero</button>
      </div>

      {/* Waiters list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Nombre</th>
              <th className="text-left p-3">Wallet</th>
              <th className="text-left p-3">QR asignado</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-6 text-center text-muted-foreground">
                No hay meseros registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}