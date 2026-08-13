// @ts-nocheck
// components/phone-finder/PhoneGrid.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Phone {
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  brand: string;
  price?: number;
  image: string;
  specs?: {
    display?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    camera?: string;
  };
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  isFlagship?: boolean;
  isEditorChoice?: boolean;
  year?: number;
}

interface PhoneGridProps {
  products: Phone[];
  totalCount: number;
  onResetFilters?: () => void;
  onSortChange?: (sort: SortOption) => void;
  loading?: boolean;
}

type SortOption = "relevance" | "battery" | "display" | "ram";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "battery", label: "Battery: High to Low" },
  { value: "display", label: "Display: Largest" },
  { value: "ram", label: "RAM: Highest" },
];

function PhoneCard({ 
  phone, 
  priority, 
  onCardClick 
}: { 
  phone: Phone; 
  priority: boolean;
  onCardClick: (slug: string) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showImage = phone.image && !imgFailed;

  if (!phone.slug) {
    console.error("❌ Card missing slug:", phone.name);
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCardClick(phone.slug);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col bg-white rounded-[3px] border border-[rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 no-underline hover:shadow-md hover:border-[rgba(127,1,31,0.15)] cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] bg-white overflow-hidden rounded-t-[3px]">
        {showImage ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[#f0f0f0]" />
            )}
            <Image
              src={phone.image}
              alt={`${phone.brand} ${phone.name}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.6vw, 14.28vw"
              className={`object-contain p-4 transition-opacity duration-500 ease-out group-hover:scale-[1.04] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority={priority}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-mobile-alt text-4xl text-[#7F011F]/10" />
          </div>
        )}

        {/* Flagship Badge */}
        {phone.isFlagship && (
          <div className="absolute top-2 left-2 bg-[#7F011F] text-white text-[0.45rem] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Flagship
          </div>
        )}
      </div>

      {/* Content - Only Brand and Name */}
      <div className="flex-1 flex flex-col items-center text-center px-3 pt-3 pb-3.5">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#7F011F]/70">
          {phone.brand}
        </span>
        <span className="font-semibold text-[0.8rem] leading-snug text-[#1a1a1a] font-['Poppins',sans-serif] line-clamp-2 min-h-[2.2em] mt-0.5">
          {phone.name}
        </span>
      </div>
    </div>
  );
}

function PhoneCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-[3px] border border-[rgba(0,0,0,0.06)] overflow-hidden">
      <div className="w-full aspect-[4/5] bg-[#f0f0f0] animate-pulse rounded-t-[3px]" />
      <div className="flex flex-col items-center gap-1.5 px-3 pt-3 pb-3.5">
        <div className="h-2 w-12 rounded-full bg-[#e8e8e8] animate-pulse" />
        <div className="h-3 w-20 rounded-full bg-[#e8e8e8] animate-pulse" />
      </div>
    </div>
  );
}

export function PhoneGrid({ 
  products, 
  totalCount, 
  onResetFilters, 
  onSortChange, 
  loading 
}: PhoneGridProps) {
  const router = useRouter();
  const [sort, setSort] = useState<SortOption>("relevance");

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    onSortChange?.(value);
  };

  const handleCardClick = useCallback((slug: string) => {
    router.push(`/phone-finder/${slug}`);
  }, [router]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
        {Array.from({ length: 14 }).map((_, i) => (
          <PhoneCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#7F011F]/5 flex items-center justify-center mb-4">
          <i className="fas fa-mobile-alt text-2xl text-[#7F011F]/20" />
        </div>
        <p className="text-lg font-semibold text-[#1a1a1a] font-['Poppins',sans-serif]">
          No phones match these filters
        </p>
        <p className="text-sm text-[#6d4a4a] mt-1 font-['Poppins',sans-serif]">
          Try adjusting your search criteria
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-[#7F011F] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#a80a30] transition-all duration-300"
          >
            <i className="fas fa-undo-alt text-[10px]" />
            Reset all filters
          </button>
        )}
      </div>
    );
  }

  // Filter out products without slugs
  const validProducts = products.filter(p => p.slug);

  if (validProducts.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#7F011F]/5 flex items-center justify-center mb-4">
          <i className="fas fa-exclamation-triangle text-2xl text-[#7F011F]/20" />
        </div>
        <p className="text-lg font-semibold text-[#1a1a1a] font-['Poppins',sans-serif]">
          Phone data is incomplete
        </p>
        <p className="text-sm text-[#6d4a4a] mt-1 font-['Poppins',sans-serif]">
          Please check the API response
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Results bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="text-xs text-[#6d4a4a] font-['Poppins',sans-serif]">
          <span className="font-semibold text-[#1a1a1a]">{validProducts.length}</span> phones
          {validProducts.length !== totalCount && <span> (filtered from {totalCount})</span>}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-[rgba(0,0,0,0.1)] rounded-full pl-4 pr-8 py-1.5 text-xs font-medium text-[#1a1a1a] hover:border-[#7F011F]/30 focus:outline-none focus:border-[#7F011F] transition-colors cursor-pointer font-['Poppins',sans-serif]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down text-[0.55rem] text-[#7F011F]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
        {validProducts.map((phone, index) => (
          <PhoneCard 
            key={phone._id || phone.id || phone.slug || index} 
            phone={phone} 
            priority={index < 7}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      <div className="text-xs text-[#6d4a4a] pt-4 mt-1 font-['Poppins',sans-serif]">
        Showing <span className="font-semibold text-[#1a1a1a]">{validProducts.length}</span> of{" "}
        <span className="font-semibold text-[#1a1a1a]">{totalCount}</span> phones
      </div>
    </>
  );
}