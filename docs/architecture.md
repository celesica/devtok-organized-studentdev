# Technical Architecture — Get Organized as a Student Developer

**Status:** Architect draft · **Implements:** `docs/prd.md`
**Stack:** Plain static HTML + CSS + JS. No framework, no build step, no bundler, no backend.

---

## 1. Principles

1. **No build step.** The site must open by double-clicking `index.html` (`file://`) and via `python -m http.server`. This rules out ES-module bare imports that need a server for MIME reasons only where avoidable, JSX, TypeScript, SCSS, and npm. Everything ships as authored.
2. **Presentation is the hard constraint.** Instant tab switching (≤150ms, no fade), one section in the DOM-visible state at a time, keyboard-first control. Every design choice defers to the live-screen-share use case.
3. **Progressive enhancement.** Core content and navigation work without JS where feasible; interactive components degrade to plain expandable/checkable blocks. Checklist persistence is optional, never required.
4. **Design system is law.** All color, type, spacing, and component tokens come from the Warm Arcade `_ds`. No invented values. See §6.
5. **Text-bearing visuals are built in code**, never generated images (trees, tables, layer stacks, comparisons). Only real screenshots and the 3–4 decorative illustrations are image assets.

## 2. Folder & file layout

```
site/
├── index.html              # single entry; hosts both routes via hash router
├── README.md               # preview + deploy instructions
├── css/
│   ├── app.css             # site-specific layout: tab bar, views, components
│   └── _ds/                # copied verbatim from planning _ds (see §6)
│       ├── styles.css
│       ├── tokens/*.css
│       └── components/components.css
├── js/
│   ├── router.js           # hash routing, tab state, keyboard nav, back/forward
│   ├── components.js        # PromptCard modal, checklist, copy buttons, steppers
│   └── data/
│       ├── guide.js         # (optional) section metadata: id, number, label, level
│       └── toolkit.js       # (optional) prompts/templates/glossary data
├── content/                # (option B) per-section HTML partials, if fetched
└── assets/
    ├── glyphs/             # raster quest glyphs from _ds (if used)
    ├── screenshots/        # S1–S6 real screenshots (placeholders until supplied)
    └── decorative/         # D1–D3 illustrations (placeholders until supplied)
```

**Single-file content decision:** because the site must run from `file://` (where `fetch()` of local partials is blocked by CORS in most browsers), **all section markup is authored inline in `index.html`** as a series of `<section>` views, one per tab. No runtime templating, no `fetch`. `js/data/*.js` are plain `<script>` globals (not ES modules) so `file://` works. This is the safest path to NFR4 (no build step, no console errors) and is the recommended approach.

## 3. Routing & tab model

**Hash routing**, chosen because it works identically on `file://`, `python -m http.server`, Netlify, and GitHub Pages with zero server config (no rewrite rules, no 404 fallback needed).

- URL scheme: `#/00-start`, `#/01-folders`, … `#/09-bonus`, `#/toolkit`.
- `router.js` owns a single ordered list of routes. On `hashchange` and initial load it:
  1. Reads `location.hash`, resolves to a route (falling back to `#/00-start`).
  2. Toggles `.is-active` on the matching `<section>` and hides the rest via `hidden` / `display:none` — **only one section in flow at a time** (FR5, NFR1).
  3. Updates the active tab's `aria-selected` / `.active` and scrolls it into view in the mobile strip.
  4. Moves focus to the section heading for screen-reader users.
- **Instant switching:** switching is a class/attribute toggle plus `display` swap — no transition on the section container, no opacity animation. Any motion is confined to inside-component reveals (≤250ms), gated by `prefers-reduced-motion`.
- **Back/forward:** because navigation only ever sets `location.hash`, the browser history stack is populated for free; back/forward fire `hashchange` and the router responds (FR3).

