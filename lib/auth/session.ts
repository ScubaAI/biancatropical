// ============================================================
// SESSION MANAGEMENT — Dashboard authentication
// ============================================================

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSession() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export async function getCurrentUser() {
  const supabase = await createSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function signIn(email: string, password: string) {
  const supabase = await createSession()
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  const supabase = await createSession()
  return supabase.auth.signOut()
}