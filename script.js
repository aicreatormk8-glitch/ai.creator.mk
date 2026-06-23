/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   MK — AI Creator · Cinematic AI Studio · interactions
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches;

  /* ── Year ── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Loader → reveal hero ── */
  var loader = document.getElementById("loader");
  var hero = document.querySelector(".hero");
  function startHero() {
    if (hero) hero.classList.add("ready");
    animateCounters();
  }
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (loader) loader.classList.add("done");
      startHero();
    }, 600);
  });
  // Fallback if load already fired
  setTimeout(function () {
    if (loader && !loader.classList.contains("done")) { loader.classList.add("done"); startHero(); }
  }, 2600);

  /* ── Nav scroll state + scroll progress ── */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Burger menu ── */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("active", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.dataset.delay || 0;
          setTimeout(function () { el.classList.add("in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    revealEls.forEach(function (el) {
      var index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.dataset.delay = Math.min(index, 6) * 80;
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Animated counters ── */
  function animateCounters() {
    if (prefersReducedMotion) {
      document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = el.dataset.count; });
      return;
    }
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.dataset.count, 10) || 0;
      var dur = 1600, start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
    });
  }

  /* ── Hero floating particles ── */
  function createHeroParticles() {
    var heroLights = document.getElementById("heroLights");
    if (!heroLights || prefersReducedMotion) return;

    heroLights.innerHTML = "";
    var count = window.innerWidth < 760 ? 12 : 22;
    var colors = ["rgba(124,92,255,0.85)", "rgba(62,224,192,0.8)", "rgba(255,142,62,0.7)"];
    var parts = [];

    for (var i = 0; i < count; i++) {
      var dot = document.createElement("span");
      var size = 5 + Math.random() * 24;
      var color = colors[i % colors.length];
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.background = color;
      dot.style.boxShadow = "0 0 " + (size * 1.4) + "px " + color;
      heroLights.appendChild(dot);
      parts.push({
        el: dot,
        x: Math.random() * 100,
        y: Math.random() * 100,
        sx: (Math.random() - 0.5) * 0.04,
        sy: -(0.02 + Math.random() * 0.05),
        phase: Math.random() * Math.PI * 2,
        amp: 0.3 + Math.random() * 0.7
      });
    }

    var t = 0;
    function animate() {
      t += 0.01;
      for (var j = 0; j < parts.length; j++) {
        var p = parts[j];
        p.x += p.sx + Math.sin(t + p.phase) * 0.02 * p.amp;
        p.y += p.sy;
        if (p.y < -5) { p.y = 105; p.x = Math.random() * 100; }
        if (p.x < -5) p.x = 105; if (p.x > 105) p.x = -5;
        p.el.style.transform = "translate3d(" + p.x + "vw," + p.y + "vh,0)";
      }
      rafParticles = requestAnimationFrame(animate);
    }
    var rafParticles = requestAnimationFrame(animate);
  }
  createHeroParticles();
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createHeroParticles, 300);
  });

  /* ── Hero parallax: background + content (mouse + scroll) ── */
  var heroBg = document.getElementById("heroBg");
  var heroInner = document.getElementById("heroInner");
  var mx = 0, my = 0, lmx = 0, lmy = 0;

  if (!prefersReducedMotion && hero && !isTouch) {
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    }, { passive: true });
    hero.addEventListener("mouseleave", function () { mx = 0; my = 0; });
  }

  function heroLoop() {
    lmx += (mx - lmx) * 0.06;
    lmy += (my - lmy) * 0.06;
    var sc = window.scrollY;
    if (heroBg) heroBg.style.transform = "scale(1.12) translate3d(" + (lmx * -22) + "px," + (lmy * -22 + sc * 0.12) + "px,0)";
    if (heroInner) heroInner.style.transform = "translate3d(" + (lmx * 16) + "px," + (lmy * 12 + sc * 0.06) + "px,0)";
    requestAnimationFrame(heroLoop);
  }
  if (!prefersReducedMotion) requestAnimationFrame(heroLoop);

  /* ── Cursor glow ── */
  var cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && !isTouch && !prefersReducedMotion) {
    var cgx = 0, cgy = 0, lcgx = 0, lcgy = 0;
    document.addEventListener("mousemove", function (e) {
      cgx = e.clientX; cgy = e.clientY;
      document.body.classList.add("cursor-active");
    }, { passive: true });
    document.addEventListener("mouseleave", function () { document.body.classList.remove("cursor-active"); });
    (function cgLoop() {
      lcgx += (cgx - lcgx) * 0.12;
      lcgy += (cgy - lcgy) * 0.12;
      cursorGlow.style.transform = "translate(" + lcgx + "px," + lcgy + "px) translate(-50%,-50%)";
      requestAnimationFrame(cgLoop);
    })();
  }

  /* ── Card 3D tilt + glow tracking ── */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      var glow = card.querySelector(".card__glow");
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (py - 0.5) * -8;
        var ry = (px - 0.5) * 8;
        card.style.transform = "translateY(-10px) perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
        if (glow) { glow.style.setProperty("--mx", px * 100 + "%"); glow.style.setProperty("--my", py * 100 + "%"); }
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ── Smooth anchor scrolling ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (href === "#" || href === "") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

})();
