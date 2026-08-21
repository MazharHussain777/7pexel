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
      url: `${baseUrl}/compare`, 
      lastModified: currentDate, 
      changeFrequency: 'daily' as const, 
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
  const phoneSlugs: string[] = [];
  
  if (isSupabaseAvailable && supabaseServer) {
    try {
      const { data: phones, error } = await supabaseServer
        .from('phones')
        .select('slug, updated_at, brand, model')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && phones) {
        // Use a Set to track unique slugs
        const uniqueSlugs = new Set<string>();
        
        phonePages = phones
          .filter((phone: any) => {
            // Skip duplicates
            if (uniqueSlugs.has(phone.slug)) {
              console.log(`⚠️ Duplicate slug found: ${phone.slug}, skipping...`);
              return false;
            }
            uniqueSlugs.add(phone.slug);
            return true;
          })
          .map((phone: any) => {
            phoneSlugs.push(phone.slug);
            return {
              url: `${baseUrl}/phones/finder/${phone.slug}`,
              lastModified: phone.updated_at ? new Date(phone.updated_at) : currentDate,
              changeFrequency: 'weekly' as const,
              priority: 0.9,
            };
          });
        
        console.log(`📱 Generated ${phonePages.length} unique phone sitemap entries`);
        console.log(`📱 Phone slugs: ${phoneSlugs.join(', ')}`);
      }
    } catch (error) {
      console.error('Error fetching phones for sitemap:', error);
    }
  }

  // ============ COMPARE PAGES ============
  let comparePages: MetadataRoute.Sitemap = [];
  
  if (phoneSlugs.length >= 2) {
    // Generate unique compare combinations
    const compareSet = new Set<string>();
    const maxPhones = Math.min(phoneSlugs.length, 20);
    
    for (let i = 0; i < maxPhones; i++) {
      for (let j = i + 1; j < Math.min(maxPhones, i + 5); j++) {
        const slugs = [phoneSlugs[i], phoneSlugs[j]].sort();
        const key = slugs.join(',');
        if (!compareSet.has(key)) {
          compareSet.add(key);
          comparePages.push({
            url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          });
        }
      }
    }
    
    console.log(`📊 Generated ${comparePages.length} unique compare sitemap entries`);
  }

  // ============ COMBINE ALL PAGES ============
  const allPages = [...staticPages, ...phonePages, ...comparePages];

  // Remove any remaining duplicates by URL
  const urlSet = new Set<string>();
  const uniquePages = allPages.filter((page) => {
    if (urlSet.has(page.url)) {
      console.log(`⚠️ Removing duplicate URL: ${page.url}`);
      return false;
    }
    urlSet.add(page.url);
    return true;
  });

  console.log(`📊 Total unique sitemap entries: ${uniquePages.length}`);
  console.log(`   - Static: ${staticPages.length}`);
  console.log(`   - Phones: ${phonePages.length}`);
  console.log(`   - Compare: ${comparePages.length}`);

  return uniquePages;
}