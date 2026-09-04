# PRD — Quality, Security & Accessibility

## Goal
Inbox must behave like a production productivity application, not a demo.

## Requirements
- WCAG 2.2 AA target.
- Keyboard-only core flows.
- Visible focus and correct focus management.
- Responsive desktop/tablet/mobile behavior.
- Light/dark/system themes.
- Intentional loading/empty/error/offline/reconnecting/syncing states.
- Safe untrusted mail rendering.
- Privacy-safe logs/errors.
- Measured performance work, not speculative caching.
- Large inbox/thread/search stress coverage.
- Deterministic tests and browser verification.
- No unresolved lint/type/build/test failures.

## Acceptance
Core flows pass automated + browser checks, representative responsive/theme cases, security review, and final diff review.
