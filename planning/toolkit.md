# THE TOOLKIT
### Reference library — everything reusable, in one tab

The toolkit is not part of the guided sequence. It's where someone lands months later wanting a prompt, template, checklist, definition, or tool — not a lesson.

**Start with the prompts if you need help doing something.** Copy one, replace the bracketed parts, and paste it into ChatGPT, Claude, Gemini, or another AI assistant.

**Structure:** five groups, each independently linkable.

| Group | Contents |
|---|---|
| Prompts | 28 copyable AI prompts, grouped by job |
| Templates | 9 copyable structures + 1 alternate structure |
| Checklists | 6 recurring routines |
| Glossary | 21 student-developer terms |
| Tools to install | Organized by job and when you actually need them |

**Every reusable item has a copy button.** Trees, templates, checklists, commands, and prompts copy as plain text.

---
---

# PROMPTS

## Use AI as a guide, not another system to maintain

A good prompt gives the AI enough context to help with **your actual setup** instead of giving generic advice.

When useful, include:

- Your program and year level
- Your classes and schedule
- Whether a course is major/core or minor/elective
- Your current folder tree
- Your operating system
- Your editor or IDE
- Your programming language or framework
- Screenshots of what you currently see
- The exact error, assignment instructions, or project structure

> **TIP:** If you're trying to learn how to do something, say **“walk me through it step by step and explain what each step does.”** You can also tell the AI not to write the code or do the work for you if you want to practice it yourself.

## Featured prompts

If you only save a few, start with:

- **P1** — Set up my whole term
- **P2** — Organize my classes in Google Calendar
- **P14** — Break an assignment into steps
- **P17** — Explain Git and GitHub using my project
- **P23** — Build a backup plan
- **P28** — Audit my whole student-developer system

---

## Term, calendar, and school setup

### P1 · Set up my whole term
**Use this when:** a new semester is starting and you want one step-by-step setup plan.

```text
I'm a [year level] [program] student.

Here are my classes this term:
[paste classes]

Here is my weekly schedule:
[paste schedule]

Here are the tools I already use:
- Files: [Finder / File Explorer / other]
- Calendar: [Google Calendar / other]
- Notes: [Notion / Obsidian / OneNote / other]
- Code editor or IDE: [VS Code / IntelliJ IDEA / other]

Help me set up my student-developer organization system for
this term.

Use these categories:
- Studies = school documents and requirements
- Development = working code
- Upskilling = learning outside my curriculum
- Career = internship and job material

Give me a step-by-step setup for:
1. My term folders
2. My class calendar
3. Tasks and deadlines
4. My notes/dashboard
5. My Development folder for coding classes

Keep it simple. Don't create folders, databases, calendars,
or trackers unless they solve a real need.
```

---

### P2 · Organize my classes in Google Calendar `[Badge] FEATURED`
**Use this when:** you have your class schedule and want to build the calendar properly instead of entering things randomly.

```text
I want to organize my school schedule in Google Calendar.

Here are my classes and schedules:
[paste each class, days, start/end time, room, and term dates]

Major/core courses:
[list]

Minor/elective courses:
[list]

I also want to schedule or track:
- Coding practice
- Self-care
- School organizations / org work
- [anything else]

Walk me through the setup step by step using the current
Google Calendar interface.

My preferences:
- Use one School calendar for school if I don't already have one
- Keep personal events separate if I want a separate personal calendar
- Major/core courses should use the same color family
- Minor/elective courses should use another color family
- Coding practice, self-care, and org activities should each
  be visually distinct
- Classes should be repeating events that stop at the end of term
- Assignments and things I need to finish should use Google Tasks
  so they appear as tasks/check marks
- Add useful notifications before classes and deadlines
- Put room numbers, meeting links, instructor info, and LMS links
  inside events when available

Tell me:
1. What to create first
2. What should be an event vs a task
3. How to color-code or label everything
4. How to set the recurring class schedule
5. How to set notifications
6. A final checklist so I can confirm I didn't miss anything

Don't add extra Google Calendar features I didn't ask for.
```

---

### P3 · Turn my syllabus into calendar entries and tasks
**Use this when:** a professor gives you a syllabus or course outline full of dates.

```text
Here is my syllabus / course outline:
[paste it or attach it]

Extract the dates that matter for my calendar.

Separate them into:
- Events: classes, exams, presentations, meetings
- Tasks: assignments, labs, readings, project deliverables,
  or anything I need to complete

For each item, give me:
- Title
- Date
- Time, if provided
- Event or task
- Suggested reminder
- Any useful details I should put in the description

Do not invent dates or requirements that are not in the
syllabus. Flag anything unclear so I can verify it.
```

