# PROJECT BRIEF
## Get Organized as a Student Developer — Companion Site

**Prepared for:** BMAD workflow (Analyst → PM → Architect → Dev)
**Event date:** Saturday, August 15 — 8:00 PM Philippine Time
**Presenter:** Jazzy
**Community:** DevTok Pinas
**Delivery:** Live Discord screen share, 90 minutes

---

## 1. EXECUTIVE SUMMARY

An educational website that **replaces a slide deck** for a 90-minute live Discord event, then survives as a permanent reference for student developers.

The site has two modes and must serve both at full strength:

**Mode 1 — Live presentation.** The presenter shares her screen, scrolls the site, and talks over it. The site holds the sequence, carries the visuals, and gives natural transition points. No section requires reading aloud. Everything must survive Discord video compression and be legible to attendees watching on a phone.

**Mode 2 — Permanent resource.** Months later, a student returns for a README template, the reset checklist, or a reminder of what `.gitignore` does. They arrive by bookmark, need the answer in two clicks, and never re-read the narrative.

**Primary success metric:** the site gets bookmarked and forwarded. People share tools and references; they do not share presentations.

**This is not a landing page.** Nothing is being sold. There is no waitlist, no repeated CTA, no conversion funnel, no founder-credibility section, no testimonials, no pricing.

---

## 2. PROBLEM STATEMENT

Student developers are never taught where their work lives. It is not in any curriculum. Everyone figures it out privately, late, and badly.

The visible symptoms are files in Downloads, `final-final-v2`, and lost coursework. The actual root causes are three:

1. **Placement is decided at save time**, so the cheapest option always wins.
2. **No conceptual model of what a project is** — folder, project, workspace, repository, and remote are five different layers, and nobody says so out loud.
3. **No reset ritual**, so one bad week ends the system permanently.

Existing content fails this audience two ways: generic productivity advice (which ignores that code has different needs than coursework), or developer tooling docs (which assume you already know the vocabulary).

**Additional context — Filipino student developers.** University life is not purely programming. A CS student simultaneously carries math, science, gen eds, Life and Works of Rizal, PE, labs, research, thesis/capstone, OJT requirements, and administrative paperwork. Any organizational model that files all academic life under "Development" breaks by second year.

---

## 3. TARGET USERS

**Primary — first-year CS/IT students.** Light on technical vocabulary. Need a default, not a decision tree. Will return exactly once, to copy the folder structure and build it.

**Secondary — upper-year students (3rd/4th year).** Have folders already; lack a portfolio-ready repo, team repo hygiene, and secrets awareness. Will skim ahead during the live session and need visible markers for material aimed at them, or they will conclude the site is too basic.

**Tertiary — self-taught students and engineering students who code.**

**Constraints to respect:**
- Mixed OS. Windows-heavy but not exclusive. Show macOS/Linux equivalents where they differ.
- Assume no budget for paid software. Free and student-accessible tools only.
- Assume constrained hardware and connectivity: shared computers, small SSDs, unstable internet, phone-only access at times.
- Assume a meaningful share of the live audience watches on a phone.

---

## 4. GOALS & SUCCESS METRICS

**A student should be able to say, two weeks after the event:**
- I can find any file from this term in under 30 seconds.
- I can open any project and know what every top-level item is for.
- I can run the reset without opening the site.

**Site-level goals:**
- Presenter never needs speaker notes during the live event.
- Every concept has one dominant visual that carries the point without narration.
- Any template, prompt, or checklist is reachable in two clicks from any page.
- Loads fast on a phone on mobile data.

---

## 5. INFORMATION ARCHITECTURE

Two routes. **Not** twenty flat sections.

### `/` — The Guide (the spine)

The nine live blocks, in order, one continuous scroll. This is what the presenter presents from.

```
00  Start here                          3 min
01  Your four main folders             10 min
02  Organizing your school files        8 min
03  Your coding projects  ⭐            20 min
04  Your calendar and tasks            12 min
05  Protecting your work                8 min
06  Notion for notes and school         8 min
07  Setting up your coding workspace    8 min
08  The 20-minute reset                 5 min
09  Bonus — group projects        site only
```

**Structural decisions in this order, all deliberate:**

