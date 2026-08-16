// lib/services/technologyArticleService.ts
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyArticle, { ITechnologyArticle } from '@/lib/models/TechnologyArticle';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';
import mongoose from 'mongoose';

export interface ArticleFilters {
  category?: string;
  subCategory?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  author?: string;
  search?: string;
  featured?: boolean;
  trending?: boolean;
  published?: boolean;
  limit?: number;
  page?: number;
  sortBy?: 'publishedAt' | 'views' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateArticleData {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  image?: string;
  imageAlt?: string;
  categorySlug: string;
  subCategorySlug?: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  authorBio?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime?: number;
  steps?: number;
  tags?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isPublished?: boolean;
  isBreaking?: boolean;
  isSponsored?: boolean;
  structuredData?: any;
  publishedAt?: Date;
}

export interface UpdateArticleData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  categorySlug?: string;
  subCategorySlug?: string;
  author?: string;
  authorRole?: string;
  authorAvatar?: string;
  authorBio?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime?: number;
  steps?: number;
  tags?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isPublished?: boolean;
  isBreaking?: boolean;
  isSponsored?: boolean;
  structuredData?: any;
  publishedAt?: Date;
}

class TechnologyArticleService {
  async getAllArticles(filters: ArticleFilters = {}) {
    await connectToDatabase();
    
    const {
      category,
      subCategory,
      difficulty,
      tags,
      author,
      featured,
      trending,
      published = true,
      limit = 20,
      page = 1,
      sortBy = 'publishedAt',
      sortOrder = 'desc',
    } = filters;
    
    const query: any = {};
    
    if (category) query.categorySlug = category;
    if (subCategory) query.subCategorySlug = subCategory;
    if (difficulty) query.difficulty = difficulty;
    if (author) query.author = { $regex: author, $options: 'i' };
    if (featured) query.isFeatured = true;
    if (trending) query.isTrending = true;
    if (published) query.isPublished = true;
    if (tags && tags.length > 0) query.tags = { $in: tags };
    
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const [articles, total] = await Promise.all([
      TechnologyArticle.find(query)
        .populate('categoryId', 'name slug color icon description')
        .populate('subCategoryId', 'name slug color icon description')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      TechnologyArticle.countDocuments(query),
    ]);
    
    return {
      data: articles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
  
  async getArticleBySlug(slug: string) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOne({ slug, isPublished: true })
      .populate('categoryId', 'name slug description color icon metaTitle metaDescription')
      .populate('subCategoryId', 'name slug description color icon metaTitle metaDescription');
    
    if (!article) {
      return null;
    }
    
    // Increment views
    await TechnologyArticle.findByIdAndUpdate(article._id, {
      $inc: { views: 1 },
    });
    
    // Get related articles
    const relatedArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon');
    
    // Get popular articles
    const popularArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ views: -1, publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon');
    
    return {
      article,
      relatedArticles,
      popularArticles,
    };
  }
  
  async createArticle(data: CreateArticleData) {
    await connectToDatabase();
    
    // Validate category
    const category = await TechnologyCategory.findOne({
      slug: data.categorySlug,
      isActive: true,
    });
    
    if (!category) {
      throw new Error(`Category with slug '${data.categorySlug}' not found`);
    }
    
    // Find subcategory if provided
    let subCategoryId = null;
    if (data.subCategorySlug) {
      const subCategory = await TechnologySubCategory.findOne({
        slug: data.subCategorySlug,
        isActive: true,
      });
      if (subCategory) {
        subCategoryId = subCategory._id;
      }
    }
    
    // Generate slug if not provided
    let slug = data.slug;
    if (!slug) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      let existing = await TechnologyArticle.findOne({ slug });
      let counter = 1;
      while (existing) {
        slug = `${slug}-${counter}`;
        existing = await TechnologyArticle.findOne({ slug });
        counter++;
      }
    } else {
      const existing = await TechnologyArticle.findOne({ slug });
      if (existing) {
        throw new Error(`Article with slug '${slug}' already exists`);
      }
    }
    
    // Build article data
    const articleData = {
      title: data.title,
      slug,
      excerpt: data.excerpt || data.content.slice(0, 200).replace(/<[^>]*>/g, '').slice(0, 200) + '...',
      content: data.content,
      image: data.image || '/images/default-article.jpg',
      imageAlt: data.imageAlt || data.title,
      categoryId: category._id,
      categorySlug: data.categorySlug,
      subCategoryId: subCategoryId,
      subCategorySlug: data.subCategorySlug || null,
      author: data.author,
      authorRole: data.authorRole || 'Technology Expert',
      authorAvatar: data.authorAvatar || '',
      authorBio: data.authorBio || '',
      metaTitle: data.metaTitle || `${data.title} | 7pexel Technology Guides`,
      metaDescription: data.metaDescription || data.excerpt?.slice(0, 157) + '...' || '',
      keywords: data.keywords || [],
      canonicalUrl: data.canonicalUrl || `https://7pexel.com/technology/${slug}`,
      difficulty: data.difficulty || 'Intermediate',
      readTime: data.readTime || Math.ceil(data.content.split(/\s+/).length / 200) || 5,
      steps: data.steps || 0,
      tags: data.tags || [],
      isFeatured: data.isFeatured || false,
      isTrending: data.isTrending || false,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      isBreaking: data.isBreaking || false,
      isSponsored: data.isSponsored || false,
      structuredData: data.structuredData || null,
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      publishedAt: data.publishedAt || new Date(),
    };
    
    const article = new TechnologyArticle(articleData);
    await article.save();
    
    return article;
  }
  
