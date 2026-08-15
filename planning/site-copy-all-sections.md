# SITE COPY — ALL SECTIONS
### Get Organized as a Student Developer

**Format:** plain title → what this section covers → why it matters → labeled units with bullets → key takeaways → closer.
**Register:** plain and instructional. No rhetorical openers, no metaphor headlines, no jokes that carry no information. Two sentences per block, then bullets.

**Section order**

| # | Section | Live time |
|---|---|---|
| 00 | Start here | 3 min |
| 01 | Your four main folders | 10 min |
| 02 | Organizing your school files | 8 min |
| 03 | Your coding projects | 20 min |
| 04 | Your calendar and tasks | 12 min |
| 05 | Protecting your work | 8 min |
| 06 | Notion for notes and school | 8 min |
| 07 | Setting up your coding workspace | 8 min |
| 08 | The 20-minute reset | 5 min |
| 09 | Bonus — group projects | site only |

---
---

# DOCUMENT HEADER

**FIELD GUIDE**

# Get Organized as a Student Developer
### Build a Better System for Classes, Projects, and Your Coding Workspace

`Prepped by: Jazzy · DevTok Pinas`

This guide walks you through a practical way to organize your school files, coding projects, self-learning, deadlines, and development workspace. It's built for CS, IT, engineering, and other students who write code as part of school or on their own. Use the system as a starting point, keep what works for you, and adjust it as your needs change.

`[TLDR]`
**TL;DR:** Having a simple system saves time, energy, and brainpower. Start with four main folders: **Studies, Development, Upskilling, and Career**, then use clear rules for your files, deadlines, code, and weekly reset. Build the basic version first and improve it as you go.
`[/TLDR]`

---
---

# START HERE

## What this guide covers

| Section | What it covers |
|---|---|
| 01 | Your four main folders and what goes in each |
| 02 | School files, naming, and organizing by term |
| 03 | Coding projects — what they are and how much structure they need |
| 04 | Setting up your calendar and tasks |
| 05 | Passwords, backups, and keeping work safe |
| 06 | Using Notion for notes and school organization |
| 07 | Setting up your coding workspace and tools |
| 08 | The 20-minute reset |
| 09 | Bonus — group projects and shared repositories |

---

## Why I think this matters

As technical students, we already have a lot competing for our attention. A clear system reduces the number of small decisions you have to make every day and gives your school work, projects, and responsibilities a predictable place to go.

Without one, small problems start adding up:

- You waste time looking for files you know you saved somewhere.
- Good projects get buried inside old semester folders.
- Assignment deadlines live only inside your LMS.
- You redo work because you can't find what you already made.
- Coding projects become harder to manage as you start using Git, GitHub, dependencies, and API keys.
- Projects worth showing for internships or jobs can be difficult to find later.

A simple system makes all of this easier to manage.

---

## What you'll have at the end

By the end of this guide, you'll have:

- Four main folders with a clear purpose for each one
- A school structure you can reuse every term
- A better understanding of how coding projects are organized
- A calendar that reminds you before things are due
- A basic password and backup setup
- A place for notes and school organization
- A cleaner coding workspace
- A reset routine for when things drift

`[Visual — Class C]` Recommended folder setup — Studies, Development, Upskilling, Career.

`[SectionCloser: UNDERSTAND]`
You don't need a system that stays perfectly organized all semester. You just need one that makes it easy to know **where something belongs** and easy to clean things up when you fall behind.
`[/SectionCloser]`

---
---

# SECTION 01
## Your Four Main Folders

**What this section covers:** Four top-level folders you can use to separate school files, code, self-learning, and career material.

**Why it matters:** If you decide where something should go every single time you save a file, things eventually end up scattered across Downloads, Desktop, course folders, and random project directories. A few clear categories remove most of that decision-making.

`[Visual — Class B2]` Four folders diagram.

---

### STUDIES

Your formal school work — everything tied to your degree that isn't code.

**What goes here**
- Subjects, assignments, lecture files, exams
- Curriculum and grade slips
- Graduation requirements and student aid documents
- Thesis or capstone documents
- OJT and internship paperwork
- School organizations

**Note:** The main distinction is that **Studies holds your school documents and requirements**. If an assignment includes code, the instructions, rubric, report, or submission receipt can stay here while the working code goes in Development.

`[Visual — interactive folder tree, inside the Studies panel]` Branded folder icons; collapsed by default with a small "Collapse | Expand" toolbar above the top folder; click a folder to expand its children. Shows only after the Studies card is clicked. Replaces the earlier "real term" file-manager window mock.
Structure: Studies/ → BS Computer Science/ → { Courses/ → { Y1T1/ → { CC 100 - Introduction to Computing, CC 101 - Computer Programming, GEd 101 - Understanding the Self, GEd 102 - Mathematics in the Modern World, GEd 105 - Readings in Philippine History, MATH 101 - Differential Calculus, NSTP 111 - National Service Training Program 1, PATHFit 1 - Movement Competency Training }, Y1T2/, Y2T1/, Y2T2/ }, Curriculum/, Grade Slips/, Graduation Requirements/, Organizations/ }
Y1T1 is populated with a real BSIT first-term schedule (supplied by a student) as a worked example.

The Development, Upskilling (by topic / by platform), and Career folder structures below render as the same interactive tree (collapsed by default, click to expand), each inside its own folder panel. The four folder cards sit on one row.

---

### DEVELOPMENT

**Anything that involves code.** All of it, regardless of where it came from.

**What goes here**
- Programming assignments and lab exercises
- School software projects and your capstone
- Practice code from tutorials and online courses
- Personal projects and experiments
- Hackathon projects
- Code you write for an organization

**Note:** A simple rule you can use: **If you're actively writing code in it, keep the working project under Development.** Keeping your code in one main location also gives you one place to look when opening projects in your editor or terminal.

`[Badge] HOW I DO IT` — interactive folder tree (collapsed by default):

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

Folder names below render bold, in Ember:
- **`school/`** — programming assignments and school projects, grouped by term
- **`learning/`** — code written while following tutorials, courses, or documentation
- **`personal/`** — projects you build outside school
- **`hackathons/`** — hackathon work
- **`experiments/`** — small tests and ideas that aren't full projects yet
- **`archive/`** — projects you're no longer actively working on

**Note:** You don't need all of these folders immediately. Start with the categories you actually use.

---

### UPSKILLING

Learning you do outside your formal curriculum. This folder holds the material you learn from, while Development holds the code you write while learning.

