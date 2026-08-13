// lib/services/phoneServiceMock.ts
import { phonesData } from "@/lib/phoneData";

// This will now fetch from MongoDB via API
export async function getPhoneBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/phones/${slug}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching phone:", error);
    // Fallback to local data
    return phonesData.find(p => p.slug === slug) || null;
  }
}

export async function getRelatedPhones(slug: string, limit: number = 7) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/phones/${slug}/related?limit=${limit}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching related phones:", error);
    const phone = phonesData.find(p => p.slug === slug);
    if (!phone) return [];
    return phonesData
      .filter(p => p.slug !== slug && p.brand === phone.brand)
      .slice(0, limit);
  }
}