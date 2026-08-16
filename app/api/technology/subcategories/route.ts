import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('category');
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    const slug = searchParams.get('slug');

    if (slug) {
      const subcategory = await TechnologySubCategory.findOne({ slug });
      
      if (!subcategory) {
        return NextResponse.json(
          { success: false, error: 'Subcategory not found' },
          { status: 404 }
        );
      }

      // ✅ Return ALL fields
      return NextResponse.json({
        success: true,
        data: {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug,
          description: subcategory.description,
          metaTitle: subcategory.metaTitle,
          metaDescription: subcategory.metaDescription,
          keywords: subcategory.keywords,
          icon: subcategory.icon,
          color: subcategory.color,
          categoryId: subcategory.categoryId,
          categorySlug: subcategory.categorySlug,
          isActive: subcategory.isActive,
          order: subcategory.order,
          createdAt: subcategory.createdAt,
          updatedAt: subcategory.updatedAt,
          __v: subcategory.__v,
        },
      });
    }

    const query: any = {};
    if (activeOnly) query.isActive = true;
    if (categorySlug) query.categorySlug = categorySlug;

    const subcategories = await TechnologySubCategory.find(query)
      .sort({ order: 1, name: 1 })
      .lean();

    // ✅ Return ALL fields
    return NextResponse.json({
      success: true,
      data: subcategories.map((sub: any) => ({
        _id: sub._id,
        name: sub.name,
        slug: sub.slug,
        description: sub.description,
        metaTitle: sub.metaTitle,
        metaDescription: sub.metaDescription,
        keywords: sub.keywords,
        icon: sub.icon,
        color: sub.color,
        categoryId: sub.categoryId,
        categorySlug: sub.categorySlug,
        isActive: sub.isActive,
        order: sub.order,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
        __v: sub.__v,
      })),
      total: subcategories.length,
    });

  } catch (error: any) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.categorySlug) {
      return NextResponse.json(
        { success: false, error: 'categorySlug is required' },
        { status: 400 }
      );
    }

    // Find the category
    const category = await TechnologyCategory.findOne({ 
      slug: body.categorySlug,
      isActive: true 
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: `Category with slug '${body.categorySlug}' not found` },
        { status: 404 }
      );
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // ✅ Build complete data with ALL fields
    const subcategoryData = {
      name: body.name,
      slug: body.slug,
      description: body.description || `${body.name} - Expert guides and tutorials`,
      metaTitle: body.metaTitle || `${body.name} — Expert Guides & Tutorials | 7pexel`,
      metaDescription: body.metaDescription || `Expert ${body.name.toLowerCase()} guides, tutorials, and best practices. Learn ${body.name.toLowerCase()} with our comprehensive resources.`,
      keywords: body.keywords || [],
      icon: body.icon || 'fa-tag',
      color: body.color || '#6C3CE1',
      categoryId: category._id,
      categorySlug: body.categorySlug,
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: body.order || 0,
    };

    // Check if subcategory already exists
    const existing = await TechnologySubCategory.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Subcategory with slug '${body.slug}' already exists` },
        { status: 409 }
      );
    }

    // Create the subcategory
    const subcategory = new TechnologySubCategory(subcategoryData);
    await subcategory.save();

    // ✅ Return complete response with ALL fields
    return NextResponse.json({
      success: true,
      data: {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        metaTitle: subcategory.metaTitle,
        metaDescription: subcategory.metaDescription,
        keywords: subcategory.keywords,
        icon: subcategory.icon,
        color: subcategory.color,
        categoryId: subcategory.categoryId,
        categorySlug: subcategory.categorySlug,
        isActive: subcategory.isActive,
        order: subcategory.order,
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
        __v: subcategory.__v,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}