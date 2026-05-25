// ============================================================
// DASHBOARD LAYOUT — Sidebar + Auth guard + Tenant Provider
// ============================================================

import { getTenantContext } from '@/lib/multi-tenant';
import { TenantProvider } from '@/components/providers/TenantProvider';
import { ThemeProvider } from 'next-themes';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getTenantContext(); // Resuelve desde headers → Supabase (cached)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TenantProvider tenant={tenant}>
        <div className="flex min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F1E] text-[#2C2419] dark:text-white transition-colors duration-500">
          {/* Sidebar */}
          <aside className="w-64 border-r border-terracota/20 dark:border-neon-cian/20 bg-white/70 dark:bg-[#0F0F1E]/70 backdrop-blur-xl p-4 hidden md:block transition-all duration-300">
            <h2 className="font-playfair font-bold text-xl mb-6 text-[#2C2419] dark:text-dorado">Panel Admin</h2>
            {/* Navigation links */}
            <nav className="space-y-2 font-montserrat">
              <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-terracota/10 dark:hover:bg-neon-cian/10 transition-colors">
                Inicio
              </a>
              <a href="/dashboard/mesas" className="block px-3 py-2 rounded hover:bg-terracota/10 dark:hover:bg-neon-cian/10 transition-colors">
                Mesas
              </a>
              <a href="/dashboard/meseros" className="block px-3 py-2 rounded hover:bg-terracota/10 dark:hover:bg-neon-cian/10 transition-colors">
                Meseros
              </a>
              <a href="/dashboard/transacciones" className="block px-3 py-2 rounded hover:bg-terracota/10 dark:hover:bg-neon-cian/10 transition-colors">
                Transacciones
              </a>
              <a href="/dashboard/ajustes" className="block px-3 py-2 rounded hover:bg-terracota/10 dark:hover:bg-neon-cian/10 transition-colors font-semibold">
                Ajustes
              </a>
            </nav>
          </aside>

          <main className="flex-1 p-8">
            {/* Contenido principal */}
            {children}
          </main>
        </div>
      </TenantProvider>
    </ThemeProvider>
  );
}