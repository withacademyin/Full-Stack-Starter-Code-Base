# Full-stack starter

Monorepo-style project with a separate **Express + Prisma** backend and **Next.js + TypeScript + Tailwind** frontend.

This root README is the onboarding guide. Package-specific rules live in:

- [`backend/README.md`](./backend/README.md) — API architecture, naming, Prisma workflow
- [`frontend/README.md`](./frontend/README.md) — Next.js structure, naming, UI patterns

## Repository layout

```text
.
├── backend/     # Express ESM API (Prisma, PostgreSQL, Zod, CORS)
├── frontend/    # Next.js App Router (TypeScript, Tailwind)
└── README.md    # You are here
```

## Prerequisites

- Node.js **18+** (20+ recommended)
- npm
- PostgreSQL running locally (or a remote URL)

## First-time setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# set DATABASE_URL to your Postgres instance

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

API: `http://localhost:4000`  
Health: `http://localhost:4000/api/v1/health`

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1

npm install
npm run dev
```

App: `http://localhost:3000`

## Local ports

| App | Default URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend | http://localhost:4000 |
| Postgres | `localhost:5432` (via `DATABASE_URL`) |

## Shared conventions (both apps)

These rules apply **everywhere** unless a framework forces an exception (documented in each package README).

### Naming: snake_case everywhere

| Target | Format | Example |
| --- | --- | --- |
| Folders | `snake_case` | `user_routes`, `health_panel` path segments |
| Code files | `snake_case` | `user_service.js`, `api_client.ts` |
| Functions / variables | `snake_case` | `create_user`, `is_loading` |
| JSON / DB fields | `snake_case` | `full_name`, `created_at` |
| Env vars | `SCREAMING_SNAKE_CASE` | `DATABASE_URL` |
| Classes / React components | Pascal with underscores OK | `AppError`, `Health_panel` |

**Why:** one consistent style across API payloads, DB columns, and source files reduces mapping bugs between frontend and backend.

### Best practices (project-wide)

1. **Separation of concerns** — routes/pages wire things; services own logic; validators own input rules.
2. **Validate inputs** — Zod on the backend for every mutating request.
3. **Consistent API contract** — `{ success, message, data }` from the backend; frontend types mirror that.
4. **No secrets in git** — use `.env.example` templates; keep real `.env` / `.env.local` local.
5. **Feature-oriented growth** — add a resource end-to-end (validator → service → route → frontend feature) rather than dumping files randomly.
6. **Small, focused files** — one primary responsibility per file; name the file after that responsibility.
7. **Prefer clarity over cleverness** — explicit names like `list_users_handler` beat abbreviations.

## Suggested workflow for a new feature

1. Model + migrate in `backend/prisma`.
2. Add `*_validator.js`, `*_service.js`, `*_controller.js`, `*_routes.js`.
3. Mount the route under `/api/v1`.
4. Add frontend types + `*_service.ts`.
5. Build UI under `frontend/src/features/<feature>/`.
6. Expose a page under `frontend/src/app/...`.

## Tech summary

| Area | Backend | Frontend |
| --- | --- | --- |
| Language | JavaScript (ESM) | TypeScript |
| Framework | Express | Next.js App Router |
| Data | Prisma + PostgreSQL | `fetch` via `api_client` |
| Validation | Zod | Form/UI validation as needed; trust API errors |
| Styles | — | Tailwind CSS |
| Naming | snake_case | snake_case (+ Next reserved files) |

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Frontend health panel errors | Start backend; confirm `NEXT_PUBLIC_API_BASE_URL` |
| Prisma / DB errors | Check Postgres is up and `DATABASE_URL` is correct; run `npx prisma migrate dev` |
| CORS blocked | Add the frontend origin to backend `CORS_ORIGIN` |
| Module import errors on backend | Keep `.js` extensions on relative ESM imports |

## Next steps for the team

- Replace the sample `User` model with your domain models.
- Add auth (sessions/JWT) behind middleware once requirements are clear.
- Add tests (`*_service` unit tests, API integration tests, critical UI flows).
- Add CI for lint + migrate + build on both packages.
