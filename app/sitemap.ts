// app/sitemap.ts
import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";
import TechnologyArticle from "@/lib/models/TechnologyArticle";
import TechnologyCategory from "@/lib/models/TechnologyCategory";
import TechnologySubCategory from "@/lib/models/TechnologySubCategory";

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
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/phone-finder`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.98 },
    { url: `${baseUrl}/compare`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.95 },
    // ✅ ADDED: Technology Hub
    { url: `${baseUrl}/technology`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.97 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/author`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // ============= FETCH TECHNOLOGY ARTICLES =============
  let techArticles: any[] = [];
  let techCategories: any[] = [];
  let techSubCategories: any[] = [];

  try {
    await connectToDatabase();
    
    // Fetch all published technology articles
    techArticles = await TechnologyArticle.find(
      { isPublished: true },
      { slug: 1, updatedAt: 1, categorySlug: 1, title: 1 }
    ).lean();
    
    // Fetch all active categories
    techCategories = await TechnologyCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1, name: 1 }
    ).lean();
    
    // Fetch all active subcategories
    techSubCategories = await TechnologySubCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1, categorySlug: 1, name: 1 }
    ).lean();
    
    console.log(`📱 Found ${techArticles.length} technology articles`);
    console.log(`📂 Found ${techCategories.length} technology categories`);
    console.log(`📂 Found ${techSubCategories.length} technology subcategories`);
  } catch (error) {
    console.error('❌ Error fetching technology data for sitemap:', error);
  }

  // ============= TECHNOLOGY CATEGORY PAGES =============
  const categoryPages: MetadataRoute.Sitemap = techCategories.map((cat) => ({
    url: `${baseUrl}/technology/category/${cat.slug}`,
    lastModified: cat.updatedAt ? new Date(cat.updatedAt) : currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.92,
  }));

  // ============= TECHNOLOGY ARTICLE PAGES =============
  const articlePages: MetadataRoute.Sitemap = techArticles.map((article) => ({
    url: `${baseUrl}/technology/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ============= TECHNOLOGY SUB-CATEGORY PAGES =============
  const subCategoryPages: MetadataRoute.Sitemap = techSubCategories.map((sub) => ({
    url: `${baseUrl}/technology/category/${sub.categorySlug}/sub/${sub.slug}`,
    lastModified: sub.updatedAt ? new Date(sub.updatedAt) : currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.88,
  }));

  // ============= PHONE PAGES =============
  let phones: PhoneType[] = [];
  try {
    phones = await Phone.find(
      {}, 
      { slug: 1, updatedAt: 1, brand: 1, name: 1, year: 1, isFlagship: 1 }
    ).lean();
    console.log(`📱 Found ${phones.length} phones in database`);
  } catch (error) {
    console.error('❌ Error fetching phones for sitemap:', error);
  }

  const phonePages: MetadataRoute.Sitemap = phones.map((phone) => ({
    url: `${baseUrl}/phone-finder/${phone.slug}`,
    lastModified: phone.updatedAt ? new Date(phone.updatedAt) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ============= COMPARISON PAGES =============
  const comparePages: MetadataRoute.Sitemap = [];
  const maxPhones = Math.min(phones.length, 50);
  const topPhones = phones.slice(0, maxPhones);

  for (let i = 0; i < topPhones.length; i++) {
    for (let j = i + 1; j < topPhones.length; j++) {
      const slugs = [topPhones[i].slug, topPhones[j].slug];
      comparePages.push({
        url: `${baseUrl}/compare?phones=${slugs.join(",")}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      });
    }
  }

  // ============= COMBINE ALL PAGES =============
  const allPages = [
    ...staticPages,
    ...phonePages,
    ...comparePages,
    ...categoryPages,
    ...articlePages,
    ...subCategoryPages,
  ];

  console.log(`📊 Total sitemap entries: ${allPages.length}`);
  console.log(`   - Static: ${staticPages.length}`);
  console.log(`   - Phone pages: ${phonePages.length}`);
  console.log(`   - Comparisons: ${comparePages.length}`);
  console.log(`   - Tech Categories: ${categoryPages.length}`);
  console.log(`   - Tech Articles: ${articlePages.length}`);
  console.log(`   - Tech Subcategories: ${subCategoryPages.length}`);

  return allPages;
}