// app/phones/finder/data/phone-db.ts
import { IPhone } from '@/models/Phone';

interface FetchPhonesOptions {
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
  ram?: string;
  storage?: string;
  chipset?: string;
  os?: string;
  display?: string;
  refreshRate?: string;
  battery?: string;
  charging?: string;
  camera?: string;
  connectivity?: string;
}

interface PhoneStats {
  total: number;
  published: number;
  featured: number;
  trending: number;
  brands: number;
  categories: string[];
}

// ─── FETCH PHONES FROM DATABASE API ──────────────────────────

export async function fetchPhones(options: FetchPhonesOptions = {}): Promise<{ 
  data: any[]; 
  total: number; 
  totalPages: number;
}> {
  try {
    const params = new URLSearchParams();
    
    if (options.brand) params.set('brand', options.brand);
    if (options.category) params.set('category', options.category);
    if (options.year) params.set('year', options.year);
    if (options.featured) params.set('featured', 'true');
    if (options.trending) params.set('trending', 'true');
    if (options.search) params.set('search', options.search);
    if (options.page) params.set('page', String(options.page || 1));
    if (options.limit) params.set('limit', String(options.limit || 100));
    if (options.sort) params.set('sort', options.sort);
    if (options.minPrice) params.set('minPrice', String(options.minPrice));
    if (options.maxPrice) params.set('maxPrice', String(options.maxPrice));
    if (options.ram) params.set('ram', options.ram);
    if (options.storage) params.set('storage', options.storage);
    if (options.chipset) params.set('chipset', options.chipset);
    if (options.os) params.set('os', options.os);
    if (options.display) params.set('display', options.display);
    if (options.refreshRate) params.set('refresh_rate', options.refreshRate);
    if (options.battery) params.set('battery', options.battery);
    if (options.charging) params.set('charging', options.charging);
    if (options.camera) params.set('camera', options.camera);
    if (options.connectivity) params.set('connectivity', options.connectivity);

    const url = `/api/phones?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data || [],
        total: data.total || 0,
        totalPages: data.totalPages || 0,
      };
    }
    return { data: [], total: 0, totalPages: 0 };
  } catch (error) {
    console.error('Error fetching phones:', error);
    return { data: [], total: 0, totalPages: 0 };
  }
}

export async function fetchPhoneBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetch(`/api/phones/${slug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching phone:', error);
    return null;
  }
}

export async function fetchLatestPhones(limit: number = 6): Promise<any[]> {
  try {
    const response = await fetch(`/api/phones?action=latest&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching latest phones:', error);
    return [];
  }
}

export async function fetchFeaturedPhones(limit: number = 6): Promise<any[]> {
  try {
    const response = await fetch(`/api/phones?action=featured&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching featured phones:', error);
    return [];
  }
}

export async function fetchTrendingPhones(limit: number = 6): Promise<any[]> {
  try {
    const response = await fetch(`/api/phones?action=trending&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending phones:', error);
    return [];
  }
}

export async function fetchBrands(): Promise<string[]> {
  try {
    const response = await fetch('/api/phones?action=brands');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export async function fetchPhoneStats(): Promise<PhoneStats> {
  try {
    const response = await fetch('/api/phones?action=stats');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return { total: 0, published: 0, featured: 0, trending: 0, brands: 0, categories: [] };
  } catch (error) {
    console.error('Error fetching phone stats:', error);
    return { total: 0, published: 0, featured: 0, trending: 0, brands: 0, categories: [] };
  }
}

export async function fetchPhoneYears(): Promise<string[]> {
  try {
    const response = await fetch('/api/phones?action=years');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching years:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/phones?action=categories');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function searchPhones(query: string, limit: number = 20): Promise<any[]> {
  try {
    const response = await fetch(`/api/phones?action=search&query=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching phones:', error);
    return [];
  }
}

export async function getRelatedPhones(slug: string, limit: number = 4): Promise<any[]> {
  try {
    const response = await fetch(`/api/phones?action=related&slug=${slug}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching related phones:', error);
    return [];
  }
}

// ─── MUTATIONS ─────────────────────────────────────────

export async function createPhone(data: any): Promise<any | null> {
  try {
    const { id, ...cleanData } = data as any;
    const response = await fetch('/api/phones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanData),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to create phone');
  } catch (error) {
    console.error('Error creating phone:', error);
    return null;
  }
}

export async function updatePhone(slug: string, data: any): Promise<any | null> {
  try {
    const { id, ...cleanData } = data as any;
    const response = await fetch(`/api/phones/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, ...cleanData }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to update phone');
  } catch (error) {
    console.error('Error updating phone:', error);
    return null;
  }
}

export async function deletePhone(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/phones/${slug}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      return true;
    }
    throw new Error(result.error || 'Failed to delete phone');
  } catch (error) {
    console.error('Error deleting phone:', error);
    return false;
  }
}

// ─── FILTER HELPERS ─────────────────────────────────────

export const FILTER_OPTIONS = {
  ram: ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB'],
  storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
  chipset: ['Snapdragon', 'Apple', 'Tensor', 'MediaTek', 'Exynos', 'Dimensity'],
  os: ['iOS', 'Android', 'HarmonyOS'],
  display: ['Under 6.1"', '6.1-6.7"', '6.7+"'],
  refreshRate: ['60Hz', '90Hz', '120Hz', '144Hz'],
  battery: ['Under 4000mAh', '4000-5000mAh', '5000mAh+'],
  charging: ['Under 25W', '25-50W', '50-100W', '100W+'],
  camera: ['Dual', 'Triple', 'Quad', 'Penta'],
  connectivity: ['5G', 'WiFi 6', 'WiFi 7', 'NFC', 'Bluetooth 5.3'],
  price: ['Under $500', '$500-800', '$800-1200', '$1200+'],
} as const;

export type FilterKey = keyof typeof FILTER_OPTIONS;
export type FilterValue = typeof FILTER_OPTIONS[FilterKey][number];

export function getFilterOptions(key: FilterKey): string[] {
  return FILTER_OPTIONS[key] || [];
}

export function getAllFilterOptions(): Record<FilterKey, string[]> {
  return FILTER_OPTIONS;
}