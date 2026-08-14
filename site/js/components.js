/* components.js — the interaction runtime for the Claude Design markup.
   The export drives everything from one small state object: a click sets
   state[group] = value, and every element carrying data-st/data-on
   recomputes its class. This file reimplements that in plain JS so the
   React runtime is not needed.

   Element contract (produced by the build conversion):
     data-act="pick|rv|rst|rck|nxt|bck|copy|tck"   what a click does
     data-k / data-v                                group + value it sets
     data-st / data-on / data-mode                  how it reacts to state
       mode eq       -> "on" when state === value
       mode gte      -> "on" when state >= value        (accumulating reveals)
       mode gte-cur  -> "on" when state >= value, plus "cur" when equal
       mode reveal   -> drops "hid" when state === value
     data-ck="id"                                   checklist item
     data-count / data-ck-count / data-label        text readouts
*/
(function () {
  "use strict";

  var state = {};        // group -> value (string or number)
  var checks = {};       // checklist id -> bool
  var CK_KEY = "sdev.reset.v1";

  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- storage (never fatal) ---------- */
  function loadChecks() {
    try { checks = JSON.parse(localStorage.getItem(CK_KEY) || "{}") || {}; }
    catch (e) { checks = {}; }
  }
  function saveChecks() {
    try { localStorage.setItem(CK_KEY, JSON.stringify(checks)); } catch (e) {}
  }

  /* ---------- defaults ----------
     Copied from the export's own initial state, so every component opens on the
     step the design intended rather than on nothing:
       state={... sel:{c7:1,c12:0,c16:1,c18:'now',c10:'ex',c3:'topic'} ...}
     Groups absent here (c1, c4, c6, c9, c11, c15, c21) start unselected by design. */
  var INITIAL = { c7: 1, c12: 0, c16: 1, c18: "now", c10: "ex", c3: "topic" };

  function applyDefaults() {
    Object.keys(INITIAL).forEach(function (k) { state[k] = INITIAL[k]; });
    // a reset button's data-v0 is the authority when it disagrees
    $all("[data-act='rst'][data-k][data-v0]").forEach(function (b) {
      var k = b.getAttribute("data-k");
      if (state[k] === undefined) state[k] = coerce(b.getAttribute("data-v0"));
    });
  }
  function resetValue(k) {
    if (INITIAL[k] !== undefined) return INITIAL[k];
    var b = document.querySelector("[data-act='rst'][data-k='" + k + "'][data-v0]");
    return b ? coerce(b.getAttribute("data-v0")) : undefined;
  }
  function coerce(v) { return /^-?\d+$/.test(v) ? parseInt(v, 10) : v; }

  /* ---------- render ---------- */
  function render() {
    $all("[data-st][data-on]").forEach(function (el) {
      // multi-select reveals keep a set, not a single value
      if (el.getAttribute("data-act") === "rv") {
        var set = state.c4rev || {};
        el.classList.toggle("on", !!set[el.getAttribute("data-on")]);
        el.setAttribute("aria-pressed", set[el.getAttribute("data-on")] ? "true" : "false");
        return;
      }
      var k = el.getAttribute("data-st");
      var want = coerce(el.getAttribute("data-on"));
      var mode = el.getAttribute("data-mode") || "eq";
      var cur = state[k];
      var on = false, isCur = false;

      if (mode === "gte" || mode === "gte-cur") {
        var n = typeof cur === "number" ? cur : parseInt(cur, 10);
        if (!isNaN(n)) { on = n >= want; isCur = n === want; }
      } else {
        on = cur !== undefined && String(cur) === String(want);
        isCur = on;
      }

      if (mode === "reveal") {
        el.classList.toggle("hid", !on);
      } else {
        el.classList.toggle("on", on);
        if (mode === "gte-cur") el.classList.toggle("cur", isCur);
      }
    });

    // selectable controls reflect their own group
    $all("[data-act='pick'][data-k][data-v]").forEach(function (el) {
      if (el.hasAttribute("data-st")) return; // already handled above
      var on = String(state[el.getAttribute("data-k")]) === String(el.getAttribute("data-v"));
      el.classList.toggle("on", on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $all("[data-act='rv'][data-v]").forEach(function (el) {
      if (el.hasAttribute("data-st")) return;
      var set = state.c4rev || {};
      el.classList.toggle("on", !!set[el.getAttribute("data-v")]);
    });

    // counters
    $all("[data-count]").forEach(function (el) {
      var k = el.getAttribute("data-count");
      var maxBtn = document.querySelector("[data-act='nxt'][data-k='" + k + "'][data-max]");
      var max = maxBtn ? maxBtn.getAttribute("data-max") : "";
      var cur = state[k] === undefined ? 0 : state[k];
      el.textContent = max ? cur + " / " + max : String(cur);
    });
    $all("[data-label]").forEach(function (el) {
      el.textContent = state[el.getAttribute("data-label")] === "on" ? "Hide" : "Reveal";
    });

    // checklist
    $all("[data-ck]").forEach(function (el) {
      var on = !!checks[el.getAttribute("data-ck")];
      el.classList.toggle("done", on);
      el.setAttribute("role", "checkbox");
      el.setAttribute("aria-checked", on ? "true" : "false");
    });
    var total = $all("[data-ck]").length;
    var done = $all("[data-ck]").filter(function (el) { return !!checks[el.getAttribute("data-ck")]; }).length;
    $all("[data-ck-count]").forEach(function (el) { el.textContent = done + " / " + total; });

    // step buttons disable at their bounds
    $all("[data-act='nxt'][data-k][data-max]").forEach(function (b) {
      var k = b.getAttribute("data-k"), max = parseInt(b.getAttribute("data-max"), 10);
      var cur = state[k] === undefined ? 0 : Number(state[k]);
      b.disabled = cur >= max;
    });
    $all("[data-act='bck'][data-k]").forEach(function (b) {
      var k = b.getAttribute("data-k"), min = parseInt(b.getAttribute("data-min") || "0", 10);
      var cur = state[k] === undefined ? 0 : Number(state[k]);
      b.disabled = cur <= min;
    });
  }

  /* ---------- copy ---------- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return legacy(text); });
    }
    return Promise.resolve(legacy(text));
  }
  function legacy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      return true;
    } catch (e) { return false; }
  }
  function flash(btn) {
    var old = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(function () { btn.textContent = old; }, 1400);
  }

  /* ---------- click handling ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-act]") : null;
    if (!el) return;
    var act = el.getAttribute("data-act");
    var k = el.getAttribute("data-k");

    if (act === "pick") {
      var v = coerce(el.getAttribute("data-v"));
      state[k] = (String(state[k]) === String(v)) ? undefined : v;   // click again to clear
      render(); return;
    }
    if (act === "rv") {                                              // multi-select reveal
      state.c4rev = state.c4rev || {};
      var id = el.getAttribute("data-v") || el.getAttribute("data-on");
      state.c4rev[id] = !state.c4rev[id];
      render(); return;
    }
    if (act === "rst") {
      if (k === "c4" || !k) state.c4rev = {};
      if (k) state[k] = el.hasAttribute("data-v0") ? coerce(el.getAttribute("data-v0")) : resetValue(k);
      render(); return;
    }
    if (act === "rck") { checks = {}; saveChecks(); render(); return; }
    if (act === "nxt") {
      var max = parseInt(el.getAttribute("data-max"), 10);
      var cur = state[k] === undefined ? 0 : Number(state[k]);
      if (cur < max) state[k] = cur + 1;
      render(); return;
    }
    if (act === "bck") {
      var min = parseInt(el.getAttribute("data-min") || "0", 10);
      var c2 = state[k] === undefined ? 0 : Number(state[k]);
      if (c2 > min) state[k] = c2 - 1;
      render(); return;
    }
    if (act === "tck") {
      var cid = el.getAttribute("data-ck");
      checks[cid] = !checks[cid]; saveChecks(); render(); return;
    }
    if (act === "copy") {
      // matches the export: prefer every [data-l] line, else the [data-cs] block
      var wrap = el.closest("[data-cw]") || el.parentNode;
      var lines = wrap.querySelectorAll("[data-l]");
      var txt = "";
      if (lines.length) {
        txt = Array.prototype.map.call(lines, function (x) { return x.textContent; }).join("\n");
      } else {
        var src = wrap.querySelector("[data-cs]") || wrap.querySelector("pre");
        txt = src ? (src.innerText || src.textContent) : "";
      }
      copyText(txt).then(function () { flash(el); });
      return;
    }
    if (act === "jump") {
      var target = document.getElementById(el.getAttribute("data-j"));
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 70 });
      return;
    }
    if (act === "openp") { openPrompt(el.getAttribute("data-id"), el); return; }
    if (act === "closep") { closePrompt(); return; }
    if (act === "closebg") { if (e.target === el) closePrompt(); return; }
  });

  /* ---------- prompt modal ---------- */
  var PROMPTS = {};
  var modalEl, lastFocus;
  function loadPrompts() {
    var tag = document.getElementById("prompt-data");
    if (!tag) return;
    try { PROMPTS = JSON.parse(tag.textContent) || {}; } catch (e) { PROMPTS = {}; }
  }
  function openPrompt(id, trigger) {
    var p = PROMPTS[id];
    modalEl = document.getElementById("pmodal");
    if (!p || !modalEl) return;
    lastFocus = trigger || document.activeElement;
    var box = modalEl.querySelector(".mbox");
    box.querySelector("p").textContent = p.t;
    var uw = box.querySelectorAll("p")[1];
    if (uw) uw.innerHTML = "<b>Use this when:</b> " + p.uw;
    var pre = box.querySelector(".mpre");
    if (pre) pre.textContent = p.b;
    modalEl.removeAttribute("hidden");
    var first = box.querySelector("button");
    if (first) first.focus();
  }
  function closePrompt() {
    if (!modalEl) modalEl = document.getElementById("pmodal");
    if (!modalEl) return;
    modalEl.setAttribute("hidden", "");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // Esc closes, Tab stays inside — the export bound Escape globally too
  document.addEventListener("keydown", function (e) {
    var m = document.getElementById("pmodal");
    if (!m || m.hasAttribute("hidden")) return;
    if (e.key === "Escape") { closePrompt(); return; }
    if (e.key === "Tab") {
      var f = $all("button, [href], input, [tabindex]:not([tabindex='-1'])", m)
        .filter(function (x) { return !x.disabled; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  /* ---------- init ---------- */
  function init() {
    loadChecks();
    loadPrompts();
    applyDefaults();
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
