'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

// subtle gradient accents per card
const GRADS = [
  'from-teal-500/25 to-emerald-500/10',
  'from-cyan-500/20 to-teal-500/10',
  'from-teal-400/25 to-teal-700/10',
  'from-emerald-400/20 to-teal-500/10',
  'from-teal-300/20 to-cyan-600/10',
  'from-teal-500/20 to-emerald-400/10',
];

export function Cases() {
  const { t } = useLanguage();
  return (
    <section id="cases" className="section">
      <SectionHeading
        tag={t.cases.tag}
        title={t.cases.title}
        subtitle={t.cases.subtitle}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.cases.items.map((c, i) => (
          <Reveal key={c.title} delay={i % 3}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="glass group relative h-full overflow-hidden rounded-3xl"
            >
              <div
                className={`relative h-44 overflow-hidden bg-gradient-to-br ${
                  GRADS[i % GRADS.length]
                }`}
              >
                <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 grid place-items-center">
                  <Icon
                    name="spark"
                    size={56}
                    className="text-white/15 transition-transform duration-700 group-hover:scale-125 group-hover:text-white/25"
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-graphite-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-teal-200 backdrop-blur-md">
                  {c.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {c.text}
                </p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
