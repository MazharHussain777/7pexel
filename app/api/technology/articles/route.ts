// app/api/technology/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { technologyArticleService } from '@/lib/services/technologyArticleService';

// GET all articles with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const subCategory = searchParams.get('subCategory') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const search = searchParams.get('search') || undefined;
    const tags = searchParams.get('tags')?.split(',') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    if (category || subCategory || difficulty || featured || trending || search || tags) {
      const result = await technologyArticleService.filterArticles({
        category,
        subCategory,
        difficulty,
        featured,
        trending,
        search,
        tags,
        limit,
        page,
      });
      return NextResponse.json({ success: true, ...result });
    }

    const articles = await technologyArticleService.getAllArticles();
    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    // ✅ Parse the JSON body
    const body = await request.json();
    
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    // ✅ Validate required fields
    if (!body.categorySlug && !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'categorySlug or categoryId is required' },
        { status: 400 }
      );
    }

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'title is required' },
        { status: 400 }
      );
    }

    if (!body.content) {
      return NextResponse.json(
        { success: false, error: 'content is required' },
        { status: 400 }
      );
    }

    if (!body.author) {
      return NextResponse.json(
        { success: false, error: 'author is required' },
        { status: 400 }
      );
    }

    // ✅ Create the article
    const article = await technologyArticleService.createArticle(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create article' },
      { status: 400 }
    );
  }
}