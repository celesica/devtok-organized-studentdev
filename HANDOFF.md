# Handoff

*Written 2026-08-14 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Ran the pre-event verification pass on the built site and prepared the Netlify deploy. The site itself needed one fix; everything else passed.

60 assertions ran three ways — local server, `file://`, and a served subpath (`/site/index.html`) — and all 60 pass in each, with no console errors or uncaught exceptions. Covered: every one of the 11 routes showing exactly one view with its tab marked active, arrow-key and digit-key navigation, browser back, the 15 prompt buttons and the prompt modal, the 13 reset-checklist items writing to `localStorage` and surviving a reload, and no horizontal overflow at 375px.

The one real bug: the calendar week mock in section 04 overflowed at 375px (434px against a 375px viewport). Five `1fr` columns cannot go below their min-content width, and "Algorithms" alone is wider than a fifth of a phone screen. Fixed in `tools/build.js` — two columns below 640px plus `min-width:0` on `.calday` — and rebuilt.

Then reworked the section 00 header to the owner's design, iterating with them over screenshots. The subhead plus the original lede paragraph both stay; the meta reads `Prepped by: Jazzy · DevTok Pinas` (no date). `planning/Cozy Desk Loop.mp4` runs as a full-bleed looping background, and the copy is pinned to the **left** (not the document's centred column) so the laptop and lamp stay in frame on the right, faintly visible behind the text through an angled plum wash. No play control; the loop always runs. Autoplay confirmed on both `http` and `file://` (muted, so the policy allows it).

A later pass tidied the header chrome: a full-width rose hairline now sits under the tab bar to separate the nav from the content; the hero eyebrow starts at the same 44px offset as every other section (it had been ~64px lower because the band's `:first-child` 44px was stacking on top of the hero's own 64px top padding), so switching tabs no longer nudges the top of the content and the continue arrow stays in view; and the title/subhead break at fixed points on desktop via a desktop-only `<br class="hbr">` (with a leading space so the words don't fuse when the break is hidden on mobile) instead of reflowing with the container.

**Mobile keeps the pre-video header.** Below 760px there is no footage, the header uses the ordinary centred column, and the TL;DR is a solid card again — the original design before this change. The mp4 is not merely hidden: an inline `matchMedia('(min-width:761px)')` guard assigns its `src` only on desktop, so a phone reader downloads **0 bytes** of the 2.5 MB video (verified over the network at 375px). Desktop still fetches and plays it.

## State: working
Site verified and committed. Host is decided (Netlify); the connect step is the owner's to run.

## The next action
Connect Netlify: *Add new site → Import an existing project* → pick `celesica/devtok-organized-studentdev` → accept the defaults → deploy. `netlify.toml` at the repo root already sets publish `site` with an empty build command, so nothing needs configuring in the dashboard. No redirect or rewrite rules — the site uses hash routing.

For a same-day fallback, <https://app.netlify.com/drop> takes the `site/` folder by drag-and-drop and returns a URL in seconds.

## Files touched, and why
- `tools/build.js` — the 375px calendar fix, then the video header: the `HERO` block, the `.hero-band` / `.hero-vid` / `.hero-wash` rules, and a copy of the mp4 into `site/assets/`. The generator, not `site/index.html` or `site/css/app.css`, because those are generated.
- `site/index.html`, `site/css/app.css`, `site/assets/cozy-desk-loop.mp4` — regenerated.
- `planning/site-copy-all-sections.md` — dropped the lede paragraph and changed the meta line, so the copy doc still matches the site. The second edit ever made under `planning/`, and made on explicit instruction.
- `planning/Cozy Desk Loop.mp4` — now tracked. It was sitting untracked; it is the header footage and the build reads it, so it belongs in the repo.
- `tools/README.md` — documents the asset copy and the header video.
- `netlify.toml` — new. Publish `site`, empty build command, `X-Content-Type-Options: nosniff` and `Referrer-Policy: no-referrer`.
- `site/README.md` — the Netlify section now says to accept the defaults, since `netlify.toml` supplies them.

## Decisions made
- Verification stays an ad-hoc script in the session scratchpad, not a committed suite. `CLAUDE.md` says there is no test tooling here and that inventing it is not the goal; re-authoring the script per session is the accepted cost.
- `netlify.toml` lives at the repo root rather than being configured in the dashboard, so the deploy settings are reviewable in git.

## Open questions needing me (owner)
- Section 06 links (Notion template, previous session recording) still have no real URLs.
- The presenter sign-off at the end of section 08 is unwritten in the copy doc, so it is absent from the site.
- Section 09 has no closer box, matching the export.
- The seven screenshot slots show built HTML mockups. Real screenshots can replace any of them by deleting that entry from `tools/mockups.js`.
- Root `README.md` (the outside view of the repo) is still unwritten.

## Machine state
- Branch `main`, tracking `origin/main` at `celesica/devtok-organized-studentdev` (private). Clean tree as of this commit.
- Needs on a fresh machine: git, Node (for the build only), Python 3 (for local preview). The site itself needs nothing — it opens from `file://`.
- Verification used headless Chrome over the DevTools Protocol at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, driven by a plain Node script with no dependencies (Node 26's global `WebSocket`).
- Local preview during this session: `python3 -m http.server 8123` from `site/`, and `:8124` from the repo root for the subpath check.
