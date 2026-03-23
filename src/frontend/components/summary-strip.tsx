import { ChancingResult } from '@/lib/types'
import { TrendingUp, Target, Shield } from 'lucide-react'

interface SummaryStripProps {
  summary: ChancingResult['summary']
}

export function SummaryStrip({ summary }: SummaryStripProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-reach/25 bg-reach/10 p-4 shadow-sm">
        <div className="rounded-xl bg-reach/15 p-2">
          <TrendingUp className="h-5 w-5 text-reach" />
        </div>
        <div>
          <p className="text-2xl font-bold">{summary.reach}</p>
          <p className="text-sm text-muted-foreground">Reach</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 rounded-2xl border border-target/25 bg-target/10 p-4 shadow-sm">
        <div className="rounded-xl bg-target/15 p-2">
          <Target className="h-5 w-5 text-target" />
        </div>
        <div>
          <p className="text-2xl font-bold">{summary.target}</p>
          <p className="text-sm text-muted-foreground">Target</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 rounded-2xl border border-safety/25 bg-safety/10 p-4 shadow-sm">
        <div className="rounded-xl bg-safety/15 p-2">
          <Shield className="h-5 w-5 text-safety" />
        </div>
        <div>
          <p className="text-2xl font-bold">{summary.safety}</p>
          <p className="text-sm text-muted-foreground">Safety</p>
        </div>
      </div>
    </div>
  )
}
