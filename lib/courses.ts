import type { Locale } from './i18n/types';
import type { IconName } from '@/components/ui/Icon';

export type CourseFlag = 'hit' | 'new' | 'club' | '';

/** Locale-independent metadata — defined once. */
export interface CourseMeta {
  slug: string;
  num: string;
  flag: CourseFlag;
  price: string;
  oldPrice: string;
  discount: string;
  /** ISO start date used for the countdown on the course page */
  start: string;
  icon: IconName;
  /** tailwind gradient classes for the cover */
  grad: string;
}

export const COURSE_META: CourseMeta[] = [
  {
    slug: 'neuro-zero',
    num: '01',
    flag: 'hit',
    price: '3 499 ₴',
    oldPrice: '6 999 ₴',
    discount: '-50%',
    start: '2026-07-01T10:00:00',
    icon: 'spark',
    grad: 'from-teal-500/30 via-emerald-500/15 to-transparent',
  },
  {
    slug: 'ai-club',
    num: '02',
    flag: 'club',
    price: '490 ₴/міс',
    oldPrice: '1 200 ₴',
    discount: '-59%',
    start: '2026-07-01T10:00:00',
    icon: 'star',
    grad: 'from-cyan-500/25 via-teal-500/15 to-transparent',
  },
  {
    slug: 'ai-product',
    num: '03',
    flag: '',
    price: '390 ₴',
    oldPrice: '2 400 ₴',
    discount: '-84%',
    start: '2026-07-05T10:00:00',
    icon: 'photo',
    grad: 'from-amber-400/20 via-teal-500/10 to-transparent',
  },
  {
    slug: 'ai-human',
    num: '04',
    flag: 'new',
    price: '390 ₴',
    oldPrice: '2 400 ₴',
    discount: '-84%',
    start: '2026-07-08T10:00:00',
    icon: 'camera',
    grad: 'from-teal-400/25 via-cyan-600/10 to-transparent',
  },
  {
    slug: 'ai-content',
    num: '05',
    flag: '',
    price: '390 ₴',
    oldPrice: '2 400 ₴',
    discount: '-84%',
    start: '2026-07-10T10:00:00',
    icon: 'video',
    grad: 'from-emerald-400/20 via-teal-500/10 to-transparent',
  },
  {
    slug: 'ai-photo',
    num: '06',
    flag: '',
    price: '390 ₴',
    oldPrice: '2 400 ₴',
    discount: '-84%',
    start: '2026-06-25T10:00:00',
    icon: 'palette',
    grad: 'from-teal-300/25 via-teal-700/10 to-transparent',
  },
];

export interface CourseText {
  category: string;
  title: string;
  subtitle: string;
  text: string;
  benefits: string[];
  bonusTitle: string;
  bonusItems: string[];
}

