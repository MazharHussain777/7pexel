// components/phones/finder/FilterBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrands, fetchCategories, fetchPhoneYears } from "@/app/phones/finder/data/phone-db";

interface FilterBarProps {
  brands?: string[];
  categories?: string[];
  years?: string[];
  activeBrand?: string;
  activeCategory?: string;
  activeYear?: string;
  activeSort?: string;
}

export function FilterBar({ 
  brands: initialBrands = [],
  categories: initialCategories = [],
  years: initialYears = [],
  activeBrand,
  activeCategory,
  activeYear,
  activeSort
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>(initialBrands);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [years, setYears] = useState<string[]>(initialYears);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have initial data, use it and don't fetch
    if (initialBrands.length > 0 && initialCategories.length > 0 && initialYears.length > 0) {
      setBrands(initialBrands);
      setCategories(initialCategories);
      setYears(initialYears);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    const loadFilters = async () => {
      try {
        const [brandData, categoryData, yearData] = await Promise.all([
          fetchBrands(),
          fetchCategories(),
          fetchPhoneYears(),
        ]);
        setBrands(Array.isArray(brandData) ? brandData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setYears(Array.isArray(yearData) ? yearData : []);
      } catch (error) {
        console.error('Error loading filters:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFilters();
  }, [initialBrands, initialCategories, initialYears]);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/phones/finder?${params.toString()}`, { scroll: false });
  };

  const getActiveValue = (key: string): string => {
    return searchParams.get(key) || 'all';
  };

  // Filter definitions (ALL ICONS REMOVED)
  const filterDefs = [
    { 
      id: 'brand', 
      label: 'Brand',
      options: brands.map(b => ({ value: b, label: b })) 
    },
    { 
      id: 'ram', 
      label: 'RAM',
      options: ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'storage', 
      label: 'Storage',
      options: ['64GB', '128GB', '256GB', '512GB', '1TB'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'chipset', 
      label: 'Chipset',
      options: ['Snapdragon', 'Apple', 'Tensor', 'MediaTek', 'Exynos', 'Dimensity'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'os', 
      label: 'OS',
      options: ['iOS', 'Android', 'HarmonyOS'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'display', 
      label: 'Display Size',
      options: ['Under 6.1"', '6.1-6.7"', '6.7+"'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'refresh_rate', 
      label: 'Refresh Rate',
      options: ['60Hz', '90Hz', '120Hz', '144Hz'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'battery', 
      label: 'Battery',
      options: ['Under 4000mAh', '4000-5000mAh', '5000mAh+'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'charging', 
      label: 'Charging Speed',
      options: ['Under 25W', '25-50W', '50-100W', '100W+'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'camera', 
      label: 'Camera',
      options: ['Dual', 'Triple', 'Quad', 'Penta'].map(v => ({ value: v, label: v })) 
    },
    { 
      id: 'connectivity', 
      label: 'Connectivity',
      options: ['5G', 'WiFi 6', 'WiFi 7', 'NFC', 'Bluetooth 5.3'].map(v => ({ value: v, label: v })) 
    },
  ];

  if (loading) {
    return (
      <div className="relative mb-7 pb-4.5 border-b border-[rgba(15,24,15,0.06)]">
        <div className="flex flex-wrap gap-2 gap-x-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-7 pb-4.5 border-b border-[rgba(15,24,15,0.06)]">
      <div className="flex flex-wrap gap-2 gap-x-3">
        {filterDefs.map((filter) => {
          const isOpen = openFilter === filter.id;
          const activeValue = getActiveValue(filter.id);
          const hasActive = activeValue !== 'all';

          return (
            <div key={filter.id} className="relative inline-block">
              <button
                className={`bg-transparent border-[1.5px] border-[#dee8e2] px-4 py-2.25 rounded-[60px] text-[0.75rem] font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap font-poppins bg-white hover:bg-[#f0f7f3] hover:border-[#b3cebe] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,24,15,0.06)] ${
                  hasActive 
                    ? "bg-[var(--color-green)] border-[var(--color-green)] text-white shadow-[0_4px_16px_rgba(15,107,62,0.20)]" 
                    : "text-[#2a3a2e]"
                }`}
                onClick={() => setOpenFilter(isOpen ? null : filter.id)}
              >
                <span>{filter.label}</span>
                <span className={`text-[0.5rem] transition-transform duration-300 ${hasActive ? "text-white" : "text-[#2a3a2e]/50"} ${isOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
                {hasActive && (
                  <span className="bg-white/20 text-white rounded-full px-2 py-0.5 text-[0.5rem] font-bold leading-[1.7] inline-block max-w-[80px] truncate border border-white/10">
                    {activeValue}
                  </span>
                )}
              </button>

              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenFilter(null)} />
                  <div className="absolute top-[calc(100%+10px)] left-0 bg-white border border-[#e8f0eb] rounded-[20px] p-4 min-w-[180px] max-w-[280px] shadow-[0_20px_60px_rgba(15,24,15,0.12)] z-50 opacity-100 translate-y-0 scale-100 backdrop-blur-sm bg-white/98 max-h-[300px] overflow-y-auto">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-[#e8f0eb] rotate-45 rounded-[4px]" />
                    
                    <div className="grid grid-cols-1 gap-0.5">
                      <div
                        key={`${filter.id}-all`}
                        className={`px-3.5 py-1.75 rounded-[10px] text-[0.75rem] font-medium text-[#2a3a2e] cursor-pointer transition-all duration-200 flex items-center gap-2 whitespace-nowrap hover:bg-[#eaf3ed] ${
                          !hasActive ? "bg-[var(--color-green)] text-white" : ""
                        }`}
                        onClick={() => {
                          updateURL(filter.id, 'all');
                          setOpenFilter(null);
                        }}
                      >
                        <span className={`text-[0.6rem] transition-all duration-200 ${!hasActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>✓</span>
                        All {filter.label}
                      </div>
                      {filter.options.map((opt, index) => {
                        const isActive = activeValue === opt.value;
                        const uniqueKey = `${filter.id}-${opt.value}-${index}`;
                        return (
                          <div
                            key={uniqueKey}
                            className={`px-3.5 py-1.75 rounded-[10px] text-[0.75rem] font-medium text-[#2a3a2e] cursor-pointer transition-all duration-200 flex items-center gap-2 whitespace-nowrap hover:bg-[#eaf3ed] hover:translate-x-0.5 ${
                              isActive ? "bg-[var(--color-green)] text-white shadow-[0_2px_12px_rgba(15,107,62,0.15)]" : ""
                            }`}
                            onClick={() => {
                              updateURL(filter.id, opt.value);
                              setOpenFilter(null);
                            }}
                          >
                            <span className={`text-[0.6rem] transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>✓</span>
                            {opt.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Clear All Filters Button */}
      {Array.from(searchParams.keys()).some(key => key !== 'q' && key !== 'page' && key !== 'limit') && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              const searchTerm = params.get('q');
              const newParams = new URLSearchParams();
              if (searchTerm) newParams.set('q', searchTerm);
              router.push(`/phones/finder?${newParams.toString()}`, { scroll: false });
            }}
            className="text-[0.7rem] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors flex items-center gap-1.5"
          >
            <span>✕</span>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}