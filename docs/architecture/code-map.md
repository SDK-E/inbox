# Code Map

This is a responsibility map, not a generated file listing. Update it when ownership moves.

## `apps/web/`

Owns:
- Next.js routes/layouts/pages.
- app shell and product composition.
- route handlers/server actions.
- app-specific tests and browser verification.
- static app assets.

It may consume internal packages but should not absorb reusable SDK primitives or database implementation.

## `packages/ui/`

Owns reusable SDK-branded UI primitives/components that are useful beyond Inbox.

No Inbox mail-domain logic.

## `packages/db/`

Owns:
- Drizzle schema.
- migrations.
- server-only DB client/query helpers.
- DB-specific tests.

Never imported into client code.

## `packages/utils/`

Only genuinely shared, domain-neutral utilities. Do not turn this into a dumping ground.

## `packages/config/`

Shared lint/TypeScript/Tailwind/tooling configuration only where reuse justifies it.

## `docs/`

Product intent, architecture, UX, engineering constraints, and PRDs.

## Quality tooling

Keep existing readability/quality tooling such as Repomix, Knip, dependency-cruiser, lint, TypeScript checks, tests, and browser verification aligned with the monorepo structure.