const TEXT: Record<Locale, Record<string, CourseText>> = {
  ua: {
    'neuro-zero': {
      category: 'Онлайн-курс',
      title: 'Нейромережі з нуля',
      subtitle: 'Від базових промптів до генерації зображень, відео та текстів. Старт у світ AI з нуля.',
      text: 'Повноцінна система, яка проведе тебе від першого промпту до власних комерційних робіт.',
      benefits: [
        'Усі ключові AI-інструменти 2026 року в одному курсі',
        'Промпт-інжиніринг для фото, відео та текстів',
        'Практика на реальних кейсах із зворотним зв\'язком',
        'Як перетворити навички на стабільний дохід',
      ],
      bonusTitle: 'Бонус: 500 готових промптів',
      bonusItems: ['Різні стилі та образи', 'Для фото, відео й текстів', 'Для соцмереж, брендів і комерції'],
    },
    'ai-club': {
      category: 'Закритий клуб',
      title: 'AI Creator · Клуб',
      subtitle: '500+ промптів, щотижневі дзвінки, щоденні ДЗ і підтримка кураторів 24/7.',
      text: 'Простір, де ти ростеш разом зі спільнотою креаторів і завжди в курсі нових інструментів.',
      benefits: [
        'Щотижневі живі дзвінки та розбори',
        'Закрита спільнота та нетворкінг',
        'Щоденні завдання й підтримка кураторів 24/7',
        'Доступ до всіх оновлень бібліотеки промптів',
      ],
      bonusTitle: 'Бонус учасникам клубу',
      bonusItems: ['Знижки на всі міні-курси', 'Ранній доступ до новинок', 'Особисті розбори робіт'],
    },
    'ai-product': {
      category: 'Міні-курс',
      title: 'AI Предметна зйомка',
      subtitle: 'Як знімати товари через AI: фон, світло, композиція без студії та реквізиту.',
      text: 'Створюй продаючі картки товарів для маркетплейсів і брендів за лічені хвилини.',
      benefits: [
        'Предметка без студії, світла й реквізиту',
        'Робота з фоном, тінями та композицією',
        'Картки товарів для маркетплейсів',
        'Готові пресети та промпти у комплекті',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['100+ промптів для предметки', 'Шаблони карток товарів'],
    },
    'ai-human': {
      category: 'Міні-курс',
      title: 'AI Людина',
      subtitle: 'Генеруємо реалістичних людей для UGC, рілсів, рекламних креативів та власних каналів.',
      text: 'Фотореалістичні персонажі та інфлюенсери, яких неможливо відрізнити від справжніх.',
      benefits: [
        'Реалістичні люди для UGC та рілсів',
        'Власні AI-персонажі та інфлюенсери',
        'Рекламні креативи з людьми',
        'Консистентність обличчя в усіх кадрах',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['Промпти для UGC', 'Гайд зі стабільності персонажа'],
    },
    'ai-content': {
      category: 'Міні-курс',
      title: 'AI Контент з нуля',
      subtitle: 'Навчись створювати зображення, відео, озвучку та музику через AI, навіть якщо ніколи не працював з нейронками.',
      text: 'Повний контент-цикл на AI: від ідеї до готового ролика з музикою й озвученням.',
      benefits: [
        'Зображення, відео, озвучка й музика на AI',
        'Контент-плани та сценарії за допомогою AI',
        'Монтаж і публікація у соцмережах',
        'Системний підхід навіть для новачків',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['Набір пресетів для відео', 'Банк ідей для контенту'],
    },
    'ai-photo': {
      category: 'Міні-курс',
      title: 'AI Фотосесія',
      subtitle: 'Власна fashion-зйомка без камери, моделі та локацій — повністю через нейромережі.',
      text: 'Реалістичні AI-фотосесії з собою або іншими людьми в будь-якому образі та локації.',
      benefits: [
        'Без витрат на фотографа, студію та світло',
        'Без мейкапів, зачісок та стилістів',
        'У будь-якому образі та в будь-якій локації',
        'Фото для соцмереж, брендів і комерції',
      ],
      bonusTitle: 'Бонус: 500 промптів для AI-фотосесій',
      bonusItems: ['Різні стилі та образи', 'Окремо для жінок, чоловіків і пар', 'Різні ракурси, пози та подача'],
    },
  },
  en: {
    'neuro-zero': {
      category: 'Online course',
      title: 'Neural networks from scratch',
      subtitle: 'From basic prompts to generating images, video and text. Your start into AI from zero.',
      text: 'A complete system that takes you from your first prompt to your own commercial work.',
      benefits: [
        'All key AI tools of 2026 in one course',
        'Prompt engineering for photo, video and text',
        'Practice on real cases with feedback',
        'How to turn skills into steady income',
      ],
      bonusTitle: 'Bonus: 500 ready prompts',
      bonusItems: ['Different styles and looks', 'For photo, video and text', 'For social, brands and commerce'],
    },
    'ai-club': {
      category: 'Private club',
      title: 'AI Creator · Club',
      subtitle: '500+ prompts, weekly calls, daily tasks and mentor support 24/7.',
      text: 'A space where you grow with a community of creators and always stay ahead of new tools.',
      benefits: [
        'Weekly live calls and reviews',
        'Private community and networking',
        'Daily tasks and 24/7 mentor support',
        'Access to all prompt-library updates',
      ],
      bonusTitle: 'Member bonus',
      bonusItems: ['Discounts on all mini-courses', 'Early access to new releases', 'Personal work reviews'],
    },
    'ai-product': {
      category: 'Mini-course',
      title: 'AI Product photography',
      subtitle: 'Shoot products with AI: background, light, composition — no studio or props.',
      text: 'Create selling product cards for marketplaces and brands in minutes.',
      benefits: [
        'Product shots with no studio, light or props',
        'Work with background, shadows and composition',
        'Product cards for marketplaces',
        'Ready presets and prompts included',
      ],
      bonusTitle: 'Bonus',
      bonusItems: ['100+ product prompts', 'Product card templates'],
    },
    'ai-human': {
      category: 'Mini-course',
      title: 'AI Human',
      subtitle: 'Generate realistic people for UGC, reels, ad creatives and your own channels.',
      text: 'Photorealistic characters and influencers indistinguishable from real ones.',
      benefits: [
        'Realistic people for UGC and reels',
        'Your own AI characters and influencers',
        'Ad creatives featuring people',
        'Consistent faces across every shot',
      ],
      bonusTitle: 'Bonus',
      bonusItems: ['UGC prompts', 'Character consistency guide'],
    },
    'ai-content': {
      category: 'Mini-course',
      title: 'AI Content from scratch',
      subtitle: 'Learn to create images, video, voiceover and music with AI — even if you never touched neural nets.',
      text: 'A full content cycle on AI: from idea to a finished clip with music and voiceover.',
      benefits: [
        'Images, video, voiceover and music with AI',
        'Content plans and scripts with AI',
        'Editing and publishing to social',
        'A systematic approach even for beginners',
      ],
      bonusTitle: 'Bonus',
      bonusItems: ['Video preset pack', 'Content idea bank'],
    },
    'ai-photo': {
      category: 'Mini-course',
      title: 'AI Photoshoot',
      subtitle: 'Your own fashion shoot with no camera, model or location — fully with neural networks.',
      text: 'Realistic AI photoshoots with yourself or others, in any look and any location.',
      benefits: [
        'No spend on photographer, studio or light',
        'No makeup, hair or stylists',
        'In any look and any location',
        'Photos for social, brands and commerce',
      ],
      bonusTitle: 'Bonus: 500 prompts for AI photoshoots',
      bonusItems: ['Different styles and looks', 'Separate for women, men and couples', 'Different angles, poses and delivery'],
    },
  },
  ru: {
    'neuro-zero': {
      category: 'Онлайн-курс',
      title: 'Нейросети с нуля',
      subtitle: 'От базовых промптов до генерации изображений, видео и текстов. Старт в мир AI с нуля.',
      text: 'Полноценная система, которая проведёт тебя от первого промпта до собственных коммерческих работ.',
      benefits: [
        'Все ключевые AI-инструменты 2026 года в одном курсе',
        'Промпт-инжиниринг для фото, видео и текстов',
        'Практика на реальных кейсах с обратной связью',
        'Как превратить навыки в стабильный доход',
      ],
      bonusTitle: 'Бонус: 500 готовых промптов',
      bonusItems: ['Разные стили и образы', 'Для фото, видео и текстов', 'Для соцсетей, брендов и коммерции'],
    },
    'ai-club': {
      category: 'Закрытый клуб',
      title: 'AI Creator · Клуб',
      subtitle: '500+ промптов, еженедельные созвоны, ежедневные ДЗ и поддержка кураторов 24/7.',
      text: 'Пространство, где ты растёшь вместе с сообществом креаторов и всегда в курсе новых инструментов.',
      benefits: [
        'Еженедельные живые созвоны и разборы',
        'Закрытое сообщество и нетворкинг',
        'Ежедневные задания и поддержка 24/7',
        'Доступ ко всем обновлениям библиотеки промптов',
      ],
      bonusTitle: 'Бонус участникам клуба',
      bonusItems: ['Скидки на все мини-курсы', 'Ранний доступ к новинкам', 'Личные разборы работ'],
    },
    'ai-product': {
      category: 'Мини-курс',
      title: 'AI Предметная съёмка',
      subtitle: 'Как снимать товары через AI: фон, свет, композиция без студии и реквизита.',
      text: 'Создавай продающие карточки товаров для маркетплейсов и брендов за считанные минуты.',
      benefits: [
        'Предметка без студии, света и реквизита',
        'Работа с фоном, тенями и композицией',
        'Карточки товаров для маркетплейсов',
        'Готовые пресеты и промпты в комплекте',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['100+ промптов для предметки', 'Шаблоны карточек товаров'],
    },
    'ai-human': {
      category: 'Мини-курс',
      title: 'AI Человек',
      subtitle: 'Генерируем реалистичных людей для UGC, рилсов, рекламных креативов и своих каналов.',
      text: 'Фотореалистичные персонажи и инфлюенсеры, которых не отличить от настоящих.',
      benefits: [
        'Реалистичные люди для UGC и рилсов',
        'Собственные AI-персонажи и инфлюенсеры',
        'Рекламные креативы с людьми',
        'Консистентность лица во всех кадрах',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['Промпты для UGC', 'Гайд по стабильности персонажа'],
    },
    'ai-content': {
      category: 'Мини-курс',
      title: 'AI Контент с нуля',
      subtitle: 'Научись создавать изображения, видео, озвучку и музыку через AI, даже если никогда не работал с нейронками.',
      text: 'Полный контент-цикл на AI: от идеи до готового ролика с музыкой и озвучкой.',
      benefits: [
        'Изображения, видео, озвучка и музыка на AI',
        'Контент-планы и сценарии с помощью AI',
        'Монтаж и публикация в соцсетях',
        'Системный подход даже для новичков',
      ],
      bonusTitle: 'Бонус',
      bonusItems: ['Набор пресетов для видео', 'Банк идей для контента'],
    },
    'ai-photo': {
      category: 'Мини-курс',
      title: 'AI Фотосессия',
      subtitle: 'Собственная fashion-съёмка без камеры, модели и локаций — полностью через нейросети.',
      text: 'Реалистичные AI-фотосессии с собой или другими людьми в любом образе и локации.',
      benefits: [
        'Без затрат на фотографа, студию и свет',
        'Без макияжа, причёсок и стилистов',
        'В любом образе и в любой локации',
        'Фото для соцсетей, брендов и коммерции',
      ],
      bonusTitle: 'Бонус: 500 промптов для AI-фотосессий',
      bonusItems: ['Разные стили и образы', 'Отдельно для женщин, мужчин и пар', 'Разные ракурсы, позы и подача'],
    },
  },
};

export interface Course extends CourseMeta, CourseText {}

export function getCourses(locale: Locale): Course[] {
  return COURSE_META.map((m) => ({ ...m, ...TEXT[locale][m.slug] }));
}

export function getCourse(locale: Locale, slug: string): Course | undefined {
  const meta = COURSE_META.find((m) => m.slug === slug);
  if (!meta) return undefined;
  return { ...meta, ...TEXT[locale][slug] };
}

export const COURSE_SLUGS = COURSE_META.map((m) => m.slug);
