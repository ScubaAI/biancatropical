// ============================================================
// SIDEBAR — Admin panel navigation
// ============================================================

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Receipt,
  CreditCard,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: Home },
  { href: '/dashboard/mesas', label: 'Mesas', icon: LayoutDashboard },
  { href: '/dashboard/meseros', label: 'Meseros', icon: Users },
  { href: '/dashboard/transacciones', label: 'Transacciones', icon: Receipt },
  { href: '/dashboard/ajustes', label: 'Ajustes', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
        {/* <Image src="/icons/logo-day.svg" width={28} height={28} alt="Logo" /> */}
        Panel Admin
      </h2>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}