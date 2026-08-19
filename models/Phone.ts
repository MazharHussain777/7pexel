// models/Phone.ts - Supabase Version with All Fields
import { supabaseServer } from '@/lib/supabase/server';

// ============================================
// COMPLETE PHONE INTERFACE - ALL 114+ FIELDS
// ============================================

export interface IPhone {
  // Basic Info (11 fields)
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
  
  // Display (11 fields)
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
  
  // Camera (10 fields)
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
  
  // Battery (8 fields)
  battery: string;
  battery_type: string;
  charging: string;
  charging_type: string;
  wireless_charging: string;
  reverse_charging: string;
  battery_life: string;
  charging_time: string;
  
  // Performance (13 fields)
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
  
  // OS & Software (5 fields)
  os: string;
  os_version: string;
  ui_skin: string;
  update_policy: string;
  security_updates: string;
  
  // Physical (7 fields)
  weight: string;
  dimensions: string;
  colors: string[];
  materials: string[];
  water_resistance: string;
  dust_resistance: string;
  
  // Connectivity (9 fields)
  sim: string;
  network: string;
  wifi: string;
  bluetooth: string;
  nfc: string;
  usb: string;
  gps: string;
  sensors: string[];
  
  // Audio (3 fields)
  speakers: string;
  audio_jack: string;
  audio_features: string[];
  
  // Security (3 fields)
  fingerprint: string;
  face_unlock: string;
  security_features: string[];
  
  // Content (11 fields)
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
  
  // Flags (5 fields)
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  published: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // SEO
  seo?: any;
}

// ============================================
// PHONE MODEL WITH ALL METHODS
// ============================================

