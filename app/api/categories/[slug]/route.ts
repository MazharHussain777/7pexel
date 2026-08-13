// app/api/categories/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";

// ============================================
// GET - Get single category by slug
// ============================================
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const includeArticles = searchParams.get("includeArticles") === "true";
    const includeInactive = searchParams.get("includeInactive") === "true";

    // Build query
    let query: any = { slug };
    if (!includeInactive) {
      query.isActive = true;
    }

    const category = await Category.findOne(query).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // If includeArticles is true, fetch articles for this category
    let articles = [];
    if (includeArticles) {
      try {
        // Import dynamically to avoid circular dependencies
        const { Review } = await import("@/lib/models/Review");
        articles = await Review.find({ 
          category: category.name,
          published: true 
        })
        .sort({ date: -1 })
        .limit(20)
        .lean();
      } catch (error) {
        console.warn("Could not fetch articles for category:", error);
      }
    }

    return NextResponse.json({
      success: true,
      data: category,
      ...(includeArticles && { articles }),
    });
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT - Update category by slug
// ============================================
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const body = await request.json();

    // Find the category
    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Remove _id, __v, createdAt, updatedAt from update body
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    // If name is being updated, check for duplicates
    if (updateData.name && updateData.name !== category.name) {
      const existing = await Category.findOne({
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: category._id }
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: `Category "${updateData.name}" already exists` },
          { status: 409 }
        );
      }
    }

    // If slug is being updated, check for duplicates
    if (updateData.slug && updateData.slug !== category.slug) {
      const existing = await Category.findOne({
        slug: updateData.slug,
        _id: { $ne: category._id }
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: `Category with slug "${updateData.slug}" already exists` },
          { status: 409 }
        );
      }
    }

    // Update the category
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error("Error updating category:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Category with this name or slug already exists" 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete category by slug
// ============================================
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const force = searchParams.get("force") === "true";

    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category has articles
    if (category.articleCount > 0 && !force) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Category "${category.label}" has ${category.articleCount} articles. Use force=true to delete anyway.`,
          articleCount: category.articleCount,
        },
        { status: 409 }
      );
    }

    // If force is true, delete permanently
    if (force) {
      await Category.findOneAndDelete({ slug });
      return NextResponse.json({
        success: true,
        message: `Category "${category.label}" deleted permanently`,
      });
    }

    // Otherwise, soft delete (deactivate)
    category.isActive = false;
    await category.save();

    return NextResponse.json({
      success: true,
      message: `Category "${category.label}" deactivated`,
      data: category,
    });
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}