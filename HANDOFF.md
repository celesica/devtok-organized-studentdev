# Handoff

*Written 2026-08-15 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Working through the guide with the owner, section by section, turning the export's copy into their voice and building interactive components as we go. **Sections 00 through 07 are through a full owner pass.** Sections 08–09 still render the original export copy, unchanged.

Everything through section 07 is committed **and pushed** to `origin/main`. The next section is **08 The 20-minute reset**.

## The next action
Build **section 08 (The 20-minute reset)** when the owner supplies/directs the copy (they drive which sections change and how, usually dropping a section md in `~/Downloads`). Author `SECTION_08_BODY`, add its line to `sectionBody()` (dispatch label `"08 The 20-minute reset"` — see `ROUTES`), run the build, mirror wording into `planning/site-copy-all-sections.md`, browser-check, present for review before committing. Note: section 08's presenter sign-off is unwritten in the copy doc (absent from the site) — flag it to the owner.

## State: working
Site is deployable right now. Tree is clean after the section-07 commit + push.

## How the build works (read before editing copy)
`tools/build.js` renders the `.dc.html` exports **and** applies owner-directed overrides. Sections **00–01** patch the export in place (`applyStartCopy()`, `applyFoldersCopy()`). Sections **02–07** are rebuilt wholesale as `SECTION_0N_BODY` constants returned from `sectionBody(label)` — the export copy for those is unused. Do section 08 the same way.

Reusable build helpers (in `build.js`):
- `ftree(nodes, label, opts)` — branded folder tree; `opts.open`/`opts.bare`. File nodes `[name,"ext"]` draw typed glyphs.
- `vdemo(src, caption, aria)` — desktop-guarded looping video preview → shared enlarge modal.
- The **clickable-catalogue** pattern (`s03Inside()`, `s06Dbs()`, `s07Ext()`): left `.iprow` buttons jump a `set` group, right `.ipd` panels reveal (`.ipx` layout). Reuse for lists that reward click-to-reveal.
- The **chip filter** pattern (`s07Install()`): `.tchip` buttons drive a `set` group; multiple cards share a `data-on` value so all matching cards reveal at once (`.instcard.on`). Good for "by category / by timing" groupings.
- The **enlarge preview** pattern: `.idethumb` button (`data-act="openimg"`, `data-isrc`, `data-mlabel`) wrapping an `<img>`, in a `<figure class="wsfig">` with a `.cap`. Real screenshots go here (warm-ide.png, workspace.png).
- `nbHyphenate()` swaps ASCII hyphens for U+2011 in text nodes (so grepping built HTML for a hyphenated word can miss — search with a wildcard). `numberedTableToOl()` only converts `.tbl` tables whose first cell is a mono numeral.

Interaction runtime (`site/js/components.js`, hand-written, **not** generated): `[data-act]` — `set` (jump a group; adds `.on` to elements whose `data-on` matches, mode `eq`), `toggle`, `openv`/`openimg` (enlarge modal `#vmodal`; `data-mlabel` sets dialog label, **not** `data-label`), `nxt`/`bck`/`pick`/`tck`/`copy`. `INITIAL` seeds each group's default — section 07 added `c70:"now"`, `c71:"lang"`. Give section 08 a new group id (e.g. `c80`) and seed it.

## Section 07 — what shipped (patterns to reuse)
- Three-part cards (`.wsparts/.wspart`, focus variant with rose glow + "This section" tag).
- Install **timing filter**: chips Now/Soon/As needed/Later (`c70`), cards reveal per timing. Framed as samples, not a fixed list.
- Extensions **catalogue** (`c71`), 4 items.
- "Another meaning of workspace" is **flowing prose** — VS Code multi-root + IntelliJ Multi-Project merged into one paragraph (owner: no separate sub-sections), plus the `.code-workspace` example tree and the real `workspace.png` enlarge.
- `warm-ide.png` reused for "keeping the workspace usable" — caption no longer says "Screenshot" (owner: it's a themed IDE, not a real one).

## Three standing owner rules now baked into CSS (don't regress)
1. **Tag spacing**: every `.wa-badge` keeps a firm right margin (`margin:2px 16px 6px 0`); the old `.wa-badge:last-child{margin-right:0}` is gone (a trailing text node isn't an element, so it stripped the gap). Memory: `tag-spacing-rule`.
2. **Image spacing** (new this session): image-bearing figures (`.wsfig`, `.vdemo`, `figure.shot`) keep clear vertical space from surrounding text (26px top/bottom) and captions (`.cap`) don't hug the image. Memory: `image-spacing-rule`.
3. **List spacing**: any paragraph/sub-heading right after a `.wa-list` gets 24px top separation.
Plus: real screenshots/recordings go in dedicated slots via `planning/` → `site/assets/` (build throws if a source is missing).

## Assets in play
`planning/` holds sources; `build.js` copies them into `site/assets/` (throws if missing):
- `Cozy Desk Loop.mp4` → header (00); `Warm Arcade IDE.png` → `warm-ide.png` (03 + 07); `Opening a Folder in the IDE.mp4` → `opening-a-folder.mp4` (03); `Label your class schedule.mp4` → `label-your-class.mp4` (04).
- `planning/notion/*.png` → `notion-{courses,academia,upskilling}.png` (06).
- `planning/workspace.png` → `workspace.png` (07, the real `ine (Workspace)` multi-project screenshot, 808×640).

## Open questions / watch
- Sections 08–09 copy is still the export's; the owner drives which change and how.
- Section 07 keeps an illustrative `.code-workspace` tree (Health-Tech / blood-lab-repo / ine-coach-report-tool) from the written copy, above the real `workspace.png` (ine (Workspace) / blood-labs-history-app / ine-coach-reports). Owner is aware of the name difference; can align the tree to the real names if they ask.
- Heavy recordings: `label-your-class.mp4` 25 MB, `opening-a-folder.mp4` 9.7 MB — guarded off mobile, lazy on desktop. Re-encode smaller for the public site when there's tooling (no ffmpeg this session).
- Section 04 uses owner-added Cobalt/Mint calendar colours scoped to `--cal-*` (approved exception in CLAUDE.md); don't extend blue/green elsewhere.
- Section 08 presenter sign-off unwritten; section 09 has no closer (matches export). Root `README.md` still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Pushed through the section-07 commit.
- Fresh machine needs: git, Node (build only), Python 3 (local preview). Site opens from `file://` with nothing installed.
- Local preview: `cd site && python3 -m http.server 8000`. The in-app browser caches `app.css` hard — hard-reload (Cmd+Shift+R) after a rebuild. Verification is ad-hoc DOM assertions + screenshots; no committed test suite, by design.
