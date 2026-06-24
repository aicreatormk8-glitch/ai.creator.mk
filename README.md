# AI Creator MK — Luxury AI Education Platform

Преміальна AI-освітня платформа на Next.js. Темний графітовий дизайн, бірюзовий
акцент (custom Tiffany-style teal), glassmorphism, живі градієнти, parallax та
м'які мікроанімації. Рівень Apple / Stripe / Vercel / Linear.

## Стек

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — дизайн-система Luxury AI
- **Framer Motion** — анімації, parallax, scroll-reveal
- **i18n** — UA / EN / RU (контекст + словники, з автодетектом мови)
- SEO: metadata, OpenGraph, sitemap, robots, manifest
- Статична генерація → Lighthouse 90+

## Структура

```
app/
  layout.tsx        # шрифти, SEO-метадані, провайдери
  page.tsx          # лендинг (12 секцій)
  success/          # сторінка після оплати
  dashboard/        # особистий кабінет (модулі, прогрес, пошук, профіль)
  links/            # link-in-bio хаб
  sitemap.ts robots.ts manifest.ts
components/
  Navbar, Footer, PaymentModal
  ui/               # Icon, Reveal, AmbientBackground
  sections/         # Hero, About, Audience, Skills, Program, Cases,
                    # Pricing, Payment, Reviews, FAQ, Contacts
lib/
  i18n/             # словники UA/EN/RU + LanguageProvider
  payments.ts       # методи оплати + гео-логіка (UA → локальні першими)
  CheckoutContext   # стан оформлення замовлення
  dashboardData.ts  # дані кабінету
public/hero.jpg     # фон Hero (фото власниці бренду)
legacy/             # попередній статичний прототип (архів)
```

## Оплата

Універсальна система: автовизначення регіону (timezone + мова браузера).

- **Україна:** Monobank, Privat24, WayForPay/Fondy, Apple Pay, Google Pay, Visa/Mastercard
- **Міжнародні:** Stripe, PayPal, Apple Pay, Google Pay, Visa/Mastercard
- **Крипто:** USDT TRC20/ERC20, BTC, ETH (Coinbase Commerce / NowPayments)

Для українських відвідувачів локальні методи показуються першими; для решти —
Stripe/PayPal/international. Усі способи доступні вручну. Після оплати →
`/success` → вхід у кабінет.

> Методи оплати інтегровані на рівні UI. Для продакшену під'єднайте API-ключі
> провайдерів (Stripe / WayForPay / NowPayments) у серверних роутах.

## Розробка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшен-збірка
```

## Деплой на Vercel

Vercel автоматично визначає Next.js. Просто підключіть репозиторій —
жодного додаткового конфігу не потрібно.

## Тарифи

- **START** — основний курс
- **PRO** — курс + матеріали + оновлення + підтримка (найпопулярніший)
- **VIP** — усе + особистий супровід + розбір робіт
