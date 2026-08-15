// app/api/technology/categories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';
import TechnologyArticle from '@/lib/models/TechnologyArticle';

// GET category by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    
    // ✅ Must await params to access slug
    const { slug } = await params;
    
    const category = await TechnologyCategory.findOne({ slug, isActive: true });
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const subcategories = await TechnologySubCategory.find({
      categoryId: category._id,
      isActive: true,
    }).sort({ order: 1, name: 1 });

    const articles = await TechnologyArticle.find({
      categoryId: category._id,
      isPublished: true,
    })
    .sort({ publishedAt: -1 })
    .limit(10);

    return NextResponse.json({
      success: true,
      data: {
        ...category.toObject(),
        subcategoryCount: subcategories.length,
        articleCount: articles.length,
        subcategories,
        articles,
      },
    });
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update category by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    
    // ✅ Must await params to access slug
    const { slug } = await params;
    const body = await request.json();
    
    const category = await TechnologyCategory.findOne({ slug });
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const updatedCategory = await TechnologyCategory.findByIdAndUpdate(
      category._id,
      body,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update category' },
      { status: 400 }
    );
  }
}

// DELETE - Delete category by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    
    // ✅ Must await params to access slug
    const { slug } = await params;
    
    const category = await TechnologyCategory.findOne({ slug });
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    await TechnologyCategory.findByIdAndDelete(category._id);
    
    return NextResponse.json({
      success: true,
      data: { message: 'Category deleted successfully' },
    });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}