For example, if you take a React course:
- Course notes → Upskilling
- Downloaded slides → Upskilling
- Resources → Upskilling
- Certificate → Upskilling
- React project you build during the course → Development

**By topic** `[Badge] RECOMMENDED` — interactive tree (topic, then source nested inside):

```
Upskilling/
├── web-development/
│   ├── freecodecamp/
│   ├── coursera/
│   └── youtube/
├── cloud/
│   ├── aws/
│   └── coursera/
├── ai-and-data/
│   ├── deeplearning-ai/
│   └── youtube/
├── design/
└── certificates/
```
This works well if you usually remember **what you were learning first**, then where you learned it.

**By platform** — interactive tree (platform, then topic nested inside):

```
Upskilling/
├── coursera/
│   ├── web-development/
│   └── ai-and-data/
├── udemy/
├── youtube/
├── freecodecamp/
└── certificates/
```
This works if you usually remember **the platform you learned on first** — the topics then sit inside each one.

**Note:** Pick a structure that feels natural to you and stay reasonably consistent. There isn't one correct setup. The goal is to make your learning materials easy to find later.

---

### CAREER

Documents and material you'll need for internships, jobs, and other professional opportunities.

`[Visual — interactive folder tree with PDF/MD file icons]`

```
Career/
├── resume/
├── certificates/
├── portfolio/
├── applications/
│   ├── accenture/
│   │   ├── job-posting.pdf
│   │   ├── resume.pdf
│   │   ├── cover-letter.pdf
│   │   └── notes.md
│   ├── ibm/
│   │   ├── job-posting.pdf
│   │   ├── resume.pdf
│   │   └── notes.md
│   └── canva/
│       ├── job-posting.pdf
│       ├── resume.pdf
│       ├── cover-letter.pdf
│       └── notes.md
└── interview-prep/
```

- **`resume/`** — your master resume and reusable resume versions
- **`certificates/`** — certificates, credentials, and achievements worth keeping for applications
- **`portfolio/`** — project screenshots, descriptions, links, case studies, and other work you may want to show employers
- **`applications/`** — one folder per company, with the files and notes related to that application
- **`interview-prep/`** — interview questions, technical review notes, company research, and other preparation materials

A lot of students only create a Career folder when application season starts. It's easier to build it gradually while you're still in school.

#### Organizing your applications

For each internship or job application, create a folder for the company or role. Inside it, keep the exact materials connected to that application:

- **`job-posting.pdf`** — save a copy of the original posting in case it gets removed later
- **`resume.pdf`** — the exact resume version you submitted
- **`cover-letter.pdf`** — the cover letter you sent, if one was required
- **`notes.md`** — recruiter details, interview dates, application status, questions, or anything else you want to remember

This becomes especially useful once you start applying to several companies. You can quickly see what you submitted, what the role originally asked for, and any notes you made along the way.

`[SideNote — one paragraph]` **Prefer tracking applications visually?** You can also create an application tracker in Notion with fields like company, role, status, date applied, interview dates, and follow-up dates. You can attach or link the same job posting, resume, cover letter, and notes there while still keeping the actual files organized in your Career folder. `[/SideNote]`

Layout notes: the folder-panel headings (Studies / Development / Upskilling / Career) render a step larger than a plain label; "Organizing your applications" is a smaller Lilac Signal sub-heading, preceded by a hairline separator.

At the bottom of the four-folders section (a plain line, not a note): This system is specifically for your student-developer life. Personal files like finances, family documents, photos, and hobbies do not have to fit inside these four folders.

---

### Where organization work goes

*(Its own section on the site, immediately after the four folders.)*

`[Badge] RECOMMENDED`

**School organizations** — student council, a CS society, a campus club:
- These are part of your school life, so keeping their documents under Studies gives them a clear home.

**Outside-school organizations** — community groups, volunteer work, professional organizations:
- If the material is professional or something you may eventually use on your resume, Career can make sense.
- If it's completely personal, it doesn't need to live inside this system.

**Organization work involving code** — for example, an organization website or event registration tool:
- Keep the working code under Development.
- Keep the organization documents wherever they otherwise belong.

---

## How to decide where something goes

Ask yourself two questions.

> **1. Am I actively writing code in this?**
> Yes → Development
>
> **2. If not, what is this mainly for?**
> - School requirement → Studies
> - Learning outside school → Upskilling
> - Internship, job, or professional use → Career

| Situation | Where it goes |
|---|---|
| A 30-line lab exercise | Development → `school/` |
| A semester-long software project | Development → `school/` |
| Code you write following a React course | Development → `learning/` |
| That course's slides and notes | Upskilling |
| Your assignment brief and submission receipt | Studies |
| A certificate from that course | Upskilling and Career |
| Your thesis document | Studies |
| Your thesis code | Development |
| Minutes from an org meeting | Studies → `Organizations/` |
| The org website you're building | Development |

---

### When something has both code and documents

Common with assignments, capstones, and thesis work.

- Code → Development
- Requirements, instructions, reports, forms, and submissions → Studies
- Add a short text file in the Studies folder noting where the code is

`[PresenterNote]`
Keeping every line of code in one place is what made this work for me. Before that, I had code in course folders and code on different drives, and I had a hard time finding it when I tried to remember which one held what. One location means one place to look.
`[/PresenterNote]`

`[Interactive: WhereDoesThisGo]` Six tap-to-reveal examples.

---

## Key takeaways

- Four useful top-level folders are Studies, Development, Upskilling, and Career.
- Studies holds formal school documents and requirements.
- Working code goes under Development.
- Upskilling holds learning material outside your curriculum.
- Career holds things you'll need for internships and jobs.
- Personal files don't need to fit inside this system.

`[SectionCloser: DO]`
Create the four main folders first. Build the folders inside them only as you actually need them.
`[/SectionCloser]`

---
---

# SECTION 02
## Organizing Your School Files

**What this section covers:** A reusable folder structure for coursework, a simple naming convention, and what to do if you already have years of scattered files.

**Why it matters:** School produces a lot of files every term. Setting up a predictable structure once is easier than deciding where every lecture, assignment, and reviewer belongs later.

*(Section rebuilt on the site from section-02-organizing-your-school-files.md. Two lines were deliberately dropped per owner instruction: "You don't necessarily need a separate archive process for school files." and the "Finished terms can stay where they are — no separate archive step needed." takeaway.)*

---

### The structure

A simple structure is **Program → Term → Subject**.

`[Visual — interactive folder tree]` (branded, collapsible; subjects hold `lectures/`, `assignments/`, `exams/`)

