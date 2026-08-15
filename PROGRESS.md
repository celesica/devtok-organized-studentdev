# Progress — Get Organized as a Student Developer

Phase: **generated site is live-quality; working through the sections with the owner, front to back.**

## Current phase
`site/` is generated from the `.dc.html` exports by `tools/build.js`. On top of the export, the build applies owner-directed copy and interactive components section by section. **Sections 00, 01, and 02 are through a full owner pass**; 03–09 still render the original export copy. All work is committed and pushed to `main`; the tree is clean. 60 headless-Chrome assertions pass after every change.

The interactive vocabulary built this pass and reused across sections: branded folder trees (`ftree()`, native `<details>`, collapsed by default with a Collapse | Expand toolbar, PDF/MD file glyphs), the non-breaking-hyphen pass (`nbHyphenate()`), the numbered-list conversion (`numberedTableToOl()`), and colour utilities (`.amber`, `.flit` = Lilac Signal, `.fdir` = Ember).

## Done
- 2026-08-14 — Read all planning inputs (brief, site copy, interactive components, toolkit, Warm Arcade `_ds`, `.dc.html` exports).
- 2026-08-14 — Wrote `docs/prd.md` (goals, two modes, FR/NFR, DoD).
- 2026-08-14 — Wrote `docs/architecture.md` (static stack, hash routing, folder layout, `_ds` consumption, reuse-vs-rebuild of exports).
- 2026-08-14 — Resolved palette decision: dark Ink-Plum ground, match Claude Design exports (not the brief's cream page).
- 2026-08-14 — Resolved assets decision: fully built, zero image files (screenshots addable later).
- 2026-08-14 — `git init` on `main`; added `.gitignore`; wrote `CLAUDE.md`, `PROGRESS.md`, `HANDOFF.md`.
- 2026-08-14 — Created private GitHub repo `celesica/devtok-organized-studentdev`; pushed `3d83c77`.
- 2026-08-14 — Built `site/`: shell, tab bar, hash router, keyboard nav, all 10 guide views, full `/toolkit`, all interactive components, `site/README.md`.
- 2026-08-14 — Verified v1 in headless Chrome: 26 behavioural assertions pass.
- 2026-08-14 — Fixed list markers: the markup was missing the design system's `.wa-list` classes.
- 2026-08-14 — Archived v1 to `docs/history/site-v1-2026-08-14/`.
- 2026-08-14 — Wrote `tools/build.js` + `tools/toolkit.js`; regenerated `site/` from the exports so copy and design match the owner's file. Toolkit content had to be expanded from JS data arrays via `<sc-for>` loops.
- 2026-08-14 — Rewrote `site/js/components.js` as a state machine replacing the export's React runtime; 38 assertions pass, no console errors, `file://` works, no 375px overflow.
- 2026-08-14 — Restored the built mockups into all seven screenshot slots (`tools/mockups.js`); dropped the export's fixed-height wrappers so they size themselves.
- 2026-08-14 — Replaced my per-section prev/next with the export's own shared bar ("Previous — 01 Folders" / "Next — 03 Projects") and its `LABELS`.
- 2026-08-14 — Seeded component defaults from the export's initial state; without them the stack, tools filter, ladder and upskilling toggle all opened on nothing.
- 2026-08-14 — Active tab restyled to the rose wash + rose border + soft glow the owner asked for.
- 2026-08-14 — Badges restyled as pill tags, a step smaller, moved to the head of their line (a first attempt crossed element boundaries and moved one into the wrong band; fixed with a tempered pattern and verified tag-for-tag against the export).
- 2026-08-14 — Section closers take the design system's lamp-card wash with an ember label; tabs reshaped Chrome-style with dividers and flared feet; prev/next pinned to the viewport foot.
- 2026-08-14 — Fixed the router bug where `closest("[data-route]")` matched the enclosing section, so every in-page click re-navigated and scrolled to top (and its `preventDefault` blocked `<details>` from opening).
- 2026-08-14 — Section 00 header rebuilt from `site-copy-all-sections.md`: gold subtitle, full lede, labelled TL;DR.
- 2026-08-14 — Added `site/js/reveal.js`: one subsection at a time per section, with a right-hand dot rail, a Continue button, and scroll/wheel advance. Off below 860px and on the toolkit.
- 2026-08-14 — Pre-event pass: 60 assertions run three ways (local server, `file://`, served subpath) — all pass, no console errors.
- 2026-08-14 — Fixed the one bug it found: the calendar week mock overflowed 375px (five 1fr columns hit their min-content floor). Now two columns below 640px, `min-width:0` on `.calday`.
- 2026-08-14 — Section 00 header reworked to the owner's design: subhead + the original lede paragraph, meta now `Prepped by: Jazzy · DevTok Pinas`, copy pinned to the left so the desk stays in frame on the right, over the looping desk footage. No play control — it always loops.
- 2026-08-14 — Mobile (<760px) keeps the pre-video header: no footage, centred column, solid TL;DR card. The mp4 is loaded via an inline `matchMedia` guard, so phones never download the 2.5 MB file (verified: 0 bytes fetched at 375px).
- 2026-08-14 — Header polish: a full-width rose hairline under the tab bar separates nav from content; title and subhead break at fixed points on desktop (`<br class="hbr">`, desktop-only) rather than reflowing with the container. (An intermediate top-alignment of the eyebrow was reverted — owner preferred the lower, roughly-centred group, so the hero keeps its 64/72 padding.)
- 2026-08-14 — Start-page copy rewrite (owner-directed, first-person voice): meta moved directly under the subhead; new two-paragraph description and TL;DR in the hero; "Why this matters" → "Why I think this matters" with an intro + reframed bullets; "What you'll have at the end" bullets updated (calendar / backup+password / notes+dashboard / reset); folder-mock caption changed to "Recommended folder setup"; the UNDERSTAND closer reworded. Applied via `applyStartCopy()` in the build (each swap throws if its export anchor is gone) and mirrored in `planning/site-copy-all-sections.md`.
- 2026-08-14 — Section 01 emphasis: "both code and documents" bolds Code / Requirements… and colours Development / Studies in Amber (`.amber`); "Where does this go?" bolds the destination folder in each revealed answer; Key takeaways bolds the folder names.
- 2026-08-14 — Section 02 (Organizing your school files) rebuilt from `section-02-organizing-your-school-files.md` — new cover, an interactive branded structure tree (subjects hold lectures/assignments/exams), reworded naming habits (the tap-to-reveal table kept), end-of-term and scattered-files sections, and updated key takeaways + DO. Two lines dropped per owner instruction (the "separate archive process" line and the "Finished terms can stay where they are" takeaway). Built wholesale via `SECTION_02_BODY` in `sectionBody`.
- 2026-08-14 — Section 01 restructure: fixed the "Where does this go?" reveal cards (the `.ibtn` base class was lost when `convert()` emptied the `{{c4c.x}}` binding — now restored globally, so answers stay hidden until clicked); "Where organization work goes" pulled out of the decision band into its own band right after the four folders (reworded); the decision band rewritten to the two-question format; "When something has both code and documents" mapping and the HOW I DO IT line reworded; a plain personal-files caveat line added at the foot of the four-folders band; Upskilling captions moved above their trees; Key takeaways and the DO closer rewritten.
- 2026-08-14 — Section 01 Upskilling + Career rewritten from owner copy: Upskilling gets the React example, a "By topic" chip carrying a RECOMMENDED badge over a nested topic→source tree, a "By source" chip (renamed from "By platform"), and a "pick what feels natural" note. Career gets the new description and a folder tree that includes files — the build's tree helper now renders PDF and MD file glyphs (a document with a folded corner and an Ember/Lilac type tag), applications/ expands to accenture/ibm/canva with job-posting/resume/cover-letter/notes files, plus the explainer bullets, the "Organizing your applications" subsection, and a Notion side note. Whole panels swapped via `UPSKILLING_PANEL`/`CAREER_PANEL`.
- 2026-08-14 — Section 01: cover copy updated (What this section covers / Why it matters). All four folder illustrations (Studies, Development, Upskilling ×2, Career) are now interactive branded folder trees — native `<details>`/`<summary>`, branded `.ficon` glyphs, click a folder to expand (works from `file://`). Each tree lives inside its own folder panel, so nothing shows until a card is clicked (fixes the Studies tree leaking under Development). Trees are collapsed by default with a lowkey "Collapse | Expand" toolbar (handled in `components.js` via `texp`/`tcol`). The four folder cards sit on one row (`.fgrid`, stacks below 820/460px). Studies' Y1T1 is populated with a real BSIT first-term schedule as a worked example; terms run Y1T1, Y1T2, Y2T1, Y2T2. Built by `applyFoldersCopy()`; long names scroll inside the tree (`overflow-x:auto`).
- 2026-08-14 — Hyphenated prose words no longer split across lines: `nbHyphenate()` in the build swaps the ASCII hyphen in letter/digit-bounded words for a non-breaking hyphen (U+2011, visually identical) in text nodes only. `<pre>`, `<script>`, `<style>`, `<table>` (filename examples that must stay breakable), and all tag attributes are protected, so the media query, data-* attributes, and file trees keep real hyphens.
- 2026-08-14 — "What this guide covers" now renders as the design system's numbered list (`.wa-list--ol`: rose mono numerals) instead of a plain `.mono` table. `numberedTableToOl()` in the build converts any `.tbl` whose rows are all mono numerals; the filename-example tables (non-numeric first cell) stay tables.
- 2026-08-14 — `build.js` now copies `planning/Cozy Desk Loop.mp4` into `site/assets/`, so `site/` stays self-contained; it throws if the source is missing.
- 2026-08-14 — Added root `netlify.toml` (publish `site`, empty build command, nosniff + no-referrer headers) so a git-connected deploy needs no dashboard configuration.

## In progress
- Section-by-section owner content pass. Done through **02**; **03 Your coding projects** is next.

## Next up
- Continue the owner content pass on sections **03–09** (each still on export copy), likely with the same interactive-tree / colour vocabulary.
- Connect **Netlify** (host already decided): *Add new site → Import an existing project* → pick the repo → accept the defaults (`netlify.toml` supplies them) → deploy. This can happen any time; the site is deployable now.
- Resolve the open content items: section 06 links (Notion template, recording URL), section 08 presenter sign-off, section 09 closer.
- Root `README.md` (the outside view) — still deferred.

## Watching
- The header video is 2.5 MB and loads on first paint on desktop only (mobile is guarded out). Fine on a laptop and over Discord. If it drags on a slow desktop connection, re-encode smaller or add a poster frame — the wash means the header reads without it either way.
- Fonts load from Google Fonts CDN (as the `_ds` ships). Fine for MVP; self-host woff2 for production hardening if load speed on PH mobile data disappoints.
- GitHub Pages free tier needs a public repo; the repo is private, so Netlify or Cloudflare are the viable hosts unless visibility changes.

## Deferred
- `.claude/rules/` — not needed yet (one small codebase, nothing to path-scope).
- Root `README.md` — comes last, once `site/` is stable (`site/README.md` preview/deploy guide is the required deliverable).
- Decorative illustrations (D1 header texture, D2 documents+padlock, D3 tidy desk) — optional; build as CSS/SVG or skip.
- Real screenshots for credibility slots — owner may supply later; slots will accept them.

## Known issues
- Verification is an ad-hoc CDP script re-authored per session, not a committed suite — deliberate, since this repo has no test tooling.
- The seven screenshot slots render as empty labelled placeholders, matching the export. Owner to supply images, or the v1 built mockups can be restored from the archive.
- Section 09 has no section-closer box, matching the export.
- Headings render Title Case because the export's CSS sets `text-transform:capitalize`, which the readme's sentence-case rule would not. Kept for parity with the export.
- Section 06 links (Notion template, previous session recording) have no real URLs yet.
- The presenter sign-off at the end of section 08 is unwritten in the copy doc, so it is absent from the site.

## Settled — do not reopen without a new fact
- Plain static HTML/CSS/JS, no framework, no build step.
- Hash routing.
- Dark Ink-Plum ground matching the Claude Design exports.
- Fully-built visuals, zero images.
- Two routes only: `/` guide, `/toolkit` library.
- `planning/` is read-only source of truth; copy and planning docs stay in sync.
- `site/index.html` and `site/css/app.css` are generated by `tools/`; never hand-edited.
