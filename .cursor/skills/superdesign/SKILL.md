---
name: superdesign
description: >
  Superdesign is a design agent specialized in frontend UI/UX design. Use this skill before implementing any UI that requires design thinking. Common commands: superdesign create-project --title "X" (setup project), superdesign create-design-draft --project-id <id> --title "Current UI" -p "Faithfully reproduce..." --context-file src/Component.tsx (faithful reproduction), superdesign iterate-design-draft --draft-id <id> -p "dark theme" -p "minimal" --mode branch --context-file src/Component.tsx (design variations), superdesign execute-flow-pages --draft-id <id> --pages '[...]' --context-file src/Component.tsx (extend to more pages), superdesign create-component --project-id <id> --name "NavBar" --html-file /tmp/navbar.html --props '[...]' (extract reusable component), superdesign update-component --component-id <id> --html-file /tmp/navbar.html (update existing component), superdesign list-components --project-id <id> (list existing components). Supports line ranges: --context-file path:startLine:endLine
author: superdesign
version: "0.0.2"
---

# Superdesign

SuperDesign helps you (1) find design inspirations/styles and (2) generate and iterate design drafts on an infinite canvas. Implement application code **after** the user approves a design, or when they explicitly say to skip design and implement.

## Core scenarios

1. **`superdesign init`** — Analyze the repo and build UI context under `.superdesign/init/`.
2. **Help me design X** (feature, page, or flow).
3. **Set design system** — align tokens and `design-system.md` with the project.
4. **Help me improve design of X** — iterate from an existing draft or page.

## Init: repo analysis

When `.superdesign/init/` is **missing or empty**, do this **automatically**—do **not** ask the user to run it manually:

1. Create `.superdesign/init/`.
2. Fetch and follow: [INIT.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/INIT.md) (analyze the repo; write the files below).

### Mandatory init outputs

Produce at minimum: `components.md`, `layouts.md`, `routes.md`, `theme.md`, `pages.md`, `extractable-components.md` per INIT.md (full code where INIT requires it, dependency trees for `pages.md`, etc.).

## Mandatory reads before design work

If `.superdesign/init/` exists, **read every file in that directory first** before any design task:

| File | Purpose |
|------|---------|
| `components.md` | Shared UI primitives with full source |
| `layouts.md` | Shared layout components (nav, sidebar, header, footer) |
| `routes.md` | Page/route mapping |
| `theme.md` | Design tokens, CSS variables, Tailwind config |
| `pages.md` | Per-page component dependency trees |
| `extractable-components.md` | Candidates for reusable DraftComponents |

**Designing for an existing page:** Check `pages.md` for that page’s full dependency tree. Pass **every file in the tree** as `--context-file`. Also include `globals.css`, Tailwind config, and `.superdesign/design-system.md` when applicable.

## SuperDesign CLI (before any command)

**Before running any `superdesign` command**, ensure the CLI is installed and the session is authenticated. Do **not** assume the user is already logged in.

1. **Version check:** `superdesign --version`  
   - If it fails, install: `npm install -g @superdesign/cli@latest`
2. **Auth:** Run something lightweight (e.g. `superdesign --help`). If you see auth/login errors, run `superdesign login` and wait until it succeeds.
3. Only then run the intended SuperDesign commands.

### Common commands (reference)

- `superdesign create-project --title "X"` — create project
- `superdesign create-design-draft --project-id <id> --title "Current UI" -p "…" --context-file …` — faithful reproduction / new draft
- `superdesign iterate-design-draft --draft-id <id> -p "…" --mode branch --context-file …` — variations
- `superdesign execute-flow-pages --draft-id <id> --pages '[…]' --context-file …` — extend to more pages
- `superdesign create-component --project-id <id> --name "NavBar" --html-file … --props '[…]'` — extract component
- `superdesign update-component --component-id <id> --html-file …` — update component
- `superdesign list-components --project-id <id>` — list components

Line ranges: `--context-file path:startLine:endLine` (use per upstream SUPERDESIGN.md rules—e.g. skip large logic blocks or huge files).

## Operating guidelines (required)

**MUST** fetch the current guidelines and follow them for workflow detail (parallel tasks, pixel-perfect first draft, component extraction, Petite-Vue rules, etc.):

- [SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md)

Re-fetch when doing substantive SuperDesign work so behavior matches the latest upstream SOP.

## Progressive disclosure

- Init steps and file formats: [INIT.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/INIT.md)
- Full agent SOP: [SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md)
