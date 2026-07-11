# Currentwork

A full-stack task manager built with Next.js, TypeScript, Prisma, and PostgreSQL (Neon).

## Live Demo

[https://current-work-red.vercel.app](#) <!-- replace with your actual Vercel URL -->

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- **Data fetching:** TanStack Query (React Query) with optimistic updates
- **Backend:** Next.js Route Handlers (REST API)
- **Database:** PostgreSQL (Neon), accessed via Prisma ORM 5.22
- **Other integrations:** GitHub REST API (server-side proxy)

## Features

- Add, edit, delete tasks
- Mark tasks as Captured / In Progress / Done via a segmented status control
- Optimistic UI updates with automatic rollback on failure
- Toast notifications for all actions
- Responsive layout (mobile → desktop)
- Live GitHub repository feed

## Getting Started

### Prerequisites

- Node.js 20 LTS
- A free [Neon](https://neon.tech) PostgreSQL database

### 1. Clone and install

\`\`\`bash
git clone https://github.com/Hashim017/currentwork.git
cd CurrentWork
npm install
\`\`\`

### 2. Set up environment variables

Copy the example file:

\`\`\`bash
cp .env.example .env
\`\`\`

Then open `.env` and fill in your Neon connection strings:

\`\`\`
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require"
\`\`\`

- `DATABASE_URL` = the **pooled** connection string from your Neon dashboard
- `DIRECT_URL` = the **direct** (unpooled) connection string

### 3. Run database migrations

\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
\`\`\`

### 4. Start the dev server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

### 5. (Optional) Point the GitHub panel at your own account

Add to `.env`:

\`\`\`
GITHUB_USERNAME=your-github-username
\`\`\`

## Database Schema

\`\`\`prisma
model Task {
  id          String    @id @default(cuid())
  title       String
  description String?
  status      Status    @default(TODO)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Status {
  TODO
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
\`\`\`

## API Routes

| Method | Route              | Description        |
|--------|---------------------|---------------------|
| GET    | `/api/tasks`         | List all tasks      |
| POST   | `/api/tasks`         | Create a task        |
| PATCH  | `/api/tasks/:id`      | Update a task        |
| DELETE | `/api/tasks/:id`      | Delete a task        |
| GET    | `/api/github?username=` | Fetch GitHub repos for a user |

## API Integration

**API used:** GitHub REST API (`/users/:username/repos`)

**Implementation:** A server-side route (`app/api/github/route.ts`) proxies requests to GitHub so an optional token never reaches the browser, and caches responses for 5 minutes via Next.js's `fetch` revalidation. The client consumes this through a dedicated React Query hook (`lib/useGithub.ts`), rendered in `components/GithubPanel.tsx`.

## Project Structure

\`\`\`
currentwork/
├── app/
│   ├── api/
│   │   ├── tasks/route.ts
│   │   ├── tasks/[id]/route.ts
│   │   └── github/route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── error.tsx
├── components/
├── lib/
├── types/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── .env.example
\`\`\`

## Deployment

Deployed on Vercel. Environment variables (`DATABASE_URL`, `DIRECT_URL`) are set in Vercel's project settings. The build command (`prisma generate && next build`) ensures the Prisma Client is always regenerated on deploy.
