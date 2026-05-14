// ============================================================
// TROPICAL BACKGROUND — Textures: leaves, brick, neon
// ============================================================

'use client'

import { useTheme } from 'next-themes'

export function TropicalBackground({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const isNight = theme === 'dark'

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isNight
            ? 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #0A0A0A 100%)'
            : 'linear-gradient(135deg, #FFF8E7 0%, #FFF5D4 50%, #FFF8E7 100%)',
        }}
      />

      {/* Palm leaf overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-opacity duration-700"
        style={{
          backgroundImage: `url('/textures/palm-leaves.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
        }}
      />

      {/* Grain noise */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url('/textures/noise.png')`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Neon glow at night */}
      {isNight && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}