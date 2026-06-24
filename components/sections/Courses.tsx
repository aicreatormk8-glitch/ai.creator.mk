'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { getCourses, type CourseFlag } from '@/lib/courses';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function Courses() {
  const { t, locale } = useLanguage();
  const courses = getCourses(locale);

  const flagLabel = (flag: CourseFlag) =>
    flag === 'hit'
      ? t.courses.flags.hit
      : flag === 'new'
        ? t.courses.flags.new
        : flag === 'club'
          ? t.courses.flags.club
          : null;

  return (
    <section id="courses" className="section">
      <SectionHeading
        tag={t.courses.tag}
        title={t.courses.title}
        subtitle={t.courses.subtitle}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {courses.map((c, i) => {
          const label = flagLabel(c.flag);
          return (
            <Reveal key={c.slug} delay={i % 2}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass group relative flex h-full flex-col overflow-hidden rounded-[2rem] sm:flex-row"
              >
                {/* cover */}
                <div
                  className={`relative h-44 shrink-0 overflow-hidden bg-gradient-to-br sm:h-auto sm:w-44 ${c.grad}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Icon
                      name={c.icon}
                      size={48}
                      className="text-white/25 transition-transform duration-700 group-hover:scale-125"
                    />
                  </div>
                  <span className="absolute left-3 top-3 font-display text-xs font-bold text-white/40">
                    № {c.num}
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {label && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          c.flag === 'hit'
                            ? 'bg-gradient-to-r from-teal-400 to-teal-300 text-graphite-950'
                            : 'border border-teal-400/40 bg-teal-400/10 text-teal-300'
                        }`}
                      >
                        {label}
                      </span>
                    )}
                    <span className="text-[11px] uppercase tracking-wider text-white/40">
                      {c.category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {c.subtitle}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl font-extrabold text-gradient-teal">
                          {c.price}
                        </span>
                        <span className="text-sm text-white/35 line-through">
                          {c.oldPrice}
                        </span>
                      </div>
                      <span className="mt-1 inline-block rounded-md bg-teal-400/15 px-2 py-0.5 text-xs font-bold text-teal-300">
                        {c.discount}
                      </span>
                    </div>
                    <Link
                      href={`/courses/${c.slug}`}
                      className="btn-primary shrink-0 px-5 py-3 text-sm"
                    >
                      {t.courses.detailsCta}
                      <Icon name="arrow" size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
