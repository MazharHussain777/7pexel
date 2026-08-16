// app/sitemap-technology.ts
import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import TechnologyArticle from "@/lib/models/TechnologyArticle";
import TechnologyCategory from "@/lib/models/TechnologyCategory";
import TechnologySubCategory from "@/lib/models/TechnologySubCategory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date();

  console.log('🔄 Generating technology sitemap...');

  try {
    await connectToDatabase();

    // Fetch all technology articles
    const articles = await TechnologyArticle.find(
      { isPublished: true },
      { slug: 1, updatedAt: 1, title: 1, categorySlug: 1 }
    ).lean();

    // Fetch all categories
    const categories = await TechnologyCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1, name: 1 }
    ).lean();

    // Fetch all subcategories
    const subCategories = await TechnologySubCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1, name: 1, categorySlug: 1 }
    ).lean();

    const technologyPages: MetadataRoute.Sitemap = [
      // Technology Hub
      {
        url: `${baseUrl}/technology`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.97,
      },
      // Categories
      ...categories.map((cat) => ({
        url: `${baseUrl}/technology/category/${cat.slug}`,
        lastModified: cat.updatedAt ? new Date(cat.updatedAt) : currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.92,
      })),
      // Subcategories
      ...subCategories.map((sub) => ({
        url: `${baseUrl}/technology/category/${sub.categorySlug}/sub/${sub.slug}`,
        lastModified: sub.updatedAt ? new Date(sub.updatedAt) : currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.88,
      })),
      // Articles
      ...articles.map((article) => ({
        url: `${baseUrl}/technology/${article.slug}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })),
    ];

    console.log(`📊 Generated ${technologyPages.length} technology pages for sitemap`);
    return technologyPages;
  } catch (error) {
    console.error('Error generating technology sitemap:', error);
    return [];
  }
}