'use client'

import { useState, useMemo } from 'react'
import { ChancingResult, FitCategory, College } from '@/lib/types'
import { StudentSummary } from '@/components/student-summary'
import { SummaryStrip } from '@/components/summary-strip'
import { SchoolCard } from '@/components/school-card'
import { CollegeDetail } from '@/components/college-detail'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ResultsDashboardProps {
  result: ChancingResult
  onReset: () => void
}

type FilterOption = 'all' | FitCategory

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterOption>('all')
  
  const selectedCollege = useMemo(() => {
    return result.colleges.find(c => c.id === selectedCollegeId) || null
  }, [result.colleges, selectedCollegeId])
  
  const filteredColleges = useMemo(() => {
    if (filter === 'all') return result.colleges
    return result.colleges.filter(c => c.fitCategory === filter)
  }, [result.colleges, filter])
  
  // Sort by category: reach, target, safety
  const sortedColleges = useMemo(() => {
    const order: Record<FitCategory, number> = { reach: 0, target: 1, safety: 2 }
    return [...filteredColleges].sort((a, b) => order[a.fitCategory] - order[b.fitCategory])
  }, [filteredColleges])
  
  const handleCollegeClick = (college: College) => {
    setSelectedCollegeId(college.id === selectedCollegeId ? null : college.id)
  }
  
  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All Schools' },
    { value: 'reach', label: 'Reach' },
    { value: 'target', label: 'Target' },
    { value: 'safety', label: 'Safety' },
  ]
  
  return (
    <div className="space-y-6">
      {/* Student Summary */}
      <StudentSummary student={result.student} />
      
      {/* Summary Strip */}
      <SummaryStrip summary={result.summary} />
      
      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {filterOptions.map(option => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option.value)}
              className={cn(
                filter === option.value && 'bg-primary text-primary-foreground'
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
        
        <Button variant="outline" size="sm" onClick={onReset}>
          New Calculation
        </Button>
      </div>
      
      {/* Results Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* School List */}
        <div className="space-y-4">
          {sortedColleges.map(college => (
            <SchoolCard
              key={college.id}
              college={college}
              onClick={() => handleCollegeClick(college)}
              isSelected={college.id === selectedCollegeId}
            />
          ))}
          
          {sortedColleges.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No schools match the selected filter.
              </p>
            </div>
          )}
        </div>
        
        {/* Detail Panel */}
        <div className="hidden lg:block">
          {selectedCollege ? (
            <CollegeDetail 
              college={selectedCollege} 
              onClose={() => setSelectedCollegeId(null)}
            />
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
              <p className="text-muted-foreground">
                Select a school to view details
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Detail Panel */}
      {selectedCollege && (
        <div className="lg:hidden">
          <CollegeDetail 
            college={selectedCollege} 
            onClose={() => setSelectedCollegeId(null)}
          />
        </div>
      )}
    </div>
  )
}
