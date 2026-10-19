import type { MetadataRoute } from 'next';

const SITE_URL = 'https://roadmap.wakeuplate.io.vn';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/bookmarks', '/notes'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
