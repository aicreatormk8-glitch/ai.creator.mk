'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function Reviews() {
  const { t } = useLanguage();
  return (
    <section id="reviews" className="section">
      <SectionHeading
        tag={t.reviews.tag}
        title={t.reviews.title}
        subtitle={t.reviews.subtitle}
      />
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {t.reviews.items.map((r, i) => (
          <Reveal key={r.name} delay={i % 3}>
            <figure className="glass glass-hover mb-5 break-inside-avoid rounded-3xl p-6">
              <div className="mb-3 flex gap-1 text-teal-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" size={15} fill="currentColor" stroke="none" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-white/70">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-teal-300 font-display text-sm font-bold text-graphite-950">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {r.name}
                  </span>
                  <span className="block text-xs text-white/45">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
