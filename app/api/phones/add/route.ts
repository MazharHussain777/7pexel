// app/api/phones/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if phone exists
    const { data: existing } = await supabaseServer
      .from('phones')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Phone with this slug already exists',
        slug: body.slug
      }, { status: 409 });
    }

    // Insert phone with all fields including SEO
    const { data: phone, error } = await supabaseServer
      .from('phones')
      .insert(body)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: phone,
      message: 'Phone added successfully with all 114+ fields including SEO'
    });
  } catch (error: any) {
    console.error('Error adding phone:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to add phone'
    }, { status: 500 });
  }
}