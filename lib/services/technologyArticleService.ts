// lib/services/technologyArticleService.ts
import TechnologyArticle, { ITechnologyArticle } from '../models/TechnologyArticle';
import TechnologyCategory from '../models/TechnologyCategory';
import TechnologySubCategory from '../models/TechnologySubCategory';
import { connectToDatabase } from '../db/mongodb';
import { Types } from 'mongoose';

export class TechnologyArticleService {
  // ─── GET ALL ARTICLES ──────────────────────────────────────
  async getAllArticles(filter: any = {}) {
    await connectToDatabase();
    const query = { isPublished: true, ...filter };
    return await TechnologyArticle.find(query)
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug')
      .sort({ publishedAt: -1 });
  }

  // ─── GET ARTICLES BY CATEGORY SLUG ────────────────────────
  async getArticlesByCategory(categorySlug: string) {
    await connectToDatabase();
    return await TechnologyArticle.find({
      categorySlug,
      isPublished: true,
    })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug')
      .sort({ publishedAt: -1 });
  }

  // ─── GET ARTICLE BY SLUG ──────────────────────────────────
  async getArticleBySlug(slug: string) {
    await connectToDatabase();
    const article = await TechnologyArticle.findOne({ slug, isPublished: true })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug');
    
    if (article) {
      article.views += 1;
      await article.save();
    }
    
    return article;
  }

  // ─── CREATE ARTICLE WITH SLUGS ───────────────────────────
  async createArticle(data: any) {
    await connectToDatabase();
    
    console.log('Creating article with data:', JSON.stringify(data, null, 2));
    
    let category;
    let subcategory;

    // ✅ Find category by slug first
    if (data.categorySlug) {
      category = await TechnologyCategory.findOne({ 
        slug: data.categorySlug, 
        isActive: true 
      });
      console.log('Found category by slug:', category ? category.name : 'Not found');
    }
    
    // Fallback to ID if slug not found
    if (!category && data.categoryId) {
      category = await TechnologyCategory.findById(data.categoryId);
      console.log('Found category by ID:', category ? category.name : 'Not found');
    }

    if (!category) {
      console.error('Category not found for slug:', data.categorySlug);
      throw new Error(`Category not found. Please provide valid categorySlug or categoryId`);
    }

    // Find subcategory by slug or ID (if provided)
    if (data.subCategorySlug) {
      subcategory = await TechnologySubCategory.findOne({ 
        slug: data.subCategorySlug,
        categoryId: category._id,
        isActive: true 
      });
      console.log('Found subcategory by slug:', subcategory ? subcategory.name : 'Not found');
    } else if (data.subCategoryId) {
      subcategory = await TechnologySubCategory.findById(data.subCategoryId);
      console.log('Found subcategory by ID:', subcategory ? subcategory.name : 'Not found');
    }

    // Generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = this.generateSlug(data.title);
    }

    const articleData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      imageAlt: data.imageAlt || '',
      categoryId: category._id,
      categorySlug: category.slug,
      subCategoryId: subcategory?._id || null,
      subCategorySlug: subcategory?.slug || null,
      author: data.author,
      authorRole: data.authorRole || 'Technology Expert',
      difficulty: data.difficulty || 'Intermediate',
      readTime: data.readTime || 5,
      steps: data.steps || 0,
      tags: data.tags || [],
      isFeatured: data.isFeatured || false,
      isTrending: data.isTrending || false,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      views: 0,
      likes: 0,
    };

    console.log('Creating article with data:', JSON.stringify(articleData, null, 2));

    const article = new TechnologyArticle(articleData);
    await article.save();
    
    // Populate and return
    return await TechnologyArticle.findById(article._id)
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug');
  }

  // ─── UPDATE ARTICLE BY SLUG ──────────────────────────────
  async updateArticleBySlug(slug: string, data: Partial<ITechnologyArticle>) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOne({ slug });
    if (!article) {
      throw new Error('Article not found');
    }

    if (data.subCategorySlug) {
      const subcategory = await TechnologySubCategory.findOne({ 
        slug: data.subCategorySlug,
        categoryId: article.categoryId,
        isActive: true 
      });
      if (subcategory) {
        data.subCategoryId = subcategory._id;
        data.subCategorySlug = subcategory.slug;
      }
    }

    if (data.title && !data.slug) {
      data.slug = this.generateSlug(data.title);
    }

    return await TechnologyArticle.findByIdAndUpdate(article._id, data, {
      new: true,
      runValidators: true,
    })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug');
  }

  // ─── DELETE ARTICLE BY SLUG ──────────────────────────────
  async deleteArticleBySlug(slug: string) {
    await connectToDatabase();
    const article = await TechnologyArticle.findOne({ slug });
    if (!article) {
      throw new Error('Article not found');
    }
    return await TechnologyArticle.findByIdAndDelete(article._id);
  }

  // ─── INCREMENT VIEWS ──────────────────────────────────────
  async incrementViews(slug: string) {
    await connectToDatabase();
    const article = await TechnologyArticle.findOne({ slug, isPublished: true });
    if (!article) {
      throw new Error('Article not found');
    }
    article.views += 1;
    await article.save();
    return article;
  }

  // ─── GET FEATURED ARTICLES ───────────────────────────────
  async getFeaturedArticles(limit: number = 6) {
    await connectToDatabase();
    return await TechnologyArticle.find({
      isFeatured: true,
      isPublished: true,
    })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(limit);
  }

  // ─── GET TRENDING ARTICLES ──────────────────────────────
  async getTrendingArticles(limit: number = 6) {
    await connectToDatabase();
    return await TechnologyArticle.find({
      isTrending: true,
      isPublished: true,
    })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug')
      .sort({ views: -1, publishedAt: -1 })
      .limit(limit);
  }

  // ─── FILTER ARTICLES ──────────────────────────────────────
  async filterArticles(filters: {
    category?: string;
    subCategory?: string;
    difficulty?: string;
    tags?: string[];
    search?: string;
    featured?: boolean;
    trending?: boolean;
    limit?: number;
    page?: number;
  }) {
    await connectToDatabase();
    const query: any = { isPublished: true };
    const {
      category,
      subCategory,
      difficulty,
      tags,
      search,
      featured,
      trending,
      limit = 20,
      page = 1,
    } = filters;

    if (category) query.categorySlug = category;
    if (subCategory) query.subCategorySlug = subCategory;
    if (difficulty) query.difficulty = difficulty;
    if (featured) query.isFeatured = true;
    if (trending) query.isTrending = true;
    if (tags && tags.length > 0) query.tags = { $in: tags };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      TechnologyArticle.find(query)
        .populate('categoryId', 'name slug')
        .populate('subCategoryId', 'name slug')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      TechnologyArticle.countDocuments(query),
    ]);

    return {
      articles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  // ─── GENERATE SLUG ────────────────────────────────────────
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

export const technologyArticleService = new TechnologyArticleService();