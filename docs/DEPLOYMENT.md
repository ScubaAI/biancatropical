# Deployment Guide — Vercel (SaaS Multi-Tenant)

## Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- Blink wallet configured (see [BLINK_SETUP.md](./BLINK_SETUP.md))

## Step 1: Import Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Import Project**
3. Connect your Git provider
4. Select the `la-bianca-bitcoin` repository

## Step 2: Configure Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables**:

### Production

| Variable | Type | Value |
|----------|------|-------|
| `NEXT_PUBLIC_BASE_URL` | System | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | System | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | System | Your Supabase anon key |
| `NEXT_PUBLIC_BLINK_GRAPHQL_URL` | System | Your Blink GraphQL endpoint |
| `BLINK_API_KEY` | Secret | Your Blink API key |
| `BLINK_WEBHOOK_SECRET` | Secret | Your webhook secret |
| `NODE_ENV` | System | `production` |

### Preview Deployments (auto-configured by Vercel)

Vercel automatically creates preview URLs for each PR with the same env vars.

## Step 3: Build & Deploy

```bash
# Local build test
npm run build

# Push to trigger CI/CD
git push origin main
```

## Step 4: Domain Configuration

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `laboutiquebitcoin.com`)
3. Configure DNS:
   - A record → `76.76.21.21` (Vercel)
   - AAAA record → `2606:4700:3030::6815:1956` (if IPv6)
   - CAA record → `0 issue "letsencrypt.org"`

## Multi-Tenant Architecture

For multiple restaurants:

1. **Database**: Each tenant has a unique `business_id` in all tables
2. **Authentication**: Supabase Row Level Security (RLS) by `business_id`
3. **Subdomains**: Use `{restaurant}.yourapp.com` routing
4. **Branding**: Per-tenant config in `lib/config/site.ts`

```ts
// Example: Dynamic tenant config
export function getTenantConfig(tenantId: string) {
  return {
    name: tenantId === 'la-bianca' ? 'La Bianca' : 'Other Restaurant',
    logo: `/${tenantId}/logo.svg`,
    colors: tenantConfigs[tenantId] ?? defaultConfig,
  }
}
```

## Scaling Considerations

| Component | Scaling Strategy |
|-----------|-----------------|
| Next.js | Vercel auto-scales |
| Lightning | Blink handles routing |
| Database | Supabase auto-scales |
| CDN | Vercel Edge Network |

## Monitoring

- **Vercel Analytics**: Built-in dashboard
- **Health Check**: `/api/health` endpoint
- **Error Tracking**: Configure Sentry (optional)
- **Uptime**: Configure external monitoring (e.g., Pingdom)