```
Studies/
└── BS Computer Science/
    ├── Courses/
    │   ├── Y1T1/
    │   ├── Y1T2/
    │   └── Y2T1/
    │       ├── Algorithms and Complexity/
    │       │   ├── lectures/
    │       │   ├── assignments/
    │       │   └── exams/
    │       ├── Life and Works of Rizal/
    │       │   ├── lectures/
    │       │   ├── assignments/
    │       │   └── exams/
    │       └── Software Engineering/
    │           ├── lectures/
    │           ├── assignments/
    │           └── exams/
    ├── Curriculum/
    ├── Grade Slips/
    ├── Graduation Requirements/
    └── Organizations/
```

This works well because school naturally runs by term.

Inside each subject, keep the structure as simple as you can:
- Create subfolders like `lectures/`, `assignments/`, and `exams/` **only when they help you find things faster**.
- If a subject only has a few files, it's completely fine to keep them directly inside the subject folder.
- You don't need every subject to have the exact same subfolders.
- The structure should make your files easier to find — **not give you more folders to maintain**.

`[Expander: Term-first vs subject-first]`
**Term-first** keeps all of your subjects from one semester together. This is usually the easiest approach because your school year already works this way.

**Subject-first** can make sense if you want to keep the same subject together across different terms, especially if you retake courses.

Use whichever structure matches how you naturally look for files.
`[/Expander]`

---

### Naming files

Name files based on what will still make sense when you look for them several months later.

`[Visual — tap-to-reveal table]`

| Instead of | Try |
|---|---|
| `Assignment final v2.docx` | `2026-08-15-algorithms-assignment.docx` |
| `Aug 15 notes` | `2026-08-15-lecture-notes.md` |
| `stuff2` | `midterm-reviewer` |

A few useful habits:
- **Use dates as `YYYY-MM-DD`** when the date matters.
- **Use descriptive names.** The filename should tell you what the file is.
- **For coding projects and terminal work, avoid messy filenames.** Dashes or other consistent naming conventions are easier to work with.

For example: `2026-08-15-algorithms-assignment.pdf`

`[SectionCloser: GOAL]` Future You should be able to understand the filename without opening it.

---

### What happens at the end of a term

- **Leave the finished term where it is.** It's already organized by semester, so there's no need to move everything again.
- **Create the next term folder when a new semester starts** and begin using that one.
- **Older coursework naturally moves out of the way** as you start working inside the new term.
- **Keep previous terms accessible.** You may still want old notes, reviewers, assignments, or reference material later.
- **Coding projects are different.** They don't always end on a semester schedule, so `Development/` can still have its own `archive/` for projects you're no longer actively working on.

The goal is to avoid creating an extra cleanup step at the end of every semester.

---

### If you already have years of scattered files

Don't feel like you need to reorganize everything you've ever saved before you can start.

A faster approach:
1. Create a folder such as `_UNSORTED_2026-08`
2. Move loose files into it
3. Build the clean structure beside it
4. Start using the new structure from now on
5. When you need an old file, move it into the correct place then

This gives you a clean starting point without turning organization into a weekend-long project.

---

## Key takeaways

- Program → Term → Subject is a simple structure you can reuse.
- Create subfolders only when they actually help.
- Use descriptive filenames and `YYYY-MM-DD` when dates matter.
- If your old files are already messy, separate the backlog and start clean.

`[SectionCloser: DO]`
Set up the folders for your current term first. You don't need to reorganize your entire degree today.
`[/SectionCloser]`

---
---

# SECTION 03
## Your Coding Projects

**What this section covers:** The difference between a folder, a project, an editor workspace, Git, and GitHub — plus how much structure different kinds of projects actually need.

**Why it matters:** These terms are often used together in classes, tutorials, and developer conversations. Understanding what each one does makes it easier to know where your code lives, what you should open, how changes are tracked, and how a project eventually gets shared.

`[Interactive: FiveLayerStack]` Five-layer stack. Click any layer to jump to it, or step through with Back / Next layer / Reset. Each layer answers one question and earns one word.

### Layer 1 — The folder

**It answers:** Where do the files live?

A folder is simply a location on your computer.

- It holds the files that belong together.
- In this system, coding folders live somewhere under `Development/`.
- Everything below — the project, editor workspace, Git, and GitHub — builds on top of that folder.
- Keeping coding work in one predictable location means you don't have to search Desktop, Downloads, and random directories every time.

```text
Development/
└── school/
    └── Y2T1/
        └── algorithms-mp1/
```

**Note:** Avoid keeping active coding projects inside general synced folders such as Google Drive, OneDrive, or Dropbox. Sync services can conflict with project files and Git. On Windows, also check whether your Documents folder is automatically syncing to OneDrive.

### Layer 2 — The project

**It answers:** What files belong to this piece of work?

A project is a folder containing everything needed to work on and run that piece of software.

- A tiny project might contain only one file.
- A larger project may include source code, tests, documentation, dependencies, and configuration.
- The amount of structure should match what the project is for.
- Keeping everything for one project together makes it easier to open, run, move, share, back up, and eventually put on GitHub.

```text
schedule-tracker/
├── src/
├── tests/
├── README.md
├── .gitignore
├── .env.example
└── requirements.txt
```

> A project is a folder that knows how to run itself.

### Layer 3 — Opening it in your editor

**It answers:** What should I actually open in VS Code or another editor?

When someone says **"open the project,"** they usually mean opening the **project folder**, not just one code file.

`[Video: OpenFolderRecording]` A short screen recording of opening a folder in the editor — a looping preview (desktop only) that opens a modal with playback controls on click.

`[Interactive: OpenFileVsFolder]` A toggle between "Open one file" (a small built editor mock) and "Open the project folder" (a real screenshot of the project open in the warm-themed editor — `assets/warm-ide.png` — shown small, click to enlarge in a modal).

**Open one file** — one document. Your editor has limited context about the rest of the project.

**Open the project folder** — the full file tree in the Explorer, project-wide search, a terminal at the project location, and Source Control that can see the repository.

**Note:** If your screen looks completely different from the tutorial you're following, check whether you opened one file instead of the whole folder. Usually it's **File → Open Folder**.

### Layer 4 — Git

**It answers:** How do I track changes without making `final-final-v2` copies?

Git records the history of your project as you work.

- A meaningful checkpoint is called a **commit**.
- Each commit records what changed at that point.
- You can review earlier versions without duplicating the entire project folder.
- Git works locally on your computer.
- It gives you a history you can understand and return to without creating duplicate project folders.

Instead of a pile of copies:

