---
description: Review current uncommitted changes for code quality and correctness
agent: review
subtask: true
---

Review the current uncommitted changes in this repository.

Run `git diff` and `git status` to identify what changed, then review each file for:

- Security issues (secrets, unsafe imports, missing `server-only`)
- TypeScript strictness (no `any`, no unnecessary casts)
- Architecture (small modules, no wrappers, server-first)
- Input validation and error handling

Also run `pnpm check` if available to catch lint/type errors/warnings.

Report all issues with file:line references and suggested fixes. Only report issues — do not edit files.
