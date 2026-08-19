// lib/phone-service.ts - Supabase Version
import PhoneModel from '@/models/Phone';

export async function getAllPhones(options: any = {}) {
  return PhoneModel.find(options);
}

export async function getPhoneBySlug(slug: string) {
  return PhoneModel.findBySlug(slug);
}

export async function getLatestPhones(limit: number = 6) {
  return PhoneModel.findLatest(limit);
}

export async function getFeaturedPhones(limit: number = 6) {
  return PhoneModel.findFeatured(limit);
}

export async function getTrendingPhones(limit: number = 6) {
  return PhoneModel.findTrending(limit);
}

export async function getBrands() {
  return PhoneModel.getBrands();
}

export async function getCategories() {
  return PhoneModel.getCategories();
}

export async function getYears() {
  return PhoneModel.getYears();
}

export async function getPhoneStats() {
  return PhoneModel.getStats();
}

export async function searchPhones(query: string, limit: number = 20) {
  return PhoneModel.search(query, limit);
}

export async function getRelatedPhones(slug: string, limit: number = 4) {
  try {
    const currentPhone = await getPhoneBySlug(slug);
    if (!currentPhone) return [];

    // Try same brand first
    const brandPhones = await PhoneModel.find({
      brand: currentPhone.brand,
      published: true,
      limit: limit
    });

    const filtered = brandPhones.data.filter(p => p.slug !== slug);
    if (filtered.length > 0) return filtered;

    // Try same category
    if (currentPhone.category && currentPhone.category.length > 0) {
      const categoryPhones = await PhoneModel.find({
        category: currentPhone.category[0],
        published: true,
        limit: limit
      });
      return categoryPhones.data.filter(p => p.slug !== slug);
    }

    // Any other phones
    const otherPhones = await PhoneModel.find({
      published: true,
      limit: limit
    });
    return otherPhones.data.filter(p => p.slug !== slug);
  } catch (error) {
    console.error('Error in getRelatedPhones:', error);
    return [];
  }
}

export async function createPhone(data: any) {
  return PhoneModel.create(data);
}

export async function updatePhone(slug: string, data: any) {
  return PhoneModel.findBySlugAndUpdate(slug, data);
}

export async function deletePhone(slug: string) {
  return PhoneModel.findBySlugAndDelete(slug);
}