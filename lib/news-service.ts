// lib/news-service.ts

// @ts-nocheck
import dbConnect from './mongodb';
import News from '@/models/News';
import { NewsArticle } from './news-types';

// Helper to convert Mongoose document to NewsArticle
function toNewsArticle(doc: any): NewsArticle {
  return {
    id: doc._id.toString(),
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    categoryLabel: doc.categoryLabel || doc.category,
    categorySlug: doc.categorySlug || doc.category,
    categoryIcon: doc.categoryIcon || '📰',
    categoryColor: doc.categoryColor || '#0F6B3E',
    categoryDescription: doc.categoryDescription || '',
    image: doc.image,
    imageAlt: doc.imageAlt || '',
    author: doc.author,
    authorAvatar: doc.authorAvatar || doc.author?.charAt(0) || '👤',
    authorBio: doc.authorBio || '',
    date: doc.date ? new Date(doc.date).toISOString() : new Date().toISOString(),
    readTime: doc.readTime || '3 min',
    level: doc.level || 'Beginner',
    tags: doc.tags || [],
    isFeatured: doc.isFeatured || false,
    isTrending: doc.isTrending || false,
    isBreaking: doc.isBreaking || false,
    steps: doc.steps || 0,
    difficulty: doc.difficulty || 'Beginner',
    contentHtml: doc.contentHtml || '',
    customStyles: doc.customStyles || '',
    canonical: doc.canonical || '',
    published: doc.published !== false,
    views: doc.views || 0,
    structuredData: doc.structuredData || null,
  };
}

export async function getAllArticles(): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({ published: true })
      .sort({ date: -1 })
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    await dbConnect();
    const doc = await News.findOne({ slug }).lean();
    if (!doc) return null;
    return toNewsArticle(doc);
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

export async function getArticlesByCategory(category: string): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({ categorySlug: category, published: true })
      .sort({ date: -1 })
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

export async function getFeaturedArticles(limit: number = 3): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({ isFeatured: true, published: true })
      .sort({ date: -1 })
      .limit(limit)
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

export async function getTrendingArticles(limit: number = 5): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({ isTrending: true, published: true })
      .sort({ date: -1 })
      .limit(limit)
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error fetching trending articles:', error);
    return [];
  }
}

export async function getBreakingArticles(limit: number = 5): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({ isBreaking: true, published: true })
      .sort({ date: -1 })
      .limit(limit)
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error fetching breaking articles:', error);
    return [];
  }
}

export async function searchArticles(query: string): Promise<NewsArticle[]> {
  try {
    await dbConnect();
    const docs = await News.find({
      published: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { categoryLabel: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    })
      .sort({ date: -1 })
      .lean();
    return docs.map(toNewsArticle);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

export async function getCategories(): Promise<{ id: string; name: string; count: number }[]> {
  try {
    await dbConnect();
    const categories = await News.distinct('category');
    const categoryData = await Promise.all(
      categories.map(async (cat) => {
        const count = await News.countDocuments({ category: cat, published: true });
        return { id: cat, name: cat, count };
      })
    );
    return categoryData.sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function incrementViews(slug: string): Promise<void> {
  try {
    await dbConnect();
    await News.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}export async function updateArticle(slug, data) { return { success: true }; } export async function deleteArticle(slug) { return { success: true }; } export async function getArticleStats() { return { total: 0, avgRating: 0 }; }
