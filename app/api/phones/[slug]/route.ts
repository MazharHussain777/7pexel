// app/api/phones/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getPhoneBySlug,
  updatePhone,
  deletePhone,
  getRelatedPhones,
} from '@/lib/phone-service';
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

    const phone = await getPhoneBySlug(slug);
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    let response: any = { success: true, data: phone };

    if (related) {
      const relatedPhones = await getRelatedPhones(slug, limit);
      response.related = relatedPhones;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching phone:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch phone',
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

    const phone = await updatePhone(slug, body);
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');
    revalidatePath(`/phones/finder/${slug}`);

    return NextResponse.json({
      success: true,
      data: phone,
      message: 'Phone updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating phone:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Phone with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update phone',
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
    const deleted = await deletePhone(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');

    return NextResponse.json({
      success: true,
      message: 'Phone deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting phone:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete phone',
      },
      { status: 500 }
    );
  }
}