// components/laptops/finder/LaptopHero.tsx
"use client";

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
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  canonical?: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

interface LaptopHeroProps {
  laptop: Laptop;
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

export function LaptopHero({ laptop }: LaptopHeroProps) {
  const brandColor = brandColors[laptop.brand] || "#555555";

  return (
    <div className="relative rounded-[20px] overflow-hidden bg-white border border-[var(--color-line)] shadow-sm">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef1e9]">
        <Image
          src={laptop.image}
          alt={`${laptop.brand} ${laptop.model}`}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.5)]" />
        
        {/* Category Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 flex-wrap">
          {laptop.category && laptop.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-[0.6rem] px-3 py-1 rounded-full bg-white/92 backdrop-blur-sm text-[var(--color-ink)] font-bold uppercase tracking-[0.05em] font-jetbrains-mono"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Price Banner */}
        <div className="absolute bottom-4 right-4 z-10 px-5 py-3 rounded-[12px] bg-white/92 backdrop-blur-sm border border-white/30 shadow-lg">
          <span className="font-fraunces font-bold text-[1.6rem] text-[var(--color-green-deep)]">
            {laptop.price}
          </span>
          <span className="text-[0.7rem] text-[var(--color-ink-soft)] ml-1">MSRP</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-6 items-start">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 rounded-[16px] flex items-center justify-center text-white font-fraunces font-bold text-2xl"
              style={{ background: `linear-gradient(150deg, ${brandColor}, ${brandColor}dd)` }}
            >
              {laptop.brand.charAt(0)}
            </div>
          </div>

          {/* Laptop Info */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="font-fraunces font-medium text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.02em]">
                {laptop.brand} {laptop.model}
              </h1>
              <span className="text-[0.7rem] px-3 py-1 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] font-semibold">
                {laptop.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-[0.85rem] text-[var(--color-ink-soft)] mb-3">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">💻</span>
                {laptop.processor}
              </span>
              <span className="w-px h-4 bg-[var(--color-line)]" />
              <span className="flex items-center gap-1.5">
                <span className="text-lg">📊</span>
                {laptop.ram} RAM
              </span>
              <span className="w-px h-4 bg-[var(--color-line)]" />
              <span className="flex items-center gap-1.5">
                <span className="text-lg">💾</span>
                {laptop.storage}
              </span>
              <span className="w-px h-4 bg-[var(--color-line)]" />
              <span className="flex items-center gap-1.5">
                <span className="text-lg">🎮</span>
                {laptop.graphics}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-[0.85rem] text-[var(--color-ink-soft)]">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">🖥️</span>
                {laptop.display}
              </span>
              <span className="w-px h-4 bg-[var(--color-line)]" />
              <span className="flex items-center gap-1.5">
                <span className="text-lg">⚡</span>
                {laptop.battery}
              </span>
              <span className="w-px h-4 bg-[var(--color-line)]" />
              <span className="flex items-center gap-1.5">
                <span className="text-lg">⚖️</span>
                {laptop.weight}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex-shrink-0 flex items-center gap-3 bg-[var(--color-paper)] px-4 py-3 rounded-[12px] border border-[var(--color-line)]">
            <div className="text-center">
              <div className="font-fraunces font-semibold text-[1.8rem] text-[var(--color-green-deep)]">
                {laptop.rating}
              </div>
              <div className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
                {Array.from({ length: Math.floor(laptop.rating) }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaptopHero;