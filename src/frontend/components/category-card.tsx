import { cn } from '@/lib/utils'
import { FitCategory } from '@/lib/types'
import { Target, TrendingUp, Shield } from 'lucide-react'

interface CategoryCardProps {
  category: FitCategory
  className?: string
}

const categoryConfig = {
  reach: {
    title: 'Reach',
    description: 'Schools where your chances are lower, but still possible with a strong application.',
    icon: TrendingUp,
    iconColor: 'text-reach',
    borderColor: 'border-reach/30',
    bgColor: 'bg-reach/5',
  },
  target: {
    title: 'Target',
    description: 'Schools where your academic profile matches most admitted students.',
    icon: Target,
    iconColor: 'text-target',
    borderColor: 'border-target/30',
    bgColor: 'bg-target/5',
  },
  safety: {
    title: 'Safety',
    description: 'Schools where your stats exceed the typical admitted student profile.',
    icon: Shield,
    iconColor: 'text-safety',
    borderColor: 'border-safety/30',
    bgColor: 'bg-safety/5',
  },
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const config = categoryConfig[category]
  const Icon = config.icon
  
  return (
    <div
      className={cn(
        'rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
        config.borderColor,
        config.bgColor,
        'bg-card/60 backdrop-blur',
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className={cn('rounded-xl bg-card p-2.5 shadow-sm', config.borderColor, 'border')}>
          <Icon className={cn('h-5 w-5', config.iconColor)} />
        </div>
        <h3 className="font-display text-xl">{config.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {config.description}
      </p>
    </div>
  )
}
