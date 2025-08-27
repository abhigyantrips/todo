import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TaskMaster 5000 (Lite)',
    short_name: 'Tasks',
    description: 'A lightweight task management tool.',
    lang: 'en',
    start_url: '/',
    orientation: 'portrait',
    display: 'standalone',
    theme_color: '#ea596e',
    background_color: '#ffcc4d',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
