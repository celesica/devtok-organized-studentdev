# THE TOOLKIT
### Reference library — everything reusable, in one tab

The toolkit is not part of the guided sequence. It's where someone lands months later wanting a template, a checklist, or a prompt — not a lesson.

**Structure:** five groups, each independently linkable.

| Group | Contents |
|---|---|
| Templates | 9 copyable structures |
| Checklists | 5 recurring routines |
| Prompts | 15 AI prompts, grouped by job |
| Glossary | 12 terms, one sentence each |
| Tools to install | Organized by job, filtered by when |

**Every item has a copy button.** Trees, templates, checklists, and prompts all copy as plain text.

---
---

# TEMPLATES

## T1 · Studies hierarchy — minimal

For a first-year, or anyone who wants the smallest workable structure.

```
Studies/
└── [Your Program]/
    └── Courses/
        └── Y1T1/
            ├── [Subject 1]/
            ├── [Subject 2]/
            └── [Subject 3]/
```

---

## T2 · Studies hierarchy — standard `[Badge] RECOMMENDED`

```
Studies/
└── BS Computer Science/
    ├── Courses/
    │   ├── Y1T1/
    │   ├── Y1T2/
    │   └── Y2T1/
    │       ├── Algorithms and Complexity/
    │       ├── Life and Works of Rizal/
    │       └── Software Engineering/
    ├── Curriculum/
    ├── Grade Slips/
    ├── Graduation Requirements/
    └── Organizations/
```

---

## T3 · Studies hierarchy — detailed

For upper years with thesis, OJT, and scholarship requirements.

```
Studies/
└── BS Computer Science/
    ├── Courses/
    │   └── Y3T2/
    │       └── Software Engineering/
    │           ├── assignments/
    │           ├── lectures/
    │           └── exams/
    ├── Curriculum/
    ├── Grade Slips/
    ├── Graduation Requirements/
    ├── Thesis/
    │   ├── proposal/
    │   ├── adviser-feedback/
    │   └── defense/
    ├── OJT/
    ├── Scholarship and Aid/
    └── Organizations/
```

**Note:** thesis *code* goes in `Development/`, not here. This folder holds the documents.

---

## T4 · Development hierarchy

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

- `school/` — code written for classes, by term
- `learning/` — code written while following courses
- `personal/` — your own projects
- `experiments/` — things you're trying out
- `archive/` — projects you've stopped working on

---

## T5 · Upskilling hierarchy — by topic `[Badge] RECOMMENDED`

```
Upskilling/
├── web-development/
├── cloud/
├── ai-and-data/
├── design/
├── certificates/
└── resources/
```

## T5b · Upskilling hierarchy — by platform

```
Upskilling/
├── coursera/
├── udemy/
├── youtube/
├── freecodecamp/
└── certificates/
```

Pick one. Mixing both is what makes things hard to find.

---

## T6 · Career hierarchy

```
Career/
├── resume/
├── certificates/
├── portfolio/
├── applications/
│   └── [company-name]/
└── interview-prep/
```

---

## T7 · Project starter structure

Adjust to your language. Not every project needs all of this.

```
project-name/
├── src/
├── tests/
├── docs/
├── README.md
├── .gitignore
├── .env.example
└── requirements.txt        (or package.json)
```

**What's actually required:** `README.md`, a dependency file, and `.gitignore`. Everything else depends on the project.

---

## T8 · README template

```markdown
# Project Name

One sentence on what this does.

## What it does

Two or three sentences. What problem it solves, or what
it was built for.

## Requirements

- Python 3.11 (or Node 20, etc.)
- Anything else that must be installed first

## Setup

1. Clone or download this repository
2. Install dependencies:
   pip install -r requirements.txt
3. Copy `.env.example` to `.env` and fill in your values
4. Run it:
   python main.py

## Notes

Anything a person would trip over. Known issues, things
that aren't finished.

## Built with

List the main tools or frameworks.
```

**The test:** download your own project into an empty folder and set it up using only the README. If that works, it's done.

---

## T9 · `.gitignore` starters

**Python**
```
__pycache__/
*.pyc
.venv/
venv/
.env
.DS_Store
```

**Node / JavaScript**
```
node_modules/
dist/
build/
.env
.DS_Store
```

**Java**
```
*.class
target/
build/
.env
.DS_Store
```

**Always include `.env`.** It's the file holding your keys.

---
---

# CHECKLISTS

## CL1 · Start of term

**Files**
- [ ] Create this term's folder in `Studies/Courses/`
- [ ] Add a folder per subject
- [ ] Create this term's folder in `Development/school/`

**Calendar**
- [ ] Add each class as a repeating event for the whole term
- [ ] Put room, professor, meeting link, and LMS link in each event
- [ ] Add known exam and submission dates
- [ ] Set notifications

