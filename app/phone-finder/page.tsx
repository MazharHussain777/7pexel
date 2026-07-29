// @ts-nocheck
// app/phone-finder/page.tsx
"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { PhoneFilterBar } from "@/components/phone-finder/PhoneFilterBar";
import { PhoneFilterChips } from "@/components/phone-finder/PhoneFilterChips";

// Types
interface Phone {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  slug: string;
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    camera: string;
  };
  rating: number;
  reviews: number;
  tags: string[];
  isFlagship?: boolean;
  isEditorChoice?: boolean;
}

// Filter Group Definitions
const filterGroups = [
  {
    id: "brand",
    label: "Brand",
    type: "checkboxes" as const,
    options: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Nothing", "Sony", "Motorola", "Asus"],
  },
  {
    id: "ram",
    label: "RAM",
    type: "checkboxes" as const,
    options: ["4GB", "6GB", "8GB", "12GB", "16GB", "18GB"],
  },
  {
    id: "storage",
    label: "Storage",
    type: "checkboxes" as const,
    options: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
  },
  {
    id: "battery",
    label: "Battery",
    type: "range" as const,
    min: 3000,
    max: 7000,
    step: 100,
    presets: [
      { label: "Under 4000", min: 3000, max: 4000 },
      { label: "4000-5000", min: 4000, max: 5000 },
      { label: "5000+", min: 5000, max: 7000 },
    ],
  },
  {
    id: "display",
    label: "Display",
    type: "range" as const,
    min: 5.5,
    max: 7.0,
    step: 0.1,
    presets: [
      { label: "Under 6.0\"", min: 5.5, max: 6.0 },
      { label: "6.0-6.5\"", min: 6.0, max: 6.5 },
      { label: "6.5+\"", min: 6.5, max: 7.0 },
    ],
  },
  {
    id: "features",
    label: "Features",
    type: "toggle" as const,
    options: ["5G", "Wireless Charging", "Water Resistant", "Flagship", "Editor's Choice"],
  },
];

// Loading skeleton component
function PhoneFinderSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
            <h1 className="text-4xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
              Phone Finder
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="bg-white rounded-[3px] overflow-hidden border border-[rgba(0,0,0,0.06)] animate-pulse">
              <div className="aspect-[4/5] bg-[#f0f0f0]" />
              <div className="px-3 pt-2.5 pb-3 text-center">
                <div className="h-2 w-12 mx-auto rounded-full bg-[#e8e8e8] mb-1.5" />
                <div className="h-3 w-20 mx-auto rounded-full bg-[#e8e8e8]" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Main content component
function PhoneFinderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({
    brand: [],
    ram: [],
    storage: [],
    battery: { min: 3000, max: 7000 },
    display: { min: 5.5, max: 7.0 },
    features: [],
  });
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>("");
  
  // Get query params
  const brand = searchParams.get("brand") || "";
  const ram = searchParams.get("ram") || "";
  const storage = searchParams.get("storage") || "";
  const search = searchParams.get("search") || "";

  // Fetch phones
  const fetchPhones = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (brand) params.set("brand", brand);
      if (ram) params.set("ram", ram);
      if (storage) params.set("storage", storage);
      if (search) params.set("search", search);
      params.set("limit", "100");

      const response = await fetch(`/api/phones?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setPhones(result.data || []);
        setFilteredPhones(result.data || []);
        
        // Set selected filters from URL
        if (brand) {
          setSelectedFilters(prev => ({ ...prev, brand: [brand] }));
        }
        if (ram) {
          setSelectedFilters(prev => ({ ...prev, ram: [ram] }));
        }
        if (storage) {
          setSelectedFilters(prev => ({ ...prev, storage: [storage] }));
        }
        if (search) {
          setSearchQuery(search);
          setActiveSearchQuery(search);
        }
      } else {
        setError(result.error || "Failed to fetch phones");
        setPhones([]);
        setFilteredPhones([]);
      }
    } catch (err: any) {
      console.error("Error fetching phones:", err);
      setError(err?.message || "Failed to fetch phones");
      setPhones([]);
      setFilteredPhones([]);
    } finally {
      setLoading(false);
    }
  }, [brand, ram, storage, search]);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  // Apply all filters
  const applyFilters = useCallback(() => {
    let filtered = [...phones];

    // Brand filter
    if (selectedFilters.brand && selectedFilters.brand.length > 0) {
      filtered = filtered.filter(p => selectedFilters.brand.includes(p.brand));
    }

    // RAM filter
    if (selectedFilters.ram && selectedFilters.ram.length > 0) {
      filtered = filtered.filter(p => {
        const ramValue = p.specs?.ram?.replace(/\s*GB\s*/g, '') || '';
        return selectedFilters.ram.some((r: string) => ramValue.includes(r.replace('GB', '')));
      });
    }

    // Storage filter
    if (selectedFilters.storage && selectedFilters.storage.length > 0) {
      filtered = filtered.filter(p => {
        const storageValue = p.specs?.storage?.replace(/\s*GB\s*/g, '') || '';
        return selectedFilters.storage.some((s: string) => storageValue.includes(s.replace('GB', '')));
      });
    }

    // Battery range
    if (selectedFilters.battery) {
      const { min, max } = selectedFilters.battery;
      filtered = filtered.filter(p => {
        const batteryValue = parseInt(p.specs?.battery?.replace(/\D/g, '') || '0');
        return batteryValue >= min && batteryValue <= max;
      });
    }

    // Display range
    if (selectedFilters.display) {
      const { min, max } = selectedFilters.display;
      filtered = filtered.filter(p => {
        const displayValue = parseFloat(p.specs?.display?.replace(/[^0-9.]/g, '') || '0');
        return displayValue >= min && displayValue <= max;
      });
    }

    // Features
    if (selectedFilters.features && selectedFilters.features.length > 0) {
      filtered = filtered.filter(p => {
        return selectedFilters.features.every((feature: string) => {
          switch(feature) {
            case "5G": return p.tags?.includes("5G");
            case "Wireless Charging": return p.specs?.wirelessCharging && p.specs.wirelessCharging !== "No";
            case "Water Resistant": return p.specs?.waterResistance && p.specs.waterResistance !== "N/A";
            case "Flagship": return p.isFlagship;
            case "Editor's Choice": return p.isEditorChoice;
            default: return true;
          }
        });
      });
    }

    // Search filter
    if (activeSearchQuery) {
      const query = activeSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        p.specs?.processor?.toLowerCase().includes(query) ||
        p.specs?.camera?.toLowerCase().includes(query)
      );
    }

    setFilteredPhones(filtered);
  }, [phones, selectedFilters, activeSearchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle filter changes
  const handleFilterChange = (filterId: string, value: any) => {
    setSelectedFilters(prev => ({ ...prev, [filterId]: value }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedFilters.brand && selectedFilters.brand.length > 0) {
      params.set("brand", selectedFilters.brand[0]);
    }
    if (selectedFilters.ram && selectedFilters.ram.length > 0) {
      params.set("ram", selectedFilters.ram[0]);
    }
    if (selectedFilters.storage && selectedFilters.storage.length > 0) {
      params.set("storage", selectedFilters.storage[0]);
    }
    if (activeSearchQuery) {
      params.set("search", activeSearchQuery);
    }
    
    router.push(`/phone-finder${params.toString() ? "?" + params.toString() : ""}`);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedFilters({
      brand: [],
      ram: [],
      storage: [],
      battery: { min: 3000, max: 7000 },
      display: { min: 5.5, max: 7.0 },
      features: [],
    });
    setSearchQuery("");
    setActiveSearchQuery("");
    router.push("/phone-finder");
  };

  // Remove a single chip
  const handleRemoveChip = (filterId: string, value: string) => {
    if (filterId === "battery" || filterId === "display") {
      const defaultValues = {
        battery: { min: 3000, max: 7000 },
        display: { min: 5.5, max: 7.0 },
      };
      setSelectedFilters(prev => ({
        ...prev,
        [filterId]: defaultValues[filterId as keyof typeof defaultValues] || { min: 0, max: 0 }
      }));
    } else if (filterId === "features") {
      setSelectedFilters(prev => ({
        ...prev,
        [filterId]: (prev[filterId] || []).filter((v: string) => v !== value)
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [filterId]: (prev[filterId] || []).filter((v: string) => v !== value)
      }));
    }
  };

  // Calculate active filter count
  const getFilterCount = useCallback(() => {
    let count = 0;
    
    if (selectedFilters.brand && selectedFilters.brand.length > 0) count++;
    if (selectedFilters.ram && selectedFilters.ram.length > 0) count++;
    if (selectedFilters.storage && selectedFilters.storage.length > 0) count++;
    if (selectedFilters.features && selectedFilters.features.length > 0) count++;
    
    const batteryDefault = { min: 3000, max: 7000 };
    if (selectedFilters.battery && 
        (selectedFilters.battery.min !== batteryDefault.min || 
         selectedFilters.battery.max !== batteryDefault.max)) {
      count++;
    }
    
    const displayDefault = { min: 5.5, max: 7.0 };
    if (selectedFilters.display && 
        (selectedFilters.display.min !== displayDefault.min || 
         selectedFilters.display.max !== displayDefault.max)) {
      count++;
    }
    
    return count;
  }, [selectedFilters]);

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const executeSearch = useCallback(() => {
    const trimmedQuery = searchQuery.trim();
    setActiveSearchQuery(trimmedQuery);
    
    const params = new URLSearchParams();
    if (selectedFilters.brand && selectedFilters.brand.length > 0) {
      params.set("brand", selectedFilters.brand[0]);
    }
    if (selectedFilters.ram && selectedFilters.ram.length > 0) {
      params.set("ram", selectedFilters.ram[0]);
    }
    if (selectedFilters.storage && selectedFilters.storage.length > 0) {
      params.set("storage", selectedFilters.storage[0]);
    }
    if (trimmedQuery) params.set("search", trimmedQuery);
    
    router.push(`/phone-finder${params.toString() ? "?" + params.toString() : ""}`);
  }, [searchQuery, selectedFilters, router]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
  };

  if (loading) {
    return <PhoneFinderSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
            <i className="fas fa-exclamation-triangle text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4">Failed to Load Phones</h2>
          <p className="text-[#6d4a4a] mb-8">{error}</p>
          <button
            onClick={() => fetchPhones()}
            className="inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-3 rounded-2xl hover:bg-[#a80a30] transition-colors"
          >
            <i className="fas fa-redo" />
            Retry
          </button>
        </main>
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
            <h1 className="text-4xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
              Phone Finder
            </h1>
            <span className="text-sm bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full">
              {filteredPhones.length} phones
            </span>
          </div>
          <p className="text-[#6d4a4a] ml-5">
            Find the perfect phone by filtering through our comprehensive database
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="flex items-center bg-white rounded-2xl shadow-md border border-[rgba(127,1,31,0.06)] focus-within:border-[#7F011F] focus-within:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] transition-all overflow-hidden">
              <div className="px-4 text-[#6d4a4a]">
                <i className="fas fa-search" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search phones by name, brand, or tags..."
                className="flex-1 py-3 bg-transparent outline-none text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] text-sm"
                aria-label="Search phones"
              />
              {(searchQuery || selectedFilters.brand?.length > 0 || selectedFilters.ram?.length > 0 || selectedFilters.storage?.length > 0 || activeSearchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 text-[#6d4a4a] hover:text-[#7F011F] transition-colors"
                >
                  <i className="fas fa-times" />
                </button>
              )}
              <button
                type="submit"
                onClick={executeSearch}
                className="px-5 py-3 bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white font-semibold hover:shadow-lg hover:shadow-[#7F011F]/30 transition-all text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <PhoneFilterBar
          filterGroups={filterGroups}
          selected={selectedFilters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          filterCount={getFilterCount()}
        />

        {/* Filter Chips */}
        <PhoneFilterChips
          filterGroups={filterGroups}
          selected={selectedFilters}
          onRemoveChip={handleRemoveChip}
          onClearAll={handleResetFilters}
        />

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
          {filteredPhones.length > 0 ? (
            filteredPhones.map((phone) => (
              <Link
                key={phone._id || phone.id || phone.slug}
                href={`/phone-finder/${phone.slug}`}
                className="group bg-white rounded-[3px] overflow-hidden border border-[rgba(0,0,0,0.06)] hover:border-[rgba(127,1,31,0.15)] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5] bg-white overflow-hidden px-[3px] pt-[3px]">
                  <div className="relative w-full h-full overflow-hidden rounded-t-[3px]">
                    <Image
                      src={phone.image || "/images/default-phone.jpg"}
                      alt={`${phone.brand} ${phone.name}`}
                      fill
                      className="object-contain p-2 group-hover:scale-[1.04] transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16.6vw, 14.28vw"
                    />
                  </div>
                </div>

                {/* Brand and Name */}
                <div className="flex flex-col items-center text-center px-3 pt-2 pb-3">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#7F011F]/70">
                    {phone.brand}
                  </span>
                  <span className="font-semibold text-[0.78rem] leading-snug text-[#1a1a1a] font-['Poppins',sans-serif] line-clamp-2 min-h-[2em] mt-0.5">
                    {phone.name}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-[rgba(0,0,0,0.06)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#7F011F]/5 flex items-center justify-center mb-4">
                <i className="fas fa-search text-2xl text-[#7F011F]/20" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
                No phones found
              </h3>
              <p className="text-sm text-[#6d4a4a] max-w-md mx-auto">
                We couldn't find any phones matching your filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2 bg-[#7F011F] text-white rounded-full text-sm hover:bg-[#a80a30] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        {filteredPhones.length > 0 && (
          <div className="text-xs text-[#6d4a4a] pt-4 mt-2 font-['Poppins',sans-serif]">
            Showing <span className="font-semibold text-[#1a1a1a]">{filteredPhones.length}</span> phones
          </div>
        )}
      </main>
    </div>
  );
}

// Main page component with Suspense boundary
export default function PhoneFinderPage() {
  return (
    <Suspense fallback={<PhoneFinderSkeleton />}>
      <PhoneFinderContent />
    </Suspense>
  );
}