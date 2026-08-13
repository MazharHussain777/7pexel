// app/api/autos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllAutos,
  createAuto,
  getAutoBySlug,
  getAutoStats,
  getAutoBrands,
  getLatestAutos,
  getFeaturedAutos,
  getTrendingAutos,
  seedAutos,
  getRelatedAutos,
  getAutoCategories,
} from '@/lib/auto-service';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const slug = searchParams.get('slug');
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const latest = searchParams.get('latest') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') as 'rating' | 'price' | 'year' | 'newest' | 'popular' | undefined;
    const related = searchParams.get('related');

    if (action === 'seed') {
      const autos = await seedAutos();
      return NextResponse.json({
        success: true,
        message: `Seeded ${autos.length} autos`,
        data: autos,
        total: autos.length,
      });
    }

    if (action === 'stats') {
      const stats = await getAutoStats();
      return NextResponse.json({ success: true, data: stats });
    }

    if (action === 'brands') {
      const brands = await getAutoBrands();
      return NextResponse.json({ success: true, data: brands, total: brands.length });
    }

    if (action === 'categories') {
      const categories = await getAutoCategories();
      return NextResponse.json({ success: true, data: categories, total: categories.length });
    }

    if (slug) {
      const auto = await getAutoBySlug(slug);
      if (!auto) {
        return NextResponse.json(
          { success: false, error: 'Auto not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: auto });
    }

    if (related) {
      const relatedAutos = await getRelatedAutos(related, parseInt(searchParams.get('limit') || '4'));
      return NextResponse.json({ success: true, data: relatedAutos, total: relatedAutos.length });
    }

    if (latest) {
      const autos = await getLatestAutos(limit);
      return NextResponse.json({ success: true, data: autos, total: autos.length });
    }

    if (featured) {
      const autos = await getFeaturedAutos(limit);
      return NextResponse.json({ success: true, data: autos, total: autos.length });
    }

    if (trending) {
      const autos = await getTrendingAutos(limit);
      return NextResponse.json({ success: true, data: autos, total: autos.length });
    }

    const result = await getAllAutos({
      brand: brand || undefined,
      category: category || undefined,
      year: year || undefined,
      featured,
      trending,
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
    console.error('Error fetching autos:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch autos',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = [
      'brand',
      'model',
      'year',
      'price',
      'image',
      'range',
      'acceleration',
      'topSpeed',
      'battery',
      'drivetrain',
      'seating',
      'cargo',
      'charging',
      'excerpt',
      'contentHtml',
      'country',
      'founded',
      'logo',
      'grad',
      'color',
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

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

    const auto = await createAuto(body);

    revalidatePath('/auto');
    revalidatePath(`/auto/${auto.slug}`);

    return NextResponse.json(
      {
        success: true,
        data: auto,
        message: 'Auto created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating auto:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Auto with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create auto',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const { updateAuto } = await import('@/lib/auto-service');
    const auto = await updateAuto(slug, updates);

    if (!auto) {
      return NextResponse.json(
        { success: false, error: 'Auto not found' },
        { status: 404 }
      );
    }

    revalidatePath('/auto');
    revalidatePath(`/auto/${slug}`);
    if (updates.slug && updates.slug !== slug) {
      revalidatePath(`/auto/${updates.slug}`);
    }

    return NextResponse.json({
      success: true,
      data: auto,
      message: 'Auto updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating auto:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Auto with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update auto',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const { deleteAuto } = await import('@/lib/auto-service');
    const deleted = await deleteAuto(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Auto not found' },
        { status: 404 }
      );
    }

    revalidatePath('/auto');

    return NextResponse.json({
      success: true,
      message: 'Auto deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting auto:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete auto',
      },
      { status: 500 }
    );
  }
}