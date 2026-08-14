# INTERACTIVE COMPONENTS
### Every visual across all sections, specified as a built component

Visuals on this site are **interactive components**, not static images. They are built in code so they can be clicked, stepped through, and revealed at the presenter's pace.

**Design tokens come from the attached design system.** `[ATTACHED: design system]` No colors are specified here.

---

## THE PRESENTER RULE

**Every interactive component must have a manual step-through mode.**

These components are presentation instruments before they are learning toys. During the live session the presenter is talking over them, so:

- **Components start in a neutral state.** Nothing pre-revealed, nothing pre-highlighted.
- **Every reveal is triggered by a click.** The presenter controls when information appears.
- **Nothing autoplays.** No timed sequences, no animation that runs on scroll into view.
- **Transitions are fast** — 150–250ms. Discord screen share drops frames, and slow animation looks broken.
- **A reset control** returns the component to its starting state, so it can be re-run in the next session.
- **`prefers-reduced-motion` is respected**: reveals become instant, no movement.
- **Everything is keyboard operable.** Arrow keys and Enter, so the presenter never hunts with the mouse.

A student visiting later uses the same clicks at their own pace. One build, both modes.

---

## THREE COMPONENT TYPES

| Type | What it is | Count |
|---|---|---|
| **Interactive** | Built in code, clickable, stepped | Most |
| **Screenshot** | The presenter's real screens, with annotation overlays | 6 |
| **Decorative** | Generated or designed illustration, minimal or no text | 3–4 |

**Rule:** anything containing exact text — folder names, filenames, commands — is Interactive, never a generated image. Generators produce unreliable text.

---
---

# SECTION 01 — YOUR FOUR MAIN FOLDERS

### C1 · Four-Folder Explorer
**Type:** Interactive · **Priority:** High

Four folder shapes in a row: Studies, Development, Upskilling, Career.

**Interaction**
- Neutral state: four folders, labels only, nothing selected
- Click a folder → it highlights, and a panel beside or below it shows the one-line description and the "what goes here" list
- Only one open at a time; clicking another switches
- Click again to deselect

**Presenter use:** click through the four in order while talking, one per point.

---

### C2 · Development Tree
**Type:** Interactive · **Priority:** High

Directory tree in a dark panel.

**Interaction**
- Neutral state: tree visible, no descriptions
- Hover highlights a row; click reveals a short description in a side panel
- `school/` expands to show term subfolders
- Copy button returns the tree as plain text

---

### C3 · Upskilling Structure Toggle
**Type:** Interactive · **Priority:** Medium

Two organizing options for the same content.

**Interaction**
- A two-option switch: **By topic** / **By platform**
- Switching redraws the tree in place
- A short line below states the tradeoff for the selected option
- Opens on "By topic"

**Presenter use:** flip between them while explaining why topic usually wins.

---

### C4 · Where Does This Go?
**Type:** Interactive · **Priority:** High

Six example items, each placed into one of four folders.

**Interaction**
- Neutral state: six item cards, unanswered
- Click an item → the correct folder highlights and a one-line explanation appears
- The explanation gives the reasoning, not just the answer
- Reset control clears all six

**Items:** Algorithms assignment · a React course on YouTube · your resume · a hackathon project · minutes from an org meeting · a script that renames files

**Presenter use:** ask the room to guess in chat, then click to reveal.

---

# SECTION 02 — SCHOOL FILES

### C5 · Studies Tree
**Type:** Interactive · **Priority:** High

Expandable directory tree in a dark panel.

**Interaction**
- Starts collapsed at the program level
- Click to expand each level: Program → Courses → term → subjects
- Clicking a folder reveals a short description
- Copy button for the whole tree

**Presenter use:** expand one level at a time to mirror the explanation.

---

### C6 · Naming Comparison
**Type:** Interactive · **Priority:** Medium

Before-and-after filenames.

