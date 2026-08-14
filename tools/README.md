# tools/ — how `site/` is generated

`site/index.html` and `site/css/app.css` are **generated** from the Claude Design
exports. Do not hand-edit them; edit the source and regenerate, or your change is
lost the next time anyone runs the build.

## Source of truth

| Source | What it provides |
| --- | --- |
| `planning/Session website with tabs/Student Dev Guide.dc.html` | the ten guide sections and the guide stylesheet |
| `planning/Session website with tabs/Toolkit.dc.html` | the toolkit layout, its stylesheet, and its data arrays |

`planning/Student Dev Guide.html` is the same design delivered as a
self-extracting bundle. It is a convenient way to view the intended result in a
browser; the two `.dc.html` files above are what the build actually reads.

## Running it

```bash
cd tools && node toolkit.js && node build.js
```

`toolkit.js` runs first and must not be skipped: the toolkit page is data-driven,
so its templates, checklists, prompts, and glossary live in JavaScript arrays
inside `Toolkit.dc.html` rather than in its markup. The script evaluates those
arrays, expands the `<sc-for>` loops, and writes `toolkit-body.html`,
`toolkit-modal.html`, and `toolkit-prompts.json`, which `build.js` then inlines.

`build.js` writes `site/index.html` and `site/css/app.css`, and copies
`planning/Cozy Desk Loop.mp4` to `site/assets/cozy-desk-loop.mp4` — the header
footage. Copying rather than referencing `planning/` keeps `site/` a
self-contained folder a static host can publish on its own. The build throws if
the source file is missing.

## What the build converts

The exports are Claude Design templates. They carry `{{...}}` bindings and a
React runtime (`support.js`, `_ds_bundle.js`) that the deployed site must not
depend on. The build rewrites those bindings into plain data attributes that
`site/js/components.js` reads:

| Export | Becomes | Meaning |
| --- | --- | --- |
| `onClick="{{pick}}"` | `data-act="pick"` | sets `state[data-k] = data-v` |
| `class="fcard {{c1b.stu}}"` | `data-st="c1" data-on="stu" data-mode="eq"` | gets `on` when the group equals the value |
| `class="lrow {{c7r.3}}"` | `data-mode="gte-cur"` | accumulating stack rows; `cur` marks the current one |
| `class="evr {{c12f.2}}"` | `data-mode="gte"` | accumulating reveals |
| `class="{{c6r}}"` | `data-mode="reveal"` | inverted — carries `hid` until revealed |
| `class="ckrow {{ckc.f1}}"` | `data-ck="f1"` | checklist item, persisted in `localStorage` |
| `<image-slot id="s1-setup">` | the matching entry in `mockups.js` | a built HTML/CSS mockup; the export's fixed-height wrapper is dropped so it sizes itself |
| `<image-slot>` with no mockup | `<div class="imgslot">` | a labelled drop zone, keeping the export's sized box |

Everything else — copy, structure, and CSS — is carried through verbatim. The two
stylesheets are concatenated unchanged, and only the routing shell (view
show/hide, previous/next, the mobile tweaks) is appended.

## Screenshot slots

`mockups.js` maps each slot id to a built HTML mockup, so the site needs no image
files. To use a real screenshot instead, delete that entry and the slot falls back
to a labelled drop zone at the export's intended size.

## Component defaults

The export seeds its React state with `{c7:1, c12:0, c16:1, c18:'now', c10:'ex',
c3:'topic'}`. `site/js/components.js` copies those values verbatim in `INITIAL`.
Without them the stack, the tools filter, the structure ladder and the upskilling
toggle all open on nothing. If a default changes in the export, change it there too.

## Progressive reveal

`site/js/reveal.js` shows one `.band` (subsection) at a time within a guide view,
so nothing the presenter has not reached yet can appear on screen. The next one is
revealed by the dot rail on the right, the **Continue** button, scrolling to the
bottom, or a downward wheel gesture when the page is too short to scroll. Switching
tabs resets the section to its first subsection.

It is deliberately off below 860px and on `/toolkit`: progressive reveal is a
presentation aid, and a phone reader or someone hunting for a template wants a
plain scrolling document. The toolkit has its own jump chips instead.

## The one deliberate divergence from the export

Section 00's header is **not** taken from the export. The export had trimmed the
gold subtitle and folded the TL;DR into a plain panel. The build replaces that
block with `HERO` in `build.js`, whose wording comes from
`planning/site-copy-all-sections.md` — the authority for copy. If the header
markup in the export ever changes, the replacement throws rather than silently
doing nothing, so the mismatch surfaces at build time.

`HERO` is also where the header video lives: a muted, looping, controlless
`<video>` behind an angled plum wash (`.hero-wash`). The copy sits against the
left edge so the desk stays in frame on the right; the wash is dark enough to
read against while the laptop stays faintly visible behind the text. No
play/pause control by design — the loop always runs.

Below 760px the header reverts to its pre-video form: no footage, the ordinary
centred column, a solid TL;DR card. The video is not merely hidden — an inline
script assigns its `src` from `data-src` only when `matchMedia('(min-width:761px)')`
matches, so a phone reader never downloads the 2.5 MB file. The wash is CSS,
not baked into the footage, so legibility never depends on the file loading.

Everything else in the guide still comes through verbatim.

## Editing content

Change the wording in the matching `.dc.html`, then rerun the build. Keep
`planning/site-copy-all-sections.md` and `planning/toolkit.md` in step with any
copy change so the planning documents stay trustworthy.
