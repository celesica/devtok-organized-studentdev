/* build.js — regenerate site/index.html + app.css from the Claude Design
   exports, converting the template bindings into plain data attributes that
   site/js/components.js understands. Run from the scratchpad. */
const fs = require("fs");
const MOCKUPS = require("./mockups.js");
const P = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/planning/Session website with tabs/";
const OUT = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/site/";

const guide = fs.readFileSync(P + "Student Dev Guide.dc.html", "utf8");
const toolkit = fs.readFileSync(P + "Toolkit.dc.html", "utf8");

/* ---------- 0. assets ---------- */
/* The header footage. Copied out of planning/ rather than referenced there, so
   site/ stays a self-contained folder that a static host can publish alone. */
const HERO_VIDEO_SRC = P.replace(/Session website with tabs\/$/, "Cozy Desk Loop.mp4");
const HERO_VIDEO = "assets/cozy-desk-loop.mp4";
if (!fs.existsSync(HERO_VIDEO_SRC)) throw new Error("missing header video: " + HERO_VIDEO_SRC);
fs.mkdirSync(OUT + "assets", { recursive: true });
fs.copyFileSync(HERO_VIDEO_SRC, OUT + HERO_VIDEO);

/* Section 03, Layer 3 — a screen recording of opening a folder in the editor.
   Shown as a small looping preview (desktop only) that opens a controls modal. */
const IDE_VIDEO_SRC = P.replace(/Session website with tabs\/$/, "Opening a Folder in the IDE.mp4");
const IDE_VIDEO = "assets/opening-a-folder.mp4";
if (!fs.existsSync(IDE_VIDEO_SRC)) throw new Error("missing IDE video: " + IDE_VIDEO_SRC);
fs.copyFileSync(IDE_VIDEO_SRC, OUT + IDE_VIDEO);

/* Section 03, Layer 3 — a real screenshot of the project open in the warm-themed
   editor, used as the "Open the project folder" preview (opens enlarged). */
const IDE_SHOT_SRC = P.replace(/Session website with tabs\/$/, "Warm Arcade IDE.png");
const IDE_SHOT = "assets/warm-ide.png";
if (!fs.existsSync(IDE_SHOT_SRC)) throw new Error("missing IDE screenshot: " + IDE_SHOT_SRC);
fs.copyFileSync(IDE_SHOT_SRC, OUT + IDE_SHOT);

/* Section 07 — a real screenshot of the owner's multi-project workspace
   (Antigravity, similar to a VS Code multi-root workspace): one window titled
   "ine (Workspace)" holding two separate project folders. Enlargeable. */
const WS_SHOT_SRC = P.replace(/Session website with tabs\/$/, "workspace.png");
const WS_SHOT = "assets/workspace.png";
if (!fs.existsSync(WS_SHOT_SRC)) throw new Error("missing workspace screenshot: " + WS_SHOT_SRC);
fs.copyFileSync(WS_SHOT_SRC, OUT + WS_SHOT);

/* Section 04, Step 2 — a screen recording of labelling a class in the calendar,
   shown as a preview beside the note that opens enlarged in the modal. */
const LABEL_VIDEO_SRC = P.replace(/Session website with tabs\/$/, "Label your class schedule.mp4");
const LABEL_VIDEO = "assets/label-your-class.mp4";
if (!fs.existsSync(LABEL_VIDEO_SRC)) throw new Error("missing label video: " + LABEL_VIDEO_SRC);
fs.copyFileSync(LABEL_VIDEO_SRC, OUT + LABEL_VIDEO);

/* Section 06 — real screenshots of the owner's Notion (the Academia template),
   shown inside a toggle as tall, scrollable previews that open full-size in a
   new tab. Numbered by the order the owner wants them seen. Sources live under
   planning/notion/; copied into site/assets so the build stays self-contained. */
const NOTION_DIR = P.replace(/Session website with tabs\/$/, "notion/");
const NOTION_SHOTS = [
  ["1 - Courses view.png", "assets/notion-courses.png", "Courses view",
    "The Courses database — one row per class, with type, credits, instructor, status, and links to the LMS and course folder."],
  ["2 - Academia view.png", "assets/notion-academia.png", "Academia homepage",
    "The Academia dashboard — courses, the weekly timetable, planning pages, and a colour legend brought together on one page."],
  ["3 - Upskilling view.png", "assets/notion-upskilling.png", "Upskilling view",
    "An upskilling view — tracking learning outside the curriculum alongside the school system."],
];
NOTION_SHOTS.forEach(([srcName, dest]) => {
  const src = NOTION_DIR + srcName;
  if (!fs.existsSync(src)) throw new Error("missing Notion screenshot: " + src);
  fs.copyFileSync(src, OUT + dest);
});

/* ---------- 1. styles ---------- */
function styleOf(src) {
  const m = src.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1].trim() : "";
}
const guideCSS = styleOf(guide);
const tkCSS = styleOf(toolkit);

/* ---------- 2. binding conversion ---------- */
// suffix letter after the group id decides how a value compares to state
function modeFor(group, suffix) {
  if (suffix === "r") return "gte-cur"; // stack rows accumulate, current highlighted
  if (suffix === "f") return "gte";     // event fields accumulate
  return "eq";                          // buttons, chips, panels
}

function convert(html) {
  let s = html;

  // A slot sits inside a fixed-height box sized for a screenshot. A built mockup
  // sizes itself, so drop that wrapper when we substitute one.
  s = s.replace(/<div style="height:\d+px">\s*<image-slot([^>]*)>(?:<\/image-slot>)?\s*<\/div>/g, (m, attrs) => {
    const id = (attrs.match(/id="([^"]+)"/) || [])[1];
    if (id && MOCKUPS[id]) return MOCKUPS[id].trim();
    return m;                                  // no mockup: keep the sized box
  });

  // <image-slot> -> a built mockup when one exists, else a labelled drop zone
  s = s.replace(/<image-slot([^>]*)>(<\/image-slot>)?/g, (m, attrs) => {
    const id = (attrs.match(/id="([^"]+)"/) || [])[1];
    const ph = (attrs.match(/placeholder="([^"]*)"/) || [])[1] || "Screenshot";
    return (id && MOCKUPS[id]) ? MOCKUPS[id].trim() : `<div class="imgslot"><span>${ph}</span></div>`;
  });
  s = s.replace(/<\/image-slot>/g, "");

  // dotted bindings inside class="" -> data-st / data-on / data-mode
  s = s.replace(/class="([^"]*?)\{\{(c\d+)([a-z]*)\.([A-Za-z0-9_]+)\}\}([^"]*?)"/g,
    (m, pre, group, suffix, val, post) => {
      const cls = (pre + " " + post).replace(/\s+/g, " ").trim();
      return `class="${cls}" data-st="${group}" data-on="${val}" data-mode="${modeFor(group, suffix)}"`;
    });

  // checklist rows: class="ckrow {{ckc.f1}}" data-id="f1"
  s = s.replace(/class="([^"]*?)\{\{ckc\.([A-Za-z0-9_]+)\}\}([^"]*?)"/g,
    (m, pre, id, post) => {
      const cls = (pre + " " + post).replace(/\s+/g, " ").trim();
      return `class="${cls}" data-ck="${id}"`;
    });

  // bare reveal spans: class="{{c6r}}" -> hidden until group is "on"
  s = s.replace(/class="([^"]*?)\{\{(c\d+)r\}\}([^"]*?)"/g,
    (m, pre, group, post) => {
      const cls = (pre + " " + post + " hid").replace(/\s+/g, " ").trim();
      return `class="${cls}" data-st="${group}" data-on="on" data-mode="reveal"`;
    });

  // Badges read as labels on a line, so a badge that trails its sentence moves
  // to the front of the element it sits in.
  // The body must not contain the element's own closing tag, or the match runs
  // past the end of the element and drags a badge in from a later block.
  s = s.replace(/(<p(?:\s[^>]*)?>)((?:(?!<\/p>)[\s\S])*?)\s*(<span class="wa-badge[^"]*">[^<]*<\/span>)\s*(<\/p>)/g,
    (m, open, body, badge, close) => open + badge + " " + body.trim() + close);
  s = s.replace(/(<li(?:\s[^>]*)?>)((?:(?!<\/li>)[\s\S])*?)\s*(<span class="wa-badge[^"]*">[^<]*<\/span>)\s*(<\/li>)/g,
    (m, open, body, badge, close) => open + badge + " " + body.trim() + close);
  // the annotated tree rows are plain divs, so they need their own pass
  s = s.replace(/(<div class="note">)((?:(?!<\/div>)[\s\S])*?)\s*(<span class="wa-badge[^"]*">[^<]*<\/span>)\s*(<\/div>)/g,
    (m, open, body, badge, close) => open + badge + " " + body.trim() + close);

  // counters and button labels
  s = s.replace(/\{\{(c\d+)n\}\}/g, (m, g) => `<span data-count="${g}"></span>`);
  s = s.replace(/\{\{ckN\}\}/g, `<span data-ck-count></span>`);
  s = s.replace(/\{\{(c\d+)btn\}\}/g, (m, g) => `<span data-label="${g}">Reveal</span>`);
  s = s.replace(/\{\{cpl\.([A-Za-z0-9_]+)\}\}/g, "Copy");

  // handlers -> data-act
  const acts = { pick: "pick", rv4: "rv", rst: "rst", rck: "rck", nxt: "nxt", bck: "bck", copy: "copy", tck: "tck" };
  s = s.replace(/\s*onClick="\{\{([a-zA-Z0-9]+)\}\}"/g, (m, h) => acts[h] ? ` data-act="${acts[h]}"` : "");

  // leftovers
  s = s.replace(/\s*open="\{\{expAll\}\}"/g, "");
  s = s.replace(/\s*data-c\d+="\{\{[^}]*\}\}"/g, "");
  s = s.replace(/\{\{theme\}\}/g, "dark");
  s = s.replace(/\s*data-dc-tpl="\d+"/g, "");
  // any remaining mustache in a class -> drop it
  s = s.replace(/\{\{[^}]*\}\}/g, "");
  s = s.replace(/class="\s*"/g, "");

  // Reveal cards ("Where does this go?") carried their base class inside the
  // {{c4c.x}} binding, which the line above emptied out — restore .ibtn so the
  // answer stays hidden until the card is clicked.
  s = s.replace(/<button(\s+[^>]*?data-act="rv"[^>]*?)>/g, (m, attrs) =>
    /class="/.test(attrs) ? m : `<button class="ibtn"${attrs}>`);

  s = numberedTableToOl(s);

  return s;
}

/* Keep hyphenated words whole. A hyphen is a normal wrap opportunity, so
   "self-learning" can split across lines at the hyphen. Swapping the ASCII
   hyphen for a non-breaking hyphen (U+2011) — visually identical — makes the
   word wrap as a unit. Only prose is touched: <pre> (file trees, code),
   <script>, <style>, and <table> (filename examples that must stay breakable so
   they don't overflow a phone) are stashed first, and the swap runs only on
   text nodes (between > and <), never inside a tag's attributes. */
function nbHyphenate(html) {
  const stash = [];
  html = html.replace(/<(pre|script|style|table)\b[\s\S]*?<\/\1>/g, (m) => {
    stash.push(m);
    return ` S${stash.length - 1} `;
  });
  html = html.replace(/>([^<]+)</g, (m, text) =>
    ">" + text.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, "$1‑$2") + "<");
  html = html.replace(/ S(\d+) /g, (m, i) => stash[+i]);
  return html;
}

/* A .tbl whose every row is a mono numeral followed by one text cell is a
   numbered index, not tabular data — the export built it as a table only
   because it predates the list component. Render it with the design system's
   numbered list (.wa-list--ol: rose mono numerals) instead. The all-numeric
   test leaves the filename-example tables (fix, final, …) as tables. */
function numberedTableToOl(html) {
  return html.replace(/<table class="tbl">\s*(?:<tbody>)?([\s\S]*?)(?:<\/tbody>)?\s*<\/table>/g, (whole, body) => {
    if (/<th\b/.test(body)) return whole;
    const rows = body.match(/<tr>[\s\S]*?<\/tr>/g) || [];
    if (rows.length < 2) return whole;
    const items = [];
    for (const row of rows) {
      const m = row.match(/^<tr><td class="mono">\d{1,3}<\/td><td>([\s\S]*?)<\/td><\/tr>$/);
      if (!m) return whole;                       // any non-numbered row: keep the table
      items.push(m[1]);
    }
    return `<ol class="wa-list wa-list--ol">\n` +
      items.map(t => `<li>${t}</li>`).join("\n") +
      `\n</ol>`;
  });
}

/* ---------- 3. sections ---------- */
const ROUTES = [
  ["00-start", "00 Start here"],
  ["01-folders", "01 Your four main folders"],
  ["02-school", "02 Organizing your school files"],
  ["03-projects", "03 Your coding projects"],
  ["04-calendar", "04 Your calendar and tasks"],
  ["05-protecting", "05 Protecting your work"],
  ["06-notion", "06 Notion for notes and school"],
  ["07-workspace", "07 Setting up your coding workspace"],
  ["08-reset", "08 The 20-minute reset"],
  ["09-groups", "09 Group projects"]
];
const TAB_LABELS = [
  ["00", "Start"], ["01", "Folders"], ["02", "School"], ["03", "Projects"],
  ["04", "Calendar"], ["05", "Protect"], ["06", "Notion"], ["07", "Workspace"],
  ["08", "Reset"], ["09", "Groups"]
];


/* The document header the copy doc specifies: a gold subtitle, the meta line,
   and a labelled TL;DR, over the looping desk footage. The export had trimmed
   the first three. Sourced from planning/site-copy-all-sections.md, which is
   the authority for copy.

   The video is decoration, not content: muted, looping, autoplaying, with no
   controls, and marked aria-hidden. Everything readable sits above it on the
   plum wash, so the header still reads if the file never loads. */
const HERO = `<div class="band hero-band">
<video class="hero-vid" data-src="${HERO_VIDEO}" autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>
<div class="hero-wash" aria-hidden="true"></div>
<script>
/* Load the header footage only where it is shown. The video is display:none
   below 760px, but a bare src would still be fetched — 2.5 MB a phone reader
   never sees. Assigning src from data-src behind a media query keeps that off
   mobile data. Runs inline during parse so playback still starts immediately. */
(function(){var v=document.currentScript.parentNode.querySelector('.hero-vid');
if(v&&window.matchMedia('(min-width:761px)').matches){v.src=v.dataset.src;}})();
</script>
<div class="in hero-in">
<div class="eyebrow"><span>Field guide</span></div>
<h1 class="h1 hero-title">Get Organized as a <br class="hbr">Student Developer</h1>
<p class="hero-sub">Build a Better System for Classes, Projects, and <br class="hbr">Your Coding Workspace</p>
<p class="meta">Prepped by: Jazzy &middot; DevTok Pinas</p>
<p class="hero-lede">This guide walks you through a practical way to organize your school files, coding projects, self-learning, deadlines, and development workspace. It's built for CS, IT, engineering, and other students who write code as part of school or on their own. Use the system as a starting point, keep what works for you, and adjust it as your needs change.</p>
<div class="tldr"><span class="k">TL;DR</span><p>Having a simple system saves time, energy, and brainpower. Start with four main folders: <b>Studies, Development, Upskilling, and Career</b>, then use clear rules for your files, deadlines, code, and weekly reset. Build the basic version first and improve it as you go.</p></div>
</div></div>`;

function sectionBody(label) {
  // Sections 02–05 are rebuilt from their markdown rather than the export.
  if (label === "02 Organizing your school files") return nbHyphenate(SECTION_02_BODY);
  if (label === "03 Your coding projects") return nbHyphenate(SECTION_03_BODY);
  if (label === "04 Your calendar and tasks") return nbHyphenate(SECTION_04_BODY);
  if (label === "05 Protecting your work") return nbHyphenate(SECTION_05_BODY);
  if (label === "06 Notion for notes and school") return nbHyphenate(SECTION_06_BODY);
  if (label === "07 Setting up your coding workspace") return nbHyphenate(SECTION_07_BODY);
  const re = new RegExp('<section class="sec" data-screen-label="' + label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '">([\\s\\S]*?)</section>');
  const m = guide.match(re);
  if (!m) throw new Error("section not found: " + label);
  let body = convert(m[1]);
  if (label === "00 Start here") {
    const before = body;
    body = body.replace(/<div class="band"><div class="in">\s*<div class="eyebrow"><span>Field guide<\/span>[\s\S]*?<\/div><\/div>/, HERO);
    if (body === before) throw new Error("hero block not matched — check the 00 header markup");
    body = applyStartCopy(body);
  }
  if (label === "01 Your four main folders") {
    body = applyFoldersCopy(body);
  }
  return nbHyphenate(body);
}

/* Owner-directed copy for the Start page, applied over the export. Each swap
   throws if its anchor is gone, so a changed export surfaces at build time
   rather than silently keeping stale words. Mirrored in
   planning/site-copy-all-sections.md. */
function applyStartCopy(body) {
  const swap = (re, replacement, name) => {
    const next = body.replace(re, replacement);
    if (next === body) throw new Error("Start copy not matched: " + name);
    body = next;
  };

  swap(
    /<h2 class="h2">Why this matters<\/h2>\s*<ul class="wa-list wa-list--ul">[\s\S]*?<\/ul>/,
    `<h2 class="h2">Why I think this matters</h2>
<p>As technical students, we already have a lot competing for our attention. A clear system reduces the number of small decisions you have to make every day and gives your school work, projects, and responsibilities a predictable place to go.</p>
<p>Without one, small problems start adding up:</p>
<ul class="wa-list wa-list--ul">
<li>You waste time looking for files you know you saved somewhere.</li>
<li>Good projects get buried inside old semester folders.</li>
<li>Assignment deadlines live only inside your LMS.</li>
<li>You redo work because you can't find what you already made.</li>
<li>Coding projects become harder to manage as you start using Git, GitHub, dependencies, and API keys.</li>
<li>Projects worth showing for internships or jobs can be difficult to find later.</li>
</ul>
<p>A simple system makes all of this easier to manage.</p>`,
    "why-this-matters"
  );

  swap(
    /<h2 class="h2">What you'll have at the end<\/h2>\s*<ul class="wa-list wa-list--ul">[\s\S]*?<\/ul>/,
    `<h2 class="h2">What you'll have at the end</h2>
<p>By the end of this guide, you'll have:</p>
<ul class="wa-list wa-list--ul">
<li>Four main folders with a clear purpose for each one</li>
<li>A school structure you can reuse every term</li>
<li>A better understanding of how coding projects are organized</li>
<li>A calendar that reminds you before things are due</li>
<li>A basic password and backup setup</li>
<li>A place for notes and school organization</li>
<li>A cleaner coding workspace</li>
<li>A reset routine for when things drift</li>
</ul>`,
    "what-youll-have"
  );

  swap(
    "Jazzy's real setup — Studies, Development, Upskilling, Career.",
    `<span class="cap-tag">Recommended folder setup</span> — Studies, Development, Upskilling, Career.`,
    "folder-setup-caption"
  );

  swap(
    /<div class="closer"><span class="k">UNDERSTAND<\/span><p>[\s\S]*?<\/p><\/div>/,
    `<div class="closer"><span class="k">UNDERSTAND</span><p>You don't need a system that stays perfectly organized all semester. You just need one that makes it easy to know <b>where something belongs</b> and easy to clean things up when you fall behind.</p></div>`,
    "understand-closer"
  );

  return body;
}

/* Interactive, branded folder trees — native <details>/<summary> so they
   expand on click with no JS and work from file://. Collapsed by default; a
   small "Collapse | Expand" toolbar (handled in components.js) opens or closes
   the whole tree at once. A node is [name] for a leaf, or [name, [children]]
   for a folder. Every row carries the design system's folder glyph (.ficon). */
// A node is [name] (empty folder), [name, [children]] (folder), or
// [name, "pdf"|"md"] (a file, drawn with a document glyph and type tag).
const ftRow = (name) =>
  `<span class="ftcaret" aria-hidden="true"></span><span class="ficon" aria-hidden="true"></span><span class="fname">${name}</span>`;
const ftFileRow = (name, ext) =>
  `<span class="ftcaret" aria-hidden="true"></span><span class="fdoc fdoc--${ext}" data-ext="${ext.toUpperCase()}" aria-hidden="true"></span><span class="fname">${name}</span>`;
function ftNodes(nodes, root, open) {
  const items = nodes.map((n) => {
    const second = n[1];
    if (Array.isArray(second) && second.length) {
      return `<li><details class="ftfolder"${open ? " open" : ""}><summary class="ftrow">${ftRow(n[0])}</summary>${ftNodes(second, false, open)}</details></li>`;
    }
    if (typeof second === "string") {
      return `<li class="ftleaf">${ftFileRow(n[0], second)}</li>`;
    }
    return `<li class="ftleaf">${ftRow(n[0])}</li>`;
  }).join("");
  return `<ul class="ftkids${root ? " ftroot" : ""}">${items}</ul>`;
}
// opts.open renders every folder expanded; opts.bare drops the Collapse|Expand
// toolbar (used for the small, already-open illustrative trees in section 03).
function ftree(nodes, label, opts) {
  opts = opts || {};
  const tools = opts.bare ? "" :
    `<div class="fttools"><button class="fttool" type="button" data-act="tcol">Collapse</button><span class="ftsep" aria-hidden="true">|</span><button class="fttool" type="button" data-act="texp">Expand</button></div>`;
  return `<div class="ftree" role="group" aria-label="${label}">
${tools}${ftNodes(nodes, true, opts.open)}
</div>`;
}

