# @inbox/db

Database schema, queries, and migrations.

## Structure

- `src/` — schema, queries, and database utilities

## Rules

- Mark modules with `import "server-only"` when they touch the database.
- Never expose DB access to client code.
- Before schema changes, inspect current migrations and consumers.
