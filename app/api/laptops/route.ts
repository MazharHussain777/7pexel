// app/api/laptops/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Laptop from '@/models/Laptop';
import { revalidatePath } from 'next/cache';

// ─── GET all laptops ──────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') as 'rating' | 'year' | 'price' | undefined;

    // Build query
    const query: any = { published: true };

    // Get single laptop by slug
    if (slug) {
      const laptop = await Laptop.findOne({ slug, published: true }).lean();
      if (!laptop) {
        return NextResponse.json({ error: 'Laptop not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: laptop });
    }

    // Filter by brand
    if (brand) {
      query.brand = brand;
    }

    // Filter by category
    if (category) {
      query.category = { $in: [category] };
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Filter by trending
    if (trending) {
      query.isTrending = true;
    }

    // Search
    if (search) {
      query.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { processor: { $regex: search, $options: 'i' } },
        { category: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Sort options
    const sortOptions: any = {};
    if (sort === 'rating') {
      sortOptions.rating = -1;
    } else if (sort === 'price') {
      sortOptions.price = 1;
    } else if (sort === 'year') {
      sortOptions.year = -1;
    } else {
      sortOptions.year = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [laptops, total] = await Promise.all([
      Laptop.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Laptop.countDocuments(query),
    ]);

    // Get all brands for stats
    const brands = await Laptop.distinct('brand', { published: true });

    return NextResponse.json({
      success: true,
      data: laptops,
      total,
      brands: brands.length,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching laptops:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch laptops' },
      { status: 500 }
    );
  }
}

// ─── POST create new laptop ──────────────────────────
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'brand', 'model', 'year', 'price', 'image', 'display', 
      'processor', 'ram', 'storage', 'graphics', 'battery', 
      'weight', 'os', 'contentHtml'
    ];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          required: requiredFields,
          received: Object.keys(body),
        },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = `${body.brand}-${body.model}`.toLowerCase().replace(/\s+/g, '-');
    }

    // Generate id if not provided
    if (!body.id) {
      body.id = body.slug;
    }

    // Set defaults
    body.published = body.published !== undefined ? body.published : true;
    body.isFeatured = body.isFeatured || false;
    body.isTrending = body.isTrending || false;
    body.rating = body.rating || 0;
    body.category = body.category || [];
    body.colors = body.colors || [];
    body.highlights = body.highlights || [];
    body.pros = body.pros || [];
    body.cons = body.cons || [];
    body.date = body.date || new Date();
    body.readTime = body.readTime || '5 min read';
    body.author = body.author || '7pexel Team';
    body.authorAvatar = body.authorAvatar || '7P';

    const laptop = new Laptop(body);
    await laptop.save();

    revalidatePath('/laptops');
    revalidatePath('/laptops/finder');

    return NextResponse.json({
      success: true,
      data: laptop,
      message: 'Laptop created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating laptop:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Laptop with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create laptop' },
      { status: 500 }
    );
  }
}

// ─── PUT update laptop ──────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const laptop = await Laptop.findOneAndUpdate(
      { slug },
      { $set: { ...updates, updatedAt: new Date() } },
      { new: true }
    ).lean();

    if (!laptop) {
      return NextResponse.json({ error: 'Laptop not found' }, { status: 404 });
    }

    revalidatePath('/laptops');
    revalidatePath(`/laptops/finder/${slug}`);
    revalidatePath('/laptops/finder');

    return NextResponse.json({
      success: true,
      data: laptop,
      message: 'Laptop updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating laptop:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update laptop' },
      { status: 500 }
    );
  }
}

// ─── DELETE laptop ──────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const result = await Laptop.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Laptop not found' }, { status: 404 });
    }

    revalidatePath('/laptops');
    revalidatePath('/laptops/finder');

    return NextResponse.json({
      success: true,
      message: 'Laptop deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting laptop:', error);
    return NextResponse.json(
      { error: 'Failed to delete laptop' },
      { status: 500 }
    );
  }
}