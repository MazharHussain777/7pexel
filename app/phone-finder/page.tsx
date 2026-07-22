// app/phone-finder/page.tsx
"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";

// Types
interface Phone {
  id: string;
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
}

interface FilterOptions {
  brands: string[];
  priceRanges: { label: string; min: number; max: number }[];
  ramOptions: string[];
  storageOptions: string[];
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] animate-pulse">
              <div className="aspect-[4/3] bg-[#f5ebd0]/50" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-[#f5ebd0]/50 rounded w-3/4" />
                <div className="h-3 bg-[#f5ebd0]/50 rounded w-1/2" />
                <div className="h-3 bg-[#f5ebd0]/50 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Main content component that uses useSearchParams
function PhoneFinderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRanges: [],
    ramOptions: [],
    storageOptions: [],
  });
  
  // Filter states
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedRam, setSelectedRam] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Get query params
  const brand = searchParams.get("brand") || "";
  const priceRange = searchParams.get("price") || "";
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
      if (priceRange) params.set("price", priceRange);
      if (ram) params.set("ram", ram);
      if (storage) params.set("storage", storage);
      if (search) params.set("search", search);

      const response = await fetch(`/api/phones?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setPhones(result.data);
        setFilteredPhones(result.data);
        setFilters(result.filters || {
          brands: [],
          priceRanges: [],
          ramOptions: [],
          storageOptions: [],
        });
        
        // Set selected filters from URL
        if (brand) setSelectedBrand(brand);
        if (priceRange) setSelectedPriceRange(priceRange);
        if (ram) setSelectedRam(ram);
        if (storage) setSelectedStorage(storage);
        if (search) setSearchQuery(search);
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
  }, [brand, priceRange, ram, storage, search]);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...phones];

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedPriceRange) {
      const range = filters.priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    if (selectedRam) {
      filtered = filtered.filter(p => p.specs.ram === selectedRam);
    }

    if (selectedStorage) {
      filtered = filtered.filter(p => p.specs.storage === selectedStorage);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPhones(filtered);
  }, [phones, selectedBrand, selectedPriceRange, selectedRam, selectedStorage, searchQuery, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Update URL with filters
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (selectedBrand && key !== "brand") params.set("brand", selectedBrand);
    if (selectedPriceRange && key !== "price") params.set("price", selectedPriceRange);
    if (selectedRam && key !== "ram") params.set("ram", selectedRam);
    if (selectedStorage && key !== "storage") params.set("storage", selectedStorage);
    if (searchQuery && key !== "search") params.set("search", searchQuery);
    
    if (value) params.set(key, value);
    
    router.push(`/phone-finder${params.toString() ? "?" + params.toString() : ""}`);
  };

  // Handle filter changes
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    updateFilters("brand", brand);
  };

  const handlePriceChange = (price: string) => {
    setSelectedPriceRange(price);
    updateFilters("price", price);
  };

  const handleRamChange = (ram: string) => {
    setSelectedRam(ram);
    updateFilters("ram", ram);
  };

  const handleStorageChange = (storage: string) => {
    setSelectedStorage(storage);
    updateFilters("storage", storage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      const params = new URLSearchParams();
      if (selectedBrand) params.set("brand", selectedBrand);
      if (selectedPriceRange) params.set("price", selectedPriceRange);
      if (selectedRam) params.set("ram", selectedRam);
      if (selectedStorage) params.set("storage", selectedStorage);
      router.push(`/phone-finder${params.toString() ? "?" + params.toString() : ""}`);
      return;
    }
    updateFilters("search", searchQuery.trim());
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedPriceRange("");
    setSelectedRam("");
    setSelectedStorage("");
    setSearchQuery("");
    router.push("/phone-finder");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center bg-white rounded-2xl shadow-md border border-[rgba(127,1,31,0.06)] focus-within:border-[#7F011F] focus-within:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] transition-all overflow-hidden">
              <div className="px-4 text-[#6d4a4a]">
                <i className="fas fa-search" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phones by name, brand, or tags..."
                className="flex-1 py-3 bg-transparent outline-none text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] text-sm"
              />
              {(searchQuery || selectedBrand || selectedPriceRange || selectedRam || selectedStorage) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-3 text-[#6d4a4a] hover:text-[#7F011F] transition-colors"
                >
                  <i className="fas fa-times" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white font-semibold hover:shadow-lg hover:shadow-[#7F011F]/30 transition-all text-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Brand Filter */}
          <div>
            <label className="text-xs font-medium text-[#6d4a4a] block mb-1.5">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[rgba(127,1,31,0.06)] focus:border-[#7F011F] focus:outline-none text-sm text-[#2d1a1a]"
            >
              <option value="">All Brands</option>
              {filters.brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="text-xs font-medium text-[#6d4a4a] block mb-1.5">Price Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[rgba(127,1,31,0.06)] focus:border-[#7F011F] focus:outline-none text-sm text-[#2d1a1a]"
            >
              <option value="">All Prices</option>
              {filters.priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* RAM Filter */}
          <div>
            <label className="text-xs font-medium text-[#6d4a4a] block mb-1.5">RAM</label>
            <select
              value={selectedRam}
              onChange={(e) => handleRamChange(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[rgba(127,1,31,0.06)] focus:border-[#7F011F] focus:outline-none text-sm text-[#2d1a1a]"
            >
              <option value="">All RAM</option>
              {filters.ramOptions.map((ram) => (
                <option key={ram} value={ram}>{ram}</option>
              ))}
            </select>
          </div>

          {/* Storage Filter */}
          <div>
            <label className="text-xs font-medium text-[#6d4a4a] block mb-1.5">Storage</label>
            <select
              value={selectedStorage}
              onChange={(e) => handleStorageChange(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[rgba(127,1,31,0.06)] focus:border-[#7F011F] focus:outline-none text-sm text-[#2d1a1a]"
            >
              <option value="">All Storage</option>
              {filters.storageOptions.map((storage) => (
                <option key={storage} value={storage}>{storage}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedBrand || selectedPriceRange || selectedRam || selectedStorage || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-[#6d4a4a]">Active filters:</span>
            {selectedBrand && (
              <span className="inline-flex items-center gap-1.5 bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-tag" />
                {selectedBrand}
                <button onClick={() => handleBrandChange("")} className="hover:text-[#a80a30]">
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {selectedPriceRange && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-dollar-sign" />
                {selectedPriceRange}
                <button onClick={() => handlePriceChange("")} className="hover:text-blue-800">
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {selectedRam && (
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-memory" />
                {selectedRam}
                <button onClick={() => handleRamChange("")} className="hover:text-green-800">
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {selectedStorage && (
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-hdd" />
                {selectedStorage}
                <button onClick={() => handleStorageChange("")} className="hover:text-purple-800">
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-search" />
                {searchQuery}
              </span>
            )}
            <button onClick={clearFilters} className="text-xs text-[#7F011F] hover:underline font-medium">
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        {filteredPhones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPhones.map((phone) => (
              <Link
                key={phone.id}
                href={`/phones/${phone.slug}`}
                className="group bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f5ebd0]/20">
                  <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[0.55rem] font-bold text-[#7F011F] mb-1 uppercase tracking-wider">
                    {phone.brand}
                  </div>
                  <h3 className="text-sm font-bold text-[#2d1a1a] leading-tight line-clamp-2 group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]">
                    {phone.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-[#6d4a4a]">
                      <span className="font-medium">${phone.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[0.5rem] text-[#6d4a4a]">
                      <i className="fas fa-star text-[#FFD700]" />
                      <span>{phone.rating || 0}</span>
                      <span>({phone.reviews || 0} reviews)</span>
                    </div>
                    {phone.tags && phone.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {phone.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[0.45rem] bg-[#f5ebd0]/50 px-1.5 py-0.5 rounded-full text-[#6d4a4a]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-[rgba(127,1,31,0.06)]">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#f5ebd0]/50 flex items-center justify-center mb-6">
              <i className="fas fa-search text-3xl text-[#7F011F]/30" />
            </div>
            <h3 className="text-xl font-bold text-[#2d1a1a] mb-2 font-['Poppins',sans-serif]">
              No phones found
            </h3>
            <p className="text-[#6d4a4a] max-w-md mx-auto">
              We couldn't find any phones matching your filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-[#7F011F] text-white rounded-full text-sm hover:bg-[#a80a30] transition-colors"
            >
              Clear all filters
            </button>
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