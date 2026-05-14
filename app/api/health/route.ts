// ============================================================
// API: GET /api/health — Health check for Vercel monitoring
// ============================================================

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: 'pending', // TODO: add actual DB health check
      blink: 'pending',    // TODO: add actual Blink API check
      redis: 'pending',    // TODO: add actual Redis check if used
    },
  }

  // Return 200 even if some checks are pending
  return NextResponse.json(health, { status: 200 })
}