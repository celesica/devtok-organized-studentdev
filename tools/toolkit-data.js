/* toolkit-data.js — templates and checklists for the Toolkit tab, authored from
   planning/toolkit.md. Prompts are parsed from the md by toolkit.js; these two
   are hand-structured because trees need ftree node arrays and checklists need
   stable per-item ids.

   Tree node format matches build.js ftree():
     ["name"]              a folder (leaf / empty)
     ["name", [children]]  a folder with children
     ["name", "ext"]       a file, drawn with a typed glyph (md/git/env/txt/…)
*/

const TEMPLATES = [
  {
    id: "T1", title: "Studies hierarchy — minimal",
    desc: "For a first-year, or anyone who wants the smallest workable structure.",
    nodes: [["Studies", [["[Your Program]", [["Courses", [["Y1T1", [
      ["[Subject 1]"], ["[Subject 2]"], ["[Subject 3]"],
    ]]]]]]]]],
  },
  {
    id: "T2", title: "Studies hierarchy — standard", recommended: true,
    nodes: [["Studies", [["BS Computer Science", [
      ["Courses", [
        ["Y1T1"], ["Y1T2"],
        ["Y2T1", [
          ["Algorithms and Complexity"],
          ["Life and Works of Rizal"],
          ["Software Engineering"],
        ]],
      ]],
      ["Curriculum"], ["Grade Slips"], ["Graduation Requirements"], ["Organizations"],
    ]]]]],
  },
  {
    id: "T3", title: "Studies hierarchy — detailed",
    desc: "For upper years with thesis, OJT, and scholarship requirements.",
    nodes: [["Studies", [["BS Computer Science", [
      ["Courses", [["Y3T2", [["Software Engineering", [
        ["assignments"], ["lectures"], ["exams"],
      ]]]]]],
      ["Curriculum"], ["Grade Slips"], ["Graduation Requirements"],
      ["Thesis", [["proposal"], ["adviser-feedback"], ["defense"]]],
      ["OJT"], ["Scholarship and Aid"], ["Organizations"],
    ]]]]],
    note: "Thesis <b>code</b> goes in <span class=\"mono\">Development/</span>, not here. This folder holds the school documents.",
  },
  {
    id: "T4", title: "Development hierarchy",
    nodes: [["Development", [
      ["school", [["Y2T1"], ["Y2T2"]]],
      ["learning"], ["personal"], ["hackathons"], ["experiments"], ["archive"],
    ]]],
    bullets: [
      "<span class=\"mono fdir\">school/</span> — code written for classes, by term",
      "<span class=\"mono fdir\">learning/</span> — code written while following courses or tutorials",
      "<span class=\"mono fdir\">personal/</span> — your own projects",
      "<span class=\"mono fdir\">hackathons/</span> — hackathon projects",
      "<span class=\"mono fdir\">experiments/</span> — small tests and ideas",
      "<span class=\"mono fdir\">archive/</span> — projects you no longer actively work on, if you find an archive useful",
    ],
    note: "You do not need every category immediately. Create the ones you actually use.",
  },
  {
    id: "T5", title: "Upskilling hierarchy — by topic", recommended: true,
    nodes: [["Upskilling", [
      ["web-development"], ["cloud"], ["ai-and-data"], ["design"], ["certificates"], ["resources"],
    ]]],
  },
  {
    id: "T5b", title: "Upskilling hierarchy — by platform",
    nodes: [["Upskilling", [
      ["coursera"], ["udemy"], ["youtube"], ["freecodecamp"], ["certificates"],
    ]]],
    note: "Pick one main approach. Mixing both everywhere is what makes things harder to find.",
  },
  {
    id: "T6", title: "Career hierarchy",
    nodes: [["Career", [
      ["resume"], ["certificates"], ["portfolio"],
      ["applications", [["[company-name]"]]],
      ["interview-prep"],
    ]]],
  },
  {
    id: "T7", title: "Project starter structure",
    desc: "Adjust to your language and framework. Not every project needs all of this.",
    nodes: [["project-name", [
      ["src"], ["tests"], ["docs"],
      ["README.md", "md"], [".gitignore", "git"], [".env.example", "env"],
      ["requirements.txt", "txt"],
    ]]],
    note: "Don't force a small exercise to look like a production app. Add structure as the project actually needs it. <span class=\"mono\">requirements.txt</span> can be <span class=\"mono\">package.json</span> for Node projects.",
  },
  {
    id: "T8", title: "README template",
    code: [{ code: `# Project Name

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
3. Copy \`.env.example\` to \`.env\` and fill in your values
4. Run it:
   python main.py

## Notes

Anything a person would trip over. Known issues, things
that aren't finished.

## Built with

List the main tools or frameworks.` }],
    note: "<b>The test:</b> clone or download your own project into an empty folder and set it up using only the README. If you can do that, someone else has a much better chance too.",
  },
  {
    id: "T9", title: ".gitignore starters",
    code: [
      { label: "Python", code: `__pycache__/\n*.pyc\n.venv/\nvenv/\n.env\n.DS_Store` },
      { label: "Node / JavaScript", code: `node_modules/\ndist/\nbuild/\n.env\n.DS_Store` },
      { label: "Java", code: `*.class\ntarget/\nbuild/\n.env\n.DS_Store` },
    ],
    note: "Always keep <span class=\"mono\">.env</span> out of Git when it contains real private values.",
  },
];

