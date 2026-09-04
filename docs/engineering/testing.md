# Testing Strategy

Test observable behavior and meaningful failure modes.

## Unit / integration

Use Vitest for:
- parsing/validation;
- transformations/domain behavior;
- rules/search logic;
- synchronization/idempotency logic;
- DB behavior where practical;
- failure paths.

For bugs: reproduce → regression test where practical → fix root cause → verify.

Do not weaken assertions, delete failing tests, add arbitrary sleeps, or mock the code under test merely to pass.

## Browser

Use Playwright for deterministic user workflows.

UI changes should verify:
- happy path;
- relevant loading/empty/error states;
- keyboard interaction;
- responsive behavior;
- dark/light appearance where affected;
- browser/runtime errors.

Stagehand may support agentic browser workflows, but never replaces deterministic Playwright coverage.

## Test data

Use deterministic dev/test data. Never rely on production credentials or real customer mail for automated tests.
