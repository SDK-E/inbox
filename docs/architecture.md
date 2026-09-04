# Architecture

This document describes the module boundaries, ownership, and runtime topology of the codebase. Keep it in sync with `docs/code-map.md` and the implementation.

## Stack

- Next.js 16 (App Router) with React 19, strict TypeScript.
- Tailwind 4 for styling.
- Vitest for unit tests; Playwright for e2e.
- Readability tooling: `repomix`, `knip`, `dependency-cruiser`.

## Top-Level Layout

```
app/      Next.js App Router entry points (pages, layouts, API routes)
scripts/  Node-runnable maintenance and verification scripts
tests/    Unit (Vitest) and end-to-end (Playwright) tests
public/   Static assets served at the site root
docs/     Long-form documentation, including this file
```

`lib/` does not currently contain runtime modules — it was previously used for shared server modules (env, db) but is intentionally empty until the first server-side module is added. Add a `lib/<domain>/` subdirectory per concern (e.g. `lib/env/`, `lib/db/`) and re-export from `lib/<domain>/index.ts` when that domain appears.

## Runtime Topology

- **Browser** loads pages from `app/page.tsx`, `app/layout.tsx`, and any future route segments.
- **Server** is driven by `next dev` / `next start`. Server-only code is restricted to `app/api/**` and any future `lib/<server-only>/` modules. Use `import "server-only"` to mark such modules.
- **Tests** run in jsdom for unit tests and a real Chromium instance for e2e (`tests/e2e/`). The e2e config (`playwright.config.ts`) starts `pnpm dev` automatically and targets `http://localhost:3000`.

## Boundaries

- `app/**/page.tsx`, `app/**/layout.tsx`, and other UI files must not import server-only modules (e.g. `lib/db/`, `lib/env/`). Use API routes (`app/api/**/route.ts`) or server actions for server-side work.
- `app/api/**` is the only place allowed to import server-only database modules. This is enforced by both `eslint-plugin-import-x/no-restricted-paths` and `dependency-cruiser`.
- Tests under `tests/unit/**` execute in jsdom and may not import server modules. Tests under `tests/e2e/**` execute against a real dev server.
- Agent/tooling metadata under `.agents/`, `.claude/`, `.kilocode/`, `.kiro/`, `.kilo/`, `.qwen/` is excluded from lint, type-check, and readability scans.

## Dependency Direction

```
app → lib (UI may import pure helpers only)
app/api → lib (server modules allowed)
scripts → anything (intentionally unrestricted; run via tsx)
tests → app, lib (mirrors consumer behavior)
```

Cycles and runtime cycles are forbidden (`dependency-cruiser`). Orphans — files not reachable from any entry — are forbidden (`dependency-cruiser`, `knip`).

## Configuration Surfaces

- `next.config.ts` — Next.js configuration, security headers, standalone output.
- `tsconfig.json` — strict TypeScript with `@/*` path alias, Next.js plugin.
- `eslint.config.mjs` — flat config: type-aware strict TS, sonar, unicorn, import restrictions.
- `vitest.config.ts` — jsdom environment, `tests/setup.ts` wires `@testing-library/jest-dom`.
- `playwright.config.ts` — Chromium project, reuses running dev server locally.
- `tailwindcss` + `postcss.config.mjs` — Tailwind 4 via PostCSS.
- `repomix.config.json` — single-file codebase snapshot for agents.
- `knip.json` — dead-file, dead-export, dead-dependency detection.
- `.dependency-cruiser.cjs` — module boundary and cycle enforcement.

## Readability Tooling

Three lightweight tools give agents fast orientation:

- `pnpm snapshot` — `repomix-output.md` at the repo root, packed repository for context dumps.
- `pnpm dead-code` — `knip` reports unused files, exports, and dependencies.
- `pnpm module-graph` — `dependency-cruiser` reports cycles, orphans, and boundary violations.
- `pnpm readability` — runs the latter two and fails the build on real findings.

All three configs are tuned to ignore generated, tooling-metadata, and CI-only paths. Real findings are treated as bugs to fix, not noise to suppress.
