# PRD — Snooze, Scheduled Send & Rules

## Snooze
Preset/custom date-time; remove from active inbox; resurface at chosen time without rewriting original received timestamp.

## Scheduled send
Preset/custom date-time/timezone; edit/reschedule/cancel/send-now; retry/idempotency; visible Scheduled view.

Introduce Upstash/QStash/Redis only if the concrete scheduling design requires it.

## Rules
Multiple conditions + actions, all/any matching, enable/disable, deterministic ordering where required, inline validation.

Conditions may include sender/recipient/subject/body/attachment/account/folder/size. Actions may include move, read/unread, star, forward, delete, stop processing.

## Acceptance
No duplicate scheduled sends; timezone behavior is explicit/tested; snoozed mail resurfaces correctly; rule execution is deterministic and testable.
