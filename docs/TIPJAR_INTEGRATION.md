# TipJar Integration Guide — SaaS-ready

## Overview

The TipJar component is designed to be reusable across multiple businesses.
It handles QR generation, invoice creation, and payment tracking.

## Quick Start

```tsx
import { TipJar } from '@/components/tipjar/TipJar'

// Basic usage
<TipJar mesaId="mesa-01" />

// With mesero (waiter) tracking
<TipJar mesaId="mesa-01" meseroId="mesero-01" />
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `mesaId` | `string` | No | Table identifier |
| `meseroId` | `string` | No | Waiter identifier |

## Hooks

### `useTipJar`
Main state management hook.

```ts
const { amount, setAmount, invoice, isPaid, isLoading, error, createInvoice } =
  useTipJar({ mesaId, meseroId })
```

### `useBlinkInvoice`
Creates invoices via Blink GraphQL API.

```ts
const { createBlinkInvoice } = useBlinkInvoice()
const invoice = await createBlinkInvoice({
  amount: 200,
  mesaId: 'mesa-01',
  meseroId: 'mesero-01',
  currency: 'MXN',
})
```

### `useWebhookListener`
Listens for payment notifications in real-time.

```ts
const { events, lastEvent } = useWebhookListener('mesa-01')
```

## Flow

1. **User opens table** → `TipJar` renders with QR code
2. **Customer scans QR** → Opens wallet with pre-filled amount
3. **Customer confirms payment** → Lightning transaction occurs
4. **Blink sends webhook** → `/api/tipjar/webhook` receives notification
5. **UI updates** → Shows success animation, logs transaction

## Customization

### Amount Presets
Edit the quick-select buttons in `TipJarAmountInput`:
```ts
const PRESETS = [50, 100, 200, 500] // MXN amounts
```

### Currency
Change default currency in `lib/config/blink.ts`:
```ts
currency: 'USD' // or 'SAT', 'EUR', etc.
```

### Styling
Override via CSS variables in `styles/tropical-luxe.css`:
```css
--color-gold: #YOUR_COLOR;
```

## Multi-tenant Setup

For SaaS deployment:
1. Each business gets a unique `businessId`
2. API routes filter by `businessId`
3. Webhooks include `businessId` in metadata
4. Dashboard shows only business-specific data

```ts
// In TipJar component
<TipJar mesaId="mesa-01" meseroId="mesero-01" />
// Metadata automatically includes business context
```