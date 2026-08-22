// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.7pexel.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/phones',
        '/phones/finder',
        '/phones/finder/*',
        '/phones/reviews',
        '/phones/reviews/*',
        '/compare',
        '/compare/*',
        '/compare/*-vs-*',
        '/guides',
        '/guides/*',
        '/technology',
        '/technology/*',
        '/technology/category/*',
        '/reviews',
        '/reviews/*',
        '/news',
        '/news/*',
        '/collections',
        '/collections/*',
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
        '/api/og/*',
      ],
      disallow: [
        '/api/',
        '/api/auth/',
        '/api/admin/',
        '/api/phones/add',
        '/api/phones/import-all',
        '/admin/',
        '/_next/',
        '/_error',
        '/private/',
        '/draft/',
        '/api/*',
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