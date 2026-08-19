// app/api/phones/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const limitParam = parseInt(searchParams.get('limit') || '100');
    const brand = searchParams.get('brand') || undefined;
    const year = searchParams.get('year') || undefined;
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const search = searchParams.get('search') || undefined;
    const sort = searchParams.get('sort') as any || 'newest';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;

    // --- GET BRANDS ---
    if (action === 'brands') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('brand')
        .eq('published', true)
        .order('brand');

      if (error) throw error;
      const brands = [...new Set(data.map(item => item.brand))];
      return NextResponse.json({ success: true, data: brands });
    }

    // --- GET CATEGORIES ---
    if (action === 'categories') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('category')
        .eq('published', true);

      if (error) throw error;
      const allCategories = data.flatMap(item => item.category || []);
      const uniqueCategories = [...new Set(allCategories)];
      return NextResponse.json({ success: true, data: uniqueCategories });
    }

    // --- GET YEARS ---
    if (action === 'years') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('year')
        .eq('published', true)
        .order('year', { ascending: false });

      if (error) throw error;
      const years = [...new Set(data.map(item => item.year))];
      return NextResponse.json({ success: true, data: years });
    }

    // --- GET STATS ---
    if (action === 'stats') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('id, is_featured, is_trending, published, brand, category')
        .eq('published', true);

      if (error) throw error;

      const allCategories = data.flatMap(item => item.category || []);
      const uniqueBrands = [...new Set(data.map(item => item.brand))];
      const uniqueCategories = [...new Set(allCategories)];

      return NextResponse.json({
        success: true,
        data: {
          total: data.length,
          published: data.filter(item => item.published).length,
          featured: data.filter(item => item.is_featured).length,
          trending: data.filter(item => item.is_trending).length,
          brands: uniqueBrands.length,
          categories: uniqueCategories,
        }
      });
    }

    // --- GET LATEST PHONES ---
    if (action === 'latest') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return NextResponse.json({ success: true, data: data || [] });
    }

    // --- GET FEATURED PHONES ---
    if (action === 'featured') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('is_featured', true)
        .eq('published', true)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return NextResponse.json({ success: true, data: data || [] });
    }

    // --- GET TRENDING PHONES ---
    if (action === 'trending') {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('is_trending', true)
        .eq('published', true)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return NextResponse.json({ success: true, data: data || [] });
    }

    // --- SEARCH PHONES ---
    if (action === 'search' && search) {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .or(`brand.ilike.%${search}%,model.ilike.%${search}%,chipset_details.ilike.%${search}%,content_plain.ilike.%${search}%`)
        .eq('published', true)
        .limit(limit);

      if (error) throw error;
      return NextResponse.json({
        success: true,
        data: data || [],
        total: data?.length || 0,
      });
    }

    // --- GET RELATED PHONES ---
    if (action === 'related') {
      const slug = searchParams.get('slug');
      if (!slug) {
        return NextResponse.json({
          success: false,
          error: 'Slug is required for related phones'
        }, { status: 400 });
      }

      // Get current phone
      const { data: currentPhone } = await supabaseServer
        .from('phones')
        .select('brand, category')
        .eq('slug', slug)
        .single();

      if (!currentPhone) {
        return NextResponse.json({ success: true, data: [] });
      }

      // Try same brand first
      let { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('brand', currentPhone.brand)
        .neq('slug', slug)
        .eq('published', true)
        .limit(limit);

      if (error) throw error;

      // If no same brand, try same category
      if (!data || data.length === 0) {
        const category = currentPhone.category?.[0];
        if (category) {
          const result = await supabaseServer
            .from('phones')
            .select('*')
            .contains('category', [category])
            .neq('slug', slug)
            .eq('published', true)
            .limit(limit);
          
          if (!result.error) {
            data = result.data;
          }
        }
      }

      // If still nothing, get any other phones
      if (!data || data.length === 0) {
        const result = await supabaseServer
          .from('phones')
          .select('*')
          .neq('slug', slug)
          .eq('published', true)
          .limit(limit);
        
        if (!result.error) {
          data = result.data;
        }
      }

      return NextResponse.json({ success: true, data: data || [] });
    }

    // --- MAIN QUERY WITH FILTERS ---
    let query = supabaseServer
      .from('phones')
      .select('*', { count: 'exact' });

    // Apply filters
    if (brand) query = query.eq('brand', brand);
    if (year) query = query.eq('year', year);
    if (featured) query = query.eq('is_featured', true);
    if (trending) query = query.eq('is_trending', true);
    if (category) query = query.contains('category', [category]);
    if (minPrice) query = query.gte('price::integer', minPrice);
    if (maxPrice) query = query.lte('price::integer', maxPrice);
    query = query.eq('published', true);

    // Sorting
    switch (sort) {
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'year':
        query = query.order('year', { ascending: false });
        break;
      case 'price':
        query = query.order('price', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Pagination
    const from = (page - 1) * limitParam;
    const to = from + limitParam - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limitParam),
      currentPage: page,
      limit: limitParam,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch phones'
    }, { status: 500 });
  }
}