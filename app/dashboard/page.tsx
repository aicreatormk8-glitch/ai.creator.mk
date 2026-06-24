'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Icon, type IconName } from '@/components/ui/Icon';
import {
  MODULES,
  MATERIALS,
  BONUSES,
  HOMEWORK,
} from '@/lib/dashboardData';

type Tab = 'modules' | 'materials' | 'bonuses' | 'homework' | 'profile';

export default function DashboardPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('modules');
  const [query, setQuery] = useState('');

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = MODULES.reduce(
    (a, m) => a + m.lessons.filter((l) => l.done).length,
    0
  );
  const progress = Math.round((doneLessons / totalLessons) * 100);

  const filteredModules = useMemo(() => {
    if (!query.trim()) return MODULES;
    const q = query.toLowerCase();
    return MODULES.map((m) => ({
      ...m,
      lessons: m.lessons.filter(
        (l) => l.title.toLowerCase().includes(q) || m.title.toLowerCase().includes(q)
      ),
    })).filter((m) => m.lessons.length > 0);
  }, [query]);

  const tabs: { id: Tab; label: string; icon: IconName }[] = [
    { id: 'modules', label: t.dashboard.tabs.modules, icon: 'play' },
    { id: 'materials', label: t.dashboard.tabs.materials, icon: 'web' },
    { id: 'bonuses', label: t.dashboard.tabs.bonuses, icon: 'spark' },
    { id: 'homework', label: t.dashboard.tabs.homework, icon: 'check' },
    { id: 'profile', label: t.dashboard.tabs.profile, icon: 'briefcase' },
  ];

  return (
    <div className="relative min-h-[100svh]">
      <AmbientBackground />

      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-300 font-display text-sm font-extrabold text-graphite-950">
              MK
            </span>
            <span className="hidden font-display text-sm font-semibold text-white sm:block">
              AI Creator MK
            </span>
          </Link>

          <div className="relative flex-1 max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              <Icon name="search" size={17} />
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) setTab('modules');
              }}
              placeholder={t.dashboard.search}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-teal-400/50"
            />
          </div>

          <Link
            href="/"
            className="hidden items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white sm:flex"
          >
            <Icon name="arrow" size={15} className="rotate-180" />
            {t.dashboard.backToSite}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:flex">
        {/* sidebar */}
        <aside className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-teal-300 font-display text-lg font-bold text-graphite-950">
                M
              </span>
              <div>
                <p className="text-xs text-white/45">{t.dashboard.greeting}</p>
                <p className="font-display text-sm font-semibold text-white">
                  Maria K.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{t.dashboard.progress}</span>
                <span className="text-teal-300">{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-300"
                />
              </div>
              <p className="mt-2 text-xs text-white/40">
                {doneLessons}/{totalLessons} {t.dashboard.completed}
              </p>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                  tab === tb.id
                    ? 'border border-teal-400/40 bg-teal-400/10 text-white'
                    : 'text-white/55 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={tb.icon} size={18} />
                {tb.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* content */}
        <main className="flex-1">
          {tab === 'modules' && (
            <Section title={t.dashboard.modulesTitle}>
              <div className="space-y-4">
                {filteredModules.map((m) => (
                  <div key={m.id} className="glass rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {m.title}
                      </h3>
                      <span className="text-xs text-white/45">
                        {m.lessons.length} {t.dashboard.lessons}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {m.lessons.map((l) => (
                        <li
                          key={l.id}
                          className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 transition-colors hover:border-teal-400/30"
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                              l.done
                                ? 'bg-teal-400/15 text-teal-300'
                                : 'border border-white/15 text-white/40'
                            }`}
                          >
                            <Icon name={l.done ? 'check' : 'play'} size={13} />
                          </span>
                          <span className="flex-1 text-sm text-white/80">
                            {l.title}
                          </span>
                          <span className="text-xs text-white/35">{l.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {filteredModules.length === 0 && (
                  <p className="text-sm text-white/45">—</p>
                )}
              </div>
            </Section>
          )}

          {tab === 'materials' && (
            <Section title={t.dashboard.materialsTitle}>
              <div className="grid gap-3 sm:grid-cols-2">
                {MATERIALS.map((m) => (
                  <div
                    key={m.id}
                    className="glass glass-hover flex items-center gap-4 rounded-2xl p-4"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-400/10 text-teal-300">
                      <Icon name="web" size={20} />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{m.title}</p>
                      <p className="text-xs text-white/40">
                        {m.type} · {m.size}
                      </p>
                    </div>
                    <button className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-teal-300 transition-colors hover:bg-teal-400/10">
                      <Icon name="arrow" size={16} className="rotate-90" />
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tab === 'bonuses' && (
            <Section title={t.dashboard.bonusesTitle}>
              <div className="grid gap-4 sm:grid-cols-2">
                {BONUSES.map((b) => (
                  <div key={b.id} className="glass glass-hover rounded-3xl p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-teal-400/20 to-transparent text-teal-300">
                      <Icon name="spark" size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/55">{b.text}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tab === 'homework' && (
            <Section title={t.dashboard.homeworkTitle}>
              <div className="space-y-3">
                {HOMEWORK.map((h) => (
                  <div
                    key={h.id}
                    className="glass flex items-center justify-between gap-4 rounded-2xl p-5"
                  >
                    <div>
                      <p className="text-xs text-white/40">{h.module}</p>
                      <p className="mt-0.5 text-sm font-medium text-white">
                        {h.title}
                      </p>
                    </div>
                    <StatusBadge status={h.status} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tab === 'profile' && (
            <Section title={t.dashboard.profileTitle}>
              <div className="glass max-w-xl rounded-3xl p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-teal-300 font-display text-2xl font-bold text-graphite-950">
                    M
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">
                      Maria K.
                    </p>
                    <p className="text-sm text-white/45">maria@example.com</p>
                    <span className="mt-1.5 inline-block rounded-full bg-teal-400/15 px-3 py-0.5 text-xs font-semibold text-teal-300">
                      PRO
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
                  <Stat label={t.dashboard.completed} value={`${doneLessons}`} />
                  <Stat label={t.dashboard.tabs.modules} value={`${MODULES.length}`} />
                  <Stat label="%" value={`${progress}`} />
                </div>
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-5 font-display text-xl font-bold text-white">{title}</h2>
      {children}
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold text-gradient-teal">
        {value}
      </p>
      <p className="mt-1 text-xs text-white/45">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: 'new' | 'review' | 'done' }) {
  const map = {
    new: { label: 'Нове', cls: 'border-white/20 text-white/60' },
    review: { label: 'На перевірці', cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
    done: { label: 'Зараховано', cls: 'border-teal-400/30 bg-teal-400/10 text-teal-300' },
  }[status];
  return (
    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${map.cls}`}>
      {map.label}
    </span>
  );
}
