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
      { status: 500 }
    );
  }
}

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
      { status: 500 }
    );
  }
}