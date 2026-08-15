/* toolkit.js — parse the prompts out of planning/toolkit.md (the toolkit's
   source of truth) into the data the build renders, and lift the prompt modal
   shell from the export. Templates and checklists come from toolkit-data.js. */
const fs = require("fs");
const ROOT = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/";
const P = ROOT + "planning/Session website with tabs/";
const MD = fs.readFileSync(ROOT + "planning/toolkit.md", "utf8");

/* ---- prompts ---- */
// Groups are the ## headings inside # PROMPTS that hold ### P-items. These two
// ## headings are prose, not groups.
const NOT_GROUP = new Set(["Use AI as a guide, not another system to maintain", "Featured prompts"]);
const FEATURED = ["P1", "P2", "P14", "P17", "P23", "P28"];

const block = MD.slice(MD.indexOf("# PROMPTS"), MD.indexOf("# TEMPLATES"));
const lines = block.split("\n");
const groups = [];               // { name, items: [{ id, title }] }
const byId = {};                 // id -> { t, uw, b }
let group = null;
function groupNamed(n) { let g = groups.find(x => x.name === n); if (!g) { g = { name: n, items: [] }; groups.push(g); } return g; }

for (let i = 0; i < lines.length; i++) {
  const h2 = lines[i].match(/^##\s+(.+?)\s*$/);
  if (h2) { const n = h2[1].replace(/`\[[^`]*`/g, "").trim(); if (!NOT_GROUP.has(n)) group = n; continue; }
  const h3 = lines[i].match(/^###\s+(P\d+)\s+·\s+(.+?)\s*$/);
  if (!h3) continue;
  const id = h3[1];
  const title = h3[2].replace(/`\[Badge\][^`]*`/g, "").trim();
  // scan forward to the next heading for the "Use this when" line and code block
  let uw = "", body = "";
  for (let j = i + 1; j < lines.length && !/^#{2,3}\s/.test(lines[j]); j++) {
    const u = lines[j].match(/^\*\*Use this when:\*\*\s*(.+?)\s*$/);
    if (u) { uw = u[1].trim(); continue; }
    if (lines[j].startsWith("```")) {
      const buf = [];
      for (j++; j < lines.length && !lines[j].startsWith("```"); j++) buf.push(lines[j]);
      body = buf.join("\n");
      break;
    }
  }
  byId[id] = { t: title, uw, b: body };
  (group ? groupNamed(group) : groupNamed("Prompts")).items.push({ id, title });
}

/* ---- prompt modal shell, lifted from the export (JS fills it) ---- */
const src = fs.readFileSync(P + "Toolkit.dc.html", "utf8");
const mBlock = src.match(/<sc-if value="\{\{mOpen\}\}"[^>]*>([\s\S]*?)<\/sc-if>/);
let modal = mBlock ? mBlock[1] : "";
modal = modal
  .replace(/\{\{mT\}\}/g, "").replace(/\{\{mUw\}\}/g, "").replace(/\{\{mBody\}\}/g, "")
  .replace(/\{\{mCp\}\}/g, "Copy")
  .replace(/<div class="modal"/, '<div class="modal" id="pmodal" hidden')
  .replace(/\s*onClick="\{\{closeP\}\}"/g, ' data-act="closep"')
  .replace(/\s*onClick="\{\{closeBg\}\}"/g, ' data-act="closebg"')
  .replace(/\s*onClick="\{\{copy\}\}"/g, ' data-act="copy"')
  .replace(/\{\{[a-zA-Z0-9_.]*\}\}/g, "");

fs.writeFileSync(__dirname + "/toolkit-modal.html", modal);
fs.writeFileSync(__dirname + "/toolkit-prompts.json", JSON.stringify(byId, null, 0));
fs.writeFileSync(__dirname + "/toolkit-cards.json", JSON.stringify({ groups, featured: FEATURED }, null, 0));

console.log("prompts   :", Object.keys(byId).length, "in", groups.length, "groups");
console.log("featured  :", FEATURED.length);
const missing = FEATURED.filter(id => !byId[id]);
if (missing.length) throw new Error("featured prompt(s) not found: " + missing.join(", "));
const noBody = Object.keys(byId).filter(id => !byId[id].b);
if (noBody.length) throw new Error("prompt(s) with no body: " + noBody.join(", "));
