# Handoff

*Written 2026-08-14 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Working through the guide with the owner, section by section, turning the export's copy into their voice and building interactive components as we go. **Sections 00, 01, 02, 03, and 04 are through a full owner pass.** Sections 05–09 still render the original export copy, unchanged.

Everything in this session is committed. The next section is **05 Protecting your work**.

## State: working
Site is deployable right now. The section content pass is mid-flight (next is 05).

## How the build works now (read this before editing copy)
`tools/build.js` renders the `.dc.html` exports **and** applies owner-directed overrides on top. Sections 02, 03, and 04 are rebuilt wholesale as `SECTION_02_BODY` / `SECTION_03_BODY` / `SECTION_04_BODY` constants, each returned directly from `sectionBody(label)`. Sections 00–01 patch the export via `applyStartCopy()` / `applyFoldersCopy()`. After any edit: `cd tools && node toolkit.js && node build.js`, then mirror the wording into `planning/site-copy-all-sections.md`.

Shared build helpers reusable for 05–09:
- `ftree(nodes, label, opts)` — branded folder tree; `opts.open` renders expanded, `opts.bare` drops the Collapse|Expand toolbar. File nodes `[name, "ext"]` draw a typed glyph (pdf/md/txt/py/json/git/env — colours in `.fdoc--*`).
- `vdemo(src, caption, aria)` — a looping video preview (desktop-guarded, `data-src` set by `loadPreviews()` in components.js) that opens the shared enlarge modal on click.
- `nbHyphenate()`, `numberedTableToOl()` — the hyphen and numbered-list passes.

Interaction runtime (`site/js/components.js`, hand-written, not generated) — click a `[data-act]` element:
- `set` — jump a state group to a value (no toggle-off); used by the stack rows, palette, prefixes, road stages.
- `toggle` — flip a `[data-tk]` done-state (non-persistent, seeded from `data-done`); used by the sample-calendar tasks.
- `openv` (data-vsrc video) / `openimg` (data-isrc image) → the `#vmodal` enlarge modal (`.vmstage` holds a `<video controls>` or `<img>`); `closev` clears and closes. `data-mlabel` sets the dialog label — **do not use `data-label`**, the runtime reserves it for Reveal/Hide button text.
- `nxt`/`bck`/`rst`/`pick`/`tck`/`copy` as before. `INITIAL` seeds each group's default.

## The next action
Continue the owner content pass on **section 05 Protecting your work**, then 06–09. The owner supplies the copy (usually a section md in Downloads) and directs the interactive treatment; mirror into `planning/`, keep re-running the browser check.

## Assets added this session
`planning/` holds the sources; `build.js` copies them into `site/assets/` (throws if a source is missing):
- `Opening a Folder in the IDE.mp4` → `assets/opening-a-folder.mp4` (9.7 MB) — section 03 Layer 3.
- `Warm Arcade IDE.png` → `assets/warm-ide.png` (0.9 MB) — section 03 "open the project folder" (a real screenshot; replaced the abstract SVG. The `Warm Arcade IDE.html` bundler export was dropped — its runtime doesn't work offline).
- `Label your class schedule.mp4` → `assets/label-your-class.mp4` (25 MB) — section 04 Step 2, beside the note.

## Open questions needing the owner
- Sections 05–09 copy is still the export's; the owner drives which sections change and how.
- The two big screen-recordings (25 MB + 9.7 MB) are heavy for the public site — re-encode smaller when there's tooling.
- Section 06 links (Notion template, previous session recording) have no real URLs.
- Section 08 presenter sign-off is unwritten; section 09 has no closer (matches the export).
- Section 04 uses owner-added Cobalt (blue) and Mint (green) calendar label colours from the md — outside the design system's "no blue/green" rule, scoped to `--cal-*`. Owner confirmed the palette is theirs (referred to as "my color palette").
- Root `README.md` (the outside view of the repo) is still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Committed this session.
- Needs on a fresh machine: git, Node (build only), Python 3 (local preview). The site opens from `file://` with nothing installed.
- Local preview this session: `cd site && python3 -m http.server 8000`. Verification was ad-hoc DOM assertions + screenshots via the in-app browser (no committed test suite, by design).
