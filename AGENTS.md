<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`.

<!-- END:nextjs-agent-rules -->

# Inbox — Engineering Rules

Stack: Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4, pnpm, Neon + Drizzle, Playwright.

Read @docs/standards/engineering.md immediately before doing anything else.
Read @docs/standards/agent-workflow.md immediately before doing anything else.

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

## Pre-Work Search (Codebase Readability)

Before any substantial implementation, refactor, or debugging session, do all of:

- **Targeted repo search** — use `grep`/`glob`/semantic_search to find existing utilities, types, schemas, components, and patterns relevant to the task. Read every plausible match before writing new code.
- **Dependency inspection** — review `package.json`, `pnpm-lock.yaml`, and any installed package's `node_modules/<pkg>/` to confirm current APIs and version-specific behavior. Never rely on training data for current library usage.
- **Nearby tests** — read `tests/**` adjacent to the area being changed. Mirror existing test style and add regression coverage for behavior changes.
- **Relevant architecture docs** — consult `docs/architecture.md` and `docs/code-map.md` for module boundaries, conventions, and ownership before creating new abstractions or splitting/reorganizing code.

If the existing tools (`repomix`, `knip`, `dependency-cruiser`) suggest a contradiction with `docs/architecture.md` or `docs/code-map.md`, the docs are wrong until proven otherwise — update them in the same change.

Run the readability tools when the change touches module boundaries, dead code, or dependency surface:

```bash
pnpm snapshot       # generate repomix-output.md for context dumps
pnpm dead-code      # knip — unused files/exports/deps
pnpm module-graph   # dependency-cruiser — cycles & boundary violations
pnpm readability    # both at once (CI gate)
```

## Online Documentation Research

Before implementing anything involving packages, APIs, configuration, or tooling behavior, always search online for official documentation or known solutions. This includes warnings, deprecation notices, errors, and unfamiliar behavior. Prefer upstream fixes over local workarounds.

## Code

Use Server Components by default. Add `"use client"` only when browser interaction requires it.

Mark DB/secret modules with `import "server-only"` and never import them client-side.

Validate untrusted input with Zod at boundaries.

Strict TypeScript only. No `any`, `@ts-ignore`, `@ts-nocheck`, unnecessary casts/non-null assertions, swallowed errors, or disabled lint rules.

Before writing any code, search for an existing package or utility that solves the problem. Do not reinvent the wheel. Prefer well-maintained open source packages over custom implementations unless the requirement is truly unique or a dependency cannot be justified.

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

- Use shadcn CLI for all UI components: `pnpm dlx shadcn@latest add <component>`.
- Do not hand-roll components that shadcn already provides.
- Use semantic tokens from the preset (`bg-background`, `text-muted-foreground`, etc.). Avoid raw colors and manual dark mode overrides.
- UI work is incomplete until exercised in the running app.

For meaningful UI changes:

- verify the workflow with Playwright/browser tooling;
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
pnpm readability   # when module boundaries or dead code are in scope
```

For UI changes:

```bash
pnpm verify
```

Then inspect `git diff`.

Do not finish with introduced lint/type/test/build failures, unrelated edits, debug code, stale docs, or suppressed errors.

Never claim verification you did not actually perform.

## Warnings

`pnpm check`, `pnpm test`, `pnpm build`, and `pnpm install` must produce zero warnings. Deprecation warnings, peer dependency warnings, and tooling warnings are treated as failures. Update dependencies or configuration to remove warnings rather than suppressing them.

## Skills

Before substantive work, inspect available skills and load all skills relevant to the task before planning or implementation.

Do not rely on memory when an applicable skill exists.

# Mandatory initialization

Before planning, answering, editing files, running commands, or implementing anything:

1. Discover all available skills.
2. Determine which skills are relevant to the current task.
3. Load every relevant skill using the skill tool.
4. Read their instructions completely before continuing.
5. If a skill references additional mandatory instructions, load those too.
6. Only after this initialization may you plan or act.

This is a hard prerequisite, not a recommendation.

BLOCKING RULE: If no skill calls have been made yet, your next action MUST be skill discovery/loading. Do not proceed to planning, editing, commands, or implementation until skills are loaded. Skipping skill loading is prohibited even when the task appears simple, familiar, or urgent.

DO NOT:
- begin implementation before loading applicable skills;
- rely on remembered knowledge instead of repository skills;
- assume a skill is irrelevant without checking its description;
- skip skill loading because the task appears simple;
- substitute AGENTS.md instructions for the detailed skill contents.

If the skill tool is available and no skill calls have been made yet, your next action MUST be skill discovery/loading, not planning or implementation.

## Knip

Use Knip as the source of truth for dead files, unused exports, and unused dependencies.

Before creating a new helper, export, file, or dependency, check whether an existing one already exists and is used.

After structural changes, dependency changes, refactors, or file moves, run:

```bash
pnpm dead-code
```

Treat unexplained Knip findings as defects. Do not silence them with broad ignores, fake imports, dummy exports, or config exclusions just to get green output.

Only add a Knip ignore when the item is genuinely runtime-discovered/generated/tooling-only and document the reason narrowly.
