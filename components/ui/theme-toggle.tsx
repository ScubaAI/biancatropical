'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg glass-tropical hover:scale-105 transition-transform"
      aria-label={theme === 'day' ? 'Cambiar a modo noche' : 'Cambiar a modo día'}
    >
      {theme === 'day' ? (
        <Moon className="w-5 h-5 text-[var(--accent-primary)]" />
      ) : (
        <Sun className="w-5 h-5 text-[var(--accent-primary)]" />
      )}
    </button>
  );
}