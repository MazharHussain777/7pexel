// app/api/reviews/stats/route.ts

// @ts-nocheck
import { NextResponse } from 'next/server';
import { getReviewStats } from '@/app/reviews/data/reviews-db';

export async function GET() {
  try {
    const stats = getReviewStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}