# Handoff

*Written 2026-08-14 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Working through the guide with the owner, section by section, turning the export's copy into their voice and building interactive components as we go. **Sections 00 (Start), 01 (Folders), and 02 (School files) are through a full owner pass.** Sections 03–09 still render the original export copy, unchanged.

Everything is committed and pushed to `main`; the tree is clean. The 60-assertion headless-Chrome check passes (it was re-run after every change this session), including the 375px no-overflow guard.

## State: working
Site is deployable right now. The section content pass is mid-flight (next is 03).

## How the build works now (read this before editing copy)
`tools/build.js` renders the `.dc.html` exports **and** applies owner-directed overrides on top. Section copy for 00–02 lives in `build.js`, not the exports:
- **00 Start** — the `HERO` constant (title, subhead, meta, lede, TL;DR, the looping video header) plus `applyStartCopy()` (Why-I-think-this-matters, What-you'll-have, folder-mock caption, UNDERSTAND closer).
- **01 Folders** — `applyFoldersCopy()`, with the tree/panel constants: `TREE_STUDIES/DEV/UPT/UPP/CAREER`, `UPSKILLING_PANEL`, `CAREER_PANEL`, `ORG_BAND`, plus notes and the two-question decision band.
- **02 School** — rebuilt wholesale as `SECTION_02_BODY` (returned directly from `sectionBody`), with `TREE_SCHOOL` and the kept tap-to-reveal naming table.

Every `swap()` throws if its export anchor is gone, so a changed export fails the build loudly instead of silently keeping stale copy. After any edit: `cd tools && node toolkit.js && node build.js`, then mirror the wording into `planning/site-copy-all-sections.md`.

Shared build helpers, reusable for 03–09:
- `ftree(nodes, label)` — interactive branded folder tree (native `<details>`, collapsed by default, Collapse | Expand toolbar handled by `texp`/`tcol` in `site/js/components.js`). Node forms: `[name]` folder-leaf, `[name, [kids]]` folder, `[name, "pdf"|"md"]` file (document glyph with an Ember/Lilac type tag).
- `nbHyphenate()` — swaps intra-word hyphens for U+2011 so words like "self-learning" don't split; protects `<pre>/<script>/<style>/<table>` and tag attributes.
- `numberedTableToOl()` — a `.tbl` whose rows are all mono numerals becomes the DS numbered list.
- CSS colour utilities: `.amber` (main folder highlight), `.flit` (Lilac Signal, file/subfolder names), `.fdir` (Ember, bold folder names in explainers).

## The next action
Continue the owner content pass on **section 03 Your coding projects**, then 04–09. Reuse the tree/colour vocabulary above. Keep re-running the headless check and mirroring copy into `planning/`.

Deploy is independent and can happen any time: Netlify → *Add new site → Import an existing project* → pick `celesica/devtok-organized-studentdev` → accept the defaults (`netlify.toml` at the repo root supplies publish `site`, empty build command, no rewrites) → deploy. Same-day fallback: drag the `site/` folder onto <https://app.netlify.com/drop>.

## Open questions needing the owner
- Sections 03–09 copy is still the export's; the owner drives which sections change and how.
- Section 06 links (Notion template, previous session recording) have no real URLs.
- Section 08 presenter sign-off is unwritten; absent from the site.
- Section 09 has no closer box (matches the export).
- The screenshot slots render built HTML mockups; real screenshots can replace any by deleting that entry from `tools/mockups.js`.
- Root `README.md` (the outside view of the repo) is still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Clean tree.
- Needs on a fresh machine: git, Node (for the build only), Python 3 (for local preview). The site itself opens from `file://` with nothing installed.
- Local preview this session: `python3 -m http.server 8080 --directory site` (live) and `:8081` from `docs/history/site-v1-2026-08-14` (the archived v1). They run detached; stop with `pkill -f "http.server 808"`.
- Verification is an ad-hoc headless-Chrome (DevTools Protocol) Node script in the session scratchpad — re-authored each session by design, since the repo has no test tooling. Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
