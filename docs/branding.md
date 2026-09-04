# SDK Enterprises — Brand Guidelines

Use this file as the default brand reference for SDK Enterprises products, internal tools, websites, dashboards, documents, and generated UI.

The goal is consistency without making every product look identical.

## Brand

**Public name:** SDK Enterprises  
**Legal name:** SADDEK Entreprises

SDK Enterprises should feel technical, precise, modern, calm, credible, engineering-led, and minimal without feeling sterile.

Avoid generic SaaS styling, excessive gradients, oversized marketing visuals, and decorative UI that reduces clarity.

## Core Colors

```css
--sdk-green-950: #082003;
--sdk-green-500: #2cdb16;
--sdk-green-100: #d7e8d3;
```

Use these as the canonical brand colors.

Recommended semantic mapping:

```css
:root {
  --background: #f2f8f0;
  --foreground: #082003;

  --brand: #2cdb16;
  --brand-foreground: #082003;

  --surface-subtle: #f6faf5;
  --border-subtle: #d7e8d3;

  --muted: #eef5ec;
  --muted-foreground: #4c5f48;
}

.dark {
  --background: #081006;
  --foreground: #f2f8f0;

  --brand: #2cdb16;
  --brand-foreground: #082003;

  --surface-subtle: #0e190b;
  --border-subtle: #1c3317;

  --muted: #132111;
  --muted-foreground: #9bb397;
}
```

Supporting neutrals may evolve per product, but the three canonical SDK colors must remain unchanged.

## Color Usage

`#082003` is for dark backgrounds, primary text in light themes, navigation, strong structural surfaces, and appropriate logo variants.

`#2cdb16` is the primary accent. Use it for primary actions, active states, focus emphasis, links where appropriate, selected states, and important brand details. Do not flood large surfaces with it.

`#d7e8d3` is for subtle borders, muted surfaces, separators, secondary backgrounds, and low-emphasis UI.

## Typography

Primary brand typeface: **JetBrains Mono**

Use it where it reinforces the SDK identity: headings, navigation labels, technical metadata, code-oriented UI, key product labels, and marketing titles.

For long-form application content, body copy may use a highly readable sans-serif if JetBrains Mono becomes tiring at paragraph length.

Do not mix several display fonts.

Recommended hierarchy:

```text
Display / Hero       JetBrains Mono
Page titles          JetBrains Mono
Section headings     JetBrains Mono
Navigation           JetBrains Mono
Buttons              JetBrains Mono or inherited UI sans
Body                 readable sans-serif or JetBrains Mono where suitable
Code                 JetBrains Mono
Metadata             JetBrains Mono
```

Typography should feel compact and intentional rather than oversized.

## Logo

Use the official SDK Enterprises logo assets already provided by the project or central brand repository.

Expected variants:

- light logo;
- dark logo;
- standalone mark;
- favicon/app icon.

Rules:

- Never redraw the logo.
- Never stretch or distort it.
- Never rotate it.
- Never recolor it arbitrarily.
- Never add shadows, glow, gradients, or effects.
- Preserve clear space around it.
- Prefer the standalone mark when horizontal space is limited.
- Use the correct light/dark variant for contrast.
- Do not replace the brand mark with an improvised `SDK` text treatment.

## UI Direction

SDK interfaces should be information-dense where needed, clean, structured, fast, understated, and highly readable.

Prefer restrained borders, flat or subtly layered surfaces, compact controls, clear hierarchy, strong alignment, generous but not excessive whitespace, consistent radii, and subtle state changes.

Avoid glassmorphism, excessive blur, neon glow, random green gradients, giant rounded cards everywhere, excessive drop shadows, animated decorative backgrounds, large empty dashboard surfaces, generic startup illustrations, and unnecessary motion.

## Border Radius

