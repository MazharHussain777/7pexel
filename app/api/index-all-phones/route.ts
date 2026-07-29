// app/api/index-all-phones/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
    
    // Get all phones
    const phones = await Phone.find({}, { slug: 1, brand: 1, name: 1 }).lean();
    
    console.log(`🔄 Indexing ${phones.length} phones...`);
    
    const results = [];
    
    // Index each phone
    for (const phone of phones) {
      try {
        const phoneUrl = `${baseUrl}/phone-finder/${phone.slug}`;
        
        // Ping Google
        await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`);
        
        // Update status
        await Phone.findOneAndUpdate(
          { slug: phone.slug },
          {
            indexingStatus: 'indexed',
            indexedAt: new Date(),
            googleIndexed: true,
            googleIndexedAt: new Date(),
          }
        );
        
        results.push({
          slug: phone.slug,
          status: 'success',
        });
        
        // Wait a bit to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error: any) {
        results.push({
          slug: phone.slug,
          status: 'failed',
          error: error.message,
        });
      }
    }
    
    // Ping sitemap
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`);
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`);
    
    return NextResponse.json({
      success: true,
      message: `Indexed ${results.filter(r => r.status === 'success').length} phones`,
      results,
      total: phones.length,
      successCount: results.filter(r => r.status === 'success').length,
      failedCount: results.filter(r => r.status === 'failed').length,
    });
    
  } catch (error: any) {
    console.error('❌ Bulk indexing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to index phones' },
      { status: 500 }
    );
  }
}