---

### P4 · Event or task?
**Use this when:** you're not sure whether something belongs on the calendar as an event or in Tasks.

```text
I'm organizing school in Google Calendar and Google Tasks.

Here are the things I need to add:
[paste list]

For each one, tell me whether it should be:
- Calendar event
- Task
- Both, only if there is a good reason

Use this rule:
- Events = something happens at a specific time
- Tasks = something I need to finish

Explain any item that could reasonably go either way.
```

---

### P5 · Set up my Academia Notion template
**Use this when:** you've copied the DevTok Pinas Academia template and want to populate it without overbuilding it.

```text
I'm using the DevTok Pinas Academia Notion template.

Here are my current classes:
[paste classes]

Here is my term:
[term name and start/end dates]

Here is my weekly schedule:
[paste schedule]

Help me fill in the template using its existing structure:
- Year + Term
- Courses
- Academic Schedule
- Modules
- Coursework
- Contacts / People

Tell me:
1. What I should fill in now
2. What I can wait to add until classes begin
3. What links are useful to add to each course
4. What information I should avoid duplicating because it
   already lives in my folders or Google Calendar

Do not redesign the template or add extra databases unless
I specifically ask.
```

---
---

## Files and organization

### P6 · Design a folder structure for my term
**Use this when:** you're starting a term and want a structure that fits your actual subjects.

```text
I'm a [year level] [program] student. This term I'm taking:
[list your subjects].

I already organize my files into four top-level folders:
Studies (school documents), Development (all working code),
Upskilling (self-directed learning), Career (job materials).

Suggest a folder structure for this term's school files.
Keep it simple — don't create folders I won't use.
Explain why each folder exists.
```

---

### P7 · Where should this go?
**Use this when:** you're not sure which folder something belongs in.

```text
I organize my student files into four folders:
- Studies: school documents, requirements, submissions
- Development: working code and coding projects
- Upskilling: material I'm learning from outside my curriculum
- Career: internship, job, portfolio, and professional material

Where should this go, and why?
[describe the file, folder, course, project, or resource]

If it contains both code and school documents, tell me how
to split those pieces between the correct locations.
```

---

### P8 · Review my folder structure
**Use this when:** your folders feel cluttered but you're not sure why.

```text
Here's my current folder structure:

[paste your directory tree]

Review it for:
- Overlapping folders
- Unnecessary nesting
- Files or folders that appear to be in the wrong place
- Categories that are too broad
- Categories I probably don't need yet

Suggest specific changes, not general advice.

Keep the final structure easy enough to maintain during
exam weeks.
```

---

### P9 · Help me clean Downloads and Desktop
**Use this when:** both have quietly become storage.

```text
Here's what's currently in my Downloads and Desktop:

[paste the file list]

Group these into categories and tell me where each group
should probably go.

My main folders are:
- Studies
- Development
- Upskilling
- Career

Also identify possible duplicates, installers, temporary
files, or things that may no longer be useful.

Do not tell me something is definitely safe to delete if
you can't know that from the filename alone. Flag it for
me to review instead.
```

---

### P10 · Rename these files consistently
**Use this when:** your files are named things like `final-v2-real-final.pdf`.

```text
Here are my current filenames:
[paste filenames]

Rename them using simple, descriptive names.

Use:
- YYYY-MM-DD when the date matters
- Clear subject or project names
- Consistent capitalization and separators
- Names that will still make sense months from now

Return:
Old filename → Suggested filename

Do not change file extensions.
```

---

### P11 · Give me a 20-minute reset
**Use this when:** your whole system is getting messy and you need a small way back.

```text
My student organization system is getting messy.

Current problems:
[describe what is piling up — Downloads, Desktop, LMS,
calendar, coding projects, notes, etc.]

I use:
- Studies for school documents
- Development for code
- Upskilling for self-learning
- Career for job material
- Google Calendar / Tasks for time and deadlines
- [Notion / Obsidian / other] for notes

Give me a reset I can complete in about 20 minutes.

Prioritize only the highest-value actions.
Do not redesign my whole system or give me a giant cleanup project.
```

---
---

## Projects and coding workspace

### P12 · Recommend a project structure
**Use this when:** you're starting something and don't know how to lay it out.

