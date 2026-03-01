---
title: Borgtj – A React Component Library with Design Tokens
date: 2026-02-28 16:50
img: borgtj.jpg
tags:
  - frontend
  - React
  - component library
  - design tokens
---

I’d like to introduce [Borgtj](https://borgtj.github.io/borgtj/) ([@borgtj/react](https://www.npmjs.com/package/@borgtj/react))—a React component library I built with **design tokens** and **theming** at the core. The goal is to give you reusable, accessible UI components and a clear token system so you can retheme or integrate with your own design without fighting the library.

## Why I built it

I wanted a small set of React components (buttons, inputs, selection controls, badges, accordion, tooltips, context menu) that share one design language and one theming model. Instead of one-off styles per component, I put **primitives** (palettes, spacing, radius) and **semantic tokens** (primary, background, muted, etc.) in CSS custom properties, then let components consume those. That way you can switch themes (e.g. Solaris Light/Dark, Ocean Light/Dark) or override semantic tokens without touching component code.

## What’s in the gallery

The [Component Gallery](https://borgtj.github.io/borgtj/) is the main entry point. Each section has live demos and shows how tokens and components work together.

**Token layers**

- **Layer 1 — Primitives** (`--borg-p-*`): palettes, spacing, radius. Used internally.
- **Layer 2 — Semantic** (`--borg-sys-*`): primary, bg, fg, muted, borders, etc. Override these to retheme.
- **Layer 3 — Component tokens**: component-specific variables that use the semantic layer.

**Typography**

- Display: Quicksand (`--borg-sys-font-display`)
- Body: Nunito (`--borg-sys-font-body`)

**Components**

- **Buttons**: Primary, Secondary, Outline, Ghost, Destructive; sizes Small / Default / Large; plus an async-action variant.
- **Text & OTP**: Email-style input and OTP input.
- **Selection**: Switch, Checkbox, Radio, Select, Textarea.
- **Badges**: Default, Secondary, Outline, Destructive, with optional icon.
- **Accordion & Tabs**: Expandable sections and tabbed content.
- **Context menu**: Right-click menu.
- **Tooltip**: Hover tooltip.

Theming is demonstrated with a theme selector in the sidebar (e.g. Solaris Light/Dark, Ocean Light/Dark); semantic colors and fonts update across the whole gallery.

## Who it’s for

Borgtj is for you if you want a **token-driven**, **themeable** React component set that stays small and predictable: use the gallery to see behavior and tokens, then drop `@borgtj/react` into your app and override `--borg-sys-*` (and optionally primitives) to match your brand.

- **Gallery**: [https://borgtj.github.io/borgtj/](https://borgtj.github.io/borgtj/)
- **npm**: [@borgtj/react](https://www.npmjs.com/package/@borgtj/react)

If you try it and have feedback or ideas, I’d be glad to hear them.
