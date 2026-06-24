import type { Locale } from './types';

export interface Dictionary {
  nav: {
    home: string;
    program: string;
    cases: string;
    pricing: string;
    reviews: string;
    faq: string;
    contacts: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  about: {
    tag: string;
    title: string;
    lead: string;
    paragraphs: string[];
    highlights: { value: string; label: string }[];
  };
  audience: {
    tag: string;
    title: string;
    subtitle: string;
    items: { icon: string; title: string; text: string }[];
  };
  skills: {
    tag: string;
    title: string;
    subtitle: string;
    items: { title: string; text: string }[];
  };
  program: {
    tag: string;
    title: string;
    subtitle: string;
    modules: { num: string; title: string; lessons: string; text: string }[];
  };
  cases: {
    tag: string;
    title: string;
    subtitle: string;
    items: { title: string; category: string; text: string }[];
  };
  pricing: {
    tag: string;
    title: string;
    subtitle: string;
    perMonth: string;
    popular: string;
    plans: {
      id: string;
      name: string;
      price: string;
      tagline: string;
      features: string[];
      cta: string;
    }[];
  };
  payment: {
    tag: string;
    title: string;
    subtitle: string;
    localTitle: string;
    intlTitle: string;
    cryptoTitle: string;
    detected: string;
    payNow: string;
    secure: string;
    selectPlan: string;
  };
  reviews: {
    tag: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; text: string }[];
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  contacts: {
    tag: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    or: string;
  };
  footer: {
    tagline: string;
    nav: string;
    legal: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  success: {
    title: string;
    text: string;
    cta: string;
    back: string;
  };
  dashboard: {
    greeting: string;
    progress: string;
    continue: string;
    search: string;
    tabs: {
      modules: string;
      materials: string;
      bonuses: string;
      homework: string;
      profile: string;
    };
    modulesTitle: string;
    lessons: string;
    completed: string;
    materialsTitle: string;
    bonusesTitle: string;
    homeworkTitle: string;
    profileTitle: string;
    backToSite: string;
  };
}

const ua: Dictionary = {
  nav: {
    home: 'Головна',
    program: 'Програма',
    cases: 'Кейси',
    pricing: 'Тарифи',
    reviews: 'Відгуки',
    faq: 'FAQ',
    contacts: 'Контакти',
    cta: 'Почати навчання',
  },
  hero: {
    badge: 'AI-освітня платформа нового покоління',
    title: 'AI Creator MK',
    subtitle:
      'Навчись створювати AI-фото, AI-відео, сайти, рекламу та заробляти на штучному інтелекті.',
    ctaPrimary: 'Почати навчання',
    ctaSecondary: 'Подивитися програму',
    stats: [
      { value: '2 500+', label: 'студентів' },
      { value: '40+', label: 'AI-інструментів' },
      { value: '12', label: 'модулів програми' },
    ],
  },
  about: {
    tag: 'Про бренд',
    title: 'AI Creator MK — це твій вхід у світ штучного інтелекту',
    lead: 'Преміальна освітня платформа, де технології зустрічаються з естетикою.',
    paragraphs: [
      'AI Creator MK — авторська школа, створена для тих, хто хоче не просто «погратися з нейромережами», а будувати реальний дохід на штучному інтелекті.',
      'Ми поєднуємо найсучасніші AI-інструменти, кінематографічну естетику та системний підхід до навчання. Жодної води — лише практика, кейси та готові рішення.',
      'Від першого AI-фото до власної студії під ключ: ти отримаєш покрокову систему, підтримку та спільноту креаторів.',
    ],
    highlights: [
      { value: '100%', label: 'практики' },
      { value: '24/7', label: 'доступ до матеріалів' },
      { value: '∞', label: 'оновлень програми' },
    ],
  },
  audience: {
    tag: 'Для кого',
    title: 'Для кого цей продукт',
    subtitle: 'Програма підійде кожному, хто хоче монетизувати AI — незалежно від досвіду.',
    items: [
      { icon: 'spark', title: 'Початківцям', text: 'Ти ніколи не працював з AI? Почнемо з нуля та доведемо до перших замовлень.' },
      { icon: 'camera', title: 'Креаторам та фотографам', text: 'Додай AI у свій арсенал і створюй контент, який неможливо відрізнити від студійного.' },
      { icon: 'briefcase', title: 'Підприємцям', text: 'Зменш витрати на дизайн, відео та рекламу в десятки разів за допомогою AI.' },
      { icon: 'rocket', title: 'Фрілансерам', text: 'Відкрий новий напрям послуг із високим чеком і чергою клієнтів.' },
      { icon: 'palette', title: 'Дизайнерам', text: 'Прискор роботу та виходь на новий рівень візуалу з нейромережами.' },
      { icon: 'chart', title: 'Маркетологам', text: 'Генеруй креативи, лендинги та рекламу швидше за будь-яке агентство.' },
    ],
  },
  skills: {
    tag: 'Результат',
    title: 'Що ти навчишся робити',
    subtitle: 'Конкретні навички, які приносять гроші вже під час навчання.',
    items: [
      { title: 'AI-фотографія', text: 'Створювати фотореалістичні портрети, предметку та fashion-зйомки без камери.' },
      { title: 'AI-відео', text: 'Знімати рекламні ролики, кліпи та анімацію за допомогою нейромереж.' },
      { title: 'Сайти та лендинги', text: 'Збирати преміальні сайти й лендинги з AI — швидко та без коду.' },
      { title: 'Реклама та креативи', text: 'Генерувати рекламні кампанії, банери й тексти, що продають.' },
      { title: 'Брендинг', text: 'Розробляти логотипи, фірмовий стиль та візуальну айдентику.' },
      { title: 'Монетизація', text: 'Будувати воронки, знаходити клієнтів і виводити послуги на високий чек.' },
    ],
  },
  program: {
    tag: 'Навчання',
    title: 'Програма навчання',
    subtitle: '12 модулів — від основ до власної AI-студії під ключ.',
    modules: [
      { num: '01', title: 'Вступ у світ AI', lessons: '5 уроків', text: 'Огляд інструментів, налаштування робочого простору, перші генерації.' },
      { num: '02', title: 'AI-фотографія Pro', lessons: '8 уроків', text: 'Midjourney, Flux, промпт-інжиніринг, портрети та предметка.' },
      { num: '03', title: 'AI-відео та анімація', lessons: '7 уроків', text: 'Runway, Kling, Sora-підхід, монтаж та озвучення.' },
      { num: '04', title: 'Сайти на AI', lessons: '6 уроків', text: 'Від ідеї до деплою: преміальні лендинги без коду.' },
      { num: '05', title: 'Реклама та креативи', lessons: '6 уроків', text: 'Performance-креативи, A/B-тести, тексти, що конвертують.' },
      { num: '06', title: 'Брендинг та айдентика', lessons: '5 уроків', text: 'Логотипи, гайдлайни, фірмовий стиль за допомогою AI.' },
      { num: '07', title: 'Автоматизація', lessons: '6 уроків', text: 'Зв\'язки інструментів, агенти та робочі процеси.' },
      { num: '08', title: 'Монетизація та клієнти', lessons: '8 уроків', text: 'Упаковка послуг, воронки, продажі та високий чек.' },
    ],
  },
  cases: {
    tag: 'Портфоліо',
    title: 'Кейси та приклади робіт',
    subtitle: 'Реальні роботи студентів та команди AI Creator MK.',
    items: [
      { title: 'Fashion-кампанія для бренду одягу', category: 'AI-фото', text: 'Повноцінний lookbook без студії та моделей — економія 80% бюджету.' },
      { title: 'Рекламний ролик для косметики', category: 'AI-відео', text: '30-секундний кінематографічний кліп, згенерований за 2 дні.' },
      { title: 'Лендинг для AI-стартапу', category: 'Веб', text: 'Преміальний сайт під ключ із конверсією 9%.' },
      { title: 'Ребрендинг кав\'ярні', category: 'Брендинг', text: 'Логотип, упаковка та візуальна система повністю на AI.' },
      { title: 'Серія креативів для таргету', category: 'Реклама', text: '50+ варіацій банерів, CTR зріс у 3 рази.' },
      { title: 'Предметна зйомка для маркетплейсу', category: 'AI-фото', text: '200 карток товарів за тиждень замість місяця.' },
    ],
  },
  pricing: {
    tag: 'Тарифи',
    title: 'Обери свій формат навчання',
    subtitle: 'Три пакети під різні цілі. Найпопулярніший — PRO.',
    perMonth: '',
    popular: 'Найпопулярніший',
    plans: [
      {
        id: 'start',
        name: 'START',
        price: '$149',
        tagline: 'Старт у світ AI',
        features: ['Доступ до основного курсу', '40+ уроків у запису', 'Доступ 6 місяців', 'Сертифікат про проходження'],
        cta: 'Обрати START',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: '$299',
        tagline: 'Оптимальний вибір',
        features: ['Усе з тарифу START', 'Додаткові матеріали та шаблони', 'Безкоштовні оновлення назавжди', 'Підтримка кураторів', 'Доступ до спільноти'],
        cta: 'Обрати PRO',
      },
      {
        id: 'vip',
        name: 'VIP',
        price: '$599',
        tagline: 'Максимальний результат',
        features: ['Усе з тарифу PRO', 'Особистий супровід', 'Розбір твоїх робіт', '3 індивідуальні консультації', 'Допомога з першими клієнтами'],
        cta: 'Обрати VIP',
      },
    ],
  },
  payment: {
    tag: 'Оплата',
    title: 'Зручна та безпечна оплата',
    subtitle: 'Обери спосіб оплати — ми підтримуємо все, від карток до криптовалюти.',
    localTitle: 'Для України',
    intlTitle: 'Міжнародні платежі',
    cryptoTitle: 'Криптовалюта',
    detected: 'Визначено регіон',
    payNow: 'Оплатити',
    secure: 'Платежі захищені SSL-шифруванням',
    selectPlan: 'Обраний тариф',
  },
  reviews: {
    tag: 'Відгуки',
    title: 'Що кажуть студенти',
    subtitle: 'Понад 2 500 випускників уже заробляють на AI.',
    items: [
      { name: 'Олена К.', role: 'Дизайнерка', text: 'За місяць навчання вийшла на перших клієнтів. AI-фото замовляють навіть бренди одягу!' },
      { name: 'Дмитро Р.', role: 'Підприємець', text: 'Скоротив витрати на маркетинг у 5 разів. Тепер усі креативи робимо самі.' },
      { name: 'Марина С.', role: 'Фрілансерка', text: 'VIP-тариф окупився з першого замовлення. Особистий супровід — це золото.' },
      { name: 'Артем В.', role: 'Маркетолог', text: 'Найкраща інвестиція в себе за останні роки. Подача матеріалу — преміум.' },
      { name: 'Софія Л.', role: 'Фотографка', text: 'Думала, AI замінить мене. Натомість він зробив мене у 10 разів продуктивнішою.' },
      { name: 'Назар П.', role: 'Студент', text: 'Почав з нуля, через 2 місяці — стабільний дохід на AI-відео. Дякую команді!' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Часті запитання',
    subtitle: 'Усе, що варто знати перед стартом.',
    items: [
      { q: 'Чи підійде курс новачку?', a: 'Так. Ми починаємо з нуля та поступово доводимо до професійного рівня. Жодних попередніх знань не потрібно.' },
      { q: 'Скільки часу займає навчання?', a: 'У середньому 6–8 тижнів за комфортного темпу. Доступ до матеріалів залишається з вами надовго.' },
      { q: 'Чи потрібен потужний комп\'ютер?', a: 'Ні. Більшість AI-інструментів працюють у хмарі — достатньо браузера та інтернету.' },
      { q: 'Чи видаєте сертифікат?', a: 'Так, після проходження курсу ви отримуєте іменний сертифікат AI Creator MK.' },
      { q: 'Як відбувається підтримка?', a: 'На тарифах PRO та VIP — підтримка кураторів і доступ до закритої спільноти. На VIP додатково особистий супровід.' },
      { q: 'Чи можна оплатити частинами?', a: 'Так. Доступне розстрочення та оплата частинами для українських і міжнародних клієнтів.' },
    ],
  },
  contacts: {
    tag: 'Контакти',
    title: 'Залишилися питання?',
    subtitle: 'Напиши нам — відповімо протягом кількох годин.',
    namePlaceholder: 'Ваше імʼя',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Ваше повідомлення',
    send: 'Надіслати',
    or: 'або напишіть нам напряму',
  },
  footer: {
    tagline: 'Навчайся створювати майбутнє за допомогою штучного інтелекту.',
    nav: 'Навігація',
    legal: 'Правове',
    privacy: 'Політика конфіденційності',
    terms: 'Умови використання',
    rights: 'Усі права захищені.',
  },
  success: {
    title: 'Оплату отримано. Доступ до AI Creator MK відкрито.',
    text: 'Вітаємо у спільноті креаторів! Ми надіслали деталі доступу на вашу пошту. Готові почати навчання?',
    cta: 'Увійти в кабінет',
    back: 'На головну',
  },
  dashboard: {
    greeting: 'Вітаємо',
    progress: 'Ваш прогрес',
    continue: 'Продовжити навчання',
    search: 'Пошук уроків, матеріалів...',
    tabs: {
      modules: 'Модулі',
      materials: 'Матеріали',
      bonuses: 'Бонуси',
      homework: 'Домашні завдання',
      profile: 'Профіль',
    },
    modulesTitle: 'Модулі та уроки',
    lessons: 'уроків',
    completed: 'пройдено',
    materialsTitle: 'Матеріали для завантаження',
    bonusesTitle: 'Бонуси та подарунки',
    homeworkTitle: 'Домашні завдання',
    profileTitle: 'Профіль користувача',
    backToSite: 'На сайт',
  },
};

const en: Dictionary = {
  nav: {
    home: 'Home',
    program: 'Program',
    cases: 'Cases',
    pricing: 'Pricing',
    reviews: 'Reviews',
    faq: 'FAQ',
    contacts: 'Contacts',
    cta: 'Start learning',
  },
  hero: {
    badge: 'Next-generation AI education platform',
    title: 'AI Creator MK',
    subtitle:
      'Learn to create AI photos, AI videos, websites, ads — and earn with artificial intelligence.',
    ctaPrimary: 'Start learning',
    ctaSecondary: 'View the program',
    stats: [
      { value: '2,500+', label: 'students' },
      { value: '40+', label: 'AI tools' },
      { value: '12', label: 'program modules' },
    ],
  },
  about: {
    tag: 'About',
    title: 'AI Creator MK — your gateway into artificial intelligence',
    lead: 'A premium education platform where technology meets aesthetics.',
    paragraphs: [
      'AI Creator MK is an author-led school built for people who want to build real income with AI — not just play with neural networks.',
      'We combine cutting-edge AI tools, cinematic aesthetics and a systematic approach to learning. No fluff — only practice, cases and ready-made solutions.',
      'From your first AI photo to your own turnkey studio: you get a step-by-step system, support and a community of creators.',
    ],
    highlights: [
      { value: '100%', label: 'practice' },
      { value: '24/7', label: 'access to materials' },
      { value: '∞', label: 'program updates' },
    ],
  },
  audience: {
    tag: 'Audience',
    title: 'Who this product is for',
    subtitle: 'The program fits anyone who wants to monetize AI — regardless of experience.',
    items: [
      { icon: 'spark', title: 'Beginners', text: 'Never worked with AI? We start from zero and take you to your first orders.' },
      { icon: 'camera', title: 'Creators & photographers', text: 'Add AI to your toolkit and create content indistinguishable from studio work.' },
      { icon: 'briefcase', title: 'Entrepreneurs', text: 'Cut design, video and ad costs by tens of times with AI.' },
      { icon: 'rocket', title: 'Freelancers', text: 'Open a new high-ticket service line with a queue of clients.' },
      { icon: 'palette', title: 'Designers', text: 'Speed up your work and reach a new level of visuals with neural networks.' },
      { icon: 'chart', title: 'Marketers', text: 'Generate creatives, landing pages and ads faster than any agency.' },
    ],
  },
  skills: {
    tag: 'Outcome',
    title: 'What you will learn to do',
    subtitle: 'Concrete skills that make money while you learn.',
    items: [
      { title: 'AI photography', text: 'Create photorealistic portraits, product shots and fashion shoots without a camera.' },
      { title: 'AI video', text: 'Produce ad spots, clips and animation with neural networks.' },
      { title: 'Websites & landings', text: 'Build premium sites and landing pages with AI — fast and no-code.' },
      { title: 'Ads & creatives', text: 'Generate ad campaigns, banners and copy that sells.' },
      { title: 'Branding', text: 'Design logos, brand styles and visual identity.' },
      { title: 'Monetization', text: 'Build funnels, find clients and grow your services to high-ticket.' },
    ],
  },
  program: {
    tag: 'Curriculum',
    title: 'Learning program',
    subtitle: '12 modules — from basics to your own turnkey AI studio.',
    modules: [
      { num: '01', title: 'Intro to the AI world', lessons: '5 lessons', text: 'Tools overview, workspace setup, first generations.' },
      { num: '02', title: 'AI Photography Pro', lessons: '8 lessons', text: 'Midjourney, Flux, prompt engineering, portraits & products.' },
      { num: '03', title: 'AI video & animation', lessons: '7 lessons', text: 'Runway, Kling, the Sora approach, editing & voiceover.' },
      { num: '04', title: 'Websites with AI', lessons: '6 lessons', text: 'From idea to deploy: premium landings with no code.' },
      { num: '05', title: 'Ads & creatives', lessons: '6 lessons', text: 'Performance creatives, A/B tests, copy that converts.' },
      { num: '06', title: 'Branding & identity', lessons: '5 lessons', text: 'Logos, guidelines and brand style with AI.' },
      { num: '07', title: 'Automation', lessons: '6 lessons', text: 'Tool chains, agents and workflows.' },
      { num: '08', title: 'Monetization & clients', lessons: '8 lessons', text: 'Service packaging, funnels, sales and high-ticket.' },
    ],
  },
  cases: {
    tag: 'Portfolio',
    title: 'Cases & sample work',
    subtitle: 'Real work by students and the AI Creator MK team.',
    items: [
      { title: 'Fashion campaign for a clothing brand', category: 'AI photo', text: 'A full lookbook with no studio or models — 80% budget saved.' },
      { title: 'Cosmetics ad spot', category: 'AI video', text: 'A 30-second cinematic clip generated in 2 days.' },
      { title: 'Landing for an AI startup', category: 'Web', text: 'A premium turnkey site with a 9% conversion rate.' },
      { title: 'Coffee shop rebranding', category: 'Branding', text: 'Logo, packaging and visual system fully on AI.' },
      { title: 'Ad creatives series', category: 'Ads', text: '50+ banner variations, CTR up 3x.' },
      { title: 'Product photography for a marketplace', category: 'AI photo', text: '200 product cards in a week instead of a month.' },
    ],
  },
  pricing: {
    tag: 'Pricing',
    title: 'Choose your learning format',
    subtitle: 'Three packages for different goals. Most popular — PRO.',
    perMonth: '',
    popular: 'Most popular',
    plans: [
      {
        id: 'start',
        name: 'START',
        price: '$149',
        tagline: 'Enter the AI world',
        features: ['Access to the core course', '40+ recorded lessons', '6 months access', 'Completion certificate'],
        cta: 'Choose START',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: '$299',
        tagline: 'The optimal choice',
        features: ['Everything in START', 'Extra materials & templates', 'Free updates forever', 'Mentor support', 'Community access'],
        cta: 'Choose PRO',
      },
      {
        id: 'vip',
        name: 'VIP',
        price: '$599',
        tagline: 'Maximum results',
        features: ['Everything in PRO', 'Personal mentoring', 'Review of your work', '3 one-on-one consultations', 'Help landing your first clients'],
        cta: 'Choose VIP',
      },
    ],
  },
  payment: {
    tag: 'Payment',
    title: 'Convenient & secure payment',
    subtitle: 'Pick a payment method — we support everything from cards to crypto.',
    localTitle: 'For Ukraine',
    intlTitle: 'International payments',
    cryptoTitle: 'Cryptocurrency',
    detected: 'Detected region',
    payNow: 'Pay now',
    secure: 'Payments secured with SSL encryption',
    selectPlan: 'Selected plan',
  },
  reviews: {
    tag: 'Reviews',
    title: 'What students say',
    subtitle: 'Over 2,500 graduates already earn with AI.',
    items: [
      { name: 'Olena K.', role: 'Designer', text: 'Got my first clients within a month. Even clothing brands order AI photos!' },
      { name: 'Dmytro R.', role: 'Entrepreneur', text: 'Cut marketing costs 5x. Now we make all creatives ourselves.' },
      { name: 'Maryna S.', role: 'Freelancer', text: 'The VIP plan paid off with my first order. Personal mentoring is gold.' },
      { name: 'Artem V.', role: 'Marketer', text: 'Best investment in myself in years. The delivery is premium.' },
      { name: 'Sofia L.', role: 'Photographer', text: 'I thought AI would replace me. Instead it made me 10x more productive.' },
      { name: 'Nazar P.', role: 'Student', text: 'Started from zero, in 2 months — steady income on AI video. Thank you!' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Everything worth knowing before you start.',
    items: [
      { q: 'Is the course good for beginners?', a: 'Yes. We start from zero and gradually take you to a professional level. No prior knowledge required.' },
      { q: 'How long does it take?', a: 'On average 6–8 weeks at a comfortable pace. Access to materials stays with you for a long time.' },
      { q: 'Do I need a powerful computer?', a: 'No. Most AI tools run in the cloud — a browser and internet are enough.' },
      { q: 'Do you issue a certificate?', a: 'Yes, after completing the course you receive a personalized AI Creator MK certificate.' },
      { q: 'How does support work?', a: 'PRO and VIP include mentor support and a private community. VIP adds personal mentoring.' },
      { q: 'Can I pay in installments?', a: 'Yes. Installments and split payments are available for both Ukrainian and international clients.' },
    ],
  },
  contacts: {
    tag: 'Contacts',
    title: 'Still have questions?',
    subtitle: 'Write to us — we reply within a few hours.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Your message',
    send: 'Send',
    or: 'or reach us directly',
  },
  footer: {
    tagline: 'Learn to create the future with artificial intelligence.',
    nav: 'Navigation',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    rights: 'All rights reserved.',
  },
  success: {
    title: 'Payment received. Access to AI Creator MK is open.',
    text: 'Welcome to the creators community! We sent your access details to your email. Ready to start learning?',
    cta: 'Enter the dashboard',
    back: 'Back home',
  },
  dashboard: {
    greeting: 'Welcome',
    progress: 'Your progress',
    continue: 'Continue learning',
    search: 'Search lessons, materials...',
    tabs: {
      modules: 'Modules',
      materials: 'Materials',
      bonuses: 'Bonuses',
      homework: 'Homework',
      profile: 'Profile',
    },
    modulesTitle: 'Modules & lessons',
    lessons: 'lessons',
    completed: 'completed',
    materialsTitle: 'Downloadable materials',
    bonusesTitle: 'Bonuses & gifts',
    homeworkTitle: 'Homework',
    profileTitle: 'User profile',
    backToSite: 'To site',
  },
};

const ru: Dictionary = {
  nav: {
    home: 'Главная',
    program: 'Программа',
    cases: 'Кейсы',
    pricing: 'Тарифы',
    reviews: 'Отзывы',
    faq: 'FAQ',
    contacts: 'Контакты',
    cta: 'Начать обучение',
  },
  hero: {
    badge: 'AI-образовательная платформа нового поколения',
    title: 'AI Creator MK',
    subtitle:
      'Научись создавать AI-фото, AI-видео, сайты, рекламу и зарабатывать на искусственном интеллекте.',
    ctaPrimary: 'Начать обучение',
    ctaSecondary: 'Смотреть программу',
    stats: [
      { value: '2 500+', label: 'студентов' },
      { value: '40+', label: 'AI-инструментов' },
      { value: '12', label: 'модулей программы' },
    ],
  },
  about: {
    tag: 'О бренде',
    title: 'AI Creator MK — твой вход в мир искусственного интеллекта',
    lead: 'Премиальная образовательная платформа, где технологии встречаются с эстетикой.',
    paragraphs: [
      'AI Creator MK — авторская школа для тех, кто хочет не просто «поиграть с нейросетями», а строить реальный доход на искусственном интеллекте.',
      'Мы соединяем самые современные AI-инструменты, кинематографическую эстетику и системный подход к обучению. Никакой воды — только практика, кейсы и готовые решения.',
      'От первого AI-фото до собственной студии под ключ: ты получишь пошаговую систему, поддержку и сообщество креаторов.',
    ],
    highlights: [
      { value: '100%', label: 'практики' },
      { value: '24/7', label: 'доступ к материалам' },
      { value: '∞', label: 'обновлений программы' },
    ],
  },
  audience: {
    tag: 'Для кого',
    title: 'Для кого этот продукт',
    subtitle: 'Программа подойдёт каждому, кто хочет монетизировать AI — независимо от опыта.',
    items: [
      { icon: 'spark', title: 'Новичкам', text: 'Никогда не работал с AI? Начнём с нуля и доведём до первых заказов.' },
      { icon: 'camera', title: 'Креаторам и фотографам', text: 'Добавь AI в свой арсенал и создавай контент, неотличимый от студийного.' },
      { icon: 'briefcase', title: 'Предпринимателям', text: 'Сократи расходы на дизайн, видео и рекламу в десятки раз с помощью AI.' },
      { icon: 'rocket', title: 'Фрилансерам', text: 'Открой новое направление услуг с высоким чеком и очередью клиентов.' },
      { icon: 'palette', title: 'Дизайнерам', text: 'Ускорь работу и выйди на новый уровень визуала с нейросетями.' },
      { icon: 'chart', title: 'Маркетологам', text: 'Генерируй креативы, лендинги и рекламу быстрее любого агентства.' },
    ],
  },
  skills: {
    tag: 'Результат',
    title: 'Чему ты научишься',
    subtitle: 'Конкретные навыки, которые приносят деньги уже во время обучения.',
    items: [
      { title: 'AI-фотография', text: 'Создавать фотореалистичные портреты, предметку и fashion-съёмки без камеры.' },
      { title: 'AI-видео', text: 'Снимать рекламные ролики, клипы и анимацию с помощью нейросетей.' },
      { title: 'Сайты и лендинги', text: 'Собирать премиальные сайты и лендинги с AI — быстро и без кода.' },
      { title: 'Реклама и креативы', text: 'Генерировать рекламные кампании, баннеры и тексты, которые продают.' },
      { title: 'Брендинг', text: 'Разрабатывать логотипы, фирменный стиль и визуальную айдентику.' },
      { title: 'Монетизация', text: 'Строить воронки, находить клиентов и выводить услуги на высокий чек.' },
    ],
  },
  program: {
    tag: 'Обучение',
    title: 'Программа обучения',
    subtitle: '12 модулей — от основ до собственной AI-студии под ключ.',
    modules: [
      { num: '01', title: 'Введение в мир AI', lessons: '5 уроков', text: 'Обзор инструментов, настройка рабочего пространства, первые генерации.' },
      { num: '02', title: 'AI-фотография Pro', lessons: '8 уроков', text: 'Midjourney, Flux, промпт-инжиниринг, портреты и предметка.' },
      { num: '03', title: 'AI-видео и анимация', lessons: '7 уроков', text: 'Runway, Kling, подход Sora, монтаж и озвучка.' },
      { num: '04', title: 'Сайты на AI', lessons: '6 уроков', text: 'От идеи до деплоя: премиальные лендинги без кода.' },
      { num: '05', title: 'Реклама и креативы', lessons: '6 уроков', text: 'Performance-креативы, A/B-тесты, тексты, которые конвертят.' },
      { num: '06', title: 'Брендинг и айдентика', lessons: '5 уроков', text: 'Логотипы, гайдлайны, фирменный стиль с помощью AI.' },
      { num: '07', title: 'Автоматизация', lessons: '6 уроков', text: 'Связки инструментов, агенты и рабочие процессы.' },
      { num: '08', title: 'Монетизация и клиенты', lessons: '8 уроков', text: 'Упаковка услуг, воронки, продажи и высокий чек.' },
    ],
  },
  cases: {
    tag: 'Портфолио',
    title: 'Кейсы и примеры работ',
    subtitle: 'Реальные работы студентов и команды AI Creator MK.',
    items: [
      { title: 'Fashion-кампания для бренда одежды', category: 'AI-фото', text: 'Полноценный lookbook без студии и моделей — экономия 80% бюджета.' },
      { title: 'Рекламный ролик для косметики', category: 'AI-видео', text: '30-секундный кинематографический клип, сгенерированный за 2 дня.' },
      { title: 'Лендинг для AI-стартапа', category: 'Веб', text: 'Премиальный сайт под ключ с конверсией 9%.' },
      { title: 'Ребрендинг кофейни', category: 'Брендинг', text: 'Логотип, упаковка и визуальная система полностью на AI.' },
      { title: 'Серия креативов для таргета', category: 'Реклама', text: '50+ вариаций баннеров, CTR вырос в 3 раза.' },
      { title: 'Предметная съёмка для маркетплейса', category: 'AI-фото', text: '200 карточек товаров за неделю вместо месяца.' },
    ],
  },
  pricing: {
    tag: 'Тарифы',
    title: 'Выбери свой формат обучения',
    subtitle: 'Три пакета под разные цели. Самый популярный — PRO.',
    perMonth: '',
    popular: 'Самый популярный',
    plans: [
      {
        id: 'start',
        name: 'START',
        price: '$149',
        tagline: 'Старт в мир AI',
        features: ['Доступ к основному курсу', '40+ уроков в записи', 'Доступ 6 месяцев', 'Сертификат о прохождении'],
        cta: 'Выбрать START',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: '$299',
        tagline: 'Оптимальный выбор',
        features: ['Всё из тарифа START', 'Дополнительные материалы и шаблоны', 'Бесплатные обновления навсегда', 'Поддержка кураторов', 'Доступ к сообществу'],
        cta: 'Выбрать PRO',
      },
      {
        id: 'vip',
        name: 'VIP',
        price: '$599',
        tagline: 'Максимальный результат',
        features: ['Всё из тарифа PRO', 'Личное сопровождение', 'Разбор твоих работ', '3 индивидуальные консультации', 'Помощь с первыми клиентами'],
        cta: 'Выбрать VIP',
      },
    ],
  },
  payment: {
    tag: 'Оплата',
    title: 'Удобная и безопасная оплата',
    subtitle: 'Выбери способ оплаты — мы поддерживаем всё, от карт до криптовалюты.',
    localTitle: 'Для Украины',
    intlTitle: 'Международные платежи',
    cryptoTitle: 'Криптовалюта',
    detected: 'Определён регион',
    payNow: 'Оплатить',
    secure: 'Платежи защищены SSL-шифрованием',
    selectPlan: 'Выбранный тариф',
  },
  reviews: {
    tag: 'Отзывы',
    title: 'Что говорят студенты',
    subtitle: 'Более 2 500 выпускников уже зарабатывают на AI.',
    items: [
      { name: 'Елена К.', role: 'Дизайнер', text: 'За месяц обучения вышла на первых клиентов. AI-фото заказывают даже бренды одежды!' },
      { name: 'Дмитрий Р.', role: 'Предприниматель', text: 'Сократил расходы на маркетинг в 5 раз. Теперь все креативы делаем сами.' },
      { name: 'Марина С.', role: 'Фрилансер', text: 'VIP-тариф окупился с первого заказа. Личное сопровождение — это золото.' },
      { name: 'Артём В.', role: 'Маркетолог', text: 'Лучшая инвестиция в себя за последние годы. Подача материала — премиум.' },
      { name: 'София Л.', role: 'Фотограф', text: 'Думала, AI заменит меня. Вместо этого он сделал меня в 10 раз продуктивнее.' },
      { name: 'Назар П.', role: 'Студент', text: 'Начал с нуля, через 2 месяца — стабильный доход на AI-видео. Спасибо команде!' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Частые вопросы',
    subtitle: 'Всё, что стоит знать перед стартом.',
    items: [
      { q: 'Подойдёт ли курс новичку?', a: 'Да. Мы начинаем с нуля и постепенно доводим до профессионального уровня. Никаких предварительных знаний не нужно.' },
      { q: 'Сколько времени занимает обучение?', a: 'В среднем 6–8 недель в комфортном темпе. Доступ к материалам остаётся с вами надолго.' },
      { q: 'Нужен ли мощный компьютер?', a: 'Нет. Большинство AI-инструментов работают в облаке — достаточно браузера и интернета.' },
      { q: 'Выдаёте ли сертификат?', a: 'Да, после прохождения курса вы получаете именной сертификат AI Creator MK.' },
      { q: 'Как происходит поддержка?', a: 'На тарифах PRO и VIP — поддержка кураторов и доступ к закрытому сообществу. На VIP дополнительно личное сопровождение.' },
      { q: 'Можно ли оплатить частями?', a: 'Да. Доступна рассрочка и оплата частями для украинских и международных клиентов.' },
    ],
  },
  contacts: {
    tag: 'Контакты',
    title: 'Остались вопросы?',
    subtitle: 'Напиши нам — ответим в течение нескольких часов.',
    namePlaceholder: 'Ваше имя',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Ваше сообщение',
    send: 'Отправить',
    or: 'или напишите нам напрямую',
  },
  footer: {
    tagline: 'Учись создавать будущее с помощью искусственного интеллекта.',
    nav: 'Навигация',
    legal: 'Правовое',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    rights: 'Все права защищены.',
  },
  success: {
    title: 'Оплата получена. Доступ к AI Creator MK открыт.',
    text: 'Добро пожаловать в сообщество креаторов! Мы отправили детали доступа на вашу почту. Готовы начать обучение?',
    cta: 'Войти в кабинет',
    back: 'На главную',
  },
  dashboard: {
    greeting: 'Добро пожаловать',
    progress: 'Ваш прогресс',
    continue: 'Продолжить обучение',
    search: 'Поиск уроков, материалов...',
    tabs: {
      modules: 'Модули',
      materials: 'Материалы',
      bonuses: 'Бонусы',
      homework: 'Домашние задания',
      profile: 'Профиль',
    },
    modulesTitle: 'Модули и уроки',
    lessons: 'уроков',
    completed: 'пройдено',
    materialsTitle: 'Материалы для скачивания',
    bonusesTitle: 'Бонусы и подарки',
    homeworkTitle: 'Домашние задания',
    profileTitle: 'Профиль пользователя',
    backToSite: 'На сайт',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ua, en, ru };
