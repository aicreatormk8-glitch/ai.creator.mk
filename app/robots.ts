import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/success'] },
    sitemap: 'https://ai-creator-mk.vercel.app/sitemap.xml',
  };
}
