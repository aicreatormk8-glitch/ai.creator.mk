'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { dictionaries, type Dictionary } from './dictionaries';
import type { Locale } from './types';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'aicmk-locale';

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'ua';
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('uk')) return 'ua';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ua');

  useEffect(() => {
    const stored =
      (typeof window !== 'undefined' &&
        (localStorage.getItem(STORAGE_KEY) as Locale | null)) ||
      null;
    const next = stored ?? detectLocale();
    setLocaleState(next);
    document.documentElement.lang = next === 'ua' ? 'uk' : next;
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === 'ua' ? 'uk' : l;
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
