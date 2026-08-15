// app/technology/category/[category]/CategoryContent.tsx
"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Icon, type IconName } from "@/components/technology/icons";
import { GuideCard } from "@/components/technology/GuideCard";

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
  difficulty: string;
  readTime: number;
  steps: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt: string;
  views: number;
  likes: number;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
  };
  subCategoryId?: {
    _id: string;
    name: string;
    slug: string;
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
}

interface CategoryContentProps {
  category: Category;
  subCategories: SubCategory[];
}

export function CategoryContent({
  category,
  subCategories,
}: CategoryContentProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // ─── FETCH ARTICLES FROM API ──────────────────────────
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/technology/articles?category=${category.slug}`);
        const data = await response.json();
        
        if (data.success) {
          // Handle both response formats
          const articlesData = data.data || data.articles || [];
          setArticles(articlesData);
        } else {
          setError(data.error || 'Failed to fetch articles');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category.slug]);

  // ─── FILTER GUIDES ─────────────────────────────────────
  const filteredGuides = useMemo(() => {
    if (activeFilter === "all") {
      return articles;
    }
    
    // ✅ Filter by subCategorySlug only
    return articles.filter(guide => {
      // Direct match by subCategorySlug
      if (guide.subCategorySlug === activeFilter) {
        return true;
      }
      // Check if subCategoryId matches
      if (guide.subCategoryId && typeof guide.subCategoryId === 'object' && guide.subCategoryId.slug === activeFilter) {
        return true;
      }
      return false;
    });
  }, [activeFilter, articles]);

  function formatDate(date: string): string {
    if (!date) return 'No date';
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function getDifficultyColor(level: string): string {
    const colors: Record<string, string> = {
      Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      Intermediate: "bg-amber-500/10 text-amber-600 border-amber-200",
      Advanced: "bg-rose-500/10 text-rose-600 border-rose-200",
    };
    return colors[level] || "bg-gray-500/10 text-gray-600 border-gray-200";
  }

  const getCardSize = (index: number) => {
    const pattern = [3, 3, 4, 3, 3, 4, 3, 3];
    return pattern[index % pattern.length];
  };

  // ─── GET FILTER COUNT - EXACT MATCH ONLY ─────────────
  const getFilterCount = (subSlug: string) => {
    return articles.filter(guide => {
      // Direct match by subCategorySlug
      if (guide.subCategorySlug === subSlug) {
        return true;
      }
      // Check if subCategoryId matches
      if (guide.subCategoryId && typeof guide.subCategoryId === 'object' && guide.subCategoryId.slug === subSlug) {
        return true;
      }
      return false;
    }).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#033742] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5a6f6a]">Loading guides...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#d8e2df] mb-4">
          <Icon name="file-search" size={28} className="text-[#7a8f8a]" />
        </div>
        <h3 className="text-xl font-bold text-[#2c3e3a] mb-2">Failed to load guides</h3>
        <p className="text-[#5a6f6a]">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#033742] text-white rounded-full hover:bg-[#011d24] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const activeSubCategories = subCategories.filter((sub: SubCategory) => sub.isActive !== false);

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

              {activeSubCategories.map((sub: SubCategory) => {
                // ✅ Get exact count for this subcategory
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

      {/* ─── GUIDES GRID ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2c3e3a]">
            {activeFilter === "all" ? "All" : subCategories.find(s => s.slug === activeFilter)?.name || "All"} Guides
            <span className="ml-2 text-sm font-normal text-[#7a8f8a]">
              ({filteredGuides.length})
            </span>
          </h2>
          {activeFilter !== "all" && (
            <button
              onClick={() => setActiveFilter("all")}
              className="text-xs text-[#1a7a6a] font-medium hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#d8e2df] mb-4">
              <Icon name="file-search" size={28} className="text-[#7a8f8a]" />
            </div>
            <h3 className="text-xl font-bold text-[#2c3e3a] mb-2">No guides found</h3>
            <p className="text-[#5a6f6a] mb-4">
              {articles.length === 0 
                ? "No articles available in this category yet. Check back soon!" 
                : "No guides match the selected filter. Try selecting a different category."}
            </p>
            {articles.length === 0 && (
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#011d24] text-white font-medium hover:bg-[#033742] transition-colors"
              >
                <Icon name="arrow-left" size={16} />
                Browse all categories
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {filteredGuides.map((guide, index) => {
              const size = getCardSize(index);
              const isLarge = size === 4;
              
              return (
                <GuideCard
                  key={guide._id}
                  guide={guide}
                  isLarge={isLarge}
                  formatDate={formatDate}
                  getDifficultyColor={getDifficultyColor}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}