# 🌴 La Bianca Architecture Deep Dive

> **Estado:** Feature Complete - Ready for Testing & Deployment  
> **Stack:** Next.js 14 (App Router) · Supabase · Blink API · Tailwind/Framer Motion · Vercel

## 1. Visión General del Sistema
La Bianca es una plataforma SaaS multi-tenant diseñada para restaurantes que aceptan pagos Lightning Network. La arquitectura combina:
- **Next.js 14 App Router** para SSR/Edge rendering, rutas agrupadas `(public)` y `(dashboard)`, y API routes serverless.
- **Supabase** como base de datos relacional (PostgreSQL), autenticación, políticas RLS y suscripciones en tiempo real.
- **Blink API** como proveedor de infraestructura Lightning para generación de invoices, tracking de pagos y webhooks.
- **Sistema de Diseño "Tropical Luxe"** (`docs/DESIGN_SYSTEM.md`) que gobierna tokens de color, tipografía, modo día/noche automático y componentes accesibles.

## 2. Diagrama de Flujo de Datos [Cliente/Navegador]
↓ (HTTP/HTTPS, WS)
[Next.js Edge/Server] ←→ [Middleware: Resolución de Tenant]
↓ (REST/GraphQL) ↓ (Headers: x-tenant-id)
[Blink API (Lightning)] [Supabase (Postgres + Auth + RLS)]
↓ (Webhooks HMAC) ↑ (Realtime Subscriptions)
[Webhook Handler /api/webhooks/blink] → Actualiza estado de pago → Notifica UI
## 3. Estructura de Directorios (Alineada con `map.md`)
| Ruta | Propósito |
|------|-----------|
| `app/(public)/` | Rutas públicas: Home, Menú digital, Checkout rápido |
| `app/(dashboard)/` | Panel admin: Métricas, configuración, historial, gestión de mesa/mesero |
| `app/api/` | Endpoints serverless: webhooks, Blink proxy, health checks |
| `components/ui/` | Base design system (Radix + Tailwind) |
| `components/tipjar/` | Lógica UI/UX del tipjar, QR dinámico, estados de pago |
| `components/marketing/` | Landing, eventos, cards de menú |
| `components/dashboard/` | Tablas, formularios, gráficos, navegación admin |
| `lib/` | Clientes externos (`supabase.ts`, `blink.ts`), helpers de seguridad, formateo BTC |
| `hooks/` | Custom hooks: `useTenant()`, `useAutoTheme()`, `usePaymentState()`, `useSupabaseQuery()` |
| `config/` | Constantes, schema de variables de entorno (`env-schema.ts`), rutas |
| `middleware.ts` | Resolución de tenant por subdominio/ruta, inyección de headers, protección de rutas |

## 4. Modelo Multi-Tenant SaaS
- **Routing:** `middleware.ts` detecta `host` (ej: `restaurante.labianca.io`) o path `/dashboard/[slug]`. Extrae `tenant_id` y lo valida contra Supabase.
- **Aislamiento de Datos:** Todas las tablas de negocio incluyen `tenant_id UUID`. Las queries en `lib/` y Server Actions siempre filtran por `tenant_id`.
- **RLS (Row Level Security):** Políticas estrictas en Supabase: `USING (auth.jwt() ->> 'tenant_id' = tenant_id)`. El rol `service_role` solo se usa en webhooks/server-side.
- **Configuración por Tenant:** Tabla `tenant_settings` almacena tema, moneda base, comisión Lightning, horarios modo noche, y claves de webhook.

## 5. Integraciones Externas
| Servicio | Uso | Clave/Config |
|----------|-----|--------------|
| **Blink API** | Invoices Lightning, polling de estado, webhooks | `BLINK_API_KEY`, `BLINK_WEBHOOK_SECRET` |
| **Supabase** | DB, Auth, Realtime, Storage, RLS | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Vercel** | Hosting, Edge Functions, Cron Jobs, Analytics | `NEXT_PUBLIC_SITE_URL`, `VERCEL_ENV` |

## 6. Capa de Presentación & Tema
- Implementado con `next-themes` + hook `useAutoTheme()` (detección horaria ≥18h o <6h).
- Tokens de color, tipografía y efectos glassmorphism definidos en `docs/DESIGN_SYSTEM.md`.
- Animaciones (Framer Motion + CSS `@keyframes`) para transiciones día/noche, `lightning-strike` y `steam-rise`.
- Accesibilidad: Contraste ≥4.5:1, `aria-label` en iconos, focus visible con `outline-neon-cian`.

## 7. Despliegue & Entornos
- **Development:** `next dev`, Supabase local (`supabase start`), Blink testnet.
- **Staging/Production:** Vercel deployments, `VERCEL_ENV=staging|production`, variables inyectadas por entorno.
- **Validación de Entorno:** `config/env-schema.ts` (Zod) falla rápido si faltan claves críticas en startup.

## 8. Estado Actual & Próximas Fases
✅ **Completado:** Setup, Design System, Supabase, Blink, TipJar, QR, Webhooks, Dashboard layout, Day/Night, Responsive, TS safety.  
🔧 **En Progreso:** Auth flow, RBAC, Transaction History, CRUD Mesas/Meseros, Tests, Optimización, Pipeline CI/CD.  
🎯 **Roadmap:** Beta con restaurantes piloto, refinamiento multi-tenancy, analytics avanzado, i18n, métodos de pago adicionales.

> 📖 **Referencias:** `docs/DESIGN_SYSTEM.md` · `docs/PAYMENT_FLOW.md` · `docs/MULTI_TENANCY.md` · `middleware.ts` · `lib/supabase.ts`