// app/api/phones/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data: phone, error } = await supabaseServer
      .from('phones')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: phone });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch phone' },
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

    const { data: phone, error } = await supabaseServer
      .from('phones')
      .update(body)
      .eq('slug', slug)
      .select()
      .single();

    if (error || !phone) {
      return NextResponse.json(
        { success: false, error: 'Phone not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: phone,
      message: 'Phone updated successfully' 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update phone' },
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

    const { error } = await supabaseServer
      .from('phones')
      .delete()
      .eq('slug', slug);

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Phone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Phone deleted successfully' 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete phone' },
      { status: 500 }
    );
  }
}