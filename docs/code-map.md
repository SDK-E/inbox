# Code Map

Concise ownership reference. Update when files, directories, or responsibilities move. Mirrors `docs/architecture.md`.

## `app/`

- `app/layout.tsx` — root layout, font loading, global metadata.
- `app/page.tsx` — landing page.
- `app/globals.css` — Tailwind layers and base styles.
- `app/api/health/` — health-check API route surface (empty until a `route.ts` is added).

## `scripts/`

- `scripts/verify-browser.ts` — starts `pnpm dev`, opens the homepage with Playwright, fails on console or page errors.
- `scripts/snapshot.ts` — wraps `repomix` and forwards arguments and exit code.
- `scripts/dead-code.ts` — wraps `knip` and forwards arguments and exit code.
- `scripts/module-graph.ts` — wraps `dependency-cruiser` and forwards arguments and exit code.

## `tests/`

- `tests/setup.ts` — Vitest setup, registers `@testing-library/jest-dom` matchers.
- `tests/unit/smoke.test.ts` — Zod schema smoke test.
- `tests/e2e/homepage.spec.ts` — Playwright test that the landing page renders `<main>`.

## `public/`

Static SVG assets used by the landing page. Not analyzed by lint, type-check, or readability tools.

## `docs/`

- `docs/branding.md` — SDK Enterprises brand guidelines (canonical reference for UI work).
- `docs/architecture.md` — module boundaries, runtime topology, configuration surfaces.
- `docs/code-map.md` — this file.

## Configs (root)

- `next.config.ts` — Next configuration: standalone output, security headers.
- `tsconfig.json` — strict TypeScript with `@/*` path alias.
- `eslint.config.mjs` — flat ESLint config: type-aware TS, sonar, unicorn, import restrictions.
- `vitest.config.ts` — Vitest configuration (jsdom).
- `playwright.config.ts` — Playwright configuration (Chromium, dev-server reuse).
- `postcss.config.mjs` — Tailwind 4 PostCSS plugin.
- `prettier.config.mjs` — Prettier formatting rules.
- `repomix.config.json` — single-file codebase snapshot.
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
