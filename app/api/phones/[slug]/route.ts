// app/api/phones/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    
    // Try to find by slug
    let phone = await Phone.findOne({ slug }).lean();

    // If not found by slug, try to find by _id
    if (!phone && slug.match(/^[0-9a-fA-F]{24}$/)) {
      phone = await Phone.findById(slug).lean();
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone not found" },
        { status: 404 }
      );
    }

    // Ensure image exists - use actual phone image or fallback
    if (!phone.image) {
      // Try to get image from phone data
      phone.image = phone.images?.[0] || `/images/phones/${phone.slug}.png`;
    }

    return NextResponse.json({
      success: true,
      data: phone,
    });
  } catch (error: any) {
    console.error("Error fetching phone:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch phone" },
      { status: 500 }
    );
  }
}