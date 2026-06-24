'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <SectionHeading
        tag={t.faq.tag}
        title={t.faq.title}
        subtitle={t.faq.subtitle}
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i % 4}>
              <div
                className={`glass overflow-hidden rounded-2xl transition-colors ${
                  isOpen ? 'border-teal-400/30' : ''
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium text-white">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-teal-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-teal-400/15' : ''
                    }`}
                  >
                    <Icon name="plus" size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-white/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