```text
project-final/
project-final-2/
project-final-real/
project-final-real-v2/
```

you keep one project and create commits.

| Instead of | Try |
|---|---|
| `fix` | `Initialize project structure` |
| `fix2` | `Add login form` |
| `asdf` | `Implement email validation` |
| `final` | `Update installation instructions` |

Commit messages don't need to sound impressive. They just need to tell you what changed.

In your history, they read like this:

`[Visual: CommitHistory]` A commit-history mock in the style of a repository's commits page, using the clear messages above (authored by the owner).

### Layer 5 — GitHub

**It answers:** Where can the Git repository live online?

`[Visual: GitHub mark]` The GitHub logo, drawn inline as vector and tinted with a design-system colour.

GitHub gives your Git repository a remote home.

- **Git** tracks your project history.
- **GitHub** stores and shares that repository online.
- **Pushing** sends your local commits to GitHub.
- **Cloning** downloads an existing repository to your computer.

GitHub is useful for:

- Keeping a remote copy of your code
- Sharing projects and collaborating with teammates
- Working across devices
- Showing projects to other people when you choose to

**Note:** GitHub is for code and the files that belong with that code. Lecture PDFs, school forms, and unrelated documents still belong in your regular folders.

---

## How much structure does a project need?

Not every coding project needs the same folder structure. **Match the structure to what the project is for — small things stay small.**

`[Interactive: StructureTrees]` Four tabs — Short exercise, Course assignment, Portfolio project, Team project — each an expanded folder tree with designed file glyphs.

**Short exercise**

```text
rename-practice.py
```

One file is enough when you're practicing one small concept. It doesn't need folders, a README, or Git.

**Course assignment**

```text
algorithms-mp1/
├── main.py
└── README.md
```

A folder keeps the assignment together. Add a README when there are instructions, setup notes, or context worth keeping.

**Portfolio project**

```text
schedule-tracker/
├── src/
├── tests/
├── README.md
├── .gitignore
├── .env.example
└── requirements.txt
```

A project you expect other people to see should be easier for someone else to understand, install, and run.

**Team project**

```text
capstone-app/
├── src/
├── tests/
├── docs/
├── README.md
├── .gitignore
├── .env.example
└── package.json
```

Team projects usually need clearer setup instructions, shared documentation, dependencies, and a repository everyone can access.

---

## Inside a project

These are common files and folders you'll start seeing as projects get bigger. Not every project needs all of them.

`[Interactive: InsideProject]` Click a file or folder to see what it is for.

- **`src/`** — where the main source code usually lives, instead of keeping every code file loose in the project root.
- **`tests/`** — automated tests or test files used to check that the code behaves as expected.
- **`docs/`** — longer documentation, diagrams, technical notes, or other project documentation.
- **`README.md`** — the first explanation of the project: what it does, how to set it up, and how to run it.
- **`.gitignore`** — tells Git which files or folders should *not* be tracked, such as generated files, dependencies, local settings, or secrets.
- **`.env`** — a local file that commonly stores environment variables such as API keys or database URLs. The real `.env` should not be committed.
- **`.env.example`** — shows which environment variables the project expects, without including the real private values.
- **`requirements.txt`** — a common Python dependency file, listing the packages the project needs so someone else can install the same ones.
- **`package.json`** — commonly used in JavaScript / Node.js projects for dependencies, project metadata, and scripts.

The exact files depend on the language, framework, and project. Treat these as common conventions, not a universal tree every project has to copy.

### Moving work up a level

Sometimes a school assignment, tutorial project, or experiment turns out well enough that you want to keep developing it. You can make it more portfolio-ready by:

- Moving or recreating it under `Development/personal/`
- Cleaning up the folder structure
- Adding a useful README and making setup instructions clear
- Adding a `.gitignore` and removing secrets or local-only files
- Putting the project on GitHub
- Adding screenshots, links, or a project description to your Career material

`[PresenterNote]`
I like to look at a project as if I were seeing it for the first time: could someone clone it into an empty folder, follow the README, install what they need, and run it? If yes, the project is probably in good shape. This matters especially when you start applying for internships or jobs — someone reviewing your GitHub should be able to understand what the project is and how it works without you beside them to explain every missing step.
`[/PresenterNote]`

---

## The whole road

A project can move through several stages, from the first idea to something you can show other people. Think of this as a **roadmap, not a requirement** — a short exercise may stop after a few stages, while a personal or capstone project may continue much further.

Today covers the first half. Dashed stages are for later — the toolkit has more.

`[Interactive: WholeRoad]` Ten clickable stages. IDEA → GITHUB are solid (covered today); DOCUMENT, DEPLOY, PORTFOLIO are drawn dashed and dimmed (not covered today, for later) — still clickable, and their revealed description carries a "Not covered today — for later" tag.

```text
IDEA → FOLDER → EDITOR → GIT → BUILD → COMMIT → GITHUB → [DOCUMENT] → [DEPLOY] → [PORTFOLIO]
```

- **IDEA** — decide what you want to build or practice
- **FOLDER** — give the project a home
- **EDITOR** — open the whole project and work on it
- **GIT** — start tracking its history
- **BUILD** — write, run, test, and improve the project
- **COMMIT** — save meaningful checkpoints
- **GITHUB** — push the repository online
- **DOCUMENT** — explain the project and how to use it
- **DEPLOY** — make the project available somewhere others can use or view it, when appropriate
- **PORTFOLIO** — present the finished work as something worth showing

Documentation, deployment, and portfolio presentation become more relevant as a project grows beyond a class exercise into something you want to share. Every stage is still clickable above if you're curious.

---

## Key takeaways

- **A folder is a location. A project is a folder containing everything needed to run.**
- "Open the project" usually means open the whole folder in your editor, not one file.
- Git tracks changes locally. GitHub gives the repository a remote home online.
- Common files like `README.md`, `.gitignore`, dependency files, and `.env.example` each solve a specific project need.
- **Match structure to what the project is for. Small things stay small.**

`[SectionCloser: UNDERSTAND]`
Open one of your existing coding folders as a **folder** in your editor, and see what appears that didn't before.
`[/SectionCloser]`

---
---

# SECTION 04

## Your Calendar and Tasks

**What this section covers:** Setting up a calendar for your class schedule, deadlines, meetings, and the work you need to finish.

**Why it matters:** A printed schedule, screenshot, or LMS page can tell you what exists, but it doesn't always remind you at the right time or keep all the useful details in one place.

---

### Why use a calendar app?

A calendar app can do more than show your class schedule. It can:

