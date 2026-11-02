# Backend

Express (ES modules) API with Prisma, PostgreSQL, Zod validation, and CORS.

## Stack

| Layer | Choice |
| --- | --- |
| Runtime | Node.js 18+ |
| Framework | Express 5 (ESM `"type": "module"`) |
| ORM | Prisma 6 + PostgreSQL |
| Validation | Zod |
| Cross-origin | `cors` |

## Quick start

```bash
cd backend
cp .env.example .env
# edit DATABASE_URL to match your local Postgres

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server defaults to `http://localhost:4000`.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start API with `--watch` |
| `npm start` | Start API once |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Create / apply migrations |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:push` | Push schema without a migration (prototyping only) |

## Folder structure

```text
backend/
├── prisma/
│   └── schema.prisma          # Database models
├── src/
│   ├── app.js                 # Express app + middleware wiring
│   ├── server.js              # Process entry (listen + graceful shutdown)
│   ├── config/
│   │   └── env.js             # Zod-validated environment config
│   ├── controllers/           # HTTP handlers (req/res only)
│   ├── services/              # Business logic + Prisma calls
│   ├── routes/                # Route definitions + mounting
│   ├── middlewares/           # Cross-cutting Express middleware
│   ├── validators/            # Zod schemas for request validation
│   ├── lib/                   # Shared clients (e.g. prisma_client.js)
│   └── utils/                 # Helpers (api_response, app_error)
├── .env.example
├── package.json
└── README.md
```

## Naming conventions (required)

Use **snake_case** for folders, files, functions, variables, and request/response field names.

| Kind | Rule | Examples |
| --- | --- | --- |
| Folders | `snake_case` | `middlewares/`, `user_routes` folder if nested |
| Files | `snake_case` + role suffix | `user_controller.js`, `health_service.js`, `validate_request.js` |
| Functions / consts | `snake_case` | `create_user`, `list_users_handler` |
| Classes | `PascalCase` (exception) | `AppError` |
| Env keys | `SCREAMING_SNAKE_CASE` | `DATABASE_URL`, `CORS_ORIGIN` |
| DB columns / Prisma fields | `snake_case` | `full_name`, `created_at` |
| Route params / JSON body | `snake_case` | `{ "full_name": "Ada" }` |

### File name suffixes

| Suffix | Responsibility |
| --- | --- |
| `*_routes.js` | Define and export an Express `Router` |
| `*_controller.js` | Parse HTTP, call service, send response |
| `*_service.js` | Domain logic and data access |
| `*_validator.js` | Zod schemas |
| `*_client.js` | Shared external client wrappers |

## Architecture rules (best practices)

1. **Thin controllers, fat services**  
   Controllers handle HTTP only. Prisma and business rules live in `services/`.

2. **Validate at the edge**  
   Use `validate_request(schema)` middleware + Zod schemas in `validators/`. Never trust raw `req.body`.

3. **Central error handling**  
   Throw `AppError` from services. Let `error_handler` map Zod / Prisma / AppError to JSON.

4. **Consistent API envelope**

   ```json
   {
     "success": true,
     "message": "User created",
     "data": { }
   }
   ```

5. **Versioned routes**  
   Mount under `/api/v1/...` so future breaking changes can use `/api/v2`.

6. **Config via env + Zod**  
   All runtime config goes through `src/config/env.js`. Fail fast on invalid env.

7. **One Prisma client**  
   Import `prisma` only from `src/lib/prisma_client.js` to avoid connection leaks.

8. **CORS explicitly configured**  
   Set `CORS_ORIGIN` (comma-separated) rather than reflecting arbitrary origins in production.

9. **No business logic in routes**  
   Routes wire middleware + controllers only.

10. **Graceful shutdown**  
    `server.js` disconnects Prisma on `SIGINT` / `SIGTERM`.

## Example: adding a new resource

1. Add / update model in `prisma/schema.prisma`, then migrate.
2. Create `src/validators/order_validator.js`.
3. Create `src/services/order_service.js`.
4. Create `src/controllers/order_controller.js`.
5. Create `src/routes/order_routes.js` and mount in `src/routes/index.js`.

## Sample endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Health + DB ping |
| `GET` | `/api/v1/users` | List users |
| `POST` | `/api/v1/users` | Create user (`email`, `full_name`) |
| `GET` | `/api/v1/users/:id` | Get user by id |

### Create user example

```bash
curl -X POST http://localhost:4000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","full_name":"Ada Lovelace"}'
```

## Environment variables

Copy `.env.example` → `.env`:

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development` \| `test` \| `production` |
| `PORT` | HTTP port (default `4000`) |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated |
| `DATABASE_URL` | PostgreSQL connection string for Prisma |

## Do / don't

| Do | Don't |
| --- | --- |
| Keep files focused and snake_cased | Mix camelCase file names |
| Put Prisma queries in services | Call Prisma from controllers/routes |
| Use Zod for every mutating endpoint | Manually check fields with `if` chains |
| Return the shared response helpers | Invent ad-hoc JSON shapes per route |
| Commit `.env.example` only | Commit real `.env` secrets |
