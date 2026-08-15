// components/technology/SearchBar.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { debounce } from "lodash";

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  categorySlug: string;
  categoryName?: string;
  subCategorySlug?: string;
  subCategoryName?: string;
  author: string;
  difficulty: string;
  readTime: number;
  tags: string[];
  publishedAt: string;
  isTrending: boolean;
  isFeatured: boolean;
  matchType: "title" | "content" | "tags" | "author" | "category" | "subcategory";
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  categoryFilter?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

export function SearchBar({ 
  placeholder = "Search technology guides, categories, topics...",
  className = "",
  categoryFilter,
  onSearch,
  autoFocus = false
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([
    "AI",
    "Quantum Computing",
    "Generative AI",
    "Cybersecurity",
    "AR/VR"
  ]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // ─── LOAD RECENT SEARCHES ──────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("techSearchHistory");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error("Error loading search history:", e);
      }
    }
  }, []);

  // ─── SAVE RECENT SEARCH ────────────────────────────
  const saveRecentSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem("techSearchHistory", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ─── DEBOUNCED SEARCH ──────────────────────────────
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          search: searchQuery,
          limit: "10"
        });
        
        if (categoryFilter) {
          params.append("category", categoryFilter);
        }

        const response = await fetch(`/api/technology/articles/search?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) {
          setResults(data.data || []);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [categoryFilter]
  );

  // ─── HANDLE INPUT CHANGE ────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim().length >= 2) {
      setIsOpen(true);
      performSearch(value);
      onSearch?.(value);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // ─── HANDLE KEYBOARD NAVIGATION ─────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query.trim()) {
          handleSearchSubmit(query);
        }
        break;
      
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // ─── HANDLE RESULT CLICK ────────────────────────────
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    router.push(`/technology/${result.slug}`);
  };

  // ─── HANDLE SEARCH SUBMIT ────────────────────────────
  const handleSearchSubmit = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    saveRecentSearch(searchQuery);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    // Navigate to search results page
    router.push(`/technology/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // ─── CLEAR SEARCH ────────────────────────────────────
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // ─── CLICK OUTSIDE ──────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── HIGHLIGHT MATCH ─────────────────────────────────
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-[#3a8b9a]/20 text-[#033742] font-semibold rounded px-0.5">
          {part}
        </mark> : 
        part
    );
  };

  // ─── GET RESULT ICON ─────────────────────────────────
  const getResultIcon = (result: SearchResult) => {
    switch (result.matchType) {
      case "title":
        return "📄";
      case "content":
        return "📝";
      case "tags":
        return "🏷️";
      case "author":
        return "👤";
      case "category":
        return "📂";
      case "subcategory":
        return "📁";
      default:
        return "📄";
    }
  };

  // ─── GET RESULT BADGE ───────────────────────────────
  const getResultBadge = (result: SearchResult) => {
    const badges = {
      title: { label: "Title", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
      content: { label: "Content", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
      tags: { label: "Tags", color: "bg-green-500/10 text-green-600 border-green-200" },
      author: { label: "Author", color: "bg-orange-500/10 text-orange-600 border-orange-200" },
      category: { label: "Category", color: "bg-cyan-500/10 text-cyan-600 border-cyan-200" },
      subcategory: { label: "Subcategory", color: "bg-teal-500/10 text-teal-600 border-teal-200" },
    };
    return badges[result.matchType] || badges.title;
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* ─── SEARCH INPUT ──────────────────────────────── */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#3a8b9a] border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 text-[#7a8f8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsOpen(true);
            if (query.trim().length >= 2) {
              performSearch(query);
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-12 py-3 bg-white border-2 border-[#d8e2df] rounded-full focus:outline-none focus:border-[#3a8b9a] focus:shadow-[0_0_0_4px_rgba(58,139,154,0.15)] transition-all duration-200 text-[#011d24] placeholder:text-[#7a8f8a]"
          aria-label="Search technology guides"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 flex items-center px-2 text-[#7a8f8a] hover:text-[#033742] transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ─── SEARCH RESULTS ────────────────────────────── */}
      {isOpen && (
        <div
          ref={resultsRef}
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#d8e2df] overflow-hidden max-h-[70vh] overflow-y-auto z-50"
          role="listbox"
        >
          {/* ─── LOADING ────────────────────────────────── */}
          {isLoading && (
            <div className="p-6 text-center">
              <div className="w-8 h-8 border-3 border-[#3a8b9a] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-[#5a6f6a] text-sm">Searching...</p>
            </div>
          )}

          {/* ─── RESULTS ────────────────────────────────── */}
          {!isLoading && results.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-[#f8faf9] border-b border-[#d8e2df] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5a6f6a] uppercase tracking-wider">
                  {results.length} Result{results.length > 1 ? 's' : ''}
                </span>
                <span className="text-xs text-[#7a8f8a]">Press Enter to see all</span>
              </div>
              
              {results.map((result, index) => {
                const badge = getResultBadge(result);
                return (
                  <button
                    key={result._id}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 hover:bg-[#f8faf9] transition-colors border-b border-[#f0f5f3] last:border-b-0 flex items-start gap-3 ${
                      selectedIndex === index ? "bg-[#f0f5f3]" : ""
                    }`}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#eef4f2]">
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.imageAlt || result.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          {getResultIcon(result)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-[#011d24] line-clamp-1">
                          {highlightMatch(result.title, query)}
                        </h4>
                        <span className={`text-[0.5rem] px-2 py-0.5 rounded-full border ${badge.color} whitespace-nowrap`}>
                          {badge.label}
                        </span>
                      </div>
                      
                      {result.excerpt && (
                        <p className="text-xs text-[#5a6f6a] line-clamp-1">
                          {highlightMatch(result.excerpt, query)}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-[0.6rem] px-2 py-0.5 bg-[#eef4f2] text-[#4a6a5a] rounded-full">
                          {result.categoryName || result.categorySlug}
                        </span>
                        {result.subCategoryName && (
                          <span className="text-[0.6rem] px-2 py-0.5 bg-[#eef4f2] text-[#4a6a5a] rounded-full">
                            {result.subCategoryName}
                          </span>
                        )}
                        <span className="text-[0.6rem] text-[#7a8f8a]">
                          {result.author}
                        </span>
                        <span className="text-[0.6rem] text-[#7a8f8a]">
                          ⏱️ {result.readTime} min
                        </span>
                        {result.isTrending && (
                          <span className="text-[0.6rem] text-rose-500 font-medium">🔥 Trending</span>
                        )}
                        {result.isFeatured && (
                          <span className="text-[0.6rem] text-[#3a8b9a] font-medium">★ Featured</span>
                        )}
                      </div>
                      
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {result.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[0.5rem] px-1.5 py-0.5 bg-[#f0f5f3] text-[#4a6a5a] rounded-full"
                            >
                              #{highlightMatch(tag, query)}
                            </span>
                          ))}
                          {result.tags.length > 3 && (
                            <span className="text-[0.5rem] text-[#7a8f8a]">
                              +{result.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
              
              {/* ─── VIEW ALL BUTTON ───────────────────── */}
              <div className="p-2 border-t border-[#d8e2df]">
                <button
                  onClick={() => handleSearchSubmit(query)}
                  className="w-full py-2 text-center text-sm font-semibold text-[#3a8b9a] hover:bg-[#f8faf9] rounded-lg transition-colors"
                >
                  View all results for "{query}"
                  <span className="block text-xs font-normal text-[#7a8f8a]">
                    Press Enter to see full search page
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ─── NO RESULTS ────────────────────────────── */}
          {!isLoading && query.trim().length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <span className="text-4xl block mb-2">🔍</span>
              <h4 className="text-lg font-semibold text-[#011d24] mb-1">No results found</h4>
              <p className="text-sm text-[#5a6f6a] mb-4">
                We couldn't find anything matching "{query}"
              </p>
              <div className="text-xs text-[#7a8f8a]">
                <p>Try:</p>
                <ul className="mt-1 space-y-1">
                  <li>• Using different keywords</li>
                  <li>• Checking your spelling</li>
                  <li>• Using a more general search term</li>
                </ul>
              </div>
            </div>
          )}

          {/* ─── RECENT & TRENDING ─────────────────────── */}
          {!isLoading && query.trim().length < 2 && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#5a6f6a] uppercase tracking-wider mb-2">
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          setSelectedIndex(-1);
                          performSearch(term);
                          setIsOpen(true);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 bg-[#f8faf9] border border-[#d8e2df] rounded-full text-sm text-[#011d24] hover:border-[#3a8b9a] hover:bg-[#f0f5f3] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-xs font-semibold text-[#5a6f6a] uppercase tracking-wider mb-2">
                  Trending Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(term);
                        setSelectedIndex(-1);
                        performSearch(term);
                        setIsOpen(true);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#033742]/5 to-[#3a8b9a]/5 border border-[#d8e2df] rounded-full text-sm text-[#033742] hover:border-[#3a8b9a] hover:bg-gradient-to-r hover:from-[#033742]/10 hover:to-[#3a8b9a]/10 transition-all"
                    >
                      🔥 {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}