// app/api/technology/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyArticle from '@/lib/models/TechnologyArticle';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';
import mongoose from 'mongoose';

// ─── GET ARTICLES ───────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    
    // ─── PAGINATION ──────────────────────────────────
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
    const skip = (page - 1) * limit;
    
    // ─── FILTERS ─────────────────────────────────────
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const difficulty = searchParams.get('difficulty');
    const author = searchParams.get('author');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const published = searchParams.get('isPublished') !== 'false';
    const searchQuery = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const slug = searchParams.get('slug');
    const isBreaking = searchParams.get('isBreaking') === 'true';
    const isSponsored = searchParams.get('isSponsored') === 'true';
    
    // ─── SINGLE ARTICLE BY SLUG ────────────────────
    if (slug) {
      const article = await TechnologyArticle.findOne({ slug })
        .populate('categoryId', 'name slug color icon')
        .populate('subCategoryId', 'name slug color icon');
      
      if (!article) {
        return NextResponse.json(
          { success: false, error: 'Article not found' },
          { status: 404 }
        );
      }
      
      // Increment views
      await article.incrementViews();
      
      return NextResponse.json({
        success: true,
        data: article,
      });
    }
    
    // ─── BUILD QUERY ─────────────────────────────────
    const query: any = {};
    
    if (category) query.categorySlug = category;
    if (subCategory) query.subCategorySlug = subCategory;
    if (difficulty) query.difficulty = difficulty;
    if (author) query.author = { $regex: author, $options: 'i' };
    if (featured) query.isFeatured = true;
    if (trending) query.isTrending = true;
    if (published) query.isPublished = true;
    if (isBreaking) query.isBreaking = true;
    if (isSponsored) query.isSponsored = true;
    if (tags && tags.length > 0) query.tags = { $in: tags };
    
    // ─── TEXT SEARCH ─────────────────────────────────
    let sortOptions: any = { publishedAt: -1 };
    let searchResults: any = null;
    
    if (searchQuery && searchQuery.length >= 2) {
      searchResults = await TechnologyArticle.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: searchQuery,
              path: ['title', 'excerpt', 'content', 'tags', 'keywords'],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $match: query },
        { 
          $addFields: { 
            score: { $meta: 'searchScore' } 
          } 
        },
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
      ]);
      
      // Get total count for pagination
      const totalResult = await TechnologyArticle.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: searchQuery,
              path: ['title', 'excerpt', 'content', 'tags', 'keywords'],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $match: query },
        { $count: 'total' },
      ]);
      
      const total = totalResult[0]?.total || 0;
      
      return NextResponse.json({
        success: true,
        data: searchResults,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
        searchQuery,
      });
    }
    
    // ─── REGULAR QUERY ───────────────────────────────
    const [articles, total] = await Promise.all([
      TechnologyArticle.find(query)
        .populate('categoryId', 'name slug color icon')
        .populate('subCategoryId', 'name slug color icon')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      TechnologyArticle.countDocuments(query),
    ]);
    
    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
    
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// ─── CREATE ARTICLE ────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    console.log('📝 Creating article:', JSON.stringify(body, null, 2));
    
    // ─── VALIDATE REQUIRED FIELDS ──────────────────
    const requiredFields = ['title', 'content', 'author', 'categorySlug'];
    const missing = requiredFields.filter(f => !body[f]);
    
    if (missing.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missing.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // ─── FIND CATEGORY ──────────────────────────────
    let category;
    if (body.categoryId) {
      category = await TechnologyCategory.findById(body.categoryId);
    } else if (body.categorySlug) {
      category = await TechnologyCategory.findOne({
        slug: body.categorySlug,
        isActive: true,
      });
    }
    
    if (!category) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Category with slug '${body.categorySlug}' not found` 
        },
        { status: 404 }
      );
    }
    
    // ─── FIND SUBCATEGORY (if provided) ─────────────
    let subCategory = null;
    if (body.subCategoryId) {
      subCategory = await TechnologySubCategory.findById(body.subCategoryId);
    } else if (body.subCategorySlug) {
      subCategory = await TechnologySubCategory.findOne({
        slug: body.subCategorySlug,
        isActive: true,
      });
    }
    
    // ─── GENERATE SLUG ──────────────────────────────
    let slug = body.slug;
    if (!slug) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Ensure unique slug
      let existing = await TechnologyArticle.findOne({ slug });
      let counter = 1;
      while (existing) {
        slug = `${slug}-${counter}`;
        existing = await TechnologyArticle.findOne({ slug });
        counter++;
      }
    } else {
      // Check if slug is already taken
      const existing = await TechnologyArticle.findOne({ slug });
      if (existing) {
        return NextResponse.json(
          { success: false, error: `Article with slug '${slug}' already exists` },
          { status: 409 }
        );
      }
    }
    
    // ─── BUILD ARTICLE DATA ──────────────────────────
    const articleData = {
      // Basic Info
      title: body.title,
      slug,
      excerpt: body.excerpt || body.content.slice(0, 200).replace(/<[^>]*>/g, '').slice(0, 200) + '...',
      content: body.content,
      
      // Images
      image: body.image || '/images/default-article.jpg',
      imageAlt: body.imageAlt || body.title,
      
      // Category & Subcategory
      categoryId: category._id,
      categorySlug: category.slug,
      subCategoryId: subCategory?._id || null,
      subCategorySlug: subCategory?.slug || null,
      
      // Author
      author: body.author,
      authorRole: body.authorRole || 'Technology Expert',
      authorAvatar: body.authorAvatar || '',
      authorBio: body.authorBio || '',
      
      // Metadata
      metaTitle: body.metaTitle || `${body.title} | 7pexel Technology Guides`,
      metaDescription: body.metaDescription || body.excerpt?.slice(0, 157) + '...' || '',
      keywords: body.keywords || [],
      canonicalUrl: body.canonicalUrl || `https://7pexel.com/technology/${slug}`,
      
      // Content Metadata
      difficulty: body.difficulty || 'Intermediate',
      readTime: body.readTime || Math.ceil(body.content.split(/\s+/).length / 200) || 5,
      steps: body.steps || 0,
      tags: body.tags || [],
      
      // Flags
      isFeatured: body.isFeatured || false,
      isTrending: body.isTrending || false,
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      isBreaking: body.isBreaking || false,
      isSponsored: body.isSponsored || false,
      
      // Structured Data
      structuredData: body.structuredData || null,
      
      // Stats (initialize at 0)
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      
      // Publishing
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    };
    
    // ─── CREATE ARTICLE ──────────────────────────────
    const article = new TechnologyArticle(articleData);
    await article.save();
    
    // ─── POPULATE FOR RESPONSE ──────────────────────
    const populated = await TechnologyArticle.findById(article._id)
      .populate('categoryId', 'name slug color icon')
      .populate('subCategoryId', 'name slug color icon');
    
    return NextResponse.json({
      success: true,
      data: populated,
      message: 'Article created successfully',
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create article',
        details: error.errors,
      },
      { status: 500 }
    );
  }
}