// components/PhoneGrid.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  brand: string;
  model: string;
  ram: number;
  storage: number;
  display: number;
  refresh: number;
  battery: number;
  backCam: string;
  frontCam: string;
  fingerprint: string;
  faceUnlock: string;
  os: string;
  network: string;
  slug: string;
  image: string | null;
}

interface PhoneGridProps {
  products: Product[];
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

function PhoneCard({ product, priority }: { product: Product; priority: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showImage = product.image && !imgFailed;

  // Build the correct URL - using phone-finder route
  const detailUrl = `/phone-finder/${product.slug}`;

  return (
    <Link
      href={detailUrl}
      className="group relative flex flex-col bg-white rounded-2xl border border-[rgba(127,1,31,0.08)] overflow-hidden transition-all duration-300 no-underline hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(127,1,31,0.22)] hover:border-[#7F011F]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F011F] focus-visible:ring-offset-2"
    >
      {/* Image — fills the card width edge-to-edge */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#fdfaf5] to-[#f7f0e2] overflow-hidden">
        {showImage ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[#efe6d0]/60" />
            )}
            <Image
              src={product.image as string}
              alt={`${product.brand} ${product.model}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.6vw, 14.28vw"
              className={`object-contain p-4 transition-all duration-500 ease-out group-hover:scale-[1.06] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority={priority}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-mobile-alt text-4xl text-[#7F011F]/20" />
          </div>
        )}

        {/* Subtle corner affordance on hover */}
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-[rgba(127,1,31,0.10)] flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <i className="fas fa-arrow-right text-[10px] text-[#7F011F] -rotate-45" />
        </div>
      </div>

      {/* Name block */}
      <div className="flex-1 flex flex-col items-center text-center gap-0.5 px-3 pt-2.5 pb-3">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#7F011F]/70">
          {product.brand}
        </span>
        <span className="font-semibold text-[0.82rem] leading-snug text-[#2d1a1a] font-['Poppins',sans-serif] line-clamp-2 min-h-[2.2em]">
          {product.model}
        </span>
      </div>
    </Link>
  );
}

function PhoneCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[rgba(127,1,31,0.06)] overflow-hidden">
      <div className="w-full aspect-[4/5] bg-[#efe6d0]/50 animate-pulse" />
      <div className="flex flex-col items-center gap-1.5 px-3 pt-2.5 pb-3">
        <div className="h-2 w-12 rounded-full bg-[#efe6d0]/70 animate-pulse" />
        <div className="h-3 w-20 rounded-full bg-[#efe6d0]/70 animate-pulse" />
      </div>
    </div>
  );
}

export function PhoneGrid({ products, totalCount, onResetFilters, onSortChange, loading }: PhoneGridProps) {
  const [sort, setSort] = useState<SortOption>("relevance");

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    onSortChange?.(value);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
        {Array.from({ length: 21 }).map((_, i) => (
          <PhoneCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#7F011F]/5 flex items-center justify-center mb-4">
          <i className="fas fa-mobile-alt text-2xl text-[#7F011F]/30" />
        </div>
        <p className="text-lg font-semibold text-[#2d1a1a] font-['Poppins',sans-serif]">
          No phones match these filters
        </p>
        <p className="text-sm text-[#6d4a4a] mt-1 font-['Poppins',sans-serif]">
          Try loosening a filter or two, or start fresh
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-[0_8px_24px_rgba(127,1,31,0.30)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <i className="fas fa-undo-alt text-[10px]" />
            Reset all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Results bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="text-xs text-[#6d4a4a] font-['Poppins',sans-serif]">
          <span className="font-semibold text-[#2d1a1a]">{products.length}</span> phones
          {products.length !== totalCount && <span> (filtered from {totalCount})</span>}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-[rgba(127,1,31,0.12)] rounded-full pl-4 pr-8 py-1.5 text-xs font-medium text-[#2d1a1a] hover:border-[#7F011F]/30 focus:outline-none focus:border-[#7F011F] transition-colors cursor-pointer font-['Poppins',sans-serif]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down text-[0.55rem] text-[#7F011F]/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid — 2 up on mobile, scaling to 7 up at 2xl, each card its own tile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
        {products.map((product, index) => (
          <PhoneCard key={product.slug ?? index} product={product} priority={index < 7} />
        ))}
      </div>

      <div className="text-xs text-[#6d4a4a] pt-4 mt-1 font-['Poppins',sans-serif]">
        Showing <span className="font-semibold text-[#2d1a1a]">{products.length}</span> of{" "}
        <span className="font-semibold text-[#2d1a1a]">{totalCount}</span> phones
      </div>
    </>
  );
}