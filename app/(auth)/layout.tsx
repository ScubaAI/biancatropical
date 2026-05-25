import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF7F2] dark:bg-[#0F0F1E] transition-colors duration-500">
      {/* Textura de hojas tropicales sutil */}
      <div className="absolute inset-0 bg-[url('/textures/palm-pattern.svg')] bg-repeat opacity-[0.04] pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 dark:bg-[#0F0F1E]/95 backdrop-blur-xl border border-terracota/30 dark:border-neon-cian/40 
                        rounded-2xl p-8 shadow-xl dark:shadow-neon-cian/20 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
