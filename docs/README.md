# Inbox Documentation

This directory is the source of truth for what Inbox is, how it should behave, and the constraints agents must preserve while building it.

Read in this order when starting substantial work:

1. [`product/overview.md`](./product/overview.md)
2. The relevant PRD under [`prds/`](./prds/)
3. [`design/ui-ux.md`](./design/ui-ux.md) for UI work
4. [`architecture/system.md`](./architecture/system.md) for architecture/data-flow work
5. [`engineering/standards.md`](./engineering/standards.md) for implementation work

Keep docs concise and synchronized with implementation. `README.md` at repository root is only the product introduction and quick start; detailed technical/product documentation belongs here.

Implementation is allowed to evolve. When it does, update the affected docs in the same change. Do not document speculative implementation details as if they already exist.
