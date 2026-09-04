# Engineering Standards

## Method

For substantial work:

`inspect → load relevant skills → search repo → verify current docs/APIs → plan → test where practical → implement → verify → self-review diff → update docs`

Do not code from assumptions.

## Code

- Strict TypeScript.
- No `any`, blanket casts, `@ts-ignore`, `@ts-nocheck`, swallowed errors, or disabled rules to force green output.
- Small cohesive modules and explicit boundaries.
- Reuse before creating.
- Avoid wrappers/factories/abstractions with no concrete need.
- Server Components by default.
- External input validated at boundaries.
- Secrets only server-side.

## Dependencies

Prefer mature, actively maintained packages to custom implementations.

Before adding a package:
1. verify the capability is not already present;
2. read current official docs;
3. verify compatibility/maintenance/security;
4. understand bundle/runtime impact.

## Documentation

Root README = product introduction + minimal quick start.

Detailed architecture, product, testing, DB, security, and implementation docs belong in `docs/`.

Keep docs synchronized during implementation, not as cleanup afterward.

## Completion

Run the relevant repository checks, tests, build, browser verification for UI, readability/dead-code checks where applicable, then inspect `git diff`.

Never claim a verification step that was not actually run.
