# Changelog

All notable changes to `notify-zh` are documented here.

## 1.1.0 — 2026-08-18

### Added

- **`notify.promise(promise, { loading, success, error }, options?)`** — shows a sticky loading notification, then replaces it with a success or error notification when the promise settles. `success`/`error` accept a string or a function receiving the resolved value / rejection reason. Returns the same promise.
- **Notification ids + `notify.dismiss(id)`** — `success/error/warning/info` now return a numeric id that can be dismissed programmatically (also removes queued notifications).
- **`closable` option** (per-notification or global via `config`) — renders an accessible close (×) button.
- **Sticky notifications** — pass `time: Infinity` to disable auto-close.
- **Pause on hover** — the auto-close timer pauses while the pointer is over a notification. On by default; disable with `config({ pauseOnHover: false })`.
- **`maxVisible` config** — caps simultaneous notifications per position; extra ones queue and appear as older ones close.
- **CDN/IIFE build** — `dist/index.global.js` exposed via `unpkg`/`jsdelivr` fields; usable as `<script src="https://unpkg.com/notify-zh">` → `window.notify`.
- **Exported types** — `PropsOptions`, `PropsConfig`, `ClassNameOptions`, `PromiseMessages`, `NotificationPosition`.
- **AI-friendly docs** — `llms.txt` + `llms-full.txt` on https://notify-zh.trely.agency and `AGENTS.md` in the repo.
- **`prefers-reduced-motion` support** in the default styles.
- **Size guard** — `size-limit` runs in CI (3 KB budget for the ESM bundle).
- **Release workflow** — publishes to npm with provenance when a `v*` tag is pushed.

### Fixed

- `title` option is now rendered (was documented but ignored).
- `width`/`maxWidth` config options are now applied (were documented but ignored).
- Inline background color no longer overrides per-type `classNames` (Tailwind/Bootstrap classes now win, as documented).
- All methods are SSR-safe: silent no-ops when `document` is undefined (Next.js/Nuxt server render no longer crashes).
- Accessibility: `role="alert"` only for error/warning; success/info use `role="status"`.

### Changed

- True zero runtime dependencies (`tslib` moved to devDependencies).
- Notifications now accept pointer events (needed for close button and hover pause).
- CI modernized: Node 20, actions v4, npm; `size` check added.
- Dependencies: all Dependabot alerts resolved (root tooling + website on Astro 7).

## 1.0.5 and earlier

See the [git history](https://github.com/xavivzla/notify-zh/commits/master).
