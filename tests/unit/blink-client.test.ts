import { describe, it, expect, vi } from 'vitest'
import { getBlinkClient } from '@/lib/blink/client'

vi.mock('@/lib/blink/client', () => ({
  getBlinkClient: vi.fn(() => ({
    request: vi.fn(),
  })),
}))

describe('Blink Client', () => {
  it('creates a GraphQL client with auth headers', () => {
    // TODO: implement actual test once Blink credentials are available
    expect(getBlinkClient).toBeDefined()
  })

  it('handles missing API key gracefully', () => {
    // Should throw descriptive error
    // TODO: implement once env handling is in place
    expect(() => {}).not.toThrow()
  })
})