// Studies — a real first term (BSIT-1107, supplied by a student) under Y1T1.
const TREE_STUDIES = ftree([
  ["Studies", [
    ["BS Computer Science", [
      ["Courses", [
        ["Y1T1", [
          ["CC 100 - Introduction to Computing"],
          ["CC 101 - Computer Programming"],
          ["GEd 101 - Understanding the Self"],
          ["GEd 102 - Mathematics in the Modern World"],
          ["GEd 105 - Readings in Philippine History"],
          ["MATH 101 - Differential Calculus"],
          ["NSTP 111 - National Service Training Program 1"],
          ["PATHFit 1 - Movement Competency Training"],
        ]],
        ["Y1T2"],
        ["Y2T1"],
        ["Y2T2"],
      ]],
      ["Curriculum"],
      ["Grade Slips"],
      ["Graduation Requirements"],
      ["Organizations"],
    ]],
  ]],
], "The Studies folder");

const TREE_DEV = ftree([
  ["Development", [
    ["school", [["Y2T1"], ["Y2T2"]]],
    ["learning"],
    ["personal"],
    ["hackathons"],
    ["experiments"],
    ["archive"],
  ]],
], "The Development folder");

const TREE_UPT = ftree([
  ["Upskilling", [
    ["web-development", [["freecodecamp"], ["coursera"], ["youtube"]]],
    ["cloud", [["aws"], ["coursera"]]],
    ["ai-and-data", [["deeplearning-ai"], ["youtube"]]],
    ["design"],
    ["certificates"],
  ]],
], "Upskilling organized by topic");

const TREE_UPP = ftree([
  ["Upskilling", [
    ["coursera", [["web-development"], ["ai-and-data"]]],
    ["udemy"], ["youtube"], ["freecodecamp"], ["certificates"],
  ]],
], "Upskilling organized by platform");

const careerApp = (company, hasCover) => [company, [
  ["job-posting.pdf", "pdf"],
  ["resume.pdf", "pdf"],
  ...(hasCover ? [["cover-letter.pdf", "pdf"]] : []),
  ["notes.md", "md"],
]];
const TREE_CAREER = ftree([
  ["Career", [
    ["resume"],
    ["certificates"],
    ["portfolio"],
    ["applications", [
      careerApp("accenture", true),
      careerApp("ibm", false),
      careerApp("canva", true),
    ]],
    ["interview-prep"],
  ]],
], "The Career folder");

/* Owner-supplied full rewrites of the Upskilling and Career panels (from the
   Career section markdown and the Upskilling brief). */
const UPSKILLING_PANEL = `<div class="fpanel" data-st="c1" data-on="ups" data-mode="eq">
<h3 class="h3">Upskilling</h3>
<p>Learning you do outside your formal curriculum. This folder holds the material you learn from, while Development holds the code you write while learning.</p>
<p>For example, if you take a React course:</p>
<ul class="wa-list wa-list--ul">
<li>Course notes → <b>Upskilling</b></li>
<li>Downloaded slides → <b>Upskilling</b></li>
<li>Resources → <b>Upskilling</b></li>
<li>Certificate → <b>Upskilling</b></li>
<li>React project you build during the course → <b>Development</b></li>
</ul>
<div class="chiprow" style="margin-top:28px">
<button class="chip" data-st="c3" data-on="topic" data-mode="eq" data-k="c3" data-v="topic" data-act="pick">By topic <span class="wa-badge wa-badge--amber">RECOMMENDED</span></button>
<button class="chip" data-st="c3" data-on="plat" data-mode="eq" data-k="c3" data-v="plat" data-act="pick">By platform</button>
</div>
<div class="fpanel" data-st="c3" data-on="topic" data-mode="eq" style="margin:0">
<p style="font-size:14.5px" class="mut">This works well if you usually remember <b>what you were learning first</b>, then where you learned it.</p>
${TREE_UPT}
</div>
<div class="fpanel" data-st="c3" data-on="plat" data-mode="eq" style="margin:0">
<p style="font-size:14.5px" class="mut">This works if you usually remember <b>the platform you learned on first</b> — the topics then sit inside each one.</p>
${TREE_UPP}
</div>
<div class="note"><span class="nl">NOTE</span>Pick a structure that feels natural to you and stay reasonably consistent.<span class="np">There isn't one correct setup. The goal is to make your learning materials easy to find later.</span></div>
</div>`;

const CAREER_PANEL = `<div class="fpanel" data-st="c1" data-on="car" data-mode="eq">
<h3 class="h3">Career</h3>
<p>Documents and material you'll need for internships, jobs, and other professional opportunities.</p>
${TREE_CAREER}
<ul class="wa-list wa-list--ul">
<li><span class="mono fdir">resume/</span> — your master resume and reusable resume versions</li>
<li><span class="mono fdir">certificates/</span> — certificates, credentials, and achievements worth keeping for applications</li>
<li><span class="mono fdir">portfolio/</span> — project screenshots, descriptions, links, case studies, and other work you may want to show employers</li>
<li><span class="mono fdir">applications/</span> — one folder per company, with the files and notes related to that application</li>
<li><span class="mono fdir">interview-prep/</span> — interview questions, technical review notes, company research, and other preparation materials</li>
</ul>
<p>A lot of students only create a Career folder when application season starts. It's easier to build it gradually while you're still in school.</p>
<hr class="hr">
<h3 class="h3 subh">Organizing your applications</h3>
<p>For each internship or job application, create a folder for the company or role.</p>
<p>Inside it, keep the exact materials connected to that application:</p>
<ul class="wa-list wa-list--ul">
<li><span class="mono fdir">job-posting.pdf</span> — save a copy of the original posting in case it gets removed later</li>
<li><span class="mono fdir">resume.pdf</span> — the exact resume version you submitted</li>
<li><span class="mono fdir">cover-letter.pdf</span> — the cover letter you sent, if one was required</li>
<li><span class="mono fdir">notes.md</span> — recruiter details, interview dates, application status, questions, or anything else you want to remember</li>
</ul>
<p>This becomes especially useful once you start applying to several companies. You can quickly see what you submitted, what the role originally asked for, and any notes you made along the way.</p>
<div class="pn"><span class="k">SIDE NOTE</span><p><b>Prefer tracking applications visually?</b> You can also create an application tracker in Notion with fields like company, role, status, date applied, interview dates, and follow-up dates. You can attach or link the same job posting, resume, cover letter, and notes there while still keeping the actual files organized in your Career folder.</p></div>
</div>
<p class="mut fcaveat">This system is specifically for your student-developer life. Personal files like finances, family documents, photos, and hobbies do not have to fit inside these four folders.</p>`;

// ---- Section 02: Organizing your school files (rebuilt from the section-02 md) ----
const schoolSubject = (name) => [name, [["lectures"], ["assignments"], ["exams"]]];
const TREE_SCHOOL = ftree([
  ["Studies", [
    ["BS Computer Science", [
      ["Courses", [
        ["Y1T1"],
        ["Y1T2"],
        ["Y2T1", [
          schoolSubject("Algorithms and Complexity"),
          schoolSubject("Life and Works of Rizal"),
          schoolSubject("Software Engineering"),
        ]],
      ]],
      ["Curriculum"],
      ["Grade Slips"],
      ["Graduation Requirements"],
      ["Organizations"],
    ]],
  ]],
], "A term's school folder structure");

// The naming table keeps the export's tap-to-reveal (c6 group).
const SCHOOL_NAMING_TABLE = `<div class="fpanel on">
<table class="tbl"><thead><tr><th>Instead of</th><th>Try</th></tr></thead><tbody>
<tr><td class="mono">Assignment final v2.docx</td><td class="mono" style="color:var(--amber-glow)"><span class="hid" data-st="c6" data-on="on" data-mode="reveal">2026-08-15-algorithms-assignment.docx</span></td></tr>
<tr><td class="mono">Aug 15 notes</td><td class="mono" style="color:var(--amber-glow)"><span class="hid" data-st="c6" data-on="on" data-mode="reveal">2026-08-15-lecture-notes.md</span></td></tr>
<tr><td class="mono">stuff2</td><td class="mono" style="color:var(--amber-glow)"><span class="hid" data-st="c6" data-on="on" data-mode="reveal">midterm-reviewer</span></td></tr>
</tbody></table>
<div class="ctl"><button class="wa-btn wa-btn--secondary wa-btn--sm" data-k="c6" data-v="on" data-act="pick"><span data-label="c6">Reveal</span></button></div>
</div>`;

const SECTION_02_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>02 · organizing your school files</span><span class="lvl">FOUNDATION</span></div>
<h1 class="h1">Organizing your school files</h1>
<p class="cover"><b>What this section covers:</b> A reusable folder structure for coursework, a simple naming convention, and what to do if you already have years of scattered files.</p>
<p class="cover"><b>Why it matters:</b> School produces a lot of files every term. Setting up a predictable structure once is easier than deciding where every lecture, assignment, and reviewer belongs later.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">The structure</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> A simple structure is <b>Program → Term → Subject</b>.</p>
${TREE_SCHOOL}
<p>This works well because school naturally runs by term.</p>
<p>Inside each subject, keep the structure as simple as you can:</p>
<ul class="wa-list wa-list--ul">
<li>Create subfolders like <span class="mono flit">lectures/</span>, <span class="mono flit">assignments/</span>, and <span class="mono flit">exams/</span> <b>only when they help you find things faster</b>.</li>
<li>If a subject only has a few files, it's completely fine to keep them directly inside the subject folder.</li>
<li>You don't need every subject to have the exact same subfolders.</li>
<li>The structure should make your files easier to find — <b>not give you more folders to maintain</b>.</li>
</ul>
<details class="exp"><summary>Term-first vs subject-first</summary><div class="expb">
<p><b>Term-first</b> keeps all of your subjects from one semester together. This is usually the easiest approach because your school year already works this way.</p>
<p><b>Subject-first</b> can make sense if you want to keep the same subject together across different terms, especially if you retake courses.</p>
<p>Use whichever structure matches how you naturally look for files.</p>
</div></details>
</div></div><div class="band"><div class="in"><h2 class="h2">Naming files</h2>
<p>Name files based on what will still make sense when you look for them several months later.</p>
${SCHOOL_NAMING_TABLE}
<p>A few useful habits:</p>
<ul class="wa-list wa-list--ul">
<li><b>Use dates as <span class="mono flit">YYYY-MM-DD</span></b> when the date matters.</li>
<li><b>Use descriptive names.</b> The filename should tell you what the file is.</li>
<li><b>For coding projects and terminal work, avoid messy filenames.</b> Dashes or other consistent naming conventions are easier to work with.</li>
</ul>
<p>For example: <span class="mono flit" style="overflow-wrap:anywhere">2026-08-15-algorithms-assignment.pdf</span></p>
<div class="closer"><span class="k">GOAL</span><p>Future You should be able to understand the filename without opening it.</p></div>
</div></div><div class="band"><div class="in"><h2 class="h2">What happens at the end of a term</h2>
<ul class="wa-list wa-list--ul">
<li><b>Leave the finished term where it is.</b> It's already organized by semester, so there's no need to move everything again.</li>
<li><b>Create the next term folder when a new semester starts</b> and begin using that one.</li>
<li><b>Older coursework naturally moves out of the way</b> as you start working inside the new term.</li>
<li><b>Keep previous terms accessible.</b> You may still want old notes, reviewers, assignments, or reference material later.</li>
<li><b>Coding projects are different.</b> They don't always end on a semester schedule, so <span class="mono amber">Development/</span> can still have its own <span class="mono flit">archive/</span> for projects you're no longer actively working on.</li>
</ul>
<p>The goal is to avoid creating an extra cleanup step at the end of every semester.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">If you already have years of scattered files</h2>
<p>Don't feel like you need to reorganize everything you've ever saved before you can start.</p>
<p>A faster approach:</p>
<ol class="wa-list wa-list--ol">
<li>Create a folder such as <span class="mono flit">_UNSORTED_2026-08</span></li>
<li>Move loose files into it</li>
<li>Build the clean structure beside it</li>
<li>Start using the new structure from now on</li>
<li>When you need an old file, move it into the correct place then</li>
</ol>
<p>This gives you a clean starting point without turning organization into a weekend-long project.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li><span class="flit">Program → Term → Subject</span> is a simple structure you can reuse.</li>
<li>Create subfolders only when they actually help.</li>
<li>Use descriptive filenames and <span class="mono flit">YYYY-MM-DD</span> when dates matter.</li>
<li>If your old files are already messy, separate the backlog and start clean.</li>
</ul>
<div class="closer"><span class="k">DO</span><p>Set up the folders for your current term first. You don't need to reorganize your entire degree today.</p></div>
</div></div>`;

// ---- Section 03: Your coding projects (rebuilt from the section-03 md) ----

// The four structure trees, rendered expanded and toolbar-free so the files
// read at a glance. Every file carries a designed type glyph (py/md/txt/json,
// plus the .gitignore and .env dotfiles).
const TREE_S03_EX = ftree([["rename-practice.py", "py"]],
  "A short exercise: a single file", { open: true, bare: true });
const TREE_S03_AS = ftree([
  ["algorithms-mp1", [["main.py", "py"], ["README.md", "md"]]],
], "A course assignment: one folder", { open: true, bare: true });
const TREE_S03_PF = ftree([
  ["schedule-tracker", [
    ["src"], ["tests"], ["README.md", "md"],
    [".gitignore", "git"], [".env.example", "env"], ["requirements.txt", "txt"],
  ]],
], "A portfolio project", { open: true, bare: true });
const TREE_S03_TM = ftree([
  ["capstone-app", [
    ["src"], ["tests"], ["docs"], ["README.md", "md"],
    [".gitignore", "git"], [".env.example", "env"], ["package.json", "json"],
  ]],
], "A team project", { open: true, bare: true });

// Layer 2's worked example — the same portfolio structure, shown inside the
// stack so "a project is a folder that contains everything to run" is concrete.
const TREE_S03_L2 = ftree([
  ["schedule-tracker", [
    ["src"], ["tests"], ["README.md", "md"],
    [".gitignore", "git"], [".env.example", "env"], ["requirements.txt", "txt"],
  ]],
], "A folder that has everything it needs to run", { open: true, bare: true });

// Layer 3's live VS Code demo: one built .vsc mock that swaps between "open one
// file" and "open the project folder" — the interactive answer to what changes
// when you open the whole workspace. c32, defaults to the file view.
const S03_VSCODE = `<p class="mut" style="font-size:14px;margin:2px 0 10px">Try both — the same project, opened two ways.</p>
<div class="chiprow">
<button class="chip" type="button" data-act="pick" data-k="c32" data-v="file" data-st="c32" data-on="file" data-mode="eq">Open one file</button>
<button class="chip" type="button" data-act="pick" data-k="c32" data-v="folder" data-st="c32" data-on="folder" data-mode="eq">Open the project folder</button>
</div>
<div class="fpanel" data-st="c32" data-on="file" data-mode="eq">
<div class="vsc solo" role="img" aria-label="VS Code with a single file open and no sidebar">
<div class="vtop"><span>main.py</span></div>
<div class="vmain"><div class="vedit">1&nbsp;&nbsp;print("hello")<br>2<br>3</div></div>
</div>
<p class="mut" style="font-size:14px;margin:8px 0 0">One document. Your editor has limited context about the rest of the project.</p>
</div>
<div class="fpanel" data-st="c32" data-on="folder" data-mode="eq">
<button class="idethumb" type="button" data-act="openimg" data-isrc="${IDE_SHOT}" data-mlabel="The project open in the editor — file tree, editor, terminal and Source Control" aria-label="Enlarge the editor screenshot">
<img class="idethumb-img" src="${IDE_SHOT}" alt="The student-dev-organized project open in the editor: the file tree in the sidebar, router.js in the editor, the Source Control panel, and a terminal." loading="lazy" decoding="async">
<span class="vdemo-badge"><span class="vdemo-exp" aria-hidden="true"></span>Enlarge</span>
</button>
<p class="mut" style="font-size:14px;margin:8px 0 0">The full file tree, project-wide search, a terminal at the project location, and Source Control that can see the repository.</p>
</div>`;

// "Inside a project" — a clickable catalogue. Click a file or folder to reveal
// what it is for. Descriptions are verbatim from the section-03 md. c30.
const S03_INSIDE_ITEMS = [
  ["src", "dir", "Where the main source code usually lives, instead of keeping every code file loose in the project root."],
  ["tests", "dir", "Automated tests or test files used to check that the code behaves as expected."],
  ["docs", "dir", "Longer documentation, diagrams, technical notes, or other project documentation."],
  ["README.md", "md", "The first explanation of the project: what it does, how to set it up, and how to run it."],
  [".gitignore", "git", "Tells Git which files or folders should <b>not</b> be tracked — such as generated files, dependencies, local settings, or secrets."],
  [".env", "env", "A local file that commonly stores environment variables such as API keys or database URLs. The real <span class=\"mono\">.env</span> should not be committed."],
  [".env.example", "env", "Shows which environment variables the project expects, without including the real private values."],
  ["requirements.txt", "txt", "A common Python dependency file, listing the packages the project needs so someone else can install the same ones."],
  ["package.json", "json", "Commonly used in JavaScript / Node.js projects for dependencies, project metadata, and scripts."],
];
function s03Inside() {
  const glyph = (name, kind) => kind === "dir"
    ? `<span class="ficon" aria-hidden="true"></span>`
    : `<span class="fdoc fdoc--${kind}" data-ext="${kind.toUpperCase()}" aria-hidden="true"></span>`;
  const rows = S03_INSIDE_ITEMS.map(([name, kind], i) => {
    const v = "ip" + i;
    return `<button class="iprow" type="button" data-act="set" data-k="c30" data-v="${v}" data-st="c30" data-on="${v}" data-mode="eq"><span class="ftcaret ipcaret" aria-hidden="true"></span>${glyph(name, kind)}<span class="fname">${name}</span></button>`;
  }).join("");
  const descs = S03_INSIDE_ITEMS.map(([name, kind, desc], i) => {
    const v = "ip" + i;
    return `<div class="ipd" data-st="c30" data-on="${v}" data-mode="eq"><span class="iph mono">${name}</span><p>${desc}</p></div>`;
  }).join("");
  return `<p class="mut" style="font-size:14.5px;margin:2px 0 10px">Click a file or folder to see what it is for.</p>
<div class="ipx">
<div class="ipx-tree ftree">
<div class="iproot mono">schedule-tracker/</div>
<div class="iprows">${rows}</div>
</div>
<div class="ipx-desc">${descs}</div>
</div>`;
}

// "The whole road" — ten clickable stages from first idea to something worth
// showing. Click a stage to reveal what happens there. c31. The last three
// (document/deploy/portfolio) are drawn dashed: not covered in today's session,
// left for later — but still clickable for their descriptions.
const S03_ROAD = [
  ["idea", "IDEA", "Decide what you want to build or practice.", false],
  ["folder", "FOLDER", "Give the project a home.", false],
  ["editor", "EDITOR", "Open the whole project and work on it.", false],
  ["git", "GIT", "Start tracking its history.", false],
  ["build", "BUILD", "Write, run, test, and improve the project.", false],
  ["commit", "COMMIT", "Save meaningful checkpoints.", false],
  ["github", "GITHUB", "Push the repository online.", false],
  ["document", "DOCUMENT", "Explain the project and how to use it.", true],
  ["deploy", "DEPLOY", "Make the project available somewhere others can use or view it, when appropriate.", true],
  ["portfolio", "PORTFOLIO", "Present the finished work as something worth showing.", true],
];
function s03Road() {
  const stages = S03_ROAD.map(([v, label, desc, later], i) => {
    const arrow = i < S03_ROAD.length - 1 ? `<span class="roadarrow${later || (S03_ROAD[i + 1] && S03_ROAD[i + 1][3]) ? " roadarrow--later" : ""}" aria-hidden="true"></span>` : "";
    const cls = "roadstage" + (later ? " roadstage--later" : "");
    return `<button class="${cls}" type="button" data-act="set" data-k="c31" data-v="${v}" data-st="c31" data-on="${v}" data-mode="eq">${label}</button>${arrow}`;
  }).join("");
  const descs = S03_ROAD.map(([v, label, desc, later]) => {
    const tag = later ? `<span class="roadlater">Not covered today — for later</span>` : "";
    return `<div class="roaddesc" data-st="c31" data-on="${v}" data-mode="eq"><span class="roaddesc-k mono">${label}</span>${tag}<p>${desc}</p></div>`;
  }).join("");
  return `<div class="road" role="group" aria-label="The project road — solid stages are covered today, dashed stages are for later; click any stage for its description">${stages}</div>
