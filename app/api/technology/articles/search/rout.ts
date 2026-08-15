// app/api/technology/articles/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import TechnologyArticle from "@/lib/models/TechnologyArticle";
import TechnologyCategory from "@/lib/models/TechnologyCategory";
import TechnologySubCategory from "@/lib/models/TechnologySubCategory";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("search") || "";
    const categoryFilter = searchParams.get("category") || "";
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: { total: 0, page, limit, pages: 0 }
      });
    }

    // ─── BUILD SEARCH QUERY ──────────────────────────────
    const searchRegex = new RegExp(query, "i");
    
    // Get category IDs if category filter is provided
    let categoryIds: string[] = [];
    if (categoryFilter) {
      const categories = await TechnologyCategory.find({
        slug: { $regex: categoryFilter, $options: "i" }
      });
      categoryIds = categories.map(c => c._id.toString());
    }

    // ─── SEARCH IN ARTICLES ──────────────────────────────
    const searchConditions: any[] = [
      { title: { $regex: searchRegex } },
      { excerpt: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
      { tags: { $in: [searchRegex] } },
      { author: { $regex: searchRegex } },
    ];

    // Add category filter if provided
    if (categoryIds.length > 0) {
      searchConditions.push({ categoryId: { $in: categoryIds } });
    }

    // Search for articles
    const articles = await TechnologyArticle.find({
      $and: [
        { $or: searchConditions },
        { isPublished: true }
      ]
    })
    .populate("categoryId", "name slug")
    .populate("subCategoryId", "name slug")
    .sort({ 
      isFeatured: -1,
      isTrending: -1,
      views: -1,
      publishedAt: -1 
    })
    .skip(skip)
    .limit(limit);

    // ─── GET TOTAL COUNT ──────────────────────────────────
    const total = await TechnologyArticle.countDocuments({
      $and: [
        { $or: searchConditions },
        { isPublished: true }
      ]
    });

    // ─── MAP RESULTS WITH MATCH TYPE ─────────────────────
    const results = articles.map(article => {
      const articleObj = article.toObject();
      
      // Determine best match type
      let matchType: "title" | "content" | "tags" | "author" | "category" | "subcategory" = "content";
      
      if (article.title.toLowerCase().includes(query.toLowerCase())) {
        matchType = "title";
      } else if (article.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))) {
        matchType = "tags";
      } else if (article.author.toLowerCase().includes(query.toLowerCase())) {
        matchType = "author";
      } else if (article.categoryId && (article.categoryId as any).name?.toLowerCase().includes(query.toLowerCase())) {
        matchType = "category";
      } else if (article.subCategoryId && (article.subCategoryId as any).name?.toLowerCase().includes(query.toLowerCase())) {
        matchType = "subcategory";
      }

      return {
        _id: articleObj._id,
        title: articleObj.title,
        slug: articleObj.slug,
        excerpt: articleObj.excerpt,
        image: articleObj.image,
        imageAlt: articleObj.imageAlt,
        categorySlug: (articleObj.categoryId as any)?.slug || "",
        categoryName: (articleObj.categoryId as any)?.name || "",
        subCategorySlug: (articleObj.subCategoryId as any)?.slug || "",
        subCategoryName: (articleObj.subCategoryId as any)?.name || "",
        author: articleObj.author,
        difficulty: articleObj.difficulty,
        readTime: articleObj.readTime,
        tags: articleObj.tags || [],
        publishedAt: articleObj.publishedAt,
        isTrending: articleObj.isTrending,
        isFeatured: articleObj.isFeatured,
        matchType
      };
    });

    return NextResponse.json({
      success: true,
      data: results,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      query
    });

  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}