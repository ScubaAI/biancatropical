'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  neon?: boolean;
}

export function GlassCard({ className, glow, neon, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-tropical transition-all duration-300',
        glow && 'shadow-2xl',
        neon && 'dark:shadow-[0_0_30px_rgba(0,245,212,0.4)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

GlassCard.Header = function GlassCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-b border-[var(--glass-border)] pb-4 mb-4',
        'dark:border-[rgba(0,245,212,0.25)]',
        className
      )}
      {...props}
    />
  );
};

GlassCard.Title = function GlassCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-serif text-xl text-[var(--text-primary)]',
        'dark:text-[var(--text-primary)]',
        className
      )}
      {...props}
    />
  );
};

GlassCard.Content = function GlassCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-[var(--text-muted)]', className)} {...props} />;
};