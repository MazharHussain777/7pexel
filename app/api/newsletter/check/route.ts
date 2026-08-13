// app/api/newsletter/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSubscriber } from '@/lib/newsletter-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await getSubscriber(email);
    
    return NextResponse.json({
      success: true,
      data: subscriber,
      isSubscribed: subscriber?.isActive || false,
    });
  } catch (error) {
    console.error('Error checking subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check subscription' },
      { status: 500 }
    );
  }
}