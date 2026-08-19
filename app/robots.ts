// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/phones',
        '/phones/finder',
        '/phones/finder/*',
        '/compare',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/sitemap.xml',
        '/sitemap-compare.xml',
        '/robots.txt',
        '/manifest.json',
        '/favicon.ico',
        '/icon.png',
        '/icon-192.png',
        '/icon-512.png',
        '/apple-touch-icon.png',
        '/images/',
        '/og-image',
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/_error',
        '/private/',
        '/draft/',
        '/api/auth/',
        '/api/admin/',
        '/api/phones/add',
        '/api/phones/import-all',
      ],
      crawlDelay: 0.5,
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-compare.xml`,
    ],
    host: baseUrl,
  };
}