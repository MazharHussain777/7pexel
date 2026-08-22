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
        '/phones/brands',
        '/phones/brands/*',
        '/compare',
        '/compare/*',
        '/compare/*-vs-*',
        '/compare/brands/*',
        '/compare/years/*',
        '/guides',
        '/guides/*',
        '/guides/category/*',
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
        '/*.xml',
        '/*.txt',
        '/*.json',
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