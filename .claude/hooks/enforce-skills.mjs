#!/usr/bin/env node
// UserPromptSubmit hook — deterministic guardrail that injects a
// skill-invocation reminder when the user's prompt implies Angular
// work or Forge UI work. This runs OUTSIDE the model so it can't be
// skipped.
//
// The hook only adds context; it never blocks. Worst case it's a
// harmless nudge that Claude already planned to follow.
//
// Non-technical wording matters: most authors here are designers and PMs.
// We fire on plain-English intent ("add a page", "make a form", "wire up
// the settings screen") — not just on framework jargon.

import { readFileSync } from 'node:fs';

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  // If stdin is not JSON for any reason, exit silently — don't block the prompt.
  process.exit(0);
}

const prompt = String(payload.prompt || '').toLowerCase();

// --------------------------------------------------------------------------
// Angular-specific triggers (technical vocabulary)
// --------------------------------------------------------------------------
const angularTechTriggers = [
  'angular',
  'ng ',
  'ng-',
  'ngmodule',
  'standalone component',
  'signal',
  'signals',
  'computed(',
  'linkedsignal',
  'resource(',
  'httpresource',
  'signal form',
  'reactive form',
  'template-driven',
  'input()',
  'output()',
  'model input',
  'inject(',
  'providedin',
  'injectiontoken',
  'routerlink',
  'routeroutlet',
  'canactivate',
  'canmatch',
  'resolvefn',
  'ssr',
  'hydration',
  'onpush',
  'ng build',
  'ng serve',
  'ng generate',
  'ng test',
  'ng new',
  'ng add',
  'angular cli',
  'zone.js',
  'zoneless',
  'rxjs',
  '@component',
  '@directive',
  '@injectable',
  '@ngmodule'
];

// --------------------------------------------------------------------------
// Plain-English intent — designer / PM vocabulary.
// If someone says "add a page", "make a form work", "hook up the button",
// "wire up navigation", etc., we treat it as Angular work.
// --------------------------------------------------------------------------

// Action verbs — the "I want to change something" signal.
const changeVerbs =
  /\b(add|adds|added|build|builds|built|create|creates|created|make|makes|made|design|designs|designed|prototype|prototypes|edit|edits|edited|update|updates|updated|change|changes|changed|tweak|tweaks|tweaked|adjust|adjusts|adjusted|rename|renames|renamed|remove|removes|removed|delete|deletes|deleted|new|refactor|refactors|refactored|convert|converts|converted|move|moves|moved|split|splits|splitted|extract|extracts|extracted|wire\s?up|wires\s?up|wired\s?up|hook\s?up|hooks\s?up|hooked\s?up|hook\s?into|connect|connects|connected|implement|implements|implemented|swap|swaps|swapped|replace|replaces|replaced|introduce|introduces|introduced)\b/;

// Nouns that describe app surface area — pages, features, flows, etc.
const appNouns =
  /\b(page|pages|screen|screens|view|views|route|routes|routing|navigation|nav\s?bar|sidebar|side\s?nav|drawer|menu|component|components|widget|widgets|feature|features|module|modules|flow|flows|workflow|workflows|section|sections|panel|panels|tab|tabs|form|forms|field|fields|input|inputs|button|buttons|dialog|dialogs|modal|modals|toast|toasts|alert|alerts|banner|banners|table|tables|list|lists|card|cards|dashboard|dashboards|report|reports|chart|charts|state|store|service|services|api|endpoint|endpoints|data|logic|behavior|behaviour|validation|handler|handlers|listener|listeners|event|events|error|errors|loading|spinner|skeleton|placeholder|toggle|toggles|switch|switches|filter|filters|search|sort|pagination|paginator|stepper|wizard|onboarding|profile|settings|preferences|admin|home|landing)\b/;

// "The app" phrasings — anything that implies operating on the running
// Angular application even without a specific noun.
const appPhrases =
  /\b(the app|this app|the site|the ui|the frontend|the front[- ]end|application[- ]wide|throughout the app|across the app)\b/;

const isAngularTech = angularTechTriggers.some((t) => prompt.includes(t));

// Intent-driven detection: designer says "add a page" / "make a new form"
// / "wire up the button" — we treat as Angular work.
const isAngularIntent =
  (changeVerbs.test(prompt) && appNouns.test(prompt)) || appPhrases.test(prompt);

const isAngular = isAngularTech || isAngularIntent;

// --------------------------------------------------------------------------
// Forge triggers — component/UI vocabulary (Forge is the design system,
// so any UI-shaped work should route through it).
// --------------------------------------------------------------------------
const forgeTriggers = [
  'forge',
  'tyler',
  'forge-',
  'tyler-icons',
  'forge-tailwind',
  'card',
  'button',
  'dialog',
  'toolbar',
  'app bar',
  'app-bar',
  'side nav',
  'side-nav',
  'sidebar',
  'drawer',
  'icon',
  'tooltip',
  'chip',
  'badge',
  'menu',
  'list',
  'table',
  'text field',
  'text-field',
  'checkbox',
  'radio',
  'select',
  'tab',
  'stepper',
  'scaffold',
  'layout',
  'ui',
  'screen',
  'dashboard',
  'header',
  'footer',
  'nav',
  'banner',
  'toast',
  'modal',
  'form',
  'chart',
  'skeleton',
  'spinner'
];

const isForge =
  forgeTriggers.some((t) => prompt.includes(t)) ||
  (changeVerbs.test(prompt) && /\b(page|screen|view|component|ui|layout)\b/.test(prompt));

if (!isAngular && !isForge) {
  process.exit(0);
}

const reminders = [];

if (isAngular) {
  reminders.push(
    'This prompt implies Angular application work (new pages, new features, routing, forms, state, services, etc.). Before writing or editing any .ts, .html, or .scss inside src/, you MUST invoke the `angular-developer` skill and follow the referenced guides for the relevant surface (components, signals, forms, routing, DI, styling, testing). Do not rely on memory of older Angular patterns — v20+ standalone components, native control flow, signals, and the `inject()` function are the defaults here.'
  );
}

if (isForge) {
  reminders.push(
    'This prompt involves Tyler Forge UI. Before picking components, laying out a page, choosing icons, or writing any `<forge-*>` markup you MUST invoke the `forge-design` skill. Trust its catalog over your recollection of component names, attributes, or icon names. In Angular templates always use the wrapper modules from `@tylertech/forge-angular`, never raw `<forge-*>` custom elements bypassing the wrappers.'
  );
}

reminders.push(
  'These skill invocations are non-negotiable guardrails for this repo — skipping them has led to broken results. Load the skill(s), then proceed.'
);

const additionalContext = `<skill-guardrails>\n${reminders
  .map((r) => `- ${r}`)
  .join('\n')}\n</skill-guardrails>`;

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext
    }
  })
);
