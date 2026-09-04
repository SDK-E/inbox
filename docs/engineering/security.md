# Security Requirements

Inbox handles hostile/untrusted content by default.

Review security explicitly when touching:
- authentication/authorization;
- cookies/sessions;
- IMAP/SMTP credentials or OAuth tokens;
- HTML email rendering;
- URLs/redirects;
- remote images;
- MIME/attachments/filenames/uploads;
- database queries;
- external provider responses;
- logs/errors.

Requirements:
- WorkOS authentication does not replace authorization; enforce permissions server-side.
- Secrets never enter source control, client bundles, browser logs, or ordinary application logs.
- Sanitize/render received HTML in an isolated safe boundary.
- Prevent unsafe links/redirects and dangerous attachment handling.
- Validate external input.
- Preserve privacy in diagnostics and audit logs.
- Never use production credentials for tests/agents.

Security-sensitive changes require targeted review and tests before completion.
