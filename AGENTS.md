# AGENTS.md — notify-zh

Instructions for AI coding agents (Claude Code, Cursor, Copilot, Codex, etc.) working on this repository.

## What this project is

`notify-zh` is a zero-dependency, ~2 KB (gzipped) toast/notification library for the browser. It ships as ESM + CJS + IIFE (CDN) from a single TypeScript source file. It has no framework bindings — the same singleton works in vanilla JS, React, Next.js, Vue, Angular, and Svelte.

## Repository layout

```
src/index.ts        The entire library: a Notify class + exported singleton
src/types/index.ts  Public TypeScript types (PropsOptions, PropsConfig, ...)
src/global.ts       CDN entry — assigns window.notify (built to dist/index.global.js)
test/index.test.ts  Jest + jsdom test suite
tsup.config.ts      Build config (ESM/CJS + IIFE)
example/            Minimal demo app (Bun)
website/            Docs site (Astro + Tailwind) deployed at https://notify-zh.com
```

`dist/` is generated — never edit it by hand.

## Commands

```
npm install         # install dependencies
npm test            # Jest test suite (jsdom)
npm run lint        # ESLint + Prettier rules
npm run build       # tsup → dist/ (ESM, CJS, IIFE, .d.ts)
```

Node >= 20 required. CI (`.github/workflows/main.yml`) runs lint → test → build on every push/PR.

## Conventions

- Prettier: no semicolons, single quotes, no trailing commas, 80 cols. Run `npx eslint "src/**/*.{ts,tsx}" --fix` after editing.
- The public API surface is intentionally tiny: `success`, `error`, `warning`, `info` (return numeric ids), `promise`, `dismiss`, `dismissAll`, `config`. Discuss before adding methods.
- `size-limit` runs in CI with a 3 KB budget for `dist/index.mjs` — check `npm run size` after adding code.
- All public options must be typed in `src/types/index.ts` with JSDoc, implemented in `src/index.ts`, documented in `README.md`, covered by a test, and reflected in `website/public/llms-full.txt`. Keep these five in sync — options documented but not implemented is the #1 historical bug in this repo.
- `message` and `title` are rendered with `textContent` (XSS-safe). Only `icon.el` uses `innerHTML` — keep it that way and never route user-supplied strings through innerHTML.
- Every public method must be SSR-safe: guard DOM access with `typeof document === 'undefined'`.
- Tests share one jsdom document and the singleton; use unique message strings per test instead of resetting the DOM.

## Releasing

`npm run deploy` runs tests + build and publishes to npm (maintainer only). Version bumps via `npm version patch|minor|major`.
