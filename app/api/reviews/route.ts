// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import Category from '@/models/Category';
import { revalidatePath } from 'next/cache';

// ─── GET all reviews ──────────────────────────────────
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({ published: true })
      .sort({ date: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: reviews,
      total: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// ─── POST create new review ──────────────────────────
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.slug || !body.categorySlug) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and category are required' },
        { status: 400 }
      );
    }
    
    // Get category info
    const category = await Category.findOne({ slug: body.categorySlug });
    if (category) {
      body.categoryLabel = category.name;
      body.categoryIcon = category.icon;
      body.categoryDescription = category.description;
    }
    
    const review = new Review(body);
    await review.save();
    
    // Update category count
    await Category.findOneAndUpdate(
      { slug: body.categorySlug },
      { $inc: { count: 1 } }
    );
    
    revalidatePath('/reviews');
    revalidatePath(`/reviews/category/${body.categorySlug}`);
    
    return NextResponse.json({
      success: true,
      data: review,
      message: 'Review created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating review:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Review with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}