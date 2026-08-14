# Warm Arcade — the Jazzy Celesica design system

> "Lofi study room, wired to an arcade cabinet."

## Who this is for

**Jazzy Celesica** turns life into a well-designed game. Computer scientist by degree, electrical engineer in the making, and the architect of **PLANORAMA** — a life OS that runs on quests, XP and seasons instead of guilt. She teaches immigrants, introverts and late bloomers to plan with purpose and begin before they feel ready.

Two identities share one palette: the **cosy lofi study room** (amber lamp, tea, paper) and the **arcade cabinet** (electric glow, CRT, quest markers). The warm neons are the hinge — they belong equally to a reading lamp and to a neon sign. Most neon brands run cool; warm neon is rarer, and it is hers.

**Tone words:** warm, quietly confident, cozy-electric, playful-not-childish, wise.

### Products represented
| Surface | Where it lives | Notes |
| --- | --- | --- |
| **PLANORAMA** — life OS app | `ui_kits/planorama/` | Dark-only arcade surface. Quests, XP, four life areas, 90-day seasons. |
| **jazzycelesica.com** — marketing site | `ui_kits/website/` | Story surface (Pixelify Sans display) with the game layer shown only where the product appears. Ships the dark/light switch. |

### Sources I was given
- A written brand brief (palette, typography, tone, do/don't) pasted into the project — reproduced faithfully in the sections below.
- 27 uploaded image/video assets in `uploads/`, copied and organised into `assets/`.
- **The Celesica logo** (crescent-C circuit mark, supplied 2026-08-14) lives in `assets/logo/` as `celesica-dark.png` (for Ink Plum grounds) and `celesica-light.png` (for Parchment grounds). Pair it with the name in live type; never redraw it, never bake extra text into it.
- No codebase, Figma file or slide deck was provided.

---

## CONTENT FUNDAMENTALS

**Voice.** First person singular for Jazzy ("I turn life into a game you'd actually choose to play"), second person for the reader ("You are not behind. You were handed a harder map."). Never corporate "we" — there is no we. The product speaks in the second person too: *"Your XP is kept. Unfinished quests roll into Season 05."*

**Register.** Warm and specific, never motivational-poster. Sentences are short and declarative, often with a small turn at the end: *"Rest days count — they are on the board."* Concessive honesty is the signature move — name the bad week, then hand over something survivable: *"If it doesn't survive a bad Tuesday, it isn't a system."*

**Casing.** Sentence case for headlines, body copy and buttons. ALL CAPS **only** for: the PLANORAMA wordmark, Space Grotesk section labels/strips (tracked 0.14–0.28em), and mono badges (`STREAK 12`, `SEASON 04`). Never caps for a sentence.

**Numbers.** Numbers are content and always mono: `LV 36 — 7,200/10,000 XP`, `Day 26 / 90`, `$180 / 90 days`. Zero-pad levels and seasons (`LV 07`, `Season 04`). Give a number a unit or a comparison, never a bare stat.

**Copy patterns.**
- Section labels are numbered and terse: `01 — What I build`, `02 — The season loop`.
- Buttons are verbs sized to the promise: "Start Season 05", "Take a seat", "Send it", "Lock it in". Never "Learn more", never "Submit".
- Empty and error states are kind and concrete: *"Pick a time you'll actually be awake."*
- Rewards are short with the number carrying the excitement: *"Quest complete · +120 XP"*.
- Game vocabulary is fixed: **quest** (not task), **area** (not category), **season** (not quarter), **XP**, **level**, **streak**, **vault**, **review**.

**Emoji: never.** Not in UI, not in copy, not in headings. The eight brand glyphs and the mono badges do that job. Unicode `·` is the standard separator in meta lines; `—` for asides.

**Script accent.** Dancing Script appears for one or two words per screen, only ever a noun of intent — "Purpose", "Begin". Never a sentence, never a button.

---

## VISUAL FOUNDATIONS

### Colour
Strict palette; every asset stays inside these hexes. **No cyan, no teal, no green, no blue, no pure `#000` or `#FFF`.**

| Name | Hex | Role |
| --- | --- | --- |
| Ink Plum | `#140D1A` | Dark-mode ground. Near-black with a plum bias, never neutral grey. |
| Neon Rose | `#FF5C8A` | Primary accent. Headlines, glow, CTAs. |
| Ember | `#FF7A45` | Secondary accent. Gradients, highlights. |
| Amber Glow | `#FFB84D` | Warm light source — lamps, string lights, bloom. Rarely a fill. |
| Lilac Signal | `#C9A0F5` | The sole cool note and the system tint. **~5–10% of any frame, max.** |
| Parchment | `#F6EDE3` | Light-mode ground + body text on dark. Warm cream, never white. |
| Wine | `#7A2E48` | Borders, dividers, muted UI. |
| Deep Plum | `#241533` | Raised surfaces — cards, panels, nav. |
| Muted Ink | `#B4A7C2` | Secondary / caption text on dark (lightened from the brief’s #9B8AA6 for legibility). |

**Signature gradient** (`--gradient-xp`): `linear-gradient(90deg,#7A2E48 0%,#FF5C8A 50%,#FF7A45 100%)` — the identity of every progress state (XP bars, streak days). **Buttons and small controls** (primary button, solid badge, checked box, on-switch, active tab, filled level) use `--gradient-cta`: `linear-gradient(90deg,#FF5C8A 0%,#FF7A45 100%)` — the same ramp without the dark wine head, which read as a gloss at control size. Never recolour either, never reverse them, never use them as page backgrounds.

**Accents are light sources, not paint.** Before applying an accent, ask *where is this glowing from?* Glow is always two shadows — tight core plus wide haze (`--glow-rose`, `--glow-ember`, `--glow-amber`). Never a single hard stroke.

**Modes.** Dark is primary and glows generously. Light (`[data-theme="light"]`) is Parchment ground, Ink Plum text, Wine structure — and it **keeps the signature gradient and the bloom**, at roughly half strength: haze radii halve (48px → 22px) and alphas drop to ~.30/.14, so the glow reads as warm diffusion on cream rather than a printing error. Same recipe, quieter light.

### Type
Two display voices mirror the brand's two halves and **never share a surface** — a section is either display-mono (Fira Code) or arcade (Space Grotesk).

| Role | Font | Usage |
| --- | --- | --- |
| Display | **Fira Code** | The heading voice: techy mono display, weights 300–700, ligatures welcome in code-flavoured headings. Glow allowed on dark. |
| Tech display | **Space Grotesk** | The arcade: nav, buttons, section labels, stat headings, card titles. |
| Body | **Plus Jakarta Sans** | Long-form copy, 16/1.62, ~56ch measure. |
| Mono / game layer | **JetBrains Mono** | XP counters, stats, level badges, code, tracked caps strips. |
| Script accent | **Dancing Script** | 1–2 words per screen. |

**Owner override (2026-08-14):** Fraunces was replaced first by a pixel face, then (same day) by **Fira Code** as the display/heading voice (`--font-editorial` keeps its token name for compatibility). Headings and display only, never body copy — JetBrains Mono still owns stats/XP/code. Scale: 64/48/34 display, 32/26/21 headings (Space Grotesk), 18/16/14/13 text, 12 label. Display tracking −0.01em; labels +0.14em; mono strips +0.28em.

### Backgrounds, imagery and texture
- Grounds carry Ink Plum or Parchment. The neons live on top.
- Imagery is **atmospheric painted illustration** — warm, lamp-lit, dusk-toned, soft-edged, slightly grainy. Cosy interiors, desks, mugs, journals, PCBs, keyboards, string lights, a neon rose sign. Palette-locked to the hexes; nothing cool-cast, nothing photographic-cold, nothing black-and-white.
- Imagery goes **full-bleed behind a protection gradient** (`--gradient-protect`, or a left-weighted horizontal scrim) with headlines in live type over the dark side. **Never bake text into an image.**
- Repeating textures (`assets/textures/`): plum noise, parchment grain, dither, blinds, and the constellation-circuit pattern — used at 12–20% opacity as ground tone, never at full strength.
- Atmospheric overlays (`assets/atmospherics/`): bokeh, CRT scanlines, dust, orbs, steam. Layered over imagery or panels at low opacity for bloom and air.
- The motion loop (`assets/motion/motion-circuit-loop.mp4`) sits behind hero content at 40–60% opacity under a protection gradient.

### Surfaces, borders, radii
- Cards: Deep Plum / plum-700 fill, **1px Wine hairline at 55% alpha**, **18px radius**, `--shadow-md` plus a `rgba(246,237,227,.06)` inset top hairline. Optional `lamp` variant overlays a warm radial wash from the top right.
- Radii: 4 / 8 / 12 / 18 / 26 / pill. Controls and progress are pill; cards 18; inputs 8; badges 4.
- Shadows are **plum**, never neutral black: `rgba(13,8,18,.45–.62)`. Glow is a separate, additive layer — never a replacement for depth.
- Transparency + blur is reserved for **fixed chrome and scrims**: the top nav (`rgba(20,13,26,.72)` + 14px blur), the app sidebar, and dialog scrims (6px blur). Body content is never frosted.

### Spacing and layout
4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128). Containers 640 / 880 / 1120 / 1320. Section rhythm is 96px vertical on desktop, 24px gutters. Body measure ~56ch. App shell is a fixed 236px left rail plus a scrolling main column; the nav is the only sticky element on the site.

### Motion, hover, press, focus
- Easing: `--ease-standard cubic-bezier(.2,.7,.3,1)` for most things, `--ease-lift (.34,1.28,.64,1)` for lifts and thumbs, `--ease-out-soft` for bars filling. Durations 90 / 160 / 240 / 420ms; a bloom-in is 900ms. Things warm up, they don't snap — no bounce-heavy, cartoonish motion.
- **Hover:** translateY(−2px) **and the glow gets brighter** (soft → full). Never a colour-darkening hover; light increases instead.
- **Press:** `scale(.975)`, no colour change.
- **Focus:** 2px Ink Plum gap then a 2px Lilac Signal ring — the one job lilac always gets.
- **Disabled:** 42% opacity, glow removed.
- Reduced motion zeroes all durations (already handled in `tokens/motion.css`).

---

## ICONOGRAPHY

There is **one icon set and it is raster**: the eight quest glyphs sliced from the supplied `glyph-sheet.png` into `assets/glyphs/glyph-*.png` (256×256, background removed to transparency): `warning`, `trophy`, `rank-up`, `save`, `spark`, `heart`, `hourglass`, `controller`.

- Style: **logo-matched** — the body carries a slightly deepened rose → ember ramp (`#DB426E → #DB5F34`, left to right, echoing the Celesica mark ~18% darker for contrast) with **amber (#F5B05C) outline and interior details**, chunky arcade silhouettes. On dark surfaces add a rose drop-shadow bloom (`Glyph glow`); in light mode drop the bloom. (Recoloured 2026-08-14 from the original wine/rose cut to match the supplied logo.)
- Use them for quest types, life areas, achievements, nav items, empty states and toast leading marks. Typical sizes 18 / 22 / 28 / 34 / 40px.
- **No icon font, no CDN icon library, no hand-drawn SVG.** If a needed concept is missing from the eight, use live type or a mono badge rather than inventing a glyph — and ask Jazzy for a new sheet entry. No emoji, ever. Unicode is used only for typographic separators (`·`, `—`, `×`) and the checkbox tick.
- The `Glyph` component resolves its own path from the linked `styles.css`, so it works from any folder depth.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link (import list only).
- `readme.md` — this file. `SKILL.md` — Agent-Skills wrapper. `thumbnail.html` — homepage tile.

**`tokens/`** — `fonts.css` (Google Fonts: Fira Code, Space Grotesk, Plus Jakarta Sans, JetBrains Mono, Dancing Script), `colors.css`, `typography.css`, `spacing.css`, `effects.css` (glow/shadow/texture), `motion.css`, `base.css` (element resets, link colours).

**`components/`** — `components.css` holds every component's rules; each component is a thin `.jsx` + `.d.ts` + `.prompt.md`.
| Group | Components |
| --- | --- |
| `core/` | **Button**, **IconButton**, **Card**, **Badge**, **Tag**, **Glyph** |
| `forms/` | **Input**, **Select**, **Checkbox**, **Switch** |
| `game/` | **XPBar**, **LevelBadge**, **QuestCard**, **StatBlock** |
| `navigation/` | **NavBar**, **Tabs** |
| `feedback/` | **Dialog**, **Toast**, **Tooltip** |

*Intentional additions:* no source defined a component inventory (brief-only run), so this is a standard primitive set plus a four-part **game layer** (XPBar, LevelBadge, QuestCard, StatBlock) and **Glyph**, which the brief explicitly requires ("express the game layer through UI").

**`guidelines/`** — 20 specimen cards: colour core/support/gradient/glow/modes, type editorial/tech/body/mono/script/scale, spacing scale/radii/elevation/layout, brand wordmark/glyphs/textures/atmospherics/imagery/motion.

**`ui_kits/`** — `planorama/` (app, 4 screens) and `website/` (marketing site, 4 pages). Each has its own README.

**`assets/`** — `logo/` (Celesica mark, dark + light), `glyphs/` (8 glyphs + original sheet), `imagery/` (14 illustrations, 16:9 and 1:1), `atmospherics/` (5 overlays), `textures/` (4 tiles + constellation pattern), `motion/` (loop + poster).

---

## Known substitutions & gaps
- **Fonts are loaded from the Google Fonts CDN** (`tokens/fonts.css`), not self-hosted binaries — no font files were supplied. All five families are the ones named in the brief, so this is a delivery-method substitution only. For production, download the woff2 files and replace the `@import` lines with `@font-face` rules.
- **No logo mark exists.** Brand name in live type only.
- **No slide template was supplied**, so no slide samples were authored.
