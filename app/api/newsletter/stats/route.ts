// app/api/newsletter/stats/route.ts
import { NextResponse } from 'next/server';
import { getNewsletterStats } from '@/lib/newsletter-service';

export async function GET() {
  try {
    const stats = await getNewsletterStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}