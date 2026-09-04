# Code Map

Concise ownership reference. Update when files, directories, or responsibilities move. Mirrors `docs/architecture.md`.

## `apps/web/`

- `apps/web/app/layout.tsx` — root layout, font loading, global metadata.
- `apps/web/app/page.tsx` — landing page.
- `apps/web/app/globals.css` — Tailwind layers and base styles.
- `apps/web/app/api/health/` — health-check API route surface (empty until a `route.ts` is added).

## `apps/web/tests/`

- `apps/web/tests/setup.ts` — Vitest setup, registers `@testing-library/jest-dom` matchers.
- `apps/web/tests/unit/smoke.test.ts` — Zod schema smoke test.
- `apps/web/tests/e2e/homepage.spec.ts` — Playwright test that the landing page renders `<main>`.

## `apps/web/public/`

Static SVG assets used by the landing page. Not analyzed by lint, type-check, or readability tools.

## `packages/`

- `packages/ui/` — shared UI component library.
- `packages/db/` — database schema, queries, and migrations.
- `packages/utils/` — shared utility functions.
- `packages/config/` — shared ESLint, TypeScript, Tailwind, and tooling configs.

## Configs (root / package-scoped)

- `turbo.json` — Turborepo task pipeline.
- `pnpm-workspace.yaml` — workspace globs.
- `tsconfig.json` — root TypeScript config with path aliases for workspaces.
- `apps/web/tsconfig.json` — app-specific TS overrides.
- `apps/web/eslint.config.mjs` — flat ESLint config with Next.js plugin.
- `apps/web/vitest.config.ts` — Vitest configuration (jsdom).
- `apps/web/playwright.config.ts` — Playwright configuration (Chromium, dev-server reuse).
- `apps/web/postcss.config.mjs` — Tailwind 4 PostCSS plugin.
- `apps/web/prettier.config.mjs` — Prettier formatting rules.
- `packages/config/repomix.config.json` — single-file codebase snapshot.
- `knip.json` — dead-code detection.
- `.dependency-cruiser.cjs` — module boundary and cycle enforcement.

## Excluded Surfaces

The following are not part of the application source and are ignored by lint, type-check, and readability tools:

- `.agents/`, `.claude/`, `.kilocode/`, `.kiro/`, `.kilo/`, `.qwen/` — agent tool metadata.
- `.next/`, `out/`, `build/`, `dist/`, `coverage/`, `test-results/`, `playwright-report/` — build and test outputs.
- `node_modules/`, `*.tsbuildinfo`, `next-env.d.ts` — tooling artifacts.
- `repomix-output.md` — generated snapshot.
- `skills-lock.json` — agent tooling lock.
- `.env*` (except `.env.example`), `.vercel/` — secrets and platform metadata.
