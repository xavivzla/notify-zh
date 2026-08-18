# Contributing to notify-zh

Thanks for your interest in improving notify-zh! This guide keeps contributions smooth for everyone.

## Setup

```bash
git clone https://github.com/xavivzla/notify-zh.git
cd notify-zh
npm install   # Node >= 22 recommended (required for npm run size)
```

## Development workflow

```bash
npm test            # Jest test suite (jsdom)
npm run test:watch  # watch mode
npm run lint        # ESLint + Prettier
npm run build       # tsup → dist/ (ESM, CJS, IIFE, .d.ts)
npm run size        # size-limit check (3 KB budget for the ESM bundle)
```

To try changes visually, run the demo app: `npm run example:start` (requires [Bun](https://bun.sh)), or open `website/` with `npm run dev` inside it.

## Rules of the road

- **Keep it tiny.** The whole value proposition is ~2.7 KB gzipped with zero dependencies. CI fails if `dist/index.mjs` exceeds 3 KB (brotli). Features that can live in user code probably should.
- **Small API surface.** New public methods need discussion first — open an issue before a PR.
- **Everything in sync.** A new option must land in five places: `src/types/index.ts` (with JSDoc), `src/index.ts`, `README.md`, a test in `test/index.test.ts`, and `website/public/llms-full.txt`.
- **XSS-safe by default.** `message` and `title` use `textContent`. Only `icon.el` may use `innerHTML`, and it must stay documented as trusted-markup-only.
- **SSR-safe.** Guard all DOM access with `typeof document === 'undefined'`.
- **Style.** Prettier is enforced: no semicolons, single quotes, 80 columns. Run `npx eslint "src/**/*.{ts,tsx}" --fix` before committing.

## Pull requests

1. Fork and create a feature branch from `master`.
2. Add tests for any behavior change.
3. Make sure `npm run lint && npm test && npm run build && npm run size` all pass.
4. Update `CHANGELOG.md` under an "Unreleased" heading.
5. Open the PR with a clear description of the motivation and the change.

## Releasing (maintainers)

1. Update `CHANGELOG.md` and bump the version: `npm version minor` (or `patch`/`major`).
2. Push the tag: `git push origin master --tags`.
3. The `Release` workflow tests, builds, checks size, and publishes to npm with provenance.
