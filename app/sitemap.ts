// app/sitemap.ts
import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

interface PhoneType {
  slug: string;
  updatedAt?: string;
  brand?: string;
  name?: string;
  year?: number;
  isFlagship?: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date();

  console.log('🔄 Generating main sitemap...');

  // ============= STATIC PAGES =============
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/author`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // ============= FETCH ALL PHONES FROM DATABASE =============
  let phones: PhoneType[] = [];
  try {
    await connectToDatabase();
    phones = await Phone.find(
      {}, 
      { 
        slug: 1, 
        updatedAt: 1, 
        brand: 1, 
        name: 1,
        year: 1,
        isFlagship: 1 
      }
    ).lean();
    
    console.log(`📱 Found ${phones.length} phones in database`);
  } catch (error) {
    console.error('❌ Error fetching phones for sitemap:', error);
  }

  // ============= INDIVIDUAL PHONE PAGES =============
  const phonePages: MetadataRoute.Sitemap = phones.map((phone: PhoneType) => ({
    url: `${baseUrl}/phone-finder/${phone.slug}`,
    lastModified: phone.updatedAt ? new Date(phone.updatedAt) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  console.log(`📄 Generated ${phonePages.length} phone pages`);

  // ============= COMPARISON PAGES - ALL 2-PHONE COMBINATIONS =============
  const comparePages: MetadataRoute.Sitemap = [];
  
  // Limit to 50 phones to keep sitemap manageable
  // 50 phones = 1,225 combinations (well within Google's 50,000 URL limit)
  const maxPhones = Math.min(phones.length, 50);
  const topPhones = phones.slice(0, maxPhones);

  console.log(`🔄 Generating comparisons for ${topPhones.length} phones (${(topPhones.length * (topPhones.length - 1)) / 2} combinations)`);

  // Generate ALL 2-phone combinations
  for (let i = 0; i < topPhones.length; i++) {
    for (let j = i + 1; j < topPhones.length; j++) {
      const p1 = topPhones[i];
      const p2 = topPhones[j];
      const slugs = [p1.slug, p2.slug];
      
      comparePages.push({
        url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      });
    }
  }

  console.log(`✅ Generated ${comparePages.length} comparison pages`);

  // ============= POPULAR BRAND 3-PHONE COMPARISONS =============
  const threePhonePages: MetadataRoute.Sitemap = [];
  
  // Top brands for 3-way comparisons
  const brands = ["samsung", "apple", "google", "oneplus", "xiaomi", "vivo", "oppo", "nothing", "sony", "motorola"];
  
  for (const brand of brands) {
    const brandPhones = phones.filter(p => 
      p.brand?.toLowerCase().includes(brand)
    );
    
    // Get top 3 phones from each brand
    const top3 = brandPhones.slice(0, 3);
    if (top3.length >= 3) {
      const slugs = top3.map(p => p.slug);
      threePhonePages.push({
        url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      });
    }
  }

  // ============= FLAGSHIP COMPARISONS =============
  const flagshipPages: MetadataRoute.Sitemap = [];
  const flagshipPhones = phones.filter(p => p.isFlagship === true);
  
  if (flagshipPhones.length >= 2) {
    const topFlagships = flagshipPhones.slice(0, 15);
    for (let i = 0; i < topFlagships.length; i++) {
      for (let j = i + 1; j < topFlagships.length; j++) {
        const slugs = [topFlagships[i].slug, topFlagships[j].slug];
        flagshipPages.push({
          url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.92,
        });
      }
    }
  }

  // ============= YEAR-BASED COMPARISONS =============
  const yearPages: MetadataRoute.Sitemap = [];
  const years = [...new Set(phones.map(p => p.year).filter(Boolean))];
  
  for (const year of years) {
    const yearPhones = phones.filter(p => p.year === year);
    if (yearPhones.length >= 2) {
      const topYear = yearPhones.slice(0, 5);
      for (let i = 0; i < topYear.length; i++) {
        for (let j = i + 1; j < topYear.length; j++) {
          const slugs = [topYear[i].slug, topYear[j].slug];
          yearPages.push({
            url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.88,
          });
        }
      }
    }
  }

  // ============= COMBINE ALL PAGES =============
  const allPages = [
    ...staticPages,
    ...phonePages,
    ...comparePages,
    ...threePhonePages,
    ...flagshipPages,
    ...yearPages,
  ];

  console.log(`📊 Total sitemap entries: ${allPages.length}`);
  console.log(`   - Static: ${staticPages.length}`);
  console.log(`   - Phone pages: ${phonePages.length}`);
  console.log(`   - 2-Phone comparisons: ${comparePages.length}`);
  console.log(`   - 3-Phone comparisons: ${threePhonePages.length}`);
  console.log(`   - Flagship comparisons: ${flagshipPages.length}`);
  console.log(`   - Year comparisons: ${yearPages.length}`);

  return allPages;
}