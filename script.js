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

  /* ── Contact form (FormSubmit backend) ── */
  var form = document.getElementById("contact-form");
  var hint = document.getElementById("cf-hint");
  if (form) {
    form.addEventListener("submit", function (e) {
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk) {
        e.preventDefault();
        hint.textContent = !name
          ? "Будь ласка, вкажіть ваше ім'я."
          : "Будь ласка, введіть коректний email.";
        hint.style.color = "#ff8fa3";
        (!name ? form.name : form.email).focus();
        return;
      }

      hint.textContent = (currentLang === "ru")
        ? "Отправляем заявку…"
        : currentLang === "en" ? "Sending…" : "Відправляємо заявку…";
      hint.style.color = "";
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
      "srv.h2": "AI-решения <span class=\"serif\">любой</span> сложности",
      "srv.lead": "Три направления полного цикла — кинематографичный AI-визуал, сайты под ключ и интеллектуальная автоматизация. Каждый проект веду лично: от стратегии до безупречного запуска.",
      "p1.title": "AI-визуал и контент",
      "p1.desc": "Премиальные изображения, видео и персонажи студийного уровня — в едином стиле вашего бренда.",
      "p1.i1": "AI-генерация фото", "p1.i2": "AI-генерация видео", "p1.i3": "AI-модели и виртуальные инфлюенсеры", "p1.i4": "Предметная съёмка", "p1.i5": "UGC-реклама", "p1.i6": "Визуал для соцсетей", "p1.i7": "Fashion &amp; lifestyle", "p1.i8": "Бренд-контент", "p1.cta": "Создать AI-контент",
      "p2.title": "Сайты и веб-разработка",
      "p2.desc": "Быстрые, современные и конверсионные сайты, которые выглядят дорого и работают на результат.",
      "p2.i1": "Создание сайтов", "p2.i2": "Лендинги", "p2.i3": "Бизнес-сайты", "p2.i4": "Адаптив и премиум-дизайн", "p2.i5": "SEO-готовая структура", "p2.cta": "Обсудить сайт",
      "p3.title": "Автоматизация и AI-системы",
      "p3.desc": "Освобождаю часы рутины: интеллектуальные воркфлоу, ассистенты и авто-деплой.",
      "p3.i1": "Автоматизация сайтов", "p3.i2": "AI workflow-автоматизация", "p3.i3": "GitHub / Vercel деплой", "p3.i4": "AI-ассистенты", "p3.i5": "Автоматизированные системы", "p3.cta": "Заказать автоматизацию",
      "work.eyebrow": "Портфолио",
      "work.h2": "Избранные <span class=\"grad\">AI-проекты</span>",
      "work.lead": "Избранные направления студии — каждый кейс собран как целостная эстетика, а не набор картинок.",
      "filter.all": "Все", "filter.photo": "AI-фото", "filter.video": "AI-видео", "filter.models": "AI-модели", "filter.web": "Сайты", "filter.auto": "Автоматизация", "filter.brand": "Бренд",
      "w1.tag": "AI-фото · Fashion", "w1.h3": "Кампания «Neon Atelier»", "w1.p": "120+ fashion-визуалов в едином стиле — +240% к вовлечённости.",
      "w2.tag": "AI-видео · UGC", "w2.h3": "UGC-реклама для DTC-бренда", "w2.p": "Серия коротких роликов полностью на генеративном видео.",
      "w3.tag": "Виртуальная инфлюенсерка", "w3.h3": "Цифровой персонаж «AVA»", "w3.p": "Последовательная AI-модель для соцсетей — лицо бренда без съёмок.",
      "w4.tag": "Предметная съёмка", "w4.h3": "AI-визуалы для косметики", "w4.p": "Студийные предметные кадры без фотостудии — каталог за несколько дней.",
      "w5.tag": "Сайт · Vercel", "w5.h3": "Лендинг для AI-стартапа", "w5.p": "Премиальный одностраничный сайт с деплоем на Vercel за 5 дней.",
      "w6.tag": "AI-автоматизация", "w6.h3": "Контент-воркфлоу для агентства", "w6.p": "Автоматизированный пайплайн генерации и публикации — минус 60% рутины.",
      "w7.tag": "Бренд-контент", "w7.h3": "Айдентика «Aether Labs»", "w7.p": "Полная визуальная система, сгенерированная и сведённая в единый гайдлайн.",
      "w8.tag": "AI-видео · Promo", "w8.h3": "Кинематографичный промо-ролик", "w8.p": "30-секундный клип для запуска продукта — от сториборда до монтажа.",
      "w9.tag": "Соцсети", "w9.h3": "Контент-пак для Instagram", "w9.p": "Целостная визуальная лента: обложки, карусели и reels-кадры.",
      "work.more": "Обсудить ваш проект",
      "proc.eyebrow": "Как я работаю", "proc.h2": "Процесс, который выглядит <span class=\"serif\">дорого</span>", "proc.lead": "Прозрачные этапы и личное сопровождение — от первого брифа до запуска и дальнейшего развития.",
      "t1.h3": "Бриф и стратегия", "t1.p": "Погружаюсь в ваш бренд, цели и референсы. Фиксируем объём и результат.",
      "t2.h3": "Концепция и мудборд", "t2.p": "Определяю визуальное направление. Первые концепты — уже за 24 часа.",
      "t3.h3": "AI-продакшн", "t3.p": "Генерация и доработка контента, разработка сайта или системы.",
      "t4.h3": "Финализация и деплой", "t4.p": "Готовый результат: файлы, публикация или деплой на GitHub / Vercel.",
      "pr.eyebrow": "Пакеты услуг", "pr.h2": "Прозрачные <span class=\"grad\">тарифы</span>", "pr.lead": "Стартовые цены — лишь ориентир. Финальную стоимость собираю индивидуально под масштаб и амбиции вашего проекта.",
      "price.from": "от", "pl.badge": "Популярный",
      "pl1.name": "Старт", "pl1.desc": "Отдельный AI-контент или простая страница", "pl1.i1": "AI-фотосет или серия визуалов", "pl1.i2": "Контент для соцсетей", "pl1.i3": "Одностраничный лендинг", "pl1.i4": "2 раунда правок", "pl1.btn": "Выбрать «Старт»",
      "pl2.name": "Studio", "pl2.desc": "Комплексный AI-продакшн под бренд", "pl2.i1": "Кампания AI-фото и видео", "pl2.i2": "Виртуальная модель или UGC-серия", "pl2.i3": "Многостраничный сайт + деплой", "pl2.i4": "Единый визуальный стиль бренда", "pl2.i5": "Приоритетная поддержка", "pl2.btn": "Выбрать «Studio»",
      "pl3.name": "Premium", "pl3.desc": "Студия полного цикла и автоматизация", "pl3.price": "Индивидуально", "pl3.i1": "Постоянный AI-контент под ключ", "pl3.i2": "Собственная виртуальная инфлюенсерка", "pl3.i3": "AI workflow и автоматизация", "pl3.i4": "AI-ассистенты и системы", "pl3.i5": "Сопровождение и масштабирование", "pl3.btn": "Обсудить Premium",
      "v.eyebrow": "Отзывы", "v.h2": "Мне доверяют <span class=\"grad\">инноваторы</span>",
      "vc1.text": "«Марина превратила размытый бриф в целостную AI-кампанию за неделю. Выглядит как трейлер.»", "vc1.role": "Founder, Fashion Brand",
      "vc2.text": "«Сайт и автоматизация под ключ. Скорость и качество, которых мы не ожидали от AI.»", "vc2.role": "CMO, SaaS Startup",
      "vc3.text": "«Лучшее — это вкус. Многие умеют в AI, но результат Марины выглядит премиально.»", "vc3.role": "Art Director",
      "ct.eyebrow": "Готовы начать?", "ct.h2": "Создадим то, <span class=\"serif\">что запомнят</span>", "ct.lead": "Расскажите о замысле — и уже завтра увидите первые концепты. Выберите направление или напишите напрямую.",
      "ct.q1": "Заказать AI-проект", "ct.q2": "Обсудить сайт", "ct.q3": "Создать AI-контент", "ct.email": "Написать на почту",
      "f.name": "Имя", "f.name.ph": "Как к вам обращаться", "f.email": "Email", "f.service": "Направление",
      "f.opt1": "AI-проект (общий)", "f.opt2": "AI-контент (фото / видео)", "f.opt3": "Виртуальная модель / инфлюенсер", "f.opt4": "Сайт / лендинг", "f.opt5": "Автоматизация / AI-системы",
      "f.msg": "Детали проекта", "f.msg.ph": "Несколько слов о задаче, сроках и бюджете", "f.btn": "Отправить заявку", "f.hint": "Откроется ваш почтовый клиент с готовым письмом.",
      "ft.tag": "Marina Kalashnikova — AI Creator и архитектор цифровой автоматизации. Премиальный кинематографичный AI-контент и цифровые продукты под ваш бренд.",
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
      "srv.h2": "AI solutions of <span class=\"serif\">any</span> complexity",
      "srv.lead": "Three full-cycle directions — cinematic AI visuals, turnkey websites and intelligent automation. I lead every project personally: from strategy to a flawless launch.",
      "p1.title": "AI visuals & content",
      "p1.desc": "Premium studio-grade images, video and characters — in a single brand style.",
      "p1.i1": "AI photo generation", "p1.i2": "AI video generation", "p1.i3": "AI models & virtual influencers", "p1.i4": "Product photography", "p1.i5": "UGC ads", "p1.i6": "Social media visuals", "p1.i7": "Fashion &amp; lifestyle", "p1.i8": "Brand content", "p1.cta": "Create AI content",
      "p2.title": "Websites & web development",
      "p2.desc": "Fast, modern, high-converting websites that look expensive and drive results.",
      "p2.i1": "Website creation", "p2.i2": "Landing pages", "p2.i3": "Business websites", "p2.i4": "Responsive & premium design", "p2.i5": "SEO-ready structure", "p2.cta": "Discuss a website",
      "p3.title": "Automation & AI systems",
      "p3.desc": "Freeing hours of routine: intelligent workflows, assistants and auto-deploy.",
      "p3.i1": "Website automation", "p3.i2": "AI workflow automation", "p3.i3": "GitHub / Vercel deployment", "p3.i4": "AI assistants", "p3.i5": "Automated systems", "p3.cta": "Order automation",
      "work.eyebrow": "Portfolio",
      "work.h2": "Selected <span class=\"grad\">AI projects</span>",
      "work.lead": "Selected studio directions — every case is built as a cohesive aesthetic, not a set of images.",
      "filter.all": "All", "filter.photo": "AI photo", "filter.video": "AI video", "filter.models": "AI models", "filter.web": "Websites", "filter.auto": "Automation", "filter.brand": "Brand",
      "w1.tag": "AI photo · Fashion", "w1.h3": "“Neon Atelier” campaign", "w1.p": "120+ fashion visuals in one style — +240% engagement.",
      "w2.tag": "AI video · UGC", "w2.h3": "UGC ads for a DTC brand", "w2.p": "A series of short clips fully on generative video.",
      "w3.tag": "Virtual influencer", "w3.h3": "Digital persona “AVA”", "w3.p": "A consistent AI model for social media — a brand face without shoots.",
      "w4.tag": "Product photography", "w4.h3": "AI visuals for cosmetics", "w4.p": "Studio product shots without a studio — a catalog in days.",
      "w5.tag": "Website · Vercel", "w5.h3": "Landing for an AI startup", "w5.p": "A premium one-pager deployed to Vercel in 5 days.",
      "w6.tag": "AI automation", "w6.h3": "Content workflow for an agency", "w6.p": "Automated generation & publishing pipeline — minus 60% routine.",
      "w7.tag": "Brand content", "w7.h3": "“Aether Labs” identity", "w7.p": "A full visual system, generated and unified into one guideline.",
      "w8.tag": "AI video · Promo", "w8.h3": "Cinematic promo clip", "w8.p": "A 30-second product launch clip — from storyboard to edit.",
      "w9.tag": "Social media", "w9.h3": "Instagram content pack", "w9.p": "A cohesive feed: covers, carousels and reels frames.",
      "work.more": "Discuss your project",
      "proc.eyebrow": "How I work", "proc.h2": "A process that looks <span class=\"serif\">expensive</span>", "proc.lead": "Transparent stages and personal guidance — from the first brief to launch and beyond.",
      "t1.h3": "Brief & strategy", "t1.p": "I dive into your brand, goals and references. We fix scope and outcome.",
      "t2.h3": "Concept & moodboard", "t2.p": "I define the visual direction. First concepts within 24 hours.",
      "t3.h3": "AI production", "t3.p": "Generating and refining content, building the site or system.",
      "t4.h3": "Finalization & deploy", "t4.p": "Final result: files, publishing or deploy to GitHub / Vercel.",
      "pr.eyebrow": "Service packages", "pr.h2": "Transparent <span class=\"grad\">pricing</span>", "pr.lead": "Starting prices are only a reference. I tailor the final quote to the scale and ambition of your project.",
      "price.from": "from", "pl.badge": "Popular",
      "pl1.name": "Start", "pl1.desc": "A single AI-content piece or a simple page", "pl1.i1": "AI photoset or a series of visuals", "pl1.i2": "Social media content", "pl1.i3": "One-page landing", "pl1.i4": "2 rounds of revisions", "pl1.btn": "Choose “Start”",
      "pl2.name": "Studio", "pl2.desc": "Comprehensive AI production for your brand", "pl2.i1": "AI photo & video campaign", "pl2.i2": "Virtual model or UGC series", "pl2.i3": "Multi-page website + deploy", "pl2.i4": "Unified brand visual style", "pl2.i5": "Priority support", "pl2.btn": "Choose “Studio”",
      "pl3.name": "Premium", "pl3.desc": "Full-cycle studio & automation", "pl3.price": "Custom", "pl3.i1": "Ongoing turnkey AI content", "pl3.i2": "Your own virtual influencer", "pl3.i3": "AI workflow & automation", "pl3.i4": "AI assistants & systems", "pl3.i5": "Support & scaling", "pl3.btn": "Discuss Premium",
      "v.eyebrow": "Reviews", "v.h2": "Trusted by <span class=\"grad\">innovators</span>",
      "vc1.text": "“Marina turned a vague brief into a cohesive AI campaign in a week. It looks like a trailer.”", "vc1.role": "Founder, Fashion Brand",
      "vc2.text": "“Website and automation turnkey. Speed and quality we didn’t expect from AI.”", "vc2.role": "CMO, SaaS Startup",
      "vc3.text": "“The best part is taste. Many can do AI, but Marina’s result looks premium.”", "vc3.role": "Art Director",
      "ct.eyebrow": "Ready to start?", "ct.h2": "Let’s create something <span class=\"serif\">unforgettable</span>", "ct.lead": "Tell me about your vision — and see first concepts as soon as tomorrow. Pick a direction or write to me directly.",
      "ct.q1": "Order AI project", "ct.q2": "Discuss a website", "ct.q3": "Create AI content", "ct.email": "Email me",
      "f.name": "Name", "f.name.ph": "How should I address you", "f.email": "Email", "f.service": "Direction",
      "f.opt1": "AI project (general)", "f.opt2": "AI content (photo / video)", "f.opt3": "Virtual model / influencer", "f.opt4": "Website / landing", "f.opt5": "Automation / AI systems",
      "f.msg": "Project details", "f.msg.ph": "A few words about the task, timeline and budget", "f.btn": "Send request", "f.hint": "Your email app will open with a ready message.",
      "ft.tag": "Marina Kalashnikova — AI Creator and digital automation architect. Premium cinematic AI content and digital products for your brand.",
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
})();
