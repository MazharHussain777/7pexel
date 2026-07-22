// @ts-nocheck 
// components/AdvancedSearch.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  excerpt: string;
  date: string;
  tags: string[];
  views: number;
  comments: number;
}

interface SearchResponse {
  success: boolean;
  data: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    tags: string[];
    categories: string[];
  };
  searchQuery: string;
}

export function AdvancedSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<{
    tags: string[];
    categories: string[];
  }>({ tags: [], categories: [] });
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get initial search from URL
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const tag = searchParams.get("tag") || "";
    const category = searchParams.get("category") || "";
    
    if (q || tag || category) {
      setSearchQuery(q);
      setSelectedTag(tag);
      setSelectedCategory(category);
      performSearch(q, tag, category);
    }
  }, []);

  // Debounced search
  const performSearch = useCallback(async (
    query: string,
    tag: string = "",
    category: string = "",
    page: number = 1
  ) => {
    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (tag) params.set("tag", tag);
      if (category) params.set("category", category);
      if (page > 1) params.set("page", page.toString());
      params.set("limit", "20");

      const response = await fetch(`/api/articles/search?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setResults(result.data);
        setPagination(result.pagination);
        setFilters(result.filters);
        
        // Generate suggestions from tags and categories
        const suggestions = [
          ...result.filters.tags.map(t => `#${t}`),
          ...result.filters.categories.map(c => `category:${c}`),
        ];
        setSuggestions(suggestions.slice(0, 10));
      } else {
        setError(result.error || "Failed to search");
        setResults([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to search");
      setResults([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && !selectedTag && !selectedCategory) return;

    // Update URL
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedTag) params.set("tag", selectedTag);
    if (selectedCategory) params.set("category", selectedCategory);
    
    router.push(`/search?${params.toString()}`);
    
    performSearch(searchQuery.trim(), selectedTag, selectedCategory);
    setShowSuggestions(false);
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchQuery(`#${tag}`);
    const params = new URLSearchParams();
    params.set("tag", tag);
    router.push(`/search?${params.toString()}`);
    performSearch("", tag, "");
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    params.set("category", category);
    router.push(`/search?${params.toString()}`);
    performSearch("", "", category);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
    setSelectedCategory("");
    setResults([]);
    setPagination({ total: 0, page: 1, limit: 20, totalPages: 0 });
    router.push("/search");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get search placeholder with examples
  const getPlaceholder = () => {
    const examples = [
      "Search articles...",
      "Try: AI, Technology, or #GPT5",
      "Search by tag: #Samsung",
      "Search by category: Reviews",
      "Type to search articles, tags, authors...",
    ];
    return examples[Math.floor(Math.random() * examples.length)];
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-white rounded-2xl shadow-lg border border-[rgba(127,1,31,0.06)] focus-within:border-[#7F011F] focus-within:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] transition-all overflow-hidden">
            <div className="px-4 text-[#6d4a4a]">
              <i className="fas fa-search" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 2) {
                  // Show suggestions for hashtags
                  const hasHashtag = e.target.value.match(/#(\w+)/);
                  if (hasHashtag) {
                    const tag = hasHashtag[1];
                    setSuggestions(filters.tags.filter(t => 
                      t.toLowerCase().includes(tag.toLowerCase())
                    ).map(t => `#${t}`));
                    setShowSuggestions(true);
                  } else {
                    setShowSuggestions(false);
                  }
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={getPlaceholder()}
              className="flex-1 py-4 bg-transparent outline-none text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif]"
            />
            {(searchQuery || selectedTag || selectedCategory) && (
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
              className="px-6 py-4 bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white font-semibold hover:shadow-lg hover:shadow-[#7F011F]/30 transition-all"
            >
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[rgba(127,1,31,0.06)] z-50 overflow-hidden">
              <div className="p-2 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                      if (suggestion.startsWith("#")) {
                        const tag = suggestion.substring(1);
                        setSelectedTag(tag);
                        performSearch("", tag, "");
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

      {/* Active Filters */}
      {(selectedTag || selectedCategory || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-[#6d4a4a]">Active filters:</span>
          {selectedTag && (
            <span className="inline-flex items-center gap-1.5 bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-hashtag" />
              {selectedTag}
              <button
                onClick={() => {
                  setSelectedTag("");
                  performSearch(searchQuery, "", selectedCategory);
                }}
                className="hover:text-[#a80a30] transition-colors"
              >
                <i className="fas fa-times text-[10px]" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-folder" />
              {selectedCategory}
              <button
                onClick={() => {
                  setSelectedCategory("");
                  performSearch(searchQuery, selectedTag, "");
                }}
                className="hover:text-blue-800 transition-colors"
              >
                <i className="fas fa-times text-[10px]" />
              </button>
            </span>
          )}
          {searchQuery && !selectedTag && !selectedCategory && (
            <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-search" />
              {searchQuery}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-[#7F011F] hover:underline font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Tag Cloud */}
      {filters.tags.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-[#6d4a4a] mr-1">Popular tags:</span>
            {filters.tags.slice(0, 15).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  selectedTag === tag
                    ? "bg-[#7F011F] text-white"
                    : "bg-[#f5ebd0]/50 text-[#2d1a1a] hover:bg-[#7F011F]/10 hover:text-[#7F011F]"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      {!loading && results.length > 0 && (
        <div className="text-sm text-[#6d4a4a] mb-4">
          Found <span className="font-semibold text-[#2d1a1a]">{pagination.total}</span> results
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTag && ` with tag #${selectedTag}`}
          {selectedCategory && ` in ${selectedCategory}`}
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
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
      ) : error ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-[rgba(127,1,31,0.06)]">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
            <i className="fas fa-exclamation-triangle text-2xl text-red-500" />
          </div>
          <p className="text-[#6d4a4a] font-['Poppins',sans-serif]">{error}</p>
          <button
            onClick={() => performSearch(searchQuery, selectedTag, selectedCategory)}
            className="mt-4 px-6 py-2 bg-[#7F011F] text-white rounded-full text-sm hover:bg-[#a80a30] transition-colors"
          >
            Retry
          </button>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((article) => (
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
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.45rem] bg-[#f5ebd0]/50 px-1.5 py-0.5 rounded-full text-[#6d4a4a]"
                        >
                          #{tag}
                        </span>
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
                      <i className="far fa-eye" />
                      <span>{article.views?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => {
                  const newPage = pagination.page - 1;
                  performSearch(searchQuery, selectedTag, selectedCategory, newPage);
                }}
                disabled={pagination.page === 1}
                className="w-10 h-10 rounded-full border border-[rgba(127,1,31,0.1)] hover:border-[#7F011F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <i className="fas fa-chevron-left text-sm" />
              </button>
              <span className="text-sm text-[#6d4a4a]">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => {
                  const newPage = pagination.page + 1;
                  performSearch(searchQuery, selectedTag, selectedCategory, newPage);
                }}
                disabled={pagination.page === pagination.totalPages}
                className="w-10 h-10 rounded-full border border-[rgba(127,1,31,0.1)] hover:border-[#7F011F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-[rgba(127,1,31,0.06)]">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#f5ebd0]/50 flex items-center justify-center mb-6">
            <i className="fas fa-search text-3xl text-[#7F011F]/30" />
          </div>
          <h3 className="text-xl font-bold text-[#2d1a1a] mb-2 font-['Poppins',sans-serif]">
            No results found
          </h3>
          <p className="text-[#6d4a4a] max-w-md mx-auto">
            We couldn't find any articles matching your search. Try different keywords or browse our categories.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {filters.tags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs bg-[#f5ebd0] text-[#2d1a1a] px-3 py-1.5 rounded-full hover:bg-[#7F011F]/10 hover:text-[#7F011F] transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}