**Keyboard navigation (FR4)** — a single `keydown` listener on `document`:
- `ArrowLeft` / `ArrowRight`: move to previous/next route in the ordered list (guide tabs; Toolkit included at the end).
- Digit `0`–`9`: jump directly to guide block `NN`. Suppressed when focus is in an input, textarea, or open modal so typing in a prompt/search field is unaffected.
- Handler is a no-op when a modal is open except for `Escape` (modal owns its own trap).

**Previous/Next (FR6):** each view's footer renders links whose `href` is the neighboring route hash — pure anchors, so they work without JS too.

## 4. Interactive components (`components.js`)

All are class-based, initialized once on load by scanning for data-attributes (`data-component="stack" | "prompt" | "checklist" | …`). Shared contract: **neutral initial state, click-to-reveal, Reset control, keyboard operable, reduced-motion aware.**

| Component | Behavior | Degrades to |
|---|---|---|
| **Five-layer stack** (FR14) | Next/Back/Reset step through Folder→Project→Editor→Git→GitHub; accumulated layers stay visible; Arrow/Enter operable | All five layers shown statically |
| **Where does this go?** (FR13) | Six item buttons; click reveals folder + reasoning; Reset clears | Static list of item→folder+reason |
| **Project tree explorer** (FR15) | Clickable rows reveal what/when/convention-or-optional in a side panel; horizontal-scroll panel on mobile | Tree with inline annotations |
| **Reset checklist** (FR16) | Grouped checkboxes; state in `localStorage` (namespaced key); visible Reset; copy-as-text | Plain checkboxes (no persistence) |
| **PromptCard + modal** (FR17) | Collapsed card → modal with full text, Copy, Esc-to-close, focus trap + restore | `<details>` expandable block |
| **Copy buttons** (FR19) | `navigator.clipboard.writeText` with `execCommand('copy')` fallback; confirmation state | Selectable text (button hidden if no JS) |
| **Toggles/steppers** (FR18) | Upskilling by-topic/by-platform, structure ladder, naming/commit comparison, key-in-code, where-work-lives, toolkit Now/Soon/Later filter | Both states shown, or static tree |

**Persistence:** checklist writes to `localStorage["sdev.reset.v1"]`. All access wrapped in try/catch so blocked storage (private mode, disabled) throws nothing and simply loses persistence (NFR8).

**Focus management:** the PromptCard modal stores the trigger element, traps Tab within the dialog, and restores focus on close (FR17 acceptance).

## 5. Reuse of the `.dc.html` exports

The Claude Design exports (`Student Dev Guide.dc.html`, `Toolkit.dc.html`) are **visual references, not shipped files**. They depend on a Claude Design runtime (`support.js`, `image-slot.js`, `_ds_bundle.js`, and `<x-dc>` / `<helmet>` custom elements) that must be stripped.

**Rebuilt (not reused as-is):**
- Page shells, `<x-dc>`/`<helmet>` wrappers, and all three runtime scripts → removed. Clean semantic HTML authored fresh in `site/index.html`.
- Image slots (`image-slot.js` placeholders) → replaced with real `<img>` (screenshots/decorative) or `<figure>` placeholders with alt text until assets are supplied.

**Reused (harvested from the exports):**
- The inline `<style>` blocks in each export are high-quality, token-driven CSS (`.tabbar`, `.tree`, `.panel`, `.closer`, `.ckbox`, `.tkpanel`, `.tkcard`, `.modal`, etc.). These are lifted into `css/app.css`, cleaned, and de-duplicated. They already consume the `_ds` custom properties correctly, so they are the fastest correct starting point for the component styling.
- The DOM structure/class names for tab bar, trees, closers, checklists, PromptCard, and the toolkit bands are used as the template for the rebuilt markup.

So: **CSS and structure are reused; the Claude Design runtime and image-slot mechanism are rebuilt/removed.**

## 6. Consuming the Warm Arcade `_ds`

