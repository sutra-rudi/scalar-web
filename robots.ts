import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap:
      'https://scalar-web.vercel.app/hr/sitemap.xml' ||
      'https://scalar-web.vercel.app/eng/sitemap.xml' ||
      'https://scalar-web.vercel.app/ger/sitemap.xml' ||
      'https://scalar-web.vercel.app/ita/sitemap.xml',
  };
}
