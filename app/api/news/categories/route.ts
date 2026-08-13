// app/api/news/categories/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NewsCategory from '@/models/NewsCategory';
import News from '@/models/News';

// ─── GET: Fetch all categories ──────────────────────────────────
export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const includeCounts = searchParams.get('includeCounts') !== 'false';

    // Get single category by slug
    if (slug) {
      const category = await NewsCategory.findOne({ slug, isActive: true }).lean();
      if (!category) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        );
      }

      // Get article count for this category
      if (includeCounts) {
        const count = await News.countDocuments({ 
          categorySlug: slug, 
          published: true 
        });
        const newCount = await News.countDocuments({
          categorySlug: slug,
          published: true,
          date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        return NextResponse.json({ 
          success: true, 
          data: { ...category, count, newCount } 
        });
      }

      return NextResponse.json({ success: true, data: category });
    }

    // Get all categories
    const categories = await NewsCategory.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .lean();

    // Get article counts for each category
    if (includeCounts) {
      const categoriesWithCounts = await Promise.all(
        categories.map(async (cat) => {
          const count = await News.countDocuments({ 
            categorySlug: cat.slug, 
            published: true 
          });
          const newCount = await News.countDocuments({
            categorySlug: cat.slug,
            published: true,
            date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          });
          return { ...cat, count, newCount };
        })
      );
      return NextResponse.json({ success: true, data: categoriesWithCounts });
    }

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching news categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// ─── POST: Create a new category ────────────────────────────────
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'slug'];
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
    const existing = await NewsCategory.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    // Set default values
    const categoryData = {
      ...body,
      icon: body.icon || '📰',
      description: body.description || '',
      color: body.color || '#0F6B3E',
      gradient: body.gradient || 'from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A]',
      count: 0,
      newCount: 0,
      href: body.href || `/news/category/${body.slug}`,
      metaTitle: body.metaTitle || `${body.name} News | 7pexel`,
      metaDescription: body.metaDescription || `Latest ${body.name} news, reviews, and updates.`,
      keywords: body.keywords || [],
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: body.order || 0,
    };

    const category = await NewsCategory.create(categoryData);
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('Error creating news category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// ─── PUT: Update a category ──────────────────────────────────────
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
    
    // Check if category exists
    const existing = await NewsCategory.findOne({ slug });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check if new slug already exists
    if (body.slug && body.slug !== slug) {
      const slugExists = await NewsCategory.findOne({ slug: body.slug });
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Category with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Remove fields that shouldn't be updated
    const { _id, __v, createdAt, updatedAt, count, newCount, ...updateData } = body;

    // Update the category
    const updated = await NewsCategory.findOneAndUpdate(
      { slug },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      },
      { new: true, lean: true }
    );

    // Update href if slug changed
    if (body.slug && body.slug !== slug) {
      await NewsCategory.findOneAndUpdate(
        { slug: body.slug },
        { $set: { href: `/news/category/${body.slug}` } }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating news category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// ─── DELETE: Delete a category ──────────────────────────────────
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

    // Check if category exists
    const existing = await NewsCategory.findOne({ slug });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if there are articles in this category
    const articleCount = await News.countDocuments({ 
      categorySlug: slug, 
      published: true 
    });
    
    if (articleCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete category with ${articleCount} articles. Unpublish or reassign articles first.` 
        },
        { status: 409 }
      );
    }

    // Delete the category
    await NewsCategory.deleteOne({ slug });

    return NextResponse.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting news category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}