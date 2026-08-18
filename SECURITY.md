# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.1.x   | ✅        |
| < 1.1   | ❌        |

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Instead, use [GitHub private vulnerability reporting](https://github.com/xavivzla/notify-zh/security/advisories/new) or email **xavivzla.g@gmail.com** with:

- A description of the issue and its impact
- Steps to reproduce (a minimal snippet helps a lot)
- Affected version(s)

You can expect an acknowledgement within a few days. Fixes for confirmed issues are released as a patch version and credited to the reporter unless anonymity is requested.

## Scope notes

- `message` and `title` are rendered with `textContent` and are XSS-safe by design.
- `icon.el` is intentionally injected as HTML for custom icons — passing untrusted input to it is documented as unsafe and is not considered a library vulnerability. Reports about bypasses of the `textContent` paths, however, are very much in scope.