  async updateArticle(slug: string, data: UpdateArticleData) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOne({ slug });
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    // Handle category change
    if (data.categorySlug && data.categorySlug !== article.categorySlug) {
      const category = await TechnologyCategory.findOne({
        slug: data.categorySlug,
        isActive: true,
      });
      
      if (!category) {
        throw new Error(`Category with slug '${data.categorySlug}' not found`);
      }
      
      data.categorySlug = category.slug;
    }
    
    // Handle slug change
    if (data.slug && data.slug !== article.slug) {
      const existing = await TechnologyArticle.findOne({ slug: data.slug });
      if (existing && existing._id.toString() !== article._id.toString()) {
        throw new Error(`Article with slug '${data.slug}' already exists`);
      }
    }
    
    const updatedArticle = await TechnologyArticle.findByIdAndUpdate(
      article._id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    return updatedArticle;
  }
  
  async deleteArticle(slug: string) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOne({ slug });
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    // Update category count
    await TechnologyCategory.findByIdAndUpdate(article.categoryId, {
      $inc: { articleCount: -1 },
    });
    
    await TechnologyArticle.findByIdAndDelete(article._id);
    
    return { message: 'Article deleted successfully' };
  }
  
  async filterArticles(filters: ArticleFilters) {
    return this.getAllArticles(filters);
  }
  
  async searchArticles(query: string, limit: number = 20, page: number = 1) {
    await connectToDatabase();
    
    if (!query || query.length < 2) {
      return this.getAllArticles({ limit, page });
    }
    
    const skip = (page - 1) * limit;
    
    const [articles, total] = await Promise.all([
      TechnologyArticle.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: query,
              path: ['title', 'excerpt', 'content', 'tags', 'keywords'],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $match: { isPublished: true } },
        { $addFields: { score: { $meta: 'searchScore' } } },
        { $sort: { score: -1, publishedAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'technologycategories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $lookup: {
            from: 'technologysubcategories',
            localField: 'subCategoryId',
            foreignField: '_id',
            as: 'subCategory',
          },
        },
        {
          $addFields: {
            categoryId: { $arrayElemAt: ['$category', 0] },
            subCategoryId: { $arrayElemAt: ['$subCategory', 0] },
          },
        },
        { $project: { category: 0, subCategory: 0 } },
      ]),
      TechnologyArticle.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: query,
              path: ['title', 'excerpt', 'content', 'tags', 'keywords'],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $match: { isPublished: true } },
        { $count: 'total' },
      ]),
    ]);
    
    const totalCount = total[0]?.total || 0;
    
    return {
      data: articles,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
      query,
    };
  }
  
  async getStats() {
    await connectToDatabase();
    
    const [total, published, featured, trending, views] = await Promise.all([
      TechnologyArticle.countDocuments(),
      TechnologyArticle.countDocuments({ isPublished: true }),
      TechnologyArticle.countDocuments({ isPublished: true, isFeatured: true }),
      TechnologyArticle.countDocuments({ isPublished: true, isTrending: true }),
      TechnologyArticle.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } },
      ]),
    ]);
    
    return {
      total,
      published,
      featured,
      trending,
      draft: total - published,
      totalViews: views[0]?.totalViews || 0,
    };
  }
  
  async incrementViews(slug: string) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    return article;
  }
  
  async incrementLikes(slug: string) {
    await connectToDatabase();
    
    const article = await TechnologyArticle.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    return article;
  }
}

export const technologyArticleService = new TechnologyArticleService();