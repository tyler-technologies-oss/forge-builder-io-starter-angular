# Forge + Angular Starter for builder.io

An Angular + Tyler Forge starter built to run as a project template inside **[builder.io](https://www.builder.io/)**. Point a builder.io project at this repo and prototype Forge UI with Claude Code — no local plugin install required; Forge MCP connectivity is configured on the builder.io side.

## What's included

- **Angular v21** with standalone components, signals, and lazy-loaded routes
- **[@tylertech/forge](https://forge.tylertech.com/)** with the **[@tylertech/forge-angular](https://www.npmjs.com/package/@tylertech/forge-angular)** wrapper for proper template type-checking and forms integration
- **[@tylertech/forge-extended](https://www.npmjs.com/package/@tylertech/forge-extended)** — `forge-app-layout`, `forge-user-profile`, and other higher-level pieces
- **[@tylertech/forge-ai](https://www.npmjs.com/package/@tylertech/forge-ai)** — first-party chat/agent/copilot UI components
- **[@tylertech/forge-tailwind](https://www.npmjs.com/package/@tylertech/forge-tailwind)** — Forge tokens as Tailwind utilities
- **Tailwind CSS v4** and **SCSS**
- **Light + dark theme wiring**
- **App shell** — app bar, navigation drawer, user profile, page toolbar, footer
- **Claude Code skills bundled locally** — `angular-developer` and `forge-design` under `.claude/skills/`, plus a guardrail hook that nudges Claude to use them. Nothing to install; Forge component/token knowledge ships with the repo, and Forge MCP tool access comes from builder.io's configured MCP server.

## Getting started

This kit is designed to be used **through builder.io** — create (or point) a builder.io project at this repo, and builder.io handles cloning, dependency install, and connecting Claude Code to the Tyler Forge MCP server.

To run it locally instead:

```sh
npm install
npm start
```

Then open Claude Code in the project folder. The bundled skills (`angular-developer`, `forge-design`) load automatically, and `.claude/hooks/enforce-skills.mjs` will prompt for one-time approval — say **yes**, otherwise Claude will occasionally write Forge/Angular code from memory instead of from the skills. If a skill doesn't seem to be loaded, run `/skills` to check, or `/reload-skills` to force a reload.

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

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `npm start`     | Start dev server at `http://localhost:4200` |
| `npm run build` | Production build to `dist/`                 |
| `npm run watch` | Rebuild on change (development config)      |
| `npm test`      | Run unit tests with Vitest                  |

## Styling — pick the right layer

1. **Forge design tokens** (`var(--forge-theme-surface-dim)`) — anything that must respond to theme switching
2. **Forge-tailwind utilities** (`bg-surface-dim`, `text-body1`, `gap-medium`) — spacing/color that maps to a token
3. **Plain Tailwind** — one-off layout when no token applies
4. **SCSS** — only when you need mixins or build-time features
