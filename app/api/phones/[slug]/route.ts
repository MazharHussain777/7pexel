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
      phone.image = phone.images?.[0] || `/images/phones/${phone.slug}.png`;
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
    });
  } catch (error: any) {
    console.error("Error fetching phone:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch phone" },
      { status: 500 }
    );
  }
}