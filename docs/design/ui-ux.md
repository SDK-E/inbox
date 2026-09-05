# UI / UX Specification

## Desktop shell

Default wide layout:

`Navigation | Message list | Reader`

Approximate defaults:

- Navigation: 240px.
- List: 380px.
- Reader: remaining space.
- Panes may be resizable and persisted.

Top bar stays compact and contains product identity, global search, useful sync/status state, and user menu.

## Navigation

Primary mail views:

- Inbox
- Starred
- Snoozed
- Sent
- Drafts
- Scheduled
- Archive

Below them, show each connected account and its real nested IMAP folders.

Secondary product areas:

- Contacts
- Rules
- Settings
- Admin when authorized

## Message list

Rows expose sender/participants, subject, preview, date/time, unread, star, account, attachments, and thread count when relevant.

Hover/focus actions: archive, snooze, read/unread, delete.

Support selection, shift-range, bulk actions, large-list virtualization, compact/comfortable density, and keyboard navigation.

## Reader

Header: subject, participants, account/folder context, core actions.

Conversation mode is default. Latest relevant messages expanded; older messages may collapse. Users can switch to individual-message mode.

Message details expose From/To/CC/Reply-To/date/Message-ID/authentication metadata behind disclosure.

Handle safe HTML, plain text, remote images, quoted content, inline media, and attachments.

## Composer

Three presentations:

- floating for new messages on desktop;
- inline for replies;
- focus/full-screen for long writing and smaller viewports.

Fields: From/identity, To, CC, BCC, Subject.

Modes: Rich Text, Markdown, Plain Text.

Must support autosaved drafts, attachments, inline images, signatures, send now, schedule send, failure recovery, and recipient autocomplete.

## Search

Global search supports normal text plus operators/filters such as `from:`, `to:`, `subject:`, `has:attachment`, `is:unread`, `before:`, `after:`, `in:`, `account:`.

Advanced filter UI should map to the same semantics.

## Responsive

- Wide desktop: three panes.
- Small desktop: compact/collapsible nav + list + reader.
- Tablet: two surfaces at a time.
- Mobile: one primary surface; Inbox → Conversation → Composer.

Do not shrink desktop into unusable mini-columns.

## States

Every relevant surface needs intentional loading, empty, error, offline/reconnecting, syncing, selected, disabled, and success states.

Common reversible actions should be optimistic with Undo.

## Accessibility

Target WCAG 2.2 AA. Semantic HTML first, visible focus, logical tab order, keyboard-complete workflows, reduced motion, zoom support, no color-only status.
