'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Icon, type IconName } from '@/components/ui/Icon';

interface LinkItem {
  label: string;
  href: string;
  icon: IconName;
  primary?: boolean;
  external?: boolean;
}

const LINKS: LinkItem[] = [
  { label: 'Почати навчання', href: '/#pricing', icon: 'rocket', primary: true },
  { label: 'Програма курсу', href: '/#program', icon: 'play' },
  { label: 'Безкоштовний урок', href: '/#about', icon: 'spark' },
  { label: 'Кейси та роботи', href: '/#cases', icon: 'photo' },
  { label: 'Тарифи та оплата', href: '/#pricing', icon: 'money' },
  { label: 'Відгуки студентів', href: '/#reviews', icon: 'star' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'camera', external: true },
  { label: 'Telegram-канал', href: 'https://t.me', icon: 'arrow', external: true },
];

export default function LinksPage() {
  const { t } = useLanguage();

  return (
    <main className="relative grid min-h-[100svh] place-items-center px-5 py-16">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* avatar / brand */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-teal-400/40 shadow-glow">
            <Image
              src="/hero.jpg"
              alt="AI Creator MK"
              fill
              sizes="96px"
              className="object-cover object-[70%_25%]"
            />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-gradient">
            AI Creator MK
          </h1>
          <p className="mt-1.5 max-w-xs text-sm text-white/55">
            {t.hero.subtitle}
          </p>
        </div>

        {/* links */}
        <div className="mt-8 space-y-3">
          {LINKS.map((l, i) => {
            const inner = (
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium transition-colors ${
                  l.primary
                    ? 'border-transparent bg-gradient-to-r from-teal-400 to-teal-300 text-graphite-950 shadow-glow'
                    : 'glass glass-hover text-white'
                }`}
              >
                <Icon name={l.icon} size={18} />
                <span className="flex-1">{l.label}</span>
                <Icon name="arrow" size={15} className={l.primary ? '' : 'text-teal-300'} />
              </motion.span>
            );
            return (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
              >
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link href={l.href}>{inner}</Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/35">
          © {new Date().getFullYear()} AI Creator MK
        </p>
      </motion.div>
    </main>
  );
}
