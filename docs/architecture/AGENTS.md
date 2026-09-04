# Architecture Docs Rules

Architecture docs describe durable boundaries and intended topology, not every file.

Before changing architecture, inspect the repository and relevant PRD. Prefer existing packages and boundaries. Do not introduce abstractions, services, queues, caches, or packages without a concrete consumer.

When a boundary changes, update `system.md` and `code-map.md` in the same change.
