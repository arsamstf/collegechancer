import { Card, CardContent } from '@/components/ui/card'
import { StudentProfile } from '@/lib/types'
import { GraduationCap } from 'lucide-react'

interface StudentSummaryProps {
  student: StudentProfile
}

export function StudentSummary({ student }: StudentSummaryProps) {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border border-border/70 bg-secondary p-2.5 shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-display text-xl">Your Profile</h3>
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                snapshot
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm">
                GPA <span className="font-semibold">{student.gpa.toFixed(2)}</span>
              </span>
              {student.satScore && (
                <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm">
                  SAT <span className="font-semibold">{student.satScore}</span>
                </span>
              )}
              {student.actScore && (
                <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm">
                  ACT <span className="font-semibold">{student.actScore}</span>
                </span>
              )}
              {student.intendedMajor && (
                <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm">
                  Major <span className="font-semibold">{student.intendedMajor}</span>
                </span>
              )}
              {student.state && (
                <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm">
                  State <span className="font-semibold">{student.state}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
