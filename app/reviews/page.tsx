// app/reviews/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";

interface Review {
  _id?: string;
  id: number;
  title: string;
  category: string;
  rating: number;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  pros: string[];
  cons: string[];
  price: string;
  verdict: string;
  slug: string;
}

// Fallback image for reviews without images
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

// Mock reviews data (fallback if API fails)
const mockReviewsData: Review[] = [
  {
    id: 1,
    title: "Sony WH-1000XM6: The Best Noise-Canceling Headphones?",
    category: "Audio",
    rating: 4.8,
    author: "David Kim",
    date: "July 7, 2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    excerpt: "Sony's latest flagship headphones deliver exceptional audio quality and industry-leading noise cancellation.",
    pros: ["Excellent sound quality", "Industry-leading ANC", "40-hour battery life", "Comfortable design"],
    cons: ["Premium price", "No EQ customization", "Bulky case"],
    price: "$399",
    verdict: "The Sony WH-1000XM6 sets a new standard for wireless noise-canceling headphones.",
    slug: "sony-wh-1000xm6-review",
  },
  {
    id: 2,
    title: "Samsung Galaxy Z Fold 7: The Ultimate Foldable Experience",
    category: "Phones",
    rating: 4.6,
    author: "Mike Chen",
    date: "July 9, 2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt: "Samsung's latest foldable smartphone pushes the boundaries of mobile technology.",
    pros: ["Stunning display", "Great multitasking", "Premium build", "Improved durability"],
    cons: ["Heavy", "Expensive", "Battery life could be better"],
    price: "$1,899",
    verdict: "The Galaxy Z Fold 7 is the most refined foldable phone Samsung has ever made.",
    slug: "samsung-galaxy-z-fold-7-review",
  },
  {
    id: 3,
    title: "Apple Vision Pro 2: The Future of Spatial Computing",
    category: "AR/VR",
    rating: 4.5,
    author: "Alex Rivera",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    excerpt: "Apple's second-generation Vision Pro headset pushes the boundaries of mixed reality.",
    pros: ["Incredible display quality", "Smooth performance", "Great ecosystem integration"],
    cons: ["Very expensive", "Limited content", "Heavy for long use"],
    price: "$3,499",
    verdict: "The Vision Pro 2 is the most advanced consumer AR/VR device ever created.",
    slug: "apple-vision-pro-2-review",
  },
  {
    id: 4,
    title: "Google Pixel 9 Pro: AI-Powered Photography",
    category: "Phones",
    rating: 4.4,
    author: "Sarah Johnson",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    excerpt: "Google's latest flagship phone delivers exceptional camera performance powered by AI.",
    pros: ["Best camera in its class", "Clean Android experience", "Great AI features"],
    cons: ["Average battery life", "Slow charging", "Limited storage options"],
    price: "$999",
    verdict: "The Pixel 9 Pro is the best Android phone for photography enthusiasts.",
    slug: "google-pixel-9-pro-review",
  },
  {
    id: 5,
    title: "Tesla Model 3 2026: Electric Perfection",
    category: "Automotive",
    rating: 4.3,
    author: "James Wilson",
    date: "July 18, 2026",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    excerpt: "Tesla's refreshed Model 3 sets new standards for electric vehicles.",
    pros: ["Great range", "Fast acceleration", "Excellent tech features"],
    cons: ["Build quality issues", "Expensive repairs", "Limited service centers"],
    price: "$45,000",
    verdict: "The Model 3 remains one of the best EVs you can buy.",
    slug: "tesla-model-3-2026-review",
  },
  {
    id: 6,
    title: "OpenAI GPT-5: A New Era of AI",
    category: "AI",
    rating: 4.9,
    author: "Maya Chen",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    excerpt: "OpenAI's latest model demonstrates unprecedented reasoning capabilities.",
    pros: ["Human-level reasoning", "Multimodal understanding", "Fast inference"],
    cons: ["Still limited access", "High cost for API", "Potential misuse concerns"],
    price: "Subscription",
    verdict: "GPT-5 is a quantum leap in artificial intelligence.",
    slug: "openai-gpt-5-review",
  },
  {
    id: 7,
    title: "MacBook Pro M4: The Ultimate Creative Workstation",
    category: "Laptops",
    rating: 4.7,
    author: "Emily Zhang",
    date: "July 22, 2026",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    excerpt: "Apple's M4-powered MacBook Pro redefines professional computing performance.",
    pros: ["Incredible performance", "Stunning display", "Great battery life", "Quiet operation"],
    cons: ["Expensive", "Limited ports", "Not upgradeable"],
    price: "$2,499",
    verdict: "The M4 MacBook Pro is the best laptop for creative professionals.",
    slug: "macbook-pro-m4-review",
  },
  {
    id: 8,
    title: "DJI Mini 5 Pro: Pocket-Sized Aerial Power",
    category: "Drones",
    rating: 4.6,
    author: "Mark Rivera",
    date: "July 25, 2026",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80",
    excerpt: "DJI's latest mini drone packs professional features into a compact body.",
    pros: ["Ultra-portable", "Excellent camera", "Long flight time", "Advanced obstacle avoidance"],
    cons: ["Pricey accessories", "Limited wind resistance", "No 360° obstacle sensing"],
    price: "$999",
    verdict: "The Mini 5 Pro is the best compact drone for creators on the go.",
    slug: "dji-mini-5-pro-review",
  },
  {
    id: 9,
    title: "Samsung Odyssey G9: Ultimate Gaming Monitor",
    category: "Gaming",
    rating: 4.5,
    author: "Chris Park",
    date: "July 28, 2026",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    excerpt: "Samsung's 57-inch dual 4K gaming monitor delivers an immersive experience like no other.",
    pros: ["Massive screen", "4K resolution", "240Hz refresh rate", "HDR 1000"],
    cons: ["Requires powerful GPU", "Very expensive", "Heavy and large"],
    price: "$2,999",
    verdict: "The Odyssey G9 is the ultimate gaming monitor for enthusiasts.",
    slug: "samsung-odyssey-g9-review",
  },
  {
    id: 10,
    title: "Garmin Fenix 8: The Ultimate Fitness Watch",
    category: "Wearables",
    rating: 4.4,
    author: "Lisa Thompson",
    date: "July 30, 2026",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    excerpt: "Garmin's latest Fenix watch offers unparalleled fitness tracking and outdoor features.",
    pros: ["Excellent battery life", "Advanced fitness features", "Solar charging", "Durable build"],
    cons: ["Expensive", "Heavy for daily wear", "Complex UI"],
    price: "$1,199",
    verdict: "The Fenix 8 is the best smartwatch for serious athletes.",
    slug: "garmin-fenix-8-review",
  },
  {
    id: 11,
    title: "Sony A7 VI: The Photographer's Dream",
    category: "Photography",
    rating: 4.8,
    author: "Nina Patel",
    date: "August 2, 2026",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    excerpt: "Sony's latest full-frame mirrorless camera delivers exceptional image quality and performance.",
    pros: ["Excellent image quality", "Fast autofocus", "Great low-light performance", "Solid build"],
    cons: ["Expensive lenses", "Complex menu system", "Large file sizes"],
    price: "$3,499",
    verdict: "The A7 VI is the best full-frame camera for professionals.",
    slug: "sony-a7-vi-review",
  },
  {
    id: 12,
    title: "Bose QC Ultra: Quiet Comfort Redefined",
    category: "Audio",
    rating: 4.5,
    author: "David Kim",
    date: "August 5, 2026",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    excerpt: "Bose's latest noise-canceling headphones offer premium comfort and audio quality.",
    pros: ["Best-in-class ANC", "Lightweight and comfortable", "Great sound", "Customizable EQ"],
    cons: ["Premium price", "No USB-C charging", "Limited codec support"],
    price: "$429",
    verdict: "The QC Ultra is the most comfortable noise-canceling headphones available.",
    slug: "bose-qc-ultra-review",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviewsData);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviewsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/reviews?limit=100");
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        // Map API data to match the UI structure
        const apiReviews = result.data.map((item: any, index: number) => ({
          id: item.id || index + 1,
          _id: item._id,
          title: item.title || "Untitled Review",
          category: item.category || "General",
          rating: item.rating || 0,
          author: item.author || "Unknown",
          date: item.date || new Date().toLocaleDateString(),
          image: item.image && item.image.trim() !== "" ? item.image : FALLBACK_IMAGE,
          excerpt: item.excerpt || "",
          pros: item.pros || [],
          cons: item.cons || [],
          price: item.price || "N/A",
          verdict: item.verdict || "",
          slug: item.slug || "",
        }));
        setReviews(apiReviews);
        setFilteredReviews(apiReviews);
      } else {
        // If API returns no data, use mock data
        setReviews(mockReviewsData);
        setFilteredReviews(mockReviewsData);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      // Fallback to mock data
      setReviews(mockReviewsData);
      setFilteredReviews(mockReviewsData);
      setError("Failed to load reviews from server. Using local data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Get unique categories
  const categories = ["All", ...new Set(reviews.map(r => r.category))];

  // Filter reviews
  useEffect(() => {
    let filtered = reviews;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term)
      );
    }

    setFilteredReviews(filtered);
  }, [selectedCategory, searchTerm, reviews]);

  // Helper function to get valid image URL
  const getValidImageUrl = (url: string): string => {
    if (!url || url.trim() === "") {
      return FALLBACK_IMAGE;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-[#7F011F]/40" />
          <p className="text-[#6d4a4a] mt-4">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
            <h1 className="text-4xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-3">
              <i className="fas fa-star text-[#FFD700]" />
              Reviews
            </h1>
          </div>
          <p className="text-[#6d4a4a] ml-5">
            Honest reviews of the latest tech products and services
          </p>
          {error && (
            <div className="mt-2 ml-5 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
              <i className="fas fa-info-circle mr-1" />
              {error}
            </div>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-sm border border-[rgba(127,1,31,0.06)] focus-within:shadow-md focus-within:border-[#7F011F]/20 transition-all">
              <i className="fas fa-search text-[#7F011F]/40 mr-3" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="flex-1 bg-transparent outline-none text-sm text-[#2d1a1a] placeholder:text-[#7F011F]/30 font-['Poppins',sans-serif]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[#7F011F]/40 hover:text-[#7F011F] transition-colors"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter - Hidden scrollbar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap font-['Poppins',sans-serif] flex-shrink-0 ${
                  selectedCategory === category
                    ? "bg-[#7F011F] text-white shadow-lg shadow-[#7F011F]/30"
                    : "bg-white text-[#2d1a1a] hover:bg-[#f5ebd0] border border-[rgba(127,1,31,0.06)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-[#6d4a4a] mb-4">
          <span className="font-semibold text-[#2d1a1a]">{filteredReviews.length}</span> reviews found
        </div>

        {/* Reviews Grid - 5 columns */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredReviews.map((review) => {
              const imageUrl = getValidImageUrl(review.image);
              return (
                <Link
                  key={review._id || review.id}
                  href={`/reviews/${review.slug}`}
                  className="group bg-white rounded-sm overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image - Clean, full width */}
                  <div className="relative w-full aspect-square overflow-hidden bg-[#f5ebd0]/20">
                    <Image
                      src={imageUrl}
                      alt={review.title || "Review image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      priority={review.id <= 6}
                      onError={(e) => {
                        // If image fails to load, replace with fallback
                        const target = e.target as HTMLImageElement;
                        if (target.src !== FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7F011F]/0 via-[#7F011F]/0 to-[#7F011F]/0 group-hover:from-[#7F011F]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
                  </div>

                  {/* Title - Clean, centered */}
                  <div className="p-2.5 text-center">
                    <h3 className="text-[0.7rem] font-medium text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif] leading-snug">
                      {review.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-[rgba(127,1,31,0.06)]">
            <i className="fas fa-star text-4xl text-[#7F011F]/20 mb-4 block" />
            <p className="text-[#6d4a4a] font-['Poppins',sans-serif]">
              No reviews found matching your criteria
            </p>
          </div>
        )}
      </main>

      {/* Add global styles for hiding scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}