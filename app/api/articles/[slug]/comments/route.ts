// app/api/articles/[slug]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Article } from "@/lib/models/Article";
import { Comment } from "@/lib/models/Comment";

// GET comments for an article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const article = await Article.findOne({ slug });
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    const comments = await Comment.find({ articleId: article._id, parentId: null })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentId: comment._id })
          .sort({ createdAt: 1 })
          .lean();
        return { ...comment, replies };
      })
    );

    const total = await Comment.countDocuments({ articleId: article._id, parentId: null });

    return NextResponse.json({
      success: true,
      data: commentsWithReplies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch comments",
      },
      { status: 500 }
    );
  }
}

// POST - Add comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;
    const body = await request.json();

    const article = await Article.findOne({ slug });
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.author || !body.content) {
      return NextResponse.json(
        { success: false, error: "Author and content are required" },
        { status: 400 }
      );
    }

    // Create comment
    const comment = new Comment({
      articleId: article._id,
      author: body.author,
      authorEmail: body.authorEmail,
      authorAvatar: body.authorAvatar,
      content: body.content,
      parentId: body.parentId || null,
      likes: 0,
      isApproved: true,
    });

    await comment.save();

    // Update article comment count
    article.comments = await Comment.countDocuments({ articleId: article._id });
    await article.save();

    return NextResponse.json(
      {
        success: true,
        message: "Comment added successfully",
        data: comment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to add comment",
      },
      { status: 500 }
    );
  }
}