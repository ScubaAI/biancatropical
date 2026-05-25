'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const signupSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  tenantSlug: z.string().min(3, 'Slug de 3+ caracteres').regex(/^[a-z0-9_-]+$/, 'Solo minúsculas, números y guiones'),
});

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', tenantSlug: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        const path = issue.path[0];
        if (typeof path === 'string') {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name, tenant_slug: formData.tenantSlug },
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setServerError(err.message || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-bounce mb-4">
          <svg className="w-16 h-16 text-neon-cian" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="font-playfair text-2xl text-dorado dark:text-neon-cian mb-2">¡Cuenta Creada!</h2>
        <p className="font-montserrat text-sm text-[#2C2419]/70 dark:text-white/70 mb-6">
          Revisa tu correo para confirmar la cuenta. Luego podrás acceder a <code className="bg-white/50 dark:bg-black/30 px-1 rounded">{formData.tenantSlug}</code>.
        </p>
        <Link href="/login" className="inline-block px-6 py-2 bg-terracota hover:bg-dorado dark:bg-neon-fucsia dark:hover:bg-neon-cian text-white rounded-lg font-montserrat transition-all">
          Ir al Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h1 className="font-playfair text-3xl text-[#2C2419] dark:text-dorado">Crear Cuenta</h1>
        <p className="font-cormorant italic text-terracota dark:text-neon-cian/80 text-sm">Registra tu restaurante</p>
      </div>

      {serverError && <p className="text-sm text-red-500 text-center font-montserrat">{serverError}</p>}

      <div className="space-y-3">
        <input type="text" placeholder="Nombre del restaurante" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.name ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat`} />
        <input type="email" placeholder="Correo electrónico" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.email ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat`} />
        <input type="password" placeholder="Contraseña (mín. 6)" value={formData.password} onChange={e => setFormData(p => ({...p, password: e.target.value}))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.password ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat`} />
        <input type="text" placeholder="Slug del restaurante (ej: la-bianca-norte)" value={formData.tenantSlug} onChange={e => setFormData(p => ({...p, tenantSlug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')}))}
          className={`w-full px-4 py-2 rounded-lg bg-[#FAF7F2] dark:bg-[#1A1A2E] border ${errors.tenantSlug ? 'border-red-400' : 'border-terracota/20 dark:border-neon-cian/30'} focus:outline-none focus:ring-2 focus:ring-terracota/50 dark:focus:ring-neon-cian font-montserrat`} />
      </div>

      <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-terracota hover:bg-dorado dark:bg-neon-fucsia dark:hover:bg-neon-cian text-white font-bold rounded-lg transition-all duration-300 shadow-lg dark:shadow-neon-fucsia/40 disabled:opacity-50 font-montserrat mt-2">
        {loading ? 'Creando...' : 'Registrar Restaurante'}
      </button>

      <p className="text-center text-sm font-montserrat text-[#2C2419]/60 dark:text-white/50 mt-4">
        ¿Ya tienes cuenta? <Link href="/login" className="text-terracota dark:text-neon-cian hover:underline font-semibold">Inicia sesión</Link>
      </p>
    </form>
  );
}
