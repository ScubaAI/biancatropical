-- ============================================================
-- 🌴 La Bianca Bitcoin - Migration 001: Core Schema & RLS
-- ============================================================
-- Arquitectura: SaaS Multi-Tenant | Stack: Next.js 14 + Supabase + Blink
-- Alineado con: docs/ARCHITECTURE.md, docs/MULTI_TENANCY.md, DESIGN_SYSTEM.md
-- ============================================================

BEGIN;

-- 1️⃣ EXTENSIONS & HELPERS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trigger para actualizar `updated_at` automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2️⃣ ENUMS (Tipado estricto para consistencia TS ↔ DB)
CREATE TYPE tenant_status AS ENUM ('active', 'suspended', 'pending', 'archived');
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'waiter', 'support');
CREATE TYPE payment_provider AS ENUM ('blink', 'btcpay', 'lnbits', 'none');
CREATE TYPE theme_override AS ENUM ('day', 'night', 'auto');
CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'expired', 'failed', 'refunded');
CREATE TYPE booking_status AS ENUM ('pending_payment', 'confirmed', 'cancelled', 'no_show');
CREATE TYPE notification_type AS ENUM ('new_booking', 'payment_confirmed', 'payment_failed', 'system_alert');

-- 3️⃣ CORE TABLES
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9_-]{3,40}$'),
  name TEXT NOT NULL,
  status tenant_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tenant_settings (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  payment_provider payment_provider NOT NULL DEFAULT 'blink',
  lightning_fee_bps INTEGER NOT NULL DEFAULT 100, -- 100 = 1%
  theme_override theme_override NOT NULL DEFAULT 'auto',
  blink_api_key TEXT, -- ⚠️ En prod: usar Supabase Vault
  btcpay_config JSONB, -- store_id, api_key_encrypted, webhook_secret
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Perfiles de usuarios vinculados a Supabase Auth
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'manager',
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- 4️⃣ BUSINESS TABLES
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  blink_invoice_id TEXT UNIQUE,
  amount_sats INTEGER NOT NULL CHECK (amount_sats > 0),
  status invoice_status NOT NULL DEFAULT 'pending',
  payment_request TEXT,
  checkout_url TEXT,
  paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  event TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'duplicate')),
  payload_hash TEXT,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE TABLE dashboard_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  metadata JSONB DEFAULT '{}',
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- (Opcional, preparado para Cal.com integration)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  cal_booking_id BIGINT UNIQUE,
  btcpay_invoice_id TEXT,
  amount_sats INTEGER,
  status booking_status NOT NULL DEFAULT 'pending_payment',
  attendee_name TEXT,
  attendee_email TEXT,
  event_title TEXT,
  event_start TIMESTAMPTZ,
  event_end TIMESTAMPTZ,
  checkout_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5️⃣ INDEXES (Optimizados para queries frecuentes y webhooks)
CREATE INDEX idx_invoices_tenant_id ON invoices(tenant_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_created_desc ON invoices(created_at DESC);
CREATE INDEX idx_invoices_blink_id ON invoices(blink_invoice_id) WHERE blink_invoice_id IS NOT NULL;

CREATE INDEX idx_webhook_logs_event_id ON webhook_logs(event_id);
CREATE INDEX idx_webhook_logs_processed ON webhook_logs(processed_at DESC);

CREATE INDEX idx_notifications_tenant_unread ON dashboard_notifications(tenant_id, read) WHERE read = FALSE;
CREATE INDEX idx_bookings_tenant_status ON bookings(tenant_id, status);

-- 6️⃣ ROW LEVEL SECURITY (RLS) - Multi-Tenant Estricto
-- Habilitar RLS en todas las tablas
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Políticas por tabla
-- Tenants: Solo lectura para usuarios autenticados (filtrado por perfil)
CREATE POLICY "Users can view their tenant" ON tenants
  FOR SELECT USING (id IN (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

-- Tenant Settings: Acceso server-side vía service_role (RLS bypassed). Sin política para users.
-- (Se consulta desde Server Components/Actions con SUPABASE_SERVICE_ROLE_KEY)

-- User Profiles: Lectura por tenant, edición solo por owner
CREATE POLICY "Users can view profiles in their tenant" ON user_profiles
  FOR SELECT USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Owners can update profiles" ON user_profiles
  FOR UPDATE USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()) 
                    AND (SELECT role FROM user_profiles WHERE user_id = auth.uid()) = 'owner');

-- Invoices: Aislamiento estricto por tenant
CREATE POLICY "Tenant isolation: invoices SELECT" ON invoices
  FOR SELECT USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Tenant isolation: invoices INSERT/UPDATE" ON invoices
  FOR INSERT WITH CHECK (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Tenant isolation: invoices UPDATE" ON invoices
  FOR UPDATE USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

-- Webhook Logs: Solo service_role (bypass automático). Política explícita para auditoría.
CREATE POLICY "Service role only: webhook_logs" ON webhook_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Notifications: Lectura/escritura por tenant
CREATE POLICY "Tenant isolation: notifications" ON dashboard_notifications
  FOR ALL USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

-- Bookings: Aislamiento por tenant
CREATE POLICY "Tenant isolation: bookings" ON bookings
  FOR ALL USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid()));

-- 7️⃣ REALTIME (Supabase)
ALTER PUBLICATION supabase_realtime ADD TABLE invoices, dashboard_notifications, bookings;

-- 8️⃣ TRIGGERS (updated_at automático)
CREATE TRIGGER update_tenant_settings_updated_at
  BEFORE UPDATE ON tenant_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
