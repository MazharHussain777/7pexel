// app/api/compare/[slug]/route.ts

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import {
  getCompareItemBySlug,
  updateCompareItem,
  deleteCompareItem,
  getRelatedCompareItems,
  incrementCompareItemViews,
} from '@/lib/compare-service';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const related = searchParams.get('related') === 'true';
    const limit = parseInt(searchParams.get('limit') || '4');

    const item = await getCompareItemBySlug(slug);
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Compare item not found' },
        { status: 404 }
      );
    }

    // Increment views (async, don't wait)
    incrementCompareItemViews(slug).catch(console.error);

    let response: any = { success: true, data: item };

    if (related) {
      const relatedItems = await getRelatedCompareItems(slug, limit);
      response.related = relatedItems;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching compare item:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch compare item',
      },
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

    const item = await updateCompareItem(slug, body);
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Compare item not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/compare');
    revalidatePath(`/compare/${slug}`);

    return NextResponse.json({
      success: true,
      data: item,
      message: 'Compare item updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating compare item:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Compare item with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update compare item',
      },
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
    const deleted = await deleteCompareItem(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Compare item not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/compare');

    return NextResponse.json({
      success: true,
      message: 'Compare item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting compare item:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete compare item',
      },
      { status: 500 }
    );
  }
}