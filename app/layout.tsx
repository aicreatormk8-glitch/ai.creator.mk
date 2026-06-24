import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const SITE_URL = 'https://ai-creator-mk.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI Creator MK — Преміальна AI-освітня платформа',
    template: '%s · AI Creator MK',
  },
  description:
    'Навчись створювати AI-фото, AI-відео, сайти, рекламу та заробляти на штучному інтелекті. Преміальна освітня платформа AI Creator MK.',
  keywords: [
    'AI Creator MK',
    'навчання штучний інтелект',
    'AI фото',
    'AI відео',
    'нейромережі курс',
    'заробіток на AI',
    'AI школа',
    'Midjourney курс',
  ],
  authors: [{ name: 'AI Creator MK' }],
  openGraph: {
    type: 'website',
    title: 'AI Creator MK — Преміальна AI-освітня платформа',
    description:
      'Навчись створювати AI-фото, AI-відео, сайти, рекламу та заробляти на штучному інтелекті.',
    url: SITE_URL,
    siteName: 'AI Creator MK',
    images: [{ url: '/hero.jpg', width: 921, height: 1280, alt: 'AI Creator MK' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Creator MK',
    description: 'Преміальна AI-освітня платформа.',
    images: ['/hero.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: '#070b0c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
