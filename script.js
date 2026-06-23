/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   MK — AI Creator · Luxury Cinematic Interactions
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  /* ── Preload → Hero reveal ── */
  window.addEventListener("load", function () {
    setTimeout(function () {
      const preload = document.getElementById("preload");
      const hero = document.querySelector(".hero");
      if (preload) preload.classList.add("done");
      if (hero) {
        startHero();
        initRevealAnimations();
      }
    }, 400);
  });

  function startHero() {
    document.querySelectorAll("[data-delay]").forEach(function (el) {
      const delay = parseInt(el.dataset.delay, 10) || 0;
      setTimeout(function () {
        el.classList.add("in");
      }, delay);
    });
  }

  /* ── Animated gradient mesh (canvas) ── */
  function initMesh() {
    const canvas = document.getElementById("heroMesh");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = rect.width;
    const h = rect.height;
    const points = [];
    const gridSize = 80;

    for (let x = 0; x < w; x += gridSize) {
      for (let y = 0; y < h; y += gridSize) {
        points.push({
          x: x + Math.random() * gridSize,
          y: y + Math.random() * gridSize,
          ox: x + Math.random() * gridSize,
          oy: y + Math.random() * gridSize,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8
        });
      }
    }

    let t = 0;
    function drawMesh() {
      t += 0.004;
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)";
      ctx.lineWidth = 1;

      for (let p of points) {
        p.x = p.ox + Math.sin(t + p.ox / 100) * 20 + Math.cos(t * 0.5 + p.oy / 100) * 15;
        p.y = p.oy + Math.cos(t + p.oy / 100) * 20 + Math.sin(t * 0.5 + p.ox / 100) * 15;
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < gridSize * 1.5) {
            ctx.globalAlpha = 1 - dist / (gridSize * 1.5);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(drawMesh);
    }

    requestAnimationFrame(drawMesh);
  }

  /* ── Floating particles ── */
  function initParticles() {
    const container = document.getElementById("heroParticles");
    if (!container || prefersReducedMotion) return;

    const colors = ["rgba(0,212,255,0.8)", "rgba(168,85,247,0.7)", "rgba(255,0,110,0.6)"];
    const particleCount = window.innerWidth < 640 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = 2 + Math.random() * 8;
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.background = colors[i % colors.length];
      particle.style.boxShadow = `0 0 ${size * 2}px ${colors[i % colors.length]}`;
      particle.dataset.x = Math.random() * 100;
      particle.dataset.y = Math.random() * 100;
      particle.dataset.vx = (Math.random() - 0.5) * 0.06;
      particle.dataset.vy = -0.02 - Math.random() * 0.04;
      container.appendChild(particle);
    }

    let pTime = 0;
    function animateParticles() {
      pTime += 0.016;
      container.querySelectorAll(".particle").forEach(function (p, idx) {
        let x = parseFloat(p.dataset.x);
        let y = parseFloat(p.dataset.y);
        let vx = parseFloat(p.dataset.vx);
        let vy = parseFloat(p.dataset.vy);

        x += vx;
        y += vy;
        vy += 0.001;

        if (y > 105) {
          y = -5;
          x = Math.random() * 100;
        }
        if (x < -5 || x > 105) x = ((x % 110) + 110) % 110;

        p.dataset.x = x;
        p.dataset.y = y;
        p.dataset.vx = vx;
        p.dataset.vy = vy;

        p.style.left = x + "%";
        p.style.top = y + "%";
        p.style.opacity = Math.max(0.3, 1 - y / 100);
      });
      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
  }

  /* ── Bokeh lights ── */
  function initBokeh() {
    const container = document.getElementById("heroBokeh");
    if (!container || prefersReducedMotion) return;

    const bokehColors = ["#00d4ff", "#a855f7", "#ff006e"];
    for (let i = 0; i < 6; i++) {
      const bokeh = document.createElement("div");
      bokeh.className = "bokeh";
      bokeh.style.left = Math.random() * 100 + "%";
      bokeh.style.top = Math.random() * 100 + "%";
      bokeh.style.width = (40 + Math.random() * 120) + "px";
      bokeh.style.height = bokeh.style.width;
      bokeh.style.background = bokehColors[i % bokehColors.length];
      bokeh.style.animationDelay = (i * 2) + "s";
      container.appendChild(bokeh);
    }
  }

  /* ── Mouse parallax ── */
  function initParallax() {
    if (isTouch || prefersReducedMotion) return;

    const hero = document.querySelector(".hero");
    const bg = document.getElementById("heroBg");
    const volumetric = document.querySelector(".hero__volumetric");
    let mx = 0, my = 0, lmx = 0, lmy = 0;

    document.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;
    });

    function parallaxLoop() {
      lmx += (mx - lmx) * 0.08;
      lmy += (my - lmy) * 0.08;
      if (bg) bg.style.transform = `scale(1.12) translate3d(${lmx * -20}px, ${lmy * -20}px, 0)`;
      if (volumetric) volumetric.style.transform = `translate3d(${lmx * 40}px, ${lmy * 40}px, 0)`;
      requestAnimationFrame(parallaxLoop);
    }
    parallaxLoop();
  }

  /* ── Magnetic buttons ── */
  function initMagneticButtons() {
    if (isTouch || prefersReducedMotion) return;

    document.querySelectorAll("[data-text]").forEach(function (btn) {
      let tx = 0, ty = 0, ltx = 0, lty = 0;

      btn.addEventListener("mousemove", function (e) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        tx = (e.clientX - centerX) * 0.3;
        ty = (e.clientY - centerY) * 0.3;
      });

      btn.addEventListener("mouseleave", function () {
        tx = 0;
        ty = 0;
      });

      (function magneticLoop() {
        ltx += (tx - ltx) * 0.2;
        lty += (ty - lty) * 0.2;
        btn.style.transform = `translate3d(${ltx}px, ${lty}px, 0)`;
        requestAnimationFrame(magneticLoop);
      })();
    });
  }

  /* ── Reveal animations on scroll ── */
  function initRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      elements.forEach(el => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay, 10) || 0;
          setTimeout(function () {
            el.classList.add("in");
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    elements.forEach(el => observer.observe(el));
  }

  /* ── Smooth scroll ── */
  function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach(function (a) {
      a.addEventListener("click", function (e) {
        const href = a.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ── Init all ── */
  initMesh();
  initParticles();
  initBokeh();
  initParallax();
  initMagneticButtons();
  initSmoothScroll();

  // Start reveal animations if page already loaded
  if (document.readyState === "complete") {
    startHero();
    initRevealAnimations();
  }
})();
