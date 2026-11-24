# Notion — design reference

Source: the Notion DESIGN.md token analysis of `notion.com` / `notion.so`
(homepage, /enterprise, /product/ai, /product/agents, /startups, /pricing).
Everything below is copied from that reference so the `notion` palette in
`src/styles/palette.css` can be traced back to a real Notion value rather than
to a guess.

## Colors

### Brand & primary

| Token | Hex | Use |
| --- | --- | --- |
| primary | `#5645d4` | Signature purple CTA |
| primary-pressed | `#4534b3` | Pressed state |
| primary-deep | `#3a2a99` | Deeper emphasis |
| on-primary | `#ffffff` | Text on primary |
| brand-navy | `#0a1530` | Dark hero band |
| brand-navy-deep | `#070f24` | Deeper navy |
| brand-navy-mid | `#1a2a52` | Mid navy |
| link-blue | `#0075de` | Inline text links |
| link-blue-pressed | `#005bab` | Pressed link |
| brand-orange | `#dd5b00` | Orange accent |
| brand-orange-deep | `#793400` | Deep orange |
| brand-pink | `#ff64c8` | Pink accent |
| brand-pink-deep | `#a02e6d` | Deep pink |
| brand-purple | `#7b3ff2` | Purple accent |
| brand-purple-300 | `#d6b6f6` | Light purple |
| brand-purple-800 | `#391c57` | Deep purple |
| brand-teal | `#2a9d99` | Teal accent |
| brand-green | `#1aae39` | Bright green |
| brand-yellow | `#f5d75e` | Soft yellow |
| brand-brown | `#523410` | Brown |

### Card tints (pastel feature-card backgrounds)

| Token | Hex |
| --- | --- |
| card-tint-peach | `#ffe8d4` |
| card-tint-rose | `#fde0ec` |
| card-tint-mint | `#d9f3e1` |
| card-tint-lavender | `#e6e0f5` |
| card-tint-sky | `#dcecfa` |
| card-tint-yellow | `#fef7d6` |
| card-tint-yellow-bold | `#f9e79f` |
| card-tint-cream | `#f8f5e8` |
| card-tint-gray | `#f0eeec` |

### Surfaces & hairlines

| Token | Hex |
| --- | --- |
| canvas | `#ffffff` |
| surface | `#f6f5f4` |
| surface-soft | `#fafaf9` |
| hairline | `#e5e3df` |
| hairline-soft | `#ede9e4` |
| hairline-strong | `#c8c4be` |

### Text

| Token | Hex | Use |
| --- | --- | --- |
| ink-deep | `#000000` | Pure black |
| ink | `#1a1a1a` | Headlines, body |
| charcoal | `#37352f` | Notion's signature warm charcoal |
| slate | `#5d5b54` | Secondary |
| steel | `#787671` | Tertiary, footer links |
| stone | `#a4a097` | Muted labels |
| muted | `#bbb8b1` | Disabled, placeholders |

### Semantic

| Token | Hex |
| --- | --- |
| success | `#1aae39` |
| warning | `#dd5b00` |
| error | `#e03131` |

## Typography

Notion Sans (an Inter-based variable face); fallbacks Inter, -apple-system,
system-ui, "Segoe UI", Helvetica, sans-serif.

| Token | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| hero-display | 80px | 600 | 1.05 | -2px |
| display-lg | 56px | 600 | 1.10 | -1px |
| heading-1 | 48px | 600 | 1.15 | -0.5px |
| heading-2 | 36px | 600 | 1.20 | -0.5px |
| heading-3 | 28px | 600 | 1.25 | 0 |
| heading-4 | 22px | 600 | 1.30 | 0 |
| heading-5 | 18px | 600 | 1.40 | 0 |
| subtitle | 18px | 400 | 1.50 | 0 |
| body-md | 16px | 400 | 1.55 | 0 |
| body-sm | 14px | 400 | 1.50 | 0 |
| caption-bold | 13px | 600 | 1.40 | 0 |
| button-md | 14px | 500 | 1.30 | 0 |

## Geometry

| Token | Value |
| --- | --- |
| radius xs | 4px |
| radius sm | 6px |
| radius md | 8px (buttons) |
| radius lg | 12px (cards) |
| radius full | 9999px |

Spacing base unit 4px, 8px primary increment. Section rhythm 96px, pricing 64px.
Container 1280px with 32px gutters.

## How this maps onto Focus Lab

`src/styles/palette.css`, the `notion` palette:

- **Grounds** are the card tints first (peach, rose, mint, lavender, sky,
  yellow, yellow-bold, cream, tint-gray, brand-purple-300) followed by the
  neutral surfaces and hairlines (surface, surface-soft, hairline,
  hairline-soft, canvas). This is what makes the page read as Notion and keeps
  it coloured, rather than the near-white text-highlight set.
- **Ink** is `charcoal` `#37352f`, Notion's warm charcoal.
- **Accent** is the signature purple `primary` `#5645d4`.
- **Paper** is `canvas` white; **sheet** is `brand-navy` `#0a1530`.

Two role tokens added for the Notion geometry layer:

- `--radius-surface` (12px) and `--radius-control` (8px) — Notion's sober
  rectangles, applied to panels and buttons.
- `--rgb-hairline` — Notion's 1px warm hairline, applied to panels, tables and
  book covers.
