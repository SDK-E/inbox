# Data Model Intent

Exact schema names may evolve; these are durable concepts.

## Organization / identity

- Organization
- User
- Organization membership / role
- Mailbox connection
- Sending identity
- User preferences

### Mailbox connection

Stores per-user mail account connection metadata and encrypted credentials.

Table: `mailbox_connections`
- `id` text PK
- `user_id` text NOT NULL
- `organization_id` text NOT NULL
- `provider` text NOT NULL
- `email` text NOT NULL
- `display_name` text
- `status` text NOT NULL DEFAULT 'disconnected'
- `imap_host`, `imap_port`
- `smtp_host`, `smtp_port`
- `oauth_provider` text
- `encrypted_credentials` text
- `oauth_refresh_token`, `oauth_access_token` text
- `oauth_expires_at` timestamp
- `last_error` text
- `is_default` boolean NOT NULL DEFAULT false
- `created_at`, `updated_at`, `last_validated_at` timestamp

Constraints:
- One default account per user (`is_default=true`).
- Credentials are encrypted at rest; plaintext secrets never reach client or logs.

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
