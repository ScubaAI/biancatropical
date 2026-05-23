# 🏦 Multi-Tenancy Documentation: SaaS Architecture for Restaurants

> Explica el modelo multi-tenant de La Bianca, incluyendo resolución de tenant, aislamiento de datos, RLS y configuración por establecimiento.  
> **Stack:** Next.js Middleware · Supabase (PostgreSQL + Auth + RLS) · **Estado:** Implementado parcialmente

## 1. Visión General
La Bianca opera como una plataforma Software-as-a-Service (SaaS) donde cada restaurante es un "tenant" independiente con su propia configuración, datos y branding, pero compartiendo la misma instancia de la aplicación.

Los tenants representan restaurantes individuales que utilizan la plataforma para recibir propinas vía Lightning Network.

## 2. Resolución de Tenant

### 2.1. Middleware (`middleware.ts`)
El middleware es responsable de identificar al tenant para cada request y inyectar el `tenant_id` en los headers o en la request para uso downstream.

#### Estrategias de Identificación:
1. **Subdominio:** `restaurante.labianca.io` → extrae `restaurante` como slug/tenant
2. **Path basado:** `/dashboard/[tenantSlug]/...` → extrae `tenantSlug` de la URL
3. **Header personalizado:** `X-Tenant-ID` (para llamadas server-to-server o testing)

#### Flujo:
```
Request → middleware.ts
    ↓
    [Extraer host o path]
    ↓
    [Buscar en tabla `tenants` por slug o dominio]
    ↓
    [Si existe: inyectar tenant_id en request.headers]
    ↓
    [Continuar a route handler o página]
```

### 2.2. Utilidad `useTenant()` Hook
Disponible en `hooks/useTenant.ts` para componentes que necesitan conocer el tenant actual:
- En client-side: lee del contexto o de una cookie establecida por middleware
- En server-side: puede leer directamente de headers

## 3. Modelo de Datos y Aislamiento

### 3.1. Tabla Principal de Tenants (`tenants`)
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL, -- Nombre del restaurante
slug TEXT UNIQUE NOT NULL, -- Usado en URLs: restaurante.labianca.io o /dashboard/restaurante
domain TEXT, -- Dominio personalizado opcional (ej: tacoselgato.com)
created_at TIMESTAMPTZ DEFAULT now(),
updated_at TIMESTAMPTZ DEFAULT now(),
settings JSONB, -- Almacena configuración flexible (tema, moneda, etc.)
is_active BOOLEAN DEFAULT true,
contact_email TEXT,
phone_number TEXT,
address JSONB -- Dirección completa del restaurante
```

### 3.2. Aislamiento de Datos
Todas las tablas de negocio incluyen una columna `tenant_id` que referencia a `tenants(id)`:

**Ejemplo: tabla `invoices`**
```sql
id UUID PRIMARY KEY,
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
blink_invoice_id TEXT UNIQUE,
amount_sat INTEGER NOT NULL,
memo TEXT,
status TEXT DEFAULT 'pending',
created_at TIMESTAMPTZ DEFAULT now(),
paid_at TIMESTAMPTZ NULL,
-- ... otros campos
```

### 3.3. Consultas Siempre Filtradas por Tenant
Todas las funciones en `lib/` y Server Actions incluyen automáticamente `WHERE tenant_id = $1` o equivalente.

**Ejemplo en `lib/supabase.ts`:**
```typescript
// Función helper que automáticamente agrega filtro de tenant
export async function getTenantData<T>(table: string, tenantId: UUID) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('tenant_id', tenantId);
  
  return { data, error };
}
```

## 4. Row Level Security (RLS) en Supabase

### 4.1. Políticas Generales
Se aplican políticas RLS estrictas en todas las tablas de negocio para garantizar que los usuarios solo puedan acceder a sus propios datos.

**Ejemplo de política para tabla `invoices`:**
```sql
-- Política SELECT: usuarios solo ven sus propias invoices
CREATE POLICY "Users can view own invoices" ON invoices
FOR SELECT USING (
  auth.jwt() ->> 'tenant_id' = tenant_id::text
);

-- Política INSERT: solo pueden crear invoices para su tenant
CREATE POLICY "Users can insert own invoices" ON invoices
FOR INSERT WITH CHECK (
  auth.jwt() ->> 'tenant_id' = tenant_id::text
);