```text
I'm building [describe the project] using [language/framework].
I'm a [beginner/intermediate] and working [alone/in a team of N].

Suggest a folder structure.

Keep it as simple as the project actually needs.
Don't add folders for things I'm not doing.

Explain what each folder and important file is for.
```

---

### P13 · Help me plan a project
**Use this when:** you have an idea but no plan.

```text
I want to build [describe the idea].

I know:
[languages/tools you know]

I have about:
[time available]

Break this into stages starting with the smallest version
that actually works.

For each stage:
- Tell me what to build
- Tell me what I may need to learn
- Tell me how I can know that stage is working

Don't write the code. I want to build it myself.
```

---

### P14 · Break this assignment into steps `[Badge] FEATURED`
**Use this when:** something is due and it feels too big to start.

```text
I have this assignment:
[paste the assignment description]

It's due on [date].
Today is [date].

Break it into small, concrete steps with suggested dates.

Separate:
- Understanding / planning
- Building or writing
- Testing / checking
- Final submission

Assume I have other classes and can only work on this for
[time available] per day or week.

Start with the smallest action I can do today.
```

---

### P15 · Set up my coding environment
**Use this when:** a class tells you to “set up your development environment” and you're not sure what that means.

```text
I'm taking [class] and we'll be using:
[language/framework/tools]

My computer is:
[Windows/macOS/Linux]

My editor or IDE is:
[VS Code / IntelliJ IDEA / other]

Tell me only what I actually need to install to get started.

Cover:
- Editor or IDE
- Programming language/runtime
- Git
- Terminal
- Package manager, if needed
- Formatter, if useful
- Linter or code-quality tool only if this stack commonly
  needs one
- Postman only if I'll be working with APIs
- DataGrip only if I'll be working directly with databases

Give me the installation order and a simple way to verify
that each tool works.
```

---

### P16 · Should these projects share one workspace?
**Use this when:** you have related repositories and keep switching between windows.

```text
I have these separate projects / repositories:

Project A:
[describe it]

Project B:
[describe it]

How they connect:
[describe the shared feature, API, data flow, dependency, etc.]

Should I keep them in separate editor windows or put them
together in:
- A VS Code multi-root workspace, or
- An IntelliJ IDEA multi-project workspace

Explain the tradeoff in plain language.

If one workspace makes sense, walk me through how to set
it up without combining the repositories into one repo.
```

---
---

## Git, GitHub, and documentation

### P17 · Explain Git and GitHub using my project `[Badge] FEATURED`
**Use this when:** clone, branch, commit, pull, and push all sound like random words.

```text
I'm new to Git and GitHub.

My project is:
[describe the project]

Explain these terms using my project as the example:
- Repository / repo
- Clone
- main
- Branch
- Commit
- Pull
- Push
- Pull Request / PR
- Merge
- Fork

Then show me one simple workflow from:
clone → branch → work → commit → push → PR → merge → pull

Keep it beginner-friendly.
Do not introduce advanced Git workflows yet.
```

---

### P18 · Improve my commit message
**Use this when:** you're about to write `fix` again.

```text
I changed:
[describe exactly what you changed]

Give me three short Git commit message options that clearly
say what changed.

Prefer specific messages such as:
"Add student login form"
instead of vague messages such as:
"update" or "fix"
```

---

### P19 · What should Git ignore?
**Use this when:** you're setting up a new project.

```text
I'm working on a [language/framework] project.

Here is my project structure:
[paste tree if available]

What should be in my .gitignore?

Explain why each entry is ignored.
Include:
- Dependency/build folders when relevant
- Local environment files
- .env or other files that may contain secrets
- OS/editor-generated files only when appropriate

Keep the list specific to my stack.
```

---

### P20 · Generate a README outline
**Use this when:** your project has no documentation.

```text
Here's my project structure:

[paste the tree]

It's a [describe what it does] built with [tools].

Write a short README outline for a student project.

Include only the sections it actually needs, such as:
- What it does
- Requirements
- Setup
- How to run it
- Environment variables, if needed
- Known limitations
- Built with

Leave placeholders for anything only I would know.
```

---

### P21 · Set up a simple Git workflow for our capstone
**Use this when:** your group is about to start coding together.

