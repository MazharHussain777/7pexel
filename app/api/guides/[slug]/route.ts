// app/guides/data/guide-db.ts
import { IGuide } from '@/models/Guide';
import { IGuideCategory } from '@/models/GuideCategory';

// ─── CATEGORY FUNCTIONS ──────────────────────────────────

export async function fetchGuideCategories(): Promise<IGuideCategory[]> {
  try {
    const response = await fetch('/api/guides/categories');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching guide categories:', error);
    return [];
  }
}

export async function fetchGuideCategory(slug: string): Promise<IGuideCategory | null> {
  try {
    const response = await fetch(`/api/guides/categories/${slug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching guide category:', error);
    return null;
  }
}

// ─── GUIDE FUNCTIONS ─────────────────────────────────────

export async function fetchGuides(
  options: {
    category?: string;
    featured?: boolean;
    trending?: boolean;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{ guides: IGuide[]; total: number }> {
  try {
    const params = new URLSearchParams();
    if (options.category) params.set('category', options.category);
    if (options.featured) params.set('featured', 'true');
    if (options.trending) params.set('trending', 'true');
    if (options.tag) params.set('tag', options.tag);
    if (options.search) params.set('search', options.search);
    if (options.page) params.set('page', String(options.page));
    if (options.limit) params.set('limit', String(options.limit));
    
    const url = `/api/guides?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success) {
      return { guides: data.data, total: data.total || data.data.length };
    }
    return { guides: [], total: 0 };
  } catch (error) {
    console.error('Error fetching guides:', error);
    return { guides: [], total: 0 };
  }
}

export async function fetchGuideBySlug(slug: string): Promise<IGuide | null> {
  try {
    const response = await fetch(`/api/guides?slug=${slug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching guide:', error);
    return null;
  }
}

export async function fetchFeaturedGuides(limit: number = 4): Promise<IGuide[]> {
  try {
    const response = await fetch(`/api/guides?featured=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching featured guides:', error);
    return [];
  }
}

export async function fetchTrendingGuides(limit: number = 4): Promise<IGuide[]> {
  try {
    const response = await fetch(`/api/guides?trending=true&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending guides:', error);
    return [];
  }
}

export async function fetchGuidesByCategory(categorySlug: string): Promise<IGuide[]> {
  try {
    const response = await fetch(`/api/guides?category=${categorySlug}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching guides by category:', error);
    return [];
  }
}

export async function searchGuides(query: string): Promise<IGuide[]> {
  try {
    const response = await fetch(`/api/guides/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error searching guides:', error);
    return [];
  }
}

export async function fetchGuideTags(): Promise<string[]> {
  try {
    const response = await fetch('/api/guides?action=tags');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching guide tags:', error);
    return [];
  }
}

export async function fetchGuideStats(): Promise<{
  total: number;
  featured: number;
  categories: number;
  tags: number;
}> {
  try {
    const response = await fetch('/api/guides/stats');
    const data = await response.json();
    if (data.success) {
      return data;
    }
    return { total: 0, featured: 0, categories: 0, tags: 0 };
  } catch (error) {
    console.error('Error fetching guide stats:', error);
    return { total: 0, featured: 0, categories: 0, tags: 0 };
  }
}

// ─── MIGRATION ───────────────────────────────────────────

export async function seedGuideCategoriesFromData(
  categories: Array<{
    id: string;
    slug: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    gradient: string;
    count: number;
    newCount: number;
    href: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  }>
): Promise<boolean> {
  try {
    const response = await fetch('/api/guides?action=seed-categories', {
      method: 'GET',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error seeding guide categories:', error);
    return false;
  }
}