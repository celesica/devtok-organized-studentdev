/* build.js — regenerate site/index.html + app.css from the Claude Design
   exports, converting the template bindings into plain data attributes that
   site/js/components.js understands. Run from the scratchpad. */
const fs = require("fs");
const MOCKUPS = require("./mockups.js");
const P = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/planning/Session website with tabs/";
const OUT = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/site/";

const guide = fs.readFileSync(P + "Student Dev Guide.dc.html", "utf8");
const toolkit = fs.readFileSync(P + "Toolkit.dc.html", "utf8");

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

  return s;
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


/* The document header the copy doc specifies: a gold subtitle, the full lede,
   and a labelled TL;DR. The export had trimmed all three. Sourced from
   planning/site-copy-all-sections.md, which is the authority for copy. */
const HERO = `<div class="band"><div class="in">
<div class="eyebrow"><span>Field guide</span></div>
<h1 class="h1 hero-title">Get Organized as a Student Developer</h1>
<p class="hero-sub">Build a Better System for Classes, Projects, and Your Coding Workspace</p>
<p class="hero-lede">This guide walks through how to set up an organization system for your school files, your coding projects, and the things you learn on your own. It's built for CS, IT, and engineering students who write code as part of their coursework.</p>
<p class="meta">August 2026 &middot; Jazzy &middot; DevTok Pinas</p>
<div class="tldr"><span class="k">TL;DR</span><p>You don't need a complicated productivity system. You need four main folders, a clear rule for where each type of file goes, a calendar that actually reminds you, and a short routine for when things get messy. Everything here works whether you're starting a term, in the middle of one, or between them.</p></div>
</div></div>`;

function sectionBody(label) {
  const re = new RegExp('<section class="sec" data-screen-label="' + label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '">([\\s\\S]*?)</section>');
  const m = guide.match(re);
  if (!m) throw new Error("section not found: " + label);
  let body = convert(m[1]);
  if (label === "00 Start here") {
    const before = body;
    body = body.replace(/<div class="band"><div class="in">\s*<div class="eyebrow"><span>Field guide<\/span>[\s\S]*?<\/div><\/div>/, HERO);
    if (body === before) throw new Error("hero block not matched — check the 00 header markup");
  }
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
.hero-title{text-transform:none;font-size:clamp(34px,5.4vw,58px);line-height:1.08;margin:12px 0 10px}
.hero-sub{font-family:var(--font-tech);font-weight:600;font-size:clamp(18px,2.6vw,26px);line-height:1.3;color:var(--amber-glow);margin:0 0 20px}
.hero-lede{font-size:17.5px;color:var(--muted-ink);max-width:68ch;margin:0 0 18px}
.tldr{position:relative;overflow:hidden;border:1px solid var(--border-strong);border-radius:var(--radius-lg);background:var(--surface-card);padding:18px 24px 20px;margin:26px 0 0;box-shadow:var(--shadow-md),var(--shadow-inset-top)}
.tldr::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--gradient-xp)}
.tldr .k{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.28em;color:var(--neon-rose)}
.tldr p{font-size:16.5px;margin:10px 0 0}

/* ---- Badges: pill tags, a step smaller, never touching their neighbours ---- */
.wa-badge{border-radius:var(--radius-pill);font-size:calc(var(--fs-label) - 1px);padding:4px 13px;margin:2px 14px 6px 0;vertical-align:2px}
.wa-badge:last-child{margin-right:0}

/* ---- Section closer: lamp card, with the label in ember ---- */
p:has(> .wa-badge:first-child),li:has(> .wa-badge:first-child),.note:has(> .wa-badge:first-child){line-height:1.9}

.closer .k{color:var(--ember)}
.closer::after{content:"";position:absolute;inset:0;pointer-events:none;background:var(--gradient-lamp)}
.closer>*{position:relative;z-index:1}

/* ---- Chrome-style tabs: folder shape, hairline dividers, flared feet ---- */
.tabbar{align-items:flex-end;padding:10px 18px 0;border-bottom:none}
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
@media (max-width:640px){
  .in{padding-left:16px;padding-right:16px}
  .pnrow{padding-left:16px;padding-right:16px}
  .c7grid{grid-template-columns:1fr}
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