**Accounts and access**
- [ ] Confirm LMS access for every subject
- [ ] Bookmark each subject's LMS page

**Notes**
- [ ] Add this term's subjects to your notes tool

---

## CL2 · New project

- [ ] Give it a clear name — lowercase, dashes, no spaces
- [ ] Decide where it belongs in `Development/`
- [ ] Create the folder
- [ ] Open the folder in your editor, not a file
- [ ] Initialize Git
- [ ] Add a `.gitignore` before your first commit
- [ ] Create `README.md`
- [ ] Create the dependency file
- [ ] If it uses keys, create `.env` and `.env.example`

---

## CL3 · Before pushing to GitHub

- [ ] No keys or passwords anywhere in the code
- [ ] `.env` is listed in `.gitignore`
- [ ] `node_modules/` or equivalent is ignored
- [ ] README explains what it is and how to run it
- [ ] Commit messages describe what changed
- [ ] It runs from a fresh copy

---

## CL4 · Project finish

- [ ] Delete leftover test files
- [ ] Update the README to match what it actually does now
- [ ] Take screenshots for your portfolio
- [ ] Commit and push everything
- [ ] Add the deployment link to the README, if there is one
- [ ] Write two lines on what you learned
- [ ] Move it to `personal/` if it's worth showing, or `archive/` if it's done

---

## CL5 · Security basics

**Once**
- [ ] Set up a password manager
- [ ] Change your email password first
- [ ] Turn on two-factor authentication: email, GitHub, school portal
- [ ] Save recovery codes somewhere offline
- [ ] Create a personal professional email
- [ ] Set it as the recovery address on GitHub and LinkedIn

**Ongoing**
- [ ] `Studies/`, `Upskilling/`, `Career/` syncing to cloud storage
- [ ] `Development/` **not** syncing to cloud storage
- [ ] Code pushed to GitHub

---

## CL6 · The 20-minute reset

**Files**
- [ ] Empty or file everything in Downloads
- [ ] Clear the Desktop
- [ ] File loose documents into the right term and subject

**School**
- [ ] Check your LMS for anything new
- [ ] Add new deadlines to your calendar
- [ ] Look at the week ahead

**Development**
- [ ] Commit and push work in progress
- [ ] Delete leftover test files
- [ ] Move finished projects to `archive/`

**Upskilling**
- [ ] File anything new you saved
- [ ] Delete what you won't realistically use

**Backups**
- [ ] Confirm cloud sync is running
- [ ] Check nothing important exists only on your laptop

---
---

# PROMPTS

Copy, replace the bracketed parts, paste into ChatGPT, Claude, or Gemini.

## Organization

### P1 · Design a folder structure for my term
**Use this when:** you're starting a term and want a structure that fits your actual subjects.

```
I'm a [year level] [program] student. This term I'm taking:
[list your subjects].

I already organize my files into four top-level folders:
Studies (school documents), Development (all code),
Upskilling (self-directed learning), Career (job materials).

Suggest a folder structure for this term's school files.
Keep it simple — don't create folders I won't use. Explain
why each folder exists.
```

---

### P2 · Where should this go?
**Use this when:** you're not sure which folder something belongs in.

```
I organize my files into four folders:
- Studies: school documents, requirements, submissions
- Development: anything containing code, no exceptions
- Upskilling: material I'm learning from
- Career: things I'll use after graduation

Where should this go, and why: [describe the file or project]
```

---

### P3 · Review my folder structure
**Use this when:** your folders feel cluttered but you're not sure why.

```
Here's my current folder structure:

[paste your directory tree]

Point out: folders that overlap, folders that are empty or
unused, anything filed in the wrong place, and anything
that's more nested than it needs to be. Suggest specific
changes, not general advice.
```

---

### P4 · Help me clean Downloads and Desktop
**Use this when:** both have become storage.

```
Here's what's currently in my Downloads and Desktop:

[paste the file list]

Group these into categories and tell me where each group
should go. My folders are Studies, Development, Upskilling,
and Career. Flag anything I can safely delete.
```

---

### P5 · What should I archive?
**Use this when:** your Development folder has too many projects.

```
Here are the projects in my Development folder, with the
last time I touched each one:

[paste the list]

Which should I archive, which should I keep active, and
which are worth cleaning up for a portfolio? Explain your
reasoning for each.
```

---

## Projects

### P6 · Recommend a project structure
**Use this when:** you're starting something and don't know how to lay it out.

```
I'm building [describe the project] using [language/framework].
I'm a [beginner/intermediate] and working [alone/in a team of N].

Suggest a folder structure. Keep it as simple as the project
actually needs — don't add folders for things I'm not doing.
Explain what each folder is for.
```

