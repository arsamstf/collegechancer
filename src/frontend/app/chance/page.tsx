'use client'

import { useState, useTransition } from 'react'
import { Navbar } from '@/components/navbar'
import { StudentForm } from '@/components/student-form'
import { ResultsDashboard } from '@/components/results-dashboard'
import { EmptyState } from '@/components/empty-state'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { StudentProfile, ChancingResult } from '@/lib/types'
import { calculateFit } from '@/lib/mock-data'

export default function ChancePage() {
  const [result, setResult] = useState<ChancingResult | null>(null)
  const [showForm, setShowForm] = useState(true)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (profile: StudentProfile) => {
    startTransition(() => {
      // Simulate API delay
      setTimeout(() => {
        const chancingResult = calculateFit(profile)
        setResult(chancingResult)
        setShowForm(false)
      }, 800)
    })
  }

  const handleReset = () => {
    setResult(null)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
            calculator
          </div>
          <h1 className="mb-2 text-3xl md:text-5xl">
            {showForm ? 'College Fit Calculator' : 'Your Results'}
          </h1>
          <p className="text-muted-foreground">
            {showForm 
              ? 'Enter your academic profile to discover your college fit categories.'
              : `Found ${result?.colleges.length || 0} schools based on your profile.`
            }
          </p>
        </div>
        
        {showForm ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_0.8fr]">
            <StudentForm onSubmit={handleSubmit} isLoading={isPending} />
            <div className="hidden lg:block">
              <EmptyState />
            </div>
          </div>
        ) : isPending ? (
          <LoadingSkeleton />
        ) : result ? (
          <ResultsDashboard result={result} onReset={handleReset} />
        ) : null}
      </main>
    </div>
  )
}
