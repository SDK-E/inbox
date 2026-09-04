# Product Principles

## Fast and dense

Inbox is a productivity tool. Favor information density, clear hierarchy, low latency, and minimal visual noise over large cards, decorative layouts, and marketing-style spacing.

## Persistent context

Desktop defaults to three panes: navigation, message list, reader. Selecting mail should not throw the user into unrelated pages.

## Multiple accounts feel native

Unified views and account-specific views coexist. The user should always know which account/folder/message is active and which identity will send a reply.

## IMAP folders are authoritative

Folder hierarchy comes from the connected mailbox. The application may store local metadata and preferences, but should not invent a parallel folder model.

## Safe optimism

Reversible actions should feel immediate and offer Undo. Irreversible actions require stronger confirmation.

## Progressive disclosure

Show advanced controls only when needed: CC/BCC, raw headers, advanced search, rule details, old thread messages, etc.

## Keyboard-first, pointer-complete

Core mail workflows must be fast from the keyboard, but every shortcut must have an accessible pointer equivalent.

## Packages before custom code

Before implementing protocol handling, editors, virtualization, accessible primitives, drag-and-drop, sanitization, scheduling, or other infrastructure, research current maintained packages. Build custom code only where the product has unique behavior.

## Evidence over assumptions

Framework/package behavior must be verified from current docs. UI work must be run and exercised. Bugs must be reproduced. Completion requires actual checks.