**Interaction**
- Three rows, "instead of" shown first
- Click a row to reveal the improved version and the one-line reason
- Or a single toggle revealing all three at once

---

# SECTION 03 — YOUR CODING PROJECTS

### C7 · Five-Layer Stack Builder ⭐
**Type:** Interactive · **Priority:** Highest — the most important component on the site

The five layers of a coding project, built up one at a time.

**Interaction**
- Neutral state: **layer 1 only** — a plain folder
- A `Next` control adds the next layer to the diagram, with its label and the question it answers
- Each added layer stays visible, so the stack accumulates
- `Back` steps down; `Reset` returns to layer 1
- Layers: Folder (where is it) → Project (can someone run it) → Editor (how do I open all of it) → Git (what changed) → GitHub (where does it live online)
- On the final step, all five are visible with their questions

**Presenter use:** this is the spine of the section's 20 minutes. One click per concept, at speaking pace.

**Note:** give this component the most design attention of anything on the site.

---

### C8 · Open File vs Open Folder
**Type:** Screenshot + Interactive · **Priority:** High

Two real VS Code screenshots compared.

**Interaction**
- Side by side on desktop, stacked with labels on mobile
- Click a hotspot on the folder version to highlight and label: Explorer, Editor, Terminal, Source Control
- Labels are text overlays, not burned into the image
- On mobile, a toggle switches between the two rather than showing both

---

### C9 · Project Tree Explorer
**Type:** Interactive · **Priority:** High

A project directory tree with clickable items.

**Interaction**
- Neutral state: tree only
- Click `src/`, `README.md`, `.gitignore`, `.env.example`, or the dependency file → panel shows what it is, when it's needed, and whether it's required or optional
- Each item badged `CONVENTION` or `OPTIONAL`

---

### C10 · Structure Ladder
**Type:** Interactive · **Priority:** Medium

Four project types with increasing structure.

**Interaction**
- Four selectable labels: exercise, assignment, portfolio project, team project
- Selecting one redraws the tree to show what that type actually needs
- A line below states what it does *not* need
- Opens on "exercise" so the smallest case is seen first

---

### C11 · Commit Message Comparison
**Type:** Interactive · **Priority:** Low

**Interaction**
- Weak messages listed first
- Single control reveals the improved version beside each

---

# SECTION 04 — CALENDAR AND TASKS

### C12 · Class Event Anatomy
**Type:** Interactive · **Priority:** High

A single calendar event, opened, with its fields labeled.

**Interaction**
- Neutral state: a plain event with just a title and time
- Click `Add details` repeatedly, or click each field marker, to reveal: location, video link, description with professor and LMS link, notification
- Each reveal shows a one-line note on why that field matters
- The video-link field gets extra emphasis

**Presenter use:** build the event live as you explain what belongs in it.

---

### C13 · Calendar Week View
**Type:** Screenshot or Interactive · **Priority:** Medium

A week showing color-separated calendars.

**Interaction**
- Toggle each calendar on and off: Classes, Deadlines, Org, Personal
- Turning one off visibly reduces the clutter, which is the point

**Note:** use a real screenshot of the presenter's calendar if one can be shared, or a built mockup if not.

---

### C14 · Task List Setup
**Type:** Interactive · **Priority:** Low

Six task lists with their colors.

**Interaction**
- Click a list to reveal examples of what goes in it
- Includes the breakdown example: one assignment becoming three dated steps

---

# SECTION 05 — PROTECTING YOUR WORK

### C15 · Where Your Work Lives
**Type:** Interactive · **Priority:** High

Three destinations: laptop, cloud storage, GitHub.

**Interaction**
- Neutral state: three labeled boxes with the four main folders shown as items
- Click a destination → it highlights, and the folders it should hold move to or highlight within it
- `Development/` explicitly does **not** highlight for cloud storage, with a visible note: *code goes to GitHub, not cloud sync*
- Reset returns to neutral

**Presenter use:** the "don't sync Development" point is the one people get wrong. The visual should make it obvious.

