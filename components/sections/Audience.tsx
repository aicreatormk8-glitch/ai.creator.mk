'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon, type IconName } from '../ui/Icon';

export function Audience() {
  const { t } = useLanguage();
  return (
    <section id="audience" className="section">
      <SectionHeading
        tag={t.audience.tag}
        title={t.audience.title}
        subtitle={t.audience.subtitle}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.audience.items.map((item, i) => (
          <Reveal key={item.title} delay={i}>
            <article className="glass glass-hover group h-full rounded-3xl p-7">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300 transition-transform duration-500 group-hover:scale-110">
                <Icon name={item.icon as IconName} size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {item.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
