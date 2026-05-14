# 🌮 La Bianca — Bitcoin Restaurant

> Auténtica cocina italiana con sistema de propinas vía Bitcoin Lightning Network.

## 🚀 Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd la-bianca-bitcoin

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run development server
npm run dev
```

## 📁 Project Structure

```
la-bianca-bitcoin/
├── app/                       # Next.js 14 App Router
│   ├── (public)/              # Landing, menu, public layout
│   ├── (dashboard)/           # Admin panel (auth-protected)
│   │   ├── dashboard/         # Dashboard home + mesas + meseros + transacciones + ajustes
│   ├── api/                   # API routes (serverless)
│   │   ├── tipjar/            # POST invoice + webhook receiver
│   │   ├── qr/                # GET QR code generator
│   │   └── health/            # Health check endpoint
│   ├── layout.tsx             # Root layout
│   ├── not-found.tsx          # Custom 404
│   └── globals.css            # Tailwind + CSS variables
│
├── components/                # React components
│   ├── tipjar/                # ⭐ TipJar module (SaaS-ready)
│   ├── ui/                    # Base UI (shadcn/ui inspired)
│   ├── layout/                # Navbar, Footer, ThemeProvider
│   ├── dashboard/             # Admin panel components
│   └── marketing/             # Hero, Features, FAQ, CTA
│
├── lib/                       # Core business logic
│   ├── blink/                 # Blink wallet integration
│   ├── qr/                    # QR generation & parsing
│   ├── currency/              # MXN↔BTC conversion
│   ├── auth/                  # Session, middleware, RBAC
│   ├── config/                # Site, Blink, feature flags
│   └── utils.ts               # Shared utilities
│
├── hooks/                     # Reusable React hooks
├── styles/                    # Design system CSS
├── public/                    # Static assets
├── scripts/                   # Build/dev scripts
├── tests/                     # Unit & integration tests
├── docs/                      # Documentation
├── config/                    # Tool configs (Tailwind, Vercel)
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## ⚡ Features

- **Lightning Payments** — Accept Bitcoin tips via Lightning Network (Blink integration)
- **Dynamic QR Codes** — Generate per-table/per-waiter QR codes for instant payments
- **Real-time Webhooks** — Blink webhook processing for instant payment confirmation
- **Dashboard** — Full admin panel: metrics, transactions, table/waiter management
- **Multi-tenant Ready** — SaaS architecture for multiple restaurants
- **Day/Night Mode** — Automatic theme switching based on time of day
- **Responsive Design** — Works on desktop, tablet, and mobile

## 🔧 Configuration

See [docs/BLINK_SETUP.md](./docs/BLINK_SETUP.md) for Blink wallet setup.
See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for Vercel deployment.
See [docs/TIPJAR_INTEGRATION.md](./docs/TIPJAR_INTEGRATION.md) for SaaS integration guide.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📜 License

SaaS platform: Commercial license. See LICENSE file for details.