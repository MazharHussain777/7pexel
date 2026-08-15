// app/api/technology/subcategories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { technologySubCategoryService } from '@/lib/services/technologySubCategoryService';

// GET subcategory by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // ✅ Must await params to access slug
    const { slug } = await params;
    const subcategory = await technologySubCategoryService.getSubCategoryBySlug(slug);
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: subcategory });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update subcategory by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // ✅ Must await params to access slug
    const { slug } = await params;
    const body = await request.json();
    
    const subcategory = await technologySubCategoryService.updateSubCategoryBySlug(slug, body);
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: subcategory });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete subcategory by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // ✅ Must await params to access slug
    const { slug } = await params;
    
    const subcategory = await technologySubCategoryService.deleteSubCategoryBySlug(slug);
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: subcategory });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}