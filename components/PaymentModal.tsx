'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useCheckout } from '@/lib/CheckoutContext';
import {
  PAYMENT_METHODS,
  detectRegion,
  orderedGroups,
  type Region,
} from '@/lib/payments';
import { Icon, type IconName } from './ui/Icon';

export function PaymentModal() {
  const { t } = useLanguage();
  const { item, close } = useCheckout();
  const router = useRouter();
  const [region, setRegion] = useState<Region>('intl');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setRegion(detectRegion());
      setSelected(null);
    }
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, close]);

  const groupTitles: Record<'local' | 'intl' | 'crypto', string> = {
    local: t.payment.localTitle,
    intl: t.payment.intlTitle,
    crypto: t.payment.cryptoTitle,
  };

  const handlePay = () => {
    close();
    router.push(
      `/success?item=${encodeURIComponent(item?.name ?? '')}&method=${selected}`
    );
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[100] grid place-items-center bg-graphite-950/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 sm:p-8"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <Icon name="close" size={18} />
            </button>

            <span className="tag-pill">{t.payment.tag}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              {t.payment.selectPlan}: {item.name}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-gradient-teal">
                {item.price}
              </span>
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">
              <Icon name="check" size={13} />
              {t.payment.detected}: {region === 'ua' ? '🇺🇦 Україна' : '🌍 International'}
            </div>

            <div className="mt-6 space-y-5">
              {orderedGroups(region).map((group) => (
                <div key={group}>
                  <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                    {groupTitles[group]}
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PAYMENT_METHODS.filter((m) => m.group === group).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelected(m.id)}
                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm transition-all ${
                          selected === m.id
                            ? 'border-teal-400/60 bg-teal-400/10 text-white'
                            : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25'
                        }`}
                      >
                        <span className="text-teal-300">
                          <Icon name={m.icon as IconName} size={18} />
                        </span>
                        <span className="truncate">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePay}
              disabled={!selected}
              className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.payment.payNow} {item.price}
              <Icon name="arrow" size={16} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/40">
              <Icon name="lock" size={13} />
              {t.payment.secure}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
