// app/api/technology/articles/filter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { technologyArticleService } from '@/lib/services/technologyArticleService';

// GET articles with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      category: searchParams.get('category') || undefined,
      subCategory: searchParams.get('subCategory') || undefined,
      difficulty: searchParams.get('difficulty') as any || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      search: searchParams.get('search') || undefined,
      featured: searchParams.get('featured') === 'true',
      trending: searchParams.get('trending') === 'true',
      limit: parseInt(searchParams.get('limit') || '20'),
      page: parseInt(searchParams.get('page') || '1'),
    };

    const result = await technologyArticleService.filterArticles(filters);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}