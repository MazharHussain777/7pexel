// app/guides/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Guide {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  level: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  steps: number;
  difficulty: string;
  contentHtml: string;
  customStyles: string;
  canonical?: string;
  published: boolean;
}

interface Category {
  _id: string;
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  count: number;
  newCount: number;
  href: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// ─── HELPERS ─────────────────────────────────────────────
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

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function GuidesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch data from MongoDB
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, guidesRes, tagsRes] = await Promise.all([
          fetch('/api/guides/categories'),
          fetch('/api/guides'),
          fetch('/api/guides?action=tags')
        ]);
        
        const categoriesData = await categoriesRes.json();
        const guidesData = await guidesRes.json();
        const tagsData = await tagsRes.json();
        
        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }
        if (guidesData.success) {
          setGuides(guidesData.data);
        }
        if (tagsData.success) {
          setAllTags(tagsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredGuides = useMemo(() => {
    return guides.filter(g => g.isFeatured);
  }, [guides]);

  const filteredGuides = useMemo(() => {
    let list = guides;

    if (activeCategory !== "all") {
      list = list.filter((g) => g.categorySlug === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.excerpt.toLowerCase().includes(q) ||
          g.categoryLabel.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q)) ||
          g.author.toLowerCase().includes(q)
      );
    }

    if (selectedTag) {
      list = list.filter((g) => 
        g.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    return list;
  }, [guides, activeCategory, searchQuery, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfdfb]">
        <Header />
        <main className="wrap py-20 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-[var(--color-ink-soft)]">Loading guides...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Guides</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className="relative rounded-[24px] overflow-hidden mb-10 bg-gradient-to-br from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A] text-white">
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">📖</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                  Expert Guides
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[var(--color-green-deep)] px-4 py-1.5 rounded-full font-semibold">
                  {guides.length} Guides
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Smart <em className="italic not-italic text-[#D4F26B]">Buying Guides</em>
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Expert advice, step-by-step tutorials, and comprehensive buying guides to help you make the right choice.
              </p>

              {/* Search */}
              <div className="mt-7 max-w-[540px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search guides by topic, brand, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-4 pl-13 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[1rem] transition-all focus:outline-none focus:border-[#D4F26B] focus:bg-white/16 placeholder:text-white/55"
                />
                {searchQuery && (
                  <button
                    type="button"
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
                  <div className="font-fraunces font-semibold text-3xl text-white">{guides.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Total Guides</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{categories.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Categories</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{featuredGuides.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Featured</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{allTags.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Topics</div>
                </div>
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── CATEGORIES GRID ──────────────────────────── */}
        <section className="mb-8">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              Browse by <em className="italic not-italic text-[var(--color-green)]">Category</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/guides/category/${cat.slug}`}
                className="relative rounded-[18px] overflow-hidden p-5.5 pb-5 min-h-[130px] flex flex-col justify-between text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_36px_rgba(15,24,15,0.16)] group"
                style={{ background: `linear-gradient(150deg, var(--color-green-deep), ${cat.color})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
                <div className="absolute w-[140px] h-[140px] rounded-full blur-[34px] opacity-40 bg-white -top-[40px] -right-[20px]" />
                <div className="w-10 h-10 rounded-[12px] bg-white/16 backdrop-blur-sm border border-white/25 flex items-center justify-center relative z-10 mb-2">
                  <span className="text-xl">{cat.icon}</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-fraunces font-medium text-[1rem] mb-0.5">{cat.name}</h4>
                  <div className="font-jetbrains-mono text-[0.65rem] opacity-80 flex items-center gap-1.5">
                    {cat.newCount > 0 && `${cat.newCount} new · `}{cat.count || 0} total
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-10 w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/28">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── FEATURED GUIDES ──────────────────────────── */}
        {activeCategory === "all" && featuredGuides.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⭐</span>
              <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
                Featured <em className="italic not-italic text-[var(--color-green)]">Guides</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredGuides.slice(0, 3).map((guide) => (
                <Link
                  key={guide._id}
                  href={`/guides/${guide.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                      {guide.categoryIcon} {guide.categoryLabel}
                    </span>
                    <span className="absolute top-3 right-3 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⏱️ {guide.readTime}
                    </span>
                    {guide.isTrending && (
                      <span className="absolute top-3 left-3 text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h4>
                    <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">{guide.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.5rem] flex-shrink-0">
                        {guide.authorAvatar}
                      </div>
                      <span className="text-[0.6rem] font-medium">{guide.author}</span>
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">· {guide.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── FILTERS & TOOLBAR ────────────────────────── */}
        <section>
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              {activeCategory === "all" ? "All" : categories.find(c => c.slug === activeCategory)?.name || "All"}
              <em className="italic not-italic text-[var(--color-green)] ml-1">Guides</em>
            </h2>
            <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{filteredGuides.length} guides</span>
          </div>

          {/* ─── FILTERS ──────────────────────────────────── */}
          <div className="border-[1.5px] border-[var(--color-line)] rounded-[14px] p-4.5 mb-6 bg-[var(--color-paper)]">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filters */}
              <div className="flex gap-1.5 flex-wrap flex-1">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[0.75rem] font-semibold transition-all ${
                    activeCategory === "all"
                      ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
                      : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  📖 All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[0.75rem] font-semibold transition-all ${
                      activeCategory === cat.slug
                        ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
                        : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-0.5 p-0.5 border-[1.5px] border-[var(--color-line)] rounded-full bg-white flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold transition-all ${
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
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold transition-all ${
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

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mt-3 pt-3 border-t border-[var(--color-line)]">
                <span className="text-[0.65rem] text-[var(--color-ink-soft)] font-medium mr-1 flex items-center">🏷️</span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-2.5 py-1 rounded-full border-[1.5px] text-[0.65rem] font-medium transition-all ${
                    !selectedTag
                      ? "bg-[var(--color-green)] border-[var(--color-green)] text-white"
                      : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-full border-[1.5px] text-[0.65rem] font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-[var(--color-green)] border-[var(--color-green)] text-white"
                        : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── GRID VIEW ────────────────────────────── */}
          {viewMode === "grid" && filteredGuides.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGuides.map((guide) => (
                <Link
                  key={guide._id}
                  href={`/guides/${guide.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef1e9]">
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
                      <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                        {guide.categoryIcon} {guide.categoryLabel}
                      </span>
                      <span className={`text-[0.5rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                        {guide.level}
                      </span>
                    </div>
                    <span className="absolute top-2.5 right-2.5 z-10 text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⏱️ {guide.readTime}
                    </span>
                    {guide.isFeatured && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em]">
                        ⭐ Featured
                      </span>
                    )}
                    {guide.isTrending && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h4>
                    <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.5rem] flex-shrink-0">
                        {guide.authorAvatar}
                      </div>
                      <span className="text-[0.6rem] font-medium">{guide.author}</span>
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">· {guide.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ─── LIST VIEW ────────────────────────────── */}
          {viewMode === "list" && filteredGuides.length > 0 && (
            <div className="flex flex-col gap-4">
              {filteredGuides.map((guide) => (
                <Link
                  key={guide._id}
                  href={`/guides/${guide.slug}`}
                  className="flex gap-4 p-4 border border-[var(--color-line)] rounded-[14px] bg-[var(--color-paper)] transition-all hover:border-[var(--color-green)] hover:shadow-[0_12px_24px_rgba(15,24,15,0.08)] group"
                >
                  <div className="w-[160px] h-[110px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={160}
                      height={110}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                        {guide.categoryLabel}
                      </span>
                      <span className={`text-[0.5rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                        {guide.level}
                      </span>
                      {guide.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase">🔥</span>
                      )}
                    </div>
                    <h4 className="font-fraunces font-medium text-[1.05rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-[0.8rem] text-[var(--color-ink-soft)] mt-1 line-clamp-2">{guide.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2 text-[0.65rem] text-[var(--color-ink-soft)]">
                      <span className="font-medium">{guide.author}</span>
                      <span>·</span>
                      <span>{formatDate(guide.date)}</span>
                      <span>·</span>
                      <span>{guide.readTime}</span>
                      <span>·</span>
                      <span>📋 {guide.steps} steps</span>
                    </div>
                  </div>
                  <span className="text-[var(--color-green)] font-semibold text-[0.8rem] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* ─── EMPTY STATE ────────────────────────────── */}
          {filteredGuides.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3.5 py-16 px-5 text-[var(--color-ink-soft)]">
              <span className="text-4xl">🔍</span>
              <h3 className="text-xl font-medium text-[var(--color-ink)]">No guides found</h3>
              <p className="text-[0.95rem] max-w-md">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="px-5 py-2.25 rounded-full border-[1.5px] border-[var(--color-ink)] text-[0.8rem] font-semibold text-[var(--color-ink)] transition-all hover:bg-[var(--color-ink)] hover:text-white"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>

        {/* ─── NEWSLETTER ────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] rounded-[20px] p-10 md:p-12 my-6 text-white relative overflow-hidden">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 -top-[80px] -right-[60px] pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-white/4 -bottom-[60px] -left-[40px] pointer-events-none" />
          
          <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
            <div className="flex-1 min-w-[200px]">
              <span className="inline-block font-jetbrains-mono text-[0.6rem] tracking-[0.08em] uppercase bg-white/15 px-3 py-0.75 rounded-full font-semibold mb-2.5">
                📬 Stay ahead
              </span>
              <h3 className="font-fraunces font-medium text-[1.6rem] leading-[1.3] mb-1">Subscribe to the 7pexel weekly</h3>
              <p className="text-[0.9rem] opacity-80 leading-[1.6] max-w-[440px]">
                Get the week's top guides, reviews and industry insights — delivered fresh every Monday.
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
                className="px-5 py-3.5 rounded-full border-none font-poppins text-[0.9rem] bg-white/92 text-[var(--color-ink)] outline-none min-w-[240px] transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.3)]"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-white text-[var(--color-green-deep)] font-bold text-[0.9rem] transition-all duration-200 whitespace-nowrap flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
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
      </main>

      <Footer />
    </div>
  );
}