- The entire `_ds/warm-arcade-…/` directory is **copied into `site/css/_ds/`** so the site is self-contained and deployable (no reference back into `planning/`, which is read-only).
- `index.html` links `css/_ds/styles.css` (which `@import`s the six token files + `components.css`), then `css/app.css` last so site rules layer on top of tokens.
- **Tokens are used exactly**: colors (`--ink-plum`, `--parchment`, `--neon-rose`, `--ember`, `--amber-glow`, `--lilac-signal`, `--wine`, `--deep-plum`, `--muted-ink`), gradients (`--gradient-xp`, `--gradient-cta`), glow/shadow effects, type tokens (`--font-editorial`=Fira Code display, `--font-tech`=Space Grotesk, `--font-body`, `--font-mono`=JetBrains Mono), spacing, radii, motion. No new hexes are introduced.
- **Readme constraints enforced:** sentence-case headings; mono numbers; raster glyphs only (no icon font/SVG/emoji); no cyan/teal/green/blue; no pure `#000`/`#FFF`; Lilac Signal limited to ~5–10% and reserved for the focus ring.
- Fonts load from Google Fonts via `tokens/fonts.css` `@import` (as the DS ships). This is the one network dependency; acceptable for MVP and legible under compression. A production hardening note (self-host woff2) goes in `site/README.md`.

**Dark-panel signature vs. warm page — the one open decision.** The brief §8 describes a *warm cream page with dark technical panels*. The supplied design system is **dark-primary** (Ink Plum ground, Parchment text) and both `.dc.html` exports render on the **dark** ground; the DS also ships a `[data-theme="light"]` Parchment mode. Because the design system is the stated source of truth for color and the approved exports are dark, **the recommended build matches the exports: Ink Plum ground with technical panels set off in `--plum-900`**, keeping the warm/dark contrast via surface and glow rather than a cream page. This is the single item worth confirming with the presenter before or during the Developer phase; it does not block starting the build, since switching ground later is a token/`data-theme` change, not a restructure.

## 7. Responsive strategy

- **Trees & code panels:** `overflow-x:auto` inside a bordered panel; `white-space:pre`; never wrap or shrink below legibility (brief §12).
- **Tab bar:** desktop = full row; ≤768px = horizontally scrollable strip with active tab scrolled into view; never wraps to a second row (FR7). Dropdown fallback only if the strip proves too cramped.
- **Side-by-side comparisons:** CSS grid/flex that stacks vertically with a label on each half at narrow widths.
- **Touch:** copy buttons and checkboxes are ≥44px targets with visible confirmation.
- Breakpoints kept minimal (one primary at ~768px) to stay within a small hand-authored stylesheet.

## 8. Accessibility & performance

- Semantic landmarks (`<nav>` tab bar with `role="tablist"`/`tab`/`tabpanel` semantics, `<main>`, `<section aria-labelledby>`), visible focus (the DS Lilac Signal ring), full keyboard operation for every interactive component, alt text on meaningful images, `prefers-reduced-motion` zeroing all reveal durations.
- Performance budget: no framework, no bundler, no WebGL, no video, no animation library. Total JS is three small hand-authored files. Only external fetch is Google Fonts. This satisfies "fast on mobile data" (NFR4/NFR5).

## 9. Build order (Developer phase)

Per brief §15, `/` is launch-critical; `/toolkit` may ship partial provided templates and the reset checklist are live by event day.

1. Shell: `index.html`, `_ds` copy, `app.css` skeleton, tab bar + router + keyboard nav (routes render empty). Verify FR1–FR7, NFR1.
2. Guide sections 00→09, one route at a time, with real copy, badges, level markers, closers, key takeaways (FR8–FR12).
3. Interactive components in section order: Where-does-this-go (01) → five-layer stack + project tree (03) → reset checklist (08), then the supporting steppers.
4. `/toolkit`: templates → reset checklist mirror → prompts (PromptCard) → glossary → tools. Copy buttons throughout.
5. `site/README.md`, cross-browser/`file://` smoke test, console-error check, 375px pass, keyboard/deep-link/back-forward pass.
