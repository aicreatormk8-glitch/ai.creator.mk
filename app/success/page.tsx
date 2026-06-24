'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Icon } from '@/components/ui/Icon';

export default function SuccessPage() {
  const { t } = useLanguage();

  return (
    <main className="relative grid min-h-[100svh] place-items-center px-5 py-24">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass relative w-full max-w-xl rounded-[2.5rem] p-10 text-center sm:p-14"
      >
        <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-teal-400/10 blur-3xl" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-teal-300 text-graphite-950 shadow-glow-lg"
        >
          <Icon name="check" size={40} strokeWidth={2.5} />
        </motion.div>

        <h1 className="mt-8 font-display text-2xl font-bold leading-tight text-gradient sm:text-3xl">
          {t.success.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
          {t.success.text}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/dashboard" className="btn-primary w-full sm:w-auto">
            {t.success.cta}
            <Icon name="arrow" size={16} />
          </Link>
          <Link href="/" className="btn-ghost w-full sm:w-auto">
            {t.success.back}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
