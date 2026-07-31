# Repo: Forge + Angular prototyping kit

This repo is a **prototyping starter**. Pull it down and you get Angular + Tyler Forge pre-wired: components registered, icons ready, Tailwind mapped to Forge tokens, a standard app-layout shell, and routing scaffolded. Use it to spin up prototypes fast without re-deciding setup.

## Use the skills — don't reinvent

Two skills carry the standards for this repo. Invoke them; don't paraphrase from memory.

- **`angular-developer`** — Angular code and architecture (signals, forms, DI, routing, testing, CLI). Trigger whenever you're writing or reviewing Angular code.
- **`forge:forge-design`** — Tyler Forge component usage, layout, tokens, blocks, icon lookup. Trigger whenever the task touches Forge components, `@tylertech/forge*`, or UI structure.

If a task touches both (most UI work here does), invoke both.

## What's already set up — don't redo it

- App shell uses `forge-app-layout` (`src/app/app.html`) with navigation drawer, page toolbar, and footer
- Extended components (`forge-app-layout`, `forge-user-profile`) are registered via side-effect imports in `src/app/app.ts`
- Icon registration happens in a `static {}` block in `src/app/app.ts` — add new icons there
- Tailwind + `@tylertech/forge-tailwind` is wired (`src/tailwind.css`, `.postcssrc.json`); utility classes like `p-medium`, `gap-medium`, `text-heading3` map to Forge tokens
- Body/html sizing for full-viewport app layout lives in `src/styles.scss`
- Routes are lazy-loaded standalone components under `src/app/pages/`

## When adding features

- New page → new folder under `src/app/pages/<name>/`, register a lazy route in `src/app/app.routes.ts`, add a `forge-list-item` to the nav in `src/app/app.html`
- New Forge component → check `forge:forge-design` skill first for the right block/pattern; if it's an extended component, side-effect import it in `app.ts`
- New icon → find it via the Forge skill's icon lookup, add it to the `IconRegistry.define([...])` list in `src/app/app.ts`
