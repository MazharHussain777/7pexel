// @ts-nocheck 
// app/news/page.tsx
"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { NewsletterFull } from "@/components/NewsletterFull";
import { Pagination } from "@/components/news/Pagination";
import { BreadcrumbSchema } from "@/components/news/BreadcrumbSchema";

interface Article {
  _id: string;
  category: string;
  title: string;
  headline: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  updatedDate?: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  excerpt: string;
  content: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  source: string;
  sourceUrl: string;
  tags: string[];
  comments: number;
  shares: number;
  views: number;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  createdAt?: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Loading skeleton component
function NewsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
            <h1 className="text-4xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-3">
              Tech News
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] animate-pulse">
              <div className="aspect-[4/3] bg-[#f5ebd0]/50" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-[#f5ebd0]/50 rounded w-1/3" />
                <div className="h-4 bg-[#f5ebd0]/50 rounded w-3/4" />
                <div className="h-3 bg-[#f5ebd0]/50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Main content component that uses useSearchParams
function NewsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Get query params
  const currentPage = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";

  // Fetch articles from backend
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      params.set("limit", "12");

      if (category && category !== "All") {
        params.set("category", category);
      }

      if (tag) {
        params.set("tag", tag);
      }

      if (search) {
        params.set("search", search);
      }

      const response = await fetch(`/api/articles?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setArticles(result.data);
        setPagination(result.pagination);
        
        const uniqueCategories = [...new Set(
          result.data
            .map((a: Article) => a.category)
            .filter((cat: string | undefined): cat is string => !!cat)
        )] as string[];
        
        setCategories(["All", ...uniqueCategories]);
        
        const allTagsArray = result.data.flatMap((a: Article) => a.tags || []);
        const uniqueTags = [...new Set(allTagsArray)] as string[];
        setAllTags(uniqueTags);
        setPopularTags(uniqueTags.slice(0, 10));
      } else {
        setError(result.error || "Failed to fetch articles");
        setArticles([]);
      }
    } catch (err: any) {
      console.error("Error fetching articles:", err);
      setError(err?.message || "Failed to fetch articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, category, tag, search]);

  // Fetch categories separately for filter
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      const result = await response.json();
      if (result.success) {
        const catNames = result.data.map((c: any) => c.name);
        setCategories(["All", ...catNames]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [fetchArticles, fetchCategories]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      const params = new URLSearchParams();
      if (category && category !== "All") params.set("category", category);
      if (tag) params.set("tag", tag);
      router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
      return;
    }

    setIsSearching(true);
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (tag) params.set("tag", tag);
    params.set("search", searchQuery.trim());
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    router.push(`/news?${params.toString()}`);
    setShowSuggestions(false);
  };

  // Handle tag click from suggestions or tags
  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    params.set("tag", tagName);
    router.push(`/news?${params.toString()}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  // Handle category click
  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== "All") params.set("category", cat);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (tag) params.set("tag", tag);
    router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
  };

  // Get search suggestions based on input
  const getSuggestions = (query: string) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const tagSuggestions = allTags.filter(t => 
      t.toLowerCase().includes(lowerQuery)
    ).map(t => `#${t}`);
    
    const categorySuggestions = categories
      .filter(c => c !== "All" && c.toLowerCase().includes(lowerQuery))
      .map(c => `category:${c}`);
    
    return [...tagSuggestions, ...categorySuggestions].slice(0, 8);
  };

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.length > 1) {
      setSuggestions(getSuggestions(searchQuery));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get featured and breaking articles
  const featuredArticles = articles.filter((a) => a.isFeatured).slice(0, 2);
  const breakingArticles = articles.filter((a) => a.isBreaking);
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 4);
  const regularArticles = articles.filter(
    (a) => !a.isFeatured && !a.isBreaking && !a.isTrending
  );

  if (loading) {
    return <NewsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
            <i className="fas fa-exclamation-triangle text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4">Failed to Load Articles</h2>
          <p className="text-[#6d4a4a] mb-8">{error}</p>
          <button
            onClick={() => fetchArticles()}
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

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://techblog.com/" },
          { name: "News" },
        ]}
      />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        {/* News Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
            <h1 className="text-4xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-3">
              Tech News
              {breakingArticles.length > 0 && (
                <span className="text-sm font-medium bg-[#7F011F] text-white px-3 py-1 rounded-full text-xs animate-pulse">
                  LIVE
                </span>
              )}
            </h1>
          </div>
          <p className="text-[#6d4a4a] ml-5">
            Latest technology news, trends, and insights from around the world
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
                onFocus={() => {
                  if (searchQuery.length > 1) setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search articles, tags, authors... Try #AI, #Samsung, or category:Reviews"
                className="flex-1 py-3 bg-transparent outline-none text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] text-sm"
              />
              {(searchQuery || search) && (
                <button
                  type="button"
                  onClick={clearSearch}
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

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[rgba(127,1,31,0.06)] z-50 overflow-hidden">
                <div className="p-2 max-h-60 overflow-y-auto">
                  <div className="text-xs text-[#6d4a4a] px-3 py-1.5 font-medium">Suggestions</div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (suggestion.startsWith("#")) {
                          const tagName = suggestion.substring(1);
                          handleTagClick(tagName);
                        } else if (suggestion.startsWith("category:")) {
                          const catName = suggestion.replace("category:", "");
                          const params = new URLSearchParams();
                          params.set("category", catName);
                          if (tag) params.set("tag", tag);
                          router.push(`/news?${params.toString()}`);
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#f5ebd0]/30 rounded-xl transition-colors text-sm text-[#2d1a1a] flex items-center gap-2"
                    >
                      <i className={`fas ${suggestion.startsWith("#") ? "fa-hashtag" : "fa-tag"} text-[#7F011F] text-xs`} />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#6d4a4a]">Popular tags:</span>
            {popularTags.map((tagName) => (
              <button
                key={tagName}
                onClick={() => handleTagClick(tagName)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  tag === tagName
                    ? "bg-[#7F011F] text-white"
                    : "bg-[#f5ebd0]/50 text-[#2d1a1a] hover:bg-[#7F011F]/10 hover:text-[#7F011F]"
                }`}
              >
                #{tagName}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Info */}
        {search && (
          <div className="mb-4 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200 text-sm text-blue-700 flex items-center justify-between">
            <span>
              <i className="fas fa-search mr-2" />
              Showing results for: <strong>"{search}"</strong>
              <span className="ml-2 text-blue-500">({pagination.total} results)</span>
            </span>
            <button
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-800 transition-colors text-xs"
            >
              <i className="fas fa-times mr-1" />
              Clear
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap font-['Poppins',sans-serif] ${
                  (cat === "All" && !category) || category === cat
                    ? "bg-[#7F011F] text-white shadow-lg shadow-[#7F011F]/30"
                    : "bg-white text-[#2d1a1a] hover:bg-[#f5ebd0] border border-[rgba(127,1,31,0.06)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(category || tag || search) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-[#6d4a4a]">Active filters:</span>
            {category && category !== "All" && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-folder" />
                {category}
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (tag) params.set("tag", tag);
                    if (search) params.set("search", search);
                    router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
                  }}
                  className="hover:text-blue-800 transition-colors"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {tag && (
              <span className="inline-flex items-center gap-1.5 bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-hashtag" />
                {tag}
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (category && category !== "All") params.set("category", category);
                    if (search) params.set("search", search);
                    router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
                  }}
                  className="hover:text-[#a80a30] transition-colors"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                <i className="fas fa-search" />
                {search}
                <button
                  onClick={clearSearch}
                  className="hover:text-gray-900 transition-colors"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                router.push("/news");
              }}
              className="text-xs text-[#7F011F] hover:underline font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Breaking News Banner */}
        {breakingArticles.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-[#7F011F] to-[#a80a30] rounded-[3px] p-4 shadow-lg shadow-[#7F011F]/20 overflow-hidden">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex-shrink-0">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Breaking News
                </span>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="text-white text-sm md:text-base font-medium">
                  {breakingArticles[0].title}
                </div>
                <div className="text-white/70 text-xs mt-1 line-clamp-1">
                  {breakingArticles[0].excerpt}
                </div>
              </div>
              <Link
                href={`/news/${breakingArticles[0].slug}`}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0"
              >
                Read Now
                <i className="fas fa-arrow-right text-xs" />
              </Link>
            </div>
          </div>
        )}

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
              <i className="fas fa-star text-[#FFD700]" />
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Link
                href={`/news/${featuredArticles[0].slug}`}
                className="group relative bg-white rounded-[3px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#7F011F] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {featuredArticles[0].category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 font-['Poppins',sans-serif] line-clamp-2">
                      {featuredArticles[0].title}
                    </h2>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">
                      {featuredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <i className="far fa-user" />
                        {featuredArticles[0].author}
                      </span>
                      <span>{formatDate(featuredArticles[0].date)}</span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col gap-4">
                {featuredArticles.slice(1, 3).map((article) => (
                  <Link
                    key={article._id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-[3px] overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex"
                  >
                    <div className="relative w-[120px] md:w-[180px] h-[120px] md:h-[180px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        sizes="180px"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-xs font-bold text-[#7F011F] mb-1">
                        {article.category}
                      </div>
                      <h3 className="font-bold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif] text-sm md:text-base">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#6d4a4a] mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[#6d4a4a]">
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trending Section */}
        {trendingArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
              <i className="fas fa-fire text-[#FF6B35]" />
              Trending Now
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingArticles.map((article, index) => (
                <Link
                  key={article._id}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-[3px] overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 right-2 bg-[#FF6B35] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold text-[#7F011F] mb-1">
                      {article.category}
                    </div>
                    <h3 className="font-bold text-sm text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif]">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#6d4a4a]">
                      <span className="flex items-center gap-0.5">
                        <i className="far fa-comment" />
                        {article.comments}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <i className="far fa-share-square" />
                        {article.shares}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
            <i className="fas fa-newspaper text-[#7F011F]" />
            {search ? "Search Results" : "Latest News"}
            <span className="text-sm font-normal text-[#6d4a4a] ml-2">
              ({pagination.total} articles)
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {regularArticles.length > 0 ? (
              regularArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-[#7F011F] text-white text-[0.5rem] font-bold px-2 py-0.5 rounded-full">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-[#2d1a1a] leading-tight line-clamp-2 group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif] min-h-[2.5rem]">
                      {article.title}
                    </h3>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {article.tags.slice(0, 3).map((tagName) => (
                          <button
                            key={tagName}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleTagClick(tagName);
                            }}
                            className="text-[0.45rem] bg-[#f5ebd0]/50 px-1.5 py-0.5 rounded-full text-[#6d4a4a] hover:bg-[#7F011F]/10 hover:text-[#7F011F] transition-colors"
                          >
                            #{tagName}
                          </button>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-[0.45rem] text-[#6d4a4a]">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(127,1,31,0.04)]">
                      <div className="flex items-center gap-1.5 text-[0.5rem] text-[#6d4a4a]">
                        <span className="truncate max-w-[60px]">{article.author}</span>
                        <span>•</span>
                        <span className="whitespace-nowrap">{formatDate(article.date).split(",")[0]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[0.5rem] text-[#6d4a4a]">
                        <i className="far fa-comment" />
                        <span>{article.comments}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <i className="fas fa-newspaper text-4xl text-[#7F011F]/20 mb-4 block" />
                <p className="text-[#6d4a4a] font-['Poppins',sans-serif]">
                  {search ? `No articles found for "${search}"` : "No articles found"}
                </p>
                {search && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 text-sm text-[#7F011F] hover:underline"
                  >
                    Clear search and show all articles
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) => {
                const params = new URLSearchParams();
                if (category && category !== "All") params.set("category", category);
                if (tag) params.set("tag", tag);
                if (search) params.set("search", search);
                if (page > 1) params.set("page", page.toString());
                router.push(`/news${params.toString() ? "?" + params.toString() : ""}`);
              }}
            />
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12">
          <NewsletterFull />
        </div>
      </main>
    </div>
  );
}

// Main page component with Suspense boundary
export default function NewsPage() {
  return (
    <Suspense fallback={<NewsPageSkeleton />}>
      <NewsPageContent />
    </Suspense>
  );
}