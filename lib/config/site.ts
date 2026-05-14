// ============================================================
// SITE CONFIG — Business name, logo, colors
// ============================================================

export const SITE_CONFIG = {
  name: 'La Bianca',
  tagline: 'Sabor italiano · Pagos Lightning',
  description:
    'Restaurante La Bianca — Auténtica cocina italiana con sistema de propinas vía Bitcoin Lightning Network.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://la-bianca.com',
  logo: '/icons/logo-day.svg',
  logoDark: '/icons/logo-night.svg',
  favicon: '/icons/bitcoin-badge.svg',
} as const

export const BRANDING = {
  primaryColor: '#D4AF37', // Gold
  secondaryColor: '#2D5016', // Forest green
  accentColor: '#8B1A1A', // Deep red
  neonColor: '#39FF14', // Neon green
  bgLight: '#FFF8E7', // Warm cream
  bgDark: '#0A0A0A', // Midnight
} as const

export const CURRENCY_DEFAULT = 'MXN'
export const LANGUAGE_DEFAULT = 'es'