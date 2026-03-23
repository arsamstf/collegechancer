import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Student Summary Skeleton */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Strip Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filter Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
      </div>
      
      {/* School Cards Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="hidden lg:block">
          <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
