# DESIGN.md — notify-zh website

Fuente de verdad visual: `public/og-image.png`. Tokens en `src/styles/global.css`.

## Color (OKLCH)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `oklch(0.16 0.035 268)` | fondo body (navy profundo) |
| `--bg-deep` | `oklch(0.13 0.03 268)` | bloques de código, header blur base |
| `--surface` | `oklch(0.21 0.04 268)` | cards, pills |
| `--surface-2` | `oklch(0.25 0.045 268)` | hover de surface |
| `--line` | `oklch(0.32 0.05 268)` | bordes 1px |
| `--ink` | `#fff` | headings, texto fuerte |
| `--ink-soft` | `oklch(0.8 0.03 268)` | body text |
| `--ink-mute` | `oklch(0.65 0.04 268)` | metadatos |
| `--green` | `oklch(0.72 0.19 150)` | acento (KB, success, strings de código) |
| `--indigo` | `oklch(0.55 0.21 275)` | toast info, tab activa, botones primarios |
| `--indigo-chip` | `oklch(0.3 0.08 275)` | fondo de chips |
| `--indigo-text` | `oklch(0.86 0.06 275)` | texto de chips |
| `--orange` | `oklch(0.75 0.16 65)` | toast warning |
| `--red` | `oklch(0.63 0.21 25)` | toast error |
| `--pink` | `oklch(0.68 0.21 355)` | keywords de código |

Glows del fondo: dos radiales fijos en `body::before` — verde-teal abajo-izquierda,
violeta arriba-derecha, alpha ≤ 0.07 (como las esquinas del og-image).

## Typography

- Sans: Inter (400/500/700/800). Headings 800, letter-spacing -0.02em, `text-wrap: balance`.
- Mono: JetBrains Mono (400/600) para todo código.
- H1 hero: `clamp(2.75rem, 6vw, 4.5rem)`.

## Shape & depth

- Radius: toasts/código 12px, cards 14px, chips/botones pill.
- Cards: borde 1px `--line`, SIN shadow. Toasts: shadow `0 8px 24px rgb(0 0 0 / 0.35)`,
  SIN borde. Nunca borde + shadow ancha juntos.
- Prohibido: gradient text, glass, side-stripes, radius ≥24px en cards.

## Motion

- Una orquestación de entrada en el hero (fade+rise staggered de los toasts), transiciones
  120–200ms ease-out en hovers. `prefers-reduced-motion`: todo instantáneo.

## Componentes clave

- **Toast estático** (hero): fondo vivo sólido, texto blanco 700, radius 12, shadow — réplica
  exacta del render de la librería. El stack va levemente desalineado (como el og-image).
- **Code pill**: `--bg-deep`, borde `--line`, mono; sintaxis: keywords `--pink`, strings
  `--green`, resto `--ink`.
- **Chip**: pill `--indigo-chip` + texto `--indigo-text`, 600.
