export interface Lesson {
  id: string;
  title: string;
  duration: string;
  done: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Вступ у світ AI',
    lessons: [
      { id: 'l1', title: 'Як влаштований штучний інтелект', duration: '12 хв', done: true },
      { id: 'l2', title: 'Огляд інструментів 2026', duration: '18 хв', done: true },
      { id: 'l3', title: 'Налаштування робочого простору', duration: '9 хв', done: true },
      { id: 'l4', title: 'Перша генерація', duration: '15 хв', done: false },
      { id: 'l5', title: 'Основи промптингу', duration: '22 хв', done: false },
    ],
  },
  {
    id: 'm2',
    title: 'AI-фотографія Pro',
    lessons: [
      { id: 'l6', title: 'Midjourney з нуля', duration: '24 хв', done: true },
      { id: 'l7', title: 'Flux та реалізм', duration: '19 хв', done: false },
      { id: 'l8', title: 'Портретна зйомка', duration: '27 хв', done: false },
      { id: 'l9', title: 'Предметна фотографія', duration: '21 хв', done: false },
    ],
  },
  {
    id: 'm3',
    title: 'AI-відео та анімація',
    lessons: [
      { id: 'l10', title: 'Runway та Kling', duration: '23 хв', done: false },
      { id: 'l11', title: 'Анімація зображень', duration: '17 хв', done: false },
      { id: 'l12', title: 'Монтаж та озвучення', duration: '29 хв', done: false },
    ],
  },
  {
    id: 'm4',
    title: 'Сайти на AI',
    lessons: [
      { id: 'l13', title: 'Від ідеї до структури', duration: '16 хв', done: false },
      { id: 'l14', title: 'Преміальний лендинг', duration: '31 хв', done: false },
      { id: 'l15', title: 'Деплой на Vercel', duration: '14 хв', done: false },
    ],
  },
];

export interface Material {
  id: string;
  title: string;
  type: string;
  size: string;
}

export const MATERIALS: Material[] = [
  { id: 'mat1', title: 'Бібліотека промптів (500+)', type: 'PDF', size: '2.4 MB' },
  { id: 'mat2', title: 'Шаблони лендингів', type: 'ZIP', size: '18 MB' },
  { id: 'mat3', title: 'Чек-лист запуску послуг', type: 'PDF', size: '0.9 MB' },
  { id: 'mat4', title: 'Пресети для відео', type: 'ZIP', size: '34 MB' },
  { id: 'mat5', title: 'Гайд з ціноутворення', type: 'PDF', size: '1.2 MB' },
];

export interface Bonus {
  id: string;
  title: string;
  text: string;
}

export const BONUSES: Bonus[] = [
  { id: 'b1', title: 'Закрита спільнота', text: 'Доступ до Telegram-чату креаторів та нетворкінгу.' },
  { id: 'b2', title: '3 живі воркшопи', text: 'Щомісячні онлайн-розбори та практика наживо.' },
  { id: 'b3', title: 'Шаблони договорів', text: 'Юридичні шаблони для роботи з клієнтами.' },
  { id: 'b4', title: 'AI-стартер пак', text: 'Готові набори стилів, промптів та референсів.' },
];

export interface Homework {
  id: string;
  module: string;
  title: string;
  status: 'new' | 'review' | 'done';
}

export const HOMEWORK: Homework[] = [
  { id: 'h1', module: 'Модуль 1', title: 'Створи 5 AI-портретів', status: 'done' },
  { id: 'h2', module: 'Модуль 2', title: 'Зніми предметку для бренду', status: 'review' },
  { id: 'h3', module: 'Модуль 3', title: 'Згенеруй 15-сек ролик', status: 'new' },
  { id: 'h4', module: 'Модуль 4', title: 'Збери лендинг на AI', status: 'new' },
];
