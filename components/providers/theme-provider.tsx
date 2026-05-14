'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'day',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('day');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('la-bianca-theme');
    const now = new Date();
    const hour = now.getHours();

    // Lógica auto-switch 18:00 + persistencia manual
    const resolved = saved || (hour >= 18 ? 'night' : 'day');
    setTheme(resolved as Theme);
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'day' ? 'night' : 'day';
    setTheme(next);
    localStorage.setItem('la-bianca-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  // Evita hydration mismatch
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}