<<<<<<< HEAD
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
=======
// @ts-nocheck
// app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Review } from "@/lib/models/Review";

// GET all reviews with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100");
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minRating = searchParams.get("minRating");

    // Build query
    const query: any = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Get total count
    const total = await Review.countDocuments(query);

    // Get reviews
    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch reviews",
        data: [],
        pagination: { total: 0, page: 1, limit: 100, totalPages: 0 },
      },
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
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
=======
// POST - Add new review
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title", "slug", "category", "rating", "author",
      "date", "image", "excerpt", "pros", "cons",
      "price", "verdict", "fullReview"
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if review with same slug already exists
    const existingReview = await Review.findOne({ slug: body.slug });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: `Review with slug "${body.slug}" already exists` },
        { status: 409 }
      );
    }

    // Create new review
    const newReview = new Review(body);
    await newReview.save();

    return NextResponse.json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add review" },
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}