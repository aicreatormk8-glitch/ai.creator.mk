import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Creator MK',
    short_name: 'AI Creator MK',
    description: 'Преміальна AI-освітня платформа.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b0c',
    theme_color: '#070b0c',
    icons: [{ src: '/hero.jpg', sizes: '512x512', type: 'image/jpeg' }],
  };
}
