'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';

export function Program() {
  const { t } = useLanguage();
  return (
    <section id="program" className="section">
      <SectionHeading
        tag={t.program.tag}
        title={t.program.title}
        subtitle={t.program.subtitle}
      />
      <div className="relative mt-16">
        {/* center line */}
        <div className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-teal-400/60 via-white/10 to-transparent md:left-1/2" />
        <div className="space-y-6">
          {t.program.modules.map((m, i) => (
            <Reveal key={m.num} delay={i % 3}>
              <div
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* node */}
                <div className="absolute left-[18px] z-10 grid h-5 w-5 place-items-center rounded-full bg-graphite-950 md:left-1/2 md:-translate-x-1/2">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400 shadow-glow" />
                </div>

                <div className="md:w-1/2" />
                <div className="pl-14 md:w-1/2 md:px-8">
                  <article className="glass glass-hover rounded-3xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-extrabold text-teal-400/40">
                        {m.num}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-0.5 text-[11px] text-white/50">
                        {m.lessons}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {m.text}
                    </p>
                  </article>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
