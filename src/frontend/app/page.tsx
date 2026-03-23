import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { CategoryCard } from '@/components/category-card'
import { ArrowRight, BarChart3, GraduationCap, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-safety/10 blur-3xl" />
            <div className="absolute right-[-6rem] top-32 h-72 w-72 rounded-full bg-target/10 blur-3xl" />
          </div>
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <BarChart3 className="h-4 w-4" />
                <span>Admissions guidance with a calmer, clearer feel</span>
              </div>

              <h1 className="max-w-4xl text-balance text-5xl md:text-7xl">
                CollegeChancer
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
                Find your Reach, Target, and Safety schools without the noisy dashboard look.
                Compare college fit with a clean, editorial interface built for students and parents.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2 rounded-full px-6">
                  <Link href="/chance">
                    Start Chancing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-xl backdrop-blur">
              <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">At a glance</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-reach/20 bg-reach/10 p-3">
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-xs text-muted-foreground">Reach</p>
                  </div>
                  <div className="rounded-2xl border border-target/20 bg-target/10 p-3">
                    <p className="text-2xl font-semibold">18</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>
                  <div className="rounded-2xl border border-safety/20 bg-safety/10 p-3">
                    <p className="text-2xl font-semibold">9</p>
                    <p className="text-xs text-muted-foreground">Safety</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">Fit preview</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">demo</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Acceptance rate</span>
                    <span className="font-mono">18%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-full w-[58%] rounded-full bg-target" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A school like this reads as a realistic target when your scores sit near the middle of their admitted range.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section id="how-it-works" className="border-b border-border/70 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl md:text-5xl">
                How We Categorize Schools
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                We analyze your academic profile against historical admissions data to classify schools into three categories.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <CategoryCard category="reach" />
              <CategoryCard category="target" />
              <CategoryCard category="safety" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="border-b border-border/70 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl md:text-5xl">
                Built for Students
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Simple inputs, actionable insights. Get clarity on your college list in minutes.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                <div className="mb-4 w-fit rounded-xl border border-border/70 bg-secondary p-2.5">
                  <GraduationCap className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mb-2 font-display text-xl">Easy Profile Input</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Enter your GPA, test scores, and preferences. We handle the rest.
                </p>
              </div>
              
              <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                <div className="mb-4 w-fit rounded-xl border border-border/70 bg-secondary p-2.5">
                  <BarChart3 className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mb-2 font-display text-xl">Real Admissions Data</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our calculations use actual acceptance rates and score ranges from colleges.
                </p>
              </div>
              
              <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                <div className="mb-4 w-fit rounded-xl border border-border/70 bg-secondary p-2.5">
                  <Users className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mb-2 font-display text-xl">Personalized Results</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Get a customized breakdown explaining why each school fits your profile.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-8 text-center shadow-sm md:p-12">
              <h2 className="mb-4 text-2xl md:text-4xl">
                Ready to find your fit?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                Enter your academic profile and discover which schools are your Reach, Target, and Safety options.
              </p>
              <Button asChild size="lg" className="gap-2 rounded-full px-6">
                <Link href="/chance">
                  Calculate Your Fit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/70 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">CollegeChancer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built to help students navigate the college admissions process.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
