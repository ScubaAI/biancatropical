# 🌴 La Bianca Bitcoin - Project Map

Current Status: **Development Phase**

## 🏗️ Project Structure

- `app/`: Next.js App Router
  - `(public)/`: Publicly accessible routes (Home, Menu)
  - `(dashboard)/`: Authenticated dashboard routes
  - `api/`: Backend API endpoints (Webhooks, Blink integration)
- `components/`: UI and Logic components
  - `ui/`: Base design system components (Radix + Tailwind)
  - `tipjar/`: Features related to the Bitcoin Tip Jar
  - `marketing/`: Components for the public-facing pages
  - `dashboard/`: Components for the administration panel
- `config/`: Application constants and environment configuration
- `docs/`: Technical documentation and project maps
- `hooks/`: Custom React hooks for state and data fetching
- `lib/`: Utility functions and external service clients (Supabase, Blink)
- `public/`: Static assets (images, icons)
- `styles/`: Global styles and design system tokens
- `tests/`: Unit and integration test suite

## 🚀 Current Roadmap

- [x] Initial Project Setup
- [x] Design System Implementation
- [x] Git Remote Configuration
- [ ] Supabase Integration
- [ ] TipJar Core Logic
- [ ] Blink API Integration

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Database/Auth**: Supabase
- **Payments**: Blink API (Bitcoin/Lightning)
- **Testing**: Vitest + Testing Library
