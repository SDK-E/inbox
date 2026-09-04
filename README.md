# Inbox

Foundation for a Next.js 16 application using React 19, strict TypeScript, Tailwind CSS 4, Neon PostgreSQL, and Drizzle ORM.

## Setup

```bash
cp .env.example .env.local
pnpm install
```

## Required environment variables

See `.env.example`. At minimum, provide:

- `NEXT_PUBLIC_APP_URL` — public base URL (required)
- `DATABASE_URL` — Neon pooled connection string (optional until DB features are used)

## Commands

```bash
pnpm dev        # start development server
pnpm check      # lint + typecheck
pnpm test       # run unit tests
pnpm verify     # run browser verification
pnpm build      # production build
```

Database tooling:

```bash
pnpm db:generate   # generate drizzle migrations
pnpm db:migrate    # apply migrations
pnpm db:push       # push schema directly (dev only)
pnpm db:studio     # open drizzle studio
```

## Database migration workflow

1. Edit `lib/db/schema.ts`.
2. Run `pnpm db:generate`.
3. Review the generated SQL in `drizzle/migrations/`.
4. Run `pnpm db:migrate` to apply.

## Testing / verification

- Unit tests: `pnpm test` (Vitest)
- Browser verification: `pnpm verify` (Playwright, starts dev server automatically)