<div class="roaddescs">${descs}</div>`;
}

// The five-layer stack: rows are buttons (data-act="set" jumps c7 straight to
// that layer) and the Back / Next layer / Reset controls still step through it.
const s03Layer = (n, word, q) =>
  `<button class="lrow" type="button" data-act="set" data-k="c7" data-v="${n}" data-st="c7" data-on="${n}" data-mode="gte-cur"><span class="ln">L${n}</span><span class="lw">${word}</span><span class="lq">${q}</span></button>`;
const S03_ASK = (k, q) => `<div class="lask"><span class="k">${k}</span><span class="q">${q}</span></div>`;

// A looping preview of a real screen recording. The preview loads on desktop
// only (components.js sets its src behind a media query); tapping it opens the
// controls modal, which loads the full file on demand.
function vdemo(src, caption, aria) {
  return `<figure class="vdemo">
<button class="vdemo-thumb" type="button" data-act="openv" data-vsrc="${src}" aria-label="${aria}">
<video class="vdemo-vid" data-src="${src}" muted loop autoplay playsinline preload="metadata" aria-hidden="true" tabindex="-1"></video>
<span class="vdemo-badge"><span class="vdemo-play" aria-hidden="true"></span>Enlarge</span>
</button>
<figcaption class="cap">${caption}</figcaption>
</figure>`;
}
const S03_VDEMO = vdemo(IDE_VIDEO,
  `<span class="cap-tag">Screen recording</span> — opening a folder in the editor. Click to enlarge with playback controls.`,
  "Enlarge the screen recording with playback controls");

// Layer 5 — the GitHub mark, drawn inline as vector (no image file), tinted with
// a design-system token rather than GitHub's own brand colour.
const GH_LOGO = `<div class="ghlogo" aria-hidden="true"><svg viewBox="0 0 16 16" width="36" height="36" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg></div>`;

// Layer 4 — a commit history mock in the style of a repository's commits page,
// using the clear messages from the table above. Authored by the owner only.
const S03_COMMIT_ROWS = [
  ["Update installation instructions", "Aug 14", "c5d6e7f"],
  ["Fix date parsing in the weekly view", "Aug 13", "1f2a3b4"],
  ["Implement email validation", "Aug 13", "b8c9d0e"],
  ["Add login form", "Aug 12", "4e5f6a7"],
  ["Initialize project structure", "Aug 12", "a1b2c3d"],
];
const S03_COMMITS = `<div class="ghc" role="img" aria-label="A commit history where every message clearly states what changed">
<div class="ghc-head"><span class="ghc-branch"><span class="ghc-branchi" aria-hidden="true"></span>main</span><span class="ghc-headmeta">${S03_COMMIT_ROWS.length} commits</span></div>
${S03_COMMIT_ROWS.map(([m, d, h]) => `<div class="ghc-row"><span class="ghc-av" aria-hidden="true"></span><div class="ghc-main"><span class="ghc-msg">${m}</span><span class="ghc-by">celesica committed on ${d}</span></div><span class="ghc-hash mono">${h}</span></div>`).join("")}
</div>`;

const SECTION_03_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>03 · your coding projects</span><span class="lvl">BUILDING</span></div>
<h1 class="h1">Your coding projects</h1>
<p class="cover"><b>What this section covers:</b> The difference between a folder, a project, an editor workspace, Git, and GitHub — plus how much structure different kinds of projects actually need.</p>
<p class="cover"><b>Why it matters:</b> These terms are often used together in classes, tutorials, and developer conversations. Understanding what each one does makes it easier to know where your code lives, what you should open, how changes are tracked, and how a project eventually gets shared.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">The five layers</h2>
<p class="mut" style="font-size:14px">Click any layer to jump to it, or step through with <b>Next layer</b>. Each layer answers one question and earns one word.</p>
<div class="c7grid">
<div>
${s03Layer(1, "Folder", "where do the files live?")}
${s03Layer(2, "Project", "what belongs to this work?")}
${s03Layer(3, "Editor", "what do I actually open?")}
${s03Layer(4, "Git", "how are changes tracked?")}
${s03Layer(5, "GitHub", "where does it live online?")}
<div class="ctl">
<button class="wa-btn wa-btn--secondary wa-btn--sm" type="button" data-act="bck" data-k="c7" data-min="1">Back</button>
<button class="wa-btn wa-btn--primary wa-btn--sm" type="button" data-act="nxt" data-k="c7" data-max="5">Next layer</button>
<button class="wa-btn wa-btn--ghost wa-btn--sm" type="button" data-act="rst" data-k="c7" data-v0="1">Reset</button>
</div>
<p class="ctr" style="margin:0">LAYER <span data-count="c7"></span></p>
</div>
<div>
<div class="lpanel" data-st="c7" data-on="1" data-mode="eq">
<h3 class="h3">Layer 1 — The folder</h3>
${S03_ASK("It answers", "Where do the files live?")}
<p>A folder is simply a location on your computer.</p>
<ul class="wa-list wa-list--ul">
<li>It holds the files that belong together.</li>
<li>In this system, coding folders live somewhere under <span class="mono amber">Development/</span>.</li>
<li>Everything below — the project, editor workspace, Git, and GitHub — builds on top of that folder.</li>
<li>Keeping coding work in one predictable location means you don't have to search Desktop, Downloads, and random directories every time.</li>
</ul>
<div class="panel"><pre class="tree">Development/
└── school/
    └── Y2T1/
        └── algorithms-mp1/</pre></div>
<div class="note"><span class="nl">NOTE</span>Avoid keeping active coding projects inside general synced folders such as Google Drive, OneDrive, or Dropbox. Sync services can conflict with project files and Git. On Windows, also check whether your Documents folder is automatically syncing to OneDrive.</div>
</div>
<div class="lpanel" data-st="c7" data-on="2" data-mode="eq">
<h3 class="h3">Layer 2 — The project</h3>
${S03_ASK("It answers", "What files belong to this piece of work?")}
<p>A project is a folder containing everything needed to work on and run that piece of software.</p>
<ul class="wa-list wa-list--ul">
<li>A tiny project might contain only one file.</li>
<li>A larger project may include source code, tests, documentation, dependencies, and configuration.</li>
<li>The amount of structure should match what the project is for.</li>
<li>Keeping everything for one project together makes it easier to open, run, move, share, back up, and eventually put on GitHub.</li>
</ul>
${TREE_S03_L2}
<p class="anchor">A project is a folder that knows how to run itself.</p>
</div>
<div class="lpanel" data-st="c7" data-on="3" data-mode="eq">
<h3 class="h3">Layer 3 — Opening it in your editor</h3>
${S03_ASK("It answers", "What should I actually open in VS Code or another editor?")}
<p>When someone says <b>"open the project,"</b> they usually mean opening the <b>project folder</b>, not just one code file.</p>
${S03_VDEMO}
${S03_VSCODE}
<div class="note"><span class="nl">NOTE</span>If your screen looks completely different from the tutorial you're following, check whether you opened one file instead of the whole folder. Usually it's <b>File → Open Folder</b>.</div>
</div>
<div class="lpanel" data-st="c7" data-on="4" data-mode="eq">
<h3 class="h3">Layer 4 — Git</h3>
${S03_ASK("It answers", "How do I track changes without making final-final-v2 copies?")}
<p>Git records the history of your project as you work.</p>
<ul class="wa-list wa-list--ul">
<li>A meaningful checkpoint is called a <b>commit</b>.</li>
<li>Each commit records what changed at that point.</li>
<li>You can review earlier versions without duplicating the entire project folder.</li>
<li>Git works locally on your computer.</li>
<li>It gives you a history you can understand and return to without creating duplicate project folders.</li>
</ul>
<p>Instead of a pile of copies:</p>
<div class="panel"><pre class="tree">project-final/
project-final-2/
project-final-real/
project-final-real-v2/</pre></div>
<p>you keep one project and create commits.</p>
<div class="fpanel on">
<table class="tbl"><thead><tr><th>Instead of</th><th>Try</th></tr></thead><tbody>
<tr><td class="mono">fix</td><td class="mono" style="color:var(--amber-glow)">Initialize project structure</td></tr>
<tr><td class="mono">fix2</td><td class="mono" style="color:var(--amber-glow)">Add login form</td></tr>
<tr><td class="mono">asdf</td><td class="mono" style="color:var(--amber-glow)">Implement email validation</td></tr>
<tr><td class="mono">final</td><td class="mono" style="color:var(--amber-glow)">Update installation instructions</td></tr>
</tbody></table>
</div>
<p class="mut" style="font-size:14.5px">Commit messages don't need to sound impressive. They just need to tell you what changed.</p>
<p>In your history, they read like this:</p>
${S03_COMMITS}
</div>
<div class="lpanel" data-st="c7" data-on="5" data-mode="eq">
<h3 class="h3">Layer 5 — GitHub</h3>
${GH_LOGO}
${S03_ASK("It answers", "Where can the Git repository live online?")}
<p>GitHub gives your Git repository a remote home.</p>
<ul class="wa-list wa-list--ul">
<li><b>Git</b> tracks your project history.</li>
<li><b>GitHub</b> stores and shares that repository online.</li>
<li><b>Pushing</b> sends your local commits to GitHub.</li>
<li><b>Cloning</b> downloads an existing repository to your computer.</li>
</ul>
<p class="secgap">GitHub is useful for:</p>
<ul class="wa-list wa-list--ul">
<li>Keeping a remote copy of your code</li>
<li>Sharing projects and collaborating with teammates</li>
<li>Working across devices</li>
<li>Showing projects to other people when you choose to</li>
</ul>
<div class="note"><span class="nl">NOTE</span>GitHub is for code and the files that belong with that code. Lecture PDFs, school forms, and unrelated documents still belong in your regular folders.</div>
</div>
</div>
</div>
</div></div><div class="band"><div class="in"><h2 class="h2">How much structure does a project need?</h2>
<p>Not every coding project needs the same folder structure. <b>Match the structure to what the project is for — small things stay small.</b></p>
<div class="chiprow">
<button class="chip" type="button" data-act="pick" data-k="c10" data-v="ex" data-st="c10" data-on="ex" data-mode="eq">Short exercise</button>
<button class="chip" type="button" data-act="pick" data-k="c10" data-v="as" data-st="c10" data-on="as" data-mode="eq">Course assignment</button>
<button class="chip" type="button" data-act="pick" data-k="c10" data-v="pf" data-st="c10" data-on="pf" data-mode="eq">Portfolio project</button>
<button class="chip" type="button" data-act="pick" data-k="c10" data-v="tm" data-st="c10" data-on="tm" data-mode="eq">Team project</button>
</div>
<div class="fpanel" data-st="c10" data-on="ex" data-mode="eq">${TREE_S03_EX}<p class="mut" style="font-size:14.5px">One file is enough when you're practicing one small concept. It doesn't need folders, a README, or Git.</p></div>
<div class="fpanel" data-st="c10" data-on="as" data-mode="eq">${TREE_S03_AS}<p class="mut" style="font-size:14.5px">A folder keeps the assignment together. Add a README when there are instructions, setup notes, or context worth keeping.</p></div>
<div class="fpanel" data-st="c10" data-on="pf" data-mode="eq">${TREE_S03_PF}<p class="mut" style="font-size:14.5px">A project you expect other people to see should be easier for someone else to understand, install, and run.</p></div>
<div class="fpanel" data-st="c10" data-on="tm" data-mode="eq">${TREE_S03_TM}<p class="mut" style="font-size:14.5px">Team projects usually need clearer setup instructions, shared documentation, dependencies, and a repository everyone can access.</p></div>
</div></div><div class="band"><div class="in"><h2 class="h2">Inside a project</h2>
<p>These are common files and folders you'll start seeing as projects get bigger. Not every project needs all of them.</p>
${s03Inside()}
<p class="mut" style="font-size:14.5px">The exact files depend on the language, framework, and project. Treat these as common conventions, not a universal tree every project has to copy.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Moving work up a level</h2>
<p>Sometimes a school assignment, tutorial project, or experiment turns out well enough that you want to keep developing it.</p>
<p>You can make it more portfolio-ready by:</p>
<ul class="wa-list wa-list--ul">
<li>Moving or recreating it under <span class="mono fdir">Development/personal/</span></li>
<li>Cleaning up the folder structure</li>
<li>Adding a useful README and making setup instructions clear</li>
<li>Adding a <span class="mono flit">.gitignore</span> and removing secrets or local-only files</li>
<li>Putting the project on GitHub</li>
<li>Adding screenshots, links, or a project description to your Career material</li>
</ul>
<div class="pn"><span class="k">HOW I CHECK A PROJECT</span><p>I like to look at a project as if I were seeing it for the first time: could someone clone it into an empty folder, follow the README, install what they need, and run it? If yes, the project is probably in good shape.</p><p>This matters especially when you start applying for internships or jobs — someone reviewing your GitHub should be able to understand what the project is and how it works without you beside them to explain every missing step.</p></div>
</div></div><div class="band"><div class="in"><h2 class="h2">The whole road</h2>
<p>A project can move through several stages, from the first idea to something you can show other people. Think of this as a <b>roadmap, not a requirement</b> — a short exercise may stop after a few stages, while a personal or capstone project may continue much further.</p>
<p class="mut roadlegend">Today covers the first half. Dashed stages are for later — the toolkit has more.</p>
${s03Road()}
<p class="mut" style="font-size:14.5px">Documentation, deployment, and portfolio presentation become more relevant as a project grows beyond a class exercise into something you want to share. Every stage is still clickable above if you're curious.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li><b>A folder is a location. A project is a folder containing everything needed to run.</b></li>
<li>"Open the project" usually means open the whole folder in your editor, not one file.</li>
<li>Git tracks changes locally. GitHub gives the repository a remote home online.</li>
<li>Common files like <span class="mono flit">README.md</span>, <span class="mono flit">.gitignore</span>, dependency files, and <span class="mono flit">.env.example</span> each solve a specific project need.</li>
<li><b>Match structure to what the project is for. Small things stay small.</b></li>
</ul>
<div class="closer"><span class="k">UNDERSTAND</span><p>Open one of your existing coding folders as a <b>folder</b> in your editor, and see what appears that didn't before.</p></div>
</div></div>`;

// ---- Section 04: Your calendar and tasks (rebuilt from the section-04 md) ----

// Jazzy's calendar palette from the md: id, hex, name, what it labels, tone
// (whether text on it should be dark), and the rationale. Cobalt (blue) and Mint
// (green) are owner-added label colours for the calendar — they mirror how Google
// Calendar uses many hues and are used only inside this section.
const CAL_COLORS = [
  ["wine", "#7A2E48", "Wine", "Major courses", "light", "Keeps major courses grounded and easy to recognize."],
  ["lilac", "#C9A0F5", "Lilac Signal", "Minor / electives", "dark", "Separates minor courses and electives without competing with major-course events."],
  ["cobalt", "#4F7CFF", "Cobalt Signal", "Coding / self-study", "light", "A supplementary blue that fits the palette while giving coding and self-study their own category."],
  ["mint", "#45C69A", "Mint Signal", "Org / student events", "dark", "A complementary green accent for org and student activities."],
  ["deepplum", "#241533", "Deep Plum", "Self-care / personal", "light", "Keeps personal time visually quieter than school deadlines, inside the same dark palette."],
  ["amber", "#FFB84D", "Amber Glow", "Quiz", "dark", "Reserved to stand out — here, quizzes."],
  ["rose", "#FF5C8A", "Neon Rose", "Exam", "light", "Reserved to stand out — here, exams."],
  ["ember", "#FF7A45", "Ember", "Major project", "dark", "Reserved to stand out — here, major project work."],
];
// Interactive palette: click a swatch to read what it labels and why. c40. The
// grid and the detail card are separate so the description can sit in the left
// column beside the video, keeping that row balanced.
function s04PaletteGrid() {
  const swatches = CAL_COLORS.map(([id, hex, name, cat]) =>
    `<button class="swatch" type="button" data-act="set" data-k="c40" data-v="${id}" data-st="c40" data-on="${id}" data-mode="eq" aria-label="${name} — ${cat}"><span class="swatch-chip" style="background:${hex}"></span><span class="swatch-name">${name}</span><span class="swatch-cat">${cat}</span></button>`
  ).join("");
  return `<div class="palgrid">${swatches}</div>`;
}
function s04PaletteDetail() {
  const cards = CAL_COLORS.map(([id, hex, name, cat, tone, why]) =>
    `<div class="swatch-detail" data-st="c40" data-on="${id}" data-mode="eq"><span class="swatch-chip lg" style="background:${hex}"></span><div class="swatch-body"><p class="swatch-dh"><b>${name}</b><span class="swatch-hex mono">${hex}</span></p><p class="swatch-dc">${cat}</p><p class="swatch-why">${why}</p></div></div>`
  ).join("");
  return `<div class="swatch-detailwrap">${cards}</div>`;
}

// Interactive prefix explorer for event titles. c41.
const CAL_PREFIXES = [
  ["LEC", "wine", "Lecture", "CS 3202 — Algorithms and Complexity"],
  ["LAB", "wine", "Laboratory", "CS 3202 — Algorithms and Complexity"],
  ["QUIZ", "amber", "Quiz", "CS 3202 — Quiz 2"],
  ["EXAM", "rose", "Midterm, final, or other major exam", "CS 3202 — Midterm Exam"],
  ["HW", "cobalt", "Homework or assignment", "CS 3202 — Assignment 3"],
  ["PROJ", "ember", "Project, milestone, presentation, or deadline", "CS 3202 — Schedule Tracker Milestone"],
];
function s04Prefixes() {
  const chips = CAL_PREFIXES.map(([p, color]) =>
    `<button class="pfxchip" type="button" data-act="set" data-k="c41" data-v="${p}" data-st="c41" data-on="${p}" data-mode="eq" style="--pfx:var(--cal-${color})">[${p}]</button>`
  ).join("");
  const cards = CAL_PREFIXES.map(([p, color, meaning, example]) =>
    `<div class="pfxcard" data-st="c41" data-on="${p}" data-mode="eq"><p class="pfxcard-ex mono"><span class="pfxcard-tag" style="background:var(--cal-${color})">[${p}]</span> ${example}</p><p class="pfxcard-m">${meaning}</p></div>`
  ).join("");
  return `<div class="pfxrow">${chips}</div><div class="pfxcardwrap">${cards}</div>`;
}

// The kept event builder — reveal one field at a time (c12), like building the
// event live in Google Calendar.
const S04_EVENT = `<div class="ev">
<div class="evh"><span class="mono">[LEC]</span> CS 3202 — Algorithms and Complexity<span class="tm">Mon, Wed, Fri · 8:00 – 9:30 · repeats until end of term</span></div>
<div class="evr" data-st="c12" data-on="1" data-mode="gte"><span class="fl">Location</span>Room 402, CS Building<span class="why">Enough to get there — or to know it moved.</span></div>
<div class="evr vid" data-st="c12" data-on="2" data-mode="gte"><span class="fl">Video link</span><span class="mono">meet.google.com/abc-defg-hij</span><span class="why">The single biggest time-saver — you stop searching your email five minutes before class.</span></div>
<div class="evr" data-st="c12" data-on="3" data-mode="gte"><span class="fl">Instructor &amp; LMS</span>Prof. Reyes · Section B · canvas.school.edu/cs3202<span class="why">Everything you'd otherwise dig for, one tap away.</span></div>
<div class="evr" data-st="c12" data-on="4" data-mode="gte"><span class="fl">Color label</span><span class="evr-swatch" style="background:var(--cal-wine)"></span>Major Course — Wine<span class="why">A second visual cue, so the course is recognizable at a glance.</span></div>
<div class="evr" data-st="c12" data-on="5" data-mode="gte"><span class="fl">Notification</span>30 minutes before<span class="why">Enough time to actually get there.</span></div>
</div>
<div class="ctl">
<button class="wa-btn wa-btn--primary wa-btn--sm" type="button" data-act="nxt" data-k="c12" data-max="5">Add details</button>
<button class="wa-btn wa-btn--ghost wa-btn--sm" type="button" data-act="rst" data-k="c12" data-v0="0">Reset</button>
<span class="ctr"><span data-count="c12"></span> fields</span>
</div>`;

