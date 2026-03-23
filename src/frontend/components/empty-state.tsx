import { GraduationCap } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
      <div className="mb-4 rounded-full bg-secondary p-4">
        <GraduationCap className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">Enter Your Profile</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Fill out the form with your GPA and test scores to see which schools are your Reach, Target, and Safety options.
      </p>
    </div>
  )
}
