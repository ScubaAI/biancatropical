// ============================================================
// DASHBOARD HOME — Ingresos, propinas, mesas
// ============================================================

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* <StatCard title="Ingresos hoy" value="$0 MXN" /> */}
        {/* <StatCard title="Propinas recibidas" value="0" /> */}
        {/* <StatCard title="Mesas activas" value="0" /> */}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Últimas transacciones</h2>
        {/* <TransactionTable /> */}
        <p className="text-muted-foreground text-center py-8">
          No hay transacciones recientes
        </p>
      </div>
    </div>
  )
}