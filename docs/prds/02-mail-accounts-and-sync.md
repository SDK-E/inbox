# PRD — Mail Accounts, Folders & Sync

## Goal
Allow one user to connect multiple mailboxes and keep mailbox state synchronized reliably.

## Requirements
- Multiple accounts.
- Secure provider credential/OAuth handling.
- Connection validation/reconnect/disconnect.
- Real IMAP folder discovery and nesting.
- Initial + incremental sync.
- Idempotent/retry-safe synchronization.
- Account health/sync status.
- Unified and account-scoped mail data.
- Avoid full-mailbox memory loading.

## Acceptance
Repeated sync does not duplicate data; nested folders remain correct; partial failures recover; disconnected accounts fail safely; secrets never reach client/logs.
