import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SE Roadmap — Backend software engineering learning path',
    short_name: 'SE Roadmap',
    description:
      'An opinionated, interactive roadmap for learning backend software engineering: foundations, APIs, design patterns, databases, scalability, distributed systems, and operations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0e14',
    theme_color: '#0b0e14',
    categories: ['education', 'productivity', 'developer'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
