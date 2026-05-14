'use client';

import { cn } from '@/lib/utils';

interface ArcadeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neon';
  glow?: boolean;
}

export function ArcadeButton({
  className,
  variant = 'primary',
  glow = false,
  children,
  ...props
}: ArcadeButtonProps) {
  const variants = {
    primary: 'bg-terracotta hover:bg-gold text-white',
    secondary: 'bg-jungle hover:bg-terracotta text-white',
    neon: 'bg-neonPink hover:bg-neonCyan text-white dark:shadow-[0_0_20px_rgba(0,245,212,0.5)]',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-xl font-bold uppercase tracking-wider',
        'transition-all duration-300 transform hover:scale-105 active:scale-95',
        'border-2 border-transparent hover:border-current',
        variants[variant],
        glow && 'shadow-lg animate-pulse',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}