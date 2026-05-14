// ============================================================
// DASHBOARD LAYOUT — Sidebar + Auth guard
// ============================================================

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        <h2 className="font-bold text-lg mb-6">Panel Admin</h2>
        {/* Sidebar navigation links */}
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-accent">
            Inicio
          </a>
          <a href="/dashboard/mesas" className="block px-3 py-2 rounded hover:bg-accent">
            Mesas
          </a>
          <a href="/dashboard/meseros" className="block px-3 py-2 rounded hover:bg-accent">
            Meseros
          </a>
          <a href="/dashboard/transacciones" className="block px-3 py-2 rounded hover:bg-accent">
            Transacciones
          </a>
          <a href="/dashboard/ajustes" className="block px-3 py-2 rounded hover:bg-accent">
            Ajustes
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {/* <AuthGuard /> */}
        {children}
      </main>
    </div>
  )
}