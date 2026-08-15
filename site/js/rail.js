/* rail.js — a dot rail on the right that tracks and jumps between the
   subsections of a guide view.  (Formerly reveal.js; renamed when the
   progressive-reveal model was dropped, so it no longer reveals anything.)

   Within a guide view, each `.band` is a subsection. All bands are shown at
   once; scrolling down moves through them like a normal document. The rail on
   the right mirrors your scroll position and lets you jump to any subsection.

   This used to gate the subsections one at a time behind a glowing "continue"
   arrow at the foot of each band. The owner asked to drop that: the arrow is
   gone and scrolling simply carries you into the next subsection. The rail
   stays as a lightweight progress-and-jump aid.

   Below the mobile breakpoint the rail switches off — it is a desktop
   presentation aid, and phone visitors just get the normal scrolling document. */
(function () {
  "use strict";

  var MOBILE = 860;                 // below this, hide the rail

  var rail, bands = [], route = null;

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
      dots[i].classList.toggle("done", i < cur);
      dots[i].classList.toggle("cur", i === cur);
      dots[i].setAttribute("aria-current", i === cur ? "true" : "false");
    }
  }

  /* which band is nearest the top of the viewport */
  function currentIndex() {
    var best = 0, bestDist = Infinity;
    for (var i = 0; i < bands.length; i++) {
      var top = bands[i].getBoundingClientRect().top;
      var d = Math.abs(top - 90);
      if (top < window.innerHeight * 0.6 && d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }

  function scrollToBand(i) {
    var b = bands[i];
    if (!b) return;
    var y = b.getBoundingClientRect().top + window.pageYOffset - 72;   // clear the tab bar
    window.scrollTo({ top: y, behavior: reduceMotion() ? "auto" : "smooth" });
  }

  /* ---- collect bands for the current view; every band is shown ---- */
  function sync() {
    var view = activeView();
    if (!view) return;
    var key = view.getAttribute("data-route");
    rail = document.getElementById("rail");
    bands = Array.prototype.slice.call(view.querySelectorAll(".band"));
    bands.forEach(function (b) { b.removeAttribute("hidden"); });

    // the toolkit is a reference library — it has its own jump chips, no rail
    if (key === "toolkit") {
      bands = [];
      if (rail) rail.setAttribute("hidden", "");
      return;
    }

    route = key;
    buildRail();
    paint();
  }

  /* ---- rail clicks jump to the band ---- */
  document.addEventListener("click", function (e) {
    var dot = e.target.closest ? e.target.closest(".raildot") : null;
    if (!dot) return;
    scrollToBand(parseInt(dot.getAttribute("data-i"), 10));
    setTimeout(paint, 60);
  });

  /* scrolling moves the rail's highlight */
  window.addEventListener("scroll", paint, { passive: true });

  window.addEventListener("resize", function () { buildRail(); paint(); });

  /* the router repaints on every route change */
  window.addEventListener("hashchange", function () { setTimeout(sync, 0); });
  document.addEventListener("DOMContentLoaded", sync);
  if (document.readyState !== "loading") sync();

  window.SDevRail = { sync: sync };
})();
