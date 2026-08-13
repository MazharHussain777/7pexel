// app/api/news/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchArticles } from '@/lib/news-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const results = searchArticles(q);
    const paginated = results.slice(offset, offset + limit);

    return NextResponse.json({
      results: paginated,
      total: results.length,
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < results.length,
      },
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return NextResponse.json(
      { error: 'Failed to search articles' },
      { status: 500 }
    );
  }
}