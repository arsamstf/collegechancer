import { College, StudentProfile, ChancingResult } from './types'

export const mockColleges: College[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    stats: {
      acceptanceRate: 4,
      satRange: { low: 1520, high: 1580 },
      actRange: { low: 35, high: 36 },
    },
    fitCategory: 'reach',
    fitExplanation: 'MIT has an extremely competitive acceptance rate of 4%. Your scores are strong but this school is a reach for most applicants.',
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, CA',
    stats: {
      acceptanceRate: 4,
      satRange: { low: 1500, high: 1570 },
      actRange: { low: 34, high: 36 },
    },
    fitCategory: 'reach',
    fitExplanation: 'Stanford\'s 4% acceptance rate makes it highly selective. Strong academics alone aren\'t sufficient for admission.',
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    stats: {
      acceptanceRate: 3,
      satRange: { low: 1490, high: 1580 },
      actRange: { low: 34, high: 36 },
    },
    fitCategory: 'reach',
    fitExplanation: 'Harvard\'s acceptance rate is one of the lowest in the nation. Your profile is competitive but admission is never guaranteed.',
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    stats: {
      acceptanceRate: 18,
      satRange: { low: 1380, high: 1540 },
      actRange: { low: 32, high: 35 },
    },
    fitCategory: 'target',
    fitExplanation: 'Your academic profile aligns well with Michigan\'s admitted student statistics. This is a realistic target school.',
  },
  {
    id: 'ucla',
    name: 'University of California, Los Angeles',
    location: 'Los Angeles, CA',
    stats: {
      acceptanceRate: 9,
      satRange: { low: 1290, high: 1510 },
      actRange: { low: 29, high: 35 },
    },
    fitCategory: 'target',
    fitExplanation: 'UCLA is competitive but your profile matches their admitted student range. Consider this a target with strong essays.',
  },
  {
    id: 'nyu',
    name: 'New York University',
    location: 'New York, NY',
    stats: {
      acceptanceRate: 12,
      satRange: { low: 1370, high: 1530 },
      actRange: { low: 31, high: 35 },
    },
    fitCategory: 'target',
    fitExplanation: 'NYU\'s acceptance rate and score ranges align with your profile, making it a solid target school.',
  },
  {
    id: 'uiuc',
    name: 'University of Illinois Urbana-Champaign',
    location: 'Champaign, IL',
    stats: {
      acceptanceRate: 45,
      satRange: { low: 1310, high: 1500 },
      actRange: { low: 28, high: 34 },
    },
    fitCategory: 'safety',
    fitExplanation: 'UIUC has a higher acceptance rate and your scores exceed their median. This is a strong safety option.',
  },
  {
    id: 'uw',
    name: 'University of Washington',
    location: 'Seattle, WA',
    stats: {
      acceptanceRate: 48,
      satRange: { low: 1260, high: 1480 },
      actRange: { low: 28, high: 34 },
    },
    fitCategory: 'safety',
    fitExplanation: 'Your academic profile exceeds UW\'s typical admitted student, making this a reliable safety school.',
  },
  {
    id: 'asu',
    name: 'Arizona State University',
    location: 'Tempe, AZ',
    stats: {
      acceptanceRate: 88,
      satRange: { low: 1120, high: 1380 },
      actRange: { low: 22, high: 30 },
    },
    fitCategory: 'safety',
    fitExplanation: 'ASU has a very high acceptance rate and your scores are well above their ranges. This is a definite safety.',
  },
  {
    id: 'osu',
    name: 'The Ohio State University',
    location: 'Columbus, OH',
    stats: {
      acceptanceRate: 53,
      satRange: { low: 1270, high: 1460 },
      actRange: { low: 27, high: 33 },
    },
    fitCategory: 'safety',
    fitExplanation: 'Ohio State\'s acceptance rate and your competitive scores make this a safe choice with excellent programs.',
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology',
    location: 'Pasadena, CA',
    stats: {
      acceptanceRate: 3,
      satRange: { low: 1530, high: 1580 },
      actRange: { low: 35, high: 36 },
    },
    fitCategory: 'reach',
    fitExplanation: 'Caltech is one of the most selective schools in STEM. Their 3% acceptance rate makes it a reach for everyone.',
  },
  {
    id: 'duke',
    name: 'Duke University',
    location: 'Durham, NC',
    stats: {
      acceptanceRate: 6,
      satRange: { low: 1510, high: 1570 },
      actRange: { low: 34, high: 36 },
    },
    fitCategory: 'reach',
    fitExplanation: 'Duke\'s low acceptance rate and high score requirements make this a reach school despite strong academics.',
  },
]

export function calculateFit(student: StudentProfile): ChancingResult {
  // This is a simplified mock calculation
  // In production, this would call the Java backend API
  
  const colleges = mockColleges.map(college => {
    let fitCategory = college.fitCategory
    let fitExplanation = college.fitExplanation
    
    // Adjust based on student scores (simplified logic)
    const studentSat = student.satScore || 0
    const studentAct = student.actScore || 0
    const satMid = college.stats.satRange 
      ? (college.stats.satRange.low + college.stats.satRange.high) / 2 
      : 0
    const actMid = college.stats.actRange 
      ? (college.stats.actRange.low + college.stats.actRange.high) / 2 
      : 0
    
    // Simple heuristic for demo purposes
    if (studentSat > satMid + 50 || studentAct > actMid + 2) {
      if (fitCategory === 'reach') fitCategory = 'target'
      else if (fitCategory === 'target') fitCategory = 'safety'
    } else if (studentSat < satMid - 100 || studentAct < actMid - 4) {
      if (fitCategory === 'safety') fitCategory = 'target'
      else if (fitCategory === 'target') fitCategory = 'reach'
    }
    
    return {
      ...college,
      fitCategory,
      fitExplanation,
    }
  })
  
  const summary = {
    reach: colleges.filter(c => c.fitCategory === 'reach').length,
    target: colleges.filter(c => c.fitCategory === 'target').length,
    safety: colleges.filter(c => c.fitCategory === 'safety').length,
  }
  
  return {
    student,
    colleges,
    summary,
  }
}

export const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
]

export const popularMajors = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Biology',
  'Psychology',
  'Economics',
  'Political Science',
  'Communications',
  'Nursing',
  'Pre-Med',
  'Mathematics',
  'Physics',
  'Chemistry',
  'English',
  'History',
  'Art & Design',
  'Music',
  'Education',
  'Undecided',
]
