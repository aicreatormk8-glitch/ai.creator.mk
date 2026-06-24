'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useCheckout } from '@/lib/CheckoutContext';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function Pricing() {
  const { t } = useLanguage();
  const { open } = useCheckout();

  return (
    <section id="pricing" className="section">
      <SectionHeading
        tag={t.pricing.tag}
        title={t.pricing.title}
        subtitle={t.pricing.subtitle}
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {t.pricing.plans.map((plan, i) => {
          const popular = plan.id === 'pro';
          return (
            <Reveal key={plan.id} delay={i}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`glass relative flex h-full flex-col rounded-[2rem] p-8 ${
                  popular
                    ? 'border-teal-400/40 shadow-glow-lg lg:scale-[1.04]'
                    : ''
                }`}
              >
                {popular && (
                  <>
                    <div className="absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-b from-teal-400/40 to-transparent opacity-60 blur-sm" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 px-4 py-1 text-xs font-bold uppercase tracking-wider text-graphite-950 shadow-glow">
                      {t.pricing.popular}
                    </span>
                  </>
                )}

                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-400/15 text-teal-300">
                        <Icon name="check" size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => open(plan.id)}
                  className={`mt-8 w-full ${popular ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
