'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace(redirect);
    };
    checkSession();
  }, [router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      router.replace(redirect);
      router.refresh();
    } catch (err: any) {
      setServerError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <h1 className="font-playfair text-3xl text-[#2C2419] dark:text-dorado drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
          Bienvenido
        </h1>
        <p className="font-cormorant italic text-terracota dark:text-neon-cian/80 mt-1">
          Accede a tu panel de restaurante
        </p>
      </div>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 text-sm font-montserrat">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-montserrat text-[#2C2419] dark:text-white/80 mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.email ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} 
                      focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat transition-all`}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1 font-montserrat">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-montserrat text-[#2C2419] dark:text-white/80 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.password ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} 
                      focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat transition-all`}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && <p id="password-error" className="text-xs text-red-500 mt-1 font-montserrat">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-terracota hover:bg-dorado dark:bg-neon-fucsia dark:hover:bg-neon-cian 
                   text-white font-bold rounded-lg transition-all duration-300 shadow-lg dark:shadow-neon-fucsia/40 
                   disabled:opacity-50 disabled:cursor-not-allowed font-montserrat tracking-wide"
      >
        {loading ? 'Ingresando...' : 'Entrar al Dashboard'}
      </button>

      <p className="text-center text-sm font-montserrat text-[#2C2419]/60 dark:text-white/50 mt-4">
        ¿No tienes cuenta?{' '}
        <Link href="/signup" className="text-terracota dark:text-neon-cian hover:underline font-semibold">
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
