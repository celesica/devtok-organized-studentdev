# Get Organized as a Student Developer — companion site

A static companion site for the DevTok Pinas session (August 2026). It replaces a slide deck during the live Discord screen share, then stays online as a permanent reference.

Two routes:

- **The Guide** (`#/00-start` … `#/09-bonus`) — the nine live blocks, one section per tabbed view.
- **The Toolkit** (`#/toolkit`) — templates, checklists, 15 AI prompts, a 12-word glossary, and tools by job.

## Preview locally

The site is plain HTML, CSS, and JavaScript. There is no build step and nothing to install.

**Option 1 — just open it.** Double-click `index.html`. It works directly from `file://`.

**Option 2 — local server** (closest to production):

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Stop it with Ctrl+C.

## Presenting

| Key | What it does |
| --- | --- |
| `←` `→` | Previous / next tab |
| `0`–`9` | Jump straight to that block |

Every tab is its own URL (`#/03-projects`), so it is bookmarkable and shareable, and browser back/forward moves between tabs. Tab switching is instant by design — no animation, since delay is visible over Discord.

Interactive components (the five-layer stack, "Where does this go?", the project tree, the calendar event, the key-in-code walkthrough) all start in a neutral state and reveal on click, so you control the pace. Each has a **Reset** control to re-run it in the next session.

Reset-checklist progress is saved in the visitor's own browser (`localStorage`). Nothing is sent anywhere — there is no backend, no accounts, and no analytics.

## Deploying

The site is a folder of static files, so any static host works. It uses hash routing (`#/03-projects`), so **no redirect or rewrite rules are needed** anywhere.

Publish the **`site/` folder** — not the repository root.

### Netlify

**Drag and drop (fastest):** go to <https://app.netlify.com/drop> and drag the `site/` folder onto the page. You get a public URL in seconds. To update, drag the folder again.

**From the Git repo (auto-deploys on push):**

1. In Netlify, choose *Add new site → Import an existing project* and pick the repository.
2. Accept the defaults — `netlify.toml` in the repository root already sets the publish directory to `site` and leaves the build command empty. Nothing needs configuring in the dashboard.
3. Deploy. Every push to `main` republishes automatically.

Publishing `site` rather than the repository root also keeps `planning/`, `docs/` and `tools/` off the public host.

### Cloudflare Pages

1. In the Cloudflare dashboard, go to *Workers & Pages → Create → Pages → Connect to Git* and pick the repository.
2. Framework preset: **None**. Leave the build command empty.
3. Set **Build output directory** to `site`.
4. Deploy. Every push to `main` republishes automatically.

Cloudflare's CDN generally gives the fastest load on mobile data, which matters for this audience.

### GitHub Pages

GitHub Pages on the free tier requires a **public** repository. If the repo is private, use Netlify or Cloudflare above.

If the repo is public: *Settings → Pages*, set the source to `main` and the folder to `/site`.

## What's in here

```
site/
├── index.html        every view, authored inline (no fetch, so file:// works)
├── css/
│   ├── app.css       layout: tab bar, views, components
│   └── _ds/          the Warm Arcade design system (tokens + components)
├── js/
│   ├── router.js     hash routing, tab state, keyboard nav
│   └── components.js steppers, reveals, checklists, prompt modal, copy buttons
└── assets/           cozy-desk-loop.mp4 — the header footage, copied in by the
                      build. Every other visual is built in HTML/CSS.
```

The header video is decoration: muted, looping, no controls, and hidden from
assistive tech. The copy above it sits on a CSS plum wash, so the header still
reads if the file is slow or never loads.

Fonts load from Google Fonts, which is the only external request. To make the site fully self-contained, download the woff2 files and replace the `@import` lines in `css/_ds/tokens/fonts.css` with `@font-face` rules.

## Editing the content

The copy comes from `planning/site-copy-all-sections.md` and `planning/toolkit.md` in the repository root. **If you change wording on the site, update the matching planning file too** — they are meant to stay in sync, and the planning files are the source of truth.
