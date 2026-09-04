---
description: Verify the UI renders correctly in a real browser using Stagehand
agent: browser
subtask: true
---

Verify the current state of the UI by launching a browser via Stagehand.

Steps:

1. Ensure `pnpm dev` is running (start it as a background process if not).
2. Run `pnpm verify` to execute the Stagehand browser verification script.
3. Check the specified routes render correctly with no console errors.
4. Report findings.

If any issues are found, report them with details (route, error message, suggested fix). Do NOT edit files unless the issue is a trivial fix the user requests inline.
