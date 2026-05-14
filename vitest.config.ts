import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest/configure/tsconfigPaths'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  plugins: [tsconfigPaths()],
})