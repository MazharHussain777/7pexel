// app/api/reviews/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Review from '@/models/Review';

// ─── GET all categories ─────────────────────────────
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    
    // Get review counts for each category
    for (const cat of categories) {
      const count = await Review.countDocuments({ 
        categorySlug: cat.slug, 
        published: true 
      });
      cat.count = count;
    }
    
    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// ─── POST create new category ────────────────────────
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }
    
    // Generate href if not provided
    if (!body.href) {
      body.href = `/reviews/category/${body.slug}`;
    }
    
    // Generate metaTitle if not provided
    if (!body.metaTitle && body.name) {
      body.metaTitle = `${body.name} Reviews — Expert Reviews & Ratings | 7pexel`;
    }
    
    // Generate metaDescription if not provided
    if (!body.metaDescription && body.name) {
      body.metaDescription = `Read expert ${body.name.toLowerCase()} reviews with honest ratings, pros & cons, and buying advice.`;
    }
    
    // Set default gradient if not provided
    if (!body.gradient) {
      body.gradient = `from-[#0A3F26] via-[${body.color || '#0F6B3E'}] to-[#0A3F26]`;
    }
    
    const category = new Category(body);
    await category.save();
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}