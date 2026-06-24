'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon, type IconName } from '../ui/Icon';

const ICONS: IconName[] = ['photo', 'video', 'web', 'ad', 'brand', 'money'];

export function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="section">
      <SectionHeading
        tag={t.skills.tag}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {t.skills.items.map((item, i) => (
          <Reveal key={item.title} delay={i}>
            <article className="glass glass-hover group relative h-full overflow-hidden rounded-3xl p-7">
              <div className="absolute right-0 top-0 h-28 w-28 -translate-y-10 translate-x-10 rounded-full bg-teal-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-teal-400/20 to-transparent text-teal-300">
                  <Icon name={ICONS[i % ICONS.length]} size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {item.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
