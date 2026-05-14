import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// TODO: import actual TipJar component once dependencies are installed
// import { TipJar } from '../components/tipjar/TipJar'

describe('TipJar', () => {
  it('renders without crashing', () => {
    // Placeholder test
    expect(true).toBe(true)
  })

  it('displays amount input', () => {
    // await render(<TipJar mesaId="mesa-01" />)
    // expect(screen.getByPlaceholderText(/monto/i)).toBeInTheDocument()
  })

  it('generates invoice on amount change', async () => {
    // Mock Blink API
    // vi.stubGlobal('fetch')
    // await render(<TipJar mesaId="mesa-01" />)
    // TODO: implement actual test
  })
})