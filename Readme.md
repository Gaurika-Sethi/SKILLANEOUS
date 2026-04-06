# SKILLANEOUS

## Project Overview
SKILLANEOUS is an AI-powered career enablement platform that helps learners and job seekers convert intent into execution. It provides three integrated capabilities in one workflow-driven product:

- Generate ATS-friendly and design-oriented resumes as downloadable PDFs
- Generate structured learning roadmaps with hierarchical topics and subtopics
- Generate portfolio-ready project blueprints tailored to role, skill level, and deployment preferences

The platform combines a modern Next.js frontend with a Node.js/Express backend, MongoDB persistence, and LLM-assisted content generation through Groq.

## Problem Statement
Career preparation tools are often fragmented:

- Resume builders do not adapt deeply to target roles
- Learning plans are generic and not tied to prior skills
- Project ideas are often disconnected from resume and portfolio goals

This leads to inconsistent candidate narratives and weak proof-of-work.

## Solution
SKILLANEOUS unifies resume generation, roadmap planning, and project ideation into a single AI-assisted system. Users provide structured intent (role, goals, skills, preferences), and the system outputs professional artifacts that are immediately actionable:

- Role-targeted resume content rendered via HTML templates into PDF
- Roadmaps with phased progression and topic-level hierarchy
- Project plans including features, folder structure, deployment checklist, and resume bullets

## Key Features
- Multi-template Resume Generation: `modern`, `ats`, and `creative` templates
- Tone & Role Personalization: tone selection + target role conditioning
- PDF Export Pipeline: server-side HTML rendering + headless browser PDF generation
- Smart Link Handling: user-entered links are normalized to work with/without protocol
- External Link Integrity: labels entered by users are preserved as-is
- Project Link Accessibility: project chain emoji in resume templates is clickable
- Optional Sections: achievements section is hidden if no achievements are provided
- AI Roadmap Builder: phased roadmap generation and retrieval
- AI Project Generator: personalized project blueprint + regeneration support
- Authentication: local auth + Google OAuth, JWT access/refresh token flow

## System Architecture
SKILLANEOUS follows a split frontend-backend architecture.

### Frontend (Next.js App Router)
- Handles all user-facing forms and interactive workflows
- Calls backend REST APIs for create/generate/fetch operations
- Provides loading states and animated generation experiences
- Routes users through guided flows:
	- Resume form → Tone selection → PDF generation
	- Roadmap form → Roadmap generation → Roadmap exploration
	- Project form → Project generation → Project details view

### Backend (Express + MongoDB)
- Exposes REST APIs under `/api/v1/*`
- Validates input, stores request records, and orchestrates AI generation
- Normalizes AI output into internal schema for stable rendering
- Renders Handlebars resume templates and converts HTML to PDF via Puppeteer
- Supports auth, roadmap curation seeding, and project regeneration

### AI Integration
- Provider: Groq (`llama-3.1-8b-instant` currently in use)
- Prompt-driven generation for resume, roadmap, and projects
- Post-processing/sanitization ensures schema consistency before persistence

## End-to-End Workflow

### 1) Resume Workflow
1. User fills resume form (personal info, links, experience, projects, education, achievements)
2. Frontend sends multipart payload to `POST /api/v1/resume/create-data`
3. User selects tone and target role
4. Frontend calls `POST /api/v1/resume/generate-ai`
5. Backend generates AI JSON, normalizes content, preserves user links, renders template, produces PDF
6. Browser opens generated resume PDF

### 2) Roadmap Workflow
1. User submits roadmap intent to `POST /api/v1/roadmap/create-data`
2. Frontend requests AI roadmap via `POST /api/v1/roadmap/generate-roadmap`
3. Backend validates and stores structured roadmap phases/topics/subtopics
4. Frontend loads roadmap details and exploration views

### 3) Project Workflow
1. User submits role/skill/objective/preferences to `POST /api/v1/projects/generate`
2. Backend stores request + AI-generated project artifact
3. Frontend fetches by id via `GET /api/v1/projects/:projectId`
4. User can regenerate using `POST /api/v1/projects/:requestId/regenerate`

## Tech Stack

### Frontend
- Next.js `16.1.1`
- React `19`
- TypeScript
- Tailwind CSS `v4`
- Lucide React Icons

### Backend
- Node.js (ESM)
- Express `5`
- MongoDB + Mongoose
- Groq SDK
- Handlebars
- Puppeteer / puppeteer-core / Chromium (PDF rendering)
- Cloudinary + Multer (image upload)
- Passport + Google OAuth2
- JWT + bcrypt

## Core Dependencies

