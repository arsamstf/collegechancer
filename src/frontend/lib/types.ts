export type FitCategory = 'reach' | 'target' | 'safety'

export interface StudentProfile {
  gpa: number
  satScore?: number
  actScore?: number
  testChoice: 'sat' | 'act' | 'both' | 'none'
  intendedMajor?: string
  state?: string
}

export interface CollegeStats {
  acceptanceRate: number
  satRange?: {
    low: number
    high: number
  }
  actRange?: {
    low: number
    high: number
  }
}

export interface College {
  id: string
  name: string
  location: string
  stats: CollegeStats
  fitCategory: FitCategory
  fitExplanation: string
}

export interface ChancingResult {
  student: StudentProfile
  colleges: College[]
  summary: {
    reach: number
    target: number
    safety: number
  }
}
