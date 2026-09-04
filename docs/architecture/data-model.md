# Data Model Intent

Exact schema names may evolve; these are durable concepts.

## Organization / identity

- Organization
- User
- Organization membership / role
- Mailbox connection
- Sending identity
- User preferences

## Mail

- Folder reference/mapping
- Message
- Thread/conversation
- Attachment metadata
- Draft
- Scheduled message
- Snooze

## Productivity

- Contact
- Rule
- Rule condition/action
- Search/preferences metadata where needed
- Audit event for sensitive/admin actions

## Constraints

Every application-owned record that could become tenant-specific should be organization-scoped from the start where appropriate.

Do not duplicate provider truth unnecessarily. Preserve stable provider identifiers required for synchronization/idempotency.

Schema changes require deliberate migrations, indexes/constraints review, and tests. Do not design future tables without a near-term consumer.
