'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { CheckoutProvider, useCheckout } from '@/lib/CheckoutContext';
import { getCourse } from '@/lib/courses';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/types';
import { AmbientBackground } from './ui/AmbientBackground';
import { Countdown } from './ui/Countdown';
import { PaymentModal } from './PaymentModal';
import { Icon } from './ui/Icon';

export function CourseDetail({ slug }: { slug: string }) {
  return (
    <CheckoutProvider>
      <Inner slug={slug} />
      <PaymentModal />
    </CheckoutProvider>
  );
}

function Inner({ slug }: { slug: string }) {
  const { t, locale, setLocale } = useLanguage();
  const { open } = useCheckout();
  const course = getCourse(locale, slug);

  if (!course) return notFound();

  const flagLabel =
    course.flag === 'hit'
      ? t.courses.flags.hit
      : course.flag === 'new'
        ? t.courses.flags.new
        : course.flag === 'club'
          ? t.courses.flags.club
          : null;

  const buy = () => open({ name: course.title, price: course.price });

  return (
    <div className="relative min-h-[100svh] pb-28 lg:pb-0">
      <AmbientBackground />

      {/* compact header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/#courses"
            className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
          >
            <Icon name="arrow" size={16} className="rotate-180" />
            {t.courses.backToCourses}
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 font-display text-xs font-extrabold text-graphite-950">
              MK
            </span>
          </Link>
          <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                  locale === l
                    ? 'bg-teal-400 text-graphite-950'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        {/* hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-bold text-teal-400/50">
              № {course.num}
            </span>
            {flagLabel && (
              <span
                className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  course.flag === 'hit'
                    ? 'bg-gradient-to-r from-teal-400 to-teal-300 text-graphite-950'
                    : 'border border-teal-400/40 bg-teal-400/10 text-teal-300'
                }`}
              >
                {flagLabel}
              </span>
            )}
            <span className="text-xs uppercase tracking-wider text-white/45">
              {course.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-gradient glow-text sm:text-5xl md:text-6xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {course.subtitle}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* left: benefits + bonus */}
          <div className="space-y-8">
            <div className="glass rounded-3xl p-7">
              <h2 className="font-display text-xl font-bold text-white">
                {t.courses.benefitsTitle}
              </h2>
              <p className="mt-2 text-sm text-white/55">{course.text}</p>
              <ul className="mt-5 space-y-3.5">
                {course.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-400/15 text-teal-300">
                      <Icon name="check" size={12} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass relative overflow-hidden rounded-3xl border-teal-400/30 p-7">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/15 blur-3xl" />
              <span className="tag-pill">
                <Icon name="spark" size={13} />
                {t.courses.bonusTag}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {course.bonusTitle}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {course.bonusItems.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right: sticky purchase card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass rounded-3xl p-7">
              <p className="text-xs uppercase tracking-wider text-white/45">
                {t.courses.startLabel}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-teal-200">
                {new Date(course.start).toLocaleDateString(
                  locale === 'en' ? 'en-GB' : locale === 'ru' ? 'ru-RU' : 'uk-UA',
                  { day: 'numeric', month: 'long' }
                )}
              </p>

              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-wider text-white/45">
                  {t.courses.timerTitle}
                </p>
                <Countdown target={course.start} />
              </div>

              <div className="mt-7 flex items-baseline gap-3">
                <span className="font-display text-4xl font-extrabold text-gradient-teal">
                  {course.price}
                </span>
                <span className="text-base text-white/35 line-through">
                  {course.oldPrice}
                </span>
              </div>
              <span className="mt-2 inline-block rounded-md bg-teal-400/15 px-2.5 py-1 text-sm font-bold text-teal-300">
                {course.discount}
              </span>

              <button onClick={buy} className="btn-primary mt-6 w-full text-base">
                {t.courses.joinCta} {course.discount}
                <Icon name="arrow" size={16} />
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
                <Icon name="lock" size={12} />
                {t.payment.secure}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-graphite-950/85 p-3 backdrop-blur-xl lg:hidden">
        <button onClick={buy} className="btn-primary w-full">
          {t.courses.joinCta} · {course.price} {course.discount}
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}
