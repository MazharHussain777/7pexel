// app/auto/data/auto-db.ts
import { IAuto } from '@/models/Auto';

interface FetchAutosOptions {
  brand?: string;
  category?: string;
  year?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'price' | 'year' | 'newest' | 'popular';
}

interface AutoStats {
  total: number;
  published: number;
  featured: number;
  trending: number;
  brands: number;
  categories: string[];
}

// ─── FETCH AUTOS ──────────────────────────────────────────

export async function fetchAutos(options: FetchAutosOptions = {}): Promise<{
  data: IAuto[];
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
    if (options.limit) params.set('limit', String(options.limit || 20));
    if (options.sort) params.set('sort', options.sort);

    const url = `/api/autos?${params.toString()}`;
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
    console.error('Error fetching autos:', error);
    return { data: [], total: 0, totalPages: 0 };
  }
}

export async function fetchAutoBySlug(slug: string): Promise<IAuto | null> {
  try {
    const response = await fetch(`/api/autos/${slug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching auto:', error);
    return null;
  }
}

export async function fetchLatestAutos(limit: number = 6): Promise<IAuto[]> {
  try {
    const response = await fetch(`/api/autos?latest=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching latest autos:', error);
    return [];
  }
}

export async function fetchFeaturedAutos(limit: number = 6): Promise<IAuto[]> {
  try {
    const response = await fetch(`/api/autos?featured=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching featured autos:', error);
    return [];
  }
}

export async function fetchTrendingAutos(limit: number = 6): Promise<IAuto[]> {
  try {
    const response = await fetch(`/api/autos?trending=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending autos:', error);
    return [];
  }
}

export async function fetchAutoBrands(): Promise<string[]> {
  try {
    const response = await fetch('/api/autos?action=brands');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching auto brands:', error);
    return [];
  }
}

export async function fetchAutoStats(): Promise<AutoStats> {
  try {
    const response = await fetch('/api/autos?action=stats');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return { total: 0, published: 0, featured: 0, trending: 0, brands: 0, categories: [] };
  } catch (error) {
    console.error('Error fetching auto stats:', error);
    return { total: 0, published: 0, featured: 0, trending: 0, brands: 0, categories: [] };
  }
}

export async function fetchAutoCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/autos?action=categories');
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching auto categories:', error);
    return [];
  }
}

export async function searchAutos(query: string, limit: number = 20): Promise<IAuto[]> {
  try {
    const response = await fetch(`/api/autos?search=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching autos:', error);
    return [];
  }
}

export async function getRelatedAutos(slug: string, limit: number = 4): Promise<IAuto[]> {
  try {
    const response = await fetch(`/api/autos?related=${slug}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching related autos:', error);
    return [];
  }
}

// ─── MUTATIONS ─────────────────────────────────────────

export async function createAuto(data: Partial<IAuto>): Promise<IAuto | null> {
  try {
    const response = await fetch('/api/autos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to create auto');
  } catch (error) {
    console.error('Error creating auto:', error);
    return null;
  }
}

export async function updateAuto(slug: string, data: Partial<IAuto>): Promise<IAuto | null> {
  try {
    const response = await fetch(`/api/autos/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, ...data }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to update auto');
  } catch (error) {
    console.error('Error updating auto:', error);
    return null;
  }
}

export async function deleteAuto(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/autos/${slug}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      return true;
    }
    throw new Error(result.error || 'Failed to delete auto');
  } catch (error) {
    console.error('Error deleting auto:', error);
    return false;
  }
}

export async function seedAutos(): Promise<IAuto[]> {
  try {
    const response = await fetch('/api/autos?action=seed');
    const result = await response.json();
    if (result.success) {
      return result.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error seeding autos:', error);
    return [];
  }
}