- **"How much structure a project needs" is folded into 03**, not a standalone section. It is a sub-unit of the coding-project section, roughly four minutes of it.
- **Group projects moved to bonus (09).** Reference material on the site; covered live only if time allows.
- **Calendar section is Google Calendar specific and practical.** Not a generic tools comparison — step-by-step setup for class schedules, Tasks lists, and notifications, with the reasoning for why a calendar app beats a printed or screenshotted schedule. `TOOL-SPECIFIC` badged; any calendar app with reminders works the same way.
- **Notion has its own section (06).** The presenter is demonstrating her real school Notion and sharing a template. Framed as `HOW I DO IT`, with Obsidian and OneNote named as alternatives, and an explicit caution against systems that take more upkeep than the schoolwork they track. Notion is still not the centerpiece of the overall system — the folders are.
- **Coding workspace setup and the developer toolkit are one section (07).** They are the same subject: what a workspace is, and what to install. The toolkit is presented as a table organized by job, not as a tool list.

### `/toolkit` — The Library

Everything reusable, reachable without touching the guide.

```
Templates      folder trees, README, .gitignore starters
Checklists     semester setup, new project, before pushing, the reset
Prompts        AI prompt library
Glossary       the 12 words, defined
Tools          organized by job, not by logo wall
```

### Library contents — build all of these

**Templates (9).** Studies hierarchy (minimal / balanced / detailed variants) · Development hierarchy · Upskilling hierarchy (organized by topic, with the platform-first and course-first alternatives and their tradeoffs) · project starter structure · README template · `.gitignore` starters · semester setup checklist · student developer account checklist · project completion checklist.

**Checklists (5).** Start of semester · new project · before pushing to GitHub · project finish · security basics. Each grouped by category (Academic / Files / Calendar / Development / Accounts / Backup) rather than presented as one flat list. Avoid checklist overload — these five only.

**Prompts (15).** Grouped by job. Every one built with `PromptCard`, every one carrying a title, a "use this when" line, editable placeholders, and a copy button.

*Organization:* design a folder hierarchy for my semester · help me decide where this file belongs · review my directory tree and identify clutter · help me clean my Downloads and Desktop · suggest what I should archive
*Projects:* recommend a beginner-friendly project structure for [stack] · help me plan a personal project · break this assignment into milestones
*Git & documentation:* generate a README outline · improve this commit message · explain what files Git should ignore for [stack]
*Learning & navigation:* explain this unfamiliar repository tree · help me understand a codebase without writing the code for me · help me organize my learning resources
*Self-check:* ask me questions that reveal whether my organizational system actually makes sense

Prompts stay short and practical. Do not pad them because they are AI prompts.

**Tools.** Organized by job, never as a logo wall: edit · version · run · debug · test · format · collaborate · deploy · learn · AI. Each entry labelled `START HERE` / `PROJECT-DEPENDENT` / `LATER` / `OPTIONAL`. Free and student-accessible tools only. The governing principle stated at the top: **install a tool because it solves a problem you currently have** — not because a listicle says every developer needs twenty-five extensions.

**Glossary.** The ~12 words the live session defines: folder · project · workspace · repository · remote · Git · GitHub · commit · clone · push · terminal · environment · dependency. Each one sentence, plain language, linked back to the section that teaches it.

**Rationale for the split:** one scroll containing both would make the live path too long and bury the reusable material at the bottom, where return visitors never scroll. Return traffic is overwhelmingly direct-to-resource.

### Navigation — tabbed, one section per view

**This is not a single scrolling page.** Each section is its own view, reached by a persistent tab bar at the top, styled after browser tabs.

**The reason is presentation.** While the presenter is discussing a section, the next section must not be visible below it. A one-pager leaks upcoming content into frame during screen share and pulls attention forward. Tabs keep each view focused on one topic.

**Requirements**

- **Persistent tab bar at the top**, always visible, styled as browser-style tabs. Section number plus short label: `01 Folders`, `02 School`, `03 Projects`.
- **Every tab is its own URL** — `/03-projects` or `#/03-projects`. Deep-linkable, bookmarkable, shareable. This is what makes return visits work.
- **Browser back and forward must work** between tabs.
- **Keyboard navigation.** Left/right arrows move between tabs; number keys `0`–`9` jump directly. Essential for presenting — the presenter should never hunt for a tab with the mouse mid-sentence.
- **Instant switching.** No transition animation longer than 150ms, no fade-in of content. Delay is visible and distracting over Discord.
- **Previous / Next at the bottom of each view**, so a first-time visitor still gets the guided sequence without using the tabs.
- **Mobile:** the tab bar becomes a horizontally scrollable strip with the active tab scrolled into view, or a dropdown if the strip is too cramped. Tabs must not wrap into a second row.
- **Toolkit is a tab too**, visually separated at the right end of the bar.

**Within a tab, vertical scrolling is fine.** The requirement is only that no *other section* appears below. Each view ends at its own closer.

