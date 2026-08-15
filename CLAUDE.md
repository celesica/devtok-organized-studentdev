# CLAUDE.md

Working guidance for anyone editing this repo — human or AI, whichever tool.
This is a **static website being built for a live event** (DevTok Pinas, Aug 15 2026) that then lives on as a public reference. It carries no user data and has no backend. Planning is complete; the `site/` build is the active work.

| Where to look | |
| --- | --- |
| `README.md` | the outside view (added once `site/` is stable) |
| `docs/prd.md` | product requirements — goals, the two modes, functional/non-functional reqs, DoD |
| `docs/architecture.md` | technical design — routing, folder layout, `_ds` consumption, what's reused vs rebuilt |
| `PROGRESS.md` | the durable board: what is built, what runs, what is open |
| `HANDOFF.md` | the last session boundary, rewritten each session. Read it first when resuming |
| `planning/` | **source of truth** for all copy, IA, components, and the design system. Read-only for the build |

## What this is

A companion website that **replaces a slide deck** for a 90-minute live Discord screen-share, then survives as a permanent, bookmarkable reference for student developers (primarily first-year Filipino CS/IT students). The motive: students are never taught where their work lives, so they lose files, coursework, and portfolio-ready projects. The site gives them four folders, a rule for what goes where, a calendar that reminds them, and a reset routine. Success = it gets **bookmarked and forwarded**. It is explicitly **not** a landing page — nothing is sold; no funnel, CTA, testimonials, or pricing.

```
planning/   read-only source of truth (brief, copy, components, the .dc.html exports, Warm Arcade _ds)
tools/      the build that generates site/ from the exports — see tools/README.md
docs/       prd.md + architecture.md (the design artifacts) + docs/history/ (archived builds)
site/       the deployable static site — GENERATED, do not hand-edit
```

**Commands:** there is no build step, no bundler, no test suite, and no linter. Preview with:
```sh
cd site && python3 -m http.server 8000    # then open http://localhost:8000
# or just double-click site/index.html (file:// must work — this is a hard constraint)
```

## Hard rules

- **The site must run with no build step.** It opens from `file://` (double-click `index.html`) and via `python3 -m http.server`. No framework, no bundler, no npm, no ES-module bare imports, no `fetch()` of local partials (blocked on `file://`). Breaking this breaks the presenter's ability to run it offline.
- **`planning/` build inputs are read-only.** Never modify the `.dc.html` exports, the Warm Arcade `_ds`, or the `.mp4` under `planning/` — those are what the build renders. The copy docs (`site-copy-all-sections.md`, `toolkit.md`) are the exception: they're kept in sync with owner-directed copy changes (see the sync rule below), never edited speculatively.
- **`site/index.html` and `site/css/app.css` are generated.** Rerun `cd tools && node toolkit.js && node build.js` after any change. Hand-edits to those two files are lost on the next build. The generator both (a) renders the `.dc.html` exports and (b) applies **owner-directed copy/structure overrides** for sections 00–02, authored directly in `tools/build.js` — `applyStartCopy()` (00), `applyFoldersCopy()` + the tree/panel constants (01), and `SECTION_02_BODY` (02). Each swap over the export throws if its anchor disappears, so a changed export surfaces at build time. Copy for those sections lives in `build.js`, not the exports.
- **Copy and docs stay in sync.** When site copy changes, update the matching `planning/` doc (`site-copy-all-sections.md`, `toolkit.md`) in the same change, and vice-versa; the site copy must always match `planning/`. Never invent copy. `planning/` is otherwise read-only, but its copy docs **are** edited to mirror owner-directed copy changes (this has happened many times) — always on explicit instruction, never speculatively.
- **Tab switching is instant.** No transition >150ms, no content fade-in. Only one section visible at a time. This is a presentation requirement, not a preference — slow switches are visible over Discord.
- **Design system is law.** Use the Warm Arcade `_ds` tokens exactly (copied into `site/css/_ds/`). No invented colors. No cyan/teal/green/blue, no pure `#000`/`#FFF`. Mono numbers, raster glyphs only, **no emoji ever**, sentence-case headings. Meaning never carried by color alone.
- **Assets are built, not screenshotted.** Every visual is a live HTML/CSS/JS component (decision: fully-built, zero image files). Real screenshots can be dropped into a slot later, but nothing ships depending on an image being supplied.

## There is no…

- **No build step / bundler / npm / test suite / linter.** Do not invent them. Polish comes from design quality, not tooling.
- **No backend, no accounts, no analytics, no AI API.** Prompts are copyable text. Checklist state is browser `localStorage` only, and the site must work fully with storage disabled.

## Settled — reversing one is a real decision

| Constraint | Why, and what it forbids |
| --- | --- |
| **Plain static HTML/CSS/JS, no framework** | Must run offline from `file://` for the live event. Forbids React/Vue/Svelte, JSX, TS, SCSS, any bundler. |
| **Hash routing (`#/03-projects`)** | Works identically on `file://`, local server, GitHub Pages, Cloudflare, Netlify with zero server config. Forbids path-based routing that needs rewrite rules. |
| **Dark Ink-Plum ground (match Claude Design exports)** | Owner decision: disregard the brief's "warm cream page"; follow the `.dc.html` exports and the dark-primary design system. Forbids re-introducing a cream page ground. |
| **Fully-built visuals, zero images** | Owner decision. Crisper over Discord, responsive, accessible. Real screenshots may be added to slots later but are never a dependency. |
| **Two routes only** (`/` guide, `/toolkit` library) | Keeps the live path short and return-visitors' resources reachable in ≤2 clicks. Forbids flattening into many top-level sections. |

## The ritual this runs on

**Ending a session:** (1) overwrite `HANDOFF.md` entirely; (2) fold anything durable into `PROGRESS.md` as one-liners, paragraphs go to `docs/`; (3) touch `CLAUDE.md` only if an invariant changed; (4) commit.

**Starting a session:** `CLAUDE.md` loads itself → read `HANDOFF.md` → open `PROGRESS.md` for the wider board. Verify state from `git` rather than trusting the doc.
