<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`.

<!-- END:nextjs-agent-rules -->

# KiloCode Inbox — Engineering Rules

Stack: Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4, pnpm, Neon + Drizzle, Stagehand.

## Commands

```bash
pnpm dev
pnpm check
pnpm test
pnpm verify
pnpm build
```

## Work Method

Before editing:

1. Read the task fully.
2. Inspect relevant code, tests, docs, and existing patterns.
3. Search before creating new utilities, components, abstractions, schemas, or conventions.
4. Check `node_modules/next/dist/docs/` or Context7 for uncertain/current APIs.
5. For non-trivial work, plan the change and validation before implementing.

Do not code from assumptions. Prefer repository evidence, current docs, tests, and the running app.

## Code

Use Server Components by default. Add `"use client"` only when browser interaction requires it.

Mark DB/secret modules with `import "server-only"` and never import them client-side.

Validate untrusted input with Zod at boundaries.

Strict TypeScript only. No `any`, `@ts-ignore`, `@ts-nocheck`, unnecessary casts/non-null assertions, swallowed errors, or disabled lint rules.

Prefer small, explicit, readable code. Reuse existing patterns. Privilege Opensource Packages (Use Browser tools to research online) to writing code. Avoid speculative abstractions, wrappers, factories, and unnecessary indirection.

Before adding dependencies, verify they are needed, current, maintained, and compatible.

## Database

Before schema/query changes, inspect the current Drizzle schema, migrations, constraints, and consumers.

Plan migrations deliberately and use test/dev data only.

## Testing

Test observable behavior.

For bugs: reproduce → find root cause → add/update regression coverage where practical → fix → verify.

Never weaken tests, loosen assertions, delete failing tests, or add arbitrary sleeps just to get green output.

Run focused tests while working.

## UI

UI work is incomplete until exercised in the running app.

For meaningful UI changes:

- verify the workflow with Stagehand/browser tooling;
- check runtime/browser errors;
- check relevant loading, empty, error, keyboard, responsive, and dark-mode states.

Use `pnpm verify`.

## Security

Treat auth, authorization, mail content, HTML, URLs, attachments, credentials, DB access, and external input as untrusted boundaries.

Never expose secrets to client code or logs.

## Documentation

Keep documentation aligned with implementation. Update relevant docs in the same change when behavior, architecture, setup, or workflows change.

## Completion

Before declaring work complete:

```bash
pnpm check
pnpm test
pnpm build
```

For UI changes:

```bash
pnpm verify
```

Then inspect `git diff`.

Do not finish with introduced lint/type/test/build failures, unrelated edits, debug code, stale docs, or suppressed errors.

Never claim verification you did not actually perform.
