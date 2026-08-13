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
  const [visibleCount, setVisibleCount] = useState(21);

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

    // Only fetch if we don't have initial data or filters changed
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
    setVisibleCount(prev => Math.min(prev + 21, sortedPhones.length));
  };

  if (loading) {
    return (
      <div className="col-span-full py-15 px-5 text-center bg-[#f5f9f6] rounded-[40px] text-[var(--color-ink-soft)]">
        <span className="text-[2rem]">⏳</span>
        <h3 className="my-3 mb-1.5 font-medium">Loading phones...</h3>
        <p className="text-[0.9rem]">Please wait while we fetch the latest data.</p>
      </div>
    );
  }

  if (sortedPhones.length === 0) {
    return (
      <div className="col-span-full py-15 px-5 text-center bg-[#f5f9f6] rounded-[40px] text-[var(--color-ink-soft)]">
        <span className="text-[2rem]">🔍</span>
        <h3 className="my-3 mb-1.5 font-medium">No phones found</h3>
        <p className="text-[0.9rem]">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header with Sort */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-[0.95rem] bg-[#eef6f1] px-5 py-1.5 rounded-full flex items-center gap-2">
            <span className="text-[1rem]">📱</span>
            <b className="font-jetbrains-mono text-[var(--color-green)]">{total}</b>
            <span className="text-[var(--color-ink-soft)] font-normal">phones found</span>
          </span>
          <span className="text-[0.8rem] text-[var(--color-ink-soft)]">
            Showing 1–{Math.min(sortedPhones.length, visibleCount)} of <span className="font-semibold text-[var(--color-ink)]">{total}</span>
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[0.75rem] text-[var(--color-ink-soft)] font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-[#dee8e2] rounded-full px-4 py-1.5 text-[0.78rem] font-medium bg-white text-[var(--color-ink)] focus:border-[var(--color-green)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green)] cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Phone Grid - From Database */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 md:gap-3">
        {visiblePhones.map((phone) => {
          const slug = phone.slug;
          const brandColor = getBrandColor(phone.brand);
          
          // Use the image from database (ImageKit URL) directly
          const imageUrl = phone.image || phone.imageUrl || '/images/placeholder-phone.jpg';

          return (
            <Link
              key={phone._id || phone.slug}
              href={`/phones/finder/${slug}`}
              className="group block border border-[#eef3ef] rounded-[8px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,24,15,0.08)] hover:border-[var(--color-green)]"
            >
              {/* Image Area */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f5f8f6]">
                <Image
                  src={imageUrl}
                  alt={`${phone.brand} ${phone.model}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to a placeholder if image fails to load
                    target.src = '/images/placeholder-phone.jpg';
                  }}
                />
                
                {/* Year Badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/40 text-white text-[0.4rem] font-medium px-1.5 py-0.5 rounded">
                  {phone.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5 text-center">
                <div className="text-[0.45rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-semibold mb-0.5">
                  {phone.brand}
                </div>
                <h4 className="font-fraunces font-semibold text-[0.85rem] leading-[1.2] text-[var(--color-ink)] group-hover:text-[var(--color-green)] transition-colors duration-300 line-clamp-1">
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
            className="px-8 py-3 border-2 border-dashed border-[var(--color-line)] rounded-full font-semibold text-[0.88rem] text-[var(--color-ink-soft)] transition-all duration-200 hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:border-solid hover:bg-[var(--color-green)]/5"
          >
            Load More Phones
            <span className="ml-2 text-[0.7rem] font-jetbrains-mono">+{Math.min(21, sortedPhones.length - visibleCount)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Helper function
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
  return colors[brand] || "#555555";
}