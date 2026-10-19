import type { MetadataRoute } from 'next';
import { CURRICULUM } from '@/lib/curriculum';

const SITE_URL = 'https://roadmap.wakeuplate.io.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = CURRICULUM.map((topic) => ({
    url: `${SITE_URL}/topic/${topic.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...topicRoutes];
}
