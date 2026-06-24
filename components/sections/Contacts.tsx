'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', handle: '@aicreator.mk' },
  { label: 'Telegram', href: 'https://t.me', handle: '@aicreatormk' },
  { label: 'Email', href: 'mailto:hello@aicreatormk.com', handle: 'hello@aicreatormk.com' },
];

export function Contacts() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className="section">
      <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              tag={t.contacts.tag}
              title={t.contacts.title}
              subtitle={t.contacts.subtitle}
              centered={false}
            />
            <div className="mt-8 space-y-3">
              <p className="text-sm text-white/45">{t.contacts.or}</p>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 transition-all"
                >
                  <span className="text-sm font-medium text-white">{s.label}</span>
                  <span className="flex items-center gap-2 text-sm text-teal-300">
                    {s.handle}
                    <Icon name="arrow" size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <input
                required
                placeholder={t.contacts.namePlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-teal-400/50"
              />
              <input
                required
                type="email"
                placeholder={t.contacts.emailPlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-teal-400/50"
              />
              <textarea
                required
                rows={4}
                placeholder={t.contacts.messagePlaceholder}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-teal-400/50"
              />
              <button type="submit" className="btn-primary w-full" disabled={sent}>
                {sent ? '✓' : t.contacts.send}
                {!sent && <Icon name="arrow" size={16} />}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
