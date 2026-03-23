'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card shadow-sm">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <div className="leading-tight">
            <span className="block font-display text-lg">CollegeChancer</span>
            <span className="block text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              admissions fit
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 shadow-sm">
          <Link
            href="/"
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary/70",
              pathname === '/' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          <Link
            href="/chance"
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary/70",
              pathname === '/chance' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            )}
          >
            Calculator
          </Link>
          <Button asChild size="sm" className="ml-1 rounded-full">
            <Link href="/chance">Start Chancing</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
