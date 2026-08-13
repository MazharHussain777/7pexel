// components/laptops/finder/FinderSearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FinderSearchBarProps {
  placeholder?: string;
  initialValue?: string;
}

export function FinderSearchBar({ 
  placeholder = "Search laptops by brand, model, or processor...",
  initialValue = ""
}: FinderSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      const mockSuggestions = [
        `${query} - Apple MacBook Pro`,
        `${query} - Dell XPS`,
        `${query} - ASUS ROG`,
        `${query} - Lenovo ThinkPad`,
        `${query} - HP Spectre`,
      ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(mockSuggestions.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/laptops/finder?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/laptops/finder?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Icon */}
        <svg
          className={`absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${
            isFocused ? "text-[var(--color-green)]" : "text-[var(--color-ink-soft)] opacity-60"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className={`
            w-full py-3.5 pl-12 pr-28 rounded-[14px] 
            border-[1.5px] transition-all
            font-poppins text-[0.92rem] text-[var(--color-ink)]
            bg-[var(--color-paper)]
            ${isFocused 
              ? "border-[var(--color-green-bright)] shadow-[0_0_0_4px_rgba(31,162,90,0.12)]" 
              : "border-[var(--color-line)]"
            }
            placeholder:text-[var(--color-ink-soft)] placeholder:opacity-60
          `}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-black/5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.8rem] transition-all hover:bg-[var(--color-green-deep)] hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-1.5 bg-white rounded-[14px] border border-[var(--color-line)] shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4.5 py-2.5 text-left text-[0.85rem] text-[var(--color-ink)] hover:bg-[var(--color-paper)] transition-colors flex items-center gap-2.5"
            >
              <svg className="w-3.5 h-3.5 text-[var(--color-ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search Tips */}
      {query.length === 0 && !isFocused && (
        <div className="flex items-center gap-3 mt-2.5 text-[0.65rem] text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-[var(--color-paper)] border border-[var(--color-line)] text-[0.55rem] font-jetbrains-mono">⌘K</span>
            <span>or</span>
            <span className="px-1.5 py-0.5 rounded bg-[var(--color-paper)] border border-[var(--color-line)] text-[0.55rem] font-jetbrains-mono">/</span>
            <span>to search</span>
          </span>
          <span className="w-px h-3 bg-[var(--color-line)]" />
          <span>Try: <span className="font-medium text-[var(--color-ink)]">MacBook Pro</span>, <span className="font-medium text-[var(--color-ink)]">Dell XPS</span>, <span className="font-medium text-[var(--color-ink)]">Gaming</span></span>
        </div>
      )}
    </div>
  );
}