- **Remind you** before classes and deadlines
- **Hold details** like room numbers, meeting links, professor information, and LMS links
- **Update easily** when something changes
- **Repeat** recurring classes automatically
- **Stay available** across your phone, laptop, and browser
- **Notify you on your phone** — and let you add or edit events on the go, especially with the Google Calendar app
- **Make old events searchable**

`[Note]` This guide uses **Google Calendar** because it's widely available and includes Google Tasks, but you can use another calendar app if you prefer. `[/Note]`

---

### Step 1 — Create your school calendar

`[Badge] RECOMMENDED` If you haven't set up a calendar for school yet, create one main **School** calendar in Google Calendar.

1. On a computer, open **Google Calendar**.
2. On the left side, find **Other calendars**.
3. Click the **+** button.
4. Choose **Create new calendar**.
5. Name it something simple, such as **School**.
6. Click **Create calendar**.

`[Note]` Your School calendar can hold classes, exams, student events, and study sessions. Keep a separate **Personal** calendar for non-school events if you like. You don't need a separate calendar for every class — keep them broad, then use **event titles and color labels** to make your week easy to scan. `[/Note]`

---

### Step 2 — Create color labels

Use **color labels** as a visual shortcut. Your event title should still tell you what something is, while the color helps you recognize it quickly across the whole week.

- Give recurring classes a color based on their **course or course category**.
- Keep the **same color for the lecture and lab of the same course**.
- Use a stronger color for **quizzes, exams, and major project deadlines** so they stand out.
- Use separate colors for self-study, student organizations, and personal time.

`[Badge] SAMPLE PALETTE`

`[Interactive: ColorPalette]` Jazzy's calendar palette as clickable swatches — click one to see what it labels and why. (Cobalt Signal and Mint Signal are owner-added calendar hues, scoped to this section.)

```text
Major courses        → Wine           #7A2E48
Minor / electives    → Lilac Signal   #C9A0F5
Coding / self-study  → Cobalt Signal  #4F7CFF
Org / student events → Mint Signal    #45C69A
Self-care / personal → Deep Plum      #241533

Quiz                  → Amber Glow     #FFB84D
Exam                  → Neon Rose      #FF5C8A
Major project         → Ember          #FF7A45
```

`[Note]` You don't have to use these exact assignments. The useful part is having a pattern you can recognize quickly — and keeping LEC and LAB of one course in the same color. `[/Note]`

Useful label names might include: `Major Course — Wine`, `Minor / Elective — Lilac`, `Coding Practice — Blue`, `Org / Student Activity — Green`, `Self-Care — Plum`, `Quiz — Amber`, `Exam — Neon Rose`, `Major Project — Ember`.

---

### Step 3 — Add your class schedule

Add each class once as a **repeating event** for the semester, saved to your **School** calendar.

`[Interactive: EventBuilder]` Build the event field by field — click **Add details** to reveal Location, Video link, Instructor & LMS, Color label, and Notification, each with why it's worth including.

Useful information to include: title (activity type + subject code + name), time and repeat schedule, end date, location, video link, professor, LMS link, color label, and notification.

#### Use short prefixes in your event titles

`[Interactive: PrefixExplorer]` Tap a prefix to see an example title, its meaning, and its color.

```text
[LEC]  CS 3202 — Algorithms and Complexity
[LAB]  CS 3202 — Algorithms and Complexity
[QUIZ] CS 3202 — Quiz 2
[EXAM] CS 3202 — Midterm Exam
[HW]   CS 3202 — Assignment 3
[PROJ] CS 3202 — Schedule Tracker Milestone
```

- **`[LEC]`** — lecture · **`[LAB]`** — laboratory · **`[QUIZ]`** — quiz · **`[EXAM]`** — major exam · **`[HW]`** — homework · **`[PROJ]`** — project or deadline

`[Note]` Keep `[LEC]` and `[LAB]` for one course in the same color, and give `[QUIZ]`, `[EXAM]`, and major `[PROJ]` their own so they stand out. The prefix still works even when you color-code. `[/Note]`

---

### Step 4 — Set up Tasks

**Events** are things happening at a particular time (`[LEC]` / `[LAB]` class, `[QUIZ]` / `[EXAM]`, org meeting, defense). **Tasks** are things you need to finish (`[HW]` Complete Assignment 3, `[PROJ]` Build login flow, review Chapter 4, practice coding).

Suggested task lists: Assignments · Study and practice · Exams and quizzes · Group projects · Org work · Personal.

`[Note]` Tasks appear with a **check mark**, so you can mark them done right from your calendar. You don't need every list — use the categories that actually help. `[/Note]`

---

### A sample week

`[Visual: SampleWeek]` A Google-Calendar-style week view (its own section, not buried under notifications) using Jazzy's palette: color-coded classes with `[LEC]` / `[LAB]` / `[QUIZ]` / `[EXAM]` titles, plus tasks shown with circle checkboxes — done tasks are checked and struck through, and each task can be toggled. A colour legend sits below. Sample courses: CS 3202 (Wine), a GE elective (Lilac), coding practice (Cobalt), CS Society (Mint), self-care (Deep Plum), a MATH 101 quiz (Amber) and midterm (Rose), a Schedule Tracker milestone (Ember).

---

### Step 5 — Add work when you hear about it

Add a responsibility when you **first hear about it**, not when it's almost due. Break bigger assignments into smaller steps so the due date isn't your only reminder to start.

Instead of one task — `[PROJ] Finish software project — August 30` — create several: `[PROJ] Plan project structure`, `[PROJ] Build main feature`, `[PROJ] Test`, `[PROJ] Review and clean up`, `[PROJ] Submit`.

`[Note]` Breaking the work into smaller tasks gives you several points to move a project forward. **The due date shouldn't be the first time your system reminds you an assignment exists.** `[/Note]`

---

### Step 6 — Notifications

Set reminders before classes, deadlines, and exams based on how much preparation you need:

- **Classes** — enough time to get ready and travel there
- **Homework** — one day before, and again closer to submission
- **Quizzes** — enough time to review beforehand
- **Exams** — several days before, plus a reminder closer in
- **Projects** — reminders for milestones, not only the final deadline
- **Org meetings** — enough time to prepare or travel there

`[Note]` The exact timing is personal. If you create so many notifications that you dismiss them automatically, reduce them. `[/Note]`

`[PresenterNote]`
One thing that saves me a surprising amount of time is putting the meeting link directly inside the calendar event. I don't want to search my email, Messenger, Discord, or LMS five minutes before something starts.
`[/PresenterNote]`

---

## Key takeaways

