<<<<<<< HEAD
// app/api/categories/[slug]/route.ts

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug, getCategoryWithArticles, updateCategory, deleteCategory } from '@/lib/category-service';
import { revalidatePath } from 'next/cache';

=======
// @ts-nocheck
// app/api/categories/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";

// ============================================
// GET - Get single category by slug
// ============================================
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
<<<<<<< HEAD
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const includeArticles = searchParams.get('includeArticles') === 'true';
    
    const category = includeArticles 
      ? await getCategoryWithArticles(slug)
      : await getCategoryBySlug(slug);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    // Get category by slug to get ID
    const existing = await getCategoryBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    const updated = await updateCategory(existing.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update category' }, { status: 404 });
    }
    
    revalidatePath('/news');
    revalidatePath(`/news/category/${slug}`);
    if (body.slug && body.slug !== slug) {
      revalidatePath(`/news/category/${body.slug}`);
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
=======
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
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
=======
// ============================================
// DELETE - Delete category by slug
// ============================================
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
<<<<<<< HEAD
    const { slug } = await params;
    
    const existing = await getCategoryBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    await deleteCategory(existing.id);
    revalidatePath('/news');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete category' },
=======
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
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}