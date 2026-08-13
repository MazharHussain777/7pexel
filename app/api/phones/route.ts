// app/api/phones/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPhones,
  createPhone,
  getPhoneBySlug,
  getPhoneStats,
  getPhoneByBrandAndModel,
  getBrands,
  getLatestPhones,
  getFeaturedPhones,
  getTrendingPhones,
  seedPhones,
  getRelatedPhones,
} from '@/lib/phone-service';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const slug = searchParams.get('slug');
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const latest = searchParams.get('latest') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') as 'rating' | 'year' | 'price' | 'newest' | undefined;
    const related = searchParams.get('related');

    // Seed phones
    if (action === 'seed') {
      const phones = await seedPhones();
      return NextResponse.json({
        success: true,
        message: `Seeded ${phones.length} phones`,
        data: phones,
        total: phones.length,
      });
    }

    // Get stats
    if (action === 'stats') {
      const stats = await getPhoneStats();
      return NextResponse.json({ success: true, data: stats });
    }

    // Get brands
    if (action === 'brands') {
      const brands = await getBrands();
      return NextResponse.json({ success: true, data: brands, total: brands.length });
    }

    // Get single phone by slug
    if (slug) {
      const phone = await getPhoneBySlug(slug);
      if (!phone) {
        return NextResponse.json(
          { success: false, error: 'Phone not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: phone });
    }

    // Get phone by brand and model
    if (brand && model) {
      const phone = await getPhoneByBrandAndModel(brand, model);
      if (!phone) {
        return NextResponse.json(
          { success: false, error: 'Phone not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: phone });
    }

    // Get related phones
    if (related) {
      const relatedPhones = await getRelatedPhones(related, parseInt(searchParams.get('limit') || '4'));
      return NextResponse.json({ success: true, data: relatedPhones, total: relatedPhones.length });
    }

    // Get latest phones
    if (latest) {
      const phones = await getLatestPhones(limit);
      return NextResponse.json({ success: true, data: phones, total: phones.length });
    }

    // Get featured phones
    if (featured) {
      const phones = await getFeaturedPhones(limit);
      return NextResponse.json({ success: true, data: phones, total: phones.length });
    }

    // Get trending phones
    if (trending) {
      const phones = await getTrendingPhones(limit);
      return NextResponse.json({ success: true, data: phones, total: phones.length });
    }

    // Get all phones with filters
    const result = await getAllPhones({
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
    console.error('Error fetching phones:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch phones',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'brand',
      'model',
      'year',
      'price',
      'image',
      'display',
      'displaySize',
      'camera',
      'cameraDetails',
      'battery',
      'chipset',
      'ram',
      'storage',
      'os',
      'weight',
      'contentHtml',
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

    const phone = await createPhone(body);

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');
    revalidatePath(`/phones/finder/${phone.slug}`);

    return NextResponse.json(
      {
        success: true,
        data: phone,
        message: 'Phone created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating phone:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Phone with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create phone',
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

    const { updatePhone } = await import('@/lib/phone-service');
    const phone = await updatePhone(slug, updates);

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');
    revalidatePath(`/phones/finder/${slug}`);
    if (updates.slug && updates.slug !== slug) {
      revalidatePath(`/phones/finder/${updates.slug}`);
    }

    return NextResponse.json({
      success: true,
      data: phone,
      message: 'Phone updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating phone:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Phone with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update phone',
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

    const { deletePhone } = await import('@/lib/phone-service');
    const deleted = await deletePhone(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');

    return NextResponse.json({
      success: true,
      message: 'Phone deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting phone:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete phone',
      },
      { status: 500 }
    );
  }
}