### Backend (`Backend/package.json`)
- `express`, `mongoose`, `groq-sdk`, `@google/genai`
- `handlebars`, `puppeteer`, `puppeteer-core`, `@sparticuz/chromium`
- `cloudinary`, `multer`
- `passport`, `passport-google-oauth20`, `jsonwebtoken`, `bcrypt`

### Frontend (`Frontend/package.json`)
- `next`, `react`, `react-dom`
- `lucide-react`, `react-icons`
- `html2canvas`, `jspdf`

## Repository Structure
```text
SKILLANEOUS/
├── Backend/
│   ├── src/
│   │   ├── config/                # env and passport config
│   │   ├── controllers/           # resume, roadmap, project, user handlers
│   │   ├── db/                    # MongoDB connection
│   │   ├── middlewares/           # JWT auth, multer upload
│   │   ├── models/                # Mongoose schemas
│   │   ├── routes/                # REST route registration
│   │   ├── seed/                  # curated roadmap seed script
│   │   ├── templates/             # resume HTML templates (ats, modern, creative)
│   │   └── utils/                 # AI, prompt, PDF, normalization, helpers
│   └── package.json
├── Frontend/
│   ├── app/                       # Next.js App Router pages
│   │   ├── resume-form/
│   │   ├── tone-selection/
│   │   ├── roadmap-form/
│   │   ├── roadmap/
│   │   ├── roadmap-explore/
│   │   ├── project-form/
│   │   └── project-display/
│   ├── lib/                       # API base URL config
│   └── package.json
├── package.json
└── Readme.md
```

## API Surface (High-Level)

### User
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `GET /api/v1/users/auth/google`
- `GET /api/v1/users/auth/google/callback`
- `POST /api/v1/users/refresh-token`
- `POST /api/v1/users/logout`

### Resume
- `POST /api/v1/resume/create-data`
- `POST /api/v1/resume/generate-ai`

### Roadmap
- `POST /api/v1/roadmap/create-data`
- `POST /api/v1/roadmap/generate-roadmap`
- `POST /api/v1/roadmap/topic-summary`
- `POST /api/v1/roadmap/subtopic-details`
- `POST /api/v1/roadmap/curated`
- `POST /api/v1/roadmap/:id`

### Projects
- `POST /api/v1/projects/generate`
- `POST /api/v1/projects/:requestId/regenerate`
- `GET /api/v1/projects/:projectId`

## Installation & Setup

### Prerequisites
- Node.js `>= 20`
- npm `>= 9`
- MongoDB instance (local or cloud)
- Groq API key
- Cloudinary account (for resume photo upload)
- Google OAuth app (optional, only if Google login is needed)

### 1) Clone Repository
```bash
git clone <your-repository-url>
cd SKILLANEOUS
```

### 2) Install Dependencies

Backend:
```bash
cd Backend
npm install
```

Frontend:
```bash
cd ../Frontend
npm install
```

### 3) Environment Variables

Create `Backend/.env`:
```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/skillaneous_db

GROQ_API_KEY=your_groq_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/v1/users/auth/google/callback

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Create `Frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4) Run Development Servers

Backend:
```bash
cd Backend
npm run dev
```

Frontend (new terminal):
```bash
cd Frontend
npm run dev
```

Open: `http://localhost:3000`

### 5) Seed Curated Roadmaps (Optional)
```bash
cd Backend
npm run seed:curated
```

## Usage Guide

### Resume Generation
1. Open resume form flow and choose template
2. Fill required details and optional achievements
3. Submit resume data
4. Select tone + target role
5. Generate and download/view PDF

### Roadmap Generation
1. Fill target field and purpose
2. Add existing skills and optional focus
3. Generate roadmap
4. Explore phases/topics/subtopics

### Project Generation
1. Enter role, skill level, objective, and tech preferences
2. Generate project blueprint
3. View detailed output and regenerate if needed

## Unique Implementation Aspects
- Resume rendering uses HTML templates + server-side PDF generation for consistent output quality
- AI output normalization layer stabilizes schema across model variability
- Link normalization ensures URL reliability for both personal and project links
- User-entered external link labels are preserved exactly (no automatic label replacement)
- Dynamic section rendering avoids empty content blocks (e.g., hidden achievements section)

## Future Improvements
- Credit/usage quota system per user with daily reset policy
- Background job queue for heavy AI/PDF tasks and retry strategy
- Caching layer for repeated prompts and roadmap retrieval
- Full test suite (unit + integration + API contract tests)
- Role-based dashboards and analytics for generation history
- Better observability (structured logs, tracing, performance metrics)
- CI/CD pipeline for automated lint/build/deploy

## Contributors
- Gaurika Sethi (Primary Author, Backend)
- Rishi Raj Goel (Frontend)

## License
This project is released under the ISC License.

If you add a root `LICENSE` file, keep it aligned with the package metadata.

