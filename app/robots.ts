// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/author',
        '/contact',
        '/privacy',
        '/terms',
        '/compare',
        '/compare?*',
        '/phone-finder',
        '/phone-finder/*',
        '/og-image',
        '/sitemap.xml',
        '/sitemap-compare.xml',
        '/robots.txt',
        '/manifest.json',
        '/favicon.ico',
        '/icon.png',
        '/icon-192.png',
        '/icon-512.png',
        '/apple-touch-icon.png',
        // ✅ ADDED: ALL Technology Pages
        '/technology',
        '/technology/*',
        '/technology/category',
        '/technology/category/*',
        '/technology/[^/]+',  // Individual article pages
        '/api/technology',
        '/api/technology/*',
      ],
      disallow: [
        '/api/',                // API routes (except technology)
        '/admin/',
        '/_next/',
        '/_error',
        '/private/',
        '/draft/',
        '/api/auth/',
        '/api/admin/',
        '/api/technology/articles?*',  // Block filter query strings
      ],
      crawlDelay: 0.1,
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-compare.xml`,
    ],
    host: baseUrl,
  };
}