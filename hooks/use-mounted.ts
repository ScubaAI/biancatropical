// ============================================================
// HOOK: useMounted — Guard for SSR/CSR hydration
// ============================================================

'use client'

import { useEffect, useState } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}