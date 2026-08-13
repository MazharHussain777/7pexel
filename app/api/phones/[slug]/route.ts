// app/api/phones/[slug]/route.ts
<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import {
  getPhoneBySlug,
  updatePhone,
  deletePhone,
  getRelatedPhones,
} from '@/lib/phone-service';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const related = searchParams.get('related') === 'true';
    const limit = parseInt(searchParams.get('limit') || '4');

    const phone = await getPhoneBySlug(slug);
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
=======
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
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
        { status: 404 }
      );
    }

<<<<<<< HEAD
    let response: any = { success: true, data: phone };

    if (related) {
      const relatedPhones = await getRelatedPhones(slug, limit);
      response.related = relatedPhones;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching phone:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch phone',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const phone = await updatePhone(slug, body);
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');
    revalidatePath(`/phones/finder/${slug}`);

    return NextResponse.json({
      success: true,
      data: phone,
      message: 'Phone updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating phone:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Phone with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update phone',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const deleted = await deletePhone(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    // Revalidate paths
    revalidatePath('/phones');
    revalidatePath('/phones/finder');

    return NextResponse.json({
      success: true,
      message: 'Phone deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting phone:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete phone',
      },
=======
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
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}