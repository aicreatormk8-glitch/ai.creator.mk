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

  /* ── Portfolio video autoplay fix for iOS/Android ── */
  var portfolioVideos = document.querySelectorAll(".work__video");
  portfolioVideos.forEach(function (v) {
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    var tryPlay = function () { v.play().catch(function () {}); };
    if ("IntersectionObserver" in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { tryPlay(); } else { v.pause(); }
        });
      }, { threshold: 0.25 });
      vio.observe(v);
    } else {
      tryPlay();
    }
  });

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
    automation: "Автоматизація", branding: "AI-проєкт", studio: "AI-проєкт", premium: "Автоматизація", start: "AI-контент"
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

  /* ── Contact form (FormSubmit) ── */
  var form = document.getElementById("contact-form");
  var hint = document.getElementById("cf-hint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk) {
        hint.textContent = !name
          ? "Будь ласка, вкажіть ваше ім'я."
          : "Будь ласка, введіть коректний email.";
        hint.style.color = "#ff8fa3";
        (!name ? form.name : form.email).focus();
        return;
      }

      hint.textContent = "Відправляємо…";
      hint.style.color = "";
      form.submit();
    });
  }

  /* ════════════════════════════════════════════════
     Internationalization (UK default / RU / EN)
     ════════════════════════════════════════════════ */
  var currentLang = "uk";

  var dict = {
    ru: {
      "skip": "Перейти к контенту",
      "nav.services": "Услуги", "nav.work": "Портфолио", "nav.process": "Процесс", "nav.pricing": "Тарифы", "nav.voices": "Отзывы",
      "nav.cta": "Заказать AI-проект",
      "hero.pill": "AI Creator Studio · Премиальный визуальный контент",
      "hero.title": "AI-контент уровня<br /><span class=\"grad\">высокой моды</span> <span class=\"serif\">и кино</span>",
      "hero.sub": "<strong>Marina Kalashnikova</strong> — AI Creator и визуальный директор. Создаю дорогой, кинематографичный контент для брендов, которые хотят выглядеть безупречно: fashion-съёмка, видео, виртуальные музы и премиальные сайты. Каждый кадр — как обложка глянца.",
      "hero.cta1": "Заказать AI-проект", "hero.cta2": "Смотреть портфолио",
      "hero.stat1": "AI-проектов", "hero.stat2": "брендов", "hero.stat3": "часов до концептов", "hero.scroll": "Листать",
      "srv.eyebrow": "Услуги студии",
      "srv.h2": "AI-решения любой сложности",
      "srv.lead": "AI-контент, веб-разработка, брендинг и автоматизация — комплексные решения для бизнеса, брендов и авторов.",
      "p1.title": "AI-визуал и контент",
      "p1.desc": "Создаём премиальный AI-контент для брендов, рекламы и социальных сетей.",
      "p1.i1": "AI-фото", "p1.i2": "AI-видео", "p1.i3": "AI UGC-реклама", "p1.i4": "Виртуальные персонажи", "p1.i5": "Предметная визуализация", "p1.i6": "Контент для соцсетей", "p1.cta": "Начать сотрудничество",
      "p2.title": "Сайты и цифровые продукты",
      "p2.desc": "Современные сайты с продуманным дизайном, высокой скоростью и автоматизацией бизнес-процессов.",
      "p2.i1": "Лендинги", "p2.i2": "Корпоративные сайты", "p2.i3": "Интернет-магазины", "p2.i4": "Premium UI/UX", "p2.i5": "SEO-ready", "p2.cta": "Обсудить сайт",
      "p3.title": "AI-автоматизация",
      "p3.desc": "Внедряем AI-решения, которые экономят время и масштабируют бизнес.",
      "p3.i1": "AI-ассистенты", "p3.i2": "Автоматизация процессов", "p3.i3": "CRM и интеграции", "p3.i4": "Telegram-боты", "p3.i5": "Деплой и поддержка", "p3.cta": "Заказать автоматизацию",
      "p4.title": "Брендинг и дизайн", "p4.desc": "Создаём сильную визуальную идентичность, которая выделяет бренд и запоминается.",
      "p4.i1": "Айдентика", "p4.i2": "Логотипы", "p4.i3": "Презентации", "p4.i4": "Бренд-киты", "p4.i5": "Дизайн соцсетей", "p4.cta": "Создать айдентику",
      "work.eyebrow": "Портфолио",
      "work.h2": "Результаты, которые говорят громче слов",
      "work.lead": "От AI-контента до комплексных цифровых решений — каждый проект демонстрирует подход к качеству, деталям и современным технологиям.",
      "filter.all": "Все", "filter.photo": "AI-фото", "filter.video": "AI-видео", "filter.avatars": "AI-аватары и персонажи", "filter.models": "AI UGC", "filter.web": "Сайты", "filter.auto": "Автоматизация", "filter.brand": "Брендинг",
      "w1.tag": "AI-фото · Fashion", "w1.h3": "Кампания \"Neon Atelier\"", "w1.p": "120+ fashion-визуалов в едином стиле — +240% к вовлечённости.",
      "w2.tag": "AI-видео · UGC", "w2.h3": "UGC-реклама для DTC-бренда", "w2.p": "Серия коротких роликов полностью на генеративном видео.",
      "w3.tag": "Виртуальная инфлюенсерка", "w3.h3": "Цифровой персонаж \"AVA\"", "w3.p": "Последовательная AI-модель для соцсетей — лицо бренда без съёмок.",
      "w4.tag": "Предметная съёмка", "w4.h3": "AI-визуалы для косметики", "w4.p": "Студийные предметные кадры без фотостудии — каталог за несколько дней.",
      "w5.tag": "Сайт · Vercel", "w5.h3": "Лендинг для AI-стартапа", "w5.p": "Премиальный одностраничный сайт с деплоем на Vercel за 5 дней.",
      "w6.tag": "AI-автоматизация", "w6.h3": "Контент-воркфлоу для агентства", "w6.p": "Автоматизированный пайплайн генерации и публикации — минус 60% рутины.",
      "w7.tag": "Бренд-контент", "w7.h3": "Айдентика \"Aether Labs\"", "w7.p": "Полная визуальная система, сгенерированная и сведённая в единый гайдлайн.",
      "w8.tag": "AI-видео · Promo", "w8.h3": "Кинематографичный промо-ролик", "w8.p": "30-секундный клип для запуска продукта — от сториборда до монтажа.",
      "w9.tag": "Соцсети", "w9.h3": "Контент-пак для Instagram", "w9.p": "Целостная визуальная лента: обложки, карусели и reels-кадры.",
      "work.more": "Обсудить ваш проект",
      "proc.eyebrow": "Как я работаю", "proc.h2": "От идеи до продукта, который работает", "proc.lead": "Прозрачные этапы и личное сопровождение — от первого брифа до запуска и дальнейшего развития.",
      "t1.h3": "Бриф и стратегия", "t1.p": "Погружаюсь в ваш бренд, цели и референсы. Фиксируем объём и результат.",
      "t2.h3": "Концепция и мудборд", "t2.p": "Определяю визуальное направление. Первые концепты — уже за 24 часа.",
      "t3.h3": "AI-продакшн", "t3.p": "Генерация и доработка контента, разработка сайта или системы.",
      "t4.h3": "Финализация и деплой", "t4.p": "Готовый результат: файлы, публикация или деплой на GitHub / Vercel.",
      "pr.eyebrow": "Пакеты услуг", "pr.h2": "Прозрачные <span class=\"grad\">тарифы</span>", "pr.lead": "Стартовые цены — лишь ориентир. Финальную стоимость собираю индивидуально под масштаб и амбиции вашего проекта.",
      "price.from": "от", "pl.badge": "Популярный",
      "pl1.name": "Старт", "pl1.desc": "Отдельный AI-контент или простая страница", "pl1.i1": "AI-фотосет или серия визуалов", "pl1.i2": "Контент для соцсетей", "pl1.i3": "Одностраничный лендинг", "pl1.i4": "2 раунда правок", "pl1.btn": "Выбрать \"Старт\"",
      "pl2.name": "Studio", "pl2.desc": "Комплексный AI-продакшн под бренд", "pl2.i1": "Кампания AI-фото и видео", "pl2.i2": "Виртуальная модель или UGC-серия", "pl2.i3": "Многостраничный сайт + деплой", "pl2.i4": "Единый визуальный стиль бренда", "pl2.i5": "Приоритетная поддержка", "pl2.btn": "Выбрать \"Studio\"",
      "pl3.name": "Premium", "pl3.desc": "Студия полного цикла и автоматизация", "pl3.price": "Индивидуально", "pl3.i1": "Постоянный AI-контент под ключ", "pl3.i2": "Собственная виртуальная инфлюенсерка", "pl3.i3": "AI workflow и автоматизация", "pl3.i4": "AI-ассистенты и системы", "pl3.i5": "Сопровождение и масштабирование", "pl3.btn": "Обсудить Premium",
      "v.eyebrow": "Отзывы", "v.h2": "Мне доверяют <span class=\"grad\">инноваторы</span>",
      "vc1.text": "\"Марина превратила размытый бриф в целостную AI-кампанию за неделю. Выглядит как трейлер.\"", "vc1.role": "Founder, Fashion Brand",
      "vc2.text": "\"Сайт и автоматизация под ключ. Скорость и качество, которых мы не ожидали от AI.\"", "vc2.role": "CMO, SaaS Startup",
      "vc3.text": "\"Лучшее — это вкус. Многие умеют в AI, но результат Марины выглядит премиально.\"", "vc3.role": "Art Director",
      "vc4.text": "\"Заказала AI-видео для бренда — клиенты спрашивают, где мы нашли такого режиссёра. Магия.\"", "vc4.role": "Brand Manager",
      "vc5.text": "\"Лендинг за 3 дня, конверсия выросла вдвое. Не верил, что AI так может — теперь верю.\"", "vc5.role": "E-commerce Founder",
      "vc6.text": "\"AI-контент для luxury-сегмента — это сложно. Marina сделала это с безупречным классом.\"", "vc6.role": "Creative Director",
      "ct.eyebrow": "Готовы начать?", "ct.h2": "Создадим то, <span class=\"serif\">что запомнят</span>", "ct.lead": "Расскажите о замысле — и уже завтра увидите первые концепты. Выберите направление или напишите напрямую.",
      "ct.q1": "Заказать AI-проект", "ct.q2": "Обсудить сайт", "ct.q3": "Создать AI-контент", "ct.email": "Написать на почту",
      "f.name": "Имя", "f.name.ph": "Как к вам обращаться", "f.email": "Email", "f.service": "Направление",
      "f.opt1": "AI-проект (общий)", "f.opt2": "AI-контент (фото / видео)", "f.opt3": "Виртуальная модель / инфлюенсер", "f.opt4": "Сайт / лендинг", "f.opt5": "Автоматизация / AI-системы",
      "f.msg": "Детали проекта", "f.msg.ph": "Несколько слов о задаче, сроках и бюджете", "f.btn": "Отправить заявку", "f.hint": "Откроется ваш почтовый клиент с готовым письмом.",
      "ft.tag": "AI Creator & Visual Director", "ft.tag2": "Создаю кинематографичный AI-контент, рекламу и премиальные цифровые продукты для брендов, которые стремятся быть исключительными. От fashion-визуализации до luxury-вебсайтов — каждая деталь создана, чтобы захватывать с первого взгляда.", "ft.tag3": "Каждый кадр — уровень мирового глянца.",
      "ft.h.services": "Услуги", "ft.s1": "AI-контент", "ft.s2": "Виртуальные модели", "ft.s3": "Сайты под ключ", "ft.s4": "Автоматизация",
      "ft.h.studio": "Студия", "ft.l1": "Портфолио", "ft.l2": "Процесс", "ft.l3": "Тарифы", "ft.l4": "Контакты", "ft.made": "Создано с ❤️ и AI",
      "doc.title": "Marina Kalashnikova — AI Creator Studio · Кинематографичный AI-контент"
    },
    en: {
      "skip": "Skip to content",
      "nav.services": "Services", "nav.work": "Portfolio", "nav.process": "Process", "nav.pricing": "Pricing", "nav.voices": "Reviews",
      "nav.cta": "Order AI project",
      "hero.pill": "AI Creator Studio · Premium visual content",
      "hero.title": "AI content with the polish of<br /><span class=\"grad\">high fashion</span> <span class=\"serif\">&amp; cinema</span>",
      "hero.sub": "<strong>Marina Kalashnikova</strong> — AI Creator and visual director. I craft expensive, cinematic content for brands that want to look flawless: fashion shoots, video, virtual muses and premium websites. Every frame looks like a magazine cover.",
      "hero.cta1": "Order AI project", "hero.cta2": "View portfolio",
      "hero.stat1": "AI projects", "hero.stat2": "brands", "hero.stat3": "hours to concepts", "hero.scroll": "Scroll",
      "srv.eyebrow": "Studio services",
      "srv.h2": "AI solutions of any complexity",
      "srv.lead": "AI content, web development, branding and automation — comprehensive solutions for businesses, brands and creators.",
      "p1.title": "AI visuals & content",
      "p1.desc": "We create premium AI content for brands, advertising and social media.",
      "p1.i1": "AI photo", "p1.i2": "AI video", "p1.i3": "AI UGC ads", "p1.i4": "Virtual characters", "p1.i5": "Product visualization", "p1.i6": "Social media content", "p1.cta": "Start collaboration",
      "p2.title": "Websites & digital products",
      "p2.desc": "Modern websites with thoughtful design, high speed and business process automation.",
      "p2.i1": "Landing pages", "p2.i2": "Corporate websites", "p2.i3": "Online stores", "p2.i4": "Premium UI/UX", "p2.i5": "SEO-ready", "p2.cta": "Discuss a website",
      "p3.title": "AI automation",
      "p3.desc": "We implement AI solutions that save time and scale your business.",
      "p3.i1": "AI assistants", "p3.i2": "Process automation", "p3.i3": "CRM & integrations", "p3.i4": "Telegram bots", "p3.i5": "Deployment & support", "p3.cta": "Order automation",
      "p4.title": "Branding & design", "p4.desc": "We create a strong visual identity that sets your brand apart and stays in memory.",
      "p4.i1": "Brand identity", "p4.i2": "Logos", "p4.i3": "Presentations", "p4.i4": "Brand kits", "p4.i5": "Social media design", "p4.cta": "Create identity",
      "work.eyebrow": "Portfolio",
      "work.h2": "Results that speak louder than words",
      "work.lead": "From AI content to complex digital solutions — every project demonstrates an approach to quality, detail and modern technology.",
      "filter.all": "All", "filter.photo": "AI photo", "filter.video": "AI video", "filter.avatars": "AI avatars & characters", "filter.models": "AI UGC", "filter.web": "Websites", "filter.auto": "Automation", "filter.brand": "Branding",
      "w1.tag": "AI photo · Fashion", "w1.h3": "\"Neon Atelier\" campaign", "w1.p": "120+ fashion visuals in one style — +240% engagement.",
      "w2.tag": "AI video · UGC", "w2.h3": "UGC ads for a DTC brand", "w2.p": "A series of short clips fully on generative video.",
      "w3.tag": "Virtual influencer", "w3.h3": "Digital persona \"AVA\"", "w3.p": "A consistent AI model for social media — a brand face without shoots.",
      "w4.tag": "Product photography", "w4.h3": "AI visuals for cosmetics", "w4.p": "Studio product shots without a studio — a catalog in days.",
      "w5.tag": "Website · Vercel", "w5.h3": "Landing for an AI startup", "w5.p": "A premium one-pager deployed to Vercel in 5 days.",
      "w6.tag": "AI automation", "w6.h3": "Content workflow for an agency", "w6.p": "Automated generation & publishing pipeline — minus 60% routine.",
      "w7.tag": "Brand content", "w7.h3": "\"Aether Labs\" identity", "w7.p": "A full visual system, generated and unified into one guideline.",
      "w8.tag": "AI video · Promo", "w8.h3": "Cinematic promo clip", "w8.p": "A 30-second product launch clip — from storyboard to edit.",
      "w9.tag": "Social media", "w9.h3": "Instagram content pack", "w9.p": "A cohesive feed: covers, carousels and reels frames.",
      "work.more": "Discuss your project",
      "proc.eyebrow": "How I work", "proc.h2": "From idea to product that works", "proc.lead": "Transparent stages and personal guidance — from the first brief to launch and beyond.",
      "t1.h3": "Brief & strategy", "t1.p": "I dive into your brand, goals and references. We fix scope and outcome.",
      "t2.h3": "Concept & moodboard", "t2.p": "I define the visual direction. First concepts within 24 hours.",
      "t3.h3": "AI production", "t3.p": "Generating and refining content, building the site or system.",
      "t4.h3": "Finalization & deploy", "t4.p": "Final result: files, publishing or deploy to GitHub / Vercel.",
      "pr.eyebrow": "Service packages", "pr.h2": "Transparent <span class=\"grad\">pricing</span>", "pr.lead": "Starting prices are only a reference. I tailor the final quote to the scale and ambition of your project.",
      "price.from": "from", "pl.badge": "Popular",
      "pl1.name": "Start", "pl1.desc": "A single AI-content piece or a simple page", "pl1.i1": "AI photoset or a series of visuals", "pl1.i2": "Social media content", "pl1.i3": "One-page landing", "pl1.i4": "2 rounds of revisions", "pl1.btn": "Choose \"Start\"",
      "pl2.name": "Studio", "pl2.desc": "Comprehensive AI production for your brand", "pl2.i1": "AI photo & video campaign", "pl2.i2": "Virtual model or UGC series", "pl2.i3": "Multi-page website + deploy", "pl2.i4": "Unified brand visual style", "pl2.i5": "Priority support", "pl2.btn": "Choose \"Studio\"",
      "pl3.name": "Premium", "pl3.desc": "Full-cycle studio & automation", "pl3.price": "Custom", "pl3.i1": "Ongoing turnkey AI content", "pl3.i2": "Your own virtual influencer", "pl3.i3": "AI workflow & automation", "pl3.i4": "AI assistants & systems", "pl3.i5": "Support & scaling", "pl3.btn": "Discuss Premium",
      "v.eyebrow": "Reviews", "v.h2": "Trusted by <span class=\"grad\">innovators</span>",
      "vc1.text": "'Marina turned a vague brief into a cohesive AI campaign in a week. It looks like a trailer.'", "vc1.role": "Founder, Fashion Brand",
      "vc2.text": "'Website and automation turnkey. Speed and quality we didn't expect from AI.'", "vc2.role": "CMO, SaaS Startup",
      "vc3.text": "'The best part is taste. Many can do AI, but Marina's result looks premium.'", "vc3.role": "Art Director",
      "vc4.text": "'Ordered an AI video for my brand — clients ask where we found such a director. Pure magic.'", "vc4.role": "Brand Manager",
      "vc5.text": "'Landing page in 3 days, conversion doubled. Didn't believe AI could do that — now I do.'", "vc5.role": "E-commerce Founder",
      "vc6.text": "'AI content for the luxury segment is hard. Marina did it with impeccable class.'", "vc6.role": "Creative Director",
      "ct.eyebrow": "Ready to start?", "ct.h2": "Let's create something <span class=\"serif\">unforgettable</span>", "ct.lead": "Tell me about your vision — and see first concepts as soon as tomorrow. Pick a direction or write to me directly.",
      "ct.q1": "Order AI project", "ct.q2": "Discuss a website", "ct.q3": "Create AI content", "ct.email": "Email me",
      "f.name": "Name", "f.name.ph": "How should I address you", "f.email": "Email", "f.service": "Direction",
      "f.opt1": "AI project (general)", "f.opt2": "AI content (photo / video)", "f.opt3": "Virtual model / influencer", "f.opt4": "Website / landing", "f.opt5": "Automation / AI systems",
      "f.msg": "Project details", "f.msg.ph": "A few words about the task, timeline and budget", "f.btn": "Send request", "f.hint": "Your email app will open with a ready message.",
      "ft.tag": "AI Creator & Visual Director", "ft.tag2": "I create cinematic AI content, advertising and premium digital products for brands that strive to be exceptional. From fashion visuals to luxury websites — every detail crafted to captivate at first glance.", "ft.tag3": "Every frame — world gloss level.",
      "ft.h.services": "Services", "ft.s1": "AI content", "ft.s2": "Virtual models", "ft.s3": "Turnkey websites", "ft.s4": "Automation",
      "ft.h.studio": "Studio", "ft.l1": "Portfolio", "ft.l2": "Process", "ft.l3": "Pricing", "ft.l4": "Contacts", "ft.made": "Made with ❤️ and AI",
      "doc.title": "Marina Kalashnikova — AI Creator Studio · Cinematic AI content"
    }
  };

  var marqueeTerms = {
    uk: ["AI-фотогенерація", "AI-відео", "Віртуальні інфлюенсери", "Предметна зйомка", "UGC-реклама", "Сайти під ключ", "AI-автоматизація", "Бренд-контент"],
    ru: ["AI-фотогенерация", "AI-видео", "Виртуальные инфлюенсеры", "Предметная съёмка", "UGC-реклама", "Сайты под ключ", "AI-автоматизация", "Бренд-контент"],
    en: ["AI photo generation", "AI video", "Virtual influencers", "Product photography", "UGC ads", "Turnkey websites", "AI automation", "Brand content"]
  };

  var i18nEls = document.querySelectorAll("[data-i18n]");
  var i18nPhEls = document.querySelectorAll("[data-i18n-ph]");
  var ukTitle = document.title;

  // Cache Ukrainian baseline straight from the HTML
  i18nEls.forEach(function (el) { el._uk = el.innerHTML; });
  i18nPhEls.forEach(function (el) { el._ukph = el.getAttribute("placeholder") || ""; });

  var marqueeTrack = document.getElementById("marqueeTrack");
  function buildMarquee(lang) {
    if (!marqueeTrack) return;
    var terms = marqueeTerms[lang] || marqueeTerms.uk;
    var seq = terms.concat(terms); // duplicate for seamless loop
    marqueeTrack.innerHTML = seq.map(function (t) {
      return "<span>" + t + "</span><i>✦</i>";
    }).join("");
  }

  var langBtns = document.querySelectorAll(".lang__btn");

  function applyLang(lang) {
    if (lang !== "ru" && lang !== "en") lang = "uk";
    currentLang = lang;
    document.documentElement.lang = lang;

    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = lang === "uk" ? el._uk : (dict[lang][key] != null ? dict[lang][key] : el._uk);
      el.innerHTML = val;
    });
    i18nPhEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      var val = lang === "uk" ? el._ukph : (dict[lang][key] != null ? dict[lang][key] : el._ukph);
      el.setAttribute("placeholder", val);
    });

    document.title = lang === "uk" ? ukTitle : (dict[lang]["doc.title"] || ukTitle);
    buildMarquee(lang);

    langBtns.forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem("mk_lang", lang); } catch (e) {}
  }

  langBtns.forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  var saved = "uk";
  try { saved = localStorage.getItem("mk_lang") || "uk"; } catch (e) {}
  applyLang(saved);

  /* ── Gallery lightbox ── */
  var galleryPhotos = [
    "https://d8j0ntlcm91z4.cloudfront.net/user_3CoDNZt3iODN1yFKEYOyElR7Vli/hf_20260624_175144_25d7d17d-e7e4-4043-8b79-60dccb120289.png",
    "portfolio-prada-jacket.jpg",
    "portfolio-chanel-serum.jpg",
    "portfolio-prada-bag.jpg",
    "portfolio-luxury-interior.jpg",
    "portfolio-modern-house.jpg",
    "portfolio-warrior.jpg",
    "portfolio-mouse.jpg",
    "portfolio-tree-moon.jpg",
    "portfolio-green-eyes.jpg",
    "portfolio-glamour.jpg",
    "portfolio-figurine.jpg",
    "portfolio-composite.jpg",
    "portfolio-nike.jpg",
    "portfolio-jewelry-1.jpg",
    "portfolio-jewelry-2.jpg",
    "portfolio-jewelry-3.jpg",
    "portfolio-jewelry-4.jpg"
  ];

  var videoGallery = [
    "ai-video-1.mp4",
    "ai-video-2b.mp4",
    "ai-video-2c.mp4",
    "ai-video-2d.mp4",
    "ai-video-2e.mp4",
    "ai-video-2f.mp4",
    "ai-video-2g.mp4",
    "ai-video-2h.mp4",
    "ai-video-2i.mp4"
  ];

  var video3Gallery = [
    "ai-video-2.mp4",
    "ai-video-3c.mp4",
    "ai-video-3d.mp4",
    "ai-video-3e.mp4",
    "ai-video-3f.mp4"
  ];

  var video4Gallery = [
    "ai-video-3.mp4",
    "ai-video-4b.mp4",
    "ai-video-4c.mp4",
    "ai-video-4d.mp4",
    "ai-video-4e.mp4",
    "ai-video-4f.mp4"
  ];

  var lightbox    = document.getElementById("lightbox");
  var lbImg       = document.getElementById("lbImg");
  var lbVid       = document.getElementById("lbVid");
  var lbVidSrc    = document.getElementById("lbVidSrc");
  var lbCounter   = document.getElementById("lbCounter");
  var lbPrev      = document.getElementById("lbPrev");
  var lbNext      = document.getElementById("lbNext");
  var lbClose     = document.getElementById("lbClose");
  var lbBackdrop  = document.getElementById("lbBackdrop");
  var lbIndex     = 0;
  var lbMode      = "photo"; // "photo" | "video" | "video3" | "video4" | "web"
  var lbReturnId  = "galleryTrigger";

  function lbShow(idx) {
    var items = lbMode === "photo" ? galleryPhotos
              : lbMode === "video" ? videoGallery
              : lbMode === "video3" ? video3Gallery
              : lbMode === "video4" ? video4Gallery
              : webGallery;
    lbIndex = Math.max(0, Math.min(idx, items.length - 1));
    lbCounter.textContent = (lbIndex + 1) + " / " + items.length;
    lbPrev.disabled = lbIndex === 0;
    lbNext.disabled = lbIndex === items.length - 1;
    if (lbMode === "web") {
      var item = items[lbIndex];
      lbImg.src = item.img;
      lbImg.classList.remove("is-hidden");
      lbVid.classList.remove("is-active");
      lbVid.pause();
      if (lbSiteLink) { lbSiteLink.href = item.url; lbSiteLink.removeAttribute("hidden"); }
    } else if (lbMode === "photo") {
      lbImg.src = items[lbIndex];
      lbImg.classList.remove("is-hidden");
      lbVid.classList.remove("is-active");
      lbVid.pause();
      if (lbSiteLink) lbSiteLink.setAttribute("hidden", "");
    } else {
      lbVidSrc.src = items[lbIndex];
      lbVid.load();
      lbVid.classList.add("is-active");
      lbImg.classList.add("is-hidden");
      if (lbSiteLink) lbSiteLink.setAttribute("hidden", "");
    }
  }

  function lbOpen(mode, returnId) {
    lbMode = mode;
    lbReturnId = returnId;
    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    lbShow(0);
    lbClose.focus();
  }

  function lbCloseF() {
    lightbox.setAttribute("hidden", "");
    document.body.style.overflow = "";
    lbVid.pause();
    var ret = document.getElementById(lbReturnId);
    if (ret) ret.focus();
  }

  var photoTrigger = document.getElementById("galleryTrigger");
  if (photoTrigger) {
    photoTrigger.addEventListener("click", function () { lbOpen("photo", "galleryTrigger"); });
    photoTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen("photo", "galleryTrigger"); }
    });
  }

  var videoTrigger = document.getElementById("videoGalleryTrigger");
  if (videoTrigger) {
    videoTrigger.addEventListener("click", function () { lbOpen("video", "videoGalleryTrigger"); });
    videoTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen("video", "videoGalleryTrigger"); }
    });
  }

  var video3Trigger = document.getElementById("video3GalleryTrigger");
  if (video3Trigger) {
    video3Trigger.addEventListener("click", function () { lbOpen("video3", "video3GalleryTrigger"); });
    video3Trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen("video3", "video3GalleryTrigger"); }
    });
  }

  var video4Trigger = document.getElementById("video4GalleryTrigger");
  if (video4Trigger) {
    video4Trigger.addEventListener("click", function () { lbOpen("video4", "video4GalleryTrigger"); });
    video4Trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen("video4", "video4GalleryTrigger"); }
    });
  }

  var webGallery = [
    { img: "web-preview-1.png", url: "https://ai-creator-mk.vercel.app" }
    // add more sites here
  ];
  var lbSiteLink  = document.getElementById("lbSiteLink");
  var webTrigger = document.getElementById("webGalleryTrigger");
  if (webTrigger) {
    webTrigger.addEventListener("click", function () { lbOpen("web", "webGalleryTrigger"); });
    webTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lbOpen("web", "webGalleryTrigger"); }
    });
  }

  if (lbClose)    lbClose.addEventListener("click", lbCloseF);
  if (lbBackdrop) lbBackdrop.addEventListener("click", lbCloseF);
  if (lbPrev)     lbPrev.addEventListener("click", function () { lbShow(lbIndex - 1); });
  if (lbNext)     lbNext.addEventListener("click", function () { lbShow(lbIndex + 1); });

  document.addEventListener("keydown", function (e) {
    if (lightbox && !lightbox.hasAttribute("hidden")) {
      if (e.key === "Escape")     lbCloseF();
      if (e.key === "ArrowLeft")  lbShow(lbIndex - 1);
      if (e.key === "ArrowRight") lbShow(lbIndex + 1);
    }
  });

})();
