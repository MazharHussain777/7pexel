// app/api/index-phone/route.ts - Updated for Supabase
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, isSupabaseAvailable } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is available
    if (!isSupabaseAvailable || !supabaseServer) {
      return NextResponse.json({
        success: false,
        error: 'Supabase is not configured'
      }, { status: 500 });
    }

    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({
        success: false,
        error: 'Slug is required'
      }, { status: 400 });
    }

    // Check if phone exists
    const { data: existing, error: checkError } = await supabaseServer
      .from('phones')
      .select('id')
      .eq('slug', slug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Phone already exists',
        slug
      }, { status: 409 });
    }

    // Insert phone
    const { data: phone, error } = await supabaseServer
      .from('phones')
      .insert(body)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: phone,
      message: 'Phone indexed successfully'
    });
  } catch (error: any) {
    console.error('Error indexing phone:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to index phone'
    }, { status: 500 });
  }
}