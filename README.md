# Forge Prototyping Kit — Angular

An Angular + Tyler Forge starter for designers and product owners. Clone, install, prototype.

## What's included

- **Angular v21** with standalone components, signals, and lazy-loaded routes
- **[@tylertech/forge](https://forge.tylertech.com/)** with the **[@tylertech/forge-angular](https://www.npmjs.com/package/@tylertech/forge-angular)** wrapper for proper template type-checking and forms integration
- **[@tylertech/forge-extended](https://www.npmjs.com/package/@tylertech/forge-extended)** — `forge-app-layout`, `forge-user-profile`, and other higher-level pieces
- **[@tylertech/forge-tailwind](https://www.npmjs.com/package/@tylertech/forge-tailwind)** — Forge tokens as Tailwind utilities
- **Tailwind CSS v4** and **SCSS**
- **Light + dark theme wiring**
- **App shell** — app bar, navigation drawer, user profile, page toolbar, footer
- **Claude Code skills** — Angular + Forge expertise checked in under `.claude/`

## Getting started

First, make a new folder for your prototype and step into it — the name is up to you (`my-login-prototype`, `dashboard-experiment`, whatever). Then clone this kit's contents *into* that folder:

```sh
mkdir my-prototype && cd my-prototype
git clone https://github.com/tyler-technologies/forge-claude-prototyping-angular.git .
npm install
npm start
```

The trailing `.` on the clone command matters — it tells git "drop the files into the current folder" instead of creating a new `forge-claude-prototyping-angular/` subfolder underneath. That way your project ends up named after your prototype (`my-prototype/`), not this template, which keeps your working directory tidy and makes the name meaningful when you're switching between prototypes later.

Then open Claude Code in the project folder:

```sh
claude
```

### Install the Forge Claude plugin

Gives Claude Code deep Forge knowledge (component APIs, tokens, blocks, icons). Install once per machine:

```
/plugin marketplace add tyler-technologies-oss/forge-mcp@blocks-mcp-adjustments
/plugin install forge@tyler-forge
```

If Claude doesn't seem to be using Forge knowledge after install, run `/reload-skills` or restart Claude Code.

### Load the bundled Angular skills

The kit ships with an Angular-specific skill under `.claude/skills/` (`angular-developer`). It's only picked up when Claude Code starts inside the cloned repo — so if you opened Claude Code **before** the clone finished, or you cloned into a directory where Claude was already running, Claude won't see it and will fall back to memory (which is how prototypes get subtly wrong).

After `git clone` + `npm install`, do **one** of the following before your first prompt:

- Run `/reload-skills` in the Claude Code prompt, or
- Quit Claude Code (`Ctrl+C` twice or `/exit`) and restart it from the repo directory.

You can confirm the skill loaded by running `/skills` — you should see `angular-developer` in the list.

### Approve the skill-guardrails hook

The kit ships with a `UserPromptSubmit` hook (`.claude/hooks/enforce-skills.mjs`) that forces Claude to load the Angular and Forge skills whenever your prompt looks UI- or code-shaped. The first time you launch Claude Code in this repo, it will ask you to approve the hook — say **yes**. Without it, Claude sometimes writes Angular or Forge code from memory and gets details wrong.

## Talking to Claude — example prompts

You don't need to know git, Angular, or Forge component names. Ask in plain English. Some prompts that work well:

> **Tip:** say the word **"Forge"** in your prompt when you're building UI ("add a Forge card…", "use a Forge button…"). It nudges Claude to load the Forge skill and pick the right component instead of guessing at raw HTML.

**Building screens**

> "Add a new page called 'Reports' with a Forge table of recent submissions."

> "On the dashboard, add a Forge empty-state card that shows when there's no data."

> "Build a login screen using Forge components that matches the mockup in `/design/login-v2.png`." _(drag the image into the chat)_

**Editing what's there**

> "The Sample page nav item is out of date — rename it to 'Playground' and change the Forge icon to a lightbulb."

> "Tighten the spacing on the dashboard Forge cards and make the headers larger."

**Finding the right Forge piece**

> "What's the Forge component for a multi-step form?"

> "Find me an icon that means 'archive'."

**Housekeeping**

> "Delete the Sample page — I don't need it anymore."

> "Format everything and check for type errors."

## Sharing your prototype

**Just ask Claude.** Say things like:

> "Share this — open a PR."

> "Put this online so my PM can see it."

> "I'm ready to send this out for feedback."

Claude will branch off `main`, commit your changes, push, and open a pull request on your behalf.

**To update a shared prototype**, keep working and say:

> "Push my latest changes to the PR."

The same PR updates automatically — no new URL to share.

**If you don't have the GitHub CLI installed**, Claude will still push your branch and hand you a one-click link to open the PR on github.com.

## Using Forge components

Forge components come in through the `@tylertech/forge-angular` wrapper, which gives you Angular-native inputs/outputs and template type-checking. Import the module(s) you need in the component's `imports` array:

```ts
import { Component } from '@angular/core';
import { ForgeButtonModule, ForgeCardModule, ForgeIconModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-example',
  imports: [ForgeButtonModule, ForgeCardModule, ForgeIconModule],
  template: `
    <forge-card>
      <forge-icon name="info"></forge-icon>
      <p>Wrapped, typed, ready to go.</p>
      <forge-button variant="raised">Save</forge-button>
    </forge-card>
  `,
})
export class ExampleComponent {}
```

**Extended components** (`forge-app-layout`, `forge-user-profile`, etc.) aren't in the Angular wrapper — they're registered via side-effect imports in `src/app/app.ts` and the component uses `CUSTOM_ELEMENTS_SCHEMA`. Ask Claude to wire in additional extended components as needed.

**Icons** are registered on demand in the `static {}` block of `src/app/app.ts`. Ask Claude to find and add the right one.

## Project layout

```
src/
├── index.html            – HTML shell + Tyler font
├── styles.scss           – global styles, dark theme, body sizing
├── tailwind.css          – Tailwind + Forge tokens
├── main.ts               – bootstrap
└── app/
    ├── app.ts            – root component, icon + extended-component registration
    ├── app.html          – forge-app-layout shell (app bar, nav, toolbar, footer)
    ├── app.config.ts     – provideRouter + global providers
    ├── app.routes.ts     – lazy-loaded routes
    └── pages/
        ├── dashboard/    – default landing page
        └── sample-page/  – demo route (ask Claude to delete when ready)
```

## Commands

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm start`         | Start dev server at `http://localhost:4200` |
| `npm run build`     | Production build to `dist/`               |
| `npm run watch`     | Rebuild on change (development config)    |
| `npm test`          | Run unit tests with Vitest                |

## Styling — pick the right layer

1. **Forge design tokens** (`var(--forge-theme-surface-dim)`) — anything that must respond to theme switching
2. **Forge-tailwind utilities** (`bg-surface-dim`, `text-body1`, `gap-medium`) — spacing/color that maps to a token
3. **Plain Tailwind** — one-off layout when no token applies
4. **SCSS** — only when you need mixins or build-time features
