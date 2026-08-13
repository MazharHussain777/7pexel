// app/api/news/stats/route.ts

// @ts-nocheck
import { NextResponse } from 'next/server';
import { getArticleStats } from '@/lib/news-service';

export async function GET() {
  try {
    const stats = getArticleStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}