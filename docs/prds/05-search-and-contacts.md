# PRD — Search & Contacts

## Goal

Find mail and people quickly without turning Inbox into a CRM.

## Search requirements

- Full-text/metadata search appropriate to the chosen storage/index approach.
- Operators/filters: from, to, cc, subject, date, attachment, unread, starred, account, folder.
- Advanced filter UI maps to same query semantics.
- Large results remain performant.
- Deep-linkable/search-preserving state where practical.

## Contacts requirements

- Name, emails, phone, company, title, notes.
- Recent correspondents and organization users.
- Recipient autocomplete.
- Duplicate/invalid-address handling.
- Recent conversations.

## Acceptance

Queries are deterministic and failure-tolerant; contacts improve composition without adding CRM scope.
