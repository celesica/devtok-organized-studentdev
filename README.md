# Get Organized as a Student Developer

A companion website for **DevTok Pinas** (Aug 2026) that **replaces a slide deck** during a live Discord screen-share, then lives on as a permanent, bookmarkable reference for student developers — primarily first-year Filipino CS/IT students.

The motive: students are rarely taught *where their work lives*, so they lose files, coursework, and portfolio-ready projects. The site gives them four folders, a rule for what goes where, a calendar that reminds them, a notes/dashboard home, a workspace setup, and a reset routine. Success = it gets **bookmarked and forwarded**. It is deliberately **not** a landing page — nothing is sold; no funnel, CTA, testimonials, or pricing.

It carries no user data and has no backend. Checklist progress is saved only in the visitor's own browser (`localStorage`).

## Two routes

- **The Guide** — `#/00-start` … `#/08-reset`, one section per tabbed view.
- **The Toolkit** — `#/toolkit`: copyable AI prompts, folder-structure templates (interactive trees), and recurring checklists.

## Quick start

The deployable site is plain HTML/CSS/JS with **no build step and nothing to install** — a hard requirement, so a presenter can run it offline during the event.

```bash
cd site && python3 -m http.server 8000   # then open http://localhost:8000
```

Or just double-click `site/index.html` — it works from `file://`.

## How it's built

`site/index.html` and `site/css/app.css` are **generated**, not hand-edited. The generator lives in `tools/` and turns the Claude Design (`.dc.html`) exports plus owner-directed copy into the static site. Regenerate after changing anything under `tools/` or the toolkit source:

```bash
cd tools && node toolkit.js && node build.js
```

Node is needed only to regenerate; the resulting `site/` folder then runs with nothing installed. There is no bundler, framework, npm, test suite, or linter — by design.

## Repository layout

```
site/       the deployable static site — GENERATED, do not hand-edit
tools/      the generator (build.js + toolkit.js + data) that produces site/
planning/   source of truth for all copy, the design system, and real media
docs/       prd.md + architecture.md (design artifacts) + docs/history/
```

- **Copy** is authored in `planning/site-copy-all-sections.md` and `planning/toolkit.md`. If you change wording on the site, update the matching planning file too — they stay in sync, and `planning/` is the source of truth.
- **Real screenshots/recordings** live in `planning/` and are copied into `site/assets/` by the build.

## Deploying

The site is a folder of static files using hash routing (`#/03-projects`), so **no redirect or rewrite rules are needed** on any host. Publish the **`site/` folder**, not the repo root — that also keeps `planning/`, `docs/`, and `tools/` off the public host. `netlify.toml` in the repo root already sets this up for Netlify (publish `site/`, empty build command, security headers).

See [`site/README.md`](site/README.md) for step-by-step Netlify / Cloudflare Pages / GitHub Pages instructions and the site's internal structure.

## Docs

| File | What it is |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | working guidance and invariants for anyone (human or AI) editing the repo |
| [`docs/prd.md`](docs/prd.md) | product requirements — goals, the two modes, functional/non-functional reqs |
| [`docs/architecture.md`](docs/architecture.md) | technical design — routing, folder layout, what's reused vs rebuilt |
| [`PROGRESS.md`](PROGRESS.md) | the durable board: what's built, what runs, what's open |
| [`HANDOFF.md`](HANDOFF.md) | the last session boundary — read first when resuming |

## Status

Sections 00–08 and the Toolkit are complete. Section 09 (Group projects) is planned for a later session. Next up: deploy to Netlify.
