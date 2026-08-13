// app/api/autos/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAutoBySlug,
  updateAuto,
  deleteAuto,
  getRelatedAutos,
  incrementAutoViews,
} from '@/lib/auto-service';
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

    const auto = await getAutoBySlug(slug);
    if (!auto) {
      return NextResponse.json(
        { success: false, error: 'Auto not found' },
        { status: 404 }
      );
    }

    incrementAutoViews(slug).catch(console.error);

    let response: any = { success: true, data: auto };

    if (related) {
      const relatedAutos = await getRelatedAutos(slug, limit);
      response.related = relatedAutos;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching auto:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch auto',
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

    const auto = await updateAuto(slug, body);
    if (!auto) {
      return NextResponse.json(
        { success: false, error: 'Auto not found' },
        { status: 404 }
      );
    }

    revalidatePath('/auto');
    revalidatePath(`/auto/${slug}`);

    return NextResponse.json({
      success: true,
      data: auto,
      message: 'Auto updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating auto:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Auto with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update auto',
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
    const deleted = await deleteAuto(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Auto not found' },
        { status: 404 }
      );
    }

    revalidatePath('/auto');

    return NextResponse.json({
      success: true,
      message: 'Auto deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting auto:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete auto',
      },
      { status: 500 }
    );
  }
}