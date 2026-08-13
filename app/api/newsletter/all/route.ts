// app/api/newsletter/all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllSubscribers, deleteSubscriber } from '@/lib/newsletter-service';

export async function GET() {
  try {
    const subscribers = await getAllSubscribers();
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await deleteSubscriber(email);
    const statusCode = result.success ? 200 : 400;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}