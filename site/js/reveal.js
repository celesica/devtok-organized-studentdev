/* reveal.js — one subsection at a time, with a dot rail on the right.

   Within a guide view, each `.band` is a subsection. Only the bands up to the
   revealed index are in the document; the rest carry `hidden`, so nothing the
   presenter has not reached yet can appear in frame.

   Revealing is always an explicit act: the arrow at the end of the current
   subsection, or a dot on the rail. Scrolling never reveals anything — it used
   to, and that quietly opened an extra subsection every time a rail click
   scrolled near the foot of the page.

   Below the mobile breakpoint the whole thing switches off and every band is
   shown, because progressive reveal is a presentation aid and return visitors
   on a phone want a normal scrolling document. */
(function () {
  "use strict";

  var MOBILE = 860;                 // below this, reveal everything

  var rail, bands = [], revealed = 1, route = null;

  function isMobile() { return window.innerWidth < MOBILE; }
  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function activeView() { return document.querySelector(".view.is-active"); }

  /* label a band by its own heading, falling back to the section title */
  function labelFor(band, i) {
    var h = band.querySelector(".h2, .tkh2, .h1, .tkh1");
    if (h) return h.textContent.trim();
    return i === 0 ? "Start" : "Part " + (i + 1);
  }

  function buildRail() {
    if (!rail) return;
    rail.innerHTML = "";
    if (bands.length < 2 || isMobile()) { rail.setAttribute("hidden", ""); return; }
    rail.removeAttribute("hidden");
    bands.forEach(function (b, i) {
      var dot = document.createElement("button");
      dot.className = "raildot";
      dot.type = "button";
      dot.setAttribute("data-i", i);
      dot.setAttribute("aria-label", (i + 1) + ". " + labelFor(b, i));
      var lab = document.createElement("span");
      lab.className = "raillabel";
      lab.textContent = labelFor(b, i);
      dot.appendChild(lab);
      rail.appendChild(dot);
    });
  }

  function paint() {
    if (!rail) return;
    var dots = rail.querySelectorAll(".raildot");
    var cur = currentIndex();
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("locked", i >= revealed);
      dots[i].classList.toggle("done", i < revealed && i !== cur);
      dots[i].classList.toggle("cur", i === cur);
      dots[i].setAttribute("aria-current", i === cur ? "true" : "false");
    }
  }

  /* which revealed band is nearest the top of the viewport */
  function currentIndex() {
    var best = 0, bestDist = Infinity;
    for (var i = 0; i < revealed && i < bands.length; i++) {
      var top = bands[i].getBoundingClientRect().top;
      var d = Math.abs(top - 90);
      if (top < window.innerHeight * 0.6 && d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }

  /* The advance control: a glowing arrow at the foot of the current subsection.
     The chevron is drawn in CSS rather than set as a character, since the design
     system allows Unicode only for separators and the checkbox tick. The label
     the arrow replaces moves to aria-label and title, so the control still
     announces which subsection it opens. */
  function placeContinue() {
    var view = activeView();
    var btn = document.getElementById("continue");
    if (!view || isMobile() || revealed >= bands.length) {
      if (btn) btn.remove();
      return;
    }
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "continue";
      btn.className = "continue";
      btn.type = "button";
      btn.innerHTML = '<span class="chev" aria-hidden="true"></span>';
      btn.addEventListener("click", advance);
    }
    var next = "Continue to " + labelFor(bands[revealed], revealed);
    btn.setAttribute("aria-label", next);
    btn.setAttribute("title", next);
    bands[revealed - 1].appendChild(btn);
  }

  function advance() {
    if (revealed >= bands.length) return;
    revealTo(revealed + 1);
    scrollToBand(revealed - 1);
  }

  function applyVisibility() {
    var showAll = isMobile();
    bands.forEach(function (b, i) {
      if (showAll || i < revealed) b.removeAttribute("hidden");
      else b.setAttribute("hidden", "");
    });
    placeContinue();
  }

  function revealTo(n) {
    revealed = Math.max(1, Math.min(n, bands.length));
    applyVisibility();
    paint();
  }

  function scrollToBand(i) {
    var b = bands[i];
    if (!b) return;
    var y = b.getBoundingClientRect().top + window.pageYOffset - 72;   // clear the tab bar
    window.scrollTo({ top: y, behavior: reduceMotion() ? "auto" : "smooth" });
  }

  /* ---- collect bands for the current view ---- */
  function sync() {
    var view = activeView();
    if (!view) return;
    var key = view.getAttribute("data-route");
    rail = document.getElementById("rail");

    // the toolkit is a reference library — it has its own jump chips, no reveal
    if (key === "toolkit") {
      bands = Array.prototype.slice.call(view.querySelectorAll(".band"));
      bands.forEach(function (b) { b.removeAttribute("hidden"); });
      bands = [];
      if (rail) rail.setAttribute("hidden", "");
      return;
    }

    if (key !== route) { route = key; revealed = 1; }   // new section starts closed
    bands = Array.prototype.slice.call(view.querySelectorAll(".band"));
    buildRail();
    applyVisibility();
    paint();
  }

  /* ---- rail clicks ---- */
  document.addEventListener("click", function (e) {
    var dot = e.target.closest ? e.target.closest(".raildot") : null;
    if (!dot) return;
    var i = parseInt(dot.getAttribute("data-i"), 10);
    if (i + 1 > revealed) revealTo(i + 1);              // clicking ahead reveals up to there
    scrollToBand(i);
    setTimeout(paint, 60);
  });

  /* Scrolling only moves the rail's highlight — it never reveals. */
  window.addEventListener("scroll", paint, { passive: true });

  window.addEventListener("resize", function () { applyVisibility(); buildRail(); paint(); });

  /* the router repaints on every route change */
  window.addEventListener("hashchange", function () { setTimeout(sync, 0); });
  document.addEventListener("DOMContentLoaded", sync);
  if (document.readyState !== "loading") sync();

  window.SDevReveal = { sync: sync, revealTo: revealTo, all: function () { revealTo(bands.length); } };
})();
