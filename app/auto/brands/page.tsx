// app/auto/brands/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// ✅ Fix: Import from vehicles.ts
import { BRANDS, getAllCountries } from "@/app/auto/data/vehicles";
import { Toolbar } from "@/components/Toolbar";
import { BrandGrid } from "@/components/BrandGrid";

export default function BrandsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState("all");
  const [sortMode, setSortMode] = useState("alpha");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allCountries = useMemo(() => getAllCountries(), []);

  const filteredBrands = useMemo(() => {
    let list = BRANDS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q) ||
          b.categories.some((c) => c.toLowerCase().includes(q)) ||
          b.popularModels.some((m) => m.toLowerCase().includes(q))
      );
    }

    if (activeCountry !== "all") {
      list = list.filter((b) => b.country === activeCountry);
    }

    if (sortMode === "alpha") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "models") {
      list = [...list].sort((a, b) => b.models - a.models);
    } else if (sortMode === "founded") {
      list = [...list].sort((a, b) => a.founded - b.founded);
    }

    return list;
  }, [searchQuery, activeCountry, sortMode]);

  const handleReset = () => {
    setSearchQuery("");
    setActiveCountry("all");
    setSortMode("alpha");
  };

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main className="wrap py-6">
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/auto" className="hover:text-[var(--color-green)] transition-colors">Auto</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Brands</span>
        </div>

        <section className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[#0A3F26] to-[#1FA25A] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🏭</span>
            </div>
            <div>
              <h1 className="font-fraunces font-medium text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em]">
                <em className="italic not-italic text-[var(--color-green)]">Brands</em>
              </h1>
              <p className="text-[0.8rem] text-[var(--color-ink-soft)] mt-0.5">
                {BRANDS.length} manufacturers tracked by 7pexel
              </p>
            </div>
          </div>
        </section>

        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCountry={activeCountry}
          onCountryChange={setActiveCountry}
          sortMode={sortMode}
          onSortChange={setSortMode}
          countries={allCountries}
          totalBrands={filteredBrands.length}
        />

        <BrandGrid
          brands={filteredBrands}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onReset={handleReset}
        />
      </main>
      <Footer />
    </div>
  );
}