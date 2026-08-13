// components/laptops/finder/FilterBar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface BrandOption {
  _id: string;
  id: string;
  slug: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  count: number;
}

export function FilterBar() {
  const router = useRouter();
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("year");

  // Fetch brands from API
  const fetchBrands = useCallback(async () => {
    try {
      setLoadingBrands(true);
      const response = await fetch('/api/laptops/brands?includeCounts=true');
      const data = await response.json();
      
      if (data.success) {
        setBrands(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoadingBrands(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedBrand) {
      params.set('brands', selectedBrand);
    }
    
    if (selectedCategory) {
      params.set('categories', selectedCategory);
    }

    if (sortBy) {
      params.set('sort', sortBy);
    }

    router.push(`/laptops/finder?${params.toString()}`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSortBy("year");
    router.push('/laptops/finder');
  };

  // Get total active filters count
  const totalActiveFilters = (selectedBrand ? 1 : 0) + (selectedCategory ? 1 : 0);

  // Apply filters on selection change
  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedCategory, sortBy]);

  if (loadingBrands) {
    return (
      <div className="mt-4 pt-3 border-t border-[rgba(15,24,15,0.06)]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#0F6B3E] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[0.75rem] text-[var(--color-ink-soft)]">Loading brands...</span>
        </div>
      </div>
    );
  }

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Premium", label: "✨ Premium" },
    { value: "Gaming", label: "🎮 Gaming" },
    { value: "Business", label: "💼 Business" },
    { value: "Ultrabook", label: "🚀 Ultrabook" },
    { value: "Creator", label: "🎨 Creator" },
    { value: "Budget", label: "💰 Budget" },
    { value: "macOS", label: "🍎 macOS" },
    { value: "Windows", label: "🪟 Windows" },
  ];

  const sortOptions = [
    { value: "year", label: "Latest" },
    { value: "rating", label: "Top Rated" },
    { value: "price", label: "Price: Low to High" },
  ];

  return (
    <div className="mt-4 pt-3 border-t border-[rgba(15,24,15,0.06)]">
      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Brand Filter */}
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 rounded-full border border-[var(--color-line)] bg-white text-[0.8rem] font-medium text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/20 transition-all min-w-[140px]"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.emoji || brand.icon} {brand.name} ({brand.count || 0})
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 rounded-full border border-[var(--color-line)] bg-white text-[0.8rem] font-medium text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/20 transition-all min-w-[140px]"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Sort By */}
        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 rounded-full border border-[var(--color-line)] bg-white text-[0.8rem] font-medium text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/20 transition-all min-w-[130px]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Clear All */}
        {totalActiveFilters > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 rounded-full text-[0.75rem] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Active Filters Pills */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-[var(--color-line)]">
          {selectedBrand && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green-deep)] text-[0.7rem] font-medium border border-[var(--color-green)]/20">
              <span>🏷️</span>
              {selectedBrand}
              <button
                onClick={() => setSelectedBrand("")}
                className="w-4 h-4 rounded-full bg-[rgba(10,63,38,0.15)] flex items-center justify-center hover:bg-[rgba(10,63,38,0.25)] transition-colors"
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green-deep)] text-[0.7rem] font-medium border border-[var(--color-green)]/20">
              <span>📂</span>
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory("")}
                className="w-4 h-4 rounded-full bg-[rgba(10,63,38,0.15)] flex items-center justify-center hover:bg-[rgba(10,63,38,0.25)] transition-colors"
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          )}
          <span className="text-[0.65rem] text-[var(--color-ink-soft)] ml-1">
            {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''} applied
          </span>
        </div>
      )}
    </div>
  );
}