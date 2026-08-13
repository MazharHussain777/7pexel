// app/api/categories/[slug]/route.ts

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug, getCategoryWithArticles, updateCategory, deleteCategory } from '@/lib/category-service';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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
      { status: 500 }
    );
  }
}