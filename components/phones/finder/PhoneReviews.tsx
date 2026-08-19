// components/phones/finder/PhoneReviews.tsx
"use client";

import { useState, useEffect } from "react";
import { getPhoneReviews, addReview, getReviewStats } from "@/lib/review-service";
import { getBrandTheme } from "@/lib/phone-data";

interface PhoneReviewsProps {
  phoneSlug: string;
  phoneBrand: string;
  phoneModel: string;
}

export function PhoneReviews({ phoneSlug, phoneBrand, phoneModel }: PhoneReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form state - Only message field
  const [formData, setFormData] = useState({
    user_name: '',
    rating: 5,
    review: '',
  });

  const theme = getBrandTheme(phoneBrand);
  const fullName = `${phoneBrand} ${phoneModel}`;

  // Load reviews
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const [reviewsData, statsData] = await Promise.all([
          getPhoneReviews(phoneSlug, 20),
          getReviewStats(phoneSlug)
        ]);
        setReviews(reviewsData.reviews);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [phoneSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const result = await addReview({
        phone_slug: phoneSlug,
        user_name: formData.user_name || 'Anonymous',
        rating: formData.rating,
        title: formData.review.slice(0, 60) + (formData.review.length > 60 ? '...' : ''),
        review: formData.review,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setShowForm(false);
        setFormData({
          user_name: '',
          rating: 5,
          review: '',
        });
        // Reload reviews
        const [reviewsData, statsData] = await Promise.all([
          getPhoneReviews(phoneSlug, 20),
          getReviewStats(phoneSlug)
        ]);
        setReviews(reviewsData.reviews);
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xs ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Render star input
  const renderStarInput = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`text-xl transition-colors ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <h2 className="text-lg md:text-xl font-bold text-[#4A3520]">
              User Reviews
            </h2>
            <span className="text-[0.55rem] bg-[#FFF5EB] text-[#8B7355] px-2.5 py-0.5 rounded-full font-semibold">
              {stats?.total_reviews || 0}
            </span>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-sm font-semibold rounded-full bg-[#FF6B00] text-white hover:bg-[#E55D00] transition-all hover:scale-105"
          >
            {showForm ? 'Cancel' : 'Write Review'}
          </button>
        </div>

        {/* Stats Summary */}
        {stats && stats.total_reviews > 0 && (
          <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="text-xl font-bold text-[#1A2A2E]">
                {stats.average_rating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1">
                {renderStars(Math.round(stats.average_rating))}
              </div>
              <div className="text-[0.6rem] text-gray-400">
                {stats.total_reviews} reviews
              </div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.rating_distribution?.[star] || 0;
                const percentage = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-[0.6rem]">
                    <span className="w-6 text-gray-500">{star}★</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-6 text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Review Form - Simplified */}
        {showForm && (
          <div className="mb-4 p-4 border border-[#FFE4C4] rounded-xl bg-[#FFFBF5]">
            <h3 className="font-semibold text-[#4A3520] mb-2 text-sm">Write a Review for {fullName}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={formData.user_name}
                onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none text-sm"
              />
              
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Your Rating</label>
                {renderStarInput()}
              </div>

              <textarea
                placeholder="Write your review here..."
                required
                rows={4}
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none text-sm resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 font-semibold rounded-lg bg-[#FF6B00] text-white hover:bg-[#E55D00] transition-all disabled:opacity-50 text-sm"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            ✅ Your review has been submitted successfully! It will appear after moderation.
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#FFE4C4] scrollbar-track-transparent">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <span className="text-3xl block mb-2">📝</span>
              <p className="text-sm">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center text-white text-xs font-bold">
                        {review.user_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#4A3520]">
                          {review.user_name || 'Anonymous'}
                        </span>
                        {review.is_verified && (
                          <span className="ml-1 text-[0.45rem] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-0.5">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-[0.45rem] text-gray-400">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <h4 className="font-semibold text-sm text-[#4A3520] mt-1">
                  {review.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {review.review}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    className="text-[0.45rem] text-gray-400 hover:text-[#FF6B00] transition-colors"
                    onClick={async () => {
                      // Add helpful count logic
                    }}
                  >
                    👍 Helpful ({review.helpful_count || 0})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}