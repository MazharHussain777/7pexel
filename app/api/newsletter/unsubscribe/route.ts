// app/api/newsletter/unsubscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeEmail } from '@/lib/newsletter-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await unsubscribeEmail(email);
    const statusCode = result.success ? 200 : 400;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}