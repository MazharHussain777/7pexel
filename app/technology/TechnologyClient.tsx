// app/technology/TechnologyClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { technologyGuidesData, techCategories, type TechnologyGuide } from "./data/technology-guides";

// ─── HELPERS ─────────────────────────────────────────────
function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getDifficultyColor(level: string): string {
  const colors: Record<string, string> = {
    Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    Intermediate: "bg-amber-500/10 text-amber-600 border-amber-200",
    Advanced: "bg-rose-500/10 text-rose-600 border-rose-200",
  };
  return colors[level] || "bg-gray-500/10 text-gray-600 border-gray-200";
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    ai: "Artificial Intelligence",
    "generative-ai": "Generative AI",
    "quantum-computing": "Quantum Computing",
    "ar-vr": "AR/VR & Metaverse",
    "green-tech": "Green Tech & Sustainability",
    cybersecurity: "Cybersecurity",
    "space-tech": "Space Tech",
    biotech: "Biotech & Health Tech",
    "autonomous-vehicles": "Autonomous Vehicles",
    "edge-computing": "Edge Computing & IoT",
    neurotechnology: "Neurotechnology",
    smartphones: "Smartphones",
    laptops: "Laptops & Computers",
    "smart-home": "Smart Home",
    wearables: "Wearables",
    audio: "Audio",
    gaming: "Gaming",
    cameras: "Cameras",
    accessories: "Accessories",
    tablets: "Tablets",
    displays: "Monitors & Displays",
    technology: "Technology",
  };
  return names[category] || category;
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    ai: "🤖",
    "generative-ai": "✨",
    "quantum-computing": "⚛️",
    "ar-vr": "🥽",
    "green-tech": "🌱",
    cybersecurity: "🔒",
    "space-tech": "🚀",
    biotech: "🧬",
    "autonomous-vehicles": "🚗",
    "edge-computing": "💻",
    neurotechnology: "🧠",
    smartphones: "📱",
    laptops: "💻",
    "smart-home": "🏠",
    wearables: "⌚",
    audio: "🎧",
    gaming: "🎮",
    cameras: "📸",
    accessories: "🔌",
    tablets: "📋",
    displays: "🖥️",
    technology: "💡",
  };
  return icons[category] || "📖";
}

