// app/news/NewsClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryColor: string;
  image: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
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
  isActive: boolean;
  order: number;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    phones: "📱",
    laptops: "💻",
    watches: "⌚",
    technology: "💡",
    gaming: "🎮",
    audio: "🎧",
    cameras: "📸",
    auto: "🚗",
  };
  return icons[category] || "📰";
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    phones: "Phones",
    laptops: "Laptops",
    watches: "Watches",
    technology: "Technology",
    gaming: "Gaming",
    audio: "Audio",
    cameras: "Cameras",
    auto: "Auto",
  };
  return names[category] || category;
}

export function NewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch data from MongoDB
  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesRes, categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/news/categories'),
          fetch('/api/news?action=tags')
        ]);
        
        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();
        const tagsData = await tagsRes.json();
        
        if (articlesData.success) {
          setArticles(articlesData.data);
        }
        if (categoriesData.success) {
          setCategories(categoriesData.data);
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

  const featuredArticles = useMemo(() => {
    return articles.filter(a => a.isFeatured);
  }, [articles]);

  const breakingArticles = useMemo(() => {
    return articles.filter(a => a.isBreaking);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let list = articles;

    if (activeCategory !== "all") {
      list = list.filter((a) => a.categorySlug === activeCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q)) ||
          a.author.toLowerCase().includes(q)
      );
    }

    if (selectedTag) {
      list = list.filter((a) => 
        a.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    return list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [articles, activeCategory, searchTerm, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfdfb]">
        <Header />
        <main className="wrap py-20 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-[var(--color-ink-soft)]">Loading articles...</p>
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
          <span className="text-[var(--color-ink)] font-semibold">News</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className="relative rounded-[24px] overflow-hidden mb-10 bg-gradient-to-br from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A] text-white">
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-4xl">📰</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                  Tech News Hub
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[var(--color-green-deep)] px-4 py-1.5 rounded-full font-semibold">
                  {articles.length} Articles
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/10 px-4 py-1.5 rounded-full font-semibold">
                  {categories.length} Categories
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Latest <em className="italic not-italic text-[#D4F26B]">Tech News</em>
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Stay updated with the latest technology news, smartphone launches, laptop reviews, AI breakthroughs, and gadget announcements.
              </p>

              {/* Search */}
              <div className="mt-7 max-w-[540px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search news by topic, brand, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pl-13 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[1rem] transition-all focus:outline-none focus:border-[#D4F26B] focus:bg-white/16 placeholder:text-white/55"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-8 flex-wrap mt-8">
                <div>
                  <div className="font-fraunces font-semibold text-3xl text-white">{articles.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Total Articles</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{categories.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Categories</div>
                </div>
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{featuredArticles.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Featured</div>
                </div>
                {breakingArticles.length > 0 && (
                  <div className="border-l border-white/20 pl-8">
                    <div className="font-fraunces font-semibold text-3xl text-white">{breakingArticles.length}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Breaking</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── BREAKING NEWS TICKER ────────────────────────── */}
        {breakingArticles.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-[12px] p-4 flex items-center gap-3 overflow-hidden">
            <span className="flex items-center gap-2 text-red-600 font-bold text-sm whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              BREAKING
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {breakingArticles.map((a, i) => (
                  <span key={a._id}>
                    <Link href={`/news/${a.slug}`} className="text-red-600 hover:underline font-medium">
                      {a.title}
                    </Link>
                    {i < breakingArticles.length - 1 && " • "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

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
                href={`/news/category/${cat.slug}`}
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

        {/* ─── FEATURED ARTICLES ───────────────────────────── */}
        {activeCategory === "all" && featuredArticles.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⭐</span>
              <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
                Featured <em className="italic not-italic text-[var(--color-green)]">Stories</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredArticles.slice(0, 3).map((article) => (
                <Link
                  key={article._id}
                  href={`/news/${article.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                        {article.categoryIcon} {article.categoryLabel}
                      </span>
                      {article.isBreaking && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                          Breaking
                        </span>
                      )}
                      {article.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <span className="absolute top-2.5 right-2.5 z-10 text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      {article.readTime}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span className="font-medium">{article.author}</span>
                      <span>·</span>
                      <span>{formatDate(article.date)}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
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
              <em className="italic not-italic text-[var(--color-green)] ml-1">News</em>
            </h2>
            <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{filteredArticles.length} articles</span>
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
                  📰 All
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

          {/* ─── ARTICLES GRID ─────────────────────────────── */}
          {filteredArticles.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/news/${article.slug}`}
                    className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                          {article.categoryIcon} {article.categoryLabel}
                        </span>
                        {article.isBreaking && (
                          <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                            Breaking
                          </span>
                        )}
                        {article.isTrending && (
                          <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                      <span className="absolute top-2.5 right-2.5 z-10 text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                        {article.readTime}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                        <span className="font-medium">{article.author}</span>
                        <span>·</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/news/${article.slug}`}
                    className="flex gap-4 p-4 border border-[var(--color-line)] rounded-[16px] bg-white transition-all hover:border-[var(--color-green)] hover:shadow-[0_12px_24px_rgba(15,24,15,0.08)] group"
                  >
                    <div className="w-[180px] h-[120px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#eef1e9]">
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        width={180}
                        height={120}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                          {article.categoryLabel}
                        </span>
                        {article.isBreaking && (
                          <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                            🔴 Breaking
                          </span>
                        )}
                        {article.isTrending && (
                          <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                            🔥 Trending
                          </span>
                        )}
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[0.5rem] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[0.8rem] text-[var(--color-ink-soft)] mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[0.65rem] text-[var(--color-ink-soft)]">
                        <span className="font-medium">{article.author}</span>
                        <span>·</span>
                        <span>{formatDate(article.date)}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16 bg-white rounded-[20px] border border-[var(--color-line)]">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No articles found</h3>
              <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchTerm("");
                  setSelectedTag(null);
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
              >
                Clear all filters
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
                Get the week's top news, reviews and industry insights — delivered fresh every Monday.
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

        {/* ─── BROWSE ALL CATEGORIES ───────────────────────── */}
        {categories.length > 4 && (
          <section className="mt-4 pt-8 border-t border-[var(--color-line)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🏷️</span>
              <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
                Browse All <em className="italic not-italic text-[var(--color-green)]">Categories</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/news/category/${cat.slug}`}
                  className="group p-4 rounded-[14px] border border-[var(--color-line)] bg-white text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(15,24,15,0.10)] hover:border-[var(--color-green)]"
                >
                  <div 
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-2xl mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    {cat.icon}
                  </div>
                  <h4 className="font-fraunces font-semibold text-[0.85rem] group-hover:text-[var(--color-green)] transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-[0.6rem] text-[var(--color-ink-soft)]">{cat.count || 0} articles</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .success-message.show {
          display: flex !important;
        }
      `}</style>
    </div>
  );
}