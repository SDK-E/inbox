# @inbox/ui

Shared UI component library.

## Structure

- `src/` — app-specific UI components and layout
- `src/ui/` — shadcn/ui primitive wrappers and design-system components

## Rules

- Use shadcn CLI exclusively for UI components: `pnpm dlx shadcn@latest add <component>`.
- Do not hand-roll components that shadcn already provides.
- Components must be framework-agnostic where possible.
- Prefer composition over configuration.
- Do not import app-specific routes or data-fetching logic here.
