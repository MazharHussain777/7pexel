// app/compare/data/compare-db.ts
import { CompareItem } from '@/lib/compare-service';

interface FetchCompareOptions {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'price' | 'name' | 'newest';
}

interface CompareStats {
  total: number;
  categories: { category: string; count: number }[];
  brands: { brand: string; count: number }[];
  avgRating: number;
}

// ─── FETCH FUNCTIONS ─────────────────────────────────────

export async function fetchCompareItems(options: FetchCompareOptions = {}): Promise<{
  data: CompareItem[];
  total: number;
  totalPages: number;
}> {
  try {
    const params = new URLSearchParams();
    if (options.category && options.category !== 'all') params.set('category', options.category);
    if (options.brand) params.set('brand', options.brand);
    if (options.search) params.set('search', options.search);
    if (options.page) params.set('page', String(options.page || 1));
    if (options.limit) params.set('limit', String(options.limit || 20));
    if (options.sort) params.set('sort', options.sort);

    const url = `/api/compare?${params.toString()}`;
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
    console.error('Error fetching compare items:', error);
    return { data: [], total: 0, totalPages: 0 };
  }
}

export async function fetchCompareItemBySlug(slug: string): Promise<CompareItem | null> {
  try {
    const response = await fetch(`/api/compare/${slug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching compare item:', error);
    return null;
  }
}

export async function fetchCompareCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/compare?action=categories');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching compare categories:', error);
    return [];
  }
}

export async function fetchCompareBrands(): Promise<string[]> {
  try {
    const response = await fetch('/api/compare?action=brands');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching compare brands:', error);
    return [];
  }
}

export async function fetchCompareStats(): Promise<CompareStats> {
  try {
    const response = await fetch('/api/compare?action=stats');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return { total: 0, categories: [], brands: [], avgRating: 0 };
  } catch (error) {
    console.error('Error fetching compare stats:', error);
    return { total: 0, categories: [], brands: [], avgRating: 0 };
  }
}

export async function fetchTopRatedCompareItems(limit: number = 6): Promise<CompareItem[]> {
  try {
    const response = await fetch(`/api/compare?topRated=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching top rated compare items:', error);
    return [];
  }
}

export async function fetchPopularCompareItems(limit: number = 6): Promise<CompareItem[]> {
  try {
    const response = await fetch(`/api/compare?popular=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching popular compare items:', error);
    return [];
  }
}

export async function searchCompareItems(query: string, limit: number = 20): Promise<CompareItem[]> {
  try {
    const response = await fetch(`/api/compare?search=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching compare items:', error);
    return [];
  }
}

export async function getRelatedCompareItems(slug: string, limit: number = 4): Promise<CompareItem[]> {
  try {
    const response = await fetch(`/api/compare?related=${slug}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching related compare items:', error);
    return [];
  }
}