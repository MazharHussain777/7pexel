// app/api/guides/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllGuideCategories,
  createGuideCategory,
  seedGuideCategories,
} from '@/lib/guide-service';
import dbConnect from '@/lib/mongodb';
import Guide from '@/models/Guide';

// ─── GET all categories ─────────────────────────────────
export async function GET() {
  try {
    await dbConnect();
    const categories = await getAllGuideCategories();
    
    // Get guide counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Guide.countDocuments({ 
          categorySlug: cat.slug, 
          published: true 
        });
        return { ...cat, count };
      })
    );
    
    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
      total: categoriesWithCounts.length,
    });
  } catch (error) {
    console.error('Error fetching guide categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guide categories' },
      { status: 500 }
    );
  }
}

// ─── POST create new category ──────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }
    
    // Generate href if not provided
    if (!body.href) {
      body.href = `/guides/category/${body.slug}`;
    }
    
    // Generate metaTitle if not provided
    if (!body.metaTitle && body.name) {
      body.metaTitle = `${body.name} Buying Guides — Expert Reviews & Comparisons | 7pexel`;
    }
    
    // Generate metaDescription if not provided
    if (!body.metaDescription && body.name) {
      body.metaDescription = `Expert ${body.name.toLowerCase()} buying guides, reviews, and comparisons. Find the best ${body.name.toLowerCase()} with our comprehensive guides.`;
    }
    
    // Set default gradient if not provided
    if (!body.gradient) {
      body.gradient = `from-[#0A3F26] via-[${body.color || '#0F6B3E'}] to-[#0A3F26]`;
    }
    
    const category = await createGuideCategory(body);
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Guide category created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating guide category:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Guide category with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create guide category' },
      { status: 500 }
    );
  }
}