'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n/types';
import { Icon } from './ui/Icon';

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#hero', label: t.nav.home },
    { href: '#program', label: t.nav.program },
    { href: '#cases', label: t.nav.cases },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#faq', label: t.nav.faq },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-graphite-950/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="#hero" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-300 font-display text-sm font-extrabold text-graphite-950 shadow-glow">
            MK
          </span>
          <span className="font-display text-[15px] font-semibold tracking-wide text-white">
            AI&nbsp;Creator
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} setLocale={setLocale} />
          <a href="#pricing" className="btn-primary hidden text-sm sm:inline-flex">
            {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-graphite-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`relative rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            locale === l ? 'text-graphite-950' : 'text-white/55 hover:text-white'
          }`}
        >
          {locale === l && (
            <motion.span
              layoutId="lang-active"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-teal-300"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{LOCALE_LABELS[l]}</span>
        </button>
      ))}
    </div>
  );
}
