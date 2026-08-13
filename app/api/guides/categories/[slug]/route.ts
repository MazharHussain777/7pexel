// app/api/guides/categories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GuideCategory from '@/models/GuideCategory';
import Guide from '@/models/Guide';
import { revalidatePath } from 'next/cache';

// ─── GET single category ──────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    const category = await GuideCategory.findOne({ slug }).lean();
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Guide category not found' },
        { status: 404 }
      );
    }
    
    // Get guide count
    const count = await Guide.countDocuments({ 
      categorySlug: slug, 
      published: true 
    });
    
    return NextResponse.json({
      success: true,
      data: { ...category, count },
    });
  } catch (error) {
    console.error('Error fetching guide category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guide category' },
      { status: 500 }
    );
  }
}

// ─── PUT update category ──────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();
    
    // If slug is being updated, update href
    if (body.slug && body.slug !== slug) {
      body.href = `/guides/category/${body.slug}`;
    }
    
    const category = await GuideCategory.findOneAndUpdate(
      { slug },
      { $set: { ...body, updatedAt: new Date() } },
      { new: true }
    ).lean();
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Guide category not found' },
        { status: 404 }
      );
    }
    
    revalidatePath('/guides');
    revalidatePath(`/guides/category/${slug}`);
    if (body.slug) {
      revalidatePath(`/guides/category/${body.slug}`);
    }
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Guide category updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating guide category:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Guide category with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update guide category' },
      { status: 500 }
    );
  }
}

// ─── DELETE category ──────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    // Check if category has guides
    const guideCount = await Guide.countDocuments({ 
      categorySlug: slug,
      published: true 
    });
    
    if (guideCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete category with ${guideCount} guides. Archive or reassign guides first.` 
        },
        { status: 409 }
      );
    }
    
    const result = await GuideCategory.deleteOne({ slug });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Guide category not found' },
        { status: 404 }
      );
    }
    
    revalidatePath('/guides');
    
    return NextResponse.json({
      success: true,
      message: 'Guide category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting guide category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete guide category' },
      { status: 500 }
    );
  }
}