```text
We're a team of [number] students building:
[describe capstone / group project]

Team members and areas:
- [Name] — [feature]
- [Name] — [feature]
- [Name] — [feature]
- [Name] — [feature]

Give us a simple beginner-friendly GitHub workflow.

Include:
- One shared repository
- What main means
- Simple branch names for each feature
- When to pull
- When to commit
- When to push
- When to open a Pull Request
- When a finished branch can be merged into main
- Examples of good commit messages for our features

Keep it basic. Do not introduce advanced branching models
or detailed PR review policies.
```

---
---

## Security and backups

### P22 · Check my API key and secret setup
**Use this when:** a project uses an API key, database password, token, or other credential.

```text
My project uses these private values:
[describe the types of keys/secrets — do NOT paste the real values]

Here is my relevant project structure:
[paste tree]

Help me check that I'm handling them safely.

Show me where I should use:
- .env
- .env.example
- .gitignore

Explain what belongs in each file.

Also tell me how to check whether a secret was accidentally
tracked by Git.

Do not ask me to paste any real password, API key, token,
or private credential.
```

---

### P23 · Build a backup plan `[Badge] FEATURED`
**Use this when:** you're not sure what would disappear if your laptop died today.

```text
Help me make a simple backup plan for my student files.

What I have:
- Laptop: [device]
- Cloud storage: [Google Drive / Dropbox / other]
- External drive: [yes/no, type if known]
- GitHub: [yes/no]

My important folders are:
- Studies
- Development
- Upskilling
- Career

Tell me what should live on:
1. My laptop
2. Cloud storage
3. An external SSD or other second drive
4. GitHub

For active coding repositories, avoid recommending that I
work directly inside a general cloud-synced folder.

End with a short checklist for testing that my backups
actually work.
```

---

### P24 · Set up my password manager and account security
**Use this when:** you're still reusing passwords or saving them manually.

```text
I want to improve the security of my student and developer
accounts.

I'm considering:
- Bitwarden
- Google Password Manager
- 1Password
[remove options I don't use]

Walk me through a basic setup.

Include:
- Creating a strong master password if the manager uses one
- Saving recovery information safely
- Browser and phone setup
- Unlock with biometrics such as Face ID or fingerprint
- Unique passwords
- Two-factor authentication
- Recovery codes
- Which accounts I should secure first

Prioritize:
email, GitHub, school portal, cloud storage, and financial
accounts.

Do not ask me to paste any real passwords or recovery codes.
```

---
---

## Learning and understanding

### P25 · Explain this repository
**Use this when:** you've opened someone else's project and can't find anything.

```text
Here's the file structure of a project I'm trying to understand:

[paste the tree]

Explain:
- What each main folder is probably for
- Where the application likely starts
- Which files I should read first
- Where configuration and dependencies probably live

I'm a student and new to this kind of project.

Separate what you can tell from the file structure from
anything you're only inferring.
```

---

### P26 · Help me understand this code
**Use this when:** you need to understand something, not have it written for you.

```text
Here's some code I'm trying to understand:

[paste the code]

Explain what it does step by step in plain language.

Don't rewrite or improve it.
I want to understand what's already there.

Explain unfamiliar syntax or concepts when they appear.
```

---

### P27 · Organize my learning resources
**Use this when:** you've saved a lot and used almost none of it.

```text
Here's everything I've saved to learn from:

[paste your list of courses, bookmarks, playlists, PDFs]

Help me organize these into:
- Learning now
- Reference
- Later
- Remove / probably not useful

For "Learning now," suggest a realistic order based on:
[my current class / goal / project]

Keep the active list small enough that I can actually use it.
```

---
---

## Self-check

### P28 · Audit my whole student-developer system `[Badge] FEATURED`
**Use this when:** you've built a system but want to know where it may break during a busy semester.

```text
Here's how I currently organize my student-developer life:

Files:
[describe folders]

Calendar and tasks:
[describe setup]

Notes:
[describe setup]

Coding projects:
[describe setup]

Backups:
[describe setup]

Git/GitHub:
[describe setup]

Review this for:
- Things stored in more than one place unnecessarily
- Places where I may forget a deadline or file
- Parts that require too much maintenance
- Missing backups
- Coding projects that are hard to find or reproduce
- Anything that will become painful during exams or group projects

Give me:
1. What is already working
2. The three highest-value fixes
3. One next action I can do today

Do not redesign everything if a small fix is enough.
```

---
---

# TEMPLATES

## T1 · Studies hierarchy — minimal

For a first-year, or anyone who wants the smallest workable structure.

```text
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

```text
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

