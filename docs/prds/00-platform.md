# PRD — Platform Foundation

## Goal
Provide a safe production foundation on which all Inbox features can be implemented incrementally.

## Requirements
- Turborepo `apps/` + `packages/` structure.
- Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4.
- WorkOS AuthKit for auth/session/org foundation.
- Neon + Drizzle.
- Typed env boundary.
- SDK branding/theme foundation.
- Vitest + Playwright.
- Existing lint/readability/dependency tooling preserved and adapted to monorepo.
- Package-first dependency policy.
- No speculative product services.

## Acceptance
- Authenticated/unauthenticated routing works.
- Server/client/secret boundaries are explicit.
- DB migrations and test setup work.
- CI/local checks are deterministic.
- Browser verification works.
- Documentation maps the actual repository.
