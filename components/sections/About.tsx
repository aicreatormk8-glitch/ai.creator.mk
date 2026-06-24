'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal } from '../ui/Reveal';

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="tag-pill">{t.about.tag}</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-gradient sm:text-4xl md:text-[2.75rem]">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-lg font-medium text-teal-200/90">
              {t.about.lead}
            </p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i + 3}>
                <p className="text-base leading-relaxed text-white/60">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <Reveal>
            <div className="glass glass-hover rounded-[2rem] p-8 sm:p-10">
              <div className="grid grid-cols-3 gap-6">
                {t.about.highlights.map((h) => (
                  <div key={h.label} className="text-center">
                    <div className="font-display text-3xl font-extrabold text-gradient-teal sm:text-4xl">
                      {h.value}
                    </div>
                    <div className="mt-2 text-xs leading-snug text-white/50">
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="text-sm leading-relaxed text-white/55">
                <span className="text-teal-300">✦</span>{' '}
                {t.about.lead}
              </p>
            </div>
          </Reveal>
          {/* glow accent */}
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-teal-400/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
