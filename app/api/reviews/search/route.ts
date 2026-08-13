// app/api/reviews/search/route.ts

// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { searchReviews } from '@/app/reviews/data/reviews-db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const results = searchReviews(q, { category, limit });

    return NextResponse.json({
      results: results.slice(offset, offset + limit),
      total: results.length,
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < results.length,
      },
    });
  } catch (error) {
    console.error('Error searching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to search reviews' },
      { status: 500 }
    );
  }
}