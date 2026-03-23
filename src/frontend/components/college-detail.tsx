'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FitBadge } from '@/components/fit-badge'
import { College } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, X, Percent, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CollegeDetailProps {
  college: College
  onClose: () => void
}

export function CollegeDetail({ college, onClose }: CollegeDetailProps) {
  const { stats } = college
  
  return (
    <Card className="sticky top-20 overflow-hidden border-border/70 bg-card/85 shadow-lg backdrop-blur">
      <div className={cn(
        'h-2 w-full',
        college.fitCategory === 'reach' && 'bg-reach',
        college.fitCategory === 'target' && 'bg-target',
        college.fitCategory === 'safety' && 'bg-safety'
      )} />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <FitBadge category={college.fitCategory} size="sm" />
            </div>
            <CardTitle className="font-display text-2xl">{college.name}</CardTitle>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{college.location}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Percent className="h-4 w-4" />
              Acceptance Rate
            </div>
            <p className="text-2xl font-bold">{stats.acceptanceRate}%</p>
          </div>
          
          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Test Policy
            </div>
            <p className="text-sm font-medium">
              {stats.satRange || stats.actRange ? 'Scores Considered' : 'Test-Optional'}
            </p>
          </div>
        </div>
        
        {/* Test Score Ranges */}
        <div className="space-y-4">
          <h4 className="font-display text-lg">Admitted Student Score Ranges</h4>
          
          {stats.satRange ? (
            <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">SAT Range (25th-75th)</span>
                <span className="font-mono text-sm font-medium">
                  {stats.satRange.low} - {stats.satRange.high}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div 
                  className="h-full bg-primary"
                  style={{
                    marginLeft: `${((stats.satRange.low - 400) / 1200) * 100}%`,
                    width: `${((stats.satRange.high - stats.satRange.low) / 1200) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>400</span>
                <span>1600</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">SAT data not available</p>
            </div>
          )}
          
          {stats.actRange ? (
            <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ACT Range (25th-75th)</span>
                <span className="font-mono text-sm font-medium">
                  {stats.actRange.low} - {stats.actRange.high}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div 
                  className="h-full bg-primary"
                  style={{
                    marginLeft: `${((stats.actRange.low - 1) / 35) * 100}%`,
                    width: `${((stats.actRange.high - stats.actRange.low) / 35) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>36</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">ACT data not available</p>
            </div>
          )}
        </div>
        
        {/* Fit Explanation */}
        <div className="space-y-2">
          <h4 className="font-display text-lg">Why This Classification?</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {college.fitExplanation}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