### Inner steppers for heavy sections

Section 03 carries five layers plus the structure ladder and is the longest view by a wide margin. It should use an **inner stepper**: the five layers presented as steps the presenter advances through one at a time, rather than a single long scroll.

The same applies anywhere a section has a sequence the presenter walks through. This keeps the heaviest content on one screen at a time and gives the presenter a clear click-to-advance rhythm.

---

## 6. SECTION CONTENT SPEC

Each guide section follows the same shape:

**number + eyebrow → level marker → heading → objective → why it matters → units → section-closer box.**

**Objective.** One line, stated as a capability: *"Set up four top-level folders, and know which one anything belongs in."* Not a topic description.

**Why it matters.** Maximum two sentences. The purpose behind the instruction, so it survives past week one.

**Units.** The body of a section is a series of units, not prose. Each unit is:
- a short subheading (the thing being explained)
- **one line** stating what it is and its defining property
- bullets, a tree, or a table — whichever fits
- an optional badge

**Hard prose limit: two sentences per block.** Anything longer becomes bullets or moves into a `Learn more` expander. This is the constraint that keeps the site presentable over Discord and scannable on return — a section that reads well but takes 90 seconds to scan has failed the primary use case.

**The section-closer box is required on every section.** It is a small, visually distinct block holding the distilled takeaway, and it is how the site delivers on its core requirement that every section produce one of four outcomes. Each closer is labelled with its outcome type:

- `UNDERSTAND` — the concept, stated in one sentence
- `DECIDE` — the rule that resolves the choice
- `COPY` — the template or prompt to take
- `DO` — the next action

A section with no closer is a section that only made the student consume more information.

**Reference implementation:** see the accompanying sample-copy document for sections 00–02 written out in full. Sections 03–08 match its format and register.

Numbered markers are justified here because the content genuinely is a sequence — a talk delivered in order.

| # | Section | Dominant visual | Interactive |
|---|---|---|---|
| 00 | Start Here | Real screenshot: the three-folder setup | — |
| 01 | Three Kinds of Work | Three-panel diagram + real `Y3T3` screenshot | **"Where does this go?"** |
| 02 | Organize Your Studies | Styled directory tree + naming do/don't table | — |
| 03 | What a Project Actually Is | **Five-layer stack** + annotated VS Code + Open File vs Open Folder side-by-side | **Clickable project tree** |
| 04 | How Much Structure? | Four trees side by side, increasing weight | — |
| 05 | When vs What Next | Four-box model: WHERE / WHEN / WHAT NEXT / WHAT CHANGED | — |
| 06 | Working With Other People | Repo-and-pointer relationship diagram | — |
| 07 | Protecting Your Work | Device → Cloud → GitHub flow + `.env` / `.gitignore` blocks | — |
| 08 | The Reset | The checklist itself | **Checkable, persists** |

### Section content detail

**00 — Start Here.** Opens on the presenter's real setup: Studies, Development, Upskilling side by side. Aspirational framing, **not** before/after. **Do not show messy-desktop examples anywhere on this site** — this is an explicit content decision. Frames the two failure modes (no system at all, or an over-built productivity system abandoned in two weeks) before the middle path. States the three promises: ~12 words defined, a home for every file, a 15-minute recovery routine. Teases the anchor sentence.

**01 — Your Four Main Folders.** Studies / Development / Upskilling / Career. The argument: **different clocks, different folders.** Real `Y3T3` screenshot showing Algorithms next to Rizal and PE — proof that school is bigger than development. One decision rule: *"When this term ends, does this stop mattering?"* Career introduced as a brief fourth folder — the only one that outlives the degree.

### THE CODE RULE — non-negotiable across the whole site

**Anything containing code goes in Development.** School assignments, lab exercises, tutorial practice, capstone code, personal projects — all of it, one location, no exceptions.

This replaces any judgment call about whether something is "coursework that happens to be code" or "software that happens to be for school." That distinction requires experience beginners do not have, and getting it wrong scatters code across two trees. The binary rule cannot be got wrong.

Decision cascade, in strict order:

1. **Does it contain code?** → Development. Stop.
2. **Does it stop mattering when the term ends?** → Studies.
3. **Is it material you're learning from?** → Upskilling.
4. **Does it outlive the degree?** → Career.

When something has both code and documents (assignments, capstone, thesis), split it: code to Development, documents to Studies, plus a pointer file. This is the standard pattern, not an exception.

Development home tree, badged `HOW I DO IT`:

```
Development/
├── school/
│   ├── Y2T1/
│   └── Y2T2/
├── learning/
├── personal/
├── hackathons/
├── experiments/
└── archive/
```

