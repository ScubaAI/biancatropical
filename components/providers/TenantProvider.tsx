'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { TenantContext } from '@/lib/multi-tenant';

const TenantContextReact = createContext<TenantContext | null>(null);

interface TenantProviderProps {
  children: ReactNode;
  tenant: TenantContext;
}

export function TenantProvider({ children, tenant }: TenantProviderProps) {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sincronización segura del override de tema del tenant
  useEffect(() => {
    setMounted(true);
    
    if (tenant.theme_override === 'day') {
      setTheme('light');
    } else if (tenant.theme_override === 'night') {
      setTheme('dark');
    }
    // Si es 'auto', next-themes respeta la preferencia del sistema/usuario
  }, [tenant.theme_override, setTheme]);

  // Evitar hidratación mismatch en theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <TenantContextReact.Provider value={tenant}>
      {children}
    </TenantContextReact.Provider>
  );
}

// Hook seguro para consumo en componentes cliente
export function useTenant() {
  const context = useContext(TenantContextReact);
  if (!context) {
    throw new Error('useTenant() must be used within <TenantProvider>');
  }
  return context;
}