Keep radii restrained.

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
```

Avoid excessively rounded SaaS-style components unless the product context genuinely benefits from them.

Pills should be reserved for tags, statuses, filters, and compact selectors.

## Shadows

Use shadows sparingly.

Prefer borders first, subtle surface contrast second, and shadow only when elevation needs to be communicated.

Dialogs, popovers, floating composers, and menus may use subtle elevation. Do not give every card a shadow.

## Spacing

Favor a compact engineering-product rhythm.

Suggested scale:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Avoid arbitrary spacing values unless layout constraints require them.

## Icons

Use one consistent icon family per product.

Preferred default: **Lucide**

Rules:

- Keep icon weight visually consistent.
- Common action icons: 16–18px.
- Pair unfamiliar icons with labels.
- Use tooltips for icon-only actions.
- Do not mix multiple icon libraries casually.

## Buttons

Primary buttons use SDK green for the most important action on a surface.

Examples:

```text
[ Save ]
[ Send ]
[ Create ]
```

There should normally be one visually dominant primary action per context.

Secondary actions should use neutral or outlined styles.

Destructive actions must use semantic danger colors, never SDK green.

## Links

Links should be clearly distinguishable from body text.

Use the brand green where contrast is sufficient, otherwise use an accessible semantic link treatment with green on hover/focus.

Do not rely on color alone for critical actions.

## Forms

Forms should feel compact and technical.

Prefer labels above controls, explicit validation messages, visible focus states, restrained helper text, and predictable spacing.

Avoid placeholder-only labels.

Errors should be specific and actionable.

## Tables and Dense Data

Tables are appropriate for SDK products.

Use clear column alignment, restrained separators, sticky headers where useful, compact row heights, tabular numbers for numeric data, and strong hover/selected states when interactive.

Avoid putting every table inside oversized cards.

## Dark Mode

Dark mode must be designed, not generated by simply inverting colors.

Use `#082003` as a brand anchor, but avoid using it as the only dark surface.

Maintain readable contrast, visible boundaries, clear selected states, distinguishable muted text, and accessible focus indicators.

The SDK green accent should remain recognizable in both themes.

## Accessibility

Target WCAG 2.2 AA.

Brand consistency never overrides accessibility.

Requirements:

- sufficient text contrast;
- visible keyboard focus;
- semantic HTML;
- accessible names;
- no color-only status communication;
- usable browser zoom;
- reduced-motion support;
- reasonable touch targets;
- keyboard-accessible interactions.

If `#2cdb16` does not provide sufficient contrast for text in a specific context, change the semantic treatment rather than forcing brand green everywhere.

## Motion

Motion should communicate state.

Use short transitions for menus, popovers, selection, drawers, and state changes.

Avoid decorative motion, bouncing controls, long fades, and animations that slow repeated workflows.

## Product Naming

When building something inspired by another product, treat that product only as a capability or UX reference.

Do not copy reference product names into project names, component names, source code, architecture, comments, documentation, SEO, or metadata.

SDK products should retain their own identity.

## Writing Style

SDK copy should be direct, concise, technically credible, human, specific, and calm.

Avoid generic marketing claims, exaggerated promises, corporate filler, AI-generated rhetorical patterns, excessive slogans, and forced cleverness.

Prefer concrete language describing what the product actually does.

## Engineering Usage

When implementing a new SDK interface:

1. Use the canonical brand colors.
2. Establish semantic tokens before styling individual components.
3. Use JetBrains Mono intentionally.
4. Reuse existing logo assets.
5. Keep UI density appropriate to the task.
6. Avoid decorative visual trends that conflict with the brand.
7. Verify light and dark themes.
8. Verify accessibility.
9. Prefer product-specific usability over blindly forcing a global visual pattern.

## CSS Token Starter

```css
:root {
  --sdk-green-950: #082003;
  --sdk-green-500: #2cdb16;
  --sdk-green-100: #d7e8d3;

  --background: #ffffff;
  --foreground: var(--sdk-green-950);

  --primary: var(--sdk-green-500);
  --primary-foreground: var(--sdk-green-950);

  --border: var(--sdk-green-100);
  --ring: var(--sdk-green-500);

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}
```

Treat these as a starting point, not a requirement to force every product into identical semantic tokens.

## Final Rule

An SDK product should be recognizable through restraint, typography, green accents, structure, and engineering quality.

Do not compensate for weak UX with stronger branding.
