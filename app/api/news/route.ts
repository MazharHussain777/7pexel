// app/api/news/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const slug = searchParams.get('slug');

    // Get single article by slug
    if (slug) {
      const article = await News.findOne({ slug, published: true }).lean();
      if (!article) {
        return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: article });
    }

    // Get all categories
    if (action === 'categories') {
      const categories = await News.distinct('category');
      const categoryData = await Promise.all(
        categories.map(async (cat) => {
          const count = await News.countDocuments({ category: cat, published: true });
          return { name: cat, count };
        })
      );
      return NextResponse.json({ success: true, data: categoryData });
    }

    // Get tags
    if (action === 'tags') {
      const tags = await News.distinct('tags');
      return NextResponse.json({ success: true, data: tags });
    }

    // Get articles by category
    if (category) {
      const articles = await News.find({ categorySlug: category, published: true })
        .sort({ isFeatured: -1, date: -1 })
        .lean();
      return NextResponse.json({ success: true, data: articles, count: articles.length });
    }

    // Build query for main feed
    const query: any = { published: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { categoryLabel: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (page - 1) * limit;
    
    const [articles, total] = await Promise.all([
      News.find(query)
        .sort({ isBreaking: -1, isFeatured: -1, date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: articles,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in news API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['slug', 'title', 'excerpt', 'category', 'categorySlug', 'categoryLabel', 'image', 'author', 'contentHtml'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await News.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Article with this slug already exists' },
        { status: 409 }
      );
    }

    // Set default values for optional fields
    const articleData = {
      ...body,
      categoryIcon: body.categoryIcon || '📰',
      categoryColor: body.categoryColor || '#0F6B3E',
      categoryDescription: body.categoryDescription || '',
      imageAlt: body.imageAlt || '',
      authorAvatar: body.authorAvatar || body.author?.charAt(0).toUpperCase() || '👤',
      authorBio: body.authorBio || '',
      date: body.date || new Date(),
      readTime: body.readTime || '3 min',
      level: body.level || 'Beginner',
      tags: body.tags || [],
      isFeatured: body.isFeatured || false,
      isTrending: body.isTrending || false,
      isBreaking: body.isBreaking || false,
      steps: body.steps || 0,
      difficulty: body.difficulty || 'Beginner',
      customStyles: body.customStyles || '',
      canonical: body.canonical || '',
      published: body.published !== undefined ? body.published : true,
      views: body.views || 0,
      structuredData: body.structuredData || null,
    };

    const article = await News.create(articleData);
    
    // Return the full article data
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Check if article exists
    const existing = await News.findOne({ slug });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Remove fields that shouldn't be updated
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    // Update the article
    const updated = await News.findOneAndUpdate(
      { slug },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      },
      { new: true, lean: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existing = await News.findOne({ slug });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article
    await News.deleteOne({ slug });

    return NextResponse.json({ 
      success: true, 
      message: 'Article deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}