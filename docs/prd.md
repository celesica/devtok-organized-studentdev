# Product Requirements — Get Organized as a Student Developer

**Status:** Architect draft · **Prepared for:** BMAD workflow (Architect → Dev)
**Source of truth:** `planning/student-dev-site-brief.md`, `planning/site-copy-all-sections.md`, `planning/interactive-components.md`, `planning/toolkit.md`
**Event:** Saturday, August 15 2026 · 8:00 PM PHT · DevTok Pinas · 90-minute live Discord screen share
**Presenter:** Jazzy

---

## 1. Overview

An educational website that **replaces a slide deck** for a 90-minute live Discord event, then survives as a permanent reference for student developers. It is deliberately **not a landing page**: nothing is sold, and there is no waitlist, funnel, testimonials, pricing, or founder-credibility section.

The product succeeds when it is **bookmarked and forwarded**. People share tools and references; they do not share presentations.

## 2. Goals

- **G1 — Present without notes.** The presenter can deliver all nine blocks in order without speaker notes, driven from the site's visuals and interactive components alone.
- **G2 — One dominant visual per concept.** Every concept carries a visual that makes the point without narration.
- **G3 — Two-click resource access.** Any template, prompt, checklist, or glossary term is reachable in ≤2 clicks from any page.
- **G4 — Fast on a phone.** Loads quickly on mobile data with no heavy dependencies.
- **G5 — Survive Discord compression.** Legible over compressed video and on a phone-sized viewport.

**Student outcome, two weeks after the event:**
- I can find any file from this term in under 30 seconds.
- I can open any project and know what every top-level item is for.
- I can run the reset without opening the site.

## 3. Target users

- **Primary — first-year CS/IT students.** Light on vocabulary; need a default, not a decision tree. Return once, to copy the folder structure.
- **Secondary — upper-year students (3rd/4th).** Have folders; lack portfolio-ready repos, team hygiene, and secrets awareness. Need visible **level markers** so they can spot material aimed at them.
- **Tertiary — self-taught students and engineering students who code.**

**Constraints to respect:** mixed OS (Windows-heavy, but show macOS/Linux equivalents where they differ); free/student-accessible tools only; constrained hardware and connectivity (shared computers, small SSDs, unstable internet, phone-only at times); a meaningful share of the live audience watches on a phone.

## 4. The two modes

The site must serve both at full strength from a single build.

### Mode 1 — Live presentation (`/`, launch-critical)
The presenter shares her screen, moves through the tabs, and talks over them. The site holds the sequence, carries the visuals, and gives natural transition points. **No section requires reading paragraphs aloud.** Only one section is visible at a time so upcoming content never leaks into frame. Interactive components start neutral and reveal on presenter clicks — never autoplay.

### Mode 2 — Permanent resource (`/toolkit` + deep links)
Months later a student returns for a README template, the reset checklist, or a reminder of what `.gitignore` does. They arrive by bookmark and need the answer in ≤2 clicks, without re-reading the narrative. Return traffic is overwhelmingly direct-to-resource.

## 5. Information architecture

Two routes. Not twenty flat sections.

### `/` — The Guide (the spine)
Nine live blocks, in order, each its own tabbed view:

```
00  Start here                        3 min
01  Your four main folders           10 min
02  Organizing your school files      8 min
03  Your coding projects  ⭐          20 min
04  Your calendar and tasks          12 min
05  Protecting your work              8 min
06  Notion for notes and school       8 min
07  Setting up your coding workspace  8 min
08  The 20-minute reset               5 min
09  Bonus — group projects       site only
```

Section 03 is the centerpiece and gets the most design effort (five-layer stack builder). Content and ordering come verbatim from `site-copy-all-sections.md`.

### `/toolkit` — The Library
Everything reusable, reachable without touching the guide:

- **Templates (9)** — Studies (minimal/standard/detailed), Development, Upskilling (by-topic/by-platform), Career, project starter, README, `.gitignore` starters.
- **Checklists (5)** — start of term, new project, before pushing to GitHub, project finish, security basics. (The 20-minute reset is the sixth checklist surfaced in Section 08 and mirrored here.)
- **Prompts (15)** — grouped by job (Organization, Projects, Git & documentation, Learning, Self-check), each a `PromptCard`.
- **Glossary (12)** — folder, project, workspace, repository, remote, Git, GitHub, commit, clone, push, terminal, dependency — each one sentence, linked back to the section that teaches it.
- **Tools** — organized by job (`Now` / `Soon` / `Later`), not a logo wall; free tools only.

## 6. Functional requirements

**Navigation & routing**
- **FR1** — Persistent, always-visible browser-style tab bar: `01 Folders`, `02 School`, `03 Projects`, … plus a visually separated Toolkit tab at the right end.
- **FR2** — Each tab is its own deep-linkable, bookmarkable, shareable URL via hash routing (`#/03-projects`).
- **FR3** — Browser back/forward moves between tabs.
- **FR4** — Keyboard nav: Left/Right arrows move between tabs; number keys `0`–`9` jump directly to that block.
- **FR5** — Only one section visible at a time; within a tab, vertical scrolling is allowed.
- **FR6** — Previous/Next controls at the bottom of each view for first-time linear reading.
- **FR7** — Mobile: tab bar is a horizontally scrollable strip with the active tab scrolled into view (or a dropdown if too cramped); tabs never wrap to a second row.

