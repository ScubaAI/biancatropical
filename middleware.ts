// ============================================================
// ROOT MIDDLEWARE — Tenant resolution, authentication, and header injection
// ============================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTenantSlugFromRequest, isValidTenantSlug, getTenantIdBySlug } from './lib/auth/middlewareHelpers'
import { checkAuth } from './lib/auth/middlewareHelpers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Tenant resolution: extract slug from subdomain or path
  const slug = getTenantSlugFromRequest(request)
  
  // 2. Validate slug format
  if (slug !== null && !isValidTenantSlug(slug)) {
    // Invalid slug format - treat as no tenant
    return NextResponse.next()
  }

  // 3. Get tenant ID from slug (with caching)
  let tenantId: string | null = null
  if (slug !== null) {
    tenantId = await getTenantIdBySlug(slug)
  }

  // 4. Prepare response and inject headers
  const response = NextResponse.next()
  
  if (tenantId !== null && slug !== null) {
    response.headers.set('x-tenant-id', tenantId)
    response.headers.set('x-tenant-slug', slug)
  } else {
    // Clear headers if no valid tenant
    response.headers.delete('x-tenant-id')
    response.headers.delete('x-tenant-slug')
  }

  // 5. Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (slug === null) {
      // No tenant identified - redirect to public home or show error
      const homeUrl = new URL('/', request.url)
      return NextResponse.redirect(homeUrl)
    }

    if (tenantId === null) {
      // Tenant slug valid but not found in DB
      const notFoundUrl = new URL('/tenant-not-found', request.url)
      notFoundUrl.searchParams.set('slug', slug)
      return NextResponse.redirect(notFoundUrl)
    }

    // Check authentication
    const auth = await checkAuth(request)
    if (!auth.isAuthenticated) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      loginUrl.searchParams.set('tenantSlug', slug as string)
      return NextResponse.redirect(loginUrl)
    }

    // Optionally: add user info to headers for downstream
    if (auth.user) {
      const user = auth.user;
      response.headers.set('x-user-id', user.id)
      response.headers.set('x-user-email', user.email ?? '')
    }
  }

  return response
}

// Matcher: run on all routes except static assets, API routes (if they don't need tenant), and Next.js internals
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - api/* (API routes - adjust if your API needs tenant context)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/).*)',
  ],
}