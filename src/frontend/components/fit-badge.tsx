import { cn } from '@/lib/utils'
import { FitCategory } from '@/lib/types'

interface FitBadgeProps {
  category: FitCategory
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const categoryConfig = {
  reach: {
    label: 'Reach',
    className: 'bg-reach/15 text-reach border-reach/30',
  },
  target: {
    label: 'Target',
    className: 'bg-target/15 text-target border-target/30',
  },
  safety: {
    label: 'Safety',
    className: 'bg-safety/15 text-safety border-safety/30',
  },
}

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm font-medium',
}

export function FitBadge({ category, size = 'md', className }: FitBadgeProps) {
  const config = categoryConfig[category]
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border font-medium uppercase tracking-[0.16em]',
        config.className,
        sizeConfig[size],
        className
      )}
    >
      {config.label}
    </span>
  )
}
