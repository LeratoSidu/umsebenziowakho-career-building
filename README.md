# Umsebenzi Owakho — The Job Is Yours

> South Africa's flagship AI-powered career success platform.

**Tagline:** "Application to Appointment, uMsebenzi Owakho, The Job Is Yours With The Best AI Coach"

---

## What it is

Umsebenzi Owakho is a full-stack web application built for the South African employment market. It is an intelligent career assistant that guides users through every stage of their career journey — from building an ATS-friendly CV and analysing job descriptions, to interview coaching and application tracking.

The platform supports multiple account types, each tailored to a different role in the employment ecosystem.

---

## What's live now

| Feature | Status |
|--------|--------|
| Landing page with premium "Morning light" design | ✅ |
| Authentication (email + password + Google OAuth) | ✅ |
| Account type selection (7 types) | ✅ |
| Protected dashboard route | ✅ |
| Profile creation via database trigger | ✅ |
| Responsive layout & accessible UI (shadcn) | ✅ |

### Account types

Users sign up as one of seven account types:

1. **Job Seeker** — the primary audience; gets AI CV coaching, job matching and interview prep.
2. **Recruiter** — sources candidates and manages pipelines.
3. **Employer** — posts vacancies and tracks applicants.
4. **Training Provider** — offers skills courses and learnerships.
5. **University** — connects graduates with employers.
6. **Career Coach** — provides 1-on-1 coaching sessions.
7. **Government Organisation** — posts public-sector roles and SETA opportunities.

---

## Technology stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start v1 (full-stack React) |
| React | v19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui + Radix UI |
| Backend | Lovable Cloud (Supabase) |
| Database | PostgreSQL |
| Auth | Lovable Cloud Auth (Supabase Auth) |
| Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |
| Icons | Lucide React |

---

## Project structure

```
src/
  components/ui/          # shadcn/ui components (Button, Card, Dialog, etc.)
  hooks/                  # React hooks (e.g. use-mobile)
  integrations/
    lovable/              # Lovable Cloud auth helpers
    supabase/
      client.ts           # Browser Supabase client (RLS aware)
      client.server.ts    # Server-side admin client (service role)
      auth-middleware.ts  # requireSupabaseAuth middleware
      auth-attacher.ts    # Attaches bearer token to serverFn RPCs
      types.ts            # Generated Supabase types
  lib/                    # Utilities (cn, error handling, etc.)
  routes/
    __root.tsx            # Root layout (Google Fonts, Toaster, Outlet)
    index.tsx             # Landing page (/)
    auth.tsx              # Sign-up / sign-in page (/auth)
    _authenticated/
      route.tsx           # Layout guard — redirects unauthenticated users
      dashboard.tsx       # Personal dashboard (/dashboard)
  styles.css              # Tailwind v4 entry + custom theme tokens
  start.ts                # TanStack Start instance + middleware registration
  router.tsx              # Router configuration
```

---

## Running locally

### Prerequisites

- [Bun](https://bun.sh/) (or Node 20+)
- A Lovable Cloud project (Supabase) connected

### Install dependencies

```bash
bun install
```

### Environment variables

The following variables are injected automatically by Lovable Cloud in production/preview. For local development you need:

```bash
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
```

*(Server-side `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are read from the same values.)*

### Start the dev server

```bash
bun dev
```

The app will be available at `http://localhost:3000`.

### Build for production

```bash
bun run build
```

---

## Authentication flow

1. User visits `/` (landing page) and clicks **Get Started** or **Sign In**.
2. They are taken to `/auth`.
3. On `/auth` they:
   - Pick an account type from the 7 cards.
   - Enter email + password to **sign up**, or
   - Click **Continue with Google** for OAuth.
4. On successful sign-up a database trigger (`handle_new_user()`) auto-creates a row in `public.profiles`.
5. For OAuth, the selected account type is stored in `localStorage` as `pending_account_type` and applied to the profile on first dashboard load.
6. Authenticated users are redirected to `/dashboard`.
7. Unauthenticated users hitting `/dashboard` are redirected back to `/auth`.

---

## Database schema

### `public.profiles`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key, references `auth.users(id)` |
| `full_name` | `text` | Nullable |
| `account_type` | `account_type` enum | One of 7 roles |
| `created_at` | `timestamptz` | Auto-set |
| `updated_at` | `timestamptz` | Auto-updated by trigger |

### `public.account_type` enum

```
job_seeker | recruiter | employer | training_provider | university | career_coach | government_organisation
```

### RLS

- `profiles` has Row Level Security enabled.
- Users can read/update only their own profile row.
- The `handle_new_user()` trigger runs with `SECURITY DEFINER` to insert the initial profile on signup.

---

## Roadmap

### In progress / next up

- AI CV Builder (ATS-friendly templates + AI writing assistant)
- Job Description Analyzer (match score, skills gap, interview questions)
- AI Interview Coach (mock interviews, STAR method, feedback)
- Application Tracker (Kanban board with stages)
- Recruiter / Employer dashboards
- AI Learning Hub (course & learnership recommendations)

### Planned

- Mobile apps (PWA → native)
- AI Career Agent (conversational coach)
- Salary Intelligence (province & industry benchmarking)
- Smart Email Generator
- AI Networking Assistant (LinkedIn optimisation)

---

## Design tokens

The UI uses a custom "Morning light premium" theme:

| Token | Value | Purpose |
|-------|-------|---------|
| Primary | `#1e3a8a` (Deep Royal Blue) | Trust, professionalism |
| Accent | `#16a34a` (Emerald Green) | Growth, success |
| Sky | `#38bdf8` | Optimism, highlights |
| Background | `#f8fafc` | Clean canvas |
| Foreground | `#0f172a` | Primary text |

Typography: **Plus Jakarta Sans** (display), **Inter** (body), **JetBrains Mono** (code/mono).

---

## License

MIT

---

> **Application to Appointment.**
>
> **Umsebenzi Owakho — The Job Is Yours.**
