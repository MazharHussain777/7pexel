// app/api/compare/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCompareItems,
  getCompareItemBySlug,
  getCompareStats,
  getCompareCategories,
  getCompareBrands,
  getTopRatedCompareItems,
  getPopularCompareItems,
  getRelatedCompareItems,
  searchCompareItems,
} from '@/lib/compare-service';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const related = searchParams.get('related');
    const topRated = searchParams.get('topRated') === 'true';
    const popular = searchParams.get('popular') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') as 'rating' | 'price' | 'name' | 'newest' | undefined;

    // Get stats
    if (action === 'stats') {
      const stats = await getCompareStats();
      return NextResponse.json({ success: true, data: stats });
    }

    // Get categories
    if (action === 'categories') {
      const categories = await getCompareCategories();
      return NextResponse.json({ success: true, data: categories, total: categories.length });
    }

    // Get brands
    if (action === 'brands') {
      const brands = await getCompareBrands();
      return NextResponse.json({ success: true, data: brands, total: brands.length });
    }

    // Get single item by slug
    if (slug) {
      const item = await getCompareItemBySlug(slug);
      if (!item) {
        return NextResponse.json(
          { success: false, error: 'Compare item not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: item });
    }

    // Get related items
    if (related) {
      const items = await getRelatedCompareItems(related, parseInt(searchParams.get('limit') || '4'));
      return NextResponse.json({ success: true, data: items, total: items.length });
    }

    // Get top rated items
    if (topRated) {
      const items = await getTopRatedCompareItems(limit);
      return NextResponse.json({ success: true, data: items, total: items.length });
    }

    // Get popular items
    if (popular) {
      const items = await getPopularCompareItems(limit);
      return NextResponse.json({ success: true, data: items, total: items.length });
    }

    // Search items
    if (search) {
      const results = await searchCompareItems(search, limit);
      return NextResponse.json({ success: true, data: results, total: results.length });
    }

    // Get all items with filters
    const result = await getAllCompareItems({
      category: category || undefined,
      brand: brand || undefined,
      search: search || undefined,
      page,
      limit,
      sort,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.total,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching compare items:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch compare items',
      },
      { status: 500 }
    );
  }
}