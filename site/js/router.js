/* router.js — hash routing, tab state, keyboard nav, prev/next.
   Plain global script (no modules) so it runs from file://. */
(function () {
  "use strict";

  // Ordered list of routes. Guide blocks 00–09 then the toolkit.
  // `key` is the hash id; `n` is the number-key shortcut (guide only).
  var ROUTES = [
    { key: "00-start",      n: 0, label: "00 Start" },
    { key: "01-folders",    n: 1, label: "01 Folders" },
    { key: "02-school",     n: 2, label: "02 School" },
    { key: "03-projects",   n: 3, label: "03 Projects" },
    { key: "04-calendar",   n: 4, label: "04 Calendar" },
    { key: "05-protecting", n: 5, label: "05 Protect" },
    { key: "06-notion",     n: 6, label: "06 Notion" },
    { key: "07-workspace",  n: 7, label: "07 Workspace" },
    { key: "08-reset",      n: 8, label: "08 Reset" },
    { key: "09-groups",     n: 9, label: "09 Groups" },
    { key: "toolkit",       n: null, label: "Toolkit" }
  ];
  var DEFAULT = "00-start";
  var byKey = {};
  ROUTES.forEach(function (r, i) { r.i = i; byKey[r.key] = r; });

  function currentKey() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    return byKey[h] ? h : DEFAULT;
  }

  var firstRender = true;

  function render(key) {
    var route = byKey[key] || byKey[DEFAULT];

    // Views: show only the active one (instant, no fade).
    var views = document.querySelectorAll(".view");
    for (var i = 0; i < views.length; i++) {
      var v = views[i];
      var on = v.getAttribute("data-route") === route.key;
      v.classList.toggle("is-active", on);
      if (on) { v.removeAttribute("hidden"); } else { v.setAttribute("hidden", ""); }
    }

    // Tabs: reflect selection + scroll active into view on the mobile strip.
    var tabs = document.querySelectorAll(".tab");
    for (var j = 0; j < tabs.length; j++) {
      var t = tabs[j];
      var sel = t.getAttribute("data-route") === route.key;
      t.setAttribute("aria-selected", sel ? "true" : "false");
      t.setAttribute("tabindex", sel ? "0" : "-1");
      if (sel && t.scrollIntoView) {
        try { t.scrollIntoView({ inline: "center", block: "nearest" }); } catch (e) { t.scrollIntoView(); }
      }
    }

    // Shared previous/next bar, as in the export: one pair of buttons below the
    // views, relabelled per section and hidden at either end.
    var prevBtn = document.querySelector("[data-nav='prev']");
    var nextBtn = document.querySelector("[data-nav='next']");
    var prev = ROUTES[route.i - 1], next = ROUTES[route.i + 1];
    if (prevBtn) {
      if (prev) { prevBtn.textContent = "Previous — " + prev.label; prevBtn.removeAttribute("hidden"); }
      else prevBtn.setAttribute("hidden", "");
    }
    if (nextBtn) {
      if (next) { nextBtn.textContent = "Next — " + next.label; nextBtn.removeAttribute("hidden"); }
      else nextBtn.setAttribute("hidden", "");
    }

    // Move focus to the new view's heading so screen-reader and keyboard users
    // land in the new content. Skipped on first paint so arriving at a deep
    // link doesn't steal focus before the reader has oriented.
    if (!firstRender) {
      var active = document.querySelector('.view[data-route="' + route.key + '"]');
      if (active) {
        var heading = active.querySelector("h1, h2, .h1, .title");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      }
    }
    firstRender = false;
    window.scrollTo(0, 0);
    document.title = route.label + " · Get Organized as a Student Developer";
  }

  function go(key) {
    if (currentKey() === key) return;   // already here: never re-render, never scroll
    location.hash = "#/" + key;         // triggers hashchange -> render
  }

  function move(delta) {
    var cur = byKey[currentKey()];
    var next = ROUTES[cur.i + delta];
    if (next) go(next.key);
  }

  // ---- Keyboard: arrows between tabs, digits 0–9 jump to guide blocks ----
  function typingInField(e) {
    var el = e.target;
    if (!el) return false;
    var tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
  }

  document.addEventListener("keydown", function (e) {
    // Let an open modal own the keyboard (it handles Escape / focus trap).
    if (document.querySelector(".modal.on")) return;
    if (typingInField(e)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "ArrowRight") { move(1); e.preventDefault(); return; }
    if (e.key === "ArrowLeft")  { move(-1); e.preventDefault(); return; }

    if (/^[0-9]$/.test(e.key)) {
      var num = parseInt(e.key, 10);
      var match = ROUTES.filter(function (r) { return r.n === num; })[0];
      if (match) { go(match.key); e.preventDefault(); }
    }
  });

  // ---- Wire tab + prev/next clicks (anchors already carry hrefs) ----
  document.addEventListener("click", function (e) {
    var nav = e.target.closest ? e.target.closest("[data-nav]") : null;
    if (nav) { move(nav.getAttribute("data-nav") === "next" ? 1 : -1); e.preventDefault(); return; }

    // Only real navigation controls, never any ancestor that happens to carry
    // data-route — the section wrappers do, so a bare [data-route] lookup
    // turned every click inside a view into a re-navigation.
    var a = e.target.closest ? e.target.closest("a[data-route], button[data-route]") : null;
    if (a && a.tagName.toLowerCase() !== "a") {
      go(a.getAttribute("data-route"));
      e.preventDefault();
    }
  });

  window.addEventListener("hashchange", function () { render(currentKey()); });
  document.addEventListener("DOMContentLoaded", function () { render(currentKey()); });
  if (document.readyState !== "loading") { render(currentKey()); }

  // Expose for components (e.g. toolkit deep-link buttons).
  window.SDevRouter = { go: go, routes: ROUTES };
})();