**Content**
- **FR8** — All nine guide sections render with the exact copy from `site-copy-all-sections.md` (document header, TL;DR, section-closer boxes, key takeaways, presenter notes, notes).
- **FR9** — Badge system: `HOW I DO IT`, `RECOMMENDED`, `CONVENTION`, `TOOL-SPECIFIC`, `OPTIONAL`, `ADVANCED` — text, roughly one per section.
- **FR10** — Level markers `FOUNDATION` / `BUILDING` / `GOING DEEPER` in section headers, rendered as text (never color-only).
- **FR11** — Section-closer box on every guide section, labelled `UNDERSTAND` / `DECIDE` / `COPY` / `DO`.
- **FR12** — `Learn more` expanders hold depth only, never the point; default collapsed.

**Interactive components** (each: neutral start, click-to-reveal, fast transitions ≤250ms, reset control, keyboard operable, `prefers-reduced-motion` respected)
- **FR13** — "Where does this go?" (Section 01): six tap-to-reveal examples showing correct folder + reasoning; no scoring.
- **FR14** — Five-layer stack builder (Section 03): Folder → Project → Editor → Git → GitHub, added one at a time with Next/Back/Reset. Highest-priority component.
- **FR15** — Clickable project tree (Section 03): `src/`, `README.md`, `.gitignore`, `.env.example`, dependency file reveal what/when/convention-or-optional; horizontal scroll on mobile inside a bordered panel; framed as one example.
- **FR16** — Reset checklist (Section 08 + `/toolkit`): grouped checkable items, progress persisted in browser storage, visible non-destructive reset, copy-as-text, degrades to a plain checklist with storage disabled.
- **FR17** — Prompt library (`/toolkit`): all 15 `PromptCard`s, grouped by job; collapsed card shows title + "use this when" + truncated preview; modal shows full text with Copy and Esc-to-close; focus trapped and returned; degrades to a plain expandable block without JS.
- **FR18** — Supporting stepped/toggle components as specified in `interactive-components.md` (four-folder explorer, upskilling toggle, studies tree, naming comparison, structure ladder, commit comparison, where-your-work-lives, key-in-code, toolkit filter, capstone split).
- **FR19** — Copy buttons on every template, prompt, tree, and checklist, with a visible confirmation state and large touch targets.

## 7. Non-functional requirements

- **NFR1 — Tab switching ≤150ms**, with no content fade-in. Only one section rendered/visible at a time.
- **NFR2 — Discord + phone legibility.** Strong contrast in both warm and dark-panel contexts; body legible at 375px width.
- **NFR3 — Resource access ≤2 clicks** from anywhere (Toolkit tab is always one click; any item within it is the second).
- **NFR4 — No build step.** Site opens by double-clicking `index.html` or via `python -m http.server`; no console errors.
- **NFR5 — Lightweight.** Plain HTML/CSS/JS, no framework, no bundler, no WebGL, no video backgrounds, no heavy animation libraries; fast on mobile data.
- **NFR6 — Accessibility.** Semantic HTML, visible keyboard focus, full keyboard operation for all interactive components, alt text on meaningful images, `prefers-reduced-motion` respected, meaning never carried by color alone.
- **NFR7 — Design fidelity.** Warm Arcade tokens/components used exactly; no invented colors; no cyan/teal/green/blue, no pure `#000`/`#FFF`; mono numbers; raster glyphs only; no emoji; sentence-case headings per the readme.
- **NFR8 — Persistence resilience.** Checklist state persists across visits but the site is fully usable with storage disabled or blocked.

## 8. Design direction (summary; readme is authoritative)

Warm cream page with dark, disciplined technical panels embedded in it — that contrast is the identity. Type: Fira Code display headings, Plus Jakarta Sans / Figtree body, JetBrains Mono for all trees/code/filenames/numbers. Motion only where it clarifies a relationship; no scroll hijacking, parallax, ambient animation. Explicitly avoid generic AI-SaaS aesthetics, glassmorphism on body content, gradient hero cards, emoji, and childish classroom styling.

## 9. Out of scope (explicitly cut)

- No landing-page / funnel elements: no waitlist, repeated CTA, conversion architecture, testimonials, pricing, FAQ, or founder-credibility section.
- No separate "presentation mode" layout — a well-typeset desktop view already presents.
- Form-style generators: Folder System Builder, Project Structure Generator, Deadline Breaker, README Builder, Commit Message Helper, Organization Audit.
- No live AI API integration (prompts are copyable text). No accounts, no backend, no analytics requirement, no dark-mode toggle (post-MVP).

## 10. Definition of done

- `docs/prd.md` and `docs/architecture.md` written.
- All nine guide tabs render with correct copy from `site-copy-all-sections.md`.
- `/toolkit` has all Templates, 5 Checklists, 15 Prompts, 12 Glossary terms, and Tools.
- Deep links, back/forward, arrow keys, and number keys `0`–`9` all work.
- Tab switch is visually instant (≤150ms, no fade).
- Legible on a 375px-wide phone viewport.
- Palette + typography match the Warm Arcade readme; no emoji; glyphs raster.
- `site/README.md` present; site opens with no build step and no console errors.
