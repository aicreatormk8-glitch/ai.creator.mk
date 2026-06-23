/* MK — AI Creator · interactions */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");

    // gentle parallax for hero content
    var heroInner = document.querySelector('.hero__inner');
    if (heroInner) {
      var offset = Math.min(window.scrollY * 0.12, 140);
      // combine with any existing mouse parallax by writing full transform in animation loop
      heroInner.dataset.scrollOffset = offset;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
      burger.classList.toggle("active");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); burger.classList.remove("active"); });
    });
  }

  // Reveal on scroll
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
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) {
      var index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.dataset.delay = Math.min(index, 6) * 70;
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Hero particles + parallax
  function createHeroParticles() {
    var heroLights = document.querySelector(".hero__lights");
    if (!heroLights) return;

    heroLights.innerHTML = '';
    var count = 20; // more for premium feel
    var colors = ['rgba(124,92,255,0.88)', 'rgba(62,224,192,0.86)', 'rgba(255,142,62,0.78)'];

    for (var i = 0; i < count; i++) {
      var dot = document.createElement("span");
      var x = Math.random() * 100; // vw
      var y = Math.random() * 100; // vh
      var size = 6 + Math.random() * 28;
      var color = colors[i % colors.length];
      dot.style.setProperty("--x", x + "vw");
      dot.style.setProperty("--y", y + "vh");
      dot.style.setProperty("--size", size + "px");
      dot.style.background = color;
      dot.dataset.ox = x;
      dot.dataset.oy = y;
      heroLights.appendChild(dot);
    }

    // lightweight animation loop for drifting particles
    if (!prefersReducedMotion) {
      var t = 0;
      function animate() {
        t += 0.008;
        heroLights.querySelectorAll('span').forEach(function (el, idx) {
          var ox = parseFloat(el.dataset.ox);
          var oy = parseFloat(el.dataset.oy);
          var nx = ox + Math.sin(t + idx) * 1.6;
          var ny = oy + Math.cos(t * 0.8 + idx) * 1.2;
          el.style.setProperty('--x', nx + 'vw');
          el.style.setProperty('--y', ny + 'vh');
          var s = Math.max(6, parseFloat(el.style.getPropertyValue('--size')) || 10) * (1 + Math.sin(t + idx) * 0.04);
          el.style.width = s + 'px';
          el.style.height = s + 'px';
        });
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  }

  createHeroParticles();

  // Mouse parallax for hero (combined with scroll offset)
  (function heroParallax() {
    var hero = document.querySelector('.hero');
    var heroInner = document.querySelector('.hero__inner');
    if (!hero || !heroInner || prefersReducedMotion) return;

    var lx = 0, ly = 0; // lerped values
    var tx = 0, ty = 0;
    var rafId = null;

    function onMove(e) {
      var r = hero.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width; // 0..1
      var py = (e.clientY - r.top) / r.height; // 0..1
      tx = (px - 0.5) * 28; // px
      ty = (py - 0.5) * -28;
      if (!rafId) loop();
    }

    function loop() {
      rafId = requestAnimationFrame(loop);
      lx += (tx - lx) * 0.08;
      ly += (ty - ly) * 0.08;
      var scrollOffset = parseFloat(heroInner.dataset.scrollOffset || 0);
      heroInner.style.transform = 'translate3d(' + (lx * 0.6).toFixed(2) + 'px, ' + (ly * 0.6 + scrollOffset).toFixed(2) + 'px, 0)';
      // subtle parallax on background via CSS variables (if used in stylesheet)
      hero.style.setProperty('--bg-x', (lx * 0.03) + 'px');
      hero.style.setProperty('--bg-y', (ly * 0.02) + 'px');
    }

    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; }, { passive: true });
  })();

  // Parallax attribute for any element: data-parallax="0.2"
  (function initParallaxAttrs() {
    if (prefersReducedMotion) return;
    var els = document.querySelectorAll('[data-parallax]');
    function update() {
      var sc = window.scrollY;
      els.forEach(function (el) {
        var factor = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = 'translateY(' + (sc * factor) + 'px)';
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  // smooth anchor scrolling enhancement (respect reduced motion)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (prefersReducedMotion) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
