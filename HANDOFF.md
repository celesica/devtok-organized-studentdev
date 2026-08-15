# Handoff

*Written 2026-08-15 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
The section-by-section content pass is **complete through section 08, the Toolkit is rebuilt, and the site is deployed.** Section 09 (Group projects) is not in the live tabs — the owner is building it another time; its planning copy is kept. The live guide is 00–08 with the **Toolkit tab sitting right after 08**.

**This session** reworked the in-view navigation and spacing (all committed, not yet pushed):
1. **Dropped the progressive-reveal arrow.** Subsections used to be gated one at a time behind a glowing down-chevron ("continue") button; you revealed the next one by clicking the arrow or a rail dot. The owner asked to remove that — **every `.band` is now shown at once and you just scroll through them.** The right-edge **dot rail is kept**: it mirrors your scroll position and jumps to any subsection on click (desktop only, hidden on mobile and in the Toolkit).
2. **Renamed `site/js/reveal.js` → `site/js/rail.js`.** The file no longer reveals anything, so the name is honest — and a brand-new URL sidesteps browsers that stubbornly served the old cached JS through a hard reload (this bit the owner: fresh CSS + stale JS showed the now-unstyled continue button as a little white box on the left that still gated on click). The runtime global went `SDevReveal` → `SDevRail`. The `<script>` tag in `build.js` now points at `js/rail.js`.
3. **Removed the dead arrow CSS** (`.continue`, `.chev`, `contpulse`, and the now-unused `.raildot.locked` / `.band[hidden]`) from `build.js`'s `extra` block. Rail dot styles (`.raildot`, `.raillabel`) stay.
4. **Subsection padding bumped to 100px top/bottom.** Owner override in `build.js`'s `extra` block: `.band{padding:100px 0}` + `.band:first-child{padding-top:100px}` (beats the export's 44px default). The **field-guide hero is excluded** — `.band.hero-band{padding:44px 0 46px}` keeps section 00's title block at its original tighter spacing.

**Live:** <https://devtok-organized-studentdev.netlify.app> — Netlify, Git-connected, **auto-deploys on every push to `main`**. `netlify.toml` publishes `site/` with nosniff + no-referrer headers. **This session's commit is local only — push `main` to deploy it.** Root `README.md`, `site/README.md`, `tools/README.md`, and `CLAUDE.md` are current.

## The next action
**Push to deploy** this session's nav/spacing changes (`git push`), then verify on the live URL. After that, nothing is outstanding except deferred work: **Section 09 (Group projects)** — when built, add its route back to `ROUTES` + `TAB_LABELS` in `build.js` and author `SECTION_09_BODY`. (Optional polish: friendlier Netlify subdomain; re-encode the two heavy recordings smaller when ffmpeg is available.)

## State: working
Site runs locally from `file://` and via `python3 -m http.server`. Tree is clean after the commit. Not yet pushed.

## How the build works
`node toolkit.js && node build.js` (run from `tools/`).
- `tools/build.js` renders the guide `.dc.html` export + owner overrides. Sections **00–01** patch the export in place; sections **02–08** are wholesale `SECTION_0N_BODY` constants from `sectionBody(label)`. It also renders the **Toolkit body** and writes `site/index.html` + `site/css/app.css`. `app.css` = the exports' extracted `<style>` (`guideCSS` + `tkCSS`) **plus a big `extra` template literal at the tail of `build.js`** — owner CSS overrides live in `extra`, which is concatenated last so it wins. (grep chokes on `build.js`'s very long minified lines — search it with python/ripgrep, not BSD grep.)
- `tools/toolkit.js` **parses `planning/toolkit.md`** into `toolkit-prompts.json` + `toolkit-cards.json`, and lifts the prompt-modal shell into `toolkit-modal.html`.
- `tools/toolkit-data.js` — hand-structured `TEMPLATES` / `CHECKLISTS`. Edit this for templates/checklists; edit `planning/toolkit.md` for prompts.

