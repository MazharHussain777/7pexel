// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Article } from "@/lib/models/Article";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    
    console.log(`🔍 Looking for article with slug: "${slug}"`);

    const article = await Article.findOne({ slug }).lean();

    if (!article) {
      console.log(`❌ Article not found with slug: "${slug}"`);
      
      const allArticles = await Article.find({}, { slug: 1, title: 1 }).limit(10).lean();
      console.log("📚 Available slugs:", allArticles.map(a => ({ slug: a.slug, title: a.title })));
      
      return NextResponse.json(
        { 
          success: false, 
          error: "Article not found",
          availableSlugs: allArticles.map(a => a.slug)
        },
        { status: 404 }
      );
    }

    console.log(`✅ Article found: "${article.title}"`);

    await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } });

    const relatedArticles = await Article.find({
      _id: { $ne: article._id },
      $or: [
        { category: article.category },
        { tags: { $in: article.tags || [] } },
      ],
    })
      .limit(4)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        ...article,
        relatedArticles,
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching article:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch article",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const body = await request.json();

    const article = await Article.findOneAndUpdate(
      { slug },
      {
        ...body,
        updatedDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      { new: true }
    );

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article updated successfully",
      data: article,
    });
  } catch (error: any) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update article",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;

    const article = await Article.findOneAndDelete({ slug });

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete article",
      },
      { status: 500 }
    );
  }
}