`school/` mirrors the Studies term structure so coursework code stays findable by when it was written. `learning/` holds code written while following courses — the course *materials* stay in Upskilling. Framed as one workable split, not a standard.

**02 — Organize Your Studies.** One default structure, explicitly labeled *"if you don't know, start here"* (alternatives live in `/toolkit`). Naming conventions: `YYYY-MM-DD` dates, no spaces (first crossover into developer skills — spaces break terminal commands), descriptive over clever. **No archiving step for school files.** The year/term structure handles this on its own — a finished term simply stays where it is, and the only end-of-term action is creating next term's folder. A degree is roughly twelve terms, so the list never grows unmanageable. This is a primary argument for term-first organization and must not be replaced with an Archive-folder ritual. (Development keeps an `archive/` folder, because coding projects do not end on a schedule.) Starting-from-where-you-are: one `_UNSORTED_YYYY-MM` folder, sweep everything in, build clean beside it, apply the new system going forward only.

**03 — What a Project Actually Is.** *The centerpiece. Budget the most design effort here.* Builds up five layers, each answering one question and earning one word:

1. **Folder** — where does this physically live? (Shown in the file manager, not the editor.)
2. **Project** — could someone else run this? README + dependency file. **Anchor sentence lands here.**
3. **Workspace / editor context** — Open File vs Open Folder, side by side. The single highest-value comparison on the site.
4. **Git** — what changed, can I go back. The history *is* your saved versions.
5. **GitHub** — where it lives online. Boundary: GitHub is not cloud storage.

Closes by naming the confusion directly: five layers, five words, used interchangeably by everyone. Includes the sync warning (never put a code project inside Drive/OneDrive/Dropbox; Windows `Documents` may sync silently).

**Two required sub-visuals in this section:**

**Commit message comparison.** Side by side, no explanation needed:

```
fix                    →   Initialize project structure
fix2                   →   Add login form
asdf                   →   Implement email validation
thing                  →   Fix responsive navigation
final                  →   Update installation instructions
```

**Project lifecycle strip.** A horizontal flow closing the section, showing where the five layers sit inside the larger arc:

```
IDEA → FOLDER → EDITOR → GIT → BUILD → COMMIT → GITHUB → DOCUMENT → DEPLOY → PORTFOLIO
```

Presented as *"here's the whole road; today we covered the first half."* Stages beyond `GITHUB` are badged `ADVANCED` and link to the library rather than being explained live.

**04 — How Much Structure?** Four projects side by side: 20-line exercise → course assignment → portfolio project → team project. Principle: structure matches stakes. **Over-structuring a throwaway is also a failure** — this grants beginners permission. Promotion path: good coursework should move out of the course folder or it stays invisible at internship time.

**05 — When vs What Next.** FILES = where, CALENDAR = when, TASKS = what next, GIT = what changed. Calendar holds only fixed and recurring. The due date should not be the first time your system meets the assignment. One warning: any system that takes more maintenance than the schoolwork it manages will be abandoned. Tool-agnostic — paper counts.

**The dashboard warning, `TOOL-SPECIFIC` badged.** Notion appears as *one* implementation and never as the system itself. `Dashboard ≠ storage` — a dashboard surfaces and links; it does not hold. Explicit caution against building fourteen linked databases and abandoning them in two weeks. Alternatives listed flatly with no ranking: Todoist, Microsoft To Do, Apple Reminders, Obsidian, Google Tasks, the LMS, a paper planner. **Notion must not be the centerpiece of this section or of the site.**

**Resource triage** (`Learn more` expander). Collecting tutorials, bookmarks, PDFs, repos, and playlists is not learning. Five buckets, one decision each: `LEARN NOW` · `REFERENCE` · `ARCHIVE` · `DELETE` · `SAVE ONLY IF SCHEDULED`. The rule: a saved resource with no date attached is a delete candidate.

