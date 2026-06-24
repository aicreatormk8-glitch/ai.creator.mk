'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const nav = [
    { href: '#program', label: t.nav.program },
    { href: '#cases', label: t.nav.cases },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <footer className="relative mt-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-300 font-display text-sm font-extrabold text-graphite-950">
                MK
              </span>
              <span className="font-display text-base font-semibold text-white">
                AI Creator MK
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.footer.nav}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-white/60 transition-colors hover:text-teal-300"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.footer.legal}
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/links" className="text-sm text-white/60 transition-colors hover:text-teal-300">
                  Links
                </Link>
              </li>
              <li>
                <span className="text-sm text-white/60">{t.footer.privacy}</span>
              </li>
              <li>
                <span className="text-sm text-white/60">{t.footer.terms}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} AI Creator MK. {t.footer.rights}
          </p>
          <p className="text-xs text-white/30">Made with AI · Luxury AI design</p>
        </div>
      </div>
    </footer>
  );
}
