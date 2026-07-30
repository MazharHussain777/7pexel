// app/sitemap-compare.ts
import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date();

  try {
    await connectToDatabase();
    const phones = await Phone.find(
      {}, 
      { 
        slug: 1, 
        brand: 1, 
        name: 1,
        year: 1,
        isFlagship: 1 
      }
    ).lean();

    console.log(`📱 Generating compare sitemap for ${phones.length} phones`);

    const compareUrls: MetadataRoute.Sitemap = [];

    // Generate ALL 2-phone combinations (up to 50 phones = 1225 combinations)
    const maxPhones = Math.min(phones.length, 50);
    const topPhones = phones.slice(0, maxPhones);

    for (let i = 0; i < topPhones.length; i++) {
      for (let j = i + 1; j < topPhones.length; j++) {
        const slugs = [topPhones[i].slug, topPhones[j].slug];
        compareUrls.push({
          url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        });
      }
    }

    // Add popular brand 3-way comparisons
    const brands = ["samsung", "apple", "google", "oneplus", "xiaomi", "vivo", "oppo"];
    for (const brand of brands) {
      const brandPhones = phones.filter(p => 
        p.brand?.toLowerCase().includes(brand)
      );
      const top3 = brandPhones.slice(0, 3);
      if (top3.length >= 3) {
        const slugs = top3.map(p => p.slug);
        compareUrls.push({
          url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        });
      }
    }

    // Add flagship comparisons
    const flagshipPhones = phones.filter(p => p.isFlagship === true);
    if (flagshipPhones.length >= 2) {
      const topFlagships = flagshipPhones.slice(0, 10);
      for (let i = 0; i < topFlagships.length; i++) {
        for (let j = i + 1; j < topFlagships.length; j++) {
          const slugs = [topFlagships[i].slug, topFlagships[j].slug];
          compareUrls.push({
            url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.92,
          });
        }
      }
    }

    console.log(`✅ Generated ${compareUrls.length} compare URLs`);

    return compareUrls;
  } catch (error) {
    console.error('Error generating compare sitemap:', error);
    return [];
  }
}