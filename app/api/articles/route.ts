// @ts-nocheck
// app/api/articles/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API route working' });
}

export async function POST(request) {
  const data = await request.json();
  return NextResponse.json({ received: data });
}