// app/api/sitemap-technology/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyArticle from '@/lib/models/TechnologyArticle';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date().toISOString();

  try {
    await connectToDatabase();

    const articles = await TechnologyArticle.find(
      { isPublished: true },
      { slug: 1, updatedAt: 1 }
    ).lean();

    const categories = await TechnologyCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1 }
    ).lean();

    const subCategories = await TechnologySubCategory.find(
      { isActive: true },
      { slug: 1, updatedAt: 1, categorySlug: 1 }
    ).lean();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/technology</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.97</priority>
  </url>`;

    // Add categories
    categories.forEach((cat) => {
      xml += `
  <url>
    <loc>${baseUrl}/technology/category/${cat.slug}</loc>
    <lastmod>${cat.updatedAt ? new Date(cat.updatedAt).toISOString() : currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.92</priority>
  </url>`;
    });

    // Add subcategories
    subCategories.forEach((sub) => {
      xml += `
  <url>
    <loc>${baseUrl}/technology/category/${sub.categorySlug}/sub/${sub.slug}</loc>
    <lastmod>${sub.updatedAt ? new Date(sub.updatedAt).toISOString() : currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.88</priority>
  </url>`;
    });

    // Add articles
    articles.forEach((article) => {
      xml += `
  <url>
    <loc>${baseUrl}/technology/${article.slug}</loc>
    <lastmod>${article.updatedAt ? new Date(article.updatedAt).toISOString() : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating technology sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}