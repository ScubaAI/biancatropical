import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Día
        terracotta: '#E07A5F',
        terracota: '#E07A5F',
        jungle: '#3D5A51',
        'verde-selva': '#3D5A51',
        gold: '#D4AF37',
        dorado: '#D4AF37',
        cream: '#FAF7F2',
        // Noche
        neonPink: '#FF2E93',
        'neon-fucsia': '#FF2E93',
        neonCyan: '#00F5D4',
        'neon-cian': '#00F5D4',
        nightBg: '#0F0F1E',
        // Semánticos (mapeados vía CSS variables)
        bg: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        primary: 'var(--accent-primary)',
        secondary: 'var(--accent-secondary)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'monospace'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        'palm-sway': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'steam-rise': {
          '0%': { transform: 'translateY(0) scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'translateY(-20px) scale(1.1)', opacity: '0' },
        },
      },
      animation: {
        'palm-sway': 'palm-sway 4s ease-in-out infinite',
        'steam-rise': 'steam-rise 3s ease-out infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Lo manejaremos manualmente vía data-theme
};

export default config;