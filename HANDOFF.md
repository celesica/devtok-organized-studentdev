# Handoff

*Written 2026-08-15 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Working through the guide with the owner, section by section, turning the export's copy into their voice and building interactive components as we go. **Sections 00 through 06 are through a full owner pass.** Sections 07–09 still render the original export copy, unchanged.

Everything through section 06 is committed to `main`. The next section is **07 Setting up your coding workspace** — the owner has supplied the copy (`~/Downloads/section-07-setting-up-your-coding-workspace-updated.md`) and wants interactive treatments (reveals, trees, the tool/extension tables made interesting).

## The next action
Build **section 07**. Read the copy md, author `SECTION_07_BODY`, add its line to `sectionBody()`, run the build, mirror wording into `planning/site-copy-all-sections.md`, browser-check, present for review before committing (the owner reviews each section).

**Blocking asset:** section 07 has two `[Visual — Class C]` slots. The important one is **Jazzy's multi-project workspace** — a real screenshot of the owner's Antigravity workspace (`ine (Workspace)` containing `blood-labs-history-app` and `ine-coach-reports`). The owner shared it inline in chat but it is **not on disk yet**. Ask them to save it into `planning/` (e.g. `planning/Antigravity workspace.png`) so `build.js` can copy it into `site/assets/` — the build throws if a declared asset source is missing. Until then, either hold that slot or stand in a built VS-Code-style mockup and swap the real image in later (the `openimg` enlarge pattern used for `warm-ide.png` in section 03 is the model). The second slot ("VS Code annotated: Explorer/Editor/Terminal/Source Control") can reuse the existing `warm-ide.png` or a built annotated mockup.

## State: working
Site is deployable right now. Tree is clean after the section-06 commit.

## How the build works (read before editing copy)
`tools/build.js` renders the `.dc.html` exports **and** applies owner-directed overrides. Sections **00–01** patch the export in place (`applyStartCopy()`, `applyFoldersCopy()` — each swap throws if its anchor is gone). Sections **02–06** are rebuilt wholesale as `SECTION_0N_BODY` constants returned from `sectionBody(label)` — the export copy for those is unused. Do section 07 the same way. The section-07 dispatch label is `"07 Setting up your coding workspace"` (see `ROUTES`).

Reusable build helpers (in `build.js`):
- `ftree(nodes, label, opts)` — branded folder tree; `opts.open` expands, `opts.bare` drops the toolbar. File nodes `[name,"ext"]` draw a typed glyph (pdf/md/txt/py/json/git/env/cfg).
- `vdemo(src, caption, aria)` — desktop-guarded looping video preview → shared enlarge modal. Copy its mp4 into `site/assets/` near the top of `build.js` (throws if missing).
- `s03Inside()` / `s06Dbs()` — the clickable catalogue pattern (left rows jump a `set` group, right `.ipd` panels reveal). Good model for section 07's tool/extension lists.
- `nbHyphenate()`, `numberedTableToOl()` — the hyphen and numbered-list passes. Note: `numberedTableToOl()` only converts `.tbl` tables whose first cell is a mono numeral; section 07's "what to install" table (Job/Tool/When) is text, so it stays a table — style it or convert to an interactive list deliberately.

Interaction runtime (`site/js/components.js`, hand-written, **not** generated) — click a `[data-act]` element: `set` (jump a group to a value), `toggle` (flip a `[data-tk]` done-state), `openv`/`openimg` (enlarge modal via `#vmodal`, `data-mlabel` sets the dialog label — **not** `data-label`), plus `nxt`/`bck`/`pick`/`tck`/`copy`. `INITIAL` seeds each group's default — section 06 added `c60: "yt"`. Give section 07 a new group id (e.g. `c70`) and seed it there.

## Section 06 — what shipped (for reference / the same patterns to reuse)
- Three real Notion screenshots inside one toggle **"Jazzy's Notion OS — school dashboard"**. Each shot is a fixed-height (`440px`, `360px` mobile) box that scrolls internally; both the image and an "Open full image" caption link open the full original in a **new tab** (`target="_blank"` — not the in-page modal, per owner).
- **Nested-scroll behaviour (the key detail):** when the toggle is open, `.nshots[open] .expb` is a capped (`64vh`) scroll region with `overscroll-behavior:contain` and `34px` (16px mobile) side gutters. The image boxes (`.nshot-box`) deliberately do **not** set `overscroll-behavior`, so scrolling an image chains out to the card list at its edges; the page never moves because `.expb` contains it. This solved the owner's "stuck inside one image" complaint. Closed, the toggle imposes nothing.
- Also: routing cards (`.grid3/.nstay`), an Academia flow diagram (`.nflow`, CSS arrows), the clickable six-database catalogue (`c60`), a start-now/add-later `grid2` split, real Academia template link + text-only Discord recording pointer, an `.optchip` alternatives row.
- The word **Notion** is ember-bold via `.nem` (`color:var(--ember);font-weight:700`) throughout the **body copy only** — headings stay plain (owner: "Notion in the body… headings aren't obvious").

## Two standing owner rules now baked into CSS
1. **Tag spacing** (new this session): every `.wa-badge` keeps a firm right margin (`margin:2px 16px 6px 0`). The old `.wa-badge:last-child{margin-right:0}` was removed — a trailing text node isn't an element, so `:last-child` matched and stripped the gap, letting RECOMMENDED touch the sentence after it. Applies project-wide. (Memory: `tag-spacing-rule`.)
2. **List spacing**: any paragraph/sub-heading right after a `.wa-list` gets 24px top separation.
Plus: real screenshots/recordings go in dedicated slots via `planning/` → `site/assets/`.

## Assets in play
`planning/` holds sources; `build.js` copies them into `site/assets/` (throws if a source is missing):
- `Cozy Desk Loop.mp4` → header (00); `Warm Arcade IDE.png` → `warm-ide.png` (03); `Opening a Folder in the IDE.mp4` → `opening-a-folder.mp4` (03); `Label your class schedule.mp4` → `label-your-class.mp4` (04).
- `planning/notion/{1 - Courses view, 2 - Academia view, 3 - Upskilling view}.png` → `site/assets/notion-{courses,academia,upskilling}.png` (06).
- **Needed for 07:** the Antigravity workspace screenshot (not yet saved — see The next action).

## Open questions / watch
- Sections 07–09 copy is still the export's; the owner drives which sections change and how.
- The two big recordings are heavy (`label-your-class.mp4` 25 MB, `opening-a-folder.mp4` 9.7 MB); guarded off mobile, lazy on desktop. Re-encode smaller for the public site when there's tooling (no ffmpeg this session).
- Section 04 uses owner-added Cobalt/Mint calendar colours scoped to `--cal-*` (approved exception in CLAUDE.md); don't extend blue/green elsewhere.
- Section 08 presenter sign-off unwritten; section 09 has no closer (matches export).
- Root `README.md` (the outside view of the repo) still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private).
- Fresh machine needs: git, Node (build only), Python 3 (local preview). Site opens from `file://` with nothing installed.
- Local preview this session: `cd site && python3 -m http.server 8000`. Note the in-app browser caches `app.css` hard — hard-reload (Cmd+Shift+R) after a rebuild or the new CSS won't show. Verification is ad-hoc DOM assertions + screenshots; no committed test suite, by design.
