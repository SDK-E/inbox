<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./public/logo-light.png">
    <img alt="Inbox" src="./public/logo-light.png" width="420">
  </picture>
</p>

<p align="center">
  A modern webmail client for SDK Enterprises.
</p>

Inbox brings multiple email accounts into a single fast, keyboard-first workspace with unified mail, real IMAP folders, threaded conversations, powerful search, contacts, scheduling, snooze, rules, and flexible composition.

## Features

- Multiple accounts with a unified inbox
- Real IMAP folder hierarchy
- Threaded or individual message views
- Rich text, Markdown, and plain-text composition
- Multiple sending identities
- Draft autosave
- Contacts and recipient autocomplete
- Advanced search and filtering
- Scheduled sending and snooze
- Mail rules and automation
- Bulk actions and keyboard shortcuts
- Responsive three-column interface
- Light and dark themes

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Neon · Drizzle · Vitest · Playwright

## Quick Start

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Development

```bash
pnpm check
pnpm test
pnpm verify
pnpm build
```

Database tooling:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:push
pnpm db:studio
```

## Documentation

Architecture, development workflows, database conventions, testing, and implementation details live in [`docs/`](./docs/).

## License

Proprietary software. © SDK Enterprises.
