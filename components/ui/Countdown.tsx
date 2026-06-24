'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

/** Live countdown to a target ISO date. Falls back to a rolling window
 *  so the timer always shows urgency even after the date passes. */
export function Countdown({ target }: { target: string }) {
  const { t } = useLanguage();
  const [parts, setParts] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      let diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        // rolling 48h window once the date has passed
        const window = 48 * 3600 * 1000;
        diff = window - (Math.abs(diff) % window);
      }
      const totalH = Math.floor(diff / 3600000);
      setParts({
        h: totalH,
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: parts.h, l: t.courses.timer.hours },
    { v: parts.m, l: t.courses.timer.minutes },
    { v: parts.s, l: t.courses.timer.seconds },
  ];

  return (
    <div className="flex items-stretch gap-3">
      {cells.map((c, i) => (
        <div key={i} className="flex items-stretch gap-3">
          <div className="glass min-w-[68px] rounded-2xl px-3 py-3 text-center">
            <div className="font-display text-3xl font-extrabold tabular-nums text-gradient-teal">
              {String(c.v).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-white/45">
              {c.l}
            </div>
          </div>
          {i < cells.length - 1 && (
            <span className="self-center font-display text-2xl text-teal-400/40">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