**06 — Working With Other People.** Failure modes (final version on one laptop; files passed over Messenger; the teammate who couldn't clone and quietly stopped contributing). Fixes: one repo, one owner of record, access on day one, README on day one. Capstone split: code → Development, paperwork → Studies, joined by a **pointer file**. Establish that a pointer is a legitimate organizational object.

**07 — Protecting Your Work.** What a secret is. Why pasting a key into code is the trap. **Deleting the line later doesn't remove it — it's in the history.** `.env`, `.gitignore`, `.env.example`. One backup line: working copy (laptop) / backup (cloud) / history (GitHub) are three different jobs. **GitHub is not a backup destination for arbitrary school documents.**

**Security basics** — short, practical, no lecture: a password manager, unique passwords, 2FA on the accounts that matter (GitHub, primary email, school portal), and recovery codes stored somewhere that is not the laptop they protect. Free tools only.

**The graduation cliff** — a student's university email should not become their only developer identity. When school access ends, so does the recovery address for every account attached to it. The fix is one personal professional email created now, set as recovery on GitHub and the accounts that outlive the degree. Core account checklist (school email, personal professional email, GitHub, LinkedIn, Discord, portfolio) lives in `/toolkit`.

**08 — The Reset.** The 15-minute checklist, checkable, progress persisted. Trigger is end-of-week, not "when I feel behind." Closes on the callback: *Your system doesn't need to stay perfect. It just needs to be easy to return to.* Ends with the three success criteria.

### Running example

**One project carried through sections 03 → 07: a class schedule tracker.** Idea → where it belongs → folder → VS Code → Git → GitHub → README. Narrative continuity across the middle of the site.

> **Presenter decision — override if preferred.** Alternative considered: a jeepney fare calculator (more locally flavored). Class schedule tracker chosen because it ties naturally into section 05.

---

## 7. BADGE SYSTEM

The site must visually distinguish personal preference from industry convention. Five badges, small caps, terse:

```
HOW I DO IT   ·   RECOMMENDED   ·   CONVENTION   ·   TOOL-SPECIFIC   ·   OPTIONAL   ·   ADVANCED
```

Six types, mapping directly to the presenter's own classification:

- `HOW I DO IT` — one valid way the presenter personally organizes things
- `RECOMMENDED` — a generally useful practice
- `CONVENTION` — commonly expected in real software development
- `TOOL-SPECIFIC` — applies to VS Code / GitHub / Notion specifically, not universally
- `OPTIONAL` — useful for some students, unnecessary for others
- `ADVANCED` — beginners do not need this yet

Target roughly **one badge per section, not one per paragraph.**

### Level markers

A second, visually distinct system. Sits in the section header beside the number. Lets an upper-year scan for what is theirs and a beginner know when it is safe to skip:

```
FOUNDATION   ·   BUILDING   ·   GOING DEEPER
```

**Rendered as text, not colored dots or emoji.** Level must be readable without color — it carries meaning.

Suggested mapping: 00–02 `FOUNDATION`, 03–05 `BUILDING`, 06–07 `GOING DEEPER`, 08 `FOUNDATION`.

Non-negotiable outcome: no student should leave thinking *"if I don't organize exactly like Jazzy, I'm doing development wrong."*

---

## 7B. COMPONENT LIBRARY

Build these as reusable components; they repeat across the site.

**`PromptCard`** — *the most important reusable component on the site.*
Collapsed state shows the prompt title, a one-line "use this when" description, and a truncated preview with a `View ↗` affordance. Clicking opens a modal with the full prompt text, a `Copy prompt` button, and Esc-to-close. Keeps a long prompt library scannable instead of turning it into a wall of text.
*Acceptance:* keyboard accessible (Esc closes, focus trapped and returned), copy shows a confirmation state, degrades to a plain expandable block without JS.

**`PresenterNote`** — a visually distinct aside where the presenter speaks in first person about a judgment call or personal preference. This is the `HOW I DO IT` badge upgraded from a label into a component. Warm treatment — blush fill, left rule in maroon. Used sparingly, roughly one per section at most.

**`SectionCloser`** — the labelled takeaway box that ends every guide section. Four variants: `UNDERSTAND`, `DECIDE`, `COPY`, `DO`.

**`TreePanel`** — dark panel containing a monospace directory tree. Copy button. Horizontal scroll on mobile.

**`Comparison`** — two or more items side by side on desktop, stacked with labels on mobile. Used for Open File vs Open Folder, the four project weights, the commit-message comparison, and the naming do/don't table.

**`Checklist`** — checkable items with persisted state and a visible reset.

**`ScreenshotFrame`** — warm frame plus caption for real screenshots. Optional annotation layer for the VS Code image.

### Document header

The guide opens with a metadata block before the hero, signalling *reference, not marketing*, within two seconds:

```
FIELD GUIDE
Get Organized as a Student Developer
[one-paragraph description of what this covers and who it is for]
August 2026 · Jazzy · DevTok Pinas
```

Followed by a short **`TL;DR`** block — three or four lines summarizing the whole guide, for the returning visitor who does not want the narrative.

### Optional: mnemonic for the five layers

> **Presenter decision.** Optional, and only if a natural one exists. A forced mnemonic is worse than none, and the five layers are already sequential and physical, which may make one unnecessary.

---

## 8. VISUAL DESIGN DIRECTION

### The signature

**A warm cream page with dark, disciplined technical artifacts embedded in it.** Every file tree, code block, terminal snippet, and layer diagram sits inside a dark panel. Everything around them is warm, soft, and generous.

That contrast is the identity. Spend the boldness there and keep everything else quiet.

### Palette and design tokens

**The presenter is supplying a design system. It is the source of truth for all color, type, spacing, and component tokens — use it exactly and do not substitute values from this brief.**

`[ATTACHED: design system]`

Until it is attached, the placeholder direction below indicates intent only. Every value here is provisional and expected to be replaced.

| Token | Provisional intent |
|---|---|
| `canvas` | Warm off-white / cream — page background |
| `surface` | Slightly deeper cream — cards, containers |
| `ink` | Near-black, warm cast — body text |
| `primary` | Deep maroon / wine — headings, nav, emphasis |
| `accent` | Terracotta — section numbers, links, active tab |
| `soft` | Dusty blush — highlight fills, badge backgrounds |
| `sage` | Muted green — success, recommended |
| `panel` | Deep warm brown-charcoal — technical artifact panels |

**Two constraints that hold regardless of the design system supplied:**

1. **Technical artifacts sit in dark panels.** Trees, code, terminal output. The contrast between a warm page and disciplined dark panels is the site's signature.
2. **No meaning carried by color alone.** Badges, level markers, and states must be readable in text.

### Typography

- **Display — Fraunces.** Warm, characterful serif. Section headings and the hero.
- **Body — Figtree.** Clean, warm, highly legible under video compression.
- **Technical — JetBrains Mono.** Trees, code, filenames, commands. **Never body text.**

The poster's hand-lettered script appears **exactly once**, in the hero, ideally as an image asset matching the poster. Nowhere else.

### Structural devices (adapted from the Altitude reference)

Take: numbered sections with a lowercase eyebrow (`01 · your spaces`), terse state labels, live rendered artifacts instead of pictures of artifacts, short declarative copy.

Do not take: dark/cool palette, conversion architecture, repeated CTA, FAQ block, founder-credibility section.

### Motion

Only where it clarifies a relationship: a tree branch expanding, a flow diagram progressing, a layer stack revealing. **No scroll hijacking, no parallax, no floating elements, no ambient animation.** Heavy motion is choppy over Discord screen share and actively harms the primary use case. Respect `prefers-reduced-motion`.

### Explicitly avoid

Generic AI-SaaS aesthetics · neon or glowing gradients · glassmorphism · 3D blobs · giant gradient text · everything-is-a-rounded-card · decorative fake terminal windows · stock developer illustrations · excessive emoji · corporate e-learning look · childish classroom look · hearts and sparkles (they work on the poster; they undercut a reference site).

---

## 9. CONTENT DENSITY

Every section is built in two layers:

**Presentation layer** — big heading, dominant visual, 2–3 sentences. Always visible. This is what gets presented.

**Reading layer** — a `Learn more` expander holding depth: edge cases, OS differences, "what to do if you already committed a key."

**Hard rule:** expanders hold *depth*, never *the point*. A returning student who never opens a single expander must still get complete, usable guidance.

> **Presenter decision — override if preferred.** Expanders default to **collapsed**. The live event is the harder constraint; returning readers will happily click. Consider a single global "expand all / collapse all" control as a presenter convenience — this gives most of the benefit of a presentation mode at a fraction of the cost.

**No separate presentation mode.** A well-typeset page at desktop width already presents well. A second layout is build-and-debug cost that the timeline does not support.

---

## 10. MVP SCOPE

### In scope

- `/` guide with all nine sections
- `/toolkit` with templates, checklists, prompts, glossary, tools
- Three interactive components (below)
- Copy buttons on every template, prompt, tree, and checklist
- Full responsive behavior
- Deep-linkable anchors

### Three interactive components — build these

**1. "Where does this go?"** (Section 01)
Six examples; tap to reveal the correct space and the reasoning. Delivers on the poster's "interactive session" promise during the live event.
*Acceptance:* works by tap and keyboard; reveals reasoning, not just the answer; no scoring, no gamification.

**2. Clickable project tree** (Section 03)
Tap `src/`, `README.md`, `.gitignore`, `.env.example`, dependency file → reveal what it is, when it's needed, whether it's convention or optional.
*Acceptance:* horizontal scroll on mobile inside a bordered panel — never wrapped or shrunk below legibility; keyboard navigable; explicitly framed as one example, not a universal tree.

**3. The reset checklist** (Section 08 + `/toolkit`)
Checkable items, progress persisted in browser storage, visible reset button.
*Acceptance:* works with storage disabled (degrades to a plain checklist); reset is obvious and non-destructive elsewhere.

**4. The prompt library** (`/toolkit`)
Built from `PromptCard` (see §7B). All fifteen prompts, grouped by job. Every prompt carries a title, a conversational "use this when" line, editable placeholders, and a copy button.
*Acceptance:* scannable at a glance without opening anything; copy works on mobile; prompts stay short and practical.

### Out of scope — explicitly cut

Folder System Builder · Project Structure Generator · Deadline Breaker · README Builder · Commit Message Helper · Organization Audit.

Each is a form that outputs text an existing static example already provides. Real build cost, real maintenance, marginal teaching value.

**No live AI API integration.** Copyable prompts are free, provider-agnostic, maintenance-free, and teach the prompt rather than a button.

**No accounts. No backend. No analytics requirement.**

### Post-MVP candidates

- AI Prompt Builder with fill-in fields (the one borderline cut — genuinely better than raw prompts)
- Additional project-structure examples by language/framework
- Dark mode toggle

---

## 11. SCREENSHOT STRATEGY

Presenter is supplying four real screenshots: `Y3T3` school folders, the Development directory, VS Code with a project open, and a GitHub repo.

**Pattern: real screenshot + abstracted version.** *"Here's mine"* → *"here's the principle underneath."*

- Real screenshots get a subtle warm frame and a short caption. They establish authenticity.
- Abstracted versions are styled monospace trees inside dark panels. They teach more clearly.
- The VS Code screenshot should be **annotated** — label Explorer, Editor, Terminal, Source Control.

Do not assume a raw Explorer screenshot is automatically the better teaching visual. It usually is not; it is the credibility layer.

---

## 12. RESPONSIVE

Desktop is the presentation surface. **Mobile is where most return traffic lands** — not an afterthought.

- **Directory trees:** horizontal scroll inside a bordered panel. Never wrap, never shrink below legibility.
- **Side-by-side comparisons:** stack vertically with a clear label on each half.
- **Copy buttons:** large touch targets, visible confirmation state.
- **Toolkit:** one tap from anywhere.

---

## 13. ACCESSIBILITY & PERFORMANCE

Semantic HTML · strong contrast in both warm and dark panel contexts · visible keyboard focus · full keyboard navigation for all three interactive components · alt text on meaningful images · `prefers-reduced-motion` respected · meaning never carried by color alone.

Fast on mobile data. No video backgrounds, no heavy animation libraries, no WebGL, no large JS bundles. Polish comes from design quality, not computational weight.

---

## 14. COPY VOICE

**Plain, instructional, practical.** The register of a clear how-to guide written for students — direct second person, imperative where there's an action, no persuasion and no personality performance.

Reference points supplied by the presenter: the Lonely Octopus resource documents and roadmaps. Their pattern is plain step titles, a short explanatory block, labeled sub-sections, `Note:` callouts, and key takeaways at the end. Match that.

### Rules

**Titles say what the section does.** "Your Four Main Folders." "Organizing Your School Files." Not questions, not slogans.

**No rhetorical devices in headings or openers.** Specifically banned:
- Reversals — *"You're not disorganized. Nobody told you where things go."*
- Metaphor headlines — *"Four kinds of work, four different clocks."*
- Setup-and-payoff openers — *"There's no subject that teaches this…"*
- Direct-address hooks — *"Be honest: where do your downloads go?"* (fine spoken live, wrong on the page)

**State the benefit plainly, in student terms.** Not a story about why the problem exists — the concrete cost of not having a system: time lost searching, work you can't show at internship time, group projects that stall, rebuilt work, lost files.

**No jokes or asides that carry no information.** *"Future You is a stranger. Be nice to that person"* is charming and gets cut. If a sentence isn't instruction, benefit, or example, delete it.

**Two sentences per block, then bullets.** Anything longer becomes a list, a table, or an expander.

**Terms are introduced where they come up, not promised up front.** Do not open with "twelve words you'll learn." Define `repository` in the sentence that first needs it, in one clause.

**Keep it accessible.** The audience is building English confidence and is not yet fluent in developer jargon. Short sentences. Common words. Where a technical term is unavoidable, define it inline the first time.

### Section format

```
SECTION NN
## Plain Title

What this section covers:  one sentence
Why it matters:            one or two sentences, concrete benefit

### Labeled Unit
Short description.
- bullet
- bullet
Note: practical caveat

## Key takeaways
- 3–4 bullets

[SectionCloser: DO / DECIDE / UNDERSTAND / COPY]
```

### Register by component

| Component | Register |
|---|---|
| Section bodies | Plain instructional — description, bullets, examples |
| `Note:` callouts | Practical caveats and exceptions. One or two sentences. |
| `PresenterNote` | First person, but still practical — *why* the presenter does something, not an anecdote about it |
| `SectionCloser` | One imperative sentence. The action to take now. |
| Key takeaways | 3–4 bullets restating the actionable points |
| Glossary, tree annotations, checklist items | Terse and neutral |

### Acceptable

> Set up this structure once at the start of each term.
> Only make the folders you'll actually use.
> Dates written year-month-day sort automatically.
> This folder is mostly not code, even for a CS student.
> Most students don't create this until they need it urgently.

### Not acceptable

> Unlock your productivity potential.
> Your Desktop is not a filing system.
> An empty folder isn't organization — it's something you open later to remember it's empty.
> You weren't missing something obvious — you were missing something nobody said out loud.
> In this section, we will explore…

**Closing line (the one permitted stylistic sentence, used once, at the end):**
> Your system doesn't need to stay perfect. It just needs to be easy to return to.

**Sign-off.** A short closing note from the presenter, first person, a few plain sentences. Not promotional.

### Anti-patterns

- Emoji as structural markers (🚀 milestone labels, 🟢🟡🟠 level dots)
- Framing that implies a quiz result ("Congratulations! It looks like you're a…")
- Gradient hero cards, hover-lift on every card, uniform 20px radius everywhere
- Achievement language ("milestone unlocked", "level up")

**Reference implementation:** the accompanying sample-copy document, sections 00–02. Sections 03–08 match its format and register exactly.

---

## 14B. VISUAL ASSETS

Every visual slot in the copy carries a specification. Which *kind* of specification depends on which of three classes the visual falls into.

### The classification rule

**Any visual containing exact text — folder names, filenames, commands, labels — is built in code, not generated as an image.** Image generators produce unreliable text, and a directory tree with garbled folder names is worse than no visual at all. Code-built visuals are also crisper on screen share, responsive on mobile, copyable, and screen-reader accessible.

| Class | What it is | Specification needed |
|---|---|---|
| **A — Built in code** | Trees, tables, layer stacks, flow strips, comparisons, checklists | Component spec (HTML/CSS structure + content) |
| **B — Designed or generated** | Conceptual diagrams with minimal text, section illustrations, background textures | Copy-paste generation prompt |
| **C — Real screenshots** | The presenter's actual folders, VS Code, GitHub | Capture instruction + annotation spec |

Most visuals on this site are Class A. That is correct and intentional.

### Requirements

- Every visual slot in the copy names its class.
- Class A slots carry a content spec — the exact text that appears, so nothing is invented.
- Class B slots carry a **complete, copy-paste-ready generation prompt** the presenter can paste into an image tool or Claude Design without editing.
- Class C slots carry a capture instruction (what to open, what to include, what to crop) and, where needed, the annotation labels to overlay.
- Class B prompts must specify the site palette in plain terms (warm cream background, deep maroon, terracotta, soft sage) and must request **no text in the image** unless a single word is unavoidable.
- Every Class B and C asset needs alt text written alongside it.

### Deliverable

A separate visual-asset document accompanies the copy, listing every visual across all nine sections with its class and its specification or prompt.

---

## 15. CONSTRAINTS & RISKS

**Timeline.** Six days to the event. **The guide (`/`) is the launch-critical deliverable** — it is what the presenter presents from. `/toolkit` can ship partial and fill in after, provided the templates and reset checklist are live by event day. Build in that order.

**Scope risk.** The source brainstorm contains far more content than 90 minutes supports. The nine-section spine is the agreed cut. Additional topics belong in `/toolkit`, not in the guide.

**Aesthetic risk.** Warm palette plus code content can read as a lifestyle blog with file trees pasted in. The mitigation is strict division of labor: warmth in surfaces and typography, discipline in the technical panels — tight monospace, minimal radius, no decoration inside panels.

**Presentation risk.** Anything requiring the presenter to read paragraphs aloud is a design failure. Every section must be presentable from its visual alone.

---

## 16. OPEN ITEMS FOR THE PRESENTER

- Confirm running example (class schedule tracker vs jeepney fare calculator)
- Confirm expander default (collapsed)
- Supply the four screenshots
- Supply exact hex values from the poster source file
- Confirm hosting target
- Confirm whether the site lives on a DevTok domain or a personal one
