// app/api/phones/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

// ============================================
// GET - Get a single phone by slug or ID
// ============================================
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const includeRelated = searchParams.get('related') === 'true';
    const limit = parseInt(searchParams.get('limit') || '4');
    
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
      phone.image = phone.images?.[0] || `/images/phones/${phone.slug}.png`;
    }

    // Get related phones if requested
    let relatedPhones = [];
    if (includeRelated) {
      relatedPhones = await getRelatedPhones(phone, limit);
    }

    // ✅ AUTO-INDEX: Ping Google when phone is viewed
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
      const phoneUrl = `${baseUrl}/phone-finder/${phone.slug}`;
      
      // Only ping if not already indexed recently (check if indexedAt > 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      if (!phone.indexedAt || new Date(phone.indexedAt) < sevenDaysAgo) {
        // Ping Google and Bing
        await Promise.all([
          fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
          fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
        ]);
        
        // Update indexedAt timestamp
        await Phone.updateOne(
          { slug: phone.slug },
          { 
            $set: { 
              indexedAt: new Date(),
              indexingStatus: 'pending'
            } 
          }
        );
        
        console.log(`✅ Indexing pinged for: ${phone.slug}`);
      }
    } catch (indexError) {
      // Don't fail the request if indexing fails
      console.error('⚠️ Indexing ping error (non-critical):', indexError);
    }

    return NextResponse.json({
      success: true,
      data: phone,
      ...(includeRelated && { related: relatedPhones }),
    });
  } catch (error: any) {
    console.error("Error fetching phone:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch phone" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT - Update a phone by slug or ID
// ============================================
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;
    const body = await request.json();

    // Build query - try slug first, then ID
    let query: any = { slug };
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ slug }, { _id: slug }] };
    }

    // Remove _id, __v, createdAt, updatedAt from update body
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    // Find and update the phone
    const phone = await Phone.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Phone updated successfully",
      data: phone,
    });
  } catch (error: any) {
    console.error("Error updating phone:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          error: `A phone with this ${field} already exists` 
        },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { 
          success: false, 
          error: errors.join(", ") 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update phone" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete a phone by slug or ID
// ============================================
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;

    // Build query - try slug first, then ID
    let query: any = { slug };
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ slug }, { _id: slug }] };
    }

    // Find and delete the phone
    const phone = await Phone.findOneAndDelete(query);

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Phone "${phone.name}" deleted successfully`,
      data: phone,
    });
  } catch (error: any) {
    console.error("Error deleting phone:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete phone" },
      { status: 500 }
    );
  }
}

// ============================================
// Helper function to get related phones
// ============================================
async function getRelatedPhones(phone: any, limit: number = 4) {
  try {
    // Find phones with same brand or category, excluding current phone
    const related = await Phone.find({
      $and: [
        { _id: { $ne: phone._id } },
        {
          $or: [
            { brand: phone.brand },
            { category: phone.category },
            { tags: { $in: phone.tags || [] } }
          ]
        }
      ]
    })
    .sort({ rating: -1, year: -1 })
    .limit(limit)
    .lean();

    return related;
  } catch (error) {
    console.error("Error fetching related phones:", error);
    return [];
  }
}