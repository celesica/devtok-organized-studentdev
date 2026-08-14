/* toolkit.js — expand the Toolkit export's <sc-for> loops using the data
   arrays from its own x-dc script, producing static HTML. */
const fs = require("fs");
const vm = require("vm");
const P = "/Users/jazzyb/Documents/Development/devtok/student-dev-organized/planning/Session website with tabs/";

const src = fs.readFileSync(P + "Toolkit.dc.html", "utf8");

/* ---- 1. evaluate the data arrays ---- */
const scriptSrc = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const dataOnly = scriptSrc.split(/class\s+Component\s+extends/)[0];
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(dataOnly + "\n;globalThis.__d={TPLS,CLS,PR,GLOSS};", sandbox);
const D = sandbox.__d;

/* derived values, mirroring the component's renderVals() */
// cpLabel is the copy-button text; the component swaps it to "Copied" on click,
// so the static build ships the resting label.
const tpls = D.TPLS.map(t => ({ ...t, cpLabel: "Copy" }));
const cls = D.CLS.map(c => ({ ...c, cpLabel: "Copy" }));
const pgroups = D.PR.map(g => ({
  h: g.g,
  items: g.items.map(p => ({ ...p, pv: p.b.split("\n")[0].slice(0, 64) + "…" }))
}));
const gloss = D.GLOSS;

/* ---- 2. escape + resolve ---- */
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function resolve(tpl, scope) {
  return tpl.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (m, path) => {
    const parts = path.split(".");
    let v = scope;
    for (const p of parts) {
      if (v && Object.prototype.hasOwnProperty.call(v, p)) v = v[p];
      else return m;                      // leave unknown bindings for later passes
    }
    return (v === undefined || v === null) ? "" : esc(v);
  });
}

/* ---- 3. expand <sc-for> recursively (innermost first) ---- */
function expand(html, scope) {
  const open = /<sc-for list="\{\{([a-zA-Z0-9_.]+)\}\}" as="([a-zA-Z0-9_]+)"[^>]*>/;
  let m;
  while ((m = html.match(open))) {
    const [tag, listPath, asName] = m;
    const start = m.index;
    // find the matching </sc-for>, accounting for nesting
    let depth = 1, i = start + tag.length;
    const openRe = /<sc-for\b[^>]*>/g, closeRe = /<\/sc-for>/g;
    let cursor = i, end = -1;
    while (depth > 0) {
      openRe.lastIndex = cursor; closeRe.lastIndex = cursor;
      const no = openRe.exec(html), nc = closeRe.exec(html);
      if (!nc) throw new Error("unclosed sc-for for " + listPath);
      if (no && no.index < nc.index) { depth++; cursor = no.index + no[0].length; }
      else { depth--; cursor = nc.index + nc[0].length; if (depth === 0) end = nc.index; }
    }
    const inner = html.slice(start + tag.length, end);

    // resolve the list from the current scope
    const parts = listPath.split(".");
    let list = scope;
    for (const p of parts) list = list ? list[p] : undefined;
    if (!Array.isArray(list)) list = [];

    const out = list.map(item => {
      const childScope = { ...scope, [asName]: item };
      // expand nested loops with the child scope first, then resolve fields
      return resolve(expand(inner, childScope), childScope);
    }).join("\n");

    html = html.slice(0, start) + out + html.slice(end + "</sc-for>".length);
  }
  return html;
}

/* ---- 4. take the toolkit section + modal ---- */
let body = src.match(/<section class="tksec">([\s\S]*?)<\/section>/)[1];
const modalBlock = src.match(/<sc-if value="\{\{mOpen\}\}"[^>]*>([\s\S]*?)<\/sc-if>/);
let modal = modalBlock ? modalBlock[1] : "";

const scope = { tpls, cls, pgroups, gloss };
body = expand(body, scope);
body = resolve(body, scope);

/* modal: render once as an empty, hidden shell that JS fills */
modal = modal
  .replace(/\{\{mT\}\}/g, "").replace(/\{\{mUw\}\}/g, "").replace(/\{\{mBody\}\}/g, "")
  .replace(/\{\{mCp\}\}/g, "Copy")
  .replace(/<div class="modal"/, '<div class="modal" id="pmodal" hidden');

/* ---- 5. binding conversion ---- */
function convert(s) {
  s = s.replace(/\s*onClick="\{\{jump\}\}"/g, ' data-act="jump"');
  s = s.replace(/\s*onClick="\{\{openP\}\}"/g, ' data-act="openp"');
  s = s.replace(/\s*onClick="\{\{closeP\}\}"/g, ' data-act="closep"');
  s = s.replace(/\s*onClick="\{\{closeBg\}\}"/g, ' data-act="closebg"');
  s = s.replace(/\s*onClick="\{\{copy\}\}"/g, ' data-act="copy"');
  s = s.replace(/\{\{[a-zA-Z0-9_.]*\}\}/g, "");
  s = s.replace(/\s*hint-placeholder-[a-z]+="[^"]*"/g, "");
  return s;
}
body = convert(body);
modal = convert(modal);

/* ---- 6. prompt data for the modal, as JSON ---- */
const prompts = {};
D.PR.forEach(g => g.items.forEach(p => { prompts[p.id] = { t: p.t, uw: p.uw, b: p.b }; }));

fs.writeFileSync("toolkit-body.html", body);
fs.writeFileSync("toolkit-modal.html", modal);
fs.writeFileSync("toolkit-prompts.json", JSON.stringify(prompts, null, 0));

console.log("templates :", tpls.length);
console.log("checklists:", cls.length);
console.log("prompts   :", Object.keys(prompts).length, "in", pgroups.length, "groups");
console.log("glossary  :", gloss.length);
console.log("body bytes:", body.length, "| leftover sc-for:", (body.match(/<sc-for/g) || []).length, "| leftover mustache:", (body.match(/\{\{/g) || []).length);
