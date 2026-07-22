// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Article } from "@/lib/models/Article";
import { Author } from "@/lib/models/Author";
import { Category } from "@/lib/models/Category";

// GET all articles with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "latest";
    const featured = searchParams.get("featured");
    const breaking = searchParams.get("breaking");
    const trending = searchParams.get("trending");

    // Build query
    const query: any = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (breaking === "true") {
      query.isBreaking = true;
    }

    if (trending === "true") {
      query.isTrending = true;
    }

    // Build sort
    let sortOption: any = {};
    switch (sort) {
      case "latest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "popular":
        sortOption = { views: -1 };
        break;
      case "trending":
        sortOption = { views: -1, comments: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Get total count
    const total = await Article.countDocuments(query);

    // Get articles
    const articles = await Article.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["title", "headline", "author", "category", "image", "excerpt", "content"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Check if article with same slug exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return NextResponse.json(
        {
          success: false,
          error: `Article with slug "${slug}" already exists`,
        },
        { status: 409 }
      );
    }

    // Create article
    const article = new Article({
      ...body,
      slug,
      comments: body.comments || 0,
      shares: body.shares || 0,
      views: body.views || 0,
      date: body.date || new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });

    await article.save();

    // Update or create author
    const authorSlug = body.author.toLowerCase().replace(/\s+/g, "-");
    let author = await Author.findOne({ slug: authorSlug });

    if (author) {
      // Update author article count
      author.articlesCount = await Article.countDocuments({ author: body.author });
      await author.save();
    } else {
      // Create new author
      author = new Author({
        name: body.author,
        slug: authorSlug,
        bio: body.authorBio || `${body.author} is a technology journalist and industry expert.`,
        image: body.authorImage,
        expertise: [body.category],
        articlesCount: 1,
      });
      await author.save();
    }

    // Update or create category
    const categorySlug = body.category.toLowerCase().replace(/\s+/g, "-");
    let category = await Category.findOne({ slug: categorySlug });

    if (category) {
      category.articleCount = await Article.countDocuments({ category: body.category });
      await category.save();
    } else {
      category = new Category({
        name: body.category,
        slug: categorySlug,
        articleCount: 1,
      });
      await category.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Article created successfully",
        data: article,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create article",
      },
      { status: 500 }
    );
  }
}