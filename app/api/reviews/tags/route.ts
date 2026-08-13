// app/api/reviews/tags/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
  try {
    await dbConnect();
    
    const reviews = await Review.find({ published: true }).select('tags').lean();
    const tagsSet = new Set<string>();
    
    reviews.forEach(review => {
      if (review.tags && Array.isArray(review.tags)) {
        review.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    const tags = Array.from(tagsSet).sort();
    
    return NextResponse.json({
      success: true,
      data: tags,
      total: tags.length
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}