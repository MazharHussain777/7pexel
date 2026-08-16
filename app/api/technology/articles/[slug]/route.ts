// app/api/technology/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import TechnologyArticle from '@/lib/models/TechnologyArticle';
import TechnologyCategory from '@/lib/models/TechnologyCategory';
import TechnologySubCategory from '@/lib/models/TechnologySubCategory';
import mongoose from 'mongoose';

// ─── GET ARTICLE BY SLUG ──────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    console.log(`🔍 Fetching article with slug: ${slug}`);
    
    // ─── FIND ARTICLE ──────────────────────────────────
    const article = await TechnologyArticle.findOne({ 
      slug, 
      isPublished: true 
    })
      .populate('categoryId', 'name slug description color icon metaTitle metaDescription')
      .populate('subCategoryId', 'name slug description color icon metaTitle metaDescription');
    
    if (!article) {
      console.log(`❌ Article not found for slug: ${slug}`);
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    console.log(`✅ Article found: ${article.title}`);
    
    // ─── INCREMENT VIEWS (SAFELY) ──────────────────────
    try {
      // Update views - handle case where views might not exist
      await TechnologyArticle.findByIdAndUpdate(
        article._id,
        { $inc: { views: 1 } },
        { 
          new: true,
          // If views field doesn't exist, create it with value 1
          // The $inc will work even if the field doesn't exist (it creates it)
        }
      );
      console.log(`👁️ Views incremented for: ${article.slug}`);
    } catch (viewError) {
      // Don't fail the whole request if view increment fails
      console.error('Failed to increment views:', viewError);
    }
    
    // ─── GET FRESH ARTICLE DATA ────────────────────────
    const freshArticle = await TechnologyArticle.findById(article._id)
      .populate('categoryId', 'name slug description color icon metaTitle metaDescription')
      .populate('subCategoryId', 'name slug description color icon metaTitle metaDescription');
    
    // ─── GET RELATED ARTICLES ──────────────────────────
    const relatedArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon')
      .lean();
    
    // ─── GET POPULAR ARTICLES ──────────────────────────
    const popularArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ views: -1, publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon')
      .lean();
    
    return NextResponse.json({
      success: true,
      data: {
        article: freshArticle,
        relatedArticles,
        popularArticles,
      },
    });
    
  } catch (error: any) {
    console.error('❌ Error fetching article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch article',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// ─── UPDATE ARTICLE BY SLUG ────────────────────────────
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
    
    // Handle category change
    if (body.categorySlug && body.categorySlug !== article.categorySlug) {
      const category = await TechnologyCategory.findOne({
        slug: body.categorySlug,
        isActive: true,
      });
      
      if (!category) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Category with slug '${body.categorySlug}' not found` 
          },
          { status: 404 }
        );
      }
      
      body.categoryId = category._id;
      body.categorySlug = category.slug;
    }
    
    // Handle subcategory change
    if (body.subCategorySlug) {
      const subCategory = await TechnologySubCategory.findOne({
        slug: body.subCategorySlug,
        isActive: true,
      });
      if (subCategory) {
        body.subCategoryId = subCategory._id;
      }
    }
    
    // Handle slug update (ensure uniqueness)
    if (body.slug && body.slug !== article.slug) {
      const existing = await TechnologyArticle.findOne({ slug: body.slug });
      if (existing) {
        return NextResponse.json(
          { success: false, error: `Article with slug '${body.slug}' already exists` },
          { status: 409 }
        );
      }
    }
    
    // Update the article
    const updatedArticle = await TechnologyArticle.findByIdAndUpdate(
      article._id,
      { $set: body },
      { 
        new: true, 
        runValidators: true,
      }
    )
      .populate('categoryId', 'name slug color icon')
      .populate('subCategoryId', 'name slug color icon');
    
    return NextResponse.json({
      success: true,
      data: updatedArticle,
      message: 'Article updated successfully',
    });
    
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update article' },
      { status: 500 }
    );
  }
}

// ─── DELETE ARTICLE BY SLUG ────────────────────────────
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
    
    // Decrement category article count
    try {
      const TechnologyCategory = mongoose.model('TechnologyCategory');
      await TechnologyCategory.findByIdAndUpdate(article.categoryId, {
        $inc: { articleCount: -1 },
      });
    } catch (error) {
      console.error('Error updating category count:', error);
    }
    
    await TechnologyArticle.findByIdAndDelete(article._id);
    
    return NextResponse.json({
      success: true,
      data: { 
        message: 'Article deleted successfully',
        slug: article.slug,
        title: article.title,
      },
    });
    
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete article' },
      { status: 500 }
    );
  }
}

// ─── PATCH - Increment Actions ──────────────────────────
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();
    
    const article = await TechnologyArticle.findOne({ slug, isPublished: true });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    let updatedArticle;
    
    // Handle specific actions
    switch (body.action) {
      case 'incrementViews':
        updatedArticle = await TechnologyArticle.findByIdAndUpdate(
          article._id,
          { $inc: { views: 1 } },
          { new: true }
        );
        break;
      case 'incrementLikes':
        updatedArticle = await TechnologyArticle.findByIdAndUpdate(
          article._id,
          { $inc: { likes: 1 } },
          { new: true }
        );
        break;
      case 'incrementShares':
        updatedArticle = await TechnologyArticle.findByIdAndUpdate(
          article._id,
          { $inc: { shares: 1 } },
          { new: true }
        );
        break;
      case 'incrementComments':
        updatedArticle = await TechnologyArticle.findByIdAndUpdate(
          article._id,
          { $inc: { comments: 1 } },
          { new: true }
        );
        break;
      default:
        // Generic update
        updatedArticle = await TechnologyArticle.findByIdAndUpdate(
          article._id,
          { $set: body },
          { new: true }
        );
    }
    
    const finalArticle = await TechnologyArticle.findById(article._id)
      .populate('categoryId', 'name slug color icon')
      .populate('subCategoryId', 'name slug color icon');
    
    return NextResponse.json({
      success: true,
      data: finalArticle,
      message: 'Article updated successfully',
    });
    
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update article' },
      { status: 500 }
    );
  }
}