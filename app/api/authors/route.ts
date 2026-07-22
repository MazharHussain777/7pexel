// app/api/authors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Author } from "@/lib/models/Author";

// GET - Fetch all authors
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search");

    const query: any = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    const authors = await Author.find(query)
      .sort({ articlesCount: -1, name: 1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: authors,
    });
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch authors",
      },
      { status: 500 }
    );
  }
}