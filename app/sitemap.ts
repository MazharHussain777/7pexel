// app/sitemap.ts
import { MetadataRoute } from "next";
import { supabaseServer, isSupabaseAvailable } from "@/lib/supabase/server";
import { STATIC_PHONES } from "@/app/phones/finder/data/static-phone-data";
import { GUIDES, GUIDE_CATEGORIES, generateGuideSitemap } from "@/app/guides/data/guides-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date();

  console.log('🚀 Generating complete sitemap...');

  // ==========================================
  // 1. STATIC PAGES
  // ==========================================
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/phones`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.98 },
    { url: `${baseUrl}/phones/finder`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/compare`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/guides`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/technology`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/reviews`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/news`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/sitemap.xml`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.3 },
    { url: `${baseUrl}/sitemap-compare.xml`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.3 },
  ];

  console.log(`✅ Static pages: ${staticPages.length}`);

  // ==========================================
  // 2. PHONE PAGES (FROM DATABASE)
  // ==========================================
  let phones = [];
  let phoneSlugs: string[] = [];

  if (isSupabaseAvailable && supabaseServer) {
    try {
      const { data: phonesData, error } = await supabaseServer
        .from('phones')
        .select('slug, updated_at, brand, model, year, price')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && phonesData) {
        phones = phonesData;
        phoneSlugs = phones.map((p: any) => p.slug);
        console.log(`✅ Fetched ${phones.length} phones from database`);
      }
    } catch (error) {
      console.error('❌ Error fetching phones:', error);
    }
  }

  // Fallback to static data
  if (phones.length === 0) {
    phones = STATIC_PHONES.map(p => ({
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      year: p.year,
      price: p.price,
      updated_at: new Date().toISOString()
    }));
    phoneSlugs = phones.map((p: any) => p.slug);
    console.log(`✅ Loaded ${phones.length} static phones`);
  }

  const phonePages: MetadataRoute.Sitemap = phones.map((phone: any) => ({
    url: `${baseUrl}/phones/finder/${phone.slug}`,
    lastModified: phone.updated_at ? new Date(phone.updated_at) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  console.log(`✅ Phone pages: ${phonePages.length}`);

  // ==========================================
  // 3. GUIDE PAGES (FROM DATA FILE)
  // ==========================================
  const guideSitemap = generateGuideSitemap();
  
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.updatedDate ? new Date(guide.updatedDate) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: guide.isFeatured ? 0.9 : 0.85,
  }));

  console.log(`✅ Guide pages: ${guidePages.length}`);

  // ==========================================
  // 4. GUIDE CATEGORY PAGES
  // ==========================================
  const guideCategoryPages: MetadataRoute.Sitemap = GUIDE_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/guides/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  console.log(`✅ Guide category pages: ${guideCategoryPages.length}`);

  // ==========================================
  // 5. TECHNOLOGY CATEGORY PAGES
  // ==========================================
  const techCategories = [
    'ai',
    'generative-ai',
    'quantum-computing',
    'ar-vr',
    'green-tech',
    'cybersecurity',
    'space-tech',
    'biotech',
  ];

  const techCategoryPages: MetadataRoute.Sitemap = techCategories.map((slug) => ({
    url: `${baseUrl}/technology/category/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  console.log(`✅ Tech category pages: ${techCategoryPages.length}`);

  // ==========================================
  // 6. COLLECTION PAGES
  // ==========================================
  const collectionPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/collections/best-phones-2026`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/top-10-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/best-camera`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/best-battery`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/best-gaming`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/best-value`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/under-500`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/collections/under-1000`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/collections/flagship-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections/mid-range-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/collections/budget-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/collections/5g-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/collections/foldable-phones`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  console.log(`✅ Collection pages: ${collectionPages.length}`);

  // ==========================================
  // 7. BRAND PAGES
  // ==========================================
  const brands = [...new Set(phones.map((p: any) => p.brand))];
  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/phones/brands/${brand.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  console.log(`✅ Brand pages: ${brandPages.length}`);

  // ==========================================
  // 8. COMPARISON PAGES (SAMSUNG)
  // ==========================================
  const samsungPhones = phones.filter((p: any) => 
    p.brand === 'Samsung' || p.model?.toLowerCase().includes('galaxy')
  );
  const samsungSlugs = samsungPhones.map((p: any) => p.slug);
  const samsungComparisons: MetadataRoute.Sitemap = [];

  for (let i = 0; i < samsungSlugs.length; i++) {
    for (let j = i + 1; j < samsungSlugs.length; j++) {
      samsungComparisons.push({
        url: `${baseUrl}/compare/${samsungSlugs[i]}-vs-${samsungSlugs[j]}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      });
    }
  }

  console.log(`✅ Samsung comparisons: ${samsungComparisons.length}`);

  // ==========================================
  // 9. ALL PHONE COMPARISONS
  // ==========================================
  const allComparisons: MetadataRoute.Sitemap = [];
  const maxPhones = Math.min(phones.length, 30);

  for (let i = 0; i < maxPhones; i++) {
    for (let j = i + 1; j < Math.min(maxPhones, i + 6); j++) {
      const phone1 = phones[i];
      const phone2 = phones[j];
      
      if (phone1 && phone2 && phone1.slug !== phone2.slug) {
        const url = `${baseUrl}/compare/${phone1.slug}-vs-${phone2.slug}`;
        const exists = allComparisons.some(p => p.url === url) || 
                      samsungComparisons.some(p => p.url === url);
        if (!exists) {
          allComparisons.push({
            url,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          });
        }
      }
    }
  }

  console.log(`✅ All comparisons: ${allComparisons.length}`);

  // ==========================================
  // 10. POPULAR COMPARISON SEARCH QUERIES
  // ==========================================
  const popularPairs = [
    ['samsung-galaxy-s24-ultra', 'samsung-galaxy-s23-ultra'],
    ['samsung-galaxy-s24', 'samsung-galaxy-s23'],
    ['samsung-galaxy-s24-ultra', 'samsung-galaxy-s22-ultra'],
    ['samsung-galaxy-s23-ultra', 'samsung-galaxy-s22-ultra'],
    ['apple-iphone-16-pro-max', 'apple-iphone-15-pro-max'],
    ['apple-iphone-16', 'apple-iphone-15'],
    ['apple-iphone-16-pro', 'apple-iphone-15-pro'],
    ['google-pixel-10-pro', 'google-pixel-9-pro'],
    ['google-pixel-10', 'google-pixel-9'],
    ['oneplus-14-pro', 'oneplus-13-pro'],
    ['samsung-galaxy-s24-ultra', 'apple-iphone-16-pro-max'],
    ['samsung-galaxy-s24-ultra', 'google-pixel-10-pro'],
    ['samsung-galaxy-s24-ultra', 'oneplus-14-pro'],
    ['apple-iphone-16-pro-max', 'google-pixel-10-pro'],
    ['samsung-galaxy-s26-ultra', 'samsung-galaxy-s24-ultra'],
    ['samsung-galaxy-s26-ultra', 'apple-iphone-16-pro-max'],
    ['google-pixel-10-pro', 'apple-iphone-16-pro-max'],
    ['oneplus-14-pro', 'google-pixel-10-pro'],
  ];

  const popularComparisons: MetadataRoute.Sitemap = popularPairs
    .filter(([slug1, slug2]) => {
      const exists = phones.some((p: any) => p.slug === slug1) && 
                    phones.some((p: any) => p.slug === slug2);
      return exists;
    })
    .map(([slug1, slug2]) => ({
      url: `${baseUrl}/compare/${slug1}-vs-${slug2}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    }));

  console.log(`✅ Popular comparisons: ${popularComparisons.length}`);

  // ==========================================
  // 11. SEARCH QUERY VARIATIONS
  // ==========================================
  const searchVariations: MetadataRoute.Sitemap = [];
  const topPhones = phones.slice(0, 10);

  for (let i = 0; i < topPhones.length; i++) {
    for (let j = i + 1; j < topPhones.length; j++) {
      const phone1 = topPhones[i];
      const phone2 = topPhones[j];
      
      if (phone1 && phone2) {
        const variations = [
          `${phone1.model} vs ${phone2.model}`,
          `${phone1.brand} ${phone1.model} vs ${phone2.brand} ${phone2.model}`,
          `${phone1.model} vs ${phone2.model} comparison`,
          `${phone1.model} or ${phone2.model}`,
          `compare ${phone1.model} and ${phone2.model}`,
          `which is better ${phone1.model} or ${phone2.model}`,
          `${phone1.model} vs ${phone2.model} specs`,
          `${phone1.model} vs ${phone2.model} camera`,
          `${phone1.model} vs ${phone2.model} battery`,
          `${phone1.model} vs ${phone2.model} price`,
          `${phone1.model} compared to ${phone2.model}`,
          `${phone1.brand} vs ${phone2.brand}`,
        ];

        for (const variation of variations) {
          searchVariations.push({
            url: `${baseUrl}/compare?q=${encodeURIComponent(variation)}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          });
        }
      }
    }
  }

  console.log(`✅ Search variations: ${searchVariations.length}`);

  // ==========================================
  // 12. BRAND COMPARISON PAGES
  // ==========================================
  const brandComparisons: MetadataRoute.Sitemap = [];

  for (let i = 0; i < brands.length; i++) {
    for (let j = i + 1; j < brands.length; j++) {
      const brand1 = brands[i];
      const brand2 = brands[j];
      
      const phone1 = phones.find((p: any) => p.brand === brand1);
      const phone2 = phones.find((p: any) => p.brand === brand2);
      
      if (phone1 && phone2) {
        brandComparisons.push({
          url: `${baseUrl}/compare/brands/${brand1.toLowerCase()}-vs-${brand2.toLowerCase()}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      }
    }
  }

  console.log(`✅ Brand comparisons: ${brandComparisons.length}`);

  // ==========================================
  // 13. YEAR-BASED COMPARISONS
  // ==========================================
  const years = [...new Set(phones.map((p: any) => p.year))].sort();
  const yearComparisons: MetadataRoute.Sitemap = [];

  for (let i = 0; i < years.length; i++) {
    for (let j = i + 1; j < years.length; j++) {
      const year1 = years[i];
      const year2 = years[j];
      
      const phone1 = phones.find((p: any) => p.year === year1);
      const phone2 = phones.find((p: any) => p.year === year2);
      
      if (phone1 && phone2) {
        yearComparisons.push({
          url: `${baseUrl}/compare/years/${year1}-vs-${year2}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        });
      }
    }
  }

  console.log(`✅ Year comparisons: ${yearComparisons.length}`);

  // ==========================================
  // 14. COMBINE ALL
  // ==========================================
  const allPages = [
    ...staticPages,
    ...phonePages,
    ...guidePages,
    ...guideCategoryPages,
    ...techCategoryPages,
    ...collectionPages,
    ...brandPages,
    ...samsungComparisons,
    ...allComparisons,
    ...popularComparisons,
    ...searchVariations,
    ...brandComparisons,
    ...yearComparisons,
  ];

  // Remove duplicates by URL
  const urlSet = new Set<string>();
  const uniquePages = allPages.filter((page) => {
    if (urlSet.has(page.url)) {
      console.log(`⚠️ Removing duplicate: ${page.url}`);
      return false;
    }
    urlSet.add(page.url);
    return true;
  });

  // Sort by priority (highest first)
  uniquePages.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  // ==========================================
  // 15. SITEMAP STATISTICS
  // ==========================================
  console.log('\n📊 SITEMAP STATISTICS:');
  console.log('───────────────────────────────');
  console.log(`   Static Pages: ${staticPages.length}`);
  console.log(`   Phone Pages: ${phonePages.length}`);
  console.log(`   Guide Pages: ${guidePages.length}`);
  console.log(`   Guide Categories: ${guideCategoryPages.length}`);
  console.log(`   Tech Categories: ${techCategoryPages.length}`);
  console.log(`   Collections: ${collectionPages.length}`);
  console.log(`   Brand Pages: ${brandPages.length}`);
  console.log(`   Samsung Comparisons: ${samsungComparisons.length}`);
  console.log(`   All Comparisons: ${allComparisons.length}`);
  console.log(`   Popular Comparisons: ${popularComparisons.length}`);
  console.log(`   Search Variations: ${searchVariations.length}`);
  console.log(`   Brand Comparisons: ${brandComparisons.length}`);
  console.log(`   Year Comparisons: ${yearComparisons.length}`);
  console.log('───────────────────────────────');
  console.log(`   TOTAL: ${uniquePages.length} URLs`);
  console.log(`   Unique: ${uniquePages.length} (${allPages.length - uniquePages.length} duplicates removed)`);

  return uniquePages;
}