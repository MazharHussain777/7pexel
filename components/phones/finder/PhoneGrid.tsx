// components/phones/finder/PhoneGrid.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchPhones } from "@/app/phones/finder/data/phone-db";

interface PhoneGridProps {
  searchTerm?: string;
  filters?: Record<string, any>;
  initialPhones?: any[];
  initialTotal?: number;
}

export function PhoneGrid({ 
  searchTerm = "", 
  filters = {},
  initialPhones = [],
  initialTotal = 0
}: PhoneGridProps) {
  const [phones, setPhones] = useState(initialPhones);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "popular">("newest");
  const [visibleCount, setVisibleCount] = useState(18);

  // Parse price helper
  const parsePrice = (price: string): number => {
    if (!price) return 0;
    return parseInt(price.replace(/[$,]/g, ''));
  };

  // Fetch phones from database when filters or search changes
  useEffect(() => {
    const loadPhones = async () => {
      setLoading(true);
      try {
        const result = await fetchPhones({
          search: searchTerm || undefined,
          brand: filters.brand,
          category: filters.category,
          year: filters.year,
          featured: filters.featured,
          trending: filters.trending,
          sort: sortBy,
          limit: 100,
        });
        setPhones(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching phones:', error);
      } finally {
        setLoading(false);
      }
    };

    if (initialPhones.length === 0 || searchTerm || Object.keys(filters).length > 0) {
      loadPhones();
    }
  }, [searchTerm, filters, sortBy]);

  // Sort phones locally after fetch
  const sortedPhones = useMemo(() => {
    const list = [...phones];
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-high":
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "popular":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        list.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));
        break;
    }
    return list;
  }, [phones, sortBy]);

  // Get visible phones
  const visiblePhones = useMemo(() => {
    return sortedPhones.slice(0, visibleCount);
  }, [sortedPhones, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 18, sortedPhones.length));
  };

  if (loading) {
    return (
      <div className="col-span-full py-15 px-5 text-center bg-[#F8F8F8] rounded-[40px] text-[#8B7355]">
        <span className="text-[2rem]">⏳</span>
        <h3 className="my-3 mb-1.5 font-medium text-[#4A3520]">Loading phones...</h3>
        <p className="text-[0.9rem]">Please wait while we fetch the latest data.</p>
      </div>
    );
  }

  if (sortedPhones.length === 0) {
    return (
      <div className="col-span-full py-15 px-5 text-center bg-[#F8F8F8] rounded-[40px] text-[#8B7355]">
        <span className="text-[2rem]">🔍</span>
        <h3 className="my-3 mb-1.5 font-medium text-[#4A3520]">No phones found</h3>
        <p className="text-[0.9rem]">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header with Sort */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-[0.95rem] bg-[#FFF5EB] px-5 py-1.5 rounded-full flex items-center gap-2 border border-[#FFE4C4]">
            <span className="text-[1rem]">📱</span>
            <b className="font-jetbrains-mono text-[#FF6B00]">{total}</b>
            <span className="text-[#8B7355] font-normal">phones found</span>
          </span>
          <span className="text-[0.8rem] text-[#8B7355]">
            Showing 1–{Math.min(sortedPhones.length, visibleCount)} of <span className="font-semibold text-[#4A3520]">{total}</span>
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[0.75rem] text-[#8B7355] font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-[#E8E8E8] rounded-full px-4 py-1.5 text-[0.78rem] font-medium bg-white text-[#4A3520] focus:border-[#FF6B00] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Phone Grid - 9 in 1 row */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 md:gap-3">
        {visiblePhones.map((phone) => {
          const slug = phone.slug;
          const brandColor = getBrandColor(phone.brand);
          
          const imageUrl = phone.image || phone.imageUrl || '/images/placeholder-phone.jpg';

          return (
            <Link
              key={phone._id || phone.slug}
              href={`/phones/finder/${slug}`}
              className="group block border border-[#E8E8E8] rounded-[8px] overflow-hidden bg-white transition-all duration-300 hover:border-[#FF6B00] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,107,0,0.10)]"
            >
              {/* Image Area */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
                <Image
                  src={imageUrl}
                  alt={`${phone.brand} ${phone.model}`}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 14vw, 11vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center text-4xl bg-white';
                      fallback.textContent = getBrandEmoji(phone.brand);
                      parent.appendChild(fallback);
                    }
                  }}
                />
                
                {/* Year Badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-[#FF6B00]/80 backdrop-blur-sm text-white text-[0.4rem] font-medium px-1.5 py-0.5 rounded-full">
                  {phone.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-2 text-center">
                <div className="text-[0.45rem] uppercase tracking-[0.06em] text-[#8B7355] font-semibold mb-0.5 truncate">
                  {phone.brand}
                </div>
                <h4 className="font-fraunces font-semibold text-[0.7rem] leading-[1.2] text-[#4A3520] group-hover:text-[#FF6B00] transition-colors duration-300 line-clamp-1">
                  {phone.model}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < sortedPhones.length && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 border-2 border-dashed border-[#E8E8E8] rounded-full font-semibold text-[0.88rem] text-[#8B7355] transition-all duration-200 hover:border-[#FF6B00] hover:text-[#FF6B00] hover:border-solid hover:bg-[#FFF5EB]"
          >
            Load More Phones
            <span className="ml-2 text-[0.7rem] font-jetbrains-mono">+{Math.min(18, sortedPhones.length - visibleCount)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Helper functions
function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    Apple: "#555555",
    Samsung: "#1428A0",
    Google: "#4285F4",
    OnePlus: "#E54141",
    Xiaomi: "#FF6900",
    Oppo: "#1A8C4A",
    Vivo: "#415FFF",
    Nothing: "#000000",
    Motorola: "#00B388",
    Huawei: "#CF0A2C",
    Sony: "#000000",
    LG: "#A50034",
  };
  return colors[brand] || "#FF6B00";
}

function getBrandEmoji(brand: string): string {
  const emojis: Record<string, string> = {
    Apple: "🍎",
    Samsung: "📱",
    Google: "🔵",
    OnePlus: "🔴",
    Xiaomi: "🟠",
    Oppo: "🟢",
    Vivo: "🔷",
    Nothing: "⚫",
    Motorola: "🟩",
    Huawei: "🔴",
    Sony: "🎮",
    LG: "🟣",
  };
  return emojis[brand] || "📱";
}