<<<<<<< HEAD
// app/compare/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  fetchCompareItems, 
  fetchCompareCategories, 
  fetchCompareStats,
  fetchTopRatedCompareItems,
  fetchPopularCompareItems,
} from "./data/compare-db";
import { CompareItem } from "@/lib/compare-service";

// ─── HELPERS ─────────────────────────────────────────────
function getStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-emerald-600";
  if (rating >= 4.0) return "text-green-500";
  if (rating >= 3.5) return "text-yellow-500";
  if (rating >= 3.0) return "text-orange-500";
  return "text-red-500";
}

const CATEGORY_ICONS: Record<string, string> = {
  phones: "📱",
  laptops: "💻",
  auto: "🚗",
};

const CATEGORY_LABELS: Record<string, string> = {
  phones: "Phones",
  laptops: "Laptops",
  auto: "Auto",
};

const CATEGORY_COLORS: Record<string, string> = {
  phones: "from-blue-500 to-indigo-600",
  laptops: "from-purple-500 to-purple-700",
  auto: "from-emerald-500 to-green-700",
};

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [items, setItems] = useState<CompareItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [topRated, setTopRated] = useState<CompareItem[]>([]);
  const [popular, setPopular] = useState<CompareItem[]>([]);

  // ─── FETCH DATA ────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsResult, categoriesResult, statsResult, topRatedResult, popularResult] = await Promise.all([
        fetchCompareItems({ 
          category: selectedCategory === 'all' ? undefined : selectedCategory, 
          limit: 100 
        }),
        fetchCompareCategories(),
        fetchCompareStats(),
        fetchTopRatedCompareItems(6),
        fetchPopularCompareItems(6),
      ]);
      setItems(itemsResult.data);
      setTotal(itemsResult.total);
      setCategories(['all', ...categoriesResult]);
      setStats(statsResult);
      setTopRated(topRatedResult);
      setPopular(popularResult);
    } catch (error) {
      console.error('Error loading compare data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ─── FILTERED ITEMS ────────────────────────────────────
  const filteredItems = useMemo(() => {
    let list = items;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [items, searchQuery]);

  // ─── SELECTED ITEMS DATA ──────────────────────────────
  const selectedItemsData = useMemo(() => {
    return items.filter(item => selectedItems.includes(item.id));
  }, [items, selectedItems]);

  // ─── TOGGLE SELECTION ──────────────────────────────────
  const toggleSelection = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 items at a time");
        return prev;
      }
      return [...prev, id];
    });
  };

  // ─── CLEAR ALL SELECTIONS ─────────────────────────────
  const clearSelections = () => {
    setSelectedItems([]);
  };

  // ─── GET ALL UNIQUE SPECS ─────────────────────────────
  const allSpecs = useMemo(() => {
    if (selectedItemsData.length === 0) return [];
    const specKeys = new Set<string>();
    selectedItemsData.forEach(item => {
      if (item.specs) {
        Object.keys(item.specs).forEach(key => specKeys.add(key));
      }
    });
    return Array.from(specKeys);
  }, [selectedItemsData]);

  // ─── SELECT TOP 4 ──────────────────────────────────────
  const selectTop4 = () => {
    const top = filteredItems
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4)
      .map(item => item.id);
    setSelectedItems(top);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfdfb]">
        <Header />
        <main className="wrap py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-green)] border-t-transparent mb-4" />
          <p className="text-[var(--color-ink-soft)]">Loading compare items...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Compare</span>
        </div>

        {/* Hero */}
        <section className="relative rounded-[24px] overflow-hidden mb-8 bg-gradient-to-br from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A] text-white">
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📊</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                  Side-by-Side
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[var(--color-green-deep)] px-4 py-1.5 rounded-full font-semibold">
                  {total} Products
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Compare <em className="italic not-italic text-[#D4F26B]">Products</em> Side-by-Side
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Select up to 4 products from Phones, Laptops, and Auto to compare specs, prices, pros, and cons.
              </p>

              {/* Search */}
              <div className="mt-7 max-w-[500px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products to compare..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 pl-13 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[1rem] transition-all focus:outline-none focus:border-[#D4F26B] focus:bg-white/16 placeholder:text-white/55"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white border border-[var(--color-line)] rounded-[12px] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-green)]">{stats.total}</div>
              <div className="text-[0.7rem] text-[var(--color-ink-soft)]">Total Products</div>
            </div>
            <div className="bg-white border border-[var(--color-line)] rounded-[12px] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-green)]">{stats.categories?.length || 0}</div>
              <div className="text-[0.7rem] text-[var(--color-ink-soft)]">Categories</div>
            </div>
            <div className="bg-white border border-[var(--color-line)] rounded-[12px] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-green)]">{stats.brands?.length || 0}</div>
              <div className="text-[0.7rem] text-[var(--color-ink-soft)]">Brands</div>
            </div>
            <div className="bg-white border border-[var(--color-line)] rounded-[12px] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-green)]">{stats.avgRating?.toFixed(1) || 0}</div>
              <div className="text-[0.7rem] text-[var(--color-ink-soft)]">Avg Rating</div>
            </div>
          </div>
        )}

        {/* Selection Bar */}
        {selectedItems.length > 0 && (
          <section className="mb-8 p-5 border-2 border-[var(--color-green)] rounded-[16px] bg-green-50/50">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-[0.9rem]">Comparing:</span>
                {selectedItemsData.map((item) => (
                  <span
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-[0.8rem] shadow-sm"
                  >
                    <span className="text-sm">{item.categoryIcon}</span>
                    <span className="font-medium">{item.name}</span>
                    <button
                      onClick={() => toggleSelection(item.id)}
                      className="text-[var(--color-ink-soft)] hover:text-red-500 transition-colors ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <span className="text-[0.7rem] text-[var(--color-ink-soft)]">({selectedItems.length}/4)</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={clearSelections}
                  className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
                {selectedItems.length >= 2 && (
                  <button
                    onClick={() => setViewMode("table")}
                    className="px-4 py-2 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.8rem] transition-all hover:bg-[var(--color-green-deep)] shadow-lg hover:shadow-xl"
                  >
                    Compare Now →
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Category Filters */}
        <section className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.75rem] font-semibold text-[var(--color-ink-soft)] mr-1">Filter:</span>
            {categories.map((cat) => {
              const label = cat === 'all' ? 'All Products' : CATEGORY_LABELS[cat] || cat;
              const icon = cat === 'all' ? '📋' : CATEGORY_ICONS[cat] || '📦';
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold text-[0.8rem] transition-all ${
                    isActive
                      ? "bg-[var(--color-ink)] text-white shadow-md"
                      : "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] hover:shadow-sm"
                  }`}
                >
                  {icon} {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Top Rated & Popular */}
        {selectedCategory === 'all' && viewMode === "grid" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {topRated.length > 0 && (
              <div className="border border-[var(--color-line)] rounded-[16px] p-5 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏆</span>
                  <h3 className="font-fraunces font-medium text-[1.1rem]">Top Rated</h3>
                </div>
                <div className="space-y-3">
                  {topRated.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-[8px] hover:bg-[var(--color-paper)] transition-colors cursor-pointer" onClick={() => toggleSelection(item.id)}>
                      <div className="w-12 h-12 rounded-[8px] overflow-hidden bg-[#eef1e9] flex-shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)]">{item.brand}</span>
                          <span className="text-[0.5rem]">{getStars(item.rating)}</span>
                        </div>
                        <h4 className="text-[0.85rem] font-medium truncate">{item.name}</h4>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
                        className={`text-[0.6rem] font-semibold px-3 py-1 rounded-full transition-colors ${
                          selectedItems.includes(item.id) ? 'bg-red-100 text-red-600' : 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-deep)]'
                        }`}
                      >
                        {selectedItems.includes(item.id) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {popular.length > 0 && (
              <div className="border border-[var(--color-line)] rounded-[16px] p-5 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🔥</span>
                  <h3 className="font-fraunces font-medium text-[1.1rem]">Most Popular</h3>
                </div>
                <div className="space-y-3">
                  {popular.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-[8px] hover:bg-[var(--color-paper)] transition-colors cursor-pointer" onClick={() => toggleSelection(item.id)}>
                      <div className="w-12 h-12 rounded-[8px] overflow-hidden bg-[#eef1e9] flex-shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)]">{item.brand}</span>
                          <span className="text-[0.5rem]">{getStars(item.rating)}</span>
                        </div>
                        <h4 className="text-[0.85rem] font-medium truncate">{item.name}</h4>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
                        className={`text-[0.6rem] font-semibold px-3 py-1 rounded-full transition-colors ${
                          selectedItems.includes(item.id) ? 'bg-red-100 text-red-600' : 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-deep)]'
                        }`}
                      >
                        {selectedItems.includes(item.id) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product Grid */}
        {viewMode === "grid" && (
          <section>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[0.85rem] text-[var(--color-ink-soft)]">
                  {filteredItems.length} products found
                </span>
                {filteredItems.length > 0 && (
                  <button
                    onClick={selectTop4}
                    className="text-[0.7rem] text-[var(--color-green)] hover:underline font-medium"
                  >
                    Select Top 4
                  </button>
                )}
              </div>
              <span className="text-[0.7rem] text-[var(--color-ink-soft)]">
                Select up to 4 to compare
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                const categoryColor = CATEGORY_COLORS[item.category] || "from-gray-500 to-gray-700";
                
                return (
                  <div
                    key={item.id}
                    className={`group border rounded-[16px] overflow-hidden bg-white transition-all duration-300 ${
                      isSelected
                        ? "border-[var(--color-green)] shadow-[0_0_0_2px_rgba(15,107,62,0.3)] shadow-lg"
                        : "border-[var(--color-line)] hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:-translate-y-1"
                    }`}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${categoryColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      <span className="absolute top-2.5 left-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold backdrop-blur-sm">
                        {item.categoryIcon} {item.categoryLabel}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold shadow-lg animate-pulse">
                          ✓ Selected
                        </span>
                      )}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[0.5rem] text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        <span>{getStars(item.rating)}</span>
                        <span className="font-bold">{item.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)]">{item.brand}</span>
                        <span className="text-[0.6rem] font-bold text-[var(--color-green)]">{item.price}</span>
                      </div>
                      <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[0.7rem] text-[var(--color-ink-soft)] mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <button
                        onClick={() => toggleSelection(item.id)}
                        className={`w-full mt-3 py-2.5 rounded-full font-semibold text-[0.85rem] transition-all ${
                          isSelected
                            ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                            : "bg-[var(--color-green)] text-white hover:bg-[var(--color-green-deep)] shadow-md hover:shadow-lg"
                        }`}
                      >
                        {isSelected ? "Remove from Compare" : "Add to Compare"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[20px] border border-[var(--color-line)]">
                <span className="text-4xl">🔍</span>
                <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No products found</h3>
                <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">Try adjusting your filters or search term.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* Comparison Table */}
        {viewMode === "table" && selectedItems.length >= 2 && (
          <section className="mt-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
                Comparison <em className="italic not-italic text-[var(--color-green)]">Table</em>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
                >
                  ← Back to products
                </button>
                <button
                  onClick={clearSelections}
                  className="px-4 py-2 rounded-full border border-red-200 text-red-600 text-[0.8rem] font-semibold hover:bg-red-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-[16px] border border-[var(--color-line)] shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[var(--color-paper)] to-white border-b-2 border-[var(--color-line)]">
                    <th className="p-5 text-left font-fraunces font-semibold text-[0.9rem] min-w-[140px] sticky left-0 bg-[var(--color-paper)]">
                      Features
                    </th>
                    {selectedItemsData.map((item, index) => (
                      <th key={item.id} className="p-4 text-center min-w-[220px]">
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-20 rounded-[12px] overflow-hidden mb-2 bg-[#eef1e9] shadow-md">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-green)] text-white text-[0.5rem] font-bold flex items-center justify-center shadow-lg">
                              {index + 1}
                            </div>
                          </div>
                          <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)]">{item.brand}</span>
                          <span className="font-fraunces font-medium text-[1rem]">{item.name}</span>
                          <span className="text-[0.7rem]">{getStars(item.rating)}</span>
                          <span className="text-[0.9rem] font-bold text-[var(--color-green-deep)] mt-1">{item.price}</span>
                          <button
                            onClick={() => toggleSelection(item.id)}
                            className="mt-2 text-[0.6rem] text-red-500 hover:underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-line)] bg-white hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] sticky left-0 bg-white hover:bg-[var(--color-paper)]">Rating</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center">
                        <span className="text-[1.1rem]">{getStars(item.rating)}</span>
                        <span className={`block text-[0.8rem] font-bold ${getRatingColor(item.rating)}`}>{item.rating}/5</span>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] sticky left-0 bg-[var(--color-paper)]">Price</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center font-bold text-[1.1rem] text-[var(--color-green-deep)]">
                        {item.price}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[var(--color-line)] bg-white hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] sticky left-0 bg-white hover:bg-[var(--color-paper)]">Category</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center">
                        <span className="text-[0.8rem] px-3 py-1 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)]">
                          {item.categoryIcon} {item.categoryLabel}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] sticky left-0 bg-[var(--color-paper)]">Description</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center text-[0.8rem] text-[var(--color-ink-soft)] leading-relaxed">
                        {item.description}
                      </td>
                    ))}
                  </tr>

                  {allSpecs.map((specKey) => (
                    <tr key={specKey} className="border-b border-[var(--color-line)] bg-white hover:bg-[var(--color-paper)] transition-colors">
                      <td className="p-4 font-semibold text-[0.85rem] sticky left-0 bg-white hover:bg-[var(--color-paper)]">
                        {specKey}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id} className="p-4 text-center text-[0.85rem]">
                          {item.specs?.[specKey] ? (
                            <span className="px-2 py-1 rounded bg-[var(--color-paper)] border border-[var(--color-line)]">
                              {item.specs[specKey]}
                            </span>
                          ) : (
                            <span className="text-[var(--color-ink-soft)]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr className="border-b border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] text-green-600 sticky left-0 bg-[var(--color-paper)]">✅ Pros</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center">
                        <ul className="text-[0.75rem] text-left list-disc list-inside text-[var(--color-ink-soft)] space-y-0.5">
                          {item.pros?.map((pro: string, i: number) => (
                            <li key={i} className="hover:text-[var(--color-green)] transition-colors">{pro}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-white hover:bg-[var(--color-paper)] transition-colors">
                    <td className="p-4 font-semibold text-[0.85rem] text-red-600 sticky left-0 bg-white hover:bg-[var(--color-paper)]">❌ Cons</td>
                    {selectedItemsData.map((item) => (
                      <td key={item.id} className="p-4 text-center">
                        <ul className="text-[0.75rem] text-left list-disc list-inside text-[var(--color-ink-soft)] space-y-0.5">
                          {item.cons?.map((con: string, i: number) => (
                            <li key={i} className="hover:text-red-600 transition-colors">{con}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-white rounded-[12px] border border-[var(--color-line)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[0.9rem]">📊 Comparison Summary</span>
                  <span className="text-[0.75rem] text-[var(--color-ink-soft)] ml-3">
                    {selectedItems.length} products compared
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors flex items-center gap-1.5"
                  >
                    🖨️ Print
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard?.writeText(url);
                      alert("Link copied to clipboard!");
                    }}
                    className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors flex items-center gap-1.5"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {viewMode === "table" && selectedItems.length < 2 && (
          <div className="text-center py-16 bg-white rounded-[20px] border border-[var(--color-line)]">
            <span className="text-4xl">📊</span>
            <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">Select at least 2 products to compare</h3>
            <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">
              Go back and select 2-4 products to see a side-by-side comparison.
            </p>
            <button
              onClick={() => setViewMode("grid")}
              className="mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)] shadow-md hover:shadow-lg"
            >
              Browse Products
            </button>
          </div>
        )}
      </main>

      <Footer />
=======
// @ts-nocheck
// app/compare/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";
import CompareClient from "./CompareClient";

// ============= INTERFACE =============
interface ComparePageProps {
  searchParams: Promise<{ phones?: string }>;
}

// ============= FETCH PHONES FOR SEO =============
async function getPhonesForSEO(slugs: string[]) {
  if (slugs.length === 0) return [];
  try {
    await connectToDatabase();
    return await Phone.find({ slug: { $in: slugs } }).lean();
  } catch (error) {
    console.error("Error fetching phones for SEO:", error);
    return [];
  }
}

// ============= GENERATE AGGRESSIVE KEYWORD-RICH METADATA =============
export async function generateMetadata({ 
  searchParams 
}: ComparePageProps): Promise<Metadata> {
  const params = await searchParams;
  const phonesParam = params.phones || "";
  const slugs = phonesParam.split(",").filter(Boolean);
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://7pexel.com";
  
  if (slugs.length === 0) {
    return {
      title: "Compare Smartphones 2026 - Side by Side Specs, Camera, Battery & Price Comparison | 7pexel",
      description: "Compare smartphones side by side. Full specifications, camera quality, battery life, performance benchmarks, and pricing. Find the best phone for you.",
      robots: { index: true, follow: true },
    };
  }

  const phones = await getPhonesForSEO(slugs);
  
  if (phones.length === 0) {
    return {
      title: "Smartphone Comparison - Compare Phones Side by Side | 7pexel",
      description: "Compare smartphones specifications, features, and prices.",
      robots: { index: true, follow: true },
    };
  }

  // Build dynamic content
  const phoneNames = phones.map(p => `${p.brand} ${p.name}`).join(" vs ");
  const shortNames = phones.map(p => p.name).join(" vs ");
  const brands = phones.map(p => p.brand).join(" vs ");
  const years = phones.map(p => p.year).filter(Boolean).join(", ");
  
  // Get key specs for description
  const specsSummary = phones.map(p => {
    const specs = [];
    if (p.specs?.display) specs.push(`${p.specs.display} display`);
    if (p.specs?.chipset) specs.push(p.specs.chipset);
    if (p.specs?.camera) specs.push(`${p.specs.camera} camera`);
    if (p.specs?.battery) specs.push(`${p.specs.battery} battery`);
    if (p.specs?.ram) specs.push(`${p.specs.ram} RAM`);
    if (p.specs?.storage) specs.push(`${p.specs.storage} storage`);
    return `${p.brand} ${p.name}: ${specs.join(", ")}`;
  }).join(" | ");

  const compareUrl = `${siteUrl}/compare?phones=${slugs.join(",")}`;

  // ============= AGGRESSIVE TITLE KEYWORDS =============
  let title = "";
  const p1 = phones[0];
  const p2 = phones[1];
  const p3 = phones[2];

  if (phones.length === 2) {
    // 2-phone comparison - Most search queries
    title = [
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} Comparison 2026`,
      `${p1.name} vs ${p2.name} - Which is Better? Full Specs, Camera, Battery & Performance`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Complete Comparison Review`,
      `${p1.brand} vs ${p2.brand} - ${p1.name} vs ${p2.name} Specifications, Price & Features`,
      `${p1.name} vs ${p2.name} Comparison - Display, Processor, Camera & Battery Life`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Which Phone Should You Buy?`,
      `${p1.name} or ${p2.name} - Full Specs Comparison & Review ${p1.year || ""} vs ${p2.year || ""}`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Camera, Battery, Performance & Price`,
      `${p1.name} vs ${p2.name} Comparison - The Ultimate Smartphone Battle`,
      `${p1.brand} vs ${p2.brand} - ${p1.name} vs ${p2.name} Full Specifications`,
    ].join(" | ");
  } else if (phones.length === 3) {
    // 3-phone comparison
    title = [
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} vs ${p3.brand} ${p3.name} Comparison 2026`,
      `${p1.name} vs ${p2.name} vs ${p3.name} - Which is Best? Full Specs, Camera & Battery`,
      `${p1.brand} vs ${p2.brand} vs ${p3.brand} - ${p1.name} vs ${p2.name} vs ${p3.name} Complete Review`,
      `${p1.name} vs ${p2.name} vs ${p3.name} Comparison - Display, Processor, Camera & Battery Life`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} vs ${p3.brand} ${p3.name} - Which Phone Wins?`,
      `3-Way Smartphone Battle: ${p1.name} vs ${p2.name} vs ${p3.name} - Full Specs Comparison`,
      `${p1.name}, ${p2.name} & ${p3.name} Compared - Camera, Battery, Performance & Price`,
      `${p1.brand} vs ${p2.brand} vs ${p3.brand} - ${p1.year || ""} vs ${p2.year || ""} vs ${p3.year || ""} Phones`,
    ].join(" | ");
  } else {
    // Multi-phone comparison
    title = [
      `${phoneNames} Comparison - Complete Specs, Camera, Battery & Performance Review`,
      `${shortNames} - Full Comparison of ${phones.length} Smartphones`,
      `Compare ${phones.length} Phones: ${shortNames} - Which One is Best?`,
    ].join(" | ");
  }

  // ============= AGGRESSIVE DESCRIPTION KEYWORDS =============
  const description = [
    `Compare ${phoneNames} side by side.`,
    `Full specifications comparison including display, processor, camera, battery, RAM, storage, and more.`,
    `${p1?.brand} ${p1?.name} features ${p1?.specs?.camera || "powerful"} camera, ${p1?.specs?.battery || "long-lasting"} battery, and ${p1?.specs?.chipset || "fast"} processor.`,
    `${p2?.brand} ${p2?.name} offers ${p2?.specs?.display || "stunning"} display, ${p2?.specs?.camera || "excellent"} camera, and ${p2?.specs?.battery || "great"} battery life.`,
    `Which phone is better? Read our detailed comparison to find out.`,
    `${specsSummary}`,
  ].join(" ");

  // ============= AGGRESSIVE KEYWORDS =============
  const keywords = [
    // Brand + Name combinations
    ...phones.map(p => `${p.brand} ${p.name}`),
    ...phones.map(p => `${p.name} specs`),
    ...phones.map(p => `${p.brand} ${p.name} review`),
    ...phones.map(p => `${p.brand} ${p.name} price`),
    ...phones.map(p => `${p.brand} ${p.name} camera`),
    ...phones.map(p => `${p.brand} ${p.name} battery`),
    ...phones.map(p => `${p.brand} ${p.name} display`),
    ...phones.map(p => `${p.brand} ${p.name} processor`),
    ...phones.map(p => `${p.brand} ${p.name} RAM`),
    ...phones.map(p => `${p.brand} ${p.name} storage`),
    
    // Comparison phrases
    `${p1?.brand} vs ${p2?.brand}`,
    `${p1?.name} vs ${p2?.name}`,
    `${p1?.brand} ${p1?.name} vs ${p2?.brand} ${p2?.name}`,
    `${p1?.name} vs ${p2?.name} comparison`,
    `compare ${p1?.name} vs ${p2?.name}`,
    `${p1?.brand} vs ${p2?.brand} comparison`,
    `which is better ${p1?.name} or ${p2?.name}`,
    `${p1?.name} or ${p2?.name}`,
    
    // Year-specific
    ...phones.map(p => `${p.brand} ${p.name} ${p.year || ""}`),
    ...phones.map(p => `${p.name} ${p.year || ""}`),
    `${p1?.brand} ${p1?.name} vs ${p2?.brand} ${p2?.name} ${p1?.year || ""}`,
    
    // General keywords
    "phone comparison",
    "smartphone comparison",
    "compare phones",
    "specs comparison",
    "phone specs",
    "smartphone specs",
    "best phone",
    "phone review",
    "smartphone review",
    "phone camera comparison",
    "battery comparison",
    "performance comparison",
    "phone price comparison",
    "flagship phone",
    "best smartphone",
    "mobile comparison",
    "cell phone comparison",
    "phone battle",
    "specs comparison",
    "phone features",
    "smartphone features",
    "tech comparison",
    "gadget comparison",
    
    // Tags from phones
    ...phones.flatMap(p => p.tags || []),
  ].filter(Boolean).join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "7pexel Team", url: siteUrl }],
    creator: "7pexel",
    publisher: "7pexel",
    
    openGraph: {
      title: `${phoneNames} Comparison - Full Specs, Camera, Battery & Performance Review`,
      description: `Compare ${phoneNames} side by side. ${specsSummary}. Which phone is better? Find out with our detailed comparison.`,
      url: compareUrl,
      siteName: "7pexel",
      images: phones.map(p => ({
        url: p.image || `${siteUrl}/images/default-phone.jpg`,
        width: 1200,
        height: 630,
        alt: `${p.brand} ${p.name} vs ${phones[0]?.brand} ${phones[0]?.name}`,
      })),
      type: "website",
      locale: "en_US",
    },
    
    twitter: {
      card: "summary_large_image",
      site: "@7pexel",
      creator: "@7pexel",
      title: `${p1?.name} vs ${p2?.name} - Full Comparison`,
      description: `Compare ${phoneNames} - Camera, battery, performance, display, and more.`,
      images: phones.map(p => p.image || `${siteUrl}/images/default-phone.jpg`),
    },
    
    alternates: {
      canonical: compareUrl,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    
    other: {
      'article:section': 'Technology',
      'article:tag': phones.map(p => p.name).join(', '),
      'product:brand': phones.map(p => p.brand).join(', '),
      'product:category': 'Smartphones',
    },
  };
}

// ============= PAGE COMPONENT =============
export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const phonesParam = params.phones || "";
  const slugs = phonesParam.split(",").filter(Boolean);
  
  let phonesData: any[] = [];
  let comparisonTitle = "Compare Smartphones";
  
  if (slugs.length > 0) {
    try {
      await connectToDatabase();
      phonesData = await Phone.find({ 
        slug: { $in: slugs } 
      }).lean();
      
      if (phonesData.length > 0) {
        comparisonTitle = phonesData.map(p => `${p.brand} ${p.name}`).join(" vs ");
      }
    } catch (error) {
      console.error("Error fetching phones for compare:", error);
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://7pexel.com";
  const compareUrl = `${siteUrl}/compare?phones=${slugs.join(",")}`;
  const p1 = phonesData[0];
  const p2 = phonesData[1];
  const p3 = phonesData[2];

  // ============= JSON-LD STRUCTURED DATA =============
  
  // 1. Comparison Schema
  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": compareUrl,
    "name": `${comparisonTitle} Comparison - Which is Better? Full Specs & Review | 7pexel`,
    "description": `Compare ${comparisonTitle} side by side. Full specifications, camera, battery, performance, and pricing comparison.`,
    "url": compareUrl,
    "about": {
      "@type": "Thing",
      "name": "Phone Comparison",
      "description": "Side by side comparison of smartphone specifications and features."
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": phonesData.map((phone, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${phone.brand} ${phone.name}`,
          "brand": {
            "@type": "Brand",
            "name": phone.brand
          },
          "image": phone.image || `${siteUrl}/images/default-phone.jpg`,
          "description": `${phone.brand} ${phone.name} (${phone.year}) with ${phone.specs?.chipset || ""} processor, ${phone.specs?.camera || ""} camera, ${phone.specs?.battery || ""} battery, and ${phone.specs?.display || ""} display.`,
          "offers": {
            "@type": "Offer",
            "price": phone.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
            "priceCurrency": "USD"
          }
        }
      }))
    }
  };

  // 2. Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Phone Finder",
        "item": `${siteUrl}/phone-finder`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Compare",
        "item": compareUrl
      }
    ]
  };

  // 3. FAQ Schema - Aggressive keyword targeting
  const faqQuestions = [];
  
  if (phonesData.length >= 2) {
    // Which is better?
    faqQuestions.push({
      "@type": "Question",
      "name": `Which is better, ${p1?.brand} ${p1?.name} or ${p2?.brand} ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Both ${p1?.brand} ${p1?.name} and ${p2?.brand} ${p2?.name} are excellent flagship smartphones. ${p1?.brand} ${p1?.name} features ${p1?.specs?.camera || "amazing"} camera quality with ${p1?.specs?.cameraWide || "multiple"} lenses, ${p1?.specs?.battery || "long-lasting"} battery life with ${p1?.specs?.wiredCharging || "fast"} charging, and ${p1?.specs?.chipset || "powerful"} performance. ${p2?.brand} ${p2?.name} offers ${p2?.specs?.display || "stunning"} ${p2?.specs?.displayType || "OLED"} display, ${p2?.specs?.camera || "excellent"} camera system, and ${p2?.specs?.chipset || "high-performance"} processor. Choose ${p1?.brand} if you prioritize ${p1?.specs?.camera || "camera"} and battery, or ${p2?.brand} if you prefer display and performance.`
      }
    });

    // Camera comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better camera: ${p1?.name} vs ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Camera comparison: ${p1?.brand} ${p1?.name} has ${p1?.specs?.camera || "a"} camera system with ${p1?.specs?.cameraWide || "wide"} lens and ${p1?.specs?.cameraUltraWide || "ultra-wide"} lens, while ${p2?.brand} ${p2?.name} features ${p2?.specs?.camera || "a"} camera setup with ${p2?.specs?.cameraWide || "wide"} lens. Both support ${p1?.specs?.videoRecording || "4K"} video recording and ${p1?.specs?.cameraFeatures || "advanced"} camera features. ${p1?.brand} excels in ${p1?.specs?.cameraTelephoto || "zoom"} capabilities, while ${p2?.brand} offers better ${p2?.specs?.cameraUltraWide || "ultra-wide"} shots.`
      }
    });

    // Battery comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better battery life: ${p1?.name} or ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Battery comparison: ${p1?.brand} ${p1?.name} has ${p1?.specs?.battery || "a"} battery with ${p1?.specs?.wiredCharging || "fast"} wired charging and ${p1?.specs?.wirelessCharging || "wireless"} charging support. ${p2?.brand} ${p2?.name} features ${p2?.specs?.battery || "a"} battery with ${p2?.specs?.wiredCharging || "fast"} charging. ${p1?.brand} ${p1?.name} offers ${p1?.specs?.batteryTechnology || "advanced"} battery technology and ${p1?.specs?.videoPlayback || "long"} playback time. ${p2?.brand} ${p2?.name} provides ${p2?.specs?.battery || "competitive"} battery life with ${p2?.specs?.wirelessCharging || "wireless"} charging support.`
      }
    });

    // Display comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better display: ${p1?.name} vs ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Display comparison: ${p1?.brand} ${p1?.name} features a ${p1?.specs?.display || "large"} ${p1?.specs?.displayType || "OLED"} display with ${p1?.specs?.resolution || "high"} resolution and ${p1?.specs?.refreshRate || "smooth"} refresh rate. ${p2?.brand} ${p2?.name} offers a ${p2?.specs?.display || "large"} ${p2?.specs?.displayType || "OLED"} display with ${p2?.specs?.resolution || "high"} resolution and ${p2?.specs?.refreshRate || "smooth"} refresh rate. Both support ${p1?.specs?.hdrSupport || "HDR"} and have ${p1?.specs?.protection || "gorilla glass"} protection. ${p1?.brand} ${p1?.name} has ${p1?.specs?.brightness || "high"} brightness, while ${p2?.brand} ${p2?.name} offers ${p2?.specs?.pixelDensity || "sharp"} pixel density.`
      }
    });

    // Performance comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone is faster: ${p1?.name} or ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Performance comparison: ${p1?.brand} ${p1?.name} is powered by ${p1?.specs?.chipset || "a"} processor with ${p1?.specs?.cpu || "powerful"} CPU and ${p1?.specs?.gpu || "fast"} GPU, coupled with ${p1?.specs?.ram || "ample"} RAM and ${p1?.specs?.storage || "large"} storage. ${p2?.brand} ${p2?.name} features ${p2?.specs?.chipset || "a"} processor with ${p2?.specs?.cpu || "powerful"} CPU and ${p2?.specs?.gpu || "fast"} GPU, ${p2?.specs?.ram || "ample"} RAM and ${p2?.specs?.storage || "large"} storage. Both phones offer ${p1?.specs?.chipset || "flagship-level"} performance and ${p1?.benchmarks?.antutu || "excellent"} benchmark scores.`
      }
    });

    // Price comparison
    if (phonesData.length >= 2) {
      const prices = phonesData.map(p => {
        const price = p.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "N/A";
        return `${p.brand} ${p.name}: $${price}`;
      }).join(" vs ");
      faqQuestions.push({
        "@type": "Question",
        "name": `Which is cheaper: ${p1?.name} or ${p2?.name}? Price comparison`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Price comparison: ${prices}. ${p1?.brand} ${p1?.name} is priced at ${p1?.specs?.pricing?.[0] || "contact for pricing"} with models including ${p1?.specs?.models?.join(", ") || "various storage variants"}. ${p2?.brand} ${p2?.name} starts at ${p2?.specs?.pricing?.[0] || "contact for pricing"} with ${p2?.specs?.models?.join(", ") || "multiple storage options"}. ${p1?.brand} ${p1?.name} offers ${p1?.specs?.pricing?.length || "various"} pricing options, while ${p2?.brand} ${p2?.name} provides ${p2?.specs?.pricing?.length || "various"} price points.`
        }
      });
    }

    // Features comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `What are the key differences between ${p1?.name} and ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Key differences: ${p1?.brand} ${p1?.name} features ${p1?.specs?.displayType || "OLED"} display, ${p1?.specs?.chipset || "flagship"} processor, ${p1?.specs?.camera || "advanced"} camera, ${p1?.specs?.battery || "large"} battery with ${p1?.specs?.wiredCharging || "fast"} charging. ${p2?.brand} ${p2?.name} offers ${p2?.specs?.displayType || "OLED"} display, ${p2?.specs?.chipset || "flagship"} processor, ${p2?.specs?.camera || "advanced"} camera, ${p2?.specs?.battery || "large"} battery with ${p2?.specs?.wiredCharging || "fast"} charging. ${p1?.brand} excels in ${p1?.specs?.camera || "camera"} and ${p1?.specs?.battery || "battery"}, while ${p2?.brand} stands out with ${p2?.specs?.display || "display"} and ${p2?.specs?.chipset || "performance"}.`
      }
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions
  };

  // 4. Product Comparison Schema
  const productComparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${phonesData.map(p => p.name).join(" vs ")} Comparison`,
    "description": `Compare ${phonesData.map(p => `${p.brand} ${p.name}`).join(" vs ")} specifications side by side. Full camera, battery, performance, display comparison.`,
    "brand": {
      "@type": "Brand",
      "name": phonesData.map(p => p.brand).join(", ")
    },
    "offers": phonesData.map(p => ({
      "@type": "Offer",
      "price": p.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
      "priceCurrency": "USD",
      "itemOffered": {
        "@type": "Product",
        "name": `${p.brand} ${p.name}`,
        "image": p.image || `${siteUrl}/images/default-phone.jpg`
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      {/* ===== ALL JSON-LD STRUCTURED DATA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqQuestions.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {phonesData.length >= 2 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productComparisonJsonLd) }}
        />
      )}

      {/* ===== HIDDEN HEADINGS FOR KEYWORD TARGETING ===== */}
      <h1 className="sr-only">
        {comparisonTitle} Comparison 2026 - Full Specs, Camera, Battery & Performance Review | 7pexel
      </h1>
      
      <h2 className="sr-only">
        Compare {phonesData.map(p => `${p.brand} ${p.name}`).join(", ")} - Specifications, Camera Quality, Battery Life, Performance Benchmarks & Pricing
      </h2>

      <h3 className="sr-only">
        {p1?.brand} {p1?.name} vs {p2?.brand} {p2?.name} - Which Phone is Better? Complete Comparison Guide
      </h3>

      {/* ===== CLIENT COMPONENT ===== */}
      <Suspense fallback={<CompareSkeleton />}>
        <CompareClient initialPhones={phonesData} />
      </Suspense>
    </div>
  );
}

// ============= SKELETON COMPONENT =============
function CompareSkeleton() {
  return (
    <div className="w-[77vw] max-w-[77vw] mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-56 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
        <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-[220px] flex-shrink-0">
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-1" />
            </div>
          ))}
        </div>
        <div className="space-y-4 mt-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
    </div>
  );
}