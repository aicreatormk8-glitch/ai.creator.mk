'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useCheckout } from '@/lib/CheckoutContext';
import {
  PAYMENT_METHODS,
  detectRegion,
  orderedGroups,
  type Region,
} from '@/lib/payments';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon, type IconName } from '../ui/Icon';

export function Payment() {
  const { t } = useLanguage();
  const { open } = useCheckout();
  const [region, setRegion] = useState<Region>('intl');

  useEffect(() => setRegion(detectRegion()), []);

  const groupTitles: Record<'local' | 'intl' | 'crypto', string> = {
    local: t.payment.localTitle,
    intl: t.payment.intlTitle,
    crypto: t.payment.cryptoTitle,
  };

  return (
    <section id="payment" className="section">
      <SectionHeading
        tag={t.payment.tag}
        title={t.payment.title}
        subtitle={t.payment.subtitle}
      />

      <Reveal>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-1.5 text-xs text-teal-200">
          <Icon name="check" size={13} />
          {t.payment.detected}: {region === 'ua' ? '🇺🇦 Україна' : '🌍 International'}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {orderedGroups(region).map((group, gi) => (
          <Reveal key={group} delay={gi}>
            <div
              className={`glass h-full rounded-3xl p-7 ${
                gi === 0 ? 'border-teal-400/30' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {groupTitles[group]}
                </h3>
                {gi === 0 && (
                  <span className="rounded-full bg-teal-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-300">
                    {region === 'ua' && group === 'local' ? '★' : ''}
                  </span>
                )}
              </div>
              <ul className="mt-5 space-y-2.5">
                {PAYMENT_METHODS.filter((m) => m.group === group).map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/75"
                  >
                    <span className="text-teal-300">
                      <Icon name={m.icon as IconName} size={18} />
                    </span>
                    {m.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={() => {
              const pro = t.pricing.plans.find((p) => p.id === 'pro');
              open({ name: pro?.name ?? 'PRO', price: pro?.price ?? '' });
            }}
            className="btn-primary text-base"
          >
            {t.payment.payNow}
            <Icon name="arrow" size={16} />
          </button>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            <Icon name="lock" size={13} />
            {t.payment.secure}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
