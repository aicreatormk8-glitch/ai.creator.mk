import type { MetadataRoute } from 'next';
import { COURSE_SLUGS } from '@/lib/courses';

const BASE = 'https://ai-creator-mk.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const courses: MetadataRoute.Sitemap = COURSE_SLUGS.map((slug) => ({
    url: `${BASE}/courses/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...courses,
    { url: `${BASE}/links`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/dashboard`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/success`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
