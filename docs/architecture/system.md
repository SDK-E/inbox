# System Architecture

## Monorepo direction

Inbox uses Turborepo with:

```text
apps/
  web/          Next.js application
packages/
  ui/           reusable SDK UI primitives/components
  db/           Drizzle schema, migrations, DB access
  utils/        genuinely shared utilities
  config/       shared tooling/config where justified
docs/
```

Do not create empty packages or speculative layers.

## Runtime boundaries

- Server Components by default.
- Client Components only for browser interaction/state.
- Secrets, credentials, DB access, protocol connections, and privileged WorkOS operations are server-only.
- Server-only modules must never leak into client bundles.
- Validate untrusted external input at boundaries with Zod where appropriate.

## Core integrations

- WorkOS AuthKit: auth/session/org/roles groundwork.
- Neon PostgreSQL: durable application-owned data.
- Drizzle ORM: schema/migrations/query layer.
- IMAP: source of truth for mailbox folders and incoming mailbox state.
- SMTP/provider sending: outbound email transport.
- Upstash/QStash/Redis: only when scheduling/queue/rate requirements concretely justify it.

## Mail synchronization

Synchronization must be incremental, idempotent, retryable, and safe under duplicate execution. Avoid loading full mailboxes into memory.

The app stores normalized/application-owned metadata needed for search, threading, rules, snooze, scheduled sends, preferences, contacts, and UI state while respecting mailbox/provider truth.

## Security boundary

Treat received HTML, links, remote images, MIME content, filenames, attachments, redirects, credentials, and provider responses as untrusted.

Authorization must be server-enforced; hiding UI is not authorization.
