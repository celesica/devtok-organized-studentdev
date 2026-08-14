# Progress — Get Organized as a Student Developer

Phase: **planning complete, site build not yet started.**

## Current phase
Architect docs written and approved. Local git repo initialized. Next is creating the GitHub repo, finalizing the host, then building `site/` route by route.

## Done
- 2026-08-14 — Read all planning inputs (brief, site copy, interactive components, toolkit, Warm Arcade `_ds`, `.dc.html` exports).
- 2026-08-14 — Wrote `docs/prd.md` (goals, two modes, FR/NFR, DoD).
- 2026-08-14 — Wrote `docs/architecture.md` (static stack, hash routing, folder layout, `_ds` consumption, reuse-vs-rebuild of exports).
- 2026-08-14 — Resolved palette decision: dark Ink-Plum ground, match Claude Design exports (not the brief's cream page).
- 2026-08-14 — Resolved assets decision: fully built, zero image files (screenshots addable later).
- 2026-08-14 — `git init` on `main`; added `.gitignore`; wrote `CLAUDE.md`, `PROGRESS.md`, `HANDOFF.md`.

## In progress
- Nothing actively mid-edit. Awaiting GitHub repo creation (`gh` CLI not installed on this machine — needs install or web creation).

## Next up
- Create the GitHub repo and push `main`.
- Finalize host (GitHub Pages vs Cloudflare Pages — both deploy from the repo; leaning Cloudflare for mobile-data load speed, Pages for simplicity).
- Build `site/`: shell + tab bar + router + keyboard nav first, then guide sections 00→09, then `/toolkit`.

## Watching
- Fonts load from Google Fonts CDN (as the `_ds` ships). Fine for MVP; self-host woff2 for production hardening if load speed on PH mobile data disappoints.

## Deferred
- `.claude/rules/` — not needed yet (one small codebase, nothing to path-scope).
- Root `README.md` — comes last, once `site/` is stable (`site/README.md` preview/deploy guide is the required deliverable).
- Decorative illustrations (D1 header texture, D2 documents+padlock, D3 tidy desk) — optional; build as CSS/SVG or skip.
- Real screenshots for credibility slots — owner may supply later; slots will accept them.

## Known issues
- None yet (no site code).

## Settled — do not reopen without a new fact
- Plain static HTML/CSS/JS, no framework, no build step.
- Hash routing.
- Dark Ink-Plum ground matching the Claude Design exports.
- Fully-built visuals, zero images.
- Two routes only: `/` guide, `/toolkit` library.
- `planning/` is read-only source of truth; copy and planning docs stay in sync.