- Keep important dates somewhere outside the LMS too.
- Use one broad School calendar instead of creating a calendar for every subject.
- Use clear title prefixes like `[LEC]`, `[LAB]`, `[QUIZ]`, `[EXAM]`, `[HW]`, and `[PROJ]`.
- Add classes once as repeating events, with rooms, links, and instructor details inside.
- Use color labels as a second visual cue; use Tasks for work you need to finish.
- Add responsibilities when you first hear about them, and break big ones into smaller steps.

`[SectionCloser: DO]`
Add your current class schedule as repeating events, use `[LEC]` and `[LAB]` where applicable, and add the details you usually have to search for later.
`[/SectionCloser]`

---
---

# SECTION 05

## Protecting Your Work

**What this section covers:** Password management, backing up your files, and keeping private credentials out of your code.

**Why it matters:** A few simple habits can prevent much bigger problems later — lost files, locked accounts, exposed passwords, or API keys accidentally pushed to GitHub.

---

### Use a password manager

`[Badge] RECOMMENDED` A password manager helps you use a different, strong password for every account without having to memorize all of them.

Good options include:

- [**Bitwarden**](https://bitwarden.com/) — free, with apps and browser extensions
- **Google Password Manager** — built into Google accounts and Chrome
- **1Password** — another popular option with cross-device support

A basic setup:

1. Create your password manager account.
2. Choose a strong master password.
3. Save your recovery information somewhere safe.
4. Install the browser extension and phone app.
5. Turn on **unlock with biometrics** so you can use Face ID, Touch ID, or your fingerprint when filling passwords.
6. Start updating your most important accounts first.

Accounts to prioritize: Email · GitHub · School portal · Banking and financial accounts · Social media tied to your identity.

`[Note]` Avoid reusing one password across accounts — let the manager generate long, unique ones. You usually don't need to type them yourself; the extension or app autofills them, and biometrics make it quick on devices with Face ID, Touch ID, or fingerprint unlock. `[/Note]`

---

### Turn on two-factor authentication

Two-factor authentication adds another step after your password. Prioritize it for accounts such as: Email, GitHub, School portal, Password manager, Banking or financial accounts.

`[Note]` Save your recovery codes somewhere secure and separate from the device they protect. `[/Note]`

---

### Your school email

Use your school email for things connected directly to your student life (school portals and services, professor communication, school software, campus orgs, student-only registrations). For accounts you expect to keep after graduation, use a personal professional email instead (GitHub, LinkedIn, portfolio, job applications, professional communities, long-term developer accounts).

`[SideNote]` **Don't ignore your school email after setting up a personal one.** It can unlock **student discounts and perks** — software discounts, student subscriptions, and programs like the **GitHub Student Developer Pack**. Use it where student verification gives you a benefit, but don't make it the only recovery email for accounts you want to keep long-term. `[/SideNote]`

---

### Backing up your files

Your laptop should not be the only place an important file exists.

`[Interactive: BackupDestinations]` Click each destination to see what belongs there:

- **Your laptop** — the working copy: school files, notes, projects, current documents.
- **Cloud storage** (Google Drive / Dropbox) — documents synced across devices: `Studies/`, `Upskilling/`, `Career/`. (Don't sync `Development/` — sync services conflict with Git and can corrupt a project.)
- **Another physical drive** (external SSD / hard drive) — a second copy of important school documents, certificates, portfolio assets, resume files, and photos you can't recreate.
- **GitHub** — for code: a remote copy, version history, collaboration, and a way to restore or clone onto another computer.

`[Note]` If your laptop stopped working today, what would you actually lose? Anything important that exists in only one place still needs another copy. `[/Note]`

---

### Keys and passwords inside code

When a project connects to another service, that service may give you a **key** — effectively a password your app uses to access it.

`[Interactive: SecretKeySteps]` Click through the four numbered steps. Each step carries a status badge — IN YOUR CODE, EXPOSED, STILL EXPOSED, SAFE:

1. **The key is pasted into the code** — a `WEATHER_API_KEY = "..."` sits directly in `weather.py`. An API key, token, or database password should be treated like a password.
2. **The project is pushed to a public repository** — the secret goes with it. Public repos are scanned automatically for keys, often by bots within minutes.
3. **You delete the key, but it's still in the history** — changing the current file doesn't remove the secret from earlier commits (`git log` still shows it). Deleting the line doesn't make it safe; **revoke or rotate** an exposed secret with the provider.
4. **The fix: keep secrets outside your code** — real values in `.env` (ignored by `.gitignore`), a blanked `.env.example` that's safe to commit, and code that reads `os.environ["WEATHER_API_KEY"]`.

---

### What `.gitignore` is for

`.gitignore` tells Git which files and folders it should ignore — because they're private, generated automatically, large and reinstallable, specific to your computer, or not useful to other people on the project.

`[Interactive: GitignoreExplorer]` Click an entry to see why it's ignored:

```text
.env            → private (secrets)
node_modules/   → large and reinstallable
.venv/          → specific to your computer
__pycache__/    → generated automatically
.DS_Store       → specific to your computer
```

`[Note]` A dependency folder like `node_modules/` doesn't belong in GitHub — another developer can rebuild it from the project's dependency file. `[/Note]`

---

## Key takeaways

- Use a password manager and unique passwords for important accounts.
- Turn on **unlock with biometrics** for easier Face ID or fingerprint autofill.
- Use two-factor authentication on important accounts.
- Keep your school email for school systems, student discounts, and perks; use a personal professional email for accounts you want to keep long-term.
- Keep important files in more than one place — cloud for documents, a physical drive for an extra backup, and GitHub for code.
- Keep passwords and API keys out of your source code; use `.env`, `.env.example`, and `.gitignore` when a project needs private configuration.

`[SectionCloser: DO]`
Set up a password manager if you don't already have one, then check which important files would disappear if your laptop stopped working today.
`[/SectionCloser]`

---
---

# SECTION 06
## Notion for notes and school

**What this section covers:** Using Notion as a place for notes, links, progress, and information you want to see quickly.

**Why it matters:** Your folders answer **"Where is the file?"** and your calendar answers **"When is it happening?"** Notes and information you want to review need a home too.

---

### What a dashboard is for

A school dashboard can surface the information you want to see quickly.

**Useful things to keep visible:**

- Your current courses
- Your weekly class schedule
- Course modules or weekly topics
- Lectures, assignments, quizzes, projects, and labs
- Coursework status and progress
- Instructor information
- Room and building details
- Links to your LMS
- Links to your course folders
- Semester or term information
- Academic planning pages

> **NOTE:** Your dashboard does not need to become another place where you store everything. Think of it as a **control panel** that connects you to the information and resources you use most often.

**What can stay somewhere else:**

- **School files** → Studies or your cloud storage
- **Working code** → Development and GitHub
- **Classes, deadlines, and notifications** → Google Calendar and Tasks

Your folders can remain the source of truth for files. Your calendar can remain the source of truth for time, deadlines, and reminders. Notion gives you a useful **view** of your school information and progress.

---

### Jazzy's Notion OS

This is the Notion system I used during my Computer Science degree. It became one of the tools that helped me a lot throughout my academic life, because I had one place where I could quickly see the school information I needed without digging through different folders, websites, and notes.

`[Toggle: Jazzy's Notion OS — school dashboard]` — three real screenshots (Courses view, Academia homepage, Upskilling view). Each scrolls inside its own fixed box and opens full size in a new tab when clicked.

`[/Toggle]`

> **NOTE:** You do not need to copy my entire setup. The point is to see how a dashboard can bring useful school information together in one place while your actual files, calendar, and code continue living in their proper systems.

---

### The Academia template

The **Academia** template is the school organization system we built together during a previous **DevTok Pinas session**.

- The session recording is available in our **Discord**
- You can copy the template and use it as a starting point
- You can also follow the recording if you want to understand how the system was built

The Academia system is built around five connected school databases, plus a Contacts or People database for instructors and classmates.

```text
Year + Term → Courses → Modules → Coursework
Courses ↔ Academic Schedule
Courses / Schedule ↔ Contacts
```

Here's what each part is for (click a database on the site to reveal its details):

- **Year + Term** — keeps track of each semester or term; connects your courses to the term they belong to; can include the semester timeline and intake.
- **Courses** — one entry for each class; can include the course type, credits, instructor, status, and description; can link directly to your LMS course page; can link directly to your Google Drive or course folder; pulls in the course schedule, modules, and coursework.
- **Academic Schedule** — keeps your recurring class time blocks; can include the day, time, lecture/lab type, room, location, and instructor; can be shown as a board grouped by day for a weekly timetable view.
- **Modules** — breaks a course into smaller weekly or topic-based sections; connects each module to its course; holds the coursework that belongs to that module; can automatically show progress based on completed coursework.
- **Coursework** — tracks the individual things you need to study or complete (lectures, assignments, quizzes, projects, and labs); lets you track whether something is not started, in progress, being reviewed, submitted, or completed.
- **Contacts / People** — keeps instructor, classmate, or school contact information; can connect the same instructor to their courses and schedule instead of typing their information repeatedly.

`[Link]` [Copy or view the Academia template →](https://ninth-potential-0e7.notion.site/ACADEMIA-39384ccf1fbf80b59e1bf157d8265c7b)

`[Link]` Full Academia walkthrough — available in the DevTok Pinas Discord

---

### Start with the parts you actually need

`[Badge] RECOMMENDED`

If you copy the template, you do not need to fill out everything immediately.

**Start with:**
- Your current **Year + Term**
- Your current **Courses**
- Your regular **class schedule**
- Your **LMS link** for each course
- Your **course folder link** for each course
- Your **instructors**, if useful

**Add as the semester starts:**
- Modules or weekly topics
- Lectures
- Assignments
- Quizzes
- Projects
- Labs
- Progress tracking

> **NOTE:** Build the data as school gives it to you. You do not need to enter an entire semester's worth of coursework before classes even start.

---

### Keeping it maintainable

`[Badge] RECOMMENDED`

A few useful rules:

- Start with fewer views than you think you need.
- Don't track something just because Notion allows you to.
- Link to files instead of uploading another copy when the original already has a proper home.
- Add properties or views when you notice a real need for them.
- Remove or hide things you consistently ignore.
- If updating Notion takes more time than the schoolwork it tracks, simplify it.

> **NOTE:** The goal is not to maintain Notion. The goal is for Notion to make school easier to manage.

---

### Other options

Notion is only one option. You could also use:

- **Obsidian**
- **OneNote**
- **Google Docs**
- **Apple Notes**
- A physical notebook

The important part is having a place where you naturally expect your notes and school information to be.

---

## Key takeaways

- Notion can complement your folders and calendar instead of replacing them.
- A dashboard can give you one place to quickly see useful school information.
- The Academia template connects **terms, courses, schedules, modules, coursework, and contacts**.
- Course pages can keep important links and information close at hand.
- Modules and coursework let you track schoolwork at a more detailed level.
- You do not need to use every database, property, or view immediately.
- You also do not need Notion specifically for this organization system to work.

`[SectionCloser: COPY]`
Copy the Academia template, add your current term and courses, then fill in the rest as you actually need it.
`[/SectionCloser]`

---
---

# SECTION 07
## Setting up your coding workspace

**What this section covers:** What a coding workspace includes and the basic tools you need to start working on projects.

**Why it matters:** "Set up your development environment" can sound much more complicated than it actually is when you're starting.

---

### What a coding workspace is

Think of your workspace as three things working together (part 3 is this section's focus):

1. **Where your code lives** — your project folder inside Development
2. **What you open it with** — your editor or IDE, with the whole project folder open
3. **What's installed** — the tools needed to run and work with the code

Section 03 covered the first two. This section focuses on the tools installed on your computer.

---

### What to install, by job

`[Badge] RECOMMENDED` Install tools because you need them, not because every developer setup video lists them. On the site this is a **timing filter** — click Now / Soon / As needed / Later to see what belongs there; it opens on Now.

| Job | Example tool | When |
|---|---|---|
| Write code | VS Code or IntelliJ IDEA | Now |
| Run your language | Python, Node.js, Java — whatever your classes use | Now |
| Track changes | Git | Now |
| Type commands | Terminal — built into VS Code and IntelliJ IDEA | Now |
| Install packages | pip, npm — comes with the ecosystem | Now |
| Format code | Prettier or Black | Soon |
| Check code quality | Built-in IDE inspections; ESLint or Pylint when your project uses them | As needed |
| Test APIs | Postman — when you build or use an API | As needed |
| Work with databases | DataGrip — when you need it | As needed |
| Containers | Docker — later, if required | Later |

These are only samples — there are many other tools out there, and over time you'll find what works best for you. You do not need every development tool installed on day one; start with what your current classes and projects actually use.

> **NOTE:** Linters such as **ESLint** and **Pylint** are not automatically required for every student or project. Your editor or IDE already catches many syntax errors and common problems. Add a linter when your language, class, team, or project uses one for additional code-quality rules.

---

### Extensions

`[Badge] TOOL-SPECIFIC`

The same rule applies to editor extensions. On the site, click one to see what it's for. Useful ones you may come across include:

- **The extension for the language you're learning** — Python, Java, C/C++, or whatever your current class or project uses
- **Prettier** — formats supported code consistently, especially common in web projects
- **ESLint** — useful for JavaScript or TypeScript projects that use ESLint rules
- **Live Server** — useful when working on simple HTML, CSS, and JavaScript projects locally

You do not need to install all of these. Before installing something, ask: **What problem is this extension solving for me?** If you don't have an answer yet, you probably don't need it yet.

> **NOTE:** IntelliJ IDEA already includes many features that VS Code may add through extensions, such as code inspections, refactoring tools, language support, and project analysis. The exact plugins or extensions you need will depend on the IDE and language you're using.

---

### Another meaning of "workspace"

Most of the time in this guide, **workspace** simply means the project and tools you currently have open for coding. But in editors and IDEs, **workspace** can also describe a setup where you manage **multiple projects together**.

In VS Code, this is a **multi-root workspace** — you add multiple separate project folders or repositories to the same window (**File → Add Folder to Workspace**), then save the setup as a `.code-workspace` file so you can reopen the same group later. IntelliJ IDEA has the same idea through its **Multi-Project Workspace** plugin: related projects appear together in one IDE workspace, and you can work across them without constantly opening and closing separate windows. For example:

```text
Health-Tech.code-workspace
├── blood-lab-repo/
└── ine-coach-report-tool/
```

The projects stay separate — each remains its own project and Git repository. I might group them like this when:

- The projects are related
- A feature in one project connects to the other
- I need to search or reference code across both projects
- I'm actively working between both and don't want to keep switching windows

`[Visual — Class C]` Jazzy's real multi-project workspace (`workspace.png`) — one window titled `ine (Workspace)` with `blood-labs-history-app` and `ine-coach-reports` open together.

> **NOTE:** You do not need a multi-project workspace for normal assignments. It becomes useful when you are actively working on two or more separate projects that relate to each other.

---

### Keeping the workspace usable

A few simple habits:

- Open the project folder instead of random individual files.
- Keep the terminal open at the project directory.
- Close projects you aren't actively working on.
- Delete leftover test files when you're done with them.
- Remove extensions you no longer use.
- If your editor becomes slow, check your extensions and whether the project is inside a synced folder.
- Use a multi-project workspace only when the projects actually benefit from being open together.

`[Visual — Class C]` A project open in the editor, showing the Explorer, editor, terminal, and Source Control (reuses `warm-ide.png`).

---

## Key takeaways

- Your workspace is the project folder, editor or IDE, and development tools working together.
- You only need a few tools to start.
- Install the language and tools your current classes actually use.
- Your editor or IDE already catches many coding problems; add linters when your project needs them.
- Add extensions when they solve a specific problem.
- VS Code can group related projects in a **multi-root workspace**.
- IntelliJ IDEA can also manage related projects together in a **Multi-Project Workspace**.

`[SectionCloser: DO]`
Check that you have the basics for your current classes: an editor or IDE, your required programming language, Git, and a working terminal.
`[/SectionCloser]`

---
---

# SECTION 08
## The 20-Minute Reset

**What this section covers:** A short routine for getting back on track when things have drifted.

**Why it matters:** Every system gets disorganized during exams and deadline weeks. That's expected. What matters is a way back that doesn't require rebuilding anything.

---

### When to run it

- End of the week — pick a day and keep it
- After a heavy deadline week
- Before a new term starts

On a schedule, not when you feel behind.

---

### The checklist

`[Interactive: ResetChecklist]`

**Files**
- Empty or file everything in Downloads
- Clear the Desktop
- Put loose documents into the right term and subject folder

**School**
- Open your LMS and check what's coming
- Add new deadlines to your calendar
- Look at the week ahead

**Development**
- Commit and push anything you've been working on
- Delete leftover test files
- Move finished projects to `archive/`

**Upskilling**
- File anything new you saved
- Delete resources you won't realistically use

**Accounts and backups**
- Confirm your cloud sync is actually running
- Check nothing important exists only on your laptop

`[/Interactive]`

**Note:** Twenty minutes, not an afternoon. If it's taking longer, you're reorganizing rather than resetting.

---

## Key takeaways

- Run it weekly, on a set day.
- It's recovery, not maintenance.
- Every item is a small action, not a project.

`[SectionCloser: COPY]`
The checklist is in the toolkit. Save it somewhere you'll see it weekly.
`[/SectionCloser]`

---

## Closing

You now have four folders, a structure for school files, an understanding of how coding projects work, a calendar that reminds you, and a routine for getting back on track.

You don't need to set all of it up today. Start with the four folders and this term's subjects. Add the rest as you need it.

> **Your system doesn't need to stay perfect. It just needs to be easy to return to.**

`[SignOff]` Short closing note from Jazzy, first person. To be written by the presenter.

---
---

# SECTION 09 — BONUS
## Group Projects and Shared Repositories

`[Badge] ADVANCED` Reference material. Covered live only if there's time.

**What this section covers:** Setting up a group project so everyone can work on it.

**Why it matters:** Most group project problems are setup problems, and they're much cheaper to fix in week one than the week before defense.

---

### What usually goes wrong

- The working version is on one person's laptop and they're unreachable
- The same file gets passed around in a group chat under different names
- A teammate can't get the project running, doesn't want to ask twice, and stops contributing
- The account holding everything belongs to someone who stops responding

---

### Setting it up

On day one, before anyone writes code:

1. **One repository.** Everyone gets access immediately.
2. **One person listed as owner**, but everyone has full access, so nobody is blocked.
3. **Everyone downloads it and runs it once.** Fix problems now, while they're small.
4. **Write the README on day one.** It's how a teammate gets started without messaging you.

**Note:** The teammate who can't get it running usually won't say so twice. Checking on day one prevents most uneven-workload problems.

---

### Where a capstone lives

`[Visual — Class A12]` Two boxes joined by a pointer file.

- **Development** — the code, in the repository
- **Studies** — requirements, forms, adviser feedback, defense slides
- **A short text file in Studies** noting where the code is, with the link

Same split as any assignment with both a program and a written component.

---

## Key takeaways

- Set up the shared repository on day one with access for everyone.
- Confirm every teammate can run it before real work starts.
- Capstone code goes in Development; paperwork goes in Studies, linked by a note.
