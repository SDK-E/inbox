# Product Overview

Inbox is a production webmail client for SDK Enterprises. It is designed first for SDK employees, while preserving the product boundaries needed to become a multi-organization commercial product later.

The core experience is a fast, keyboard-friendly mail workspace where a user can connect multiple email accounts and manage them from one application.

## Core capabilities

- Multiple connected email accounts.
- Unified inbox plus per-account views.
- Real IMAP folder hierarchy.
- Conversation/thread view by default, with optional individual-message mode.
- Full mail actions: read/unread, star, archive, move, trash, restore, delete.
- Rich text, Markdown, and plain-text composition.
- Reply, reply-all, forward, multiple identities, signatures, drafts, attachments, inline images.
- Search and advanced filters.
- Contacts and recipient autocomplete.
- Snooze and scheduled sending.
- User-defined mail rules.
- Bulk actions, keyboard shortcuts, context menus, and drag-to-folder.
- Responsive desktop/tablet/mobile UI.
- Light, dark, and system themes.
- Organization/user administration and permissions where needed.

## Platform choices

- Next.js 16 App Router + React 19.
- Strict TypeScript.
- Tailwind CSS 4.
 - pnpm workspace with root Next.js app and `packages/` libraries.
- WorkOS AuthKit for authentication, sessions, organizations, and role/permission groundwork.
- Neon PostgreSQL + Drizzle ORM.
- Vitest + Playwright.
- Playwright only for agentic browser workflows where it adds value.
- Upstash/Redis only when a concrete requirement justifies it.

## Product boundary

Inbox is a mail product, not a CRM, calendar suite, project manager, or AI assistant. Those may integrate later but must not distort the mail-first UX.

Prefer mature maintained packages over custom infrastructure when they solve the problem cleanly.