const PhoneModel = {
  // Find all phones
  find: async (query?: any) => {
    try {
      let dbQuery = supabaseServer.from('phones').select('*');
      
      if (query) {
        if (query.brand) dbQuery = dbQuery.eq('brand', query.brand);
        if (query.year) dbQuery = dbQuery.eq('year', query.year);
        if (query.isFeatured) dbQuery = dbQuery.eq('is_featured', true);
        if (query.isTrending) dbQuery = dbQuery.eq('is_trending', true);
        if (query.published !== undefined) dbQuery = dbQuery.eq('published', query.published);
        if (query.slug) dbQuery = dbQuery.eq('slug', query.slug);
        if (query._id) dbQuery = dbQuery.eq('id', query._id);
      }
      
      // Sorting
      if (query?.sort) {
        const sortField = query.sort === 'rating' ? 'rating' :
                         query.sort === 'year' ? 'year' :
                         query.sort === 'price' ? 'price' : 'created_at';
        dbQuery = dbQuery.order(sortField, { ascending: query.sort === 'price' });
      } else {
        dbQuery = dbQuery.order('created_at', { ascending: false });
      }
      
      // Limit
      if (query?.limit) {
        dbQuery = dbQuery.limit(query.limit);
      }
      
      const { data, error } = await dbQuery;
      if (error) throw error;
      
      return {
        data: data || [],
        error: null,
        lean: () => ({ data: data || [], error: null })
      };
    } catch (error) {
      console.error('Error in Phone.find:', error);
      return { data: [], error, lean: () => ({ data: [], error }) };
    }
  },
  
  // Find one phone
  findOne: async (query: any) => {
    try {
      let dbQuery = supabaseServer.from('phones').select('*');
      
      if (query.slug) dbQuery = dbQuery.eq('slug', query.slug);
      if (query._id) dbQuery = dbQuery.eq('id', query._id);
      if (query.published !== undefined) dbQuery = dbQuery.eq('published', query.published);
      
      const { data, error } = await dbQuery.single();
      if (error) return null;
      
      return data || null;
    } catch (error) {
      console.error('Error in Phone.findOne:', error);
      return null;
    }
  },
  
  // Find by ID
  findById: async (id: string) => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) return null;
      return data || null;
    } catch (error) {
      console.error('Error in Phone.findById:', error);
      return null;
    }
  },
  
  // Find by slug
  findBySlug: async (slug: string) => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) return null;
      return data || null;
    } catch (error) {
      console.error('Error in Phone.findBySlug:', error);
      return null;
    }
  },
  
  // Create phone
  create: async (data: any) => {
    try {
      const { data: created, error } = await supabaseServer
        .from('phones')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return created;
    } catch (error) {
      console.error('Error in Phone.create:', error);
      return null;
    }
  },
  
  // Update phone
  findByIdAndUpdate: async (id: string, data: any) => {
    try {
      const { data: updated, error } = await supabaseServer
        .from('phones')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return updated;
    } catch (error) {
      console.error('Error in Phone.findByIdAndUpdate:', error);
      return null;
    }
  },
  
  // Update by slug
  findBySlugAndUpdate: async (slug: string, data: any) => {
    try {
      const { data: updated, error } = await supabaseServer
        .from('phones')
        .update(data)
        .eq('slug', slug)
        .select()
        .single();
      
      if (error) throw error;
      return updated;
    } catch (error) {
      console.error('Error in Phone.findBySlugAndUpdate:', error);
      return null;
    }
  },
  
  // Delete phone
  findByIdAndDelete: async (id: string) => {
    try {
      const { error } = await supabaseServer
        .from('phones')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error in Phone.findByIdAndDelete:', error);
      return false;
    }
  },
  
  // Delete by slug
  findBySlugAndDelete: async (slug: string) => {
    try {
      const { error } = await supabaseServer
        .from('phones')
        .delete()
        .eq('slug', slug);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error in Phone.findBySlugAndDelete:', error);
      return false;
    }
  },
  
  // Get distinct brands
  distinct: async (field: string, query?: any) => {
    try {
      let dbQuery = supabaseServer.from('phones').select(field);
      
      if (query?.published !== undefined) {
        dbQuery = dbQuery.eq('published', query.published);
      }
      
      const { data, error } = await dbQuery;
      if (error) throw error;
      
      const values = data.map((item: any) => item[field]);
      return [...new Set(values)];
    } catch (error) {
      console.error('Error in Phone.distinct:', error);
      return [];
    }
  },
  
  // Count phones
  count: async (query?: any) => {
    try {
      let dbQuery = supabaseServer.from('phones').select('*', { count: 'exact', head: true });
      
      if (query?.published !== undefined) {
        dbQuery = dbQuery.eq('published', query.published);
      }
      if (query?.brand) {
        dbQuery = dbQuery.eq('brand', query.brand);
      }
      if (query?.isFeatured) {
        dbQuery = dbQuery.eq('is_featured', true);
      }
      if (query?.isTrending) {
        dbQuery = dbQuery.eq('is_trending', true);
      }
      
      const { count, error } = await dbQuery;
      if (error) throw error;
      
      return count || 0;
    } catch (error) {
      console.error('Error in Phone.count:', error);
      return 0;
    }
  },
  
  // Get featured phones
  findFeatured: async (limit: number = 6) => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('is_featured', true)
        .eq('published', true)
        .order('rating', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in Phone.findFeatured:', error);
      return [];
    }
  },
  
  // Get trending phones
  findTrending: async (limit: number = 6) => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('is_trending', true)
        .eq('published', true)
        .order('rating', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in Phone.findTrending:', error);
      return [];
    }
  },
  
  // Get latest phones
  findLatest: async (limit: number = 6) => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in Phone.findLatest:', error);
      return [];
    }
  },
  
  // Get all brands
  getBrands: async () => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('brand')
        .eq('published', true)
        .order('brand');
      
      if (error) throw error;
      return [...new Set(data.map(item => item.brand))];
    } catch (error) {
      console.error('Error in Phone.getBrands:', error);
      return [];
    }
  },
  
  // Get all categories
  getCategories: async () => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('category')
        .eq('published', true);
      
      if (error) throw error;
      const allCategories = data.flatMap(item => item.category || []);
      return [...new Set(allCategories)];
    } catch (error) {
      console.error('Error in Phone.getCategories:', error);
      return [];
    }
  },
  
  // Get all years
  getYears: async () => {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('year')
        .eq('published', true)
        .order('year', { ascending: false });
      
      if (error) throw error;
      return [...new Set(data.map(item => item.year))];
    } catch (error) {
      console.error('Error in Phone.getYears:', error);
      return [];
    }
  },
  
  // Get stats
  getStats: async () => {
    try {
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
      console.error('Error in Phone.getStats:', error);
      return {
        total: 0,
        published: 0,
        featured: 0,
        trending: 0,
        brands: 0,
        categories: [],
      };
    }
  },
  
  // Search phones
  search: async (query: string, limit: number = 20) => {
    try {
      const { data, error } = await supabaseServer
        .rpc('search_phones', { search_query: query })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in Phone.search:', error);
      return [];
    }
  },
  
  // Schema for compatibility
  schema: {
    paths: {}
  }
};

// Default export
export default PhoneModel;