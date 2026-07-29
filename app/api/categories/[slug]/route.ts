// @ts-nocheck
// app/api/categories/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";

// ============================================
// GET - Get single category by slug
// ============================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;

    const category = await Category.findOne({ slug, isActive: true }).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
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
// DELETE - Delete category by slug
// ============================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const force = searchParams.get("force") === "true";

    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

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

    if (force) {
      await Category.findOneAndDelete({ slug });
      return NextResponse.json({
        success: true,
        message: `Category "${category.label}" deleted permanently`,
      });
    } else {
      category.isActive = false;
      await category.save();
      return NextResponse.json({
        success: true,
        message: `Category "${category.label}" deactivated`,
        data: category,
      });
    }
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}