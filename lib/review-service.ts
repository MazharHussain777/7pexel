// lib/review-service.ts
import { supabaseServer } from '@/lib/supabase/server';
import { isSupabaseAvailable } from '@/lib/supabase/server';

export interface PhoneReview {
  id: string;
  phone_slug: string;
  user_name: string;
  user_email?: string;
  rating: number;
  title: string;
  review: string;
  pros?: string;
  cons?: string;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Add a new review
export async function addReview(reviewData: {
  phone_slug: string;
  user_name: string;
  user_email?: string;
  rating: number;
  title: string;
  review: string;
  pros?: string;
  cons?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      // Fallback - store in localStorage or return mock success
      console.warn('Supabase not available, review stored locally');
      // Store in localStorage as fallback
      const existingReviews = JSON.parse(localStorage.getItem('phone_reviews') || '[]');
      const newReview = {
        id: `local-${Date.now()}`,
        ...reviewData,
        is_verified: false,
        is_approved: true, // Auto-approve for demo
        helpful_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem('phone_reviews', JSON.stringify([...existingReviews, newReview]));
      return { success: true, data: newReview };
    }

    const { data, error } = await supabaseServer
      .from('phone_reviews')
      .insert({
        phone_slug: reviewData.phone_slug,
        user_name: reviewData.user_name,
        user_email: reviewData.user_email || null,
        rating: reviewData.rating,
        title: reviewData.title,
        review: reviewData.review,
        pros: reviewData.pros || null,
        cons: reviewData.cons || null,
        is_verified: false,
        is_approved: false, // Admin approval needed
        helpful_count: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
}

// Get reviews for a phone
export async function getPhoneReviews(
  phoneSlug: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ reviews: PhoneReview[]; total: number }> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      // Fallback - get from localStorage
      const allReviews = JSON.parse(localStorage.getItem('phone_reviews') || '[]');
      const phoneReviews = allReviews
        .filter((r: any) => r.phone_slug === phoneSlug)
        .slice(offset, offset + limit);
      return { reviews: phoneReviews, total: phoneReviews.length };
    }

    const { data, error, count } = await supabaseServer
      .from('phone_reviews')
      .select('*', { count: 'exact' })
      .eq('phone_slug', phoneSlug)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { reviews: data || [], total: count || 0 };
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return { reviews: [], total: 0 };
  }
}

// Get review statistics for a phone
export async function getReviewStats(phoneSlug: string): Promise<ReviewStats> {
  try {
    if (!isSupabaseAvailable || !supabaseServer) {
      // Fallback - calculate from localStorage
      const allReviews = JSON.parse(localStorage.getItem('phone_reviews') || '[]');
      const phoneReviews = allReviews.filter((r: any) => r.phone_slug === phoneSlug);
      const total = phoneReviews.length;
      if (total === 0) {
        return {
          average_rating: 0,
          total_reviews: 0,
          rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }
      const sum = phoneReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      phoneReviews.forEach((r: any) => {
        distribution[r.rating as keyof typeof distribution]++;
      });
      return {
        average_rating: sum / total,
        total_reviews: total,
        rating_distribution: distribution
      };
    }

    const { data, error } = await supabaseServer
      .from('phone_reviews')
      .select('rating')
      .eq('phone_slug', phoneSlug)
      .eq('is_approved', true);

    if (error) throw error;

    const total = data.length;
    if (total === 0) {
      return {
        average_rating: 0,
        total_reviews: 0,
        rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const sum = data.reduce((acc, r) => acc + r.rating, 0);
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach((r) => {
      distribution[r.rating as keyof typeof distribution]++;
    });

    return {
      average_rating: sum / total,
      total_reviews: total,
      rating_distribution: distribution
    };
  } catch (error: any) {
    console.error('Error fetching review stats:', error);
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }
}