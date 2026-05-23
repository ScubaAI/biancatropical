// lib/multi-tenant.ts
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { unstable_cache } from 'next/cache';

// ==========================================================
// 🔹 TYPES
// ==========================================================
export interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  status: 'active' | 'suspended' | 'pending';
  blink_wallet_id: string | null;
  lightning_fee_bps: number; // Ej: 100 = 1%
  theme_override: 'day' | 'night' | 'auto';
  created_at: string;
}

export interface TenantContext extends TenantConfig {
  resolvedAt: number;
}

// ==========================================================
// 🔹 SERVER RESOLVER (Cached via Next.js Data Cache)
// ==========================================================
const _fetchTenantBySlug = async (slug: string): Promise<TenantConfig> => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('tenants')
    .select('id, slug, name, status, blink_wallet_id, lightning_fee_bps, theme_override, created_at')
    .eq('slug', slug)
    .single();

  if (error) throw new Error(`[TenantDB] ${error.message}`);
  if (!data) throw new Error(`[TenantDB] Tenant "${slug}" not found`);
  if (data.status !== 'active') throw new Error(`[TenantDB] Tenant "${slug}" is currently ${data.status}`);

  return data as TenantConfig;
};

// Cache por 5 min. Revalida explícitamente vía `revalidateTag('tenant-config')` al actualizar settings
export const resolveTenant = unstable_cache(_fetchTenantBySlug, ['tenant-resolve'], {
  revalidate: 300,
  tags: ['tenant-config'],
});

// ==========================================================
// 🔹 SERVER HELPERS
// ==========================================================
export async function getTenantContext(): Promise<TenantContext> {
  const h = headers();
  const slug = h.get('x-tenant-slug');

  if (!slug) {
    throw new Error('[TenantContext] Missing x-tenant-slug header. Check middleware.ts configuration.');
  }

  const config = await resolveTenant(slug);
  return { ...config, resolvedAt: Date.now() };
}

// Wrapper seguro para Server Actions / API Routes
export async function withTenantContext<T extends (...args: any[]) => Promise<any>>(
  handler: (ctx: TenantContext, ...args: Parameters<T>) => ReturnType<T>
) {
  return async (...args: Parameters<T>) => {
    const ctx = await getTenantContext();
    return handler(ctx, ...args);
  };
}

// ==========================================================
// 🔹 RLS & QUERY SCOPE HELPERS
// ==========================================================
/**
 * Aplica automáticamente `tenant_id` a queries Supabase.
 * Simple helper that adds tenant_id to query conditions.
 */
export function addTenantCondition<T extends Record<string, unknown>>(filters: Partial<T>, tenantId: string): Partial<T> {
  return { ...filters, tenant_id: tenantId };
}

/**
 * Extrae `tenant_id` del JWT para validación RLS manual (si usas auth de Supabase)
 */
export function extractTenantIdFromJwt(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.tenant_id || null;
  } catch {
    return null;
  }
}

// ==========================================================
// 🔹 CLIENT HOOK PATTERN (Para usar con React Context)
// ==========================================================
/*
  NOTA: Next.js App Router separa strictmente Server/Client.
  Para componentes cliente, crea un TenantProvider en app/layout.tsx:

  'use client';
  import { createContext, useContext } from 'react';
  import { TenantContext } from '@/lib/multi-tenant';

  const TenantContextReact = createContext<TenantContext | null>(null);
  export const TenantProvider = ({ children, tenant }: { children: React.ReactNode; tenant: TenantContext }) => (
    <TenantContextReact.Provider value={tenant}>{children}</TenantContextReact.Provider>
  );
  export const useTenant = () => {
    const ctx = useContext(TenantContextReact);
    if (!ctx) throw new Error('useTenant must be used within TenantProvider');
    return ctx;
  };
*/