// app/api/technology/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyArticle from '@/lib/models/TechnologyArticle';

// GET article by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    const article = await TechnologyArticle.findOne({ slug, isPublished: true })
      .populate('categoryId', 'name slug')
      .populate('subCategoryId', 'name slug');
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update article by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();
    
    const article = await TechnologyArticle.findOne({ slug });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    const updatedArticle = await TechnologyArticle.findByIdAndUpdate(
      article._id,
      body,
      { new: true, runValidators: true }
    )
    .populate('categoryId', 'name slug')
    .populate('subCategoryId', 'name slug');
    
    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete article by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    const article = await TechnologyArticle.findOne({ slug });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    await TechnologyArticle.findByIdAndDelete(article._id);
    
    return NextResponse.json({
      success: true,
      data: { message: 'Article deleted successfully' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Increment article views by slug
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    const article = await TechnologyArticle.findOne({ slug, isPublished: true });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    article.views += 1;
    await article.save();
    
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}