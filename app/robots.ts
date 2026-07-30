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
        '/compare?*',           // Allow all comparison pages
        '/phone-finder',
        '/phone-finder/*',      // Allow all individual phone pages
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
      ],
      disallow: [
        '/api/',                // API routes
        '/admin/',              // Admin panel
        '/_next/',              // Next.js internal
        '/_error',              // Error pages
        '/private/',            // Private pages
        '/draft/',              // Draft content
        '/phone-finder?*',      // Block filter query strings to avoid duplicate content
        '/compare?*',           // Block comparison query strings (but allow specific comparisons)
      ],
      crawlDelay: 0.1,          // Be gentle on the server
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-compare.xml`,
    ],
    host: baseUrl,
  };
}