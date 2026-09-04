# Architecture

This document describes the module boundaries, ownership, and runtime topology of the codebase. Keep it in sync with `docs/code-map.md` and the implementation.

## Stack

- Next.js 16 (App Router) with React 19, strict TypeScript.
- Tailwind 4 for styling.
- Vitest for unit tests; Playwright for e2e.
- Readability tooling: `repomix`, `knip`, `dependency-cruiser`.
- Turborepo for task orchestration across workspaces.

## Top-Level Layout

```
apps/web/     Next.js application (routes, layouts, pages, styles, tests, public)
packages/     Internal libraries (ui, db, utils, config)
docs/         Long-form documentation, including this file
```

`packages/ui/`, `packages/db/`, `packages/utils/` are internal libraries. `packages/config/` holds shared tooling configs.

## Runtime Topology

- **Browser** loads pages from `apps/web/app/page.tsx`, `apps/web/app/layout.tsx`, and any future route segments.
- **Server** is driven by `next dev` / `next start`. Server-only code is restricted to `apps/web/app/api/**` and any future `packages/db/` modules. Use `import "server-only"` to mark such modules.
- **Tests** run in jsdom for unit tests and a real Chromium instance for e2e (`apps/web/tests/e2e/`). The e2e config (`apps/web/playwright.config.ts`) starts `pnpm dev` automatically and targets `http://localhost:3000`.

## Boundaries

- `apps/web/app/**/page.tsx`, `apps/web/app/**/layout.tsx`, and other UI files must not import server-only modules (e.g. `packages/db/`). Use API routes (`apps/web/app/api/**/route.ts`) or server actions for server-side work.
- `apps/web/app/api/**` is the only place allowed to import server-only database modules. This is enforced by both `eslint-plugin-import-x/no-restricted-paths` and `dependency-cruiser`.
- Tests under `apps/web/tests/unit/**` execute in jsdom and may not import server modules. Tests under `apps/web/tests/e2e/**` execute against a real dev server.
- Agent/tooling metadata under `.agents/`, `.claude/`, `.kilocode/`, `.kiro/`, `.kilo/`, `.qwen/` is excluded from lint, type-check, and readability scans.

## Dependency Direction

```
apps/web → packages/ui, packages/utils
apps/web/app/api → packages/db
packages/ui → packages/utils (if needed)
packages/db → packages/utils (if needed)
```

Cycles and runtime cycles are forbidden (`dependency-cruiser`). Orphans — files not reachable from any entry — are forbidden (`dependency-cruiser`, `knip`).

## Configuration Surfaces

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
- `knip.json` — dead-file, dead-export, dead-dependency detection.
- `.dependency-cruiser.cjs` — module boundary and cycle enforcement.

## Readability Tooling

Three lightweight tools give agents fast orientation:

- `pnpm snapshot` — `repomix-output.md` at the repo root, packed repository for context dumps.
- `pnpm dead-code` — `knip` reports unused files, exports, and dependencies.
- `pnpm module-graph` — `dependency-cruiser` reports cycles, orphans, and boundary violations.
- `pnpm readability` — runs the latter two and fails the build on real findings.

All three configs are tuned to ignore generated, tooling-metadata, and CI-only paths. Real findings are treated as bugs to fix, not noise to suppress.