// Checklists. Ids are namespaced (k<n>_<i>) so they never collide with the
// section-08 reset checklist or each other. Each renders as its own persistent
// checklist with its own "Reset all".
const CHECKLISTS = [
  {
    id: "CL1", title: "Start of term",
    groups: [
      ["Files", [
        "Create this term's folder in <span class=\"mono\">Studies/Courses/</span>",
        "Add a folder per subject",
        "Create this term's folder in <span class=\"mono\">Development/school/</span> if you have coding classes",
      ]],
      ["Calendar", [
        "Create or use a <span class=\"mono\">School</span> calendar",
        "Add each class as a repeating event for the whole term",
        "Set the correct end date for each recurring class",
        "Put room, instructor, meeting link, and LMS link in the event when useful",
        "Keep major/core courses visually consistent",
        "Keep minor/elective courses visually consistent in a different color family",
        "Give coding practice, self-care, and org activities their own consistent colors if you track them",
        "Add known exams and scheduled presentations as events",
        "Add assignments and work-to-finish as Tasks",
        "Set useful notifications before classes and deadlines",
      ]],
      ["Accounts and access", [
        "Confirm LMS access for every subject",
        "Bookmark or save each subject's LMS link",
        "Check that your school email works",
        "Use your school email for student discounts or perks when appropriate",
      ]],
      ["Notes", [
        "Add this term and current subjects to your notes/dashboard",
      ]],
    ],
  },
  {
    id: "CL2", title: "New project",
    groups: [["", [
      "Give it a clear name",
      "Decide where it belongs in <span class=\"mono\">Development/</span>",
      "Create the project folder",
      "Open the folder in your editor or IDE, not just one file",
      "Initialize Git when the project is worth tracking",
      "Add a <span class=\"mono\">.gitignore</span> before committing generated/private files",
      "Create <span class=\"mono\">README.md</span> when setup or context needs explaining",
      "Add the dependency file your ecosystem uses",
      "If it uses secrets, create <span class=\"mono\">.env</span>, <span class=\"mono\">.env.example</span>, and make sure <span class=\"mono\">.env</span> is ignored",
    ]]],
  },
  {
    id: "CL3", title: "Before pushing to GitHub",
    groups: [["", [
      "No real keys, passwords, tokens, or private credentials in the code",
      "<span class=\"mono\">.env</span> is listed in <span class=\"mono\">.gitignore</span>",
      "Dependency/build folders such as <span class=\"mono\">node_modules/</span> are ignored when appropriate",
      "README explains what the project is and how to run it",
      "Commit messages describe what changed",
      "The project runs from the setup you documented",
    ]]],
  },
  {
    id: "CL4", title: "Project finish",
    groups: [["", [
      "Delete leftover test or scratch files you no longer need",
      "Update the README to match what the project actually does now",
      "Commit and push the final useful changes",
      "Add the deployment link to the README, if there is one",
      "Take screenshots if the project may be useful for your portfolio",
      "Write a few lines on what you learned or what you would improve",
      "If it became portfolio-worthy, add its screenshots/details to <span class=\"mono\">Career/portfolio/</span>",
    ]]],
  },
  {
    id: "CL5", title: "Security and backups",
    groups: [
      ["Accounts", [
        "Set up a password manager",
        "Use unique passwords for important accounts",
        "Turn on biometric unlock on supported devices if you want it",
        "Turn on two-factor authentication for email, GitHub, school portal, and other important accounts",
        "Save recovery codes somewhere safe",
        "Use a personal professional email for long-term professional accounts",
        "Use your school email for school services and eligible student perks",
      ]],
      ["Backups", [
        "<span class=\"mono\">Studies/</span>, <span class=\"mono\">Upskilling/</span>, and <span class=\"mono\">Career/</span> have another copy in cloud storage",
        "Important files also have another copy on an external SSD or second drive when possible",
        "Active coding repositories are not being worked on inside a general cloud-synced folder",
        "Important code is committed and pushed to GitHub",
        "Nothing important exists only on one device",
      ]],
    ],
  },
  {
    id: "CL6", title: "The 20-minute reset",
    groups: [
      ["Files", [
        "Empty or sort Downloads",
        "Clear the Desktop",
        "Move loose documents into the correct term and subject folder",
      ]],
      ["School", [
        "Check your LMS for anything new",
        "Add newly announced deadlines to your calendar or Tasks",
        "Look at the week ahead",
      ]],
      ["Development", [
        "Commit work that should be committed",
        "Push work that needs a remote copy",
        "Delete leftover test files",
      ]],
      ["Upskilling", [
        "File useful new resources",
        "Delete things you realistically won't use",
      ]],
      ["Backups", [
        "Confirm cloud sync is working",
        "Check whether anything important exists only on your laptop",
      ]],
    ],
  },
];

module.exports = { TEMPLATES, CHECKLISTS };
