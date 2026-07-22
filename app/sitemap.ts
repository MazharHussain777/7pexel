// app/sitemap.ts
import { MetadataRoute } from "next";

interface Phone {
  slug: string;
  updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/phone-finder`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic phone pages
  let phonePages: MetadataRoute.Sitemap = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/phones?limit=1000`, {
      next: { revalidate: 86400 },
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        phonePages = result.data.map((phone: Phone) => ({
          url: `${baseUrl}/phone-finder/${phone.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching phones for sitemap:', error);
  }

  return [...staticPages, ...phonePages];
}