Reusable helpers in `build.js`: `ftree()` (interactive folder tree), `vdemo()` (video preview → modal), the clickable-catalogue pattern (`s06Dbs`/`s07Ext`), the chip-filter pattern (`s07Install`), the `.idethumb` enlarge preview, `nbHyphenate()`.

## Runtime JS (hand-written, not generated; edit directly)
- `site/js/router.js` — hash routing between the top-level views (00–08 + Toolkit). One `.view` visible at a time (instant, no fade). Shared `[data-nav]` Previous/Next bar, relabelled per section. Arrow keys move between tabs; digits 0–9 jump to guide blocks. Exposes `window.SDevRouter`.
- `site/js/rail.js` — the right-edge dot rail for a guide view's `.band` subsections. **All bands shown; scroll drives the dot highlight; a dot click smooth-scrolls to its band.** Off below 860px and in the Toolkit. Exposes `window.SDevRail`. (Was `reveal.js`.)
- `site/js/components.js` — `[data-act]`: `set`, `toggle`, `tck` (persistent checkbox, localStorage `sdev.reset.v1`), `ckreset` (clears the checkboxes in the enclosing `[data-ckwrap]` only), `openp`/`closep` (prompt modal), `openv`/`openimg` (enlarge modal), `jump`, `copy`, `texp`/`tcol`, and the section-03 layer stepper (`nxt`/`bck`/`pick`). Checklist counts scoped to the nearest `[data-ckwrap]`.

## Toolkit shape (for reference)
- **Tab order:** 00 Start … 08 Reset, **Toolkit** — Toolkit is lilac by default, ember when active, no divider before it. Nav inside: Prompts · Templates · Checklists.
- **Prompts:** 28, card + fixed-size modal (only `.mpre` scrolls, opens at top). Six featured cards carry an ember-glow SVG star.
- **Templates:** accordion; interactive `ftree` trees with a Copy (plain-text via `tkTreeText`); README/`.gitignore` as code blocks with per-block Copy.
- **Checklists:** accordion of persistent checkboxes; each has its own Reset all + count; ids namespaced `k<n>_<g>_<i>`.

## Standing owner rules baked into CSS (don't regress)
1. **Tag spacing** — `.wa-badge` keeps a firm right margin; no `:last-child{margin-right:0}`. Memory `tag-spacing-rule`.
2. **Image spacing** — image figures (`.wsfig`,`.vdemo`,`figure.shot`) keep clear vertical space from text; captions don't hug the image. Memory `image-spacing-rule`.
3. **List spacing** — a paragraph/sub-heading right after a `.wa-list` gets 24px top separation.
4. **Subsection spacing** — `.band` at 100px top/bottom (owner override in `extra`); the `.hero-band` title block is the deliberate exception at 44/46.
5. Real screenshots/recordings go in `planning/` → `site/assets/` (build throws if a source is missing).

## Assets (`planning/` → `site/assets/`, build throws if missing)
`Cozy Desk Loop.mp4`→header(00); `Warm Arcade IDE.png`→`warm-ide.png`(03+07); `Opening a Folder in the IDE.mp4`→`opening-a-folder.mp4`(03); `Label your class schedule.mp4`→`label-your-class.mp4`(04); `notion/*.png`→`notion-*.png`(06); `workspace.png`→`workspace.png`(07).

## Watch
- Heavy recordings: `label-your-class.mp4` 25 MB, `opening-a-folder.mp4` 9.7 MB — guarded off mobile, lazy on desktop. Re-encode smaller for the public site when there's tooling.
- Section 04 uses owner-added Cobalt/Mint calendar colours scoped to `--cal-*` (approved exception in CLAUDE.md); don't extend blue/green elsewhere.
- Section 07 keeps an illustrative `.code-workspace` tree above the real `workspace.png`; owner is aware of the name difference.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). **Ahead by one unpushed commit after this session.**
- Fresh machine: git, Node (build only), Python 3 (local preview). Site opens from `file://` with nothing installed.
- Preview: `cd site && python3 -m http.server 8000`. Hard-reload after a rebuild to beat the CSS/JS cache.
