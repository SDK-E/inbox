# @inbox/web

Next.js 16 App Router application.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm check
pnpm lint
pnpm typecheck
pnpm test
pnpm verify
```

## Structure

- `app/` — routes, layouts, pages, and global styles
- `components/` — reusable UI components
- `hooks/` — client-side hooks
- `lib/` — internal helpers
- `public/` — static assets
- `tests/` — unit, integration, and e2e tests

## Rules

- Use Server Components by default. Add `"use client"` only when browser interaction requires it.
- Validate untrusted input with Zod at boundaries.
- Mark DB/secret modules with `import "server-only"` and never import them client-side.
- `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm install` must produce zero warnings. Deprecation warnings, peer dependency warnings, and tooling warnings are treated as failures. Update dependencies or configuration to remove warnings rather than suppressing them.