// The Google-Calendar-style sample week. Events are colour-coded blocks with
// [LEC]/[LAB]/[QUIZ]/[EXAM] titles; tasks are chips with circle checkboxes that
// toggle done (strike-through). Built as static positioned HTML — one wide grid
// that scrolls horizontally on a phone rather than overflowing the page.
const CAL_DAYS = [["MON", "17"], ["TUE", "18"], ["WED", "19"], ["THU", "20"], ["FRI", "21"]];
const CAL_START = 8, CAL_END = 18, CAL_HPX = 46;
const CAL_EVENTS = [
  [0, 8, 9.5, "wine", "LEC", "CS 3202 — Algorithms"],
  [0, 10, 11, "lilac", "LEC", "GE 1 — Understanding Self"],
  [0, 13, 14.5, "cobalt", "", "Coding practice"],
  [1, 8, 10, "wine", "LAB", "CS 3202 — Algorithms"],
  [1, 10.5, 11.5, "amber", "QUIZ", "MATH 101 — Quiz 2"],
  [1, 16, 17, "mint", "", "CS Society meeting"],
  [2, 8, 9.5, "wine", "LEC", "CS 3202 — Algorithms"],
  [2, 10, 11, "lilac", "LEC", "GE 1 — Understanding Self"],
  [2, 17, 18, "deepplum", "", "Gym / self-care"],
  [3, 8, 10, "wine", "LAB", "CS 3202 — Algorithms"],
  [3, 13, 15, "rose", "EXAM", "MATH 101 — Midterm"],
  [4, 8, 9.5, "wine", "LEC", "CS 3202 — Algorithms"],
  [4, 11, 12, "cobalt", "", "Coding practice"],
  [4, 14, 16, "ember", "PROJ", "Schedule Tracker Milestone"],
];
const CAL_TASKS = [
  [0, 12, true, "HW", "Read assignment brief"],
  [1, 12, false, "HW", "Draft solution"],
  [2, 12.5, true, "PROJ", "Plan project structure"],
  [3, 11.5, false, "PROJ", "Build main feature"],
  [4, 12.5, false, "PROJ", "Test"],
];
function calTime(h) {
  const hr = Math.floor(h), m = Math.round((h - hr) * 60);
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return h12 + (m ? ":" + String(m).padStart(2, "0") : "");
}
function s04Week() {
  const colH = (CAL_END - CAL_START) * CAL_HPX;
  const headers = CAL_DAYS.map((d) => `<div class="gcal-dh"><b>${d[0]}</b><span>${d[1]}</span></div>`).join("");
  let hours = "";
  for (let hh = CAL_START; hh < CAL_END; hh++) {
    const ap = hh >= 12 ? "PM" : "AM", h12 = hh % 12 === 0 ? 12 : hh % 12;
    hours += `<div class="gcal-hr" style="height:${CAL_HPX}px">${h12} ${ap}</div>`;
  }
  const cols = CAL_DAYS.map((d, di) => {
    const evs = CAL_EVENTS.filter((e) => e[0] === di).map((e) => {
      const top = (e[1] - CAL_START) * CAL_HPX, h = (e[2] - e[1]) * CAL_HPX - 3;
      const pfx = e[4] ? `<span class="gcal-pfx">[${e[4]}]</span> ` : "";
      return `<div class="gcal-ev gcal-ev--${e[3]}" style="top:${top}px;height:${h}px"><span class="gcal-ev-t">${pfx}${e[5]}</span><span class="gcal-ev-time">${calTime(e[1])} – ${calTime(e[2])}</span></div>`;
    }).join("");
    const tks = CAL_TASKS.filter((t) => t[0] === di).map((t) => {
      const top = (t[1] - CAL_START) * CAL_HPX, tk = `cal-task-${di}-${Math.round(t[1] * 10)}`;
      const pfx = t[3] ? `[${t[3]}] ` : "";
      return `<button class="gcal-task${t[2] ? " done" : ""}" type="button" data-act="toggle" data-tk="${tk}" data-done="${t[2] ? 1 : 0}" style="top:${top}px" aria-pressed="${t[2] ? "true" : "false"}"><span class="gcal-check" aria-hidden="true"></span><span class="gcal-task-t">${pfx}${t[4]}</span></button>`;
    }).join("");
    return `<div class="gcal-col" style="height:${colH}px;background-size:100% ${CAL_HPX}px">${evs}${tks}</div>`;
  }).join("");
  const legend = CAL_COLORS.map((c) => `<span><i style="background:${c[1]}"></i>${c[3]}</span>`).join("");
  return `<div class="gcalwrap"><div class="gcal" role="group" aria-label="A sample school week: colour-coded classes with bracketed title prefixes, plus tasks with checkboxes">
<div class="gcal-top"><span class="gcal-toptitle">August 2026</span><span class="gcal-topsub">Week</span></div>
<div class="gcal-grid">
<div class="gcal-corner"></div>${headers}
<div class="gcal-gutter" style="height:${colH}px">${hours}</div>${cols}
</div></div></div>
<div class="gcal-legend">${legend}</div>`;
}

const SECTION_04_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>04 · your calendar and tasks</span><span class="lvl">BUILDING</span></div>
<h1 class="h1">Your calendar and tasks</h1>
<p class="cover"><b>What this section covers:</b> Setting up a calendar for your class schedule, deadlines, meetings, and the work you need to finish.</p>
<p class="cover"><b>Why it matters:</b> A printed schedule, screenshot, or LMS page can tell you what exists, but it doesn't always remind you at the right time or keep the useful details in one place.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Why use a calendar app?</h2>
<p>A calendar app can do more than show your class schedule. It can:</p>
<ul class="wa-list wa-list--ul">
<li><b>Remind you</b> before classes and deadlines</li>
<li><b>Hold details</b> like room numbers, meeting links, professor information, and LMS links</li>
<li><b>Update easily</b> when something changes</li>
<li><b>Repeat</b> recurring classes automatically</li>
<li><b>Stay available</b> across your phone, laptop, and browser</li>
<li><b>Notify you on your phone</b> — and let you add or edit events on the go, especially with the Google Calendar app</li>
<li><b>Make old events searchable</b></li>
</ul>
<div class="note"><span class="nl">NOTE</span>This guide uses <b>Google Calendar</b> because it's widely available and includes Google Tasks, but you can use another calendar app if you prefer.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Step 1 — Create your school calendar</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> If you haven't set up a calendar for school yet, create one main <b>School</b> calendar in Google Calendar.</p>
<ol class="wa-list wa-list--ol">
<li>On a computer, open <b>Google Calendar</b>.</li>
<li>On the left, find <b>Other calendars</b>.</li>
<li>Click the <b>+</b> button.</li>
<li>Choose <b>Create new calendar</b>.</li>
<li>Name it something simple, such as <b>School</b>.</li>
<li>Click <b>Create calendar</b>.</li>
</ol>
<div class="note"><span class="nl">NOTE</span>Your School calendar can hold classes, exams, student events, and study sessions. If you also use Google Calendar personally, keep a separate <b>Personal</b> calendar for appointments, family, and errands.<span class="np">You don't need a separate calendar for every class. Keep calendars broad, then use <b>event titles and color labels</b> to make your week easy to scan.</span></div>
</div></div><div class="band"><div class="in"><h2 class="h2">Step 2 — Create color labels</h2>
<p>Use <b>color labels</b> as a visual shortcut. Your event title still says what something is; the color helps you recognize it quickly across the whole week.</p>
<ul class="wa-list wa-list--ul">
<li>Give recurring classes a color based on their <b>course or course category</b>.</li>
<li>Keep the <b>same color for the lecture and lab of the same course</b>.</li>
<li>Use a stronger color for <b>quizzes, exams, and major project deadlines</b> so they stand out.</li>
<li>Use separate colors for self-study, student organizations, and personal time.</li>
</ul>
<p><span class="wa-badge wa-badge--amber">SAMPLE PALETTE</span> One example using my color palette — <b>click a color</b> to see what it labels and why:</p>
${s04PaletteGrid()}
<div class="labelrow">
<div class="labelrow-l">
${s04PaletteDetail()}
<div class="note"><span class="nl">NOTE</span>You don't have to use these exact assignments. The useful part is having a pattern you can recognize quickly — and keeping <span class="mono">[LEC]</span> and <span class="mono">[LAB]</span> of one course in the same color.</div>
</div>
${vdemo(LABEL_VIDEO, `<span class="cap-tag">Screen recording</span> — labeling a class in Google Calendar. Click to enlarge.`, "Enlarge the label-your-class recording with playback controls")}
</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Step 3 — Add your class schedule</h2>
<p>Add each class once as a <b>repeating event</b> for the semester, saved to your <b>School</b> calendar. Build the event as you would live — <b>click Add details</b>:</p>
${S04_EVENT}
<p>Setting the whole semester up once means you don't have to keep checking a screenshot every week.</p>
<h3 class="h3 s04-subh">Use short prefixes in your titles</h3>
<p>A prefix tells you what you're looking at before you even open the event. <b>Tap a prefix</b> to see an example:</p>
${s04Prefixes()}
<div class="note"><span class="nl">NOTE</span>Keep <span class="mono">[LEC]</span> and <span class="mono">[LAB]</span> for one course in the same color, and give <span class="mono">[QUIZ]</span>, <span class="mono">[EXAM]</span>, and major <span class="mono">[PROJ]</span> their own so they stand out. The prefix still works even when you color-code.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Step 4 — Set up Tasks</h2>
<p>Calendar events and tasks do different jobs.</p>
<div class="grid2">
<div class="evtcard"><h3 class="h3">Events — happen at a time</h3><ul class="wa-list wa-list--ul"><li><span class="mono">[LEC]</span> / <span class="mono">[LAB]</span> class</li><li><span class="mono">[QUIZ]</span> / <span class="mono">[EXAM]</span></li><li>Org meeting, presentation, defense</li></ul></div>
<div class="evtcard"><h3 class="h3">Tasks — things to finish</h3><ul class="wa-list wa-list--ul"><li><span class="mono">[HW]</span> Complete Assignment 3</li><li><span class="mono">[PROJ]</span> Build login flow</li><li>Review Chapter 4, practice coding</li></ul></div>
</div>
<p><b>Suggested lists:</b> Assignments · Study and practice · Exams and quizzes · Group projects · Org work · Personal</p>
<div class="note"><span class="nl">NOTE</span>Tasks appear with a <b>check mark</b>, so you can mark them done right from your calendar. You don't need every list — use the categories that actually help.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">A sample week</h2>
<p>Here's how a week looks once the colors, prefixes, and tasks come together — classes you can scan by color, and tasks with checkboxes right where they're due. <b>Check a task</b> to cross it off.</p>
${s04Week()}
</div></div><div class="band"><div class="in"><h2 class="h2">Step 5 — Add work when you hear about it</h2>
<p>Add a responsibility when you <b>first hear about it</b>, not when it's almost due. Break bigger assignments into smaller steps so the due date isn't your only reminder to start.</p>
<p>Instead of one task:</p>
<p><span class="mono flit">[PROJ] Finish software project — August 30</span></p>
<p>create several:</p>
<ul class="wa-list wa-list--ul">
<li><span class="mono">[PROJ] Plan project structure</span></li>
<li><span class="mono">[PROJ] Build main feature</span></li>
<li><span class="mono">[PROJ] Test</span></li>
<li><span class="mono">[PROJ] Review and clean up</span></li>
<li><span class="mono">[PROJ] Submit</span></li>
</ul>
<div class="note"><span class="nl">NOTE</span>Breaking the work into smaller tasks gives you several points to move a project forward. <b>The due date shouldn't be the first time your system reminds you an assignment exists.</b></div>
</div></div><div class="band"><div class="in"><h2 class="h2">Step 6 — Notifications</h2>
<p>Set reminders before classes, deadlines, and exams based on how much preparation you need:</p>
<ul class="wa-list wa-list--ul">
<li><b>Classes</b> — enough time to get ready and travel there</li>
<li><b>Homework</b> — one day before, and again closer to submission</li>
<li><b>Quizzes</b> — enough time to review beforehand</li>
<li><b>Exams</b> — several days before, plus a reminder closer in</li>
<li><b>Projects</b> — reminders for milestones, not only the final deadline</li>
<li><b>Org meetings</b> — enough time to prepare or travel there</li>
</ul>
<div class="note"><span class="nl">NOTE</span>The exact timing is personal. If you create so many notifications that you dismiss them automatically, reduce them.</div>
<div class="pn"><span class="k">HOW I DO IT</span><p>One thing that saves me a surprising amount of time is putting the meeting link directly inside the calendar event. I don't want to search my email, Messenger, Discord, or LMS five minutes before something starts.</p></div>
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li>Keep important dates somewhere outside the LMS too.</li>
<li>Use one broad School calendar instead of one per subject.</li>
<li>Use clear title prefixes: <span class="mono">[LEC]</span>, <span class="mono">[LAB]</span>, <span class="mono">[QUIZ]</span>, <span class="mono">[EXAM]</span>, <span class="mono">[HW]</span>, <span class="mono">[PROJ]</span>.</li>
<li>Add classes once as repeating events, with rooms, links, and instructor details inside.</li>
<li>Use color labels as a second visual cue; use Tasks for work you need to finish.</li>
<li>Add responsibilities when you first hear about them, and break big ones into steps.</li>
</ul>
<div class="closer"><span class="k">DO</span><p>Add your current class schedule as repeating events, use <span class="mono">[LEC]</span> and <span class="mono">[LAB]</span> where applicable, and add the details you usually have to search for later.</p></div>
</div></div>`;

// ---- Section 05: Protecting your work (rebuilt from the section-05 md) ----

// Backup destinations — click a place to see what belongs there. c51.
const BACKUP_PLACES = [
  ["laptop", "Your laptop", "The copy you work on", "WORKING COPY",
    `<p>The copy you actively work on — everything starts here.</p><ul class="wa-list wa-list--ul"><li>School files and notes</li><li>Projects and current documents</li></ul><p class="mut" style="font-size:14px">If your only copy of something lives on one device, it isn't backed up yet.</p>`],
  ["cloud", "Cloud storage", "Documents, synced", "DOCUMENTS",
    `<p>Use <b>Google Drive</b> or <b>Dropbox</b> for documents you want synced across devices. Good folders to back up here:</p><ul class="wa-list wa-list--ul"><li><span class="mono flit">Studies/</span></li><li><span class="mono flit">Upskilling/</span></li><li><span class="mono flit">Career/</span></li></ul><div class="note"><span class="nl">NOTE</span><b style="color:var(--neon-rose)">Don't sync Development/</b> — sync services conflict with the files Git creates and can corrupt a project. Code goes to GitHub, not cloud sync.</div>`],
  ["ssd", "External drive", "A second backup", "EXTRA COPY",
    `<p>Keep another copy of important files on a separate <b>external SSD or hard drive</b>:</p><ul class="wa-list wa-list--ul"><li>Important school documents and certificates</li><li>Portfolio assets and resume files</li><li>Photos or screenshots you can't easily recreate</li></ul>`],
  ["github", "GitHub", "The history of your code", "CODE",
    `<p>Use Git and GitHub for your coding projects. GitHub gives you:</p><ul class="wa-list wa-list--ul"><li>A remote copy of the repository</li><li>Version history</li><li>A place to collaborate</li><li>A way to restore or clone the project onto another computer</li></ul><p class="mut" style="font-size:14px">It's for code and the files around it — not arbitrary school documents.</p>`],
];
function s05Backup() {
  const cards = BACKUP_PLACES.map(([id, title, sub]) =>
    `<button class="fcard" type="button" data-act="set" data-k="c51" data-v="${id}" data-st="c51" data-on="${id}" data-mode="eq"><span class="ft">${title}</span><span class="fd">${sub}</span></button>`
  ).join("");
  const panels = BACKUP_PLACES.map(([id, title, sub, tag, body]) =>
    `<div class="fpanel" data-st="c51" data-on="${id}" data-mode="eq"><div class="bkdetail"><span class="bktag">${tag}</span>${body}</div></div>`
  ).join("");
  return `<div class="grid2 bkgrid">${cards}</div>${panels}`;
}

// The secret-key cautionary walkthrough — click a step (or Next). c50.
const SECRET_STEPS = [
  ["1", "In the code", "IN YOUR CODE", "warn",
    `<div class="panel"><pre class="code"><span class="cm"># weather.py</span>
WEATHER_API_KEY = <span class="bad">"weather_live_51x8mQ2kf93hd"</span>
weather = fetch_weather(WEATHER_API_KEY, city)</pre></div>
<p>A beginner-friendly project might start like this. Everything works, so it's easy to forget the key is sitting directly inside the source code.</p>
<div class="note"><span class="nl">NOTE</span>An API key, access token, or database password should be treated like a password.</div>`],
  ["2", "Pushed public", "EXPOSED", "bad",
    `<div class="panel"><pre class="code"><span class="cm"># github.com/you/weather-dashboard — PUBLIC</span>
WEATHER_API_KEY = <span class="bad">"weather_live_51x8mQ2kf93hd"</span></pre></div>
<p>If that file is committed and pushed to GitHub, the secret goes with it.</p>
<ul class="wa-list wa-list--ul"><li>Public repositories are scanned automatically for exposed keys — often by bots within minutes.</li><li>Anyone who finds the key may be able to use the service under your account.</li></ul>`],
  ["3", "Deleted — still there", "STILL EXPOSED", "bad",
    `<div class="panel"><pre class="code"><span class="cm"># weather.py — key deleted. Fixed?</span>
WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]

<span class="cm">$ git log</span>
<span class="bad">a41f2c  Add weather API key    ← still in this commit</span></pre></div>
<p>Changing the current file does <b>not</b> remove the secret from earlier commits.</p>
<div class="note"><span class="nl">NOTE</span><b>Deleting the line later doesn't make the exposed key safe.</b> Git keeps previous versions.<span class="np">If a real secret was exposed, <b>revoke or rotate it</b> with the service provider — don't assume deleting the line fixed it.</span></div>`],
  ["4", "The fix", "SAFE", "good",
    `<div class="panel"><pre class="code"><span class="cm"># .env — real values, stays on your computer</span>
WEATHER_API_KEY=your-real-key-here

<span class="cm"># .gitignore — Git never tracks .env</span>
.env

<span class="cm"># .env.example — safe to commit, names only</span>
WEATHER_API_KEY=</pre></div>
<p>Your code reads the value from the environment instead of hard-coding it:</p>
<div class="panel"><pre class="code"><span class="cm">import os</span>
WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]</pre></div>
<div class="note"><span class="nl">GOAL</span><b>Real secret</b> stays local · <b>variable name</b> gets documented · <span class="mono">.env</span> is ignored by Git · <span class="mono">.env.example</span> is safe to commit · an <b>exposed key</b> gets revoked or rotated.</div>`],
];
function s05Secret() {
  const chips = SECRET_STEPS.map(([n, label]) =>
    `<button class="skstep" type="button" data-act="set" data-k="c50" data-v="${n}" data-st="c50" data-on="${n}" data-mode="eq"><span class="skn">${n}</span><span class="skl">${label}</span></button>`
  ).join("");
  const panels = SECRET_STEPS.map(([n, label, tag, tone, body]) =>
    `<div class="fpanel" data-st="c50" data-on="${n}" data-mode="eq"><span class="sktag sktag--${tone}">${tag}</span>${body}</div>`
  ).join("");
  return `<div class="skrow">${chips}</div>
${panels}`;
}

// .gitignore explorer — click an entry to see why it's ignored. c52.
const GITIGNORE_ITEMS = [
  ["env", ".env", "env", "<b>Private</b> — it holds secrets like API keys and database URLs. It should never be committed."],
  ["node", "node_modules/", "dir", "<b>Large and reinstallable</b> — another developer rebuilds it from the project's dependency file."],
  ["venv", ".venv/", "dir", "<b>Specific to your computer</b> — a local Python virtual environment."],
  ["pycache", "__pycache__/", "dir", "<b>Generated automatically</b> — Python's compiled bytecode cache."],
  ["ds", ".DS_Store", "cfg", "<b>Specific to your computer</b> — a macOS folder-settings file that isn't useful to anyone else."],
];
function s05Gitignore() {
  const rows = GITIGNORE_ITEMS.map(([id, name, kind]) => {
    const glyph = kind === "dir"
      ? `<span class="ficon" aria-hidden="true"></span>`
      : `<span class="fdoc fdoc--${kind}" data-ext="${kind === "env" ? "ENV" : "CFG"}" aria-hidden="true"></span>`;
    return `<button class="iprow" type="button" data-act="set" data-k="c52" data-v="${id}" data-st="c52" data-on="${id}" data-mode="eq"><span class="ftcaret ipcaret" aria-hidden="true"></span>${glyph}<span class="fname">${name}</span></button>`;
  }).join("");
  const descs = GITIGNORE_ITEMS.map(([id, name, kind, why]) =>
    `<div class="ipd" data-st="c52" data-on="${id}" data-mode="eq"><span class="iph mono">${name}</span><p>${why}</p></div>`
  ).join("");
  return `<p class="mut" style="font-size:14.5px;margin:2px 0 10px">Click an entry to see why it's ignored.</p>
<div class="ipx"><div class="ipx-tree ftree"><div class="iproot mono">.gitignore</div><div class="iprows">${rows}</div></div><div class="ipx-desc">${descs}</div></div>`;
}

