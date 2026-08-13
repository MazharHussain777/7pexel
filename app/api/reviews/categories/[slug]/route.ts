// app/api/reviews/categories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Review from '@/models/Review';
import { revalidatePath } from 'next/cache';

// ─── GET single category ────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    
    const category = await Category.findOne({ slug }).lean();
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Get review count
    const count = await Review.countDocuments({ 
      categorySlug: slug, 
      published: true 
    });
    category.count = count;
    
    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// ─── PUT update category ────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    const body = await request.json();
    
    // If slug is being updated, update href
    if (body.slug && body.slug !== slug) {
      body.href = `/reviews/category/${body.slug}`;
    }
    
    const category = await Category.findOneAndUpdate(
      { slug },
      { $set: { ...body, updatedAt: new Date() } },
      { new: true }
    ).lean();
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    revalidatePath('/reviews');
    revalidatePath(`/reviews/category/${slug}`);
    if (body.slug) {
      revalidatePath(`/reviews/category/${body.slug}`);
    }
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating category:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// ─── DELETE category ────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    
    // Check if category has reviews
    const reviewCount = await Review.countDocuments({ 
      categorySlug: slug,
      published: true 
    });
    
    if (reviewCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete category with ${reviewCount} reviews. Archive or reassign reviews first.` 
        },
        { status: 409 }
      );
    }
    
    const result = await Category.deleteOne({ slug });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    revalidatePath('/reviews');
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}