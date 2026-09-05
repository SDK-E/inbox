# Code Map

This is a responsibility map, not a generated file listing. Update it when ownership moves.

## App root (`/`)

Owns:

- Next.js routes/layouts/pages.
- app shell and product composition.
- route handlers/server actions.
- app-specific tests and browser verification.
- static app assets.
- auth foundation: WorkOS AuthKit proxy, callback/login/logout routes, auth-aware navigation, and protected dashboard shell.

It may consume internal packages but should not absorb reusable SDK primitives or database implementation.

## `packages/ui/`

Owns:
- shadcn/ui base primitive wrappers and app-specific UI components.
- Design-system tokens and layout primitives.

No Inbox mail-domain logic.

## `packages/db/`

Owns:

- Drizzle schema.
- migrations.
- server-only DB client/query helpers.
- DB-specific tests.
- Mail account adapters, crypto, and queries (`packages/db/src/mail/`).

Never imported into client code.

## `packages/utils/`

Only genuinely shared, domain-neutral utilities. Do not turn this into a dumping ground.

## `packages/config/`

Shared lint/TypeScript/Tailwind/tooling configuration only where reuse justifies it.

## `docs/`

Product intent, architecture, UX, engineering constraints, and PRDs.

## Quality tooling

Keep existing readability/quality tooling such as Repomix, Knip, dependency-cruiser, lint, TypeScript checks, tests, and browser verification aligned with the monorepo structure.
