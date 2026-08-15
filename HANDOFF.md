# Handoff

*Written 2026-08-15 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Working through the guide with the owner, section by section, turning the export's copy into their voice and building interactive components as we go. **Sections 00, 01, 02, 03, 04, and 05 are through a full owner pass.** Sections 06–09 still render the original export copy, unchanged.

Everything through section 05 is committed **and pushed** to `origin/main`. The next section is **06 Notion for notes and school** — and the owner has already dropped screenshots for it into `planning/notion/` (`1 - Courses view.png`, `2 - Academia view.png`, `3 - Upskilling view.png`).

## State: working
Site is deployable right now. The section content pass is mid-flight (next is 06). Tree is clean.

## How the build works (read before editing copy)
`tools/build.js` renders the `.dc.html` exports **and** applies owner-directed overrides. Sections **00–01** patch the export in place (`applyStartCopy()`, `applyFoldersCopy()` — each swap throws if its anchor is gone). Sections **02–05** are rebuilt wholesale as `SECTION_0N_BODY` constants returned from `sectionBody(label)` — the export copy for those is unused. Do a new section the same way: author `SECTION_06_BODY`, add a line to `sectionBody()`, run `cd tools && node toolkit.js && node build.js`, then mirror the wording into `planning/site-copy-all-sections.md`.

Reusable build helpers (in `build.js`):
- `ftree(nodes, label, opts)` — branded folder tree; `opts.open` expands, `opts.bare` drops the toolbar. File nodes `[name,"ext"]` draw a typed glyph (pdf/md/txt/py/json/git/env/cfg — colours in `.fdoc--*`).
- `vdemo(src, caption, aria)` — a desktop-guarded looping video preview that opens the shared enlarge modal on click. Copy the source mp4 into `site/assets/` near the top of `build.js` (throws if missing), like `LABEL_VIDEO`.
- `nbHyphenate()`, `numberedTableToOl()` — the hyphen and numbered-list passes.

Interaction runtime (`site/js/components.js`, hand-written, **not** generated) — click a `[data-act]` element:
- `set` — jump a state group to a value (no toggle-off); used by stack rows, palette, prefixes, road stages, backup cards, secret steps, gitignore rows.
- `toggle` — flip a `[data-tk]` done-state (non-persistent, seeded from `data-done`); the sample-calendar task checkboxes.
- `openv` (data-vsrc video) / `openimg` (data-isrc image) → the `#vmodal` enlarge modal (`.vmstage` holds a `<video controls>` or `<img>`); `closev` clears + closes. `data-mlabel` sets the dialog label — **do not use `data-label`**, the runtime reserves it for Reveal/Hide button text.
- `nxt`/`bck`/`rst`/`pick`/`tck`/`copy` as before. `INITIAL` seeds each group's default (c50/c51/c52 were the section-05 additions).

Two standing owner preferences now baked into CSS: (1) any paragraph/sub-heading right after a `.wa-list` gets 24px top separation (`.in .wa-list + p` etc.) — don't let a line run tight against a bullet; (2) real screenshots/recordings go in dedicated slots via `planning/` → `site/assets/`.

## The next action
Build **section 06 Notion for notes and school**. Owner will supply the copy (a section md, usually via Downloads) and directs the interactive treatment. The `planning/notion/*.png` screenshots are ready to embed (likely as `openimg` previews → enlarge modal, the same pattern as `warm-ide.png`). Mirror into `planning/`, keep re-running the browser check, present for review before committing.

## Assets in play
`planning/` holds sources; `build.js` copies them into `site/assets/`:
- `Cozy Desk Loop.mp4` → header footage (00).
- `Warm Arcade IDE.png` → `warm-ide.png` (03, real screenshot; replaced the abstract SVG — the `Warm Arcade IDE.html` bundler export was dropped, its runtime doesn't work offline).
- `Opening a Folder in the IDE.mp4` → `opening-a-folder.mp4` (03).
- `Label your class schedule.mp4` → `label-your-class.mp4` (04).
- `planning/notion/*.png` — for section 06, not yet wired in.

## Open questions / watch
- Sections 06–09 copy is still the export's; the owner drives which sections change and how.
- The two big recordings are heavy: `label-your-class.mp4` 25 MB, `opening-a-folder.mp4` 9.7 MB. Both guarded off mobile and lazy on desktop; fine for the live Discord run, re-encode smaller for the public site when there's tooling (no ffmpeg this session).
- Section 04 uses owner-added Cobalt (blue) + Mint (green) calendar label colours, scoped to `--cal-*`. Documented as an approved exception in CLAUDE.md; don't extend blue/green elsewhere.
- Section 06 links (Notion template, previous session recording) have no real URLs; section 08 presenter sign-off unwritten; section 09 has no closer (matches export).
- Root `README.md` (the outside view of the repo) still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Pushed through `ff06bd8`.
- Fresh machine needs: git, Node (build only), Python 3 (local preview). Site opens from `file://` with nothing installed.
- Local preview this session: `cd site && python3 -m http.server 8000` (was on :8080). Verification is ad-hoc DOM assertions + screenshots via the in-app browser — no committed test suite, by design.