```text
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

> **NOTE:** Thesis *code* goes in `Development/`, not here. This folder holds the school documents.

---

## T4 · Development hierarchy

```text
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
- `learning/` — code written while following courses or tutorials
- `personal/` — your own projects
- `hackathons/` — hackathon projects
- `experiments/` — small tests and ideas
- `archive/` — projects you no longer actively work on, if you find an archive useful

> **NOTE:** You do not need every category immediately. Create the ones you actually use.

---

## T5 · Upskilling hierarchy — by topic `[Badge] RECOMMENDED`

```text
Upskilling/
├── web-development/
├── cloud/
├── ai-and-data/
├── design/
├── certificates/
└── resources/
```

## T5b · Upskilling hierarchy — by platform

```text
Upskilling/
├── coursera/
├── udemy/
├── youtube/
├── freecodecamp/
└── certificates/
```

Pick one main approach. Mixing both everywhere is what makes things harder to find.

---

## T6 · Career hierarchy

```text
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

Adjust to your language and framework. Not every project needs all of this.

```text
project-name/
├── src/
├── tests/
├── docs/
├── README.md
├── .gitignore
├── .env.example
└── requirements.txt        (or package.json)
```

> **NOTE:** Don't force a small exercise to look like a production app. Add structure as the project actually needs it.

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

**The test:** clone or download your own project into an empty folder and set it up using only the README. If you can do that, someone else has a much better chance too.

---

## T9 · `.gitignore` starters

**Python**
```text
__pycache__/
*.pyc
.venv/
venv/
.env
.DS_Store
```

**Node / JavaScript**
```text
node_modules/
dist/
build/
.env
.DS_Store
```

**Java**
```text
*.class
target/
build/
.env
.DS_Store
```

**Always keep `.env` out of Git when it contains real private values.**

---
---

# CHECKLISTS

## CL1 · Start of term

**Files**
- [ ] Create this term's folder in `Studies/Courses/`
- [ ] Add a folder per subject
- [ ] Create this term's folder in `Development/school/` if you have coding classes

**Calendar**
- [ ] Create or use a `School` calendar
- [ ] Add each class as a repeating event for the whole term
- [ ] Set the correct end date for each recurring class
- [ ] Put room, instructor, meeting link, and LMS link in the event when useful
- [ ] Keep major/core courses visually consistent
- [ ] Keep minor/elective courses visually consistent in a different color family
- [ ] Give coding practice, self-care, and org activities their own consistent colors if you track them
- [ ] Add known exams and scheduled presentations as events
- [ ] Add assignments and work-to-finish as Tasks
- [ ] Set useful notifications before classes and deadlines

**Accounts and access**
- [ ] Confirm LMS access for every subject
- [ ] Bookmark or save each subject's LMS link
- [ ] Check that your school email works
- [ ] Use your school email for student discounts or perks when appropriate

**Notes**
- [ ] Add this term and current subjects to your notes/dashboard

---

## CL2 · New project

- [ ] Give it a clear name
- [ ] Decide where it belongs in `Development/`
- [ ] Create the project folder
- [ ] Open the folder in your editor or IDE, not just one file
- [ ] Initialize Git when the project is worth tracking
- [ ] Add a `.gitignore` before committing generated/private files
- [ ] Create `README.md` when setup or context needs explaining
- [ ] Add the dependency file your ecosystem uses
- [ ] If it uses secrets, create `.env`, `.env.example`, and make sure `.env` is ignored

---

## CL3 · Before pushing to GitHub

- [ ] No real keys, passwords, tokens, or private credentials in the code
- [ ] `.env` is listed in `.gitignore`
- [ ] Dependency/build folders such as `node_modules/` are ignored when appropriate
- [ ] README explains what the project is and how to run it
- [ ] Commit messages describe what changed
- [ ] The project runs from the setup you documented

---

## CL4 · Project finish

- [ ] Delete leftover test or scratch files you no longer need
- [ ] Update the README to match what the project actually does now
- [ ] Commit and push the final useful changes
- [ ] Add the deployment link to the README, if there is one
- [ ] Take screenshots if the project may be useful for your portfolio
- [ ] Write a few lines on what you learned or what you would improve
- [ ] If it became portfolio-worthy, add its screenshots/details to `Career/portfolio/`

---

## CL5 · Security and backups

**Accounts**
- [ ] Set up a password manager
- [ ] Use unique passwords for important accounts
- [ ] Turn on biometric unlock on supported devices if you want it
- [ ] Turn on two-factor authentication for email, GitHub, school portal, and other important accounts
- [ ] Save recovery codes somewhere safe
- [ ] Use a personal professional email for long-term professional accounts
- [ ] Use your school email for school services and eligible student perks

**Backups**
- [ ] `Studies/`, `Upskilling/`, and `Career/` have another copy in cloud storage
- [ ] Important files also have another copy on an external SSD or second drive when possible
- [ ] Active coding repositories are not being worked on inside a general cloud-synced folder
- [ ] Important code is committed and pushed to GitHub
- [ ] Nothing important exists only on one device

---

## CL6 · The 20-minute reset

**Files**
- [ ] Empty or sort Downloads
- [ ] Clear the Desktop
- [ ] Move loose documents into the correct term and subject folder

**School**
- [ ] Check your LMS for anything new
- [ ] Add newly announced deadlines to your calendar or Tasks
- [ ] Look at the week ahead

**Development**
- [ ] Commit work that should be committed
- [ ] Push work that needs a remote copy
- [ ] Delete leftover test files

**Upskilling**
- [ ] File useful new resources
- [ ] Delete things you realistically won't use

**Backups**
- [ ] Confirm cloud sync is working
- [ ] Check whether anything important exists only on your laptop

---
---

# GLOSSARY

**Folder** — a location on your computer where files live.

**Project** — one piece of work and the files that belong to it.

**Workspace** — the project or set of projects currently opened together in your editor or IDE.

**Multi-root / multi-project workspace** — a workspace that lets you manage multiple separate project folders or repositories together without turning them into one repository.

**Repository (repo)** — a project that Git is tracking, including its history.

**Remote** — an online version of a Git repository, commonly stored on GitHub.

**Git** — the version-control tool that records the history of your project.

**GitHub** — a platform for storing Git repositories online and collaborating on them.

**`main`** — the primary shared branch of a repository.

**Branch** — a separate line of work inside the same repository, often used for a feature or fix.

**Commit** — a saved checkpoint in Git with a message describing what changed.

**Clone** — create a local copy of an existing remote repository on your computer.

**Pull** — bring remote changes into your local repository.

**Push** — send your local commits to the remote repository.

**Pull Request (PR)** — a proposal to combine changes from one branch into another.

**Merge** — combine changes from one branch into another.

**Fork** — create your own separate repository based on another repository.

**Terminal** — a text interface where you run commands; VS Code and IntelliJ IDEA both include integrated terminals.

**Dependency** — a library, package, or other software your project needs in order to run.

**Environment variable** — a named value your application can read from its environment instead of hardcoding it in source code.

**`.env`** — a local file commonly used to store environment variables such as development API keys or database credentials; real private values should not be committed to Git.

---
---

# TOOLS TO INSTALL

Install things because you need them, not because a list says every developer has them.

## Now — the essentials

| Job | Example tool | When |
|---|---|---|
| Write code | VS Code or IntelliJ IDEA | Now |
| Run your language | Python, Node.js, Java — whatever your classes use | Now |
| Track changes | Git | Now |
| Type commands | Terminal — built into VS Code and IntelliJ IDEA | Now |

You do not need every developer tool on day one.

---

## Soon — when your current stack uses them

| Job | Example tool |
|---|---|
| Install packages | pip, npm, or your ecosystem's package manager |
| Format code | Prettier or Black |
| Check code quality | Built-in IDE/editor diagnostics; ESLint or Pylint when the project uses them |
| Manage passwords | Bitwarden, Google Password Manager, or 1Password |

> **NOTE:** ESLint and Pylint are not automatically required for every student or project. Add them when your language, class, team, or project uses them.

---

## Later — when a project needs it

| Job | Example tool |
|---|---|
| Test APIs | Postman |
| Work with databases | DataGrip |
| Containers | Docker |
| Deploy | Vercel, Netlify, Render, or the platform your project requires |

---

## VS Code extensions

You don't need twenty-five.

**Common useful options:**

- The language extension for what you're learning
- **Prettier** — formatting for supported languages and web projects
- **ESLint** — when a JavaScript/TypeScript project uses ESLint
- **Live Server** — useful for simple HTML/CSS/JavaScript projects
- **Error Lens** — makes diagnostics easier to notice in the editor

> **NOTE:** IntelliJ IDEA already includes many features that VS Code may add through extensions, including code inspections, refactoring tools, and project analysis. Add plugins or extensions when they solve a problem you actually have.

**Everything else:** install it when you hit a problem it solves.
