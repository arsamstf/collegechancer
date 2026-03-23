'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StudentProfile } from '@/lib/types'
import { usStates, popularMajors } from '@/lib/mock-data'
import { ArrowRight, Calculator } from 'lucide-react'

interface StudentFormProps {
  onSubmit: (profile: StudentProfile) => void
  isLoading?: boolean
}

export function StudentForm({ onSubmit, isLoading }: StudentFormProps) {
  const [gpa, setGpa] = useState('')
  const [satScore, setSatScore] = useState('')
  const [actScore, setActScore] = useState('')
  const [testChoice, setTestChoice] = useState<StudentProfile['testChoice']>('sat')
  const [intendedMajor, setIntendedMajor] = useState('')
  const [state, setState] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    const gpaNum = parseFloat(gpa)
    if (!gpa || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      newErrors.gpa = 'Please enter a valid GPA between 0 and 4.0'
    }
    
    if (testChoice === 'sat' || testChoice === 'both') {
      const satNum = parseInt(satScore)
      if (!satScore || isNaN(satNum) || satNum < 400 || satNum > 1600) {
        newErrors.sat = 'Please enter a valid SAT score (400-1600)'
      }
    }
    
    if (testChoice === 'act' || testChoice === 'both') {
      const actNum = parseInt(actScore)
      if (!actScore || isNaN(actNum) || actNum < 1 || actNum > 36) {
        newErrors.act = 'Please enter a valid ACT score (1-36)'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const profile: StudentProfile = {
      gpa: parseFloat(gpa),
      satScore: satScore ? parseInt(satScore) : undefined,
      actScore: actScore ? parseInt(actScore) : undefined,
      testChoice,
      intendedMajor: intendedMajor || undefined,
      state: state || undefined,
    }
    
    onSubmit(profile)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Your Academic Profile
        </CardTitle>
        <CardDescription>
          Enter your scores and we will calculate your fit at top colleges.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* GPA Field */}
            <Field>
              <FieldLabel htmlFor="gpa">GPA (Unweighted)</FieldLabel>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                placeholder="3.85"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                aria-invalid={!!errors.gpa}
              />
              {errors.gpa && (
                <FieldDescription className="text-destructive">{errors.gpa}</FieldDescription>
              )}
            </Field>
            
            {/* Test Choice */}
            <Field>
              <FieldLabel htmlFor="test-choice">Test Scores to Include</FieldLabel>
              <Select
                value={testChoice}
                onValueChange={(value) => setTestChoice(value as StudentProfile['testChoice'])}
              >
                <SelectTrigger id="test-choice" className="w-full">
                  <SelectValue placeholder="Select tests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sat">SAT Only</SelectItem>
                  <SelectItem value="act">ACT Only</SelectItem>
                  <SelectItem value="both">Both SAT and ACT</SelectItem>
                  <SelectItem value="none">Test-Optional</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            
            {/* SAT Score */}
            {(testChoice === 'sat' || testChoice === 'both') && (
              <Field>
                <FieldLabel htmlFor="sat">SAT Score</FieldLabel>
                <Input
                  id="sat"
                  type="number"
                  min="400"
                  max="1600"
                  placeholder="1450"
                  value={satScore}
                  onChange={(e) => setSatScore(e.target.value)}
                  aria-invalid={!!errors.sat}
                />
                {errors.sat && (
                  <FieldDescription className="text-destructive">{errors.sat}</FieldDescription>
                )}
              </Field>
            )}
            
            {/* ACT Score */}
            {(testChoice === 'act' || testChoice === 'both') && (
              <Field>
                <FieldLabel htmlFor="act">ACT Score</FieldLabel>
                <Input
                  id="act"
                  type="number"
                  min="1"
                  max="36"
                  placeholder="32"
                  value={actScore}
                  onChange={(e) => setActScore(e.target.value)}
                  aria-invalid={!!errors.act}
                />
                {errors.act && (
                  <FieldDescription className="text-destructive">{errors.act}</FieldDescription>
                )}
              </Field>
            )}
            
            {/* Optional Fields */}
            <div className="border-t border-border pt-6">
              <p className="mb-4 text-sm text-muted-foreground">Optional Information</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="major">Intended Major</FieldLabel>
                  <Select value={intendedMajor} onValueChange={setIntendedMajor}>
                    <SelectTrigger id="major" className="w-full">
                      <SelectValue placeholder="Select a major" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularMajors.map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="state">State of Residence</FieldLabel>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger id="state" className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {usStates.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          </FieldGroup>
          
          <Button type="submit" size="lg" className="mt-8 w-full gap-2" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Calculate Fit'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
