// ============================================================
// STAT CARD — Metric display
// ============================================================

import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border overflow-hidden',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <span className="text-gold">{icon}</span>}
        </div>
        <p className="text-3xl font-bold">{value}</p>
        {trend && (
          <p
            className={`text-xs mt-2 ${
              trend.positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  )
}