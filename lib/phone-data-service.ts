// lib/phone-data-service.ts
import { supabaseServer, isSupabaseAvailable } from '@/lib/supabase/server';

export interface PhoneData {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  gallery: string[];
  rating: number;
  review_count: number;
  category: string[];
  display: string;
  display_size: string;
  display_resolution: string;
  display_type: string;
  display_protection: string;
  display_features: string[];
  refresh_rate: string;
  brightness: string;
  aspect_ratio: string;
  pixel_density: string;
  screen_to_body_ratio: string;
  camera: string;
  camera_details: string;
  camera_features: string[];
  video_recording: string;
  front_camera: string;
  front_camera_features: string[];
  camera_sensor: string;
  aperture: string;
  optical_zoom: string;
  digital_zoom: string;
  battery: string;
  battery_type: string;
  charging: string;
  charging_type: string;
  wireless_charging: string;
  reverse_charging: string;
  battery_life: string;
  charging_time: string;
  chipset: string;
  chipset_details: string;
  cpu: string;
  cpu_cores: string;
  cpu_frequency: string;
  gpu: string;
  gpu_details: string;
  ram: string;
  ram_type: string;
  storage: string;
  storage_type: string;
  expandable_storage: string;
  antutu_score: string;
  geekbench_score: string;
  os: string;
  os_version: string;
  ui_skin: string;
  update_policy: string;
  security_updates: string;
  weight: string;
  dimensions: string;
  colors: string[];
  materials: string[];
  water_resistance: string;
  dust_resistance: string;
  sim: string;
  network: string;
  wifi: string;
  bluetooth: string;
  nfc: string;
  usb: string;
  gps: string;
  sensors: string[];
  speakers: string;
  audio_jack: string;
  audio_features: string[];
  fingerprint: string;
  face_unlock: string;
  security_features: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  author_avatar: string;
  author_bio: string;
  author_social: string[];
  date: string;
  read_time: string;
  custom_styles: string;
  content_html: string;
  content_plain: string;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  published: boolean;
  seo: any;
  created_at: string;
  updated_at: string;
}

// Fetch all phones from database
export async function fetchPhonesFromDB(options: {
  brand?: string;
  category?: string;
  year?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'year' | 'price' | 'newest';
  minPrice?: number;
  maxPrice?: number;
} = {}) {
  try {
    // Check if Supabase is available
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return { data: [], total: 0, totalPages: 0, currentPage: 1, limit: 100 };
    }

    const {
      brand,
      category,
      year,
      featured,
      trending,
      search,
      page = 1,
      limit = 100,
      sort = 'newest',
      minPrice,
      maxPrice,
    } = options;

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
    
    // Search
    if (search) {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .or(`brand.ilike.%${search}%,model.ilike.%${search}%,chipset_details.ilike.%${search}%,content_plain.ilike.%${search}%`)
        .eq('published', true);

      if (error) throw error;
      return {
        data: data || [],
        total: data?.length || 0,
        totalPages: Math.ceil((data?.length || 0) / limit),
        currentPage: page,
        limit,
      };
    }

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
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page,
      limit,
    };
  } catch (error) {
    console.error('Error fetching phones from DB:', error);
    return { data: [], total: 0, totalPages: 0, currentPage: 1, limit: 100 };
  }
}

// Fetch single phone by slug
export async function fetchPhoneBySlugFromDB(slug: string): Promise<PhoneData | null> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return null;
    }

    const { data, error } = await supabaseServer
      .from('phones')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching phone by slug:', error);
    return null;
  }
}

// Fetch brands from database
export async function fetchBrandsFromDB(): Promise<string[]> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return [];
    }

    const { data, error } = await supabaseServer
      .from('phones')
      .select('brand')
      .eq('published', true)
      .order('brand');

    if (error) throw error;
    return [...new Set(data.map(item => item.brand))];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

// Fetch categories from database
export async function fetchCategoriesFromDB(): Promise<string[]> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return [];
    }

    const { data, error } = await supabaseServer
      .from('phones')
      .select('category')
      .eq('published', true);

    if (error) throw error;
    const allCategories = data.flatMap(item => item.category || []);
    return [...new Set(allCategories)];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch years from database
export async function fetchYearsFromDB(): Promise<string[]> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return [];
    }

    const { data, error } = await supabaseServer
      .from('phones')
      .select('year')
      .eq('published', true)
      .order('year', { ascending: false });

    if (error) throw error;
    return [...new Set(data.map(item => item.year))];
  } catch (error) {
    console.error('Error fetching years:', error);
    return [];
  }
}

// Fetch stats from database
export async function fetchPhoneStatsFromDB() {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return {
        total: 0,
        published: 0,
        featured: 0,
        trending: 0,
        brands: 0,
        categories: [],
      };
    }

    const { data, error } = await supabaseServer
      .from('phones')
      .select('id, is_featured, is_trending, published, brand, category')
      .eq('published', true);

    if (error) throw error;

    const allCategories = data.flatMap(item => item.category || []);
    const uniqueBrands = [...new Set(data.map(item => item.brand))];
    const uniqueCategories = [...new Set(allCategories)];

    return {
      total: data.length,
      published: data.filter(item => item.published).length,
      featured: data.filter(item => item.is_featured).length,
      trending: data.filter(item => item.is_trending).length,
      brands: uniqueBrands.length,
      categories: uniqueCategories,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total: 0,
      published: 0,
      featured: 0,
      trending: 0,
      brands: 0,
      categories: [],
    };
  }
}

// Fetch related phones from database
export async function fetchRelatedPhonesFromDB(slug: string, limit: number = 4): Promise<PhoneData[]> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      console.error('❌ Supabase is not available');
      return [];
    }

    // Get current phone
    const currentPhone = await fetchPhoneBySlugFromDB(slug);
    if (!currentPhone) return [];

    // Try same brand first
    const { data: brandData, error: brandError } = await supabaseServer
      .from('phones')
      .select('*')
      .eq('brand', currentPhone.brand)
      .neq('slug', slug)
      .eq('published', true)
      .limit(limit);

    if (!brandError && brandData && brandData.length > 0) {
      return brandData;
    }

    // Try same category
    if (currentPhone.category && currentPhone.category.length > 0) {
      const { data: categoryData, error: categoryError } = await supabaseServer
        .from('phones')
        .select('*')
        .contains('category', [currentPhone.category[0]])
        .neq('slug', slug)
        .eq('published', true)
        .limit(limit);

      if (!categoryError && categoryData && categoryData.length > 0) {
        return categoryData;
      }
    }

    // Get any other phones
    const { data, error } = await supabaseServer
      .from('phones')
      .select('*')
      .neq('slug', slug)
      .eq('published', true)
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching related phones:', error);
    return [];
  }
}