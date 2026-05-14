// ============================================================
// NAVBAR — Responsive with logo colonial
// ============================================================

'use client'

import Link from 'next/link'
import { ThemeToggle } from '../ui/theme-toggle'

export function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between px-6 border-b">
      <Link href="/" className="flex items-center gap-2">
        {/* <Image src="/icons/logo-day.svg" alt="La Bianca" width={40} height={40} /> */}
        <span className="font-serif text-xl font-bold">La Bianca</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/menu" className="text-sm hover:text-gold transition-colors">
          Carta
        </Link>
        {/* <TipJar /> */}
        <ThemeToggle />
      </div>
    </nav>
  )
}