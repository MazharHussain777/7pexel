// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";
import { Article } from "@/lib/models/Article";

// GET all categories
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const categories = await Category.find({ isActive: true })
      .sort({ articleCount: -1, name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

// POST - Create category
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const slug = body.slug || body.name.toLowerCase().replace(/\s+/g, "-");

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 409 }
      );
    }

    const category = new Category({
      ...body,
      slug,
      articleCount: 0,
    });

    await category.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create category",
      },
      { status: 500 }
    );
  }
}