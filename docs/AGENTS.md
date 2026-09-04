# Docs Rules

Treat `docs/` as product and engineering source of truth.

Before implementing a feature, read the relevant product doc and PRD. During implementation, track which docs are affected and update them in the same change.

Keep docs concise, concrete, and easy for a junior to follow while preserving enough exactness for a senior engineer to understand constraints and trade-offs. Prefer updating an existing document over creating overlapping documentation.

Do not turn the repository README into technical documentation. Do not document speculative behavior as implemented. If implementation and docs disagree, investigate and reconcile them before finishing.
