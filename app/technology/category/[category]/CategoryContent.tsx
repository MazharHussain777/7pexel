// app/technology/category/[category]/CategoryContent.tsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Icon } from "@/components/technology/icons";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  categorySlug: string;
  subCategorySlug: string | null;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  steps: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt: string;
  views: number;
  likes: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  subCategoryId?: {
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  } | null;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  categorySlug: string;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

interface CategoryContentProps {
  category: Category;
  subCategories: SubCategory[];
  initialArticles: Article[];
}

export function CategoryContent({ 
  category, 
  subCategories, 
  initialArticles 
}: CategoryContentProps) {
  const [articles] = useState<Article[]>(initialArticles);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');

  // ─── SORTED & FILTERED GUIDES ──────────────────────
  const filteredAndSortedGuides = useMemo(() => {
    let filtered = [...articles];
    
    if (activeFilter !== "all") {
      filtered = filtered.filter(guide => {
        if (guide.subCategorySlug === activeFilter) return true;
        if (guide.subCategoryId && typeof guide.subCategoryId === 'object' && 
            guide.subCategoryId.slug === activeFilter) return true;
        return false;
      });
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'trending':
        filtered.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return (b.views || 0) - (a.views || 0);
        });
        break;
    }
    
    return filtered;
  }, [articles, activeFilter, sortBy]);

  function formatDate(date: string): string {
    if (!date) return 'No date';
    return new Date(date).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  }

  function getDifficultyColor(level: string): string {
    const colors: Record<string, string> = {
      Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      Intermediate: "bg-amber-500/10 text-amber-600 border-amber-200",
      Advanced: "bg-rose-500/10 text-rose-600 border-rose-200",
    };
    return colors[level] || "bg-gray-500/10 text-gray-600 border-gray-200";
  }

  const getFilterCount = (subSlug: string) => {
    return articles.filter(guide => {
      if (guide.subCategorySlug === subSlug) return true;
      if (guide.subCategoryId && typeof guide.subCategoryId === 'object' && 
          guide.subCategoryId.slug === subSlug) return true;
      return false;
    }).length;
  };

  const activeSubCategories = subCategories.filter((sub) => sub.isActive !== false);

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#d8e2df] mb-4">
          <Icon name="file-search" size={28} className="text-[#7a8f8a]" />
        </div>
        <h3 className="text-xl font-bold text-[#2c3e3a] mb-2">No guides found</h3>
        <p className="text-[#5a6f6a] mb-4">
          No articles available in this category yet. Check back soon!
        </p>
        <Link
          href="/technology"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#011d24] text-white font-medium hover:bg-[#033742] transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          Browse all categories
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ─── SUB-CATEGORIES FILTERS ──────────────────── */}
      {activeSubCategories.length > 0 && articles.length > 0 && (
        <section className="w-full bg-white/80 backdrop-blur-sm border-y border-[#d8e2df] py-4 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveFilter("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-[#011d24] text-white border-[#011d24] shadow-md"
                    : "bg-white text-[#2c3e3a] border-[#d8e2df] hover:border-[#b8c9c4] hover:shadow-sm"
                }`}
              >
                <Icon name="grid" size={16} />
                <span className="text-sm font-medium">All</span>
                <span className={`text-xs ${activeFilter === "all" ? "text-white/70" : "text-[#7a8f8a]"}`}>
                  ({articles.length})
                </span>
              </button>

              {activeSubCategories.map((sub) => {
                const count = getFilterCount(sub.slug);
                return (
                  <button
                    key={sub._id}
                    onClick={() => setActiveFilter(sub.slug)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                      activeFilter === sub.slug
                        ? "bg-[#011d24] text-white border-[#011d24] shadow-md"
                        : "bg-white text-[#2c3e3a] border-[#d8e2df] hover:border-[#b8c9c4] hover:shadow-sm"
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: sub.color || '#6C3CE1' }}
                    />
                    <span className="text-sm font-medium">{sub.name}</span>
                    <span className={`text-xs ${activeFilter === sub.slug ? "text-white/70" : "text-[#7a8f8a]"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── GUIDES GRID ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-[#2c3e3a]">
            {activeFilter === "all" ? "All" : subCategories.find(s => s.slug === activeFilter)?.name || "All"} Guides
            <span className="ml-2 text-sm font-normal text-[#7a8f8a]">
              ({filteredAndSortedGuides.length})
            </span>
          </h2>
          
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm px-3 py-1.5 rounded-full border border-[#d8e2df] bg-white text-[#2c3e3a] focus:outline-none focus:ring-2 focus:ring-[#033742]"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
            
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="text-xs text-[#1a7a6a] font-medium hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#d8e2df] mb-4">
              <Icon name="file-search" size={28} className="text-[#7a8f8a]" />
            </div>
            <h3 className="text-xl font-bold text-[#2c3e3a] mb-2">No guides found</h3>
            <p className="text-[#5a6f6a] mb-4">
              No guides match the selected filter. Try selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {filteredAndSortedGuides.map((guide, index) => {
              const isLarge = index % 3 === 2;
              
              return (
                <Link
                  key={guide._id}
                  href={`/technology/${guide.slug}`}
                  className={`group bg-white rounded-[7px] overflow-hidden border border-[#c5d8d2] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(1,29,36,0.12)] hover:border-[#033742] ${
                    isLarge ? 'lg:col-span-4' : 'lg:col-span-3'
                  }`}
                  prefetch={index < 3}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#e8f0ec]">
                    <img
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* ✅ NO BADGES, NO VIEWS, NO TAGS - CLEAN IMAGE */}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.6rem] font-medium text-[#4a6a5a]">
                        {guide.categoryId?.name || guide.categorySlug}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c5d8d2]" />
                      <span className="text-[0.6rem] text-[#4a6a5a]">{formatDate(guide.publishedAt)}</span>
                    </div>
                    
                    <h3 className="font-fraunces font-medium text-[1.05rem] leading-[1.3] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                      {guide.title}
                    </h3>
                    
                    <p className="text-[0.85rem] text-[#5a6f6a] mt-2 line-clamp-2">
                      {guide.excerpt}
                    </p>
                    {/* ✅ NO TAGS - REMOVED */}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}