# @inbox/config

Shared configuration for the monorepo.

## Packages

- `eslint/` — shared ESLint flat config

## Rules

- Config changes must remain backward-compatible with existing package consumers.
- Do not add tooling here unless it is actually reused by another workspace package.
