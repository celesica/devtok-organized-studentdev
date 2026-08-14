# Handoff

*Written 2026-08-14 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Rebuilt the site so it is generated from the Claude Design exports rather than hand-authored, then worked through a round of design changes with the owner. The first build (v1) was assembled from the markdown copy docs and diverged from the owner's design in both wording and component treatment; it is archived under `docs/history/site-v1-2026-08-14/` and was served alongside the new one for comparison.

`tools/build.js` now reads the two `.dc.html` exports and emits `site/index.html` and `site/css/app.css`. `tools/toolkit.js` runs first because the Toolkit page is data-driven — its templates, checklists, prompts and glossary live in JavaScript arrays and are rendered through `<sc-for>` loops, so copying its markup alone produced a nearly empty page.

## State: working
Complete and verified. All work is committed and pushed to `main`.

Design changes landed this session: Chrome-style tabs with dividers and flared feet, badges as pill tags at the head of their line, section closers using the design system's lamp-card wash with an ember label, a glowing arrow to advance, prev/next pinned full-width to the viewport foot, and the section 00 header rebuilt from the copy doc.

Progressive reveal (`site/js/reveal.js`) shows one subsection at a time with a dot rail on the right. Revealing is deliberately explicit — the arrow or a rail dot — after scroll-based revealing turned out to open an extra subsection every time a rail click scrolled near the foot of the page.

## The next action
Connect a host. Netlify or Cloudflare Pages, publish directory `site`, no build command and no rewrite rules (hash routing). GitHub Pages is not an option while the repo is private.

## Files touched, and why
- `tools/build.js`, `tools/toolkit.js`, `tools/mockups.js`, `tools/README.md` — the generator, the toolkit loop expansion, the built stand-ins for the screenshot slots, and the documentation for all of it.
- `site/js/components.js` — the state machine replacing the export's React runtime, seeded with the export's own initial state.
- `site/js/reveal.js` — progressive subsection reveal and the dot rail.
- `site/js/router.js` — hash routing, keyboard navigation, the shared previous/next bar.
- `planning/site-copy-all-sections.md` — dropped the "you don't need to be an advanced programmer" clause so the copy doc matches the site. The only edit ever made under `planning/`, and made on explicit instruction.
- `docs/history/site-v1-2026-08-14/` — the archived first build.

## Decisions made
- `site/index.html` and `site/css/app.css` are generated. Content changes belong in the `.dc.html` exports followed by a rebuild.
- Section 00's header is the one deliberate divergence from the export, sourced from `site-copy-all-sections.md`. The build throws if the export's header markup changes, so the override cannot silently stop applying.
- Both export stylesheets are carried through verbatim, which keeps `text-transform:capitalize` on headings even though the design system readme asks for sentence case. The section 00 title opts out so "as a" stays lowercase.
- Progressive reveal is off below 860px and on the toolkit: it is a presentation aid, and phone readers and people hunting for a template want a plain scrolling document.

## Open questions needing me (owner)
- Host: Netlify, Cloudflare Pages, or both.
- The seven screenshot slots currently show built HTML mockups. Real screenshots can replace any of them by deleting that entry from `tools/mockups.js`.
- Section 06 links (Notion template, previous session recording) still have no real URLs.
- The presenter sign-off at the end of section 08 is unwritten in the copy doc, so it is absent from the site.
- Section 09 has no closer box, matching the export.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Clean tree as of this commit.
- Needs on a fresh machine: git, Node (for the build only), Python 3 (for local preview). The site itself needs nothing — it opens from `file://`.
- Local preview during this session: `python3 -m http.server 8080` from `site/`, and `:8081` from the archived v1. Port 8000 was already taken by another process.
- Verification used headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
