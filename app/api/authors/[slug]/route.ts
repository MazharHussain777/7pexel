// app/api/authors/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Author } from "@/lib/models/Author";
import { Article } from "@/lib/models/Article";

// GET - Fetch author by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;
    
    console.log(`🔍 Looking for author with slug: "${slug}"`);

    // Find author by slug
    const author = await Author.findOne({ slug }).lean();

    if (!author) {
      console.log(`❌ Author not found with slug: "${slug}"`);
      return NextResponse.json(
        { success: false, error: "Author not found" },
        { status: 404 }
      );
    }

    console.log(`✅ Author found: "${author.name}"`);

    // Get author's articles
    const articles = await Article.find({ author: author.name })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Get article stats
    const totalArticles = await Article.countDocuments({ author: author.name });
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const categories = [...new Set(articles.map(a => a.category))];
    const allTags = [...new Set(articles.flatMap(a => a.tags || []))];

    return NextResponse.json({
      success: true,
      data: {
        ...author,
        articles,
        stats: {
          totalArticles,
          totalViews,
          categories,
          tags: allTags.slice(0, 10),
        },
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching author:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch author",
      },
      { status: 500 }
    );
  }
}