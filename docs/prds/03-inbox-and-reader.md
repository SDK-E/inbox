# PRD — Inbox & Reader

## Goal
Make reading/triaging mail fast across one or many accounts.

## Requirements
- Unified inbox and per-account/folder views.
- Virtualized/paginated large lists.
- Read/unread, star, archive, move, trash, restore, delete.
- Conversation grouping by default; individual-message mode optional.
- Thread/message metadata and attachments.
- Safe HTML + plain-text fallback.
- Remote-image controls and quoted-content handling.
- Reply/reply-all/forward entry points.
- Optimistic reversible actions + Undo.

## Acceptance
Large mailboxes stay responsive; actions reflect provider/app state correctly; malicious mail content cannot escape reader; thread and individual modes both work.
