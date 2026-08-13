// app/api/guides/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllGuides,
  createGuide,
  getGuideBySlug,
  getGuidesByCategory,
  searchGuides,
  getFeaturedGuides,
  getTrendingGuides,
  getAllGuideTags,
  getGuideStats,
  seedGuideCategories,
} from '@/lib/guide-service';
import { revalidatePath } from 'next/cache';

// ─── GET ──────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    // Seed categories
    if (action === 'seed-categories') {
      const categories = await seedGuideCategories();
      return NextResponse.json({ 
        success: true, 
        message: 'Guide categories seeded successfully', 
        categories 
      });
    }

    // Get stats
    if (action === 'stats') {
      const stats = await getGuideStats();
      return NextResponse.json(stats);
    }

    // Get tags
    if (action === 'tags') {
      const tags = await getAllGuideTags();
      return NextResponse.json({ success: true, data: tags, total: tags.length });
    }

    // Get single guide by slug
    if (slug) {
      const guide = await getGuideBySlug(slug);
      if (!guide) {
        return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: guide });
    }

    // Get featured guides
    if (featured) {
      const guides = await getFeaturedGuides(limit);
      return NextResponse.json({ success: true, data: guides, total: guides.length });
    }

    // Get trending guides
    if (trending) {
      const guides = await getTrendingGuides(limit);
      return NextResponse.json({ success: true, data: guides, total: guides.length });
    }

    // Search guides
    if (search) {
      const results = await searchGuides(search);
      return NextResponse.json({ 
        success: true, 
        data: results, 
        total: results.length 
      });
    }

    // Get guides by category
    if (category) {
      const guides = await getGuidesByCategory(category);
      return NextResponse.json({ success: true, data: guides, total: guides.length });
    }

    // Get all guides with pagination
    const result = await getAllGuides({ page, limit });
    return NextResponse.json({
      success: true,
      data: result.guides,
      total: result.total,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch guides' 
      },
      { status: 500 }
    );
  }
}

// ─── POST ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = ['title', 'excerpt', 'category', 'categorySlug', 'author', 'contentHtml'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          required: requiredFields,
          received: Object.keys(body),
        },
        { status: 400 }
      );
    }

    const newGuide = await createGuide(body);
    revalidatePath('/guides');
    revalidatePath(`/guides/category/${body.categorySlug}`);
    
    return NextResponse.json({ 
      success: true, 
      data: newGuide, 
      message: 'Guide created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create guide' 
      },
      { status: 500 }
    );
  }
}