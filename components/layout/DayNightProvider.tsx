'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface DayNightContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isNight: boolean;
}

const DayNightContext = createContext<DayNightContextType | undefined>(undefined);

export function DayNightProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('la-bianca-theme') as ThemeMode | null;
    const hour = new Date().getHours();

    const currentMode = saved || (hour >= 18 ? 'dark' : 'light');
    setIsNight(currentMode === 'dark');

    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('la-bianca-theme', newMode);
    document.documentElement.setAttribute('data-theme', newMode);
    setIsNight(newMode === 'dark');
  };

  return (
    <DayNightContext.Provider value={{ mode, setMode: handleSetMode, isNight }}>
      {children}
    </DayNightContext.Provider>
  );
}

export function useDayNight() {
  const context = useContext(DayNightContext);
  if (!context) throw new Error('useDayNight must be used within DayNightProvider');
  return context;
}