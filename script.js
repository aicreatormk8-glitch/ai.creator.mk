/* MK — AI Creator · Premium Cinematic Studio */
(function () {
  "use strict";

  var PRM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Year ───────────────────────────────────────── */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Nav: scroll state ──────────────────────────── */
  var nav = document.getElementById("nav");
  function syncNav() {
    nav.classList.toggle("scrolled", window.scrollY > 28);
  }
  window.addEventListener("scroll", syncNav, { passive: true });
  syncNav();

  /* ── Nav: burger ────────────────────────────────── */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      burger.classList.toggle("active");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Nav: active link ───────────────────────────── */
  var secs = Array.from(document.querySelectorAll("section[id], div[id]"));
  var navAs = document.querySelectorAll(".nav__links a");
  function syncActive() {
    var y = window.scrollY + 130;
    secs.forEach(function (s) {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        navAs.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + s.id);
        });
      }
    });
  }
  window.addEventListener("scroll", syncActive, { passive: true });

  /* ── Cursor glow ────────────────────────────────── */
  var cg = document.getElementById("cursorGlow");
  if (cg && !("ontouchstart" in window) && !PRM) {
    var cx = innerWidth / 2, cy = innerHeight / 2;
    var lx = cx, ly = cy;
    document.addEventListener("mousemove", function (e) {
      cx = e.clientX; cy = e.clientY;
      cg.style.opacity = "1";
    }, { passive: true });
    document.addEventListener("mouseleave", function () { cg.style.opacity = "0"; });
    (function loop() {
      lx += (cx - lx) * 0.10;
      ly += (cy - ly) * 0.10;
      cg.style.left = lx + "px";
      cg.style.top  = ly + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ── Background star field ──────────────────────── */
  var bgC = document.getElementById("bgCanvas");
  if (bgC && !PRM) {
    var bx = bgC.getContext("2d");
    var bStars = [];
    function resizeBg() {
      bgC.width  = innerWidth;
      bgC.height = innerHeight;
    }
    function initBg() {
      bStars = [];
      var n = Math.floor((bgC.width * bgC.height) / 9000);
      for (var i = 0; i < n; i++) {
        bStars.push({
          x: Math.random() * bgC.width,
          y: Math.random() * bgC.height,
          r: Math.random() * 1.1 + 0.2,
          o: Math.random() * 0.45 + 0.08,
          sp: Math.random() * 0.28 + 0.04,
          ph: Math.random() * Math.PI * 2
        });
      }
    }
    function drawBg() {
      bx.clearRect(0, 0, bgC.width, bgC.height);
      var t = Date.now() / 3200;
      bStars.forEach(function (s) {
        var a = s.o * (0.55 + 0.45 * Math.sin(t * s.sp + s.ph));
        bx.beginPath();
        bx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bx.fillStyle = "rgba(195,188,255," + a + ")";
        bx.fill();
      });
      requestAnimationFrame(drawBg);
    }
    resizeBg(); initBg(); drawBg();
    var brt;
    window.addEventListener("resize", function () {
      clearTimeout(brt);
      brt = setTimeout(function () { resizeBg(); initBg(); }, 220);
    });
  }

  /* ── Hero canvas: particle network ─────────────── */
  var hC = document.getElementById("heroCanvas");
  if (hC && !PRM) {
    var hx = hC.getContext("2d");
    var pts = [];
    var COLS = [[124,92,255],[62,224,192],[255,154,82],[193,127,255]];
    var hmx = -9999, hmy = -9999;
    var heroEl = document.querySelector(".hero");

    function resizeHero() {
      hC.width  = heroEl ? heroEl.offsetWidth  : innerWidth;
      hC.height = heroEl ? heroEl.offsetHeight : innerHeight;
    }
    function initPts() {
      pts = [];
      for (var i = 0; i < 55; i++) {
        var col = COLS[i % COLS.length];
        pts.push({
          x: Math.random() * hC.width,
          y: Math.random() * hC.height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 2.2 + 0.7,
          col: col,
          o: Math.random() * 0.55 + 0.18,
          ph: Math.random() * Math.PI * 2
        });
      }
    }

    if (heroEl) {
      heroEl.addEventListener("mousemove", function (e) {
        var r = hC.getBoundingClientRect();
        hmx = e.clientX - r.left;
        hmy = e.clientY - r.top;
      }, { passive: true });
      heroEl.addEventListener("mouseleave", function () { hmx = -9999; hmy = -9999; });
    }

    var ht = 0;
    function drawHero() {
      hx.clearRect(0, 0, hC.width, hC.height);
      ht += 0.0045;

      pts.forEach(function (p, i) {
        // Mouse attraction
        var dx = hmx - p.x, dy = hmy - p.y;
        var dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < 200 && dd > 0) {
          var f = (200 - dd) / 200 * 0.0038;
          p.vx += dx / dd * f;
          p.vy += dy / dd * f;
        }
        p.vx *= 0.975; p.vy *= 0.975;
        p.x += p.vx;  p.y += p.vy;
        if (p.x < -12) p.x = hC.width + 12;
        if (p.x > hC.width + 12) p.x = -12;
        if (p.y < -12) p.y = hC.height + 12;
        if (p.y > hC.height + 12) p.y = -12;

        var a = p.o * (0.55 + 0.45 * Math.sin(ht + p.ph));
        var r2 = p.col[0], g2 = p.col[1], b2 = p.col[2];

        // Soft glow halo
        var grd = hx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grd.addColorStop(0, "rgba(" + r2 + "," + g2 + "," + b2 + "," + a + ")");
        grd.addColorStop(1, "rgba(" + r2 + "," + g2 + "," + b2 + ",0)");
        hx.beginPath();
        hx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        hx.fillStyle = grd;
        hx.fill();

        // Core dot
        hx.beginPath();
        hx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        hx.fillStyle = "rgba(" + r2 + "," + g2 + "," + b2 + "," + Math.min(a * 1.6, 1) + ")";
        hx.fill();

        // Connections
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          var ex = p.x - q.x, ey = p.y - q.y;
          var ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < 115) {
            hx.beginPath();
            hx.moveTo(p.x, p.y);
            hx.lineTo(q.x, q.y);
            hx.strokeStyle = "rgba(" + r2 + "," + g2 + "," + b2 + "," + ((1 - ed / 115) * 0.14) + ")";
            hx.lineWidth = 0.7;
            hx.stroke();
          }
        }
      });
      requestAnimationFrame(drawHero);
    }

    resizeHero(); initPts(); drawHero();
    var hrt;
    window.addEventListener("resize", function () {
      clearTimeout(hrt);
      hrt = setTimeout(function () { resizeHero(); }, 200);
    });
  }

  /* ── Hero parallax (scroll + mouse) ────────────── */
  var heroBg    = document.getElementById("heroBg");
  var heroInner = document.querySelector(".hero__inner");
  var hero      = document.querySelector(".hero");

  if (!PRM) {
    /* scroll parallax */
    function scrollPx() {
      var sy = window.scrollY;
      if (heroBg) {
        heroBg.style.transform =
          "translate3d(" + (heroBg._mx || 0) + "px," +
          ((heroBg._my || 0) + sy * 0.30) + "px,0) scale(1.06)";
      }
      if (heroInner) {
        heroInner.style.transform =
          "translate3d(" + (heroInner._mx || 0) + "px," +
          ((heroInner._my || 0) - sy * 0.07) + "px,0)";
      }
    }
    window.addEventListener("scroll", scrollPx, { passive: true });

    /* mouse parallax */
    if (hero && heroInner && heroBg) {
      var tmx2 = 0, tmy2 = 0, lmx2 = 0, lmy2 = 0;
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tmx2 = ((e.clientX - r.left) / r.width  - 0.5) * 18;
        tmy2 = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      }, { passive: true });
      hero.addEventListener("mouseleave", function () { tmx2 = 0; tmy2 = 0; });
      (function mLoop() {
        lmx2 += (tmx2 - lmx2) * 0.07;
        lmy2 += (tmy2 - lmy2) * 0.07;
        heroInner._mx = +(lmx2 * 0.55).toFixed(2);
        heroInner._my = +lmy2.toFixed(2);
        heroBg._mx    = +(lmx2 * 0.06).toFixed(2);
        heroBg._my    = +(lmy2 * 0.04).toFixed(2);
        scrollPx();
        requestAnimationFrame(mLoop);
      })();
    }
  }

  /* ── Reveal on scroll ───────────────────────────── */
  var revEls = document.querySelectorAll(".reveal");
  if (!PRM && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          var d  = parseInt(el.dataset.delay || "0", 10);
          setTimeout(function () { el.classList.add("in"); }, d);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.10, rootMargin: "0px 0px -55px 0px" });
    revEls.forEach(function (el) { io.observe(el); });
  } else {
    revEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Counter animation ──────────────────────────── */
  function animCount(el, target, dur) {
    var st = null;
    function step(ts) {
      if (!st) st = ts;
      var p = Math.min((ts - st) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var cntEls = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animCount(e.target, parseInt(e.target.dataset.count, 10), 1800);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    cntEls.forEach(function (el) { cio.observe(el); });
  }

  /* ── FAQ accordion ──────────────────────────────── */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq__q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      faqItems.forEach(function (it) {
        it.classList.remove("open");
        var b = it.querySelector(".faq__q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ── Smooth anchor scroll ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 76;
      if (PRM) window.scrollTo(0, top);
      else window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

})();
