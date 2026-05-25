'use client';

import Link from 'next/link';

export default function TenantNotFoundPage() {
  return (
    <div className="text-center py-12 px-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FAF7F2] dark:bg-[#1A1A2E] border-2 border-terracota/30 dark:border-neon-cian/40 mb-6 shadow-lg">
        <svg className="w-10 h-10 text-terracota dark:text-neon-cian" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h1 className="font-playfair text-3xl text-[#2C2419] dark:text-dorado mb-3">Restaurante No Encontrado</h1>
      <p className="font-montserrat text-[#2C2419]/70 dark:text-white/70 max-w-sm mx-auto mb-8">
        El slug del restaurante no está registrado o la instancia ha sido desactivada. 
        Verifica la URL o contacta a soporte.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="px-6 py-3 bg-terracota hover:bg-dorado dark:bg-neon-fucsia dark:hover:bg-neon-cian text-white font-bold rounded-lg transition-all duration-300 shadow-md font-montserrat">
          Ir al Inicio
        </Link>
        <a href="mailto:soporte@labianca.io" className="px-6 py-3 bg-transparent border-2 border-terracota/40 dark:border-neon-cian/40 hover:bg-terracota/10 dark:hover:bg-neon-cian/10 text-[#2C2419] dark:text-neon-cian font-semibold rounded-lg transition-all duration-300 font-montserrat">
          Contactar Soporte
        </a>
      </div>
    </div>
  );
}
