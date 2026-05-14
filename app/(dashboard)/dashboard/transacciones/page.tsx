// ============================================================
// TRANSACCIONES — Lightning payment history
// ============================================================

export default function TransaccionesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Transacciones Lightning</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          className="border rounded px-3 py-2"
          placeholder="Desde"
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          placeholder="Hasta"
        />
        {/* <Button>Filtrar</Button> */}
        <button className="btn-primary">Filtrar</button>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Fecha</th>
              <th className="text-left p-3">Mesa / Mesero</th>
              <th className="text-left p-3">Monto (MXN)</th>
              <th className="text-left p-3">Monto (BTC)</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="p-6 text-center text-muted-foreground">
                No hay transacciones registradas
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}