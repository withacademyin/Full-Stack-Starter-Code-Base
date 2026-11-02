# Frontend

Next.js (App Router) + TypeScript + Tailwind CSS client for the Express API.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data access | `fetch` via shared `api_client` |

## Quick start

```bash
cd frontend
cp .env.example .env.local
# ensure NEXT_PUBLIC_API_BASE_URL points at the backend

npm install
npm run dev
```

App defaults to `http://localhost:3000`.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

## Folder structure

```text
frontend/
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js App Router (reserved file names)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/                 # Shell pieces (header, footer)
│   │   └── ui/                     # Reusable presentational pieces
│   ├── features/                   # Feature modules (domain-grouped UI)
│   │   └── home/
│   │       └── components/
│   ├── hooks/                      # Client hooks (`use_*`)
│   ├── lib/                        # Shared infrastructure (api_client, etc.)
│   ├── services/                   # API call functions per domain
│   ├── types/                      # Shared TypeScript types
│   ├── utils/                      # Pure helpers
│   └── constants/                  # App-wide constants / config
├── .env.example
├── next.config.ts                  # Framework config (name fixed by Next.js)
├── package.json
└── README.md
```

## Naming conventions (required)

Use **snake_case** for custom folders, files, functions, variables, and props wherever practical.

| Kind | Rule | Examples |
| --- | --- | --- |
| Folders | `snake_case` | `features/home/`, `components/ui/` |
| Custom files | `snake_case` | `health_panel.tsx`, `api_client.ts`, `use_health_status.ts` |
| Functions / consts | `snake_case` | `fetch_users`, `format_date` |
| React components | `PascalCase` export, snake_case file | file `status_badge.tsx` → `Status_badge` |
| Types / interfaces | `Pascal_snake` or descriptive snake | `Health_status`, `Create_user_payload` |
| Hook **files** | `use_*.ts` snake_case | `use_health_status.ts` |
| Hook **functions** | `use` + CamelCase (React/ESLint rule) | `useHealthStatus` |
| Env keys | `SCREAMING_SNAKE_CASE` | `NEXT_PUBLIC_API_BASE_URL` |

### Framework exceptions (do not rename)

Next.js requires these exact names:

- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`
- `globals.css` (conventional)
- `next.config.ts`, `tsconfig.json`, `package.json`
- Custom React hook **function** names must match `/^use[A-Z]/` (e.g. `useHealthStatus`) so `react-hooks/rules-of-hooks` works. Keep the **file** snake_cased (`use_health_status.ts`).

Route **segments** you create should still be snake_case, e.g. `src/app/user_profile/page.tsx` → `/user_profile`.

## Architecture rules (best practices)

1. **Feature-first UI**  
   Put domain UI under `features/<feature>/components/`. Keep `components/ui` generic and reusable.

2. **Services own HTTP**  
   Pages/hooks call `services/*`. Do not scatter raw `fetch` calls in components.

3. **One API client**  
   All backend calls go through `lib/api_client.ts` so base URL, headers, and error shape stay consistent.

4. **Types live in `types/`**  
   Share response shapes with the backend envelope (`success`, `message`, `data`).

5. **Server vs client components**  
   Default to Server Components. Add `'use client'` only when you need state, effects, or browser APIs.

6. **Hooks are thin**  
   Hooks orchestrate loading/error state; they delegate work to services.

7. **Env for public config only**  
   Browser-visible values must use `NEXT_PUBLIC_*`. Never put secrets in frontend env.

8. **Keep pages thin**  
   `app/**/page.tsx` should compose feature components, not contain large markup or data logic.

9. **Match backend field names**  
   Use snake_case in JSON payloads (`full_name`, not `fullName`) to stay aligned with the API.

10. **No business rules in UI**  
    Formatting helpers go in `utils/`; API rules stay on the backend.

## Example: adding a new feature

1. Add types in `src/types/...`.
2. Add API helpers in `src/services/order_service.ts`.
3. Add UI under `src/features/orders/components/`.
4. Add a route at `src/app/orders/page.tsx` that composes the feature.
5. Optional: add `src/hooks/use_orders.ts` for client state.

## Environment variables

Copy `.env.example` → `.env.local`:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API root, e.g. `http://localhost:4000/api/v1` |

## Do / don't

| Do | Don't |
| --- | --- |
| Use snake_case for custom files/folders | Introduce camelCase file names for new code |
| Colocate feature UI under `features/` | Dump all components into one flat folder |
| Call `services/` from hooks/pages | Hard-code URLs inside components |
| Prefer Server Components | Mark everything `'use client'` by default |
| Keep Tailwind utilities readable | Invent one-off CSS files without reason |
| Commit `.env.example` only | Commit `.env.local` with machine-specific values |
