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

// ─── FETCH PHONES FROM DATABASE ──────────────────────────

export async function fetchPhones(options: FetchPhonesOptions = {}): Promise<{ 
  data: IPhone[]; 
  total: number; 
  totalPages: number;
}> {
  try {
    const params = new URLSearchParams();
    
    // Basic filters
    if (options.brand) params.set('brand', options.brand);
    if (options.category) params.set('category', options.category);
    if (options.year) params.set('year', options.year);
    if (options.featured) params.set('featured', 'true');
    if (options.trending) params.set('trending', 'true');
    if (options.search) params.set('search', options.search);
    if (options.page) params.set('page', String(options.page || 1));
    if (options.limit) params.set('limit', String(options.limit || 100));
    if (options.sort) params.set('sort', options.sort);
    
    // Advanced filters
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
        totalPages: data.pagination?.totalPages || 0,
      };
    }
    return { data: [], total: 0, totalPages: 0 };
  } catch (error) {
    console.error('Error fetching phones:', error);
    return { data: [], total: 0, totalPages: 0 };
  }
}

export async function fetchPhoneBySlug(slug: string): Promise<IPhone | null> {
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

export async function fetchLatestPhones(limit: number = 6): Promise<IPhone[]> {
  try {
    const response = await fetch(`/api/phones?latest=true&limit=${limit}`);
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

export async function fetchFeaturedPhones(limit: number = 6): Promise<IPhone[]> {
  try {
    const response = await fetch(`/api/phones?featured=true&limit=${limit}`);
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

export async function fetchTrendingPhones(limit: number = 6): Promise<IPhone[]> {
  try {
    const response = await fetch(`/api/phones?trending=true&limit=${limit}`);
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

export async function fetchBrandWithCounts(): Promise<{ brand: string; count: number }[]> {
  try {
    const response = await fetch('/api/phones?action=brands-with-counts');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching brands with counts:', error);
    return [];
  }
}

export async function searchPhones(query: string, limit: number = 20): Promise<IPhone[]> {
  try {
    const response = await fetch(`/api/phones?search=${encodeURIComponent(query)}&limit=${limit}`);
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

export async function getRelatedPhones(slug: string, limit: number = 4): Promise<IPhone[]> {
  try {
    const response = await fetch(`/api/phones?related=${slug}&limit=${limit}`);
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

export async function createPhone(data: Partial<IPhone>): Promise<IPhone | null> {
  try {
    const response = await fetch('/api/phones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

export async function updatePhone(slug: string, data: Partial<IPhone>): Promise<IPhone | null> {
  try {
    const response = await fetch(`/api/phones/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, ...data }),
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

export async function seedPhones(): Promise<IPhone[]> {
  try {
    const response = await fetch('/api/phones?action=seed');
    const result = await response.json();
    if (result.success) {
      return result.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error seeding phones:', error);
    return [];
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

// ─── BRAND HELPERS ─────────────────────────────────────

export const BRAND_COLORS: Record<string, string> = {
  Apple: '#555555',
  Samsung: '#1428A0',
  Google: '#4285F4',
  OnePlus: '#E54141',
  Xiaomi: '#FF6900',
  Oppo: '#1A8C4A',
  Vivo: '#415FFF',
  Nothing: '#000000',
  Motorola: '#00B388',
  Huawei: '#CF0A2C',
  Sony: '#000000',
  LG: '#A50034',
  Nokia: '#0944B3',
  Asus: '#005A9C',
  Lenovo: '#E2231A',
  Honor: '#0A0A0A',
  Realme: '#FF6C00',
  Tecno: '#FF3366',
  Infinix: '#FF6600',
  'Black Shark': '#000000',
  Razer: '#00FF00',
};

export const BRAND_EMOJIS: Record<string, string> = {
  Apple: '🍎',
  Samsung: '📱',
  Google: '🔵',
  OnePlus: '🔴',
  Xiaomi: '🟠',
  Oppo: '🟢',
  Vivo: '🔷',
  Nothing: '⚫',
  Motorola: '🟩',
  Huawei: '🔴',
  Sony: '🎮',
  LG: '🟣',
  Nokia: '🔵',
  Asus: '🟦',
  Lenovo: '🟥',
  Honor: '🔶',
  Realme: '🟧',
  Tecno: '🟥',
  Infinix: '🟧',
  'Black Shark': '⚫',
  Razer: '🟩',
};

export const BRAND_THEMES: Record<string, { primary: string; secondary: string }> = {
  Apple: { primary: '#555555', secondary: '#888888' },
  Samsung: { primary: '#1428A0', secondary: '#4A6CF7' },
  Google: { primary: '#4285F4', secondary: '#34A853' },
  OnePlus: { primary: '#E54141', secondary: '#FF6B6B' },
  Xiaomi: { primary: '#FF6900', secondary: '#FF9E44' },
  Oppo: { primary: '#1A8C4A', secondary: '#34A853' },
  Vivo: { primary: '#415FFF', secondary: '#6B8AFF' },
  Nothing: { primary: '#000000', secondary: '#333333' },
  Motorola: { primary: '#00B388', secondary: '#33C9A8' },
  Huawei: { primary: '#CF0A2C', secondary: '#E53935' },
  Sony: { primary: '#000000', secondary: '#444444' },
  LG: { primary: '#A50034', secondary: '#C62828' },
};

export function getBrandColor(brand: string): string {
  return BRAND_COLORS[brand] || '#555555';
}

export function getBrandEmoji(brand: string): string {
  return BRAND_EMOJIS[brand] || '📱';
}

export function getBrandTheme(brand: string): { primary: string; secondary: string } {
  return BRAND_THEMES[brand] || { primary: '#555555', secondary: '#888888' };
}

export function getPhoneSlug(model: string): string {
  return model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function getPhoneImage(brand: string, model: string): string {
  const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = model.toLowerCase().replace(/\s+/g, '-');
  return `/images/phones/${brandSlug}/${modelSlug}.jpg`;
}

export function formatPrice(price: string | number): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(0)}`;
  }
  return price;
}

export function getRatingStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '⭐'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}