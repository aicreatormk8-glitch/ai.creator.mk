'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Icon } from '../ui/Icon';

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yPhoto = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Owner photo — integrated as a living background */}
      <motion.div
        style={{ y: yPhoto, scale: scalePhoto }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/hero.jpg"
          alt="AI Creator MK"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%] sm:object-[75%_25%]"
        />
        {/* graphite gradient grading over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/85 to-graphite-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-graphite-950/60" />
        <div className="absolute inset-0 bg-teal-glow opacity-70" />
      </motion.div>

      {/* turquoise light streams around the photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-1/4 h-[34rem] w-[34rem] rounded-full bg-teal-400/25 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-teal-300/20 blur-[90px] animate-float" />
        <motion.div
          className="absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-teal-400/60 to-transparent"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[34%] top-0 h-full w-px bg-gradient-to-b from-transparent via-teal-300/40 to-transparent"
          animate={{ opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <motion.div
        style={{ y: yContent, opacity }}
        className="mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tag-pill"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-gradient glow-text">AI Creator</span>
            <br />
            <span className="text-gradient-teal">MK</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#pricing" className="btn-primary text-base">
              {t.hero.ctaPrimary}
              <Icon name="arrow" size={18} />
            </a>
            <a href="#program" className="btn-ghost text-base">
              <Icon name="play" size={16} />
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-4"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
                <dd className="font-display text-2xl font-bold text-gradient-teal sm:text-3xl">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs text-white/50">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 rounded-full bg-teal-400" />
        </div>
      </motion.div>
    </section>
  );
}