const SECTION_05_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>05 · protecting your work</span><span class="lvl">BUILDING</span></div>
<h1 class="h1">Protecting your work</h1>
<p class="cover"><b>What this section covers:</b> Password management, backing up your files, and keeping private credentials out of your code.</p>
<p class="cover"><b>Why it matters:</b> A few simple habits can prevent much bigger problems later — lost files, locked accounts, exposed passwords, or API keys accidentally pushed to GitHub.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Use a password manager</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> A password manager helps you use a different, strong password for every account without having to memorize all of them.</p>
<ul class="wa-list wa-list--ul">
<li><a href="https://bitwarden.com/" target="_blank" rel="noopener noreferrer"><b>Bitwarden</b></a> — free, with apps and browser extensions</li>
<li><b>Google Password Manager</b> — built into Google accounts and Chrome</li>
<li><b>1Password</b> — another popular option with cross-device support</li>
</ul>
<p>A basic setup:</p>
<ol class="wa-list wa-list--ol">
<li>Create your password manager account.</li>
<li>Choose a strong master password.</li>
<li>Save your recovery information somewhere safe.</li>
<li>Install the browser extension and phone app.</li>
<li>Turn on <b>unlock with biometrics</b> so you can use Face ID, Touch ID, or your fingerprint when filling passwords.</li>
<li>Start updating your most important accounts first.</li>
</ol>
<p><b>Accounts to prioritize:</b> Email · GitHub · School portal · Banking and financial accounts · Social media tied to your identity</p>
<div class="note"><span class="nl">NOTE</span>Avoid reusing one password across accounts — let the manager generate long, unique ones. You usually don't need to type them yourself; the extension or app autofills them, and biometrics make it quick on devices that support Face ID, Touch ID, or fingerprint unlock.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Turn on two-factor authentication</h2>
<p>Two-factor authentication adds another step after your password. Prioritize it for accounts such as:</p>
<ul class="wa-list wa-list--ul">
<li>Email</li>
<li>GitHub</li>
<li>School portal</li>
<li>Password manager</li>
<li>Banking or financial accounts</li>
</ul>
<div class="note"><span class="nl">NOTE</span>Save your recovery codes somewhere secure and separate from the device they protect.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Your school email</h2>
<p>Use your school email for things connected directly to your student life:</p>
<div class="grid2">
<div class="evtcard"><h3 class="h3">School email — for student life</h3><ul class="wa-list wa-list--ul"><li>School portals and services</li><li>Professor or instructor communication</li><li>School software and campus orgs</li><li>Student-only registrations</li></ul></div>
<div class="evtcard"><h3 class="h3">Personal professional email — to keep</h3><ul class="wa-list wa-list--ul"><li>GitHub and LinkedIn</li><li>Portfolio and job applications</li><li>Professional communities</li><li>Long-term developer accounts</li></ul></div>
</div>
<div class="pn"><span class="k">SIDE NOTE</span><p><b>Don't ignore your school email after setting up a personal one.</b> It can unlock <b>student discounts and perks</b> — software discounts, student subscriptions, and programs like the <b>GitHub Student Developer Pack</b>. Use it where student verification gives you a benefit, but don't make it the only recovery email for accounts you want to keep long-term.</p></div>
</div></div><div class="band"><div class="in"><h2 class="h2">Backing up your files</h2>
<p>Your laptop should not be the only place an important file exists. A simple setup uses <b>different places for different jobs</b> — <b>click each destination</b>:</p>
${s05Backup()}
<div class="note"><span class="nl">ASK YOURSELF</span>If your laptop stopped working today, what would you actually lose? Anything important that exists in only one place still needs another copy.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Keys and passwords inside code</h2>
<p>When a project connects to another service, that service may give you a <b>key</b> — effectively a password your app uses to access it. <b>Click through the four steps</b> to see what usually happens:</p>
${s05Secret()}
</div></div><div class="band"><div class="in"><h2 class="h2">What .gitignore is for</h2>
<p><span class="mono flit">.gitignore</span> tells Git which files and folders it should ignore — because they're private, generated automatically, large and reinstallable, specific to your computer, or just not useful to other people on the project.</p>
${s05Gitignore()}
<div class="note"><span class="nl">NOTE</span>A dependency folder like <span class="mono">node_modules/</span> doesn't belong in GitHub — another developer can rebuild it from the project's dependency file.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li>Use a password manager and unique passwords for important accounts.</li>
<li>Turn on <b>unlock with biometrics</b> for easier Face ID or fingerprint autofill.</li>
<li>Use two-factor authentication on important accounts.</li>
<li>Keep your school email for school systems, student discounts, and perks; use a personal professional email for accounts you want to keep long-term.</li>
<li>Keep important files in more than one place — cloud for documents, a physical drive for an extra backup, and GitHub for code.</li>
<li>Keep passwords and API keys out of your source code; use <span class="mono">.env</span>, <span class="mono">.env.example</span>, and <span class="mono">.gitignore</span> when a project needs private configuration.</li>
</ul>
<div class="closer"><span class="k">DO</span><p>Set up a password manager if you don't already have one, then check which important files would disappear if your laptop stopped working today.</p></div>
</div></div>`;

/* ---------- section 06: Notion ---------- */

// The screenshot toggle. Each shot sits in a fixed-height box that scrolls on
// its own (overscroll-behaviour keeps the page still), and both the image and
// the caption link open the full-size original in a new tab. Hidden until the
// toggle is opened.
function s06Shots() {
  const shots = NOTION_SHOTS.map(([, dest, name, alt], i) => {
    return `<figure class="nshot">
<figcaption class="nshot-cap"><span class="nshot-name"><span class="mono nshot-num">${i + 1}</span>${name}</span><a class="nshot-open" href="${dest}" target="_blank" rel="noopener noreferrer">Open full image<span class="nshot-ext" aria-hidden="true"></span></a></figcaption>
<div class="nshot-box"><a href="${dest}" target="_blank" rel="noopener noreferrer" aria-label="Open ${name} full size in a new tab"><img src="${dest}" alt="${alt}" loading="lazy" decoding="async"></a></div>
</figure>`;
  }).join("");
  return `<details class="exp nshots"><summary>Jazzy's Notion OS — school dashboard (${NOTION_SHOTS.length} screenshots)</summary><div class="expb">
<p class="mut" style="font-size:14px;margin:0 0 12px">Each screenshot scrolls inside its own box. Click any image to open it full size in a new tab.</p>
${shots}
</div></details>`;
}

// "What can stay somewhere else" — three routing cards mapping a kind of thing
// back to the system that already owns it. Reinforces that Notion is a view,
// not another store.
const S06_STAYS = [
  ["School files", "Studies or your cloud storage"],
  ["Working code", "Development and GitHub"],
  ["Classes, deadlines, and notifications", "Google Calendar and Tasks"],
];
const s06Stays = () => `<div class="grid3 nstays">${S06_STAYS.map(([a, b]) =>
  `<div class="nstay"><span class="nstay-k">${a}</span><span class="nstay-arr" aria-hidden="true"></span><span class="nstay-v">${b}</span></div>`).join("")}</div>`;

// The Academia flow — the five connected databases plus Contacts, drawn with
// design-system tokens (arrows in CSS, no glyph fonts). The main chain reads
// left-to-right and wraps on narrow screens; the two relations sit below.
const s06Flow = () => `<div class="nflow" role="img" aria-label="How the Academia databases connect: Year and Term leads to Courses, then Modules, then Coursework. Courses links to the Academic Schedule, and both Courses and Schedule link to Contacts.">
<div class="nflow-chain">
<span class="nflow-node">Year + Term</span><span class="nflow-arr" aria-hidden="true"></span>
<span class="nflow-node">Courses</span><span class="nflow-arr" aria-hidden="true"></span>
<span class="nflow-node">Modules</span><span class="nflow-arr" aria-hidden="true"></span>
<span class="nflow-node">Coursework</span>
</div>
<div class="nflow-rels">
<div class="nflow-rel"><span class="nflow-node">Courses</span><span class="nflow-rk">links to</span><span class="nflow-node">Academic Schedule</span></div>
<div class="nflow-rel"><span class="nflow-node">Courses / Schedule</span><span class="nflow-rk">links to</span><span class="nflow-node">Contacts</span></div>
</div>
</div>`;

// The six Academia databases as a clickable catalogue — click one to reveal
// what it is for. Same left-rows / right-panel pattern as section 03's "Inside
// a project" (group c60, defaults to Year + Term).
const S06_DBS = [
  ["yt", "Year + Term", [
    "Keeps track of each semester or term",
    "Connects your courses to the term they belong to",
    "Can include the semester timeline and intake",
  ]],
  ["crs", "Courses", [
    "One entry for each class",
    "Can include the course type, credits, instructor, status, and description",
    "Can link directly to your LMS course page",
    "Can link directly to your Google Drive or course folder",
    "Pulls in the course schedule, modules, and coursework",
  ]],
  ["sch", "Academic Schedule", [
    "Keeps your recurring class time blocks",
    "Can include the day, time, lecture/lab type, room, location, and instructor",
    "Can be shown as a board grouped by day for a weekly timetable view",
  ]],
  ["mod", "Modules", [
    "Breaks a course into smaller weekly or topic-based sections",
    "Connects each module to its course",
    "Holds the coursework that belongs to that module",
    "Can automatically show progress based on completed coursework",
  ]],
  ["cw", "Coursework", [
    "Tracks the individual things you need to study or complete",
    "Covers lectures, assignments, quizzes, projects, and labs",
    "Lets you track whether something is not started, in progress, being reviewed, submitted, or completed",
  ]],
  ["con", "Contacts / People", [
    "Keeps instructor, classmate, or school contact information",
    "Can connect the same instructor to their courses and schedule instead of typing their information repeatedly",
  ]],
];
function s06Dbs() {
  const rows = S06_DBS.map(([v, name]) =>
    `<button class="iprow" type="button" data-act="set" data-k="c60" data-v="${v}" data-st="c60" data-on="${v}" data-mode="eq"><span class="ftcaret ipcaret" aria-hidden="true"></span><span class="fname">${name}</span></button>`).join("");
  const descs = S06_DBS.map(([v, name, points]) =>
    `<div class="ipd" data-st="c60" data-on="${v}" data-mode="eq"><span class="iph">${name}</span><ul class="wa-list wa-list--ul">${points.map((p) => `<li>${p}</li>`).join("")}</ul></div>`).join("");
  return `<p class="mut" style="font-size:14.5px;margin:2px 0 10px">Click a database to see what it is for.</p>
<div class="ipx">
<div class="ipx-tree ftree"><div class="iproot mono">Academia</div><div class="iprows">${rows}</div></div>
<div class="ipx-desc">${descs}</div>
</div>`;
}

// A real, copyable link (opens a new tab) and a text-only pointer for the
// Discord recording, which has no public URL.
const ACADEMIA_URL = "https://ninth-potential-0e7.notion.site/ACADEMIA-39384ccf1fbf80b59e1bf157d8265c7b";

const SECTION_06_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>06 · notion for notes and school</span><span class="lvl">GOING DEEPER</span></div>
<h1 class="h1">Notion for notes and school</h1>
<p class="cover"><b>What this section covers:</b> Using <b class="nem">Notion</b> as a place for notes, links, progress, and information you want to see quickly.</p>
<p class="cover"><b>Why it matters:</b> Your folders answer <b>"Where is the file?"</b> and your calendar answers <b>"When is it happening?"</b> Notes and information you want to review need a home too.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">What a dashboard is for</h2>
<p>A school dashboard can surface the information you want to see quickly.</p>
<p><b>Useful things to keep visible:</b></p>
<ul class="wa-list wa-list--ul">
<li>Your current courses</li>
<li>Your weekly class schedule</li>
<li>Course modules or weekly topics</li>
<li>Lectures, assignments, quizzes, projects, and labs</li>
<li>Coursework status and progress</li>
<li>Instructor information</li>
<li>Room and building details</li>
<li>Links to your LMS</li>
<li>Links to your course folders</li>
<li>Semester or term information</li>
<li>Academic planning pages</li>
</ul>
<div class="note"><span class="nl">NOTE</span>Your dashboard does not need to become another place where you store everything. Think of it as a <b>control panel</b> that connects you to the information and resources you use most often.</div>
<p><b>What can stay somewhere else:</b></p>
${s06Stays()}
<p>Your folders can remain the source of truth for files. Your calendar can remain the source of truth for time, deadlines, and reminders. <b class="nem">Notion</b> gives you a useful <b>view</b> of your school information and progress.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Jazzy's Notion OS</h2>
<p>This is the <b class="nem">Notion</b> system I used during my Computer Science degree. It became one of the tools that helped me a lot throughout my academic life, because I had one place where I could quickly see the school information I needed without digging through different folders, websites, and notes.</p>
${s06Shots()}
<div class="note"><span class="nl">NOTE</span>You do not need to copy my entire setup. The point is to see how a dashboard can bring useful school information together in one place while your actual files, calendar, and code continue living in their proper systems.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">The Academia template</h2>
<p>The <b>Academia</b> template is the school organization system we built together during a previous <b>DevTok Pinas session</b>.</p>
<ul class="wa-list wa-list--ul">
<li>The session recording is available in our <b>Discord</b></li>
<li>You can copy the template and use it as a starting point</li>
<li>You can also follow the recording if you want to understand how the system was built</li>
</ul>
<p>The Academia system is built around five connected school databases, plus a Contacts or People database for instructors and classmates.</p>
${s06Flow()}
<p>Here's what each part is for:</p>
${s06Dbs()}
<div class="nlinks">
<a class="nlink" href="${ACADEMIA_URL}" target="_blank" rel="noopener noreferrer"><span class="nlink-k">Template</span><span class="nlink-t">Copy or view the Academia template<span class="nshot-ext" aria-hidden="true"></span></span></a>
<div class="nlink nlink--muted"><span class="nlink-k">Recording</span><span class="nlink-t">Full Academia walkthrough — available in the DevTok Pinas Discord</span></div>
</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Start with the parts you actually need</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> If you copy the template, you do not need to fill out everything immediately.</p>
<div class="grid2">
<div class="evtcard"><h3 class="h3">Start with</h3><ul class="wa-list wa-list--ul"><li>Your current <b>Year + Term</b></li><li>Your current <b>Courses</b></li><li>Your regular <b>class schedule</b></li><li>Your <b>LMS link</b> for each course</li><li>Your <b>course folder link</b> for each course</li><li>Your <b>instructors</b>, if useful</li></ul></div>
<div class="evtcard"><h3 class="h3">Add as the semester starts</h3><ul class="wa-list wa-list--ul"><li>Modules or weekly topics</li><li>Lectures</li><li>Assignments</li><li>Quizzes</li><li>Projects</li><li>Labs</li><li>Progress tracking</li></ul></div>
</div>
<div class="note"><span class="nl">NOTE</span>Build the data as school gives it to you. You do not need to enter an entire semester's worth of coursework before classes even start.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Keeping it maintainable</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> A few useful rules:</p>
<ul class="wa-list wa-list--ul">
<li>Start with fewer views than you think you need.</li>
<li>Don't track something just because <b class="nem">Notion</b> allows you to.</li>
<li>Link to files instead of uploading another copy when the original already has a proper home.</li>
<li>Add properties or views when you notice a real need for them.</li>
<li>Remove or hide things you consistently ignore.</li>
<li>If updating <b class="nem">Notion</b> takes more time than the schoolwork it tracks, simplify it.</li>
</ul>
<div class="note"><span class="nl">NOTE</span>The goal is not to maintain <b class="nem">Notion</b>. The goal is for <b class="nem">Notion</b> to make school easier to manage.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Other options</h2>
<p><b class="nem">Notion</b> is only one option. You could also use:</p>
<div class="chiprow">
<span class="optchip">Obsidian</span><span class="optchip">OneNote</span><span class="optchip">Google Docs</span><span class="optchip">Apple Notes</span><span class="optchip">A physical notebook</span>
</div>
<p>The important part is having a place where you naturally expect your notes and school information to be.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li><b class="nem">Notion</b> can complement your folders and calendar instead of replacing them.</li>
<li>A dashboard can give you one place to quickly see useful school information.</li>
<li>The Academia template connects <b>terms, courses, schedules, modules, coursework, and contacts</b>.</li>
<li>Course pages can keep important links and information close at hand.</li>
<li>Modules and coursework let you track schoolwork at a more detailed level.</li>
<li>You do not need to use every database, property, or view immediately.</li>
<li>You also do not need <b class="nem">Notion</b> specifically for this organization system to work.</li>
</ul>
<div class="closer"><span class="k">COPY</span><p>Copy the Academia template, add your current term and courses, then fill in the rest as you actually need it.</p></div>
</div></div>`;

/* ---------- section 07: coding workspace ---------- */

// The three parts of a workspace. Part 3 (installed tools) is this section's
// focus, so it's marked.
const s07Parts = () => `<div class="wsparts">
<div class="wspart"><span class="wspart-n mono">1</span><span class="wspart-h">Where your code lives</span><p>Your project folder inside Development.</p></div>
<div class="wspart"><span class="wspart-n mono">2</span><span class="wspart-h">What you open it with</span><p>Your editor or IDE, with the whole project folder open.</p></div>
<div class="wspart wspart--focus"><span class="wspart-tag">This section</span><span class="wspart-n mono">3</span><span class="wspart-h">What's installed</span><p>The tools needed to run and work with the code.</p></div>
</div>`;

// "What to install, by job" — a when-to-install filter. Click a timing to see
// which tools belong there; it opens on "Now", the set you actually start with.
// group c70.
const S07_INSTALL = [
  ["now", "Now", [
    ["Write code", "VS Code or IntelliJ IDEA"],
    ["Run your language", "Python, Node.js, Java — whatever your classes use"],
    ["Track changes", "Git"],
    ["Type commands", "Terminal — built into VS Code and IntelliJ IDEA"],
    ["Install packages", "pip, npm — comes with the ecosystem"],
  ]],
  ["soon", "Soon", [
    ["Format code", "Prettier or Black"],
  ]],
  ["asneeded", "As needed", [
    ["Check code quality", "Built-in IDE inspections; ESLint or Pylint when your project uses them"],
    ["Test APIs", "Postman — when you build or use an API"],
    ["Work with databases", "DataGrip — when you need it"],
  ]],
  ["later", "Later", [
    ["Containers", "Docker — later, if required"],
  ]],
];
function s07Install() {
  const chips = S07_INSTALL.map(([v, label, items]) =>
    `<button class="tchip" type="button" data-act="set" data-k="c70" data-v="${v}" data-st="c70" data-on="${v}" data-mode="eq">${label}<span class="tchip-n mono">${items.length}</span></button>`).join("");
  const cards = S07_INSTALL.flatMap(([v, label, items]) => items.map(([job, tool]) =>
    `<div class="instcard" data-st="c70" data-on="${v}" data-mode="eq"><span class="inst-job">${job}</span><span class="inst-tool">${tool}</span></div>`)).join("");
  return `<div class="tchips" role="group" aria-label="Filter the tools by when to install them">${chips}</div>
<div class="instgrid">${cards}</div>`;
}

// Editor extensions — a clickable catalogue (same reveal pattern as the section
// 06 databases). group c71.
const S07_EXT = [
  ["lang", "Language extension", "Adds support for the language you're learning — Python, Java, C/C++, or whatever your current class or project uses."],
  ["prettier", "Prettier", "Formats supported code consistently. Especially common in web projects."],
  ["eslint", "ESLint", "Useful for JavaScript or TypeScript projects that use ESLint rules."],
  ["liveserver", "Live Server", "Handy when working on simple HTML, CSS, and JavaScript projects locally."],
];
function s07Ext() {
  const rows = S07_EXT.map(([v, name]) =>
    `<button class="iprow" type="button" data-act="set" data-k="c71" data-v="${v}" data-st="c71" data-on="${v}" data-mode="eq"><span class="ftcaret ipcaret" aria-hidden="true"></span><span class="fname">${name}</span></button>`).join("");
  const descs = S07_EXT.map(([v, name, desc]) =>
    `<div class="ipd" data-st="c71" data-on="${v}" data-mode="eq"><span class="iph">${name}</span><p>${desc}</p></div>`).join("");
  return `<p class="mut" style="font-size:14.5px;margin:2px 0 10px">Click an extension to see what it's for.</p>
<div class="ipx"><div class="ipx-tree ftree"><div class="iprows">${rows}</div></div><div class="ipx-desc">${descs}</div></div>`;
}

// The owner's real multi-project workspace (workspace.png) — an enlargeable
// preview, same pattern as warm-ide.png.
const s07Workspace = () => `<figure class="wsfig">
<button class="idethumb" type="button" data-act="openimg" data-isrc="${WS_SHOT}" data-mlabel="A multi-project workspace — one window titled ine (Workspace) with blood-labs-history-app and ine-coach-reports open together" aria-label="Enlarge the workspace screenshot">
<img class="idethumb-img" src="${WS_SHOT}" alt="A multi-project workspace: one window titled ine (Workspace) with two separate project folders open together — blood-labs-history-app and ine-coach-reports." loading="lazy" decoding="async">
<span class="vdemo-badge"><span class="vdemo-exp" aria-hidden="true"></span>Enlarge</span>
</button>
<figcaption class="cap"><span class="cap-tag">Example</span> — two related projects open together in one workspace.</figcaption>
</figure>`;

// The .code-workspace file that stores the grouping (illustrative names from the
// copy), as a small expandable tree.
const S07_WS_TREE = ftree([
  ["Health-Tech.code-workspace", [
    ["blood-lab-repo/"],
    ["ine-coach-report-tool/"],
  ]],
], "Example .code-workspace file grouping two repositories", { open: true, bare: true });

// The annotated editor screenshot reused from section 03 (warm-ide.png), shown
// as an enlargeable preview for "keeping the workspace usable".
const S07_IDE_SHOT = `<figure class="wsfig">
<button class="idethumb" type="button" data-act="openimg" data-isrc="${IDE_SHOT}" data-mlabel="A project open in the editor — Explorer, editor, terminal and Source Control" aria-label="Enlarge the editor screenshot">
<img class="idethumb-img" src="${IDE_SHOT}" alt="A project open in the editor: the Explorer file tree, the editor, a terminal at the project location, and the Source Control panel." loading="lazy" decoding="async">
<span class="vdemo-badge"><span class="vdemo-exp" aria-hidden="true"></span>Enlarge</span>
</button>
<figcaption class="cap">One project open, with the Explorer, editor, terminal, and Source Control in view.</figcaption>
</figure>`;

