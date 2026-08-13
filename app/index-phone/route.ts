// app/api/index-phone/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, brand, name } = body;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
    const phoneUrl = `${baseUrl}/phone-finder/${slug}`;
    const compareUrl = `${baseUrl}/compare?phones=${slug}`;
    
    console.log(`🔍 Indexing phone: ${brand || ''} ${name || ''} (${slug})`);
    
    // ===== 1. PING GOOGLE =====
    const googleResults = await Promise.all([
      // Ping sitemap
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`),
      // Try to index specific URL
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
    ]);
    
    // ===== 2. PING BING =====
    const bingResults = await Promise.all([
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`),
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
    ]);
    
    // ===== 3. GENERATE COMPARISON PAGES =====
    await connectToDatabase();
    const allPhones = await Phone.find({}, { slug: 1 }).lean();
    const otherPhones = allPhones.filter(p => p.slug !== slug);
    
    // Generate comparison URLs with other phones (limit to 5 to avoid rate limiting)
    const comparisonResults = [];
    for (const other of otherPhones.slice(0, 5)) {
      const compareSlugs = [slug, other.slug].join(',');
      const compareUrl = `${baseUrl}/compare?phones=${compareSlugs}`;
      
      // Ping Google for comparison page
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(compareUrl)}`);
      
      comparisonResults.push({
        with: other.slug,
        url: compareUrl,
      });
    }
    
    // ===== 4. UPDATE DATABASE =====
    await Phone.findOneAndUpdate(
      { slug },
      {
        indexingStatus: 'indexed',
        indexedAt: new Date(),
        googleIndexed: true,
        googleIndexedAt: new Date(),
      }
    );
    
    return NextResponse.json({
      success: true,
      message: `Phone ${slug} indexed successfully`,
      data: {
        phoneUrl,
        compareUrl,
        googleStatus: googleResults.map(r => r.status),
        bingStatus: bingResults.map(r => r.status),
        comparisonsGenerated: comparisonResults.length,
        comparisonUrls: comparisonResults,
      },
    });
    
  } catch (error: any) {
    console.error('❌ Indexing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to index phone' },
      { status: 500 }
    );
  }
}