// app/sitemap.ts
import { MetadataRoute } from "next";
import { supabaseServer, isSupabaseAvailable } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date();

  // ============ STATIC PAGES ============
  const staticPages: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: currentDate, 
      changeFrequency: 'daily' as const, 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/phones`, 
      lastModified: currentDate, 
      changeFrequency: 'daily' as const, 
      priority: 0.98 
    },
    { 
      url: `${baseUrl}/phones/finder`, 
      lastModified: currentDate, 
      changeFrequency: 'daily' as const, 
      priority: 0.95 
    },
    { 
      url: `${baseUrl}/phones/finder/apple-iphone-16-pro-max`, 
      lastModified: currentDate, 
      changeFrequency: 'weekly' as const, 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/compare`, 
      lastModified: currentDate, 
      changeFrequency: 'weekly' as const, 
      priority: 0.85 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const, 
      priority: 0.6 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const, 
      priority: 0.6 
    },
    { 
      url: `${baseUrl}/privacy`, 
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const, 
      priority: 0.5 
    },
    { 
      url: `${baseUrl}/terms`, 
      lastModified: currentDate, 
      changeFrequency: 'monthly' as const, 
      priority: 0.5 
    },
  ];

  // ============ PHONE PAGES (DYNAMIC) ============
  let phonePages: MetadataRoute.Sitemap = [];
  
  if (isSupabaseAvailable && supabaseServer) {
    try {
      const { data: phones, error } = await supabaseServer
        .from('phones')
        .select('slug, updated_at, brand, model')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && phones) {
        phonePages = phones.map((phone: any) => ({
          url: `${baseUrl}/phones/finder/${phone.slug}`,
          lastModified: phone.updated_at ? new Date(phone.updated_at) : currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }));
        console.log(`📱 Generated ${phonePages.length} phone sitemap entries`);
      }
    } catch (error) {
      console.error('Error fetching phones for sitemap:', error);
    }
  }

  // ============ COMBINE ALL PAGES ============
  const allPages = [...staticPages, ...phonePages];

  console.log(`📊 Total sitemap entries: ${allPages.length}`);

  return allPages;
}