// ─── MAIN COMPONENT ─────────────────────────────────────
export function TechnologyClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"trending" | "all">("trending");

  // ─── GET GUIDES FROM DATA ─────────────────────────────
  const allGuides = useMemo(() => {
    return Object.values(technologyGuidesData);
  }, []);

  // ─── GET TRENDING GUIDES ──────────────────────────────
  const trendingGuides = useMemo(() => {
    return allGuides.filter(g => g.isTrending);
  }, [allGuides]);

  // ─── GET FEATURED GUIDES ──────────────────────────────
  const featuredGuides = useMemo(() => {
    return allGuides.filter(g => g.isFeatured);
  }, [allGuides]);

  // ─── FILTERED GUIDES ──────────────────────────────────
  const filteredGuides = useMemo(() => {
    let list = activeTab === "trending" ? trendingGuides : allGuides;

    if (selectedCategory !== "all") {
      list = list.filter(g => g.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, selectedCategory, searchQuery, allGuides, trendingGuides]);

  // ─── GET COUNT FOR CATEGORY ───────────────────────────
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return allGuides.length;
    return allGuides.filter(g => g.category === categoryId).length;
  };

  // ─── GET TRENDING COUNT ───────────────────────────────
  const getTrendingCount = () => {
    return trendingGuides.length;
  };

  return (
    <div className="min-h-screen bg-[#eef4f2]">
      <Header />

      <main className="wrap py-6">
{/* ─── BREADCRUMB ──────────────────────────────── */}
<nav className="flex items-center gap-2 text-[0.8rem] mb-6 flex-wrap mt-5" aria-label="Breadcrumb">
  <Link 
    href="/" 
    className="text-[#5a7a6a] hover:text-[#011d24] transition-colors duration-200"
  >
    Home
  </Link>
  <span className="text-[#c5d8d2] select-none" aria-hidden="true">/</span>
  <span className="text-[#011d24] font-semibold" aria-current="page">
    Technology
  </span>
</nav>

        {/* ─── HERO SECTION ────────────────────────────── */}
        <section className="relative rounded-[24px] overflow-hidden mb-10 text-white">
          {/* ✅ #011d24 Gradient with flowing shimmer */}

 <div className="absolute inset-0 bg-gradient-to-br from-[#011e21] via-[#011e21] via-[#033742] via-[#044a5a] via-[#011e21] via-[#011e21] to-[#011e21]" />
          
          {/* Flowing shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#3a8b9a]/15 to-transparent animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#3a8b9a]/8 to-transparent animate-shimmer-reverse" />
          
          {/* Glow effects */}
          <div className="absolute -top-[40%] -right-[20%] w-[60%] h-[80%] rounded-full bg-[#3a8b9a]/8 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-[#033742]/15 blur-[100px] pointer-events-none" />
          <div className="absolute top-[10%] left-[30%] w-[40%] h-[50%] rounded-full bg-[#3a8b9a]/5 blur-[80px] pointer-events-none" />
          
          {/* Shining overlay lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,139,154,0.06)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(58,139,154,0.04)_0%,_transparent_50%)]" />
          
          {/* Flow lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/30 to-transparent" />
            <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/20 to-transparent" />
            <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/30 to-transparent" />
          </div>
          
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">💡</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold backdrop-blur-sm border border-white/10">
                  Technology Hub
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#3a8b9a] text-white px-4 py-1.5 rounded-full font-semibold shadow-[0_0_30px_rgba(58,139,154,0.35)]">
                  🔥 {getTrendingCount()} Trending
                </span>
              </div>
              
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Explore the Future of <em className="italic not-italic text-[#3a8b9a]">Technology</em>
              </h1>
              
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Your ultimate destination for tech news, in-depth reviews, smart buying guides, and expert insights. Stay ahead of the curve with 7pexel.
              </p>

              {/* Search */}
              <div className="mt-7 max-w-[540px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search technology guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 pl-13 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[1rem] transition-all focus:outline-none focus:border-[#3a8b9a] focus:bg-white/16 placeholder:text-white/55"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-8 flex-wrap mt-8">
                <div>
                  <div className="font-fraunces font-semibold text-3xl text-white">{allGuides.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Total Guides</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{techCategories.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Categories</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{allGuides.reduce((sum, g) => sum + g.steps, 0)}+</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Steps to Master</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(58,139,154,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(58,139,154,0.04)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="350" r="150" stroke="rgba(58,139,154,0.05)" strokeWidth="1" fill="none" />
            <path d="M50 200 L200 100 L350 180 L500 80 L650 160 L750 100" stroke="rgba(58,139,154,0.04)" strokeWidth="2" fill="none" />
          </svg>
        </section>
{/* ─── CATEGORIES GRID ──────────────────────────── */}
<section className="mb-10">
  {/* Header */}
  <div className="flex justify-between items-center mb-5">
    <h2 className="font-fraunces text-[1.35rem] md:text-[1.5rem] font-semibold tracking-[-0.02em] text-[#011d24]">
      Browse by <span className="text-[#033742] underline decoration-[#3a8b9a]/30 underline-offset-4">Category</span>
    </h2>
    
    <Link
      href="/technology/categories"
      className="group flex items-center gap-1.5 text-[0.8rem] md:text-[0.85rem] font-semibold text-[#011d24]/60 hover:text-[#011d24] transition-all duration-300"
    >
      <span>View All</span>
      <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">→</span>
    </Link>
  </div>
  
  {/* Grid */}
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 md:gap-3">
    {techCategories.map((cat) => (
      <Link
        key={cat.id}
        href={`/technology/category/${cat.slug}`}
        className="group relative rounded-[12px] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(1,29,36,0.15)] active:scale-[0.96]"
        style={{ background: `linear-gradient(145deg, #011d24, ${cat.color})` }}
      >
        {/* Background layers */}
        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
        <div className="absolute w-[80px] h-[80px] rounded-full blur-[25px] opacity-20 bg-[#3a8b9a] -top-[15px] -right-[12px] transition-all duration-500 group-hover:scale-150 group-hover:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-[12px] border border-white/0 group-hover:border-white/20 transition-all duration-300" />
        
        {/* Content */}
        <div className="relative z-10 px-3.5 py-3.5 min-h-[52px] flex items-center">
          <span className="font-fraunces font-medium text-[0.8rem] md:text-[0.9rem] leading-tight tracking-[-0.01em] text-white truncate w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            {cat.name}
          </span>
        </div>
        
        {/* Category count (optional - if you have this data) */}
        {cat.count && (
          <div className="absolute top-2 right-2 z-10">
            <span className="text-[0.5rem] font-medium text-white/60 bg-white/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
              {cat.count}
            </span>
          </div>
        )}
        
        {/* Hover indicator bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    ))}
  </div>
</section>

        {/* ─── FEATURED GUIDES ────────────────────────────── */}
        {featuredGuides.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⭐</span>
              <h2 className="font-fraunces font-medium text-[1.8rem] tracking-[-0.02em] text-[#011d24]">
                Featured <em className="italic not-italic text-[#033742]">Guides</em>
              </h2>
              <span className="text-[0.7rem] font-jetbrains-mono bg-[#3a8b9a] text-white px-3 py-1 rounded-full font-bold">
                Editor's Picks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.slice(0, 3).map((guide) => (
                <Link
                  key={guide.id}
                  href={`/technology/${guide.slug}`}
                  className="group border border-[#c5d8d2] rounded-[16px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(1,29,36,0.12)] hover:border-[#033742]"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#e8f0ec]">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                      <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[#011d24] text-white font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
                        {getCategoryName(guide.category)}
                      </span>
                      <span className={`text-[0.55rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.05em] font-jetbrains-mono border ${getDifficultyColor(guide.level)}`}>
                        {guide.level}
                      </span>
                      {guide.isTrending && (
                        <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 font-bold uppercase tracking-[0.05em] font-jetbrains-mono border border-rose-500/20">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
                      <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                        ⏱️ {guide.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pb-4.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[0.6rem] font-semibold text-[#4a6a5a]">{getCategoryIcon(guide.category)}</span>
                      <span className="text-[0.55rem] font-medium text-[#4a6a5a]">{getCategoryName(guide.category)}</span>
                    </div>
                    <h3 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                      {guide.title}
                    </h3>
                    <p className="text-[0.75rem] text-[#4a6a5a] mt-1.5 line-clamp-2">{guide.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[#c5d8d2]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#011d24] to-[#033742] flex items-center justify-center text-white font-semibold text-[0.55rem] flex-shrink-0">
                        {guide.authorAvatar}
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-semibold text-[#011d24]">{guide.author}</div>
                        <div className="text-[0.6rem] text-[#4a6a5a]">{formatDate(guide.date)}</div>
                      </div>
                      <div className="ml-auto text-[0.6rem] text-[#4a6a5a] flex items-center gap-1">
                        <span>📋 {guide.steps} steps</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── CONTENT TABS ────────────────────────────── */}
        <section className="mb-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2.5 rounded-full font-semibold text-[0.9rem] transition-all ${
                activeTab === "trending"
                  ? "bg-[#011d24] text-white shadow-[0_4px_16px_rgba(1,29,36,0.25)]"
                  : "bg-white text-[#4a6a5a] border border-[#c5d8d2] hover:border-[#033742] hover:text-[#011d24]"
              }`}
            >
              🔥 Trending ({filteredGuides.length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-full font-semibold text-[0.9rem] transition-all ${
                activeTab === "all"
                  ? "bg-[#011d24] text-white shadow-[0_4px_16px_rgba(1,29,36,0.25)]"
                  : "bg-white text-[#4a6a5a] border border-[#c5d8d2] hover:border-[#033742] hover:text-[#011d24]"
              }`}
            >
              📚 All Guides ({allGuides.length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full border text-[0.75rem] font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#011d24] border-[#011d24] text-white"
                  : "border-[#c5d8d2] text-[#4a6a5a] bg-white hover:border-[#033742] hover:text-[#011d24]"
              }`}
            >
              All Categories
            </button>
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveTab("all");
                }}
                className={`px-4 py-1.5 rounded-full border text-[0.75rem] font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#011d24] border-[#011d24] text-white"
                    : "border-[#c5d8d2] text-[#4a6a5a] bg-white hover:border-[#033742] hover:text-[#011d24]"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-0.5 p-0.5 border-[1.5px] border-[#c5d8d2] rounded-full bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.75rem] font-semibold transition-all ${
                  viewMode === "grid" ? "bg-[#011d24] text-white" : "text-[#4a6a5a]"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.75rem] font-semibold transition-all ${
                  viewMode === "list" ? "bg-[#011d24] text-white" : "text-[#4a6a5a]"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
                List
              </button>
            </div>
          </div>

          {/* ─── GUIDES GRID ────────────────────────────── */}
          {filteredGuides.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
              : "flex flex-col gap-4"
            }>
              {filteredGuides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/technology/${guide.slug}`}
                  className={viewMode === "grid"
                    ? "group border border-[#c5d8d2] rounded-[16px] overflow-hidden bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(1,29,36,0.12)] hover:border-[#033742]"
                    : "flex gap-4 p-4 border border-[#c5d8d2] rounded-[16px] bg-white transition-all hover:border-[#033742] hover:shadow-[0_12px_24px_rgba(1,29,36,0.08)] group"
                  }
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#e8f0ec]">
                        <Image
                          src={guide.image}
                          alt={guide.imageAlt || guide.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                          <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[#011d24] text-white font-bold uppercase tracking-[0.05em]">
                            {getCategoryName(guide.category)}
                          </span>
                          {guide.isTrending && (
                            <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold uppercase tracking-[0.05em]">
                              🔥 Trending
                            </span>
                          )}
                          <span className={`text-[0.45rem] px-2 py-0.25 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                            {guide.level}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
                          <span className="text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                            ⏱️ {guide.readTime}
                          </span>
                          <span className="text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                            📋 {guide.steps}
                          </span>
                        </div>
                        {guide.isFeatured && (
                          <span className="absolute top-2.5 left-2.5 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-[#3a8b9a] text-white font-bold uppercase tracking-[0.05em]">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                          {guide.title}
                        </h4>
                        <p className="text-[0.75rem] text-[#4a6a5a] mt-1.5 line-clamp-2">{guide.excerpt}</p>
                        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[#c5d8d2]">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#011d24] to-[#033742] flex items-center justify-center text-white font-semibold text-[0.5rem] flex-shrink-0">
                            {guide.authorAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[0.6rem] font-semibold text-[#011d24] truncate">{guide.author}</div>
                            <div className="text-[0.55rem] text-[#4a6a5a]">{formatDate(guide.date)}</div>
                          </div>
                          <div className="text-[0.55rem] text-[#4a6a5a] flex items-center gap-1">
                            {guide.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="bg-[#eef4f2] px-1.5 py-0.5 rounded border border-[#c5d8d2] text-[0.5rem]">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[180px] h-[120px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#e8f0ec]">
                        <Image
                          src={guide.image}
                          alt={guide.imageAlt || guide.title}
                          width={180}
                          height={120}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[#011d24] text-white font-bold uppercase tracking-[0.05em]">
                            {getCategoryName(guide.category)}
                          </span>
                          {guide.isTrending && (
                            <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold uppercase tracking-[0.05em]">
                              🔥 Trending
                            </span>
                          )}
                          <span className={`text-[0.45rem] px-2 py-0.25 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                            {guide.level}
                          </span>
                          {guide.isFeatured && (
                            <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[#3a8b9a] text-white font-bold uppercase tracking-[0.05em]">
                              ⭐ Featured
                            </span>
                          )}
                          <span className="text-[0.55rem] text-[#4a6a5a]">{guide.readTime}</span>
                          <span className="text-[0.55rem] text-[#4a6a5a]">📋 {guide.steps}</span>
                        </div>
                        <h4 className="font-fraunces font-medium text-[1.05rem] leading-[1.3] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                          {guide.title}
                        </h4>
                        <p className="text-[0.8rem] text-[#4a6a5a] mt-1 line-clamp-2">{guide.excerpt}</p>
                        <div className="flex items-center gap-3 mt-2 text-[0.65rem] text-[#4a6a5a] flex-wrap">
                          <span className="text-[#011d24] font-medium">{guide.author}</span>
                          <span>·</span>
                          <span>{formatDate(guide.date)}</span>
                          <span>·</span>
                          <div className="flex gap-1">
                            {guide.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="bg-[#eef4f2] px-1.5 py-0.5 rounded border border-[#c5d8d2] text-[0.55rem]">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[20px] border border-[#c5d8d2]">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-3 text-xl font-medium text-[#011d24]">No guides found</h3>
              <p className="text-[0.95rem] text-[#4a6a5a] mt-1">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#011d24] text-white font-semibold text-[0.85rem] transition-all hover:bg-[#033742] hover:shadow-[0_4px_16px_rgba(1,29,36,0.3)]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* ─── NEWSLETTER ────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#011d24] to-[#033742] rounded-[20px] p-10 md:p-12 my-6 text-white relative overflow-hidden">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#3a8b9a]/8 -top-[80px] -right-[60px] pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#3a8b9a]/5 -bottom-[60px] -left-[40px] pointer-events-none" />
          
          {/* Shining overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,139,154,0.06)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#3a8b9a]/5 to-transparent animate-shimmer" />
          
          <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
            <div className="flex-1 min-w-[200px]">
              <span className="inline-block font-jetbrains-mono text-[0.6rem] tracking-[0.08em] uppercase bg-white/15 px-3 py-0.75 rounded-full font-semibold mb-2.5 border border-white/10">
                📬 Stay ahead
              </span>
              <h3 className="font-fraunces font-medium text-[1.6rem] leading-[1.3] mb-1">Subscribe to the 7pexel weekly</h3>
              <p className="text-[0.9rem] opacity-80 leading-[1.6] max-w-[440px]">
                Get the week's top tech stories, hands-on reviews and industry insights — delivered fresh every Monday.
              </p>
            </div>
            <form
              className="flex gap-2.5 flex-wrap relative z-10 flex-shrink-0"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
                const success = e.currentTarget.querySelector(".success-message") as HTMLDivElement;
                if (input && input.value.trim() && input.value.includes("@")) {
                  btn.style.display = "none";
                  input.style.display = "none";
                  success.classList.add("show");
                } else {
                  alert("Please enter a valid email address");
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3.5 rounded-full border-none font-poppins text-[0.9rem] bg-white/92 text-[#011d24] outline-none min-w-[240px] transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(58,139,154,0.3)]"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#3a8b9a] text-white font-bold text-[0.9rem] transition-all duration-200 whitespace-nowrap flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(58,139,154,0.4)]"
              >
                Subscribe
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <div className="success-message hidden font-semibold text-[1rem] items-center gap-2.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You're subscribed! 🎉
              </div>
            </form>
          </div>
        </section>

        {/* ─── BACK TO TOP ────────────────────────────────── */}
        <div className="py-4 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#4a6a5a] hover:text-[#011d24] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}