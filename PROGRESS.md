# Progress — Get Organized as a Student Developer

Phase: **generated site is live-quality; working through the sections with the owner, front to back.**

## Current phase
`site/` is generated from the `.dc.html` exports by `tools/build.js`. On top of the export, the build applies owner-directed copy and interactive components section by section. **Sections 00 through 07 are through a full owner pass**; 08–09 still render the original export copy. Each rebuilt section is authored wholesale as a `SECTION_0N_BODY` constant returned from `sectionBody()`. Browser-verified after every change (DOM assertions + 375px no-overflow guard); no console errors. All committed and pushed to `main`.

The interactive vocabulary built across sections: branded folder trees (`ftree()`, native `<details>`, PDF/MD/py/txt/json/git/env file glyphs), the non-breaking-hyphen pass (`nbHyphenate()`), the numbered-list conversion (`numberedTableToOl()`), colour utilities (`.amber`, `.flit`, `.fdir`), the state-machine actions in `components.js` (`set` jump-to-value, `toggle` non-persistent done-state, `openv`/`openimg` enlarge modal with a shared `.vmstage`), a reusable `vdemo()` video-preview helper (desktop-guarded looping thumbnail → controls modal), and section-04's calendar palette (`--cal-*` vars, incl. owner-added Cobalt/Mint).

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
- Section-by-section owner content pass. Done through **07**; **08 The 20-minute reset** is next (still on export copy).

## Recently done (section 07)
- **Section 07 rebuilt** (`SECTION_07_BODY`): three-part "what a workspace is" cards (part 3 highlighted as the focus); an **install-by-timing filter** (chips Now/Soon/As needed/Later, group `c70`, opens on Now, cards reveal per timing) framed as samples ("there are many other tools out there, you'll find what works best for you"); a clickable **extensions catalogue** (group `c71`, 4 items — Error Lens dropped per owner); the "another meaning of workspace" band as **flowing prose** (VS Code multi-root + IntelliJ Multi-Project merged into one paragraph, no sub-sections) with the `.code-workspace` example tree; the owner's **real workspace screenshot** (`planning/workspace.png` → `site/assets/workspace.png`, enlargeable via `openimg`) showing `ine (Workspace)` with `blood-labs-history-app` + `ine-coach-reports`; and "keeping the workspace usable" habits + the `warm-ide.png` enlarge (the word "Screenshot" removed from its caption per owner — it's a themed IDE, not a real one).
- **Image-spacing project rule** (owner): image-bearing figures (`.wsfig`, `.vdemo`, `figure.shot`) keep clear vertical space from surrounding text (26px top/bottom) and their captions don't hug the image (`.cap` margin-top). Global.

## Recently done (section 06)
- **Section 06 rebuilt** (`SECTION_06_BODY`): the three real Notion screenshots (`planning/notion/*.png` → `site/assets/notion-*.png`) live inside one toggle **"Jazzy's Notion OS — school dashboard"**, each in its own fixed-height box that scrolls internally and opens full-size in a new tab (`target="_blank"`). When the toggle is open the card area (`.expb`) becomes a capped (64vh) scroll region with `overscroll-behavior:contain` and 34px side gutters, and the image boxes no longer contain their overscroll — so scrolling an image chains out to the next one, the summary stays put (close without scrolling up), and the page never moves; closed, normal page scroll resumes. Also: three "what stays elsewhere" routing cards, an Academia flow diagram (CSS arrows), a clickable six-database catalogue (group `c60`, reveal panels), a two-column start-now/add-later split, the real Academia template link (opens a new tab) + a text-only Discord recording pointer, and a chip row of alternatives. "What you can see from the main dashboard" band was cut per owner. The word **Notion** is ember-bold (`.nem`) throughout the running copy, headings left plain.
- **Tag-spacing project rule** (owner): every `.wa-badge` keeps a firm 16px right margin — the old `.wa-badge:last-child{margin-right:0}` was stripping the gap whenever a text node (not an element) followed, so RECOMMENDED touched the sentence after it. Fix is global across all sections.

## Recently done (sections 03–05)
- **Section 03 rebuilt** (`SECTION_03_BODY`): clickable five-layer stack (rows jump via `set`, sticky sidebar on desktop), four expanded structure trees with designed file glyphs, "Inside a project" explorer, dashed "whole road" (DOCUMENT/DEPLOY/PORTFOLIO drawn dashed = "not covered today", still clickable), Layer-3 screen recording (`Opening a Folder in the IDE.mp4` → enlarge modal) + the real `warm-ide.png` screenshot for "open the project folder", GitHub mark, and a commit-history mock (latest-first, no "claude").
- **Section 04 rebuilt** (`SECTION_04_BODY`): interactive colour palette (Jazzy's, incl. Cobalt/Mint), kept event-builder field reveal, prefix explorer, a Google-Calendar-style **sample week** (colour-coded `[LEC]`/`[LAB]`/`[QUIZ]`/`[EXAM]` events + toggleable task checkboxes, scrolls on mobile), and a "Label your class schedule.mp4" preview beside the Step-2 note → enlarge modal.
- **Section 05 rebuilt** (`SECTION_05_BODY`): backup destinations (four clickable cards → what belongs where), the secret-key walkthrough (four clickable numbered steps, escalating status badge IN YOUR CODE → EXPOSED → STILL EXPOSED → SAFE, secret highlighted in each `.code` block), and a new `.gitignore` explorer (click an entry → why it's ignored). Prose: password manager (Bitwarden linked, biometrics), 2FA, school-vs-personal email + student-perks side note.
- **General spacing rule** added (owner preference): any paragraph/sub-heading right after a `.wa-list` bullet/numbered list now gets 24px top separation everywhere.
- New assets copied by the build into `site/assets/`: `opening-a-folder.mp4` (9.7 MB), `label-your-class.mp4` (25 MB), `warm-ide.png` (0.9 MB). Sources in `planning/`.

## Next up
- Continue the owner content pass on sections **08–09** (each still on export copy), same interactive vocabulary.
- Connect **Netlify** (host already decided): *Add new site → Import an existing project* → pick the repo → accept the defaults (`netlify.toml` supplies them) → deploy. This can happen any time; the site is deployable now.
- Resolve the open content items: section 08 presenter sign-off, section 09 closer. (Section 06's Academia template link is now real and wired; its walkthrough recording stays a text-only Discord pointer — no public URL.)
- Root `README.md` (the outside view) — still deferred.

## Watching
- The two section screen-recordings are heavy: `label-your-class.mp4` is **25 MB** and `opening-a-folder.mp4` is **9.7 MB**. Both are guarded off mobile (never fetched below 761px) and load on desktop only when their section is reached; the enlarge modal loads on click and releases on close. Fine for the live Discord run; re-encode smaller for the public site if load speed disappoints (no ffmpeg on the build machine this session).
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
- The presenter sign-off at the end of section 08 is unwritten in the copy doc, so it is absent from the site.

## Settled — do not reopen without a new fact
- Plain static HTML/CSS/JS, no framework, no build step.
- Hash routing.
- Dark Ink-Plum ground matching the Claude Design exports.
- Fully-built visuals, zero images.
- Two routes only: `/` guide, `/toolkit` library.
- `planning/` is read-only source of truth; copy and planning docs stay in sync.
- `site/index.html` and `site/css/app.css` are generated by `tools/`; never hand-edited.
