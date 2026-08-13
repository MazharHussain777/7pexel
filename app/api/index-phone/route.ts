// app/api/index-phone/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const phone = await Phone.findOne({ slug });
    
    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone not found" },
        { status: 404 }
      );
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
    const phoneUrl = `${baseUrl}/phone-finder/${slug}`;
    
    await Promise.all([
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(phoneUrl)}`),
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`),
    ]);
    
    await Phone.updateOne(
      { slug },
      { 
        $set: { 
          indexedAt: new Date(),
          indexingStatus: 'pending'
        } 
      }
    );
    
    return NextResponse.json({
      success: true,
      message: `Indexing submitted for ${slug}`,
      data: { slug, phoneUrl }
    });
  } catch (error: any) {
    console.error('Indexing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to index phone" },
      { status: 500 }
    );
  }
}