---

### C16 · Key in Code
**Type:** Interactive · **Priority:** Medium

**Interaction**
- Step 1: a code file with an API key visible in it
- Step 2: click → shows the same key exposed in a public repository
- Step 3: click → shows the key removed from the current file but still present in the history
- Step 4: click → shows the corrected setup with `.env`, `.gitignore`, and `.env.example`

**Presenter use:** four clicks, one point each. Step 3 is the one nobody knows.

---

# SECTION 06 — NOTION

### C17 · Notion Dashboard
**Type:** Screenshot · **Priority:** Medium

The presenter's real school Notion.

- Annotated with overlay labels: subject pages, deadline list, quick links
- Paired with a prominent template link
- Static — this section is a demo, not an interactive component

---

# SECTION 07 — CODING WORKSPACE

### C18 · Toolkit Table
**Type:** Interactive · **Priority:** Medium

Tools organized by job.

**Interaction**
- Filter control: `Now` / `Soon` / `Later`
- Opens filtered to `Now`, so beginners see only the four essentials first
- Each row expands to a one-line note on what problem the tool solves

---

### C19 · Annotated VS Code
**Type:** Screenshot · **Priority:** High

A real project open in VS Code.

- Overlay labels revealed on click: Explorer, Editor, Terminal, Source Control, Extensions
- Neutral state has no labels visible

---

# SECTION 08 — THE RESET

### C20 · Reset Checklist
**Type:** Interactive · **Priority:** High

**Interaction**
- Five grouped sections of checkable items
- Progress persists in browser storage between visits
- A visible reset control clears all
- Works with storage disabled — degrades to a plain checklist
- A copy control returns the checklist as plain text

---

# SECTION 09 — BONUS

### C21 · Capstone Split
**Type:** Interactive · **Priority:** Low

Two boxes joined by a pointer file.

**Interaction**
- Click either box to reveal what belongs in it
- The pointer file is clickable and shows an example of its contents

---
---

# DECORATIVE ASSETS

Only where they add nothing to compete with. **Not in sections 02 or 03** — those are dense with structural content, and decoration would compete with the components doing the teaching.

Prompts below use the attached design system's palette. All specify no text, because text is the failure mode of image generation.

### D1 · Header background texture

```
A soft minimal abstract background texture with faint organic paper
grain, extremely low contrast, calm and uncluttered, with generous empty
space in the centre for text to sit over. Flat, no gradients, no glow,
no 3D. Editorial and understated, like the paper stock of a well-made
printed guide. Use the palette from the attached design system.
Absolutely no text, no letters, no numbers, no icons, no illustrated
objects.
```

### D2 · Section 05 opener

```
A simple flat illustration of three overlapping document shapes with one
minimal padlock icon resting in front of them. Flat colour from the
attached design system palette. Clean geometric shapes, soft rounded
corners, no gradients, no glow, no shadows. Calm and editorial rather
than technical or alarming. No text, no letters, no numbers.
```

### D3 · Section 08 opener

```
A simple flat illustration of a calm tidy desk seen from above: a closed
laptop, a notebook, a mug, and a small plant, arranged with generous
space between them. Flat colour from the attached design system palette.
No gradients, no shadows, no texture. Clean geometric shapes, editorial,
restful. No text, no letters, no numbers, no screen content.
```

---

# SCREENSHOTS TO CAPTURE

| # | Section | What to capture |
|---|---|---|
| S1 | Start here | Your four top-level folders |
| S2 | 01 | Your real `Y3T3` folder — do not clean it up |
| S3 | 03 | VS Code with a single file open |
| S4 | 03 | The same project opened as a folder |
| S5 | 04 | Your calendar, one week view |
| S6 | 06 | Your school Notion dashboard |

**Settings for all:** high contrast, editor font 18–20pt, window sized so text is legible at 800px wide. S3 and S4 must be captured in the same session at the same zoom, or the comparison won't read.
