/* Marina Kalashnikova — AI Creator Studio · interactions */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Year in footer ── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar background on scroll ── */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Відкрити меню");
      });
    });
  }

  /* ── Hero bokeh particles (cinematic) ── */
  var bokeh = document.getElementById("bokeh");
  if (bokeh && !reduce) {
    var colors = [
      "rgba(255,184,102,0.85)", // warm gold
      "rgba(124,92,255,0.8)",   // violet
      "rgba(62,224,192,0.75)",  // cyan
      "rgba(91,139,255,0.78)",  // blue
      "rgba(255,255,255,0.55)"
    ];
    var n = window.innerWidth < 700 ? 16 : 30;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      var size = 4 + Math.random() * 16;
      s.style.setProperty("--s", size.toFixed(1) + "px");
      s.style.setProperty("--l", (Math.random() * 100).toFixed(2) + "%");
      s.style.setProperty("--t", (Math.random() * 100).toFixed(2) + "%");
      s.style.setProperty("--c", colors[(Math.random() * colors.length) | 0]);
      s.style.setProperty("--o", (0.3 + Math.random() * 0.5).toFixed(2));
      s.style.setProperty("--d", (8 + Math.random() * 10).toFixed(1) + "s");
      s.style.setProperty("--delay", (-Math.random() * 10).toFixed(1) + "s");
      frag.appendChild(s);
    }
    bokeh.appendChild(frag);
  }

  /* ── Reveal on scroll (staggered) ── */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add("in"); }, el.dataset.delay || 0);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.dataset.delay = Math.min(sib, 6) * 70;
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Animated stat counters ── */
  var counters = document.querySelectorAll("[data-count]");
  var runCount = function (el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ── Scrollspy (active nav link) ── */
  var navLinkEls = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinkEls
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          navLinkEls.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Portfolio filter ── */
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll("#workGrid .work__item");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("is-active"); btn.setAttribute("aria-selected", "true");
      var f = btn.dataset.filter;
      items.forEach(function (item) {
        var show = f === "all" || item.dataset.cat === f;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ── Prefill contact form intent from CTA buttons ── */
  var serviceSelect = document.getElementById("cf-service");
  var intentMap = {
    project: "AI-проєкт", content: "AI-контент", site: "Сайт",
    automation: "Автоматизація", studio: "AI-проєкт", premium: "Автоматизація", start: "AI-контент"
  };
  document.querySelectorAll("[data-intent]").forEach(function (el) {
    el.addEventListener("click", function () {
      var val = intentMap[el.dataset.intent];
      if (serviceSelect && val) {
        Array.prototype.forEach.call(serviceSelect.options, function (o) {
          if (o.value === val) serviceSelect.value = val;
        });
      }
    });
  });

  /* ── Contact form → mailto (no backend, works on static hosting) ── */
  var form = document.getElementById("contact-form");
  var hint = document.getElementById("cf-hint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk) {
        hint.textContent = !name
          ? "Будь ласка, вкажіть ваше ім'я."
          : "Будь ласка, введіть коректний email.";
        hint.style.color = "#ff8fa3";
        (!name ? form.name : form.email).focus();
        return;
      }

      var subject = "Заявка з сайту — " + service;
      var body =
        "Ім'я: " + name + "\n" +
        "Email: " + email + "\n" +
        "Напрям: " + service + "\n\n" +
        "Деталі:\n" + (message || "—");
      var url = "mailto:aicreatormk8@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      hint.textContent = "Відкриваємо ваш поштовий застосунок…";
      hint.style.color = "";
      window.location.href = url;
    });
  }
})();
