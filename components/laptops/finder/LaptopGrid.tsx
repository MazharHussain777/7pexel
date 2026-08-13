// components/laptops/finder/LaptopGrid.tsx
"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Laptop {
  _id: string;
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  processor: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  isFeatured: boolean;
  isTrending: boolean;
}

interface LaptopGridProps {
  searchTerm: string;
  filters: Record<string, any>;
  laptops: Laptop[];
  loading: boolean;
}

const brandColors: Record<string, string> = {
  Apple: "#555555",
  Dell: "#0066CC",
  ASUS: "#003366",
  Lenovo: "#E2231A",
  HP: "#0096D6",
  Microsoft: "#00A4EF",
  Acer: "#83B81A",
  Razer: "#44D62C",
  MSI: "#00A3E0",
};

export function LaptopGrid({ searchTerm, filters, laptops, loading }: LaptopGridProps) {
  const filteredLaptops = useMemo(() => {
    let list = laptops;

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(l =>
        l.brand.toLowerCase().includes(q) ||
        l.model.toLowerCase().includes(q) ||
        l.processor.toLowerCase().includes(q) ||
        l.category.some(c => c.toLowerCase().includes(q))
      );
    }

    // Brand filter
    if (filters.brands) {
      const brands = filters.brands.split(',');
      list = list.filter(l => brands.includes(l.brand));
    }

    // Category filter
    if (filters.categories) {
      const categories = filters.categories.split(',');
      list = list.filter(l => l.category.some(c => categories.includes(c)));
    }

    return list;
  }, [laptops, searchTerm, filters]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredLaptops.length === 0) {
    return (
      <div className="text-center py-12 mt-5">
        <span className="text-4xl">🔍</span>
        <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No laptops found</h3>
        <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
      {filteredLaptops.map((laptop) => {
        const brandColor = brandColors[laptop.brand] || "#555555";
        
        return (
          <Link
            key={laptop._id || laptop.id}
            href={`/laptops/finder/${laptop.slug}`}
            className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f5f7f6]">
              <Image
                src={laptop.image}
                alt={`${laptop.brand} ${laptop.model}`}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.35)]" />
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
                {laptop.category.slice(0, 2).map((cat) => (
                  <span
                    key={cat}
                    className="text-[0.45rem] px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-ink)] font-bold uppercase tracking-[0.05em]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              {laptop.isFeatured && (
                <span className="absolute top-3 right-3 z-10 text-[0.4rem] px-2 py-0.5 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase">
                  Featured
                </span>
              )}
              <div className="absolute bottom-3 left-3 z-10 text-[0.55rem] text-white font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {laptop.brand}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.2] group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                  {laptop.model}
                </h4>
                <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)]">{laptop.year}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[0.65rem] text-[var(--color-ink-soft)]">
                <span>{laptop.processor}</span>
                <span className="w-px h-3 bg-[var(--color-line)]" />
                <span>{laptop.ram}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[0.65rem] text-[var(--color-ink-soft)]">
                <span>💾 {laptop.storage}</span>
                <span className="w-px h-3 bg-[var(--color-line)]" />
                <span>🎮 {laptop.graphics}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-2 border-t border-[var(--color-line)]">
                <span className="text-[var(--color-green)] font-semibold text-[0.7rem] group-hover:translate-x-1 transition-transform">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}