const SECTION_07_BODY = `<div class="band"><div class="in">
<div class="eyebrow"><span>07 · setting up your coding workspace</span><span class="lvl">GOING DEEPER</span></div>
<h1 class="h1">Setting up your coding workspace</h1>
<p class="cover"><b>What this section covers:</b> What a coding workspace includes and the basic tools you need to start working on projects.</p>
<p class="cover"><b>Why it matters:</b> "Set up your development environment" can sound much more complicated than it actually is when you're starting.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">What a coding workspace is</h2>
<p>Think of your workspace as three things working together:</p>
${s07Parts()}
<p>Section 03 covered the first two. This section focuses on the tools installed on your computer.</p>
</div></div><div class="band"><div class="in"><h2 class="h2">What to install, by job</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span> Install tools because you need them, not because every developer setup video lists them. <b>Pick a timing</b> to see what belongs there — start with <b>Now</b>.</p>
${s07Install()}
<p>These are only samples — there are many other tools out there, and over time you'll find what works best for you. You do not need every development tool installed on day one; start with what your current classes and projects actually use.</p>
<div class="note"><span class="nl">NOTE</span>Linters such as <b>ESLint</b> and <b>Pylint</b> are not automatically required for every student or project. Your editor or IDE already catches many syntax errors and common problems. Add a linter when your language, class, team, or project uses one for additional code-quality rules.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Extensions</h2>
<p><span class="wa-badge wa-badge--lilac">TOOL-SPECIFIC</span> The same rule applies to editor extensions. Useful ones you may come across include:</p>
${s07Ext()}
<p>You do not need to install all of these. Before installing something, ask:</p>
<div class="pn"><span class="k">ASK YOURSELF</span><p><b>What problem is this extension solving for me?</b> If you don't have an answer yet, you probably don't need it yet.</p></div>
<div class="note"><span class="nl">NOTE</span>IntelliJ IDEA already includes many features that VS Code may add through extensions, such as code inspections, refactoring tools, language support, and project analysis. The exact plugins or extensions you need will depend on the IDE and language you're using.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Another meaning of "workspace"</h2>
<p>Most of the time in this guide, <b>workspace</b> simply means the project and tools you currently have open for coding. But in editors and IDEs, <b>workspace</b> can also describe a setup where you manage <b>multiple projects together</b>.</p>
<p>In VS Code, this is a <b>multi-root workspace</b> — you add multiple separate project folders or repositories to the same window (<b>File → Add Folder to Workspace</b>), then save the setup as a <span class="mono flit">.code-workspace</span> file so you can reopen the same group later. IntelliJ IDEA has the same idea through its <b>Multi-Project Workspace</b> plugin: related projects appear together in one IDE workspace, and you can work across them without constantly opening and closing separate windows. For example:</p>
${S07_WS_TREE}
<p>The projects stay separate — each remains its own project and Git repository. I might group them like this when:</p>
<ul class="wa-list wa-list--ul">
<li>The projects are related</li>
<li>A feature in one project connects to the other</li>
<li>I need to search or reference code across both projects</li>
<li>I'm actively working between both and don't want to keep switching windows</li>
</ul>
${s07Workspace()}
<div class="note"><span class="nl">NOTE</span>You do not need a multi-project workspace for normal assignments. It becomes useful when you are actively working on two or more separate projects that relate to each other.</div>
</div></div><div class="band"><div class="in"><h2 class="h2">Keeping the workspace usable</h2>
<p>A few simple habits:</p>
<ul class="wa-list wa-list--ul">
<li>Open the project folder instead of random individual files.</li>
<li>Keep the terminal open at the project directory.</li>
<li>Close projects you aren't actively working on.</li>
<li>Delete leftover test files when you're done with them.</li>
<li>Remove extensions you no longer use.</li>
<li>If your editor becomes slow, check your extensions and whether the project is inside a synced folder.</li>
<li>Use a multi-project workspace only when the projects actually benefit from being open together.</li>
</ul>
${S07_IDE_SHOT}
</div></div><div class="band"><div class="in"><h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li>Your workspace is the project folder, editor or IDE, and development tools working together.</li>
<li>You only need a few tools to start.</li>
<li>Install the language and tools your current classes actually use.</li>
<li>Your editor or IDE already catches many coding problems; add linters when your project needs them.</li>
<li>Add extensions when they solve a specific problem.</li>
<li>VS Code can group related projects in a <b>multi-root workspace</b>.</li>
<li>IntelliJ IDEA can also manage related projects together in a <b>Multi-Project Workspace</b>.</li>
</ul>
<div class="closer"><span class="k">DO</span><p>Check that you have the basics for your current classes: an editor or IDE, your required programming language, Git, and a working terminal.</p></div>
</div></div>`;

// Its own band now, sitting right after the four folders.
const ORG_BAND = `<div class="band"><div class="in"><h2 class="h2">Where organization work goes</h2>
<p><span class="wa-badge wa-badge--amber">RECOMMENDED</span></p>
<p><b>School organizations</b> — student council, a CS society, a campus club:</p>
<ul class="wa-list wa-list--ul">
<li>These are part of your school life, so keeping their documents under Studies gives them a clear home.</li>
</ul>
<p><b>Outside-school organizations</b> — community groups, volunteer work, professional organizations:</p>
<ul class="wa-list wa-list--ul">
<li>If the material is professional or something you may eventually use on your resume, Career can make sense.</li>
<li>If it's completely personal, it doesn't need to live inside this system.</li>
</ul>
<p><b>Organization work involving code</b> — for example, an organization website or event registration tool:</p>
<ul class="wa-list wa-list--ul">
<li>Keep the working code under Development.</li>
<li>Keep the organization documents wherever they otherwise belong.</li>
</ul>
</div></div>`;

// Owner-supplied notes for the Studies and Development panels. `.np` is a
// second paragraph inside a note; `.fdir` colours a folder name in Ember.
const STUDIES_NOTE = `<div class="note"><span class="nl">NOTE</span>The main distinction is that <b>Studies holds your school documents and requirements</b>.<span class="np">If an assignment includes code, the instructions, rubric, report, or submission receipt can stay here while the working code goes in Development.</span></div>`;

const DEV_RULE_NOTE = `<div class="note"><span class="nl">NOTE</span>A simple rule you can use:<span class="np"><b>If you're actively writing code in it, keep the working project under Development.</b></span><span class="np">Keeping your code in one main location also gives you one place to look when opening projects in your editor or terminal.</span></div>`;

const DEV_EXPLAINER = `<ul class="wa-list wa-list--ul">
<li><span class="mono fdir">school/</span> — programming assignments and school projects, grouped by term</li>
<li><span class="mono fdir">learning/</span> — code written while following tutorials, courses, or documentation</li>
<li><span class="mono fdir">personal/</span> — projects you build outside school</li>
<li><span class="mono fdir">hackathons/</span> — hackathon work</li>
<li><span class="mono fdir">experiments/</span> — small tests and ideas that aren't full projects yet</li>
<li><span class="mono fdir">archive/</span> — projects you're no longer actively working on</li>
</ul>
<div class="note"><span class="nl">NOTE</span>You don't need all of these folders immediately. Start with the categories you actually use.</div>`;

/* Owner-directed copy and illustrations for section 01. */
function applyFoldersCopy(body) {
  const swap = (re, replacement, name) => {
    const next = body.replace(re, replacement);
    if (next === body) throw new Error("Folders copy not matched: " + name);
    body = next;
  };

  swap(
    /<p class="cover"><b>What this covers:<\/b>[\s\S]*?<\/p>\s*<p class="cover"><b>Why it matters:<\/b>[\s\S]*?<\/p>/,
    `<p class="cover"><b>What this section covers:</b> Four top-level folders you can use to separate school files, code, self-learning, and career material.</p>
<p class="cover"><b>Why it matters:</b> If you decide where something should go every single time you save a file, things eventually end up scattered across Downloads, Desktop, course folders, and random project directories. A few clear categories remove most of that decision-making.</p>`,
    "folders-cover"
  );

  // Four folder cards on one row.
  swap(
    /<div class="grid2">(\s*<button class="fcard")/,
    `<div class="grid2 fgrid">$1`,
    "folder-cards-grid"
  );

  // Each folder's tree lives inside its own panel, so nothing shows until a
  // card is clicked. Studies had only a bullet list — reword its note and give
  // it the tree too.
  swap(
    '<div class="note"><span class="nl">NOTE</span>Anything containing code goes in Development instead, including programming assignments. Studies holds the documents, requirements, and submissions.</div>',
    `${STUDIES_NOTE}
${TREE_STUDIES}`,
    "studies-note-and-tree"
  );

  // Development: drop the "one rule, no exceptions" line for the softer note.
  swap(
    "<p>One rule, no exceptions: <b>if it contains code, it lives here.</b> Not in your school folder, not in a course folder, not on the Desktop.</p>",
    DEV_RULE_NOTE,
    "dev-rule-note"
  );

  // Development: the three-item bullet list -> the six-folder explainer with a
  // start-small note, folder names in Ember.
  swap(
    /<ul class="wa-list wa-list--ul">\s*<li><span class="mono">school\/<\/span>[\s\S]*?<\/ul>/,
    DEV_EXPLAINER,
    "dev-explainer"
  );

  // Development's monospace <pre> tree becomes an interactive branded tree.
  const preTree = (key) =>
    new RegExp('<div class="panel" data-cw="1"><button[^>]*data-k="' + key + '"[^>]*>Copy</button>\\s*<pre class="tree"[^>]*>[\\s\\S]*?</pre></div>');
  swap(preTree("dev"), TREE_DEV, "development-tree");

  // Upskilling and Career panels are rewritten wholesale (owner-supplied copy,
  // nested topic tree, and a Career tree with PDF/MD files).
  swap(
    /<div class="fpanel" data-st="c1" data-on="ups"[\s\S]*?Upskilling holds slides, notes, downloads, and certificates\.<\/div>\s*<\/div>/,
    UPSKILLING_PANEL,
    "upskilling-panel"
  );
  swap(
    /<div class="fpanel" data-st="c1" data-on="car"[\s\S]*?Make it now, even empty\.<\/p>\s*<\/div>/,
    CAREER_PANEL,
    "career-panel"
  );

  // Remove the standalone Y3T3 window mock — the Studies tree now lives in its
  // panel, so nothing extra should sit below the four cards.
  swap(
    /<figure class="shot"><div class="win"[\s\S]*?<\/figure>/,
    "",
    "remove-y3t3-window"
  );

  // "Where organization work goes" becomes its own band, right after the four
  // folders. Pull the <details> out of the decision band, then insert the band
  // just before it.
  swap(
    /<details class="exp"><summary>Where organization work goes<\/summary>[\s\S]*?<\/details>/,
    "",
    "remove-org-details"
  );
  swap(
    '<div class="band"><div class="in"><h2 class="h2">How to decide where something goes</h2>',
    `${ORG_BAND}<div class="band"><div class="in"><h2 class="h2">How to decide where something goes</h2>`,
    "insert-org-band"
  );

  // "How to decide" — the two-questions rewrite.
  swap(
    /<div class="casc">[\s\S]*?<\/div>\s*<table class="tbl">/,
    `<div class="casc">
<p>Ask yourself two questions.</p>
<p><span class="a">1 — Am I actively writing code in this?</span></p>
<p>Yes → Development</p>
<p><span class="a">2 — If not, what is this mainly for?</span></p>
<ul class="wa-list wa-list--ul">
<li>School requirement → Studies</li>
<li>Learning outside school → Upskilling</li>
<li>Internship, job, or professional use → Career</li>
</ul>
</div>
<table class="tbl">`,
    "decide-casc"
  );

  // "When something has both code and documents" — reworded mapping.
  swap(
    "<li><b>The code</b> goes in Development</li>\n<li><b>The documents</b> — brief, requirements, forms, submission — go in Studies</li>",
    `<li><b>Code</b> → <span class="amber">Development</span></li>\n<li><b>Requirements, instructions, reports, forms, and submissions</b> → <span class="amber">Studies</span></li>`,
    "both-code-docs"
  );

  // Reveal-card answers: bold the destination folder before the em-dash.
  body = body.replace(/<span class="ans">([^<]*?) — /g, '<span class="ans"><b>$1</b> — ');
  swap(
    "Before that I had code in course folders, code on the Desktop, and code in Development, and I could never remember which.",
    "Before that, I had code in course folders and code on different drives, and I had a hard time finding it when I tried to remember which one held what.",
    "how-i-do-it-line"
  );

  // Key takeaways — full rewrite.
  swap(
    /<h2 class="h2">Key takeaways<\/h2>\s*<ul class="wa-list wa-list--ul">[\s\S]*?<\/ul>/,
    `<h2 class="h2">Key takeaways</h2>
<ul class="wa-list wa-list--ul">
<li>Four useful top-level folders are <b>Studies</b>, <b>Development</b>, <b>Upskilling</b>, and <b>Career</b>.</li>
<li><b>Studies</b> holds formal school documents and requirements.</li>
<li>Working code goes under <b>Development</b>.</li>
<li><b>Upskilling</b> holds learning material outside your curriculum.</li>
<li><b>Career</b> holds things you'll need for internships and jobs.</li>
<li>Personal files don't need to fit inside this system.</li>
</ul>`,
    "key-takeaways"
  );

  // The DO closer.
  swap(
    /<div class="closer"><span class="k">DO<\/span><p>[\s\S]*?<\/p><\/div>/,
    `<div class="closer"><span class="k">DO</span><p>Create the four main folders first. Build the folders inside them only as you actually need them.</p></div>`,
    "do-closer"
  );

  return body;
}

// toolkit body: pre-expanded by toolkit.js (its content comes from data arrays)
function toolkitBody() {
  return fs.readFileSync(__dirname + "/toolkit-body.html", "utf8");
}
function toolkitModal() {
  return fs.readFileSync(__dirname + "/toolkit-modal.html", "utf8");
}
function promptData() {
  return fs.readFileSync(__dirname + "/toolkit-prompts.json", "utf8");
}

/* ---------- 4. assemble ---------- */
const tabs = TAB_LABELS.map(([n, l], i) =>
  `  <a class="tab" role="tab" data-route="${ROUTES[i][0]}" href="#/${ROUTES[i][0]}"><span class="n">${n}</span>${l}</a>`
).join("\n") + `\n  <a class="tab tk" role="tab" data-route="toolkit" href="#/toolkit">Toolkit</a>`;

const views = ROUTES.map(([key, label], i) => {
  const prev = i > 0 ? ROUTES[i - 1] : null;
  const next = i < ROUTES.length - 1 ? ROUTES[i + 1] : ["toolkit", "Toolkit"];
  return `<section class="view sec" data-route="${key}" role="tabpanel" aria-label="${label}">\n${sectionBody(label)}\n</section>`;
}).join("\n\n");

const tkView =
  `<section class="view tksec" data-route="toolkit" role="tabpanel" aria-label="Toolkit">\n` +
  toolkitBody() + `\n</section>`;

const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Get organized as a student developer</title>
<meta name="description" content="A field guide for student developers: four folders, a rule for where files go, a calendar that reminds you, and a reset routine. DevTok Pinas.">
<link rel="stylesheet" href="css/_ds/styles.css">
<link rel="stylesheet" href="css/app.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<nav class="tabbar" role="tablist" aria-label="Sections">
${tabs}
</nav>

<main id="main">

${views}

${tkView}

</main>

<div class="rail" id="rail" role="navigation" aria-label="Subsections" hidden></div>

<div class="pnrow">
  <button class="wa-btn wa-btn--secondary wa-btn--sm" data-nav="prev" hidden></button>
  <span></span>
  <button class="wa-btn wa-btn--primary wa-btn--sm" data-nav="next" hidden></button>
</div>

${toolkitModal()}

<div class="modal vmodal" id="vmodal" hidden>
  <div class="vmbg" data-act="closev"></div>
  <div class="mbox vmbox" role="dialog" aria-modal="true" aria-label="Enlarged view">
    <button class="vmclose wa-btn wa-btn--secondary wa-btn--sm" type="button" data-act="closev">Close</button>
    <div class="vmstage"></div>
  </div>
</div>

<script id="prompt-data" type="application/json">${promptData()}</script>

<script src="js/router.js"></script>
<script src="js/components.js"></script>
<script src="js/reveal.js"></script>
</body>
</html>
`;

fs.writeFileSync(OUT + "index.html", html);

/* ---------- 5. css ---------- */
const extra = `
/* ---- Added for the standalone build (routing shell, not in the export) ---- */
.view{display:none}
.view.is-active{display:block}
/* the hidden attribute must beat .modal{display:flex} */
.modal[hidden]{display:none}
/* Previous/next is chrome, not content: pinned to the foot of the viewport so
   it sits in the same place whatever the section's length or the screen size. */
.pnrow{position:fixed;left:0;right:0;bottom:0;z-index:45;width:100%;max-width:none;display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0;padding:12px 24px;background:rgba(20,13,26,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid var(--border-hairline)}
.pnrow [hidden]{display:none}
/* keep content clear of the fixed bar and give the last subsection room */
main{padding-bottom:104px}
/* the rail sits above the bar rather than under it */
.rail{top:calc(50% - 26px)}
@media (max-width:640px){
  .pnrow{padding:10px 14px;gap:10px}
  .pnrow .wa-btn{font-size:12px;padding:8px 12px}
  main{padding-bottom:92px}
}
[tabindex="-1"]:focus,[tabindex="-1"]:focus-visible{outline:none;box-shadow:none}
.skip{position:absolute;left:-999px;top:8px;z-index:200;background:var(--surface-card);border:1px solid var(--border-strong);border-radius:8px;padding:8px 14px;color:var(--parchment)}
.skip:focus{left:16px}
.tab{text-decoration:none}
/* Active tab: the same recipe the design system uses for a selected chip —
   rose wash, rose border, soft glow. */
.tab[aria-selected="true"]{color:var(--parchment);background:var(--rose-a12);border-color:rgba(255,92,138,.5);border-bottom-color:rgba(255,92,138,.5);border-radius:10px;margin-bottom:6px;box-shadow:var(--glow-rose-soft)}
.tab[aria-selected="true"] .n{color:var(--neon-rose)}
.tabbar{align-items:center;padding-bottom:6px}
.pnav{font-family:var(--font-tech);font-size:14px;color:var(--parchment);border:1px solid var(--border-hairline);border-radius:12px;padding:12px 18px;background:var(--surface-card);transition:all 160ms var(--ease-standard);max-width:46%;text-decoration:none;display:inline-block}
.pnav:hover{border-color:var(--neon-rose);transform:translateY(-2px);box-shadow:var(--glow-rose-soft)}
.pnav .pl{display:block;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-ink)}
.pnav.next{margin-left:auto;text-align:right}
.pnav.disabled{opacity:.3;pointer-events:none}

/* ---- Document header (section 00) ---- */
/* Full-bleed looping footage with the copy on an angled plum wash: near-opaque
   behind the text, clear by ~78% across so the desk stays visible on the right,
   and fading into the page ground at the foot. The wash is what makes the type
   legible, so it is CSS rather than a treatment baked into the video. */
.hero-band{position:relative;isolation:isolate;overflow:hidden;background:var(--plum-900)}
.hero-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;pointer-events:none}
/* Not fully opaque on the left: the wash is dark enough to read against while
   the laptop and lamp stay faintly legible behind the copy. */
.hero-wash{position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:
    linear-gradient(to top,var(--ink-plum) 0,rgba(20,13,26,0) 22%),
    linear-gradient(100deg,rgba(13,8,18,.9) 0,rgba(13,8,18,.87) 44%,rgba(13,8,18,.74) 62%,rgba(20,13,26,.3) 80%,rgba(20,13,26,0) 100%)}
/* The copy sits against the left edge, not in the centred column the rest of
   the document uses, so the desk stays in frame on the right. The generous top
   and bottom padding sits the group lower and roughly centres it in the band —
   the owner preferred that to a top-aligned header. */
.hero-in{position:relative;z-index:1;margin:0;max-width:none;
  padding:64px clamp(24px,4vw,56px) 72px clamp(24px,7vw,104px)}
.hero-in>*{max-width:min(62ch,58%)}
/* Title and subhead break at fixed points (the .hbr breaks), not wherever the
   container happens to wrap, so the two-line shape holds at every desktop width. */
