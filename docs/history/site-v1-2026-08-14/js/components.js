/* components.js — interactive components for the guide + toolkit.
   Plain global script (no modules) so it runs from file://.
   Every component: neutral start, click-to-reveal, keyboard operable,
   reset control, reduced-motion respected (handled in CSS). */
(function () {
  "use strict";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- Copy to clipboard (works on file:// via fallback) ---------- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  function legacyCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      return true;
    } catch (e) { return false; }
  }
  function flashCopied(btn) {
    var old = btn.textContent;
    btn.textContent = "Copied"; btn.classList.add("done");
    setTimeout(function () { btn.textContent = old; btn.classList.remove("done"); }, 1400);
  }
  function initCopy() {
    $all("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sel = btn.getAttribute("data-copy");
        var target = sel === "self" ? btn.parentNode : document.querySelector(sel);
        var text = btn.getAttribute("data-copy-text");
        if (!text && target) { text = target.innerText || target.textContent; }
        copyText((text || "").replace(/ /g, " ")).then(function () { flashCopied(btn); });
      });
    });
  }

  /* ---------- Reveal grid: items toggle their own answer ---------- */
  function initReveal() {
    $all('[data-component="reveal"]').forEach(function (wrap) {
      var single = wrap.hasAttribute("data-single");
      var items = $all(".ibtn", wrap);
      items.forEach(function (item) {
        item.setAttribute("aria-expanded", "false");
        item.addEventListener("click", function () {
          var open = item.getAttribute("aria-expanded") === "true";
          if (single) items.forEach(function (o) { o.setAttribute("aria-expanded", "false"); });
          item.setAttribute("aria-expanded", open ? "false" : "true");
        });
      });
      var reset = $("[data-reset]", wrap);
      if (reset) reset.addEventListener("click", function () {
        items.forEach(function (o) { o.setAttribute("aria-expanded", "false"); });
      });
    });
  }

  /* ---------- Explorer: one panel open at a time (four folders) ---------- */
  function initExplorer() {
    $all('[data-component="explorer"]').forEach(function (wrap) {
      var cards = $all(".fcard", wrap);
      var panels = $all(".fpanel", wrap);
      cards.forEach(function (card) {
        card.setAttribute("aria-pressed", "false");
        card.addEventListener("click", function () {
          var id = card.getAttribute("data-target");
          var already = card.getAttribute("aria-pressed") === "true";
          cards.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
          panels.forEach(function (p) { p.classList.remove("on"); });
          if (!already) {
            card.setAttribute("aria-pressed", "true");
            var panel = document.getElementById(id);
            if (panel) panel.classList.add("on");
          }
        });
      });
    });
  }

  /* ---------- Five-layer stack builder ---------- */
  function initStack() {
    $all('[data-component="stack"]').forEach(function (wrap) {
      var rows = $all(".lrow", wrap);
      var panels = $all(".lpanel", wrap);
      var counter = $("[data-stack-count]", wrap);
      var total = rows.length;
      var shown = 1;

      function draw() {
        rows.forEach(function (r, i) {
          r.classList.toggle("on", i < shown);
          r.classList.toggle("cur", i === shown - 1);
        });
        panels.forEach(function (p, i) { p.classList.toggle("on", i === shown - 1); });
        if (counter) counter.textContent = shown + " / " + total;
        var back = $("[data-stack-back]", wrap), next = $("[data-stack-next]", wrap);
        if (back) back.disabled = shown <= 1;
        if (next) next.disabled = shown >= total;
      }
      var nextBtn = $("[data-stack-next]", wrap);
      var backBtn = $("[data-stack-back]", wrap);
      var resetBtn = $("[data-stack-reset]", wrap);
      if (nextBtn) nextBtn.addEventListener("click", function () { if (shown < total) { shown++; draw(); } });
      if (backBtn) backBtn.addEventListener("click", function () { if (shown > 1) { shown--; draw(); } });
      if (resetBtn) resetBtn.addEventListener("click", function () { shown = 1; draw(); });
      rows.forEach(function (r, i) {
        r.addEventListener("click", function () { shown = i + 1; draw(); });
      });
      draw();
    });
  }

  /* ---------- Single-select toggle (upskilling / structure ladder) ---------- */
  function initSelect() {
    $all('[data-component="select"]').forEach(function (wrap) {
      var chips = $all("[data-target]", wrap);
      var panels = $all(".lpanel", wrap);
      function pick(id) {
        chips.forEach(function (c) { c.setAttribute("aria-selected", c.getAttribute("data-target") === id ? "true" : "false"); });
        panels.forEach(function (p) { p.classList.toggle("on", p.id === id); });
      }
      chips.forEach(function (c) { c.addEventListener("click", function () { pick(c.getAttribute("data-target")); }); });
      var def = wrap.getAttribute("data-default") || (chips[0] && chips[0].getAttribute("data-target"));
      if (def) pick(def);
    });
  }

  /* ---------- Reveal-all toggle (naming / commit comparison) ---------- */
  function initRevealAll() {
    $all('[data-component="revealall"]').forEach(function (wrap) {
      var btn = $("[data-revealall]", wrap);
      var cells = $all(".rev", wrap);
      var shown = false;
      function draw() {
        cells.forEach(function (c) { c.classList.toggle("hid", !shown); });
        if (btn) btn.textContent = shown ? "Hide" : (btn.getAttribute("data-label") || "Reveal");
      }
      if (btn) btn.addEventListener("click", function () { shown = !shown; draw(); });
      draw();
    });
  }

  /* ---------- Event anatomy: reveal fields one at a time ---------- */
  function initEvent() {
    $all('[data-component="event"]').forEach(function (wrap) {
      var rows = $all(".evr", wrap);
      var i = 0;
      function draw() {
        rows.forEach(function (r, k) { r.classList.toggle("on", k < i); });
        var next = $("[data-ev-next]", wrap);
        if (next) next.disabled = i >= rows.length;
      }
      var nextBtn = $("[data-ev-next]", wrap);
      var resetBtn = $("[data-ev-reset]", wrap);
      if (nextBtn) nextBtn.addEventListener("click", function () { if (i < rows.length) { i++; draw(); } });
      if (resetBtn) resetBtn.addEventListener("click", function () { i = 0; draw(); });
      rows.forEach(function (r, k) { r.addEventListener("click", function () { i = k + 1; draw(); }); });
      draw();
    });
  }

  /* ---------- Steps (key-in-code): one panel visible, next/back/reset ---------- */
  function initSteps() {
    $all('[data-component="steps"]').forEach(function (wrap) {
      var panels = $all(".steppanel", wrap);
      var counter = $("[data-step-count]", wrap);
      var i = 0;
      function draw() {
        panels.forEach(function (p, k) { p.classList.toggle("on", k === i); if (k === i) { p.style.display = "block"; } else { p.style.display = "none"; } });
        if (counter) counter.textContent = (i + 1) + " / " + panels.length;
        var back = $("[data-step-back]", wrap), next = $("[data-step-next]", wrap);
        if (back) back.disabled = i <= 0;
        if (next) next.disabled = i >= panels.length - 1;
      }
      var nextBtn = $("[data-step-next]", wrap), backBtn = $("[data-step-back]", wrap), resetBtn = $("[data-step-reset]", wrap);
      if (nextBtn) nextBtn.addEventListener("click", function () { if (i < panels.length - 1) { i++; draw(); } });
      if (backBtn) backBtn.addEventListener("click", function () { if (i > 0) { i--; draw(); } });
      if (resetBtn) resetBtn.addEventListener("click", function () { i = 0; draw(); });
      draw();
    });
  }

  /* ---------- Destinations (where your work lives) ---------- */
  function initDests() {
    $all('[data-component="dests"]').forEach(function (wrap) {
      var dests = $all(".dest", wrap);
      dests.forEach(function (d) {
        d.setAttribute("role", "button");
        if (!d.hasAttribute("tabindex")) d.setAttribute("tabindex", "0");
        function toggle() {
          var on = d.classList.contains("cur");
          dests.forEach(function (x) { x.classList.remove("cur"); });
          if (!on) d.classList.add("cur");
        }
        d.addEventListener("click", toggle);
        d.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } });
      });
      var reset = $("[data-dest-reset]", wrap);
      if (reset) reset.addEventListener("click", function () { dests.forEach(function (x) { x.classList.remove("cur"); }); });
    });
  }

  /* ---------- Filter (tools by when) ---------- */
  function initFilter() {
    $all('[data-component="filter"]').forEach(function (wrap) {
      var chips = $all("[data-filter]", wrap);
      var rows = $all("[data-when]", wrap);
      function apply(val) {
        chips.forEach(function (c) { c.setAttribute("aria-selected", c.getAttribute("data-filter") === val ? "true" : "false"); });
        rows.forEach(function (r) { r.style.display = (val === "all" || r.getAttribute("data-when") === val) ? "" : "none"; });
      }
      chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.getAttribute("data-filter")); }); });
      apply(wrap.getAttribute("data-default") || "now");
    });
  }

  /* ---------- Checklist with persistence ---------- */
  function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function initChecklists() {
    $all('[data-component="checklist"]').forEach(function (wrap) {
      var key = "sdev.ck." + (wrap.getAttribute("data-key") || "default") + ".v1";
      var rows = $all(".ckrow", wrap);
      var prog = $("[data-ck-prog]", wrap);
      var saved = {};
      try { saved = JSON.parse(storageGet(key) || "{}"); } catch (e) { saved = {}; }

      function updateProg() {
        var done = rows.filter(function (r) { return r.getAttribute("aria-checked") === "true"; }).length;
        if (prog) prog.textContent = done + " / " + rows.length;
      }
      function persist() {
        var state = {};
        rows.forEach(function (r, i) { state[i] = r.getAttribute("aria-checked") === "true"; });
        storageSet(key, JSON.stringify(state));
      }
      rows.forEach(function (r, i) {
        r.setAttribute("role", "checkbox");
        var on = !!saved[i];
        r.setAttribute("aria-checked", on ? "true" : "false");
        function toggle() {
          var now = r.getAttribute("aria-checked") === "true";
          r.setAttribute("aria-checked", now ? "false" : "true");
          updateProg(); persist();
        }
        r.addEventListener("click", toggle); // native <button> handles Enter/Space
      });
      var reset = $("[data-ck-reset]", wrap);
      if (reset) reset.addEventListener("click", function () {
        rows.forEach(function (r) { r.setAttribute("aria-checked", "false"); });
        updateProg(); persist();
      });
      var copy = $("[data-ck-copy]", wrap);
      if (copy) copy.addEventListener("click", function () {
        var lines = [];
        $all(".ckgroup", wrap).forEach(function (g) {
          var h = $(".ckh", g); if (h) lines.push("\n" + h.textContent.toUpperCase());
          $all(".ckrow", g).forEach(function (r) {
            var checked = r.getAttribute("aria-checked") === "true";
            lines.push((checked ? "[x] " : "[ ] ") + ($(".ckt", r) ? $(".ckt", r).textContent : r.textContent).trim());
          });
        });
        copyText(lines.join("\n").trim()).then(function () { flashCopied(copy); });
      });
      updateProg();
    });
  }

  /* ---------- PromptCard modal (focus-trapped) ---------- */
  var modal, mBox, mTitle, mUse, mPre, mCopy, opener;
  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal"; modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-labelledby", "modal-title");
    modal.innerHTML =
      '<div class="mbox">' +
      '<h2 class="mtt" id="modal-title"></h2>' +
      '<p class="muw"></p>' +
      '<pre class="mpre"></pre>' +
      '<div class="mfoot">' +
      '<button class="btn primary" data-modal-copy>Copy prompt</button>' +
      '<span class="mut mono" data-modal-hint>Replace the bracketed parts before using.</span>' +
      '<button class="btn mx" data-modal-close>Close (Esc)</button>' +
      '</div></div>';
    document.body.appendChild(modal);
    mBox = $(".mbox", modal); mTitle = $(".mtt", modal); mUse = $(".muw", modal); mPre = $(".mpre", modal);
    mCopy = $("[data-modal-copy]", modal);
    mCopy.addEventListener("click", function () { copyText(mPre.textContent).then(function () { flashCopied(mCopy); }); });
    $("[data-modal-close]", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab") {
        var f = $all("button, [href], input, [tabindex]:not([tabindex='-1'])", mBox).filter(function (el) { return !el.disabled; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }
  function openModal(title, use, text) {
    if (!modal) buildModal();
    opener = document.activeElement;
    mTitle.textContent = title; mUse.textContent = use; mPre.textContent = text;
    mCopy.textContent = "Copy prompt"; mCopy.classList.remove("done");
    modal.classList.add("on");
    mCopy.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("on");
    if (opener && opener.focus) opener.focus();
  }
  function initPromptCards() {
    $all(".pcard").forEach(function (card) {
      card.setAttribute("role", "button");
      if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
      function open() {
        var title = card.getAttribute("data-title") || "";
        var use = card.getAttribute("data-use") || "";
        var full = $(".pfull", card);
        openModal(title, use, full ? full.textContent : "");
      }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); open(); } });
    });
  }

  /* ---------- Init all ---------- */
  function init() {
    initCopy(); initReveal(); initExplorer(); initStack(); initSelect();
    initRevealAll(); initEvent(); initSteps(); initDests(); initFilter();
    initChecklists(); initPromptCards();
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); }
  else { init(); }
})();
