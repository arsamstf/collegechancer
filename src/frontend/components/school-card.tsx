'use client'

import { Card, CardContent } from '@/components/ui/card'
import { FitBadge } from '@/components/fit-badge'
import { College } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, ChevronRight } from 'lucide-react'

interface SchoolCardProps {
  college: College
  onClick: () => void
  isSelected?: boolean
}

export function SchoolCard({ college, onClick, isSelected }: SchoolCardProps) {
  const { stats } = college
  
  return (
    <Card
      className={cn(
        'cursor-pointer overflow-hidden border-border/70 bg-card/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md',
        isSelected && 'border-primary ring-1 ring-primary/40'
      )}
      onClick={onClick}
    >
      <div className={cn(
        'h-1.5 w-full',
        college.fitCategory === 'reach' && 'bg-reach',
        college.fitCategory === 'target' && 'bg-target',
        college.fitCategory === 'safety' && 'bg-safety'
      )} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="truncate font-display text-lg">{college.name}</h3>
            </div>
            <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{college.location}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1">
                <span className="text-muted-foreground">Acceptance </span>
                <span className="font-semibold">{stats.acceptanceRate}%</span>
              </div>
              
              {stats.satRange && (
                <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1">
                  <span className="text-muted-foreground">SAT </span>
                  <span className="font-semibold">
                    {stats.satRange.low}-{stats.satRange.high}
                  </span>
                </div>
              )}
              
              {stats.actRange && (
                <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1">
                  <span className="text-muted-foreground">ACT </span>
                  <span className="font-semibold">
                    {stats.actRange.low}-{stats.actRange.high}
                  </span>
                </div>
              )}
              
              {!stats.satRange && !stats.actRange && (
                <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-muted-foreground">
                  Test data: N/A
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <FitBadge category={college.fitCategory} size="lg" />
            <ChevronRight className="h-4 w-4 text-muted-foreground/70" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
