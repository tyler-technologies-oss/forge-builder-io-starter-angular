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
