// app/api/technology/subcategories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { technologySubCategoryService } from '@/lib/services/technologySubCategoryService';

// GET all subcategories
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('category');
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    let subcategories;
    if (categorySlug) {
      subcategories = await technologySubCategoryService.getSubCategoriesByCategory(
        categorySlug,
        activeOnly
      );
    } else {
      subcategories = await technologySubCategoryService.getAllSubCategories(activeOnly);
    }
    
    return NextResponse.json({ success: true, data: subcategories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new subcategory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Use the new method that accepts categorySlug
    const subcategory = await technologySubCategoryService.createSubCategoryBySlug(body);
    
    return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}