-- Similar para UPDATE y DELETE
```

### 4.2. Roles y Permisos
- **`anon` / `authenticated`:** Usuarios finales (meseros, administradores de restaurante) - restringidos por RLS
- **`service_role`:** Usado únicamente en webhooks y operaciones server-side confiables (bypassa RLS cuando es necesario)
- **Panel de control:** Los administradores de plataforma pueden acceder a todos los tenants para supervisión, pero esto se hace mediante llamadas explícitas sin RLS (usando service_role o filtrando manualmente)

## 5. Configuración por Tenant

### 5.1. Tabla `tenant_settings`
Almacena configuración específica que puede variar por restaurante:
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
theme JSONB, -- Configuración de tema Tropical Luxe (colores, modo noche, etc.)
currency_base TEXT DEFAULT 'MXN', -- Moneda para mostrar precios
lightning_fee_percent INTEGER DEFAULT 0, -- Comisión que el restaurante quiere agregar
auto_night_mode BOOLEAN DEFAULT true, -- Activar modo noche automático
night_start_hour INTEGER DEFAULT 18, -- Hora de inicio (18 = 6pm)
night_end_hour INTEGER DEFAULT 6, -- Hora de fin (6 = 6am)
webhook_secret TEXT, -- Secreto único para validar webhooks de Blink
notification_preferences JSONB, -- Email, SMS, etc.
created_at TIMESTAMPTZ DEFAULT now(),
updated_at TIMESTamptz DEFAULT now()
```

### 5.2. Acceso a Configuración
Funciones en `lib/config/` que obtienen la configuración actual del tenant:
```typescript
export async function getTenantSettings(tenantId: UUID) {
  const { data, error } = await supabase
    .from('tenant_settings')
    .select('*')
    .eq('tenant_id', tenantId)
    .single();
    
  return { data: data ?? defaultSettings, error };
}
```

## 6. Flujo de Autenticación Multi-Tenant

### 6.1. Registro de Nuevo Tenant
1. Usuario se registra vía `/signup` (público)
2. Se crea registro en `tenants` con estado pendiente
3. Se envía email de verificación
4. Tras verificación, se crea configuración por defecto en `tenant_settings`
5. Se provisiona subdominio o se instruye para usar path-based access

### 6.2. Inicio de Sesión
1. Usuario ingresa credenciales en `/login`
2. Supabase Auth valida credenciales
3. El JWT incluye `tenant_id` claim (agregado vía middleware o claim personalizado)
4. Middleware verifica que el `tenant_id` del JWT coincida con el tenant solicitado
5. Sesión establecida

### 6.3. Acceso a Panel de Admin
- URL: `/dashboard/[tenantSlug]/...`
- Middleware valida que el `tenantSlug` corresponde al `tenant_id` del usuario autenticado
- Si no coincide → redirección a acceso denegado o home

## 7. Consideraciones de Escalabilidad

### 7.1. Base de Datos
- Todas las tablas índizadas por `tenant_id` para consultas eficientes
- Posible particionamiento futuro por ranges de `tenant_id` si crece mucho
- Read replicas para consultas analíticas (reportes, dashboard de plataforma)

### 7.2. Caching
- Configuración de tenant cacheada en Redis o en memoria (con invalidación)
- Queries públicas (menú, información del restaurante) pueden cachear por tenant

### 7.3. Límites y Cuotas
- Posible implementación de límites por tenant (número de mesas, meseros, invoices/mes)
- Sistema de facturación basado en uso o suscripción mensual

## 8. Operaciones y Mantenimiento

### 8.1. Onboarding de Nuevos Tenants
- API pública o interfaz de administración para crear nuevos restaurantes
- Scripts de provisionamiento para crear DNS, configurar dominios, enviar credenciales

### 8.2. Backup y Recuperación
- Backups regulares de Supabase incluyen todos los tenants
- Estrategia de recuperación punto-en- tiempo disponible
- Posible export/import individual de tenant para migración

### 8.3. Monitoreo
- Métricas por tenant: invoices creados, pagos exitosos, usuarios activos
- Alertas por actividad inusual (picos de facturación, intentos de acceso no autorizado)
- Dashboard de plataforma que muestra salud general y por tenant

## 9. Seguridad y Privacidad

### 9.1. Isolation Garantizada
- RLS evita fugas de datos entre tenants incluso si hay vulnerabilidades en aplicación
- Cada tenant tiene su propia configuración de webhook secret para Blink
- Los datos de pago (aunque limitados) están aislados por tenant

### 9.2. Cumplimiento
- Posible adaptación para GDPR/CCPA mediante funciones de exportación y eliminación de datos por tenant
- Registro de accesos sensibles (audit logging)

## 10. Próximas Mejoras

- [ ] Sistema de dominios personalizados con validación automática de DNS
- [ ] Marketplace de temas/plugins extensibles por tenant
- [ ] Analítica cruzada (con permiso) para benchmarking anónimo
- [ ] Sistema de invitaciones de equipo con roles granulares por tenant
- [ ] White-label completo: capacidad de remover toda referencia a La Bianca
- [ ] Migración simplificada de datos entre tenants (para fusiónes de negocios)
- [ ] Sistema de versiones de configuración por tenant (rollback de cambios)

> 📖 **Referencias:** `docs/ARCHITECTURE.md` · `middleware.ts` · `lib/supabase.ts` · `docs/DESIGN_SYSTEM.md` · Supabase RLS documentation