# CollegeChancer

Java CLI project that uses the U.S. Department of Education College Scorecard API to fetch real admissions data
(acceptance rate + SAT/ACT stats when available) and label a school as Reach/Target/Safety.

## Features
- Fetches live stats from College Scorecard (api.data.gov)
- Shows acceptance rate + SAT/ACT stats (some schools may show N/A due to test-optional reporting)
- Simple college selection menu
- Supports SAT-only, ACT-only, or both

## Setup

### Requirements
- Java 11+ (you are using Java 20)
- Maven

### API Key
Sign up at api.data.gov and set:
- `SCORECARD_API_KEY` as an environment variable (don’t hardcode it)

Windows PowerShell:
```powershell
setx SCORECARD_API_KEY "YOUR_KEY"