.hero-title{text-transform:none;font-size:clamp(34px,5.4vw,58px);line-height:1.08;margin:12px 0 10px;max-width:none}
.hero-sub{font-family:var(--font-tech);font-weight:600;font-size:clamp(18px,2.6vw,26px);line-height:1.3;color:var(--amber-glow);margin:0 0 20px;max-width:none}
.hero-lede{font-size:17.5px;color:var(--muted-ink);margin:0 0 18px}
/* The fixed breaks are a desktop device; mobile wraps in its own column. */
.hbr{display:none}
@media (min-width:761px){.hbr{display:inline}}
/* Over footage the panel reads as glass rather than a card cut out of the page. */
.hero-in .tldr{background:rgba(13,8,18,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
/* Phones get the header as it was before the footage: no video, the ordinary
   centred column, a solid TL;DR card. A background video under body copy on a
   small screen costs legibility and data for nothing. */
@media (max-width:760px){
  .hero-vid,.hero-wash{display:none}
  .hero-band{background:none}
  .hero-in{max-width:920px;margin:0 auto;padding:0 24px}
  .hero-in>*{max-width:none}
  .hero-lede{max-width:68ch}
  .hero-in .tldr{background:var(--surface-card);backdrop-filter:none;-webkit-backdrop-filter:none}
}
.tldr{position:relative;overflow:hidden;border:1px solid var(--border-strong);border-radius:var(--radius-lg);background:var(--surface-card);padding:18px 24px 20px;margin:26px 0 0;box-shadow:var(--shadow-md),var(--shadow-inset-top)}
.tldr::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--gradient-xp)}
.tldr .k{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.28em;color:var(--neon-rose)}
.tldr p{font-size:16.5px;margin:10px 0 0}

/* ---- Badges: pill tags, a step smaller, never touching their neighbours ---- */
.wa-badge{border-radius:var(--radius-pill);font-size:calc(var(--fs-label) - 1px);padding:4px 13px;margin:2px 16px 6px 0;vertical-align:2px}
/* Project rule: a tag/badge always keeps clear space before the text or line
   that follows it. A trailing text node is not an element, so :last-child would
   otherwise strip the gap and let the badge touch the words after it. */

/* ---- Section closer: lamp card, with the label in ember ---- */
p:has(> .wa-badge:first-child),li:has(> .wa-badge:first-child),.note:has(> .wa-badge:first-child){line-height:1.9}

/* The "Recommended folder setup" label reads as a tag — Lilac Signal, the
   design system's cool accent, set against the muted-ink caption. */
.shot .cap .cap-tag{color:var(--lilac-signal);font-weight:600}

/* ---- Four folder cards on one row (descriptions wrap as needed) ---- */
.grid2.fgrid{grid-template-columns:repeat(4,1fr)}
.grid2.fgrid .fcard{min-width:0}
@media(max-width:820px){.grid2.fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:460px){.grid2.fgrid{grid-template-columns:1fr}}

/* ---- Interactive folder tree: branded folder glyphs, click to expand ---- */
.ftree{border:1px solid var(--border-strong);border-radius:12px;background:var(--plum-900);box-shadow:var(--shadow-md),var(--shadow-inset-top);padding:14px 14px;margin:16px 0;overflow-x:auto;font-family:var(--font-mono)}
/* the lowkey Collapse | Expand controls above the top folder */
.fttools{display:flex;align-items:center;gap:8px;margin:0 0 10px 2px}
.fttool{background:none;border:none;color:var(--muted-ink);font-family:var(--font-tech);font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;padding:2px 5px;border-radius:5px;transition:color 120ms,background 120ms}
.fttool:hover,.fttool:focus-visible{color:var(--parchment);background:var(--parchment-a06);outline:none}
.ftsep{color:var(--border-strong);font-size:11px;user-select:none}
/* a second paragraph inside a note; a folder name coloured in Ember */
.note .np{display:block;margin-top:8px}
.fdir{color:var(--ember);font-weight:700}
.amber{color:var(--amber-glow)}
.flit{color:var(--lilac-signal)}
.ftree details{margin:0}
.ftree ul.ftkids{list-style:none;margin:0 0 0 11px;padding:0 0 0 15px;border-left:1px solid var(--border-hairline)}
.ftree ul.ftroot{margin:0;padding:0;border-left:none}
.ftrow,.ftleaf{display:flex;align-items:center;gap:9px;padding:5px 7px;border-radius:7px;white-space:nowrap}
.ftrow{cursor:pointer;list-style:none;outline:none}
.ftrow::-webkit-details-marker{display:none}
.ftrow::marker{content:""}
.ftrow:hover,.ftleaf:hover{background:var(--parchment-a06)}
.ftfolder>summary.ftrow:focus-visible{box-shadow:var(--ring-focus)}
.ftcaret{flex:none;width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:6px solid var(--muted-ink);transition:transform 120ms var(--ease-standard)}
.ftfolder[open]>summary .ftcaret{transform:rotate(90deg)}
.ftleaf .ftcaret{visibility:hidden}
.ftree .ficon{flex:none;width:22px;height:16px;border-radius:3px 3px 5px 5px;background:var(--gradient-cta);position:relative;box-shadow:var(--glow-rose-soft)}
.ftree .ficon::before{content:"";position:absolute;top:-3px;left:3px;width:9px;height:4px;border-radius:3px 3px 0 0;background:var(--ember)}
.ftree .fname{font-size:13px;color:var(--parchment)}
/* File nodes: a small document glyph with a folded corner and a type tag
   (Ember for .pdf, Lilac Signal for .md), sat in a folder-width slot so the
   filenames line up with folder names. */
.ftree .ficon{width:20px;height:15px}
.ftree .fdoc{flex:none;position:relative;width:14px;height:18px;margin:0 3px;border-radius:2px;background:var(--parchment);overflow:hidden}
.ftree .fdoc::before{content:"";position:absolute;top:0;right:0;width:0;height:0;border-top:6px solid var(--plum-900);border-left:6px solid transparent}
.ftree .fdoc::after{content:attr(data-ext);position:absolute;left:0;right:0;bottom:0;height:8px;line-height:8px;text-align:center;font-family:var(--font-mono);font-size:6.5px;font-weight:700;letter-spacing:.02em;color:var(--ink-plum)}
.ftree .fdoc--pdf::after{background:var(--ember)}
.ftree .fdoc--md::after{background:var(--lilac-signal)}
/* Section 03 file types. The uppercase tag text carries the meaning, so colour
   only groups them loosely: docs lilac, code amber, config/dotfiles rose. */
.ftree .fdoc--txt::after{background:var(--lilac-signal)}
.ftree .fdoc--py::after{background:var(--amber-glow)}
.ftree .fdoc--json::after{background:var(--amber-glow);font-size:5.4px;letter-spacing:0}
.ftree .fdoc--git::after{background:var(--neon-rose);color:var(--parchment)}
.ftree .fdoc--env::after{background:var(--neon-rose);color:var(--parchment)}
/* the folder-panel heading (Studies / Development / Upskilling / Career) reads
   a step larger than a plain .h3 label, to mark that it owns the subsection */
.fpanel > .h3:first-child{font-size:15.5px}
/* the sub-heading below it is smaller and Lilac, since it nests under Career */
.fpanel .subh{font-size:12px;color:var(--lilac-signal);margin:0 0 8px}
/* a hairline separator between a panel's sections */
.hr{height:1px;border:0;background:var(--border-hairline);margin:30px 0}
.pn p + p{margin-top:10px}

.closer .k{color:var(--ember)}
.closer::after{content:"";position:absolute;inset:0;pointer-events:none;background:var(--gradient-lamp)}
.closer>*{position:relative;z-index:1}

/* ---- Section 03: interactive pieces ---- */
/* Grid children default to min-width:auto and refuse to shrink below their
   content, bursting the track on a narrow phone. Let both columns shrink; the
   inner elements handle their own overflow (tables wrap, trees scroll). */
.c7grid>*{min-width:0}
/* The layer list follows you down a long panel, so Next / a jump is always
   reachable without scrolling back up. Sticky only where the two columns sit
   side by side; on a phone it scrolls with the page. align-self:start keeps the
   item from stretching, which sticky needs. */
@media (min-width:761px){
  .c7grid>div:first-child{position:sticky;top:74px;align-self:start;z-index:2}
}
/* Give a following section clear separation from the list above it */
.secgap{margin-top:26px}
/* Owner preference: a line right after a bullet or numbered list always needs
   clear space above it, so it reads as separate from the last bullet. */
.in .wa-list + p,.in .wa-list + h3,.lpanel .wa-list + p,.fpanel .wa-list + p{margin-top:24px}
/* Five-layer stack: the rows are buttons now (click a layer to jump straight to
   it), so they need the button reset while keeping the .lrow look. A dim row
   lifts on hover to show it is clickable; .on/.cur still win on the current one. */
button.lrow{width:100%;font-family:inherit;color:inherit;background:none;cursor:pointer;text-align:left}
button.lrow:hover{opacity:.7}
button.lrow:focus-visible{outline:none;box-shadow:var(--ring-focus)}
/* the question each layer answers, called out above its explanation */
.lask{margin:0 0 16px;padding:9px 14px;border-left:2px solid var(--ember);background:var(--parchment-a06);border-radius:0 8px 8px 0}
.lask .k{display:block;font-family:var(--font-mono);font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--ember);margin-bottom:3px}
.lask .q{font-family:var(--font-editorial);font-size:16px;color:var(--parchment)}

/* Inside a project: a clickable file catalogue on the left, its description on
   the right. The tree reuses .ftree chrome so the glyphs match the other trees. */
.ipx{display:grid;grid-template-columns:minmax(0,300px) 1fr;gap:20px;margin:14px 0;align-items:start}
@media(max-width:640px){.ipx{grid-template-columns:1fr}}
.ipx-tree{margin:0}
.iproot{font-size:13px;color:var(--parchment);margin:0 0 6px 2px}
.iprows{margin-left:11px;padding-left:14px;border-left:1px solid var(--border-hairline)}
.iprow{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:5px 7px;border:1px solid transparent;border-radius:7px;background:none;color:inherit;font-family:inherit;cursor:pointer;white-space:nowrap;transition:background 120ms}
.iprow:hover{background:var(--parchment-a06)}
.iprow:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.iprow.on{background:var(--rose-a12);border-color:var(--neon-rose);box-shadow:var(--glow-rose-soft)}
.ipcaret{visibility:hidden}
.ipx-desc{border:1px solid var(--border-hairline);border-radius:12px;background:var(--surface-card);padding:16px 18px;min-height:104px}
.ipd{display:none}
.ipd.on{display:block}
.ipd .iph{display:block;font-size:13.5px;color:var(--ember);margin-bottom:6px}
.ipd p{margin:0;font-size:15px}

/* The whole road: clickable stage chips joined by small arrows, with a single
   description that swaps below. Wraps freely so it never overflows narrow screens. */
.roadlegend{font-size:14.5px;margin:6px 0 12px}
.road{display:flex;flex-wrap:wrap;align-items:center;gap:8px 5px;margin:8px 0 4px}
.roadstage{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;padding:7px 11px;border:1px solid rgba(255,92,138,.42);border-radius:8px;background:transparent;color:var(--parchment);cursor:pointer;transition:all 140ms var(--ease-standard)}
.roadstage:hover{border-color:var(--neon-rose);background:var(--rose-a12);transform:translateY(-1px)}
.roadstage:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.roadstage.on{color:var(--parchment);border-color:var(--neon-rose);background:var(--rose-a12);box-shadow:var(--glow-rose-soft)}
/* Stages for later — not covered today. Dashed and dimmed, still clickable; the
   dashed border is kept even when selected so the "for later" cue never drops. */
.roadstage--later{border-style:dashed;border-color:rgba(255,92,138,.32);color:var(--muted-ink)}
.roadstage--later:hover,.roadstage--later.on{border-color:var(--neon-rose);color:var(--parchment)}
.roadarrow{flex:none;width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:5px solid var(--wine)}
.roadarrow--later{opacity:.5}
.roaddesc{display:none}
.roaddesc.on{display:block;border-left:3px solid var(--neon-rose);background:var(--rose-a12);border-radius:0 10px 10px 0;padding:12px 18px;margin:10px 0 0}
.roaddesc-k{display:inline-block;font-size:11px;letter-spacing:.24em;color:var(--neon-rose);vertical-align:middle}
.roadlater{display:inline-block;margin-left:10px;font-family:var(--font-mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-ink);border:1px dashed rgba(255,92,138,.45);border-radius:999px;padding:2px 9px;vertical-align:middle}
.roaddesc p{margin:8px 0 0;font-size:15px}

/* Layer 5 GitHub mark (inline vector, tinted with a token) */
.ghlogo{color:var(--parchment);margin:0 0 12px;opacity:.92}
.ghlogo svg{display:block}

/* Layer 4 commit-history mock, styled like a repository's commits page */
.ghc{border:1px solid var(--border-strong);border-radius:12px;background:var(--plum-900);box-shadow:var(--shadow-md);overflow:hidden;margin:14px 0}
.ghc-head{display:flex;align-items:center;gap:12px;padding:10px 16px;background:var(--surface-card);border-bottom:1px solid var(--border-hairline)}
.ghc-branch{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono);font-size:12px;color:var(--parchment);border:1px solid var(--border-strong);border-radius:999px;padding:3px 12px}
.ghc-branchi{width:9px;height:9px;border-radius:50%;border:2px solid var(--neon-rose);box-sizing:border-box}
.ghc-headmeta{font-family:var(--font-mono);font-size:11.5px;color:var(--muted-ink)}
.ghc-row{display:flex;align-items:center;gap:12px;padding:11px 16px;border-bottom:1px solid var(--border-hairline)}
.ghc-row:last-child{border-bottom:none}
.ghc-av{flex:none;width:22px;height:22px;border-radius:50%;background:var(--gradient-cta);box-shadow:var(--glow-rose-soft)}
.ghc-main{display:flex;flex-direction:column;gap:2px;min-width:0}
.ghc-msg{font-family:var(--font-tech);font-size:14px;color:var(--parchment);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ghc-by{font-size:11.5px;color:var(--muted-ink)}
.ghc-hash{margin-left:auto;flex:none;font-size:12px;color:var(--muted-ink);background:var(--parchment-a06);border-radius:6px;padding:3px 8px}

/* Layer 3 screen-recording preview — a looping thumbnail that opens the modal */
.vdemo{margin:16px 0}
.vdemo .cap{margin-top:12px}
.vdemo-thumb{position:relative;display:block;width:100%;max-width:440px;aspect-ratio:16/10;padding:0;border:1px solid var(--border-strong);border-radius:12px;overflow:hidden;background:var(--plum-900);cursor:pointer;box-shadow:var(--shadow-md);transition:border-color 140ms,box-shadow 140ms}
.vdemo-thumb:hover{border-color:var(--neon-rose);box-shadow:var(--glow-rose-soft)}
.vdemo-thumb:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.vdemo-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;background:var(--plum-900)}
.vdemo-badge{position:absolute;right:10px;bottom:10px;display:inline-flex;align-items:center;gap:7px;font-family:var(--font-tech);font-size:12px;color:var(--parchment);background:rgba(13,8,18,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid var(--border-hairline);border-radius:999px;padding:5px 12px 5px 11px}
.vdemo-play{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:8px solid var(--neon-rose)}
/* a centred play cue for phones, where the preview never loads */
.vdemo-thumb::after{content:"";position:absolute;top:50%;left:50%;width:48px;height:48px;transform:translate(-50%,-50%);border-radius:50%;background:var(--rose-a12);border:1px solid rgba(255,92,138,.5);box-shadow:var(--glow-rose-soft)}
.vdemo-thumb::before{content:"";position:absolute;top:50%;left:50%;z-index:1;transform:translate(-40%,-50%);width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid var(--neon-rose)}

/* The Warm Arcade IDE screenshot — a clickable preview that opens the modal */
.idethumb{position:relative;display:block;width:100%;max-width:480px;padding:0;border:1px solid var(--border-strong);border-radius:12px;overflow:hidden;background:var(--ink-plum);cursor:pointer;box-shadow:var(--shadow-md);transition:border-color 140ms,box-shadow 140ms}
.idethumb:hover{border-color:var(--neon-rose);box-shadow:var(--glow-rose-soft)}
.idethumb:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.idethumb-img{display:block;width:100%;height:auto}
/* the "expand" cue used on still previews (a small bordered square) */
.vdemo-exp{width:11px;height:11px;border:2px solid var(--neon-rose);border-radius:2px}

/* Enlarge modal — reuses .modal/.mbox; the stage holds a video or an SVG */
.vmbg{position:absolute;inset:0}
.vmbox{position:relative;z-index:1;max-width:960px;width:100%;padding:0;background:var(--ink-plum);overflow:hidden}
.vmstage{display:flex;align-items:center;justify-content:center;background:var(--ink-plum)}
.vmstage video{display:block;width:100%;max-height:82vh;background:var(--ink-plum)}
.vmstage img{display:block;width:100%;height:auto;max-height:82vh;object-fit:contain}
.vmstage svg{display:block;width:100%;height:auto;max-height:82vh}
.vmclose{position:absolute;top:12px;right:12px;z-index:2}

/* ---- Section 04: calendar ---- */
/* Calendar label colours from the md. Cobalt and Mint are owner-added calendar
   hues (blue, green), scoped here rather than added to the design system. */
:root{--cal-wine:#7A2E48;--cal-lilac:#C9A0F5;--cal-cobalt:#4F7CFF;--cal-mint:#45C69A;--cal-deepplum:#241533;--cal-amber:#FFB84D;--cal-rose:#FF5C8A;--cal-ember:#FF7A45}

/* palette explorer: swatches + a detail card */
.palgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:8px;margin:14px 0}
.swatch{display:flex;align-items:center;gap:10px;flex-wrap:wrap;text-align:left;padding:9px 12px;border:1px solid var(--border-hairline);border-radius:10px;background:var(--parchment-a06);color:var(--parchment);cursor:pointer;transition:all 140ms var(--ease-standard)}
.swatch:hover{border-color:var(--neon-rose)}
.swatch:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.swatch.on{border-color:var(--neon-rose);background:var(--rose-a12);box-shadow:var(--glow-rose-soft)}
.swatch-chip{flex:none;width:18px;height:18px;border-radius:5px;box-shadow:inset 0 0 0 1px rgba(246,237,227,.16)}
.swatch-chip.lg{width:32px;height:32px;border-radius:8px}
.swatch-name{font-family:var(--font-tech);font-size:13px}
.swatch-cat{width:100%;font-size:11.5px;color:var(--muted-ink)}
.swatch-detailwrap{border:1px solid var(--border-hairline);border-radius:12px;background:var(--surface-card);padding:14px 16px;min-height:96px;margin-top:10px}
.swatch-detail{display:none;gap:14px;align-items:flex-start}
.swatch-detail.on{display:flex}
.swatch-dh{margin:0;font-size:15px}
.swatch-hex{font-size:12px;color:var(--muted-ink);margin-left:8px}
.swatch-dc{margin:2px 0 0;font-size:12.5px;color:var(--lilac-signal)}
.swatch-why{margin:7px 0 0;font-size:14.5px}

/* prefix explorer */
.pfxrow{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
.pfxchip{font-family:var(--font-mono);font-size:12px;padding:6px 12px;border:1px solid var(--pfx);border-radius:8px;background:transparent;color:var(--parchment);cursor:pointer;transition:all 140ms var(--ease-standard)}
.pfxchip:hover{background:var(--rose-a12)}
.pfxchip:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.pfxchip.on{background:var(--pfx);color:var(--ink-plum)}
.pfxcard{display:none}
.pfxcard.on{display:block;border-left:3px solid var(--neon-rose);background:var(--rose-a12);border-radius:0 10px 10px 0;padding:12px 16px;margin:2px 0 0}
.pfxcard-ex{margin:0;font-size:14px;overflow-wrap:anywhere}
.pfxcard-tag{display:inline-block;color:var(--ink-plum);border-radius:4px;padding:1px 7px;font-weight:700;margin-right:4px}
.pfxcard-m{margin:6px 0 0;font-size:13.5px;color:var(--muted-ink)}

/* the Step 2 closing row — colour description + note stacked on the left, the
   video preview on the right, so both sides carry weight */
.labelrow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,360px);gap:20px;align-items:start;margin:16px 0}
.labelrow-l{display:flex;flex-direction:column;gap:14px}
.labelrow-l .swatch-detailwrap{margin-top:0}
.labelrow .note{margin:0}
.labelrow .vdemo{margin:0}
@media (max-width:720px){.labelrow{grid-template-columns:1fr}}

/* event builder extras */
.evr-swatch{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:6px}
.s04-subh{margin-top:30px}
.evtcard{background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:12px;padding:14px 16px}
.evtcard .h3{margin-top:0}

