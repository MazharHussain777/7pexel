// app/api/reviews/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Review } from '@/lib/models/Review';
import Category from '@/models/Category';

// ============================================
// GET - Get all reviews with filtering and pagination
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100");
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minRating = searchParams.get("minRating");
    const featured = searchParams.get("featured") === "true";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build query
    const query: any = {};

    // Only show published reviews by default
    if (searchParams.get("includeUnpublished") !== "true") {
      query.published = true;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (featured) {
      query.featured = true;
    }

    // Build sort
    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get total count
    const total = await Review.countDocuments(query);

    // Get reviews
    const reviews = await Review.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get categories for filter options
    const categories = await Review.distinct("category");

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        categories: categories.filter(Boolean),
        ratingOptions: [
          { label: "4.5+ Stars", value: 4.5 },
          { label: "4.0+ Stars", value: 4.0 },
          { label: "3.5+ Stars", value: 3.5 },
          { label: "3.0+ Stars", value: 3.0 },
        ],
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
        filters: { categories: [], ratingOptions: [] },
      },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Create a new review
// ============================================
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
          required: requiredFields,
          received: Object.keys(body),
        },
        { status: 400 }
      );
    }

    // Validate rating is between 0 and 5
    if (body.rating < 0 || body.rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 0 and 5" },
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

    // Check if review with same title already exists
    const existingTitle = await Review.findOne({ 
      title: body.title 
    });
    if (existingTitle) {
      return NextResponse.json(
        { success: false, error: `Review with title "${body.title}" already exists` },
        { status: 409 }
      );
    }

    // Set defaults
    const reviewData = {
      ...body,
      published: body.published !== undefined ? body.published : true,
      featured: body.featured || false,
      viewCount: body.viewCount || 0,
      likeCount: body.likeCount || 0,
      shareCount: body.shareCount || 0,
      comments: body.comments || [],
      tags: body.tags || [],
      affiliateLinks: body.affiliateLinks || [],
    };

    // Create new review
    const newReview = new Review(reviewData);
    await newReview.save();

    // Update category count if Category model exists
    try {
      if (body.categorySlug) {
        await Category.findOneAndUpdate(
          { slug: body.categorySlug },
          { $inc: { count: 1 } },
          { upsert: true }
        );
      }
    } catch (categoryError) {
      // Category model might not exist, continue anyway
      console.warn("Could not update category count:", categoryError);
    }

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating review:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          error: `A review with this ${field} already exists` 
        },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { 
          success: false, 
          error: errors.join(", ") 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to create review" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT - Update a review (by slug or ID)
// ============================================
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    const body = await request.json();

    let query: any = {};
    if (slug) query.slug = slug;
    else if (id) query._id = id;
    else {
      return NextResponse.json(
        { success: false, error: "Please provide either 'slug' or 'id' parameter" },
        { status: 400 }
      );
    }

    // Remove _id, __v, createdAt, updatedAt from update body
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    // Validate rating if provided
    if (updateData.rating !== undefined && (updateData.rating < 0 || updateData.rating > 5)) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 0 and 5" },
        { status: 400 }
      );
    }

    const review = await Review.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    console.error("Error updating review:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          error: `A review with this ${field} already exists` 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update review" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete reviews (by slug, IDs, or all)
// ============================================
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get("ids");
    const slug = searchParams.get("slug");
    const deleteAll = searchParams.get("all") === "true";
    const category = searchParams.get("category");

    // If deleteAll is true, delete all reviews (BE CAREFUL!)
    if (deleteAll) {
      // Optional: Add admin check here
      const result = await Review.deleteMany({});
      return NextResponse.json({
        success: true,
        message: `Deleted ${result.deletedCount} reviews`,
        deletedCount: result.deletedCount,
      });
    }

    // Delete by category
    if (category) {
      const result = await Review.deleteMany({ category });
      return NextResponse.json({
        success: true,
        message: `Deleted ${result.deletedCount} reviews in category "${category}"`,
        deletedCount: result.deletedCount,
      });
    }

    // Delete by slug
    if (slug) {
      const review = await Review.findOneAndDelete({ slug });
      if (!review) {
        return NextResponse.json(
          { success: false, error: `Review with slug "${slug}" not found` },
          { status: 404 }
        );
      }

      // Update category count if Category model exists
      try {
        if (review.categorySlug) {
          await Category.findOneAndUpdate(
            { slug: review.categorySlug },
            { $inc: { count: -1 } }
          );
        }
      } catch (categoryError) {
        // Category model might not exist, continue anyway
        console.warn("Could not update category count:", categoryError);
      }

      return NextResponse.json({
        success: true,
        message: `Review "${review.title}" deleted successfully`,
        data: review,
      });
    }

    // Delete by multiple IDs
    if (ids) {
      const idArray = ids.split(",").filter(Boolean);
      if (idArray.length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid IDs provided" },
          { status: 400 }
        );
      }

      const result = await Review.deleteMany({ 
        _id: { $in: idArray } 
      });

      return NextResponse.json({
        success: true,
        message: `Deleted ${result.deletedCount} reviews`,
        deletedCount: result.deletedCount,
      });
    }

    // No parameters provided
    return NextResponse.json(
      { 
        success: false, 
        error: "Please provide either 'slug', 'ids', 'category', or 'all=true' parameter" 
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error deleting reviews:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete reviews" },
      { status: 500 }
    );
  }
}