import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const subcategory = await TechnologySubCategory.findOne({ slug });
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // ✅ Return ALL fields
    return NextResponse.json({
      success: true,
      data: {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        metaTitle: subcategory.metaTitle,
        metaDescription: subcategory.metaDescription,
        keywords: subcategory.keywords,
        icon: subcategory.icon,
        color: subcategory.color,
        categoryId: subcategory.categoryId,
        categorySlug: subcategory.categorySlug,
        isActive: subcategory.isActive,
        order: subcategory.order,
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
        __v: subcategory.__v,
      },
    });

  } catch (error: any) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();

    const subcategory = await TechnologySubCategory.findOne({ slug });
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // ✅ Update with ALL fields
    const updated = await TechnologySubCategory.findByIdAndUpdate(
      subcategory._id,
      {
        $set: {
          name: body.name || subcategory.name,
          description: body.description || subcategory.description,
          metaTitle: body.metaTitle || subcategory.metaTitle,
          metaDescription: body.metaDescription || subcategory.metaDescription,
          keywords: body.keywords || subcategory.keywords,
          icon: body.icon || subcategory.icon,
          color: body.color || subcategory.color,
          isActive: body.isActive !== undefined ? body.isActive : subcategory.isActive,
          order: body.order !== undefined ? body.order : subcategory.order,
        },
      },
      { new: true }
    );

    // ✅ Return ALL fields
    return NextResponse.json({
      success: true,
      data: {
        _id: updated._id,
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        metaTitle: updated.metaTitle,
        metaDescription: updated.metaDescription,
        keywords: updated.keywords,
        icon: updated.icon,
        color: updated.color,
        categoryId: updated.categoryId,
        categorySlug: updated.categorySlug,
        isActive: updated.isActive,
        order: updated.order,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        __v: updated.__v,
      },
    });

  } catch (error: any) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const subcategory = await TechnologySubCategory.findOne({ slug });
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    await TechnologySubCategory.findByIdAndDelete(subcategory._id);

    return NextResponse.json({
      success: true,
      data: { message: 'Subcategory deleted successfully' },
    });

  } catch (error: any) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}