/* Google-Calendar-style sample week — a wide grid that scrolls on a phone */
.gcalwrap{overflow-x:auto;margin:16px 0;border:1px solid var(--border-strong);border-radius:14px;background:var(--plum-900);box-shadow:var(--shadow-md),var(--shadow-inset-top)}
.gcal{min-width:660px}
.gcal-top{display:flex;align-items:baseline;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border-hairline)}
.gcal-toptitle{font-family:var(--font-tech);font-size:15px;color:var(--parchment)}
.gcal-topsub{font-family:var(--font-mono);font-size:10.5px;color:var(--muted-ink);border:1px solid var(--border-hairline);border-radius:999px;padding:2px 10px}
.gcal-grid{display:grid;grid-template-columns:52px repeat(5,minmax(116px,1fr))}
.gcal-corner{border-bottom:1px solid var(--border-hairline)}
.gcal-dh{text-align:center;padding:7px 4px;border-left:1px solid var(--border-hairline);border-bottom:1px solid var(--border-hairline)}
.gcal-dh b{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--muted-ink)}
.gcal-dh span{font-family:var(--font-tech);font-size:17px;color:var(--parchment)}
.gcal-gutter{position:relative}
.gcal-hr{font-family:var(--font-mono);font-size:9px;color:var(--muted-ink);text-align:right;padding:2px 6px 0 0;box-sizing:border-box}
.gcal-col{position:relative;border-left:1px solid var(--border-hairline);background-image:repeating-linear-gradient(var(--border-hairline) 0 1px,transparent 1px 100%)}
.gcal-ev{position:absolute;left:3px;right:3px;border-radius:6px;padding:4px 7px;overflow:hidden;font-family:var(--font-tech);box-shadow:0 1px 2px rgba(13,8,18,.35)}
.gcal-ev-t{display:block;font-size:11px;line-height:1.2;font-weight:600;overflow:hidden}
.gcal-pfx{font-family:var(--font-mono);opacity:.85}
.gcal-ev-time{display:block;font-size:9px;opacity:.82;margin-top:1px}
.gcal-ev--wine{background:var(--cal-wine);color:var(--parchment)}
.gcal-ev--lilac{background:var(--cal-lilac);color:var(--ink-plum)}
.gcal-ev--cobalt{background:var(--cal-cobalt);color:var(--parchment)}
.gcal-ev--mint{background:var(--cal-mint);color:var(--ink-plum)}
.gcal-ev--deepplum{background:var(--cal-deepplum);color:var(--parchment)}
.gcal-ev--amber{background:var(--cal-amber);color:var(--ink-plum)}
.gcal-ev--rose{background:var(--cal-rose);color:var(--parchment)}
.gcal-ev--ember{background:var(--cal-ember);color:var(--ink-plum)}
/* task chips: circle checkbox + title, struck through when done */
.gcal-task{position:absolute;left:3px;right:3px;display:flex;align-items:center;gap:6px;padding:3px 7px;border:1px dashed var(--border-strong);border-radius:6px;background:var(--surface-card);color:var(--parchment);cursor:pointer;text-align:left;z-index:2}
.gcal-task:hover{border-color:var(--neon-rose)}
.gcal-task:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.gcal-check{flex:none;width:13px;height:13px;border:1.5px solid var(--muted-ink);border-radius:50%;position:relative;transition:background 120ms}
.gcal-task-t{font-family:var(--font-tech);font-size:10.5px;line-height:1.15;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.gcal-task.done .gcal-check{background:var(--cal-mint);border-color:transparent}
.gcal-task.done .gcal-check::after{content:"";position:absolute;left:4px;top:1px;width:3px;height:6px;border:solid var(--ink-plum);border-width:0 1.5px 1.5px 0;transform:rotate(45deg)}
.gcal-task.done .gcal-task-t{text-decoration:line-through;color:var(--muted-ink)}
/* colour legend under the week */
.gcal-legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin:12px 2px 0;font-size:12px;color:var(--muted-ink)}
.gcal-legend span{display:inline-flex;align-items:center;gap:6px}
.gcal-legend i{flex:none;width:11px;height:11px;border-radius:3px}

/* ---- Section 05: protecting your work ---- */
/* backup destinations */
.bkgrid{grid-template-columns:repeat(4,1fr)}
@media(max-width:820px){.bkgrid{grid-template-columns:1fr 1fr}}
@media(max-width:460px){.bkgrid{grid-template-columns:1fr}}
.bkdetail{border:1px solid var(--border-hairline);border-radius:12px;background:var(--surface-card);padding:16px 18px;margin-top:2px}
.bktag{display:inline-block;font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;color:var(--ember);margin-bottom:8px}
.bkdetail .note{margin:14px 0 0}
/* secret-key walkthrough steps */
.skrow{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
.skstep{display:flex;align-items:center;gap:9px;padding:8px 13px 8px 9px;border:1px solid var(--border-hairline);border-radius:10px;background:var(--parchment-a06);color:var(--muted-ink);cursor:pointer;transition:all 140ms var(--ease-standard)}
.skstep:hover{border-color:var(--neon-rose);color:var(--parchment)}
.skstep:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.skstep.on{border-color:var(--neon-rose);background:var(--rose-a12);color:var(--parchment);box-shadow:var(--glow-rose-soft)}
.skn{flex:none;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:12px;background:var(--wine);color:var(--parchment)}
.skstep.on .skn{background:var(--gradient-cta)}
.skl{font-family:var(--font-tech);font-size:12.5px}
.sktag{display:inline-block;font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;padding:3px 11px;border-radius:999px;margin-bottom:12px}
.sktag--warn{background:var(--parchment-a06);color:var(--muted-ink);border:1px solid var(--border-strong)}
.sktag--bad{background:var(--neon-rose);color:var(--parchment)}
.sktag--good{background:var(--cal-mint);color:var(--ink-plum)}
/* a config-file glyph for the .gitignore explorer */
.ftree .fdoc--cfg::after{background:var(--muted-ink);color:var(--parchment)}

/* ---- Chrome-style tabs: folder shape, hairline dividers, flared feet ---- */
/* A full-width rose hairline under the bar separates the nav from the section
   content below it — the active tab's rose wash sits flush on this line. */
.tabbar{align-items:flex-end;padding:10px 18px 0;border-bottom:1px solid rgba(255,92,138,.28)}
.tab{position:relative;margin:0 2px;padding:10px 16px 11px;border:none;border-radius:9px 9px 0 0;background-color:transparent;background-image:none}
/* the divider Chrome draws between neighbouring tabs */
.tab+.tab{background-image:linear-gradient(to bottom,transparent 26%,var(--border-hairline) 26%,var(--border-hairline) 74%,transparent 74%);background-size:1px 100%;background-position:left center;background-repeat:no-repeat}
.tab[aria-selected="true"]{color:var(--parchment);background-color:var(--rose-a12);background-image:none;box-shadow:none;margin-bottom:0;border-radius:9px 9px 0 0}
.tab[aria-selected="true"]+.tab{background-image:none}
/* feet: quarter-circle cut-outs so the active tab flows into the page */
.tab[aria-selected="true"]::before,.tab[aria-selected="true"]::after{content:"";position:absolute;bottom:0;width:10px;height:10px;pointer-events:none}
.tab[aria-selected="true"]::before{left:-10px;background:radial-gradient(circle at 0 0,transparent 9.5px,var(--rose-a12) 10px)}
.tab[aria-selected="true"]::after{right:-10px;background:radial-gradient(circle at 100% 0,transparent 9.5px,var(--rose-a12) 10px)}
.tab.tk{margin-left:auto;padding-left:20px}

/* ---- Subsection rail: one dot per .band, fixed to the right edge ---- */
.rail{position:fixed;right:20px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:16px;align-items:center;padding:14px 8px;border-radius:var(--radius-pill);background:rgba(20,13,26,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--border-hairline)}
.rail[hidden]{display:none}
.raildot{position:relative;width:10px;height:10px;padding:0;border-radius:50%;border:1px solid var(--wine);background:transparent;cursor:pointer;transition:all 160ms var(--ease-standard)}
.raildot.done{background:var(--wine);border-color:var(--wine)}
.raildot.cur{width:12px;height:12px;background:var(--gradient-cta);border-color:transparent;box-shadow:var(--glow-rose-soft)}
.raildot.locked{opacity:.35}
.raildot:hover{border-color:var(--neon-rose)}
.raillabel{position:absolute;right:22px;top:50%;transform:translateY(-50%);white-space:nowrap;font-family:var(--font-tech);font-size:12px;color:var(--parchment);background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:var(--radius-sm);padding:5px 10px;opacity:0;pointer-events:none;transition:opacity 160ms var(--ease-standard);box-shadow:var(--shadow-md)}
.raildot:hover .raillabel,.raildot:focus-visible .raillabel{opacity:1}
.band[hidden]{display:none}
/* Advance control: a glowing round arrow. The chevron is drawn from borders,
   not set as a character or an icon asset. */
.continue{display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin:72px auto 8px;padding:0;border-radius:50%;cursor:pointer;background:var(--rose-a12);border:1px solid rgba(255,92,138,.5);box-shadow:var(--glow-rose-soft);transition:transform 160ms var(--ease-standard),box-shadow 160ms var(--ease-standard)}
.continue:hover{transform:translateY(2px);box-shadow:var(--glow-rose)}
.continue:active{transform:scale(var(--press-scale))}
.continue .chev{width:12px;height:12px;margin-top:-4px;border-right:2px solid var(--neon-rose);border-bottom:2px solid var(--neon-rose);transform:rotate(45deg)}
.continue{animation:contpulse 2.4s var(--ease-standard) infinite}
@keyframes contpulse{
  0%,100%{box-shadow:var(--glow-rose-soft)}
  50%{box-shadow:var(--glow-rose)}
}
@media (prefers-reduced-motion:reduce){.continue{animation:none}}
@media (max-width:860px){.rail{display:none}}

/* built mockups that stand in for the export's screenshot slots */
/* Faux file-manager window (built mockups, no images) */
.win{border:1px solid var(--border-strong);border-radius:12px;overflow:hidden;background:var(--plum-900);box-shadow:var(--shadow-md);margin:16px 0}
.wbar{display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--surface-card);border-bottom:1px solid var(--border-hairline)}
.wdot{width:11px;height:11px;border-radius:50%;background:var(--wine)}
.wdot.r{background:var(--neon-rose)}.wdot.a{background:var(--amber-glow)}.wdot.e{background:var(--ember)}
.wtitle{font-family:var(--font-mono);font-size:12px;color:var(--muted-ink);margin-left:6px}
.wbody{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;padding:16px}
.folder{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px;border-radius:8px;transition:background 150ms}
.folder:hover{background:var(--parchment-a06)}
.folder .ficon{width:46px;height:34px;border-radius:4px 4px 6px 6px;background:var(--gradient-cta);position:relative;box-shadow:var(--glow-rose-soft)}
.folder .ficon::before{content:"";position:absolute;top:-6px;left:4px;width:18px;height:8px;border-radius:4px 4px 0 0;background:var(--ember)}
.folder .fname{font-family:var(--font-mono);font-size:11.5px;color:var(--parchment);text-align:center}

/* VS Code mock (open file vs open folder / annotated) */
.vsc{border:1px solid var(--border-strong);border-radius:10px;overflow:hidden;background:var(--plum-900);font-family:var(--font-mono);font-size:11.5px}
.vsc .vtop{display:flex;background:var(--surface-card);border-bottom:1px solid var(--border-hairline);padding:6px 10px;color:var(--muted-ink);gap:10px}
.vsc .vmain{display:grid;grid-template-columns:150px 1fr;min-height:190px}
.vsc.solo .vmain{grid-template-columns:1fr}
.vsc .vside{border-right:1px solid var(--border-hairline);padding:10px;color:var(--muted-ink);position:relative}
.vsc .vedit{padding:10px;color:var(--parchment);position:relative}
.vsc .vterm{border-top:1px solid var(--border-hairline);padding:8px 10px;color:var(--amber-glow);grid-column:1/-1}
.hot{position:absolute;font-family:var(--font-tech);font-size:10px;letter-spacing:.1em;text-transform:uppercase;background:var(--neon-rose);color:var(--ink-plum);padding:2px 6px;border-radius:4px;box-shadow:var(--glow-rose-soft);white-space:nowrap;z-index:2}

/* Calendar week mock */
.calweek{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:16px 0}
.calday{border:1px solid var(--border-hairline);border-radius:8px;background:var(--surface-card);min-height:120px;padding:8px;min-width:0}
.calday .dh{font-family:var(--font-mono);font-size:10.5px;color:var(--muted-ink);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
.calev{font-family:var(--font-tech);font-size:10.5px;padding:4px 6px;border-radius:4px;margin:4px 0;color:var(--ink-plum);line-height:1.2}
.calev.cls{background:var(--neon-rose)}
.calev.ddl{background:var(--ember)}
.calev.org{background:var(--amber-glow)}
.calev.per{background:var(--lilac-signal)}

/* Notion dashboard mock */
.ndash{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin:16px 0}
.ncard{border:1px solid var(--border-hairline);border-radius:10px;background:var(--surface-card);padding:14px}
.ncard .nh{font-family:var(--font-tech);font-size:13px;color:var(--parchment);margin-bottom:6px}
.ncard .nrow{font-size:12.5px;color:var(--muted-ink);padding:3px 0;border-bottom:1px solid var(--border-hairline)}

/* screenshot drop zones, rendered as neutral placeholders */
.imgslot{height:100%;min-height:220px;border:1px dashed var(--border-strong);border-radius:12px;background:var(--plum-900);display:flex;align-items:center;justify-content:center;padding:20px;text-align:center}
.imgslot span{font-family:var(--font-tech);font-size:13px;color:var(--muted-ink);max-width:36ch}
.tblwrap{overflow-x:auto}

/* ---- Section 06: Notion ---- */
/* "Notion" set as the section's focus word — ember and bold where it appears
   in the running copy (headings stay plain, so the term stands out in text) */
.nem{color:var(--ember);font-weight:700}
/* Screenshot toggle — each shot scrolls inside its own fixed box; overscroll
   containment keeps the page still while a tall screenshot is scrolled. Both
   the image and the caption link open the full-size original in a new tab. */
.nshots{margin:16px 0}
/* When open, the card area becomes its own capped scroll region: the summary
   above it stays put (opening no longer grows the page much), so the close
   control sits where it was clicked — no scrolling the page up to reach it.
   Overscroll containment stops the scroll from chaining out to the page.
   The side padding leaves a gutter on each side of the images: the wheel lands
   on the card area there, so you can always scroll to the next screenshot
   instead of being trapped scrolling inside one image.
   Collapsed, the toggle imposes nothing and the page scrolls normally. */
.nshots[open] .expb{max-height:64vh;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding-left:34px;padding-right:34px}
.nshot{margin:0 0 20px}
.nshot:last-child{margin-bottom:2px}
.nshot-cap{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 8px}
.nshot-name{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-tech);font-size:14px;color:var(--parchment)}
.nshot-num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;font-size:12px;color:var(--neon-rose);background:var(--rose-a12);border:1px solid rgba(255,92,138,.4);border-radius:6px}
.nshot-open{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-tech);font-size:12.5px;color:var(--neon-rose);text-decoration:none;white-space:nowrap}
.nshot-open:hover{text-decoration:underline}
.nshot-ext{width:9px;height:9px;border:1.5px solid currentColor;border-radius:2px;flex:0 0 auto;position:relative;top:1px}
.nshot-box{height:440px;overflow:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--border-strong);border-radius:12px;background:var(--ink-plum);box-shadow:var(--shadow-md)}
.nshot-box a{display:block}
.nshot-box img{display:block;width:100%;height:auto}

/* "What stays elsewhere" — routing cards mapping a thing to the system that owns it */
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:14px 0}
.nstay{display:flex;flex-direction:column;gap:8px;background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:12px;padding:14px 16px}
.nstay-k{font-family:var(--font-tech);font-size:14px;color:var(--parchment)}
.nstay-arr{width:20px;height:2px;background:var(--border-strong);position:relative}
.nstay-arr::after{content:"";position:absolute;right:0;top:-3px;width:7px;height:7px;border-top:2px solid var(--border-strong);border-right:2px solid var(--border-strong);transform:rotate(45deg)}
.nstay-v{font-size:14px;color:var(--muted-ink)}

/* Academia flow — the connected databases, arrows drawn in CSS (no glyph font) */
.nflow{margin:16px 0;padding:18px;border:1px solid var(--border-hairline);border-radius:14px;background:var(--surface-card)}
.nflow-chain{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
.nflow-node{display:inline-flex;align-items:center;font-family:var(--font-tech);font-size:13.5px;color:var(--parchment);background:var(--ink-plum);border:1px solid var(--border-strong);border-radius:9px;padding:8px 13px}
.nflow-arr{flex:0 0 auto;width:22px;height:2px;background:var(--ember);position:relative}
.nflow-arr::after{content:"";position:absolute;right:0;top:-3px;width:7px;height:7px;border-top:2px solid var(--ember);border-right:2px solid var(--ember);transform:rotate(45deg)}
.nflow-rels{display:flex;flex-direction:column;gap:10px;margin-top:16px;padding-top:16px;border-top:1px solid var(--border-hairline)}
.nflow-rel{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
.nflow-rk{font-family:var(--font-tech);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-ink)}

/* Real link cards — the template link opens a new tab; the recording is text-only */
.nlinks{display:flex;flex-direction:column;gap:10px;margin:16px 0 2px}
.nlink{display:flex;align-items:center;gap:14px;padding:13px 16px;border:1px solid var(--border-strong);border-radius:12px;background:var(--surface-card);text-decoration:none;color:inherit;transition:border-color 140ms,box-shadow 140ms}
a.nlink:hover{border-color:var(--neon-rose);box-shadow:var(--glow-rose-soft)}
a.nlink:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.nlink-k{flex:0 0 auto;font-family:var(--font-tech);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--neon-rose);width:78px}
.nlink-t{display:inline-flex;align-items:center;gap:8px;font-size:14.5px;color:var(--parchment)}
.nlink--muted{opacity:.72}
.nlink--muted .nlink-k,.nlink--muted .nlink-t{color:var(--muted-ink)}

/* Alternatives chip row */
.chiprow{display:flex;flex-wrap:wrap;gap:9px;margin:12px 0}
.optchip{font-family:var(--font-tech);font-size:13px;color:var(--parchment);background:var(--surface-card);border:1px solid var(--border-strong);border-radius:999px;padding:7px 14px}

/* ---- Section 07: coding workspace ---- */
/* The three parts of a workspace; part 3 (installed tools) is the focus */
.wsparts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:16px 0}
.wspart{position:relative;background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:12px;padding:16px}
.wspart--focus{border-color:var(--neon-rose);box-shadow:var(--glow-rose-soft)}
.wspart-n{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;font-size:13px;color:var(--neon-rose);background:var(--rose-a12);border:1px solid rgba(255,92,138,.4);border-radius:7px;margin-bottom:9px}
.wspart-h{display:block;font-family:var(--font-tech);font-size:14.5px;color:var(--parchment);margin-bottom:5px}
.wspart p{margin:0;font-size:14px;color:var(--muted-ink)}
.wspart-tag{position:absolute;top:12px;right:12px;font-family:var(--font-tech);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--neon-rose)}

/* Install-by-timing filter: chips select a group, cards reveal for the match */
.tchips{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0}
.tchip{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-tech);font-size:13.5px;color:var(--muted-ink);background:var(--surface-card);border:1px solid var(--border-strong);border-radius:999px;padding:7px 15px;cursor:pointer;transition:color 120ms,border-color 120ms,background 120ms}
.tchip:hover{color:var(--parchment)}
.tchip:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.tchip.on{color:var(--parchment);border-color:var(--neon-rose);background:var(--rose-a12)}
.tchip-n{font-size:11.5px;color:var(--muted-ink);background:var(--plum-900);border-radius:999px;padding:1px 7px}
.tchip.on .tchip-n{color:var(--neon-rose)}
.instgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:6px 0 4px}
.instcard{display:none;flex-direction:column;gap:4px;background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:10px;padding:13px 15px}
.instcard.on{display:flex}
.inst-job{font-family:var(--font-tech);font-size:14px;color:var(--parchment)}
.inst-tool{font-size:13.5px;color:var(--muted-ink)}

/* Project rule: an image/figure keeps clear vertical space from the text around
   it (above and below), and its caption sits clear of the image rather than
   hugging it. Applied to every image-bearing figure, not just this one. */
.wsfig,.vdemo,figure.shot{margin-top:26px;margin-bottom:26px}
.wsfig .cap,figure.shot .cap{margin-top:14px}

@media (max-width:640px){
  .in{padding-left:16px;padding-right:16px}
  .grid3{grid-template-columns:1fr}
  .nshot-box{height:360px}
  .nshots[open] .expb{padding-left:16px;padding-right:16px}
  .wsparts{grid-template-columns:1fr}
  .instgrid{grid-template-columns:1fr}
  .pnrow{padding-left:16px;padding-right:16px}
  .c7grid{grid-template-columns:1fr}
  /* the layer's question forces the single-column grid wider than the phone;
     it is redundant here — each panel repeats it as the "It answers" callout */
  .lrow .lq{display:none}
  /* five 1fr columns force a min-content overflow at 375px */
  .calweek{grid-template-columns:repeat(2,1fr)}
}
`;

fs.writeFileSync(OUT + "css/app.css",
  "/* ============================================================\n" +
  "   app.css — the Claude Design export stylesheets, verbatim,\n" +
  "   plus the routing-shell rules the standalone build needs.\n" +
  "   Source: planning/Session website with tabs/*.dc.html\n" +
  "   ============================================================ */\n\n" +
  "/* ---------- Student Dev Guide.dc.html ---------- */\n" + guideCSS +
  "\n\n/* ---------- Toolkit.dc.html ---------- */\n" + tkCSS +
  "\n" + extra);

console.log("index.html:", html.length, "bytes");
console.log("app.css   :", (guideCSS + tkCSS + extra).length, "bytes");
console.log("leftover mustache in output:", (html.match(/\{\{/g) || []).length);
console.log("leftover onClick in output :", (html.match(/onClick/g) || []).length);
