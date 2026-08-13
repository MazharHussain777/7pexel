// app/api/reviews/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import { revalidatePath } from 'next/cache';

// ─── GET single review ──────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    
    const review = await Review.findOne({ slug, published: true }).lean();
    
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// ─── PUT update review ──────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    const body = await request.json();
    
    const review = await Review.findOneAndUpdate(
      { slug },
      { $set: { ...body, updatedAt: new Date() } },
      { new: true }
    ).lean();
    
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    revalidatePath('/reviews');
    revalidatePath(`/reviews/${slug}`);
    if (body.categorySlug) {
      revalidatePath(`/reviews/category/${body.categorySlug}`);
    }
    
    return NextResponse.json({
      success: true,
      data: review,
      message: 'Review updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update review' },
      { status: 500 }
    );
  }
}

// ─── DELETE review ──────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;
    
    const review = await Review.findOne({ slug });
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Get category slug before deleting
    const categorySlug = review.categorySlug;
    
    await Review.deleteOne({ slug });
    
    // Update category count
    await Category.findOneAndUpdate(
      { slug: categorySlug },
      { $inc: { count: -1 } }
    );
    
    revalidatePath('/reviews');
    revalidatePath(`/reviews/category/${categorySlug}`);
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}