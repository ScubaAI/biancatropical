// ============================================================
// MIDDLEWARE HELPER FUNCTIONS — Extracted logic for tenant resolution and auth
// ============================================================

import { createClient } from '@/lib/supabase/client'
import type { NextRequest } from 'next/server'

/**
 * Extracts tenant slug from request using multiple strategies:
 * 1. Subdomain: tenant.labianca.io -> tenant
 * 2. Path: /dashboard/tenant/... -> tenant
 * 3. Header: X-Tenant-Slug: tenant
 */
export function getTenantSlugFromRequest(request: NextRequest): string | null {
  // Check header first (highest precedence for server-to-server)
  const headerSlug = request.headers.get('x-tenant-slug')
  if (headerSlug) {
    return decodeURIComponent(headerSlug)
  }

  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Strategy 1: Subdomain extraction
  // Handles: tenant.labianca.io, tenant.sub.labianca.io, tenant.localhost:3000
  const subdomainMatch = hostname.match(
    /^([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.(?:[a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,}(?::\d+)?$/
  )
  
  if (subdomainMatch && subdomainMatch[1]) {
    const potentialSlug = subdomainMatch[1]
    // Reject reserved subdomains
    const reservedSubdomains = ['www', 'api', 'admin', 'dashboard', 'login', 'signup', 'app']
    if (!reservedSubdomains.includes(potentialSlug.toLowerCase())) {
      return potentialSlug
    }
  }

  // Strategy 2: Path-based extraction for dashboard routes
  // Matches: /dashboard/tenant-slug/... or /tenant-slug/...
  const pathMatches = pathname.match(/(?:^\/dashboard\/|\/)([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])(?:\/|$)/)
  
  if (pathMatches && pathMatches[1]) {
    const potentialSlug = pathMatches[1]
    // Avoid mistaking static paths or route parameters for tenant slugs
    const falsePositives = ['dashboard', 'login', 'signup', 'api', 'static', 'favicon', 'sitemap', 'robots']
    if (!falsePositives.includes(potentialSlug.toLowerCase())) {
      return potentialSlug
    }
  }

  return null
}

/**
 * Validates tenant slug format
 * - 3-30 characters
 * - Starts and ends with alphanumeric
 * - Contains only alphanumeric and hyphens
 * - No consecutive hyphens
 */
export function isValidTenantSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false
  
  // Length check
  if (slug.length < 3 || slug.length > 30) return false
  
  // Format: alphanumeric, hyphens allowed in middle only, no consecutive hyphens
  const slugRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/
  const noConsecutiveHyphens = !/--/.test(slug)
  
  return slugRegex.test(slug) && noConsecutiveHyphens
}

/**
 * Retrieves tenant ID from slug using Supabase
 * Includes basic caching to prevent duplicate requests within same middleware execution
 */
const tenantCache = new Map<string, string | null>()

export async function getTenantIdBySlug(slug: string): Promise<string | null> {
  // Check cache first
  if (tenantCache.has(slug)) {
    return tenantCache.get(slug) ?? null
  }

  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching tenant by slug:', error)
      tenantCache.set(slug, null)
      return null
    }

    const tenantId = data?.id ?? null
    tenantCache.set(slug, tenantId)
    return tenantId
  } catch (error) {
    console.error('Exception in getTenantIdBySlug:', error)
    tenantCache.set(slug, null)
    return null
  }
}

/**
 * Authentication check using Supabase
 * Returns user object and authentication status
 */
export async function checkAuth(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error('Auth error:', error)
      return { isAuthenticated: false, user: null }
    }

    return {
      isAuthenticated: !!user,
      user: user ?? null,
    }
  } catch (error) {
    console.error('Exception in checkAuth:', error)
    return { isAuthenticated: false, user: null }
  }
}

// Clear cache on hot reload (in development)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  // @ts-ignore: global is available in Node.js
  if (global.__MIDDLEWARE_TENANT_CACHE__) {
    // @ts-ignore: global is available in Node.js
    global.__MIDDLEWARE_TENANT_CACHE__.clear()
  } else {
    // @ts-ignore: global is available in Node.js
    global.__MIDDLEWARE_TENANT_CACHE__ = tenantCache
  }
}