// app/compare/sitemap.ts
import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://7pexel.com";
  const currentDate = new Date();

  try {
    await connectToDatabase();
    
    // Get ALL phones from database
    const phones = await Phone.find({}, { 
      slug: 1, 
      brand: 1, 
      name: 1,
      year: 1 
    }).lean();

    console.log(`📱 Found ${phones.length} phones for comparison sitemap`);

    // ============= GENERATE ALL 2-PHONE COMBINATIONS =============
    const comparisonUrls: MetadataRoute.Sitemap = [];
    
    // Limit to 100 phones to avoid too many URLs (100 phones = 4,950 combinations)
    // If you have more phones, you can increase this limit
    const maxPhones = Math.min(phones.length, 100);
    const topPhones = phones.slice(0, maxPhones);
    
    console.log(`🔄 Generating comparisons for ${topPhones.length} phones`);

    // Generate ALL possible 2-phone combinations
    for (let i = 0; i < topPhones.length; i++) {
      for (let j = i + 1; j < topPhones.length; j++) {
        const p1 = topPhones[i];
        const p2 = topPhones[j];
        const slugs = [p1.slug, p2.slug];
        
        comparisonUrls.push({
          url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });
      }
    }

    // ============= GENERATE POPULAR 3-PHONE COMBINATIONS =============
    // Top brands
    const brands = ["samsung", "apple", "google", "oneplus", "xiaomi", "vivo", "oppo", "nothing", "sony", "motorola"];
    const brandPhones = phones.filter(p => 
      brands.some(b => p.brand?.toLowerCase().includes(b))
    );

    // Generate 3-phone combinations for each brand
    for (const brand of brands) {
      const brandSpecific = brandPhones.filter(p => 
        p.brand?.toLowerCase().includes(brand)
      );
      
      // Get top 3 phones from each brand
      const top3 = brandSpecific.slice(0, 3);
      if (top3.length >= 3) {
        const slugs = top3.map(p => p.slug);
        comparisonUrls.push({
          url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        });
      }
    }

    // ============= GENERATE FLAGSHIP COMPARISONS =============
    const flagshipPhones = phones.filter(p => p.isFlagship === true);
    if (flagshipPhones.length >= 2) {
      // Compare all flagship phones
      for (let i = 0; i < Math.min(flagshipPhones.length, 20); i++) {
        for (let j = i + 1; j < Math.min(flagshipPhones.length, 20); j++) {
          const slugs = [flagshipPhones[i].slug, flagshipPhones[j].slug];
          comparisonUrls.push({
            url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.92,
          });
        }
      }
    }

    // ============= GENERATE YEAR-BASED COMPARISONS =============
    const years = [...new Set(phones.map(p => p.year).filter(Boolean))];
    for (const year of years) {
      const yearPhones = phones.filter(p => p.year === year);
      if (yearPhones.length >= 2) {
        // Compare top 5 phones from same year
        const topYear = yearPhones.slice(0, 5);
        for (let i = 0; i < topYear.length; i++) {
          for (let j = i + 1; j < topYear.length; j++) {
            const slugs = [topYear[i].slug, topYear[j].slug];
            comparisonUrls.push({
              url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
              lastModified: currentDate,
              changeFrequency: "weekly" as const,
              priority: 0.88,
            });
          }
        }
      }
    }

    console.log(`✅ Generated ${comparisonUrls.length} comparison URLs`);

    // Main compare page
    const mainPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/compare`,
        lastModified: currentDate,
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      ...comparisonUrls,
    ];

    return mainPages;
  } catch (error) {
    console.error("Error generating compare sitemap:", error);
    return [
      {
        url: `${baseUrl}/compare`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
    ];
  }
}