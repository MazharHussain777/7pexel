// app/api/index-all-phones/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export async function POST() {
  try {
    await connectToDatabase();
    
    const phones = await Phone.find({}, { slug: 1 }).lean();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
    
    let successCount = 0;
    
    for (const phone of phones) {
      try {
        const phoneUrl = `${baseUrl}/phone-finder/${phone.slug}`;
        await Promise.all([
          fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
          fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
        ]);
        successCount++;
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to index ${phone.slug}:`, error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Submitted ${successCount} of ${phones.length} phones to Google`,
      data: { total: phones.length, success: successCount }
    });
  } catch (error: any) {
    console.error('Bulk indexing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to index phones" },
      { status: 500 }
    );
  }
}