---

### P7 · Help me plan a project
**Use this when:** you have an idea but no plan.

```
I want to build [describe the idea]. I know [languages you
know] and I have about [time available].

Break this into stages, starting with the smallest version
that actually works. For each stage, tell me what I'd need
to learn. Don't write the code — I want to build it myself.
```

---

### P8 · Break this assignment into steps
**Use this when:** something is due and it's too big to start.

```
I have this assignment: [paste the description]

It's due on [date] and today is [date].

Break it into three or four steps with suggested dates.
Assume I can work on it a few hours a week alongside other
subjects.
```

---

## Git and documentation

### P9 · Generate a README outline
**Use this when:** your project has no documentation.

```
Here's my project structure:

[paste the tree]

It's a [describe what it does] built with [tools].

Write a README outline with the sections it needs. Leave
placeholders for anything only I would know. Keep it short —
a student project, not a company product.
```

---

### P10 · Improve my commit message
**Use this when:** you're about to write "fix" again.

```
I changed: [describe what you did]

Write a commit message under 60 characters that says what
changed. Give me two options.
```

---

### P11 · What should Git ignore?
**Use this when:** you're setting up a new project.

```
I'm working on a [language/framework] project.

What should be in my .gitignore, and why is each entry
there? Include anything related to keys or secrets.
```

---

## Learning

### P12 · Explain this repository
**Use this when:** you've opened someone else's project and can't find anything.

```
Here's the file structure of a project I'm trying to
understand:

[paste the tree]

Explain what each main folder is probably for, where the
code likely starts running, and which files I should read
first. I'm a student and new to this kind of project.
```

---

### P13 · Help me understand this code
**Use this when:** you need to understand something, not have it written for you.

```
Here's some code I'm trying to understand:

[paste the code]

Explain what it does, step by step, in plain language.
Don't rewrite or improve it — I want to understand what's
already there. Ask me questions if something depends on
context you don't have.
```

---

### P14 · Organize my learning resources
**Use this when:** you've saved a lot and used none of it.

```
Here's everything I've saved to learn from:

[paste your list of courses, bookmarks, playlists, PDFs]

Sort these into: learning now, reference, archive, and
delete. For anything you put in "learning now," suggest an
order. Be honest about what I'm realistically not going to
get to.
```

---

## Self-check

### P15 · Question my system
**Use this when:** you want to know if your setup actually works.

```
Here's how I currently organize my files:

[describe your structure]

Ask me questions that would reveal whether this actually
works — especially about finding old files, deciding where
new things go, and what happens at the end of a term. Don't
give me advice yet, just ask.
```

---
---

# GLOSSARY

**Folder** — a location on your computer where files sit. Nothing special about it.

**Project** — a folder containing everything needed to run what's inside it: the code, a README, and a list of what must be installed.

**Workspace** — what your editor shows when you open a whole project folder rather than a single file: the file tree, a terminal, and search across everything.

**Repository (repo)** — a project that Git is tracking. It holds the files and their history.

**Remote** — a copy of your repository stored online, usually on GitHub.

**Git** — the tool on your computer that records the history of your project as you work.

**GitHub** — a website that stores Git repositories online so others can see them and work with you.

**Commit** — one saved snapshot in your project's history, with a short description of what changed.

**Clone** — downloading a copy of a repository from GitHub to your computer.

**Push** — uploading your commits from your computer to GitHub.

**Terminal** — the text window where you type commands instead of clicking. Built into VS Code.

**Dependency** — something your project needs installed in order to run. Listed in `requirements.txt` or `package.json`.

---
---

# TOOLS TO INSTALL

Install things because you need them, not because a list says every developer has them.

## Now — the four essentials

| Job | Tool | Notes |
|---|---|---|
| Write code | VS Code | Free, works everywhere |
| Run your language | Python / Node.js / Java | Whatever your classes use |
| Track changes | Git | Separate from GitHub |
| Type commands | Terminal | Built into VS Code |

One afternoon. All free.

## Soon

| Job | Tool |
|---|---|
| Install packages | pip / npm — comes with your language |
| Format code | Prettier, Black |
| Catch mistakes | ESLint, Pylint |
| Manage passwords | Bitwarden |

## Later — when a project needs it

| Job | Tool |
|---|---|
| Test APIs | Postman, Thunder Client |
| Work with databases | DBeaver, TablePlus |
| Containers | Docker |
| Deploy | Vercel, Netlify, Render |

---

## VS Code extensions

You don't need twenty-five.

**Worth having early**
- The language extension for what you're learning
- Prettier, for formatting
- GitLens, for a clearer view of your project's history

**Everything else:** add it when you hit a problem it solves. Extensions slow the editor down, and most of them you'll never open.
