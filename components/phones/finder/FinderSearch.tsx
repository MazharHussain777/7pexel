// components/phones/finder/FinderSearch.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function FinderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
    } else {
      setSearchTerm("");
    }
  }, [searchParams]);

  const performSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (term.trim()) {
      params.set('q', term.trim());
    } else {
      params.delete('q');
    }
    
    router.push(`/phones/finder?${params.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    performSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.push(`/phones/finder?${params.toString()}`, { scroll: false });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    if (newValue === '') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.push(`/phones/finder?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="bg-[#F8F8F8] rounded-[120px] p-1.5 pl-6 flex items-center gap-3 border-[1.5px] border-[#E8E8E8] transition-all duration-300 focus-within:border-[#FF6B00] focus-within:shadow-[0_6px_24px_rgba(255,107,0,0.10)] focus-within:bg-white my-4 mb-7">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by name, brand, chipset, or tag..."
        className="flex-1 border-none bg-transparent py-3.5 font-poppins text-[1rem] outline-none text-[#4A3520] placeholder:text-[#8B7355]"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="text-[#8B7355] hover:text-[#FF6B00] transition-colors p-1 text-sm font-medium"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button
        onClick={handleSearch}
        className="bg-[#FF6B00] border-none px-8.5 py-3 rounded-[60px] text-white font-semibold text-[0.9rem] transition-all duration-300 cursor-pointer tracking-[0.3px] flex items-center gap-2 hover:bg-[#E55D00] hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(255,107,0,0.3)]"
      >
        🔎 Search
      </button>
    </div>
  );
}