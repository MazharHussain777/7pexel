// app/technology/components/TechnologyCategoryPage.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { technologyGuidesData } from "@/app/technology/data/technology-guides";

interface TechnologyCategoryPageProps {
  category: string;
  icon: string;
  gradient: string;
  title: string;
  description: string;
  badgeText: string;
  badgeColor: string;
}

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getDifficultyColor(level: string): string {
  const colors: Record<string, string> = {
    Beginner: "bg-green-500/10 text-green-600 border-green-200",
    Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    Advanced: "bg-red-500/10 text-red-600 border-red-200",
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

export function TechnologyCategoryPage({ 
  category, 
  icon, 
  gradient, 
  title, 
  description,
  badgeText,
  badgeColor 
}: TechnologyCategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get guides for this category
  const guides = useMemo(() => {
    let list = Object.values(technologyGuidesData)
      .filter(g => g.category === category)
      .sort((a, b) => (a.isFeatured ? -1 : 1));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [category, searchQuery]);

  // Category navigation
  const categoryNav = [
    { id: "ai", label: "AI", icon: "🤖" },
    { id: "generative-ai", label: "Gen AI", icon: "✨" },
    { id: "quantum-computing", label: "Quantum", icon: "⚛️" },
    { id: "ar-vr", label: "AR/VR", icon: "🥽" },
    { id: "green-tech", label: "Green Tech", icon: "🌱" },
    { id: "cybersecurity", label: "Security", icon: "🔒" },
    { id: "space-tech", label: "Space", icon: "🚀" },
    { id: "biotech", label: "Biotech", icon: "🧬" },
    { id: "autonomous-vehicles", label: "Auto Vehicles", icon: "🚗" },
    { id: "edge-computing", label: "Edge Computing", icon: "💻" },
    { id: "neurotechnology", label: "Neurotech", icon: "🧠" },
    { id: "smart-home", label: "Smart Home", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/technology" className="hover:text-[var(--color-green)] transition-colors">
            Technology
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">{title}</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className={`relative rounded-[20px] overflow-hidden mb-8 bg-gradient-to-br ${gradient} text-white`}>
          <div className="relative z-10 p-8 md:p-11">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{icon}</span>
                <span className={`text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full font-semibold ${badgeColor}`}>
                  {badgeText}
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.2rem,4.5vw,3.5rem)] tracking-[-0.03em] leading-[1.1]">
                {title} <em className="italic not-italic text-[#D4F26B]">Guides</em>
              </h1>
              <p className="mt-3 text-white/80 text-[1rem] leading-[1.6] max-w-[560px]">
                {description}
              </p>

              {/* Search */}
              <div className="mt-6 max-w-[500px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()} guides...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[0.92rem] transition-all focus:outline-none focus:border-[#D4F26B] focus:bg-white/16 placeholder:text-white/55"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6 flex-wrap mt-6">
                <div>
                  <div className="font-fraunces font-semibold text-2xl text-white">{guides.length}</div>
                  <div className="text-[0.6rem] uppercase tracking-[0.08em] text-white/70">Guides</div>
                </div>
                <div className="border-l border-white/20 pl-6">
                  <div className="font-fraunces font-semibold text-2xl text-white">
                    {guides.filter(g => g.isFeatured).length}
                  </div>
                  <div className="text-[0.6rem] uppercase tracking-[0.08em] text-white/70">Featured</div>
                </div>
                <div className="border-l border-white/20 pl-6">
                  <div className="font-fraunces font-semibold text-2xl text-white">
                    {guides.reduce((sum, g) => sum + g.steps, 0)}
                  </div>
                  <div className="text-[0.6rem] uppercase tracking-[0.08em] text-white/70">Total Steps</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── QUICK NAV ────────────────────────────────── */}
        <section className="mb-6">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/technology"
              className="px-4 py-2 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.78rem] font-semibold text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-all"
            >
              📊 All Technology
            </Link>
            {categoryNav.map((cat) => (
              <Link
                key={cat.id}
                href={`/technology/${cat.id}`}
                className={`px-4 py-2 rounded-full border-[1.5px] text-[0.78rem] font-semibold transition-all ${
                  cat.id === category
                    ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
                    : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                }`}
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── GUIDES LIST ────────────────────────────────── */}
        <section>
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              All <em className="italic not-italic text-[var(--color-green)]">{title}</em> Guides
            </h2>
            <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{guides.length} guides</span>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-0.5 p-0.5 border-[1.5px] border-[var(--color-line)] rounded-full bg-[var(--color-paper)] flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.75rem] font-semibold transition-all duration-200 ${
                  viewMode === "grid" ? "bg-[var(--color-green)] text-white" : "text-[var(--color-ink-soft)]"
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.75rem] font-semibold transition-all duration-200 ${
                  viewMode === "list" ? "bg-[var(--color-green)] text-white" : "text-[var(--color-ink-soft)]"
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

          {/* ─── GRID VIEW ────────────────────────────────── */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/technology/${guide.slug}`}
                  className={`group border rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] ${
                    guide.isFeatured
                      ? "border-[var(--color-green)] shadow-[0_4px_12px_rgba(15,107,62,0.12)]"
                      : "border-[var(--color-line)] hover:border-[rgba(15,107,62,0.25)]"
                  }`}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
                        {getCategoryName(guide.category)}
                      </span>
                      {guide.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
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
                      <span className="absolute top-2.5 left-2.5 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em]">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 pb-4">
                    <h3 className="font-fraunces font-medium text-[0.9rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-[0.7rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">{guide.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-[var(--color-line)]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.5rem] flex-shrink-0">
                        {guide.authorAvatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.6rem] font-semibold truncate">{guide.author}</div>
                        <div className="text-[0.55rem] text-[var(--color-ink-soft)]">{formatDate(guide.date)}</div>
                      </div>
                      <div className="text-[0.55rem] text-[var(--color-ink-soft)] flex items-center gap-1">
                        <span>📋 {guide.steps}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ─── LIST VIEW ────────────────────────────────── */}
          {viewMode === "list" && (
            <div className="flex flex-col gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/technology/${guide.slug}`}
                  className="flex gap-4 p-3.5 border border-[var(--color-line)] rounded-[14px] bg-[var(--color-paper)] transition-all duration-300 hover:border-[var(--color-green)] hover:shadow-[0_8px_20px_rgba(15,24,15,0.08)] group"
                >
                  <div className="w-[140px] h-[90px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      width={140}
                      height={90}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
                        {getCategoryName(guide.category)}
                      </span>
                      {guide.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
                          🔥 Trending
                        </span>
                      )}
                      <span className={`text-[0.45rem] px-2 py-0.25 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                        {guide.level}
                      </span>
                      {guide.isFeatured && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em] font-jetbrains-mono">
                          ⭐ Featured
                        </span>
                      )}
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)] font-jetbrains-mono">⏱️ {guide.readTime}</span>
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)] font-jetbrains-mono">📋 {guide.steps}</span>
                    </div>
                    <h3 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-[0.7rem] text-[var(--color-ink-soft)] mt-1 line-clamp-1">{guide.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-dashed border-[var(--color-line)]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.5rem] flex-shrink-0">
                        {guide.authorAvatar}
                      </div>
                      <span className="text-[0.6rem] font-medium">{guide.author}</span>
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">·</span>
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">{formatDate(guide.date)}</span>
                      <div className="ml-auto text-[0.55rem] text-[var(--color-ink-soft)] flex items-center gap-1">
                        <span>📋 {guide.steps} steps</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ─── EMPTY STATE ────────────────────────────────── */}
          {guides.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3.5 py-16 px-5 text-[var(--color-ink-soft)]">
              <span className="text-4xl">🔍</span>
              <h3 className="text-xl font-medium text-[var(--color-ink)]">No guides found</h3>
              <p className="text-[0.95rem] max-w-md">Try adjusting your search term.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.25 rounded-full border-[1.5px] border-[var(--color-ink)] text-[0.8rem] font-semibold text-[var(--color-ink)] transition-all hover:bg-[var(--color-ink)] hover:text-white"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* ─── BACK TO TECHNOLOGY ────────────────────────── */}
        <div className="py-6">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline"
          >
            ← Back to Technology
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}