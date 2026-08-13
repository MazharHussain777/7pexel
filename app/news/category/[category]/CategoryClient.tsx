// app/news/category/[category]/CategoryClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: string;
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
  date: string;
  readTime: string;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
}

interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string | null;
  count: number;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const PAGE_SIZE = 9;

export function CategoryClient({
  category,
  articles,
  allCategories,
}: {
  category: CategoryMeta;
  articles: Article[];
  allCategories: CategoryMeta[];
}) {
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const breakingInCategory = useMemo(
    () => articles.filter((a) => a.isBreaking).slice(0, 4),
    [articles]
  );

  const sorted = useMemo(() => {
    const list = [...articles];
    if (sortBy === "popular") {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return list;
  }, [articles, sortBy]);

  const spotlight = sorted[0];
  const rest = sorted.slice(1);
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  const trending = useMemo(
    () =>
      [...articles]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5),
    [articles]
  );

  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  const accent = category.color || "#0F6B3E";

  return (
    <>
      {/* ─── CATEGORY HERO ────────────────────────────────── */}
      <section
        className="relative rounded-[24px] overflow-hidden mb-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${hexToRgba(accent, 1)} 0%, ${hexToRgba(
            accent,
            0.85
          )} 55%, ${hexToRgba(accent, 0.65)} 100%)`,
        }}
      >
        <div className="relative z-10 p-10 md:p-14">
          <div className="max-w-[800px]">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-4xl">{category.icon}</span>
              <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                {category.name} News
              </span>
              <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[#0A3F26] px-4 py-1.5 rounded-full font-semibold">
                {articles.length} Articles
              </span>
            </div>
            <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
              {category.name} <em className="italic not-italic text-[#D4F26B]">News</em>
            </h1>
            <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
              {category.description ||
                `Latest news, reviews, and updates from the ${category.name} category.`}
            </p>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap mt-8">
              <div>
                <div className="font-fraunces font-semibold text-3xl text-white">
                  {articles.length}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">
                  Articles
                </div>
              </div>
              <div className="border-l border-white/20 pl-8">
                <div className="font-fraunces font-semibold text-3xl text-white">
                  {articles.filter((a) => a.isFeatured).length}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">
                  Featured
                </div>
              </div>
              <div className="border-l border-white/20 pl-8">
                <div className="font-fraunces font-semibold text-3xl text-white">
                  {articles.filter((a) => a.isBreaking).length}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">
                  Breaking
                </div>
              </div>
              {sorted[0] && (
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">
                    {formatDate(sorted[0].date)}
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">
                    Latest
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
        </svg>
      </section>

      {/* ─── QUICK CATEGORY NAV ──────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Link
          href="/news"
          className="px-4 py-2 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.78rem] font-semibold text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-all"
        >
          📰 All News
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/news/category/${cat.id}`}
            className={`px-4 py-2 rounded-full border-[1.5px] text-[0.78rem] font-semibold transition-all whitespace-nowrap ${
              cat.id === category.id
                ? "text-white shadow-[0_4px_12px_rgba(15,24,15,0.15)]"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
            }`}
            style={
              cat.id === category.id
                ? { backgroundColor: cat.color || "#0F6B3E", borderColor: cat.color || "#0F6B3E" }
                : {}
            }
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* ─── BREAKING IN CATEGORY ────────────────────────── */}
      {breakingInCategory.length > 0 && (
        <div className="mb-8 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-[12px] p-4 flex items-center gap-3 overflow-hidden">
          <span className="flex items-center gap-2 text-red-600 font-bold text-sm whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            BREAKING
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {breakingInCategory.map((a, i) => (
                <span key={a.id}>
                  <Link href={`/news/${a.slug}`} className="text-red-600 hover:underline font-medium">
                    {a.title}
                  </Link>
                  {i < breakingInCategory.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[20px] border border-[var(--color-line)]">
          <span className="text-4xl">📝</span>
          <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No articles yet</h3>
          <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">
            Check back soon for the latest {category.name} news.
          </p>
          <Link
            href="/news"
            className="inline-block mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
          >
            View all news
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── LEFT: ARTICLES ───────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Spotlight */}
            {spotlight && (
              <Link
                href={`/news/${spotlight.slug}`}
                className="group relative flex flex-col md:flex-row gap-0 md:gap-6 mb-8 border border-[var(--color-line)] rounded-[20px] overflow-hidden bg-white transition-all hover:shadow-[0_20px_45px_rgba(15,24,15,0.12)]"
              >
                <div className="relative w-full md:w-[46%] aspect-[16/10] md:aspect-auto overflow-hidden bg-[#eef1e9] flex-shrink-0">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.imageAlt || spotlight.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span
                    className="absolute top-3 left-3 text-[0.62rem] px-2.5 py-1 rounded-full text-white font-bold uppercase tracking-[0.05em]"
                    style={{ backgroundColor: accent }}
                  >
                    {category.icon} {category.name}
                  </span>
                  {spotlight.isBreaking && (
                    <span className="absolute top-3 right-3 text-[0.6rem] px-2.5 py-1 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                      🔴 Breaking
                    </span>
                  )}
                </div>
                <div className="p-6 md:p-2 md:pr-8 flex flex-col justify-center flex-1">
                  <span className="text-[0.65rem] font-jetbrains-mono uppercase tracking-[0.1em] text-[var(--color-ink-soft)] mb-2">
                    Top Story
                  </span>
                  <h2 className="font-fraunces font-medium text-[1.5rem] md:text-[1.75rem] leading-[1.2] group-hover:text-[var(--color-green)] transition-colors">
                    {spotlight.title}
                  </h2>
                  <p className="text-[0.9rem] text-[var(--color-ink-soft)] mt-3 leading-[1.6] line-clamp-3">
                    {spotlight.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-dashed border-[var(--color-line)] text-[0.72rem] text-[var(--color-ink-soft)]">
                    <span className="font-semibold text-[var(--color-ink)]">{spotlight.author}</span>
                    <span>·</span>
                    <span>{formatDate(spotlight.date)}</span>
                    <span>·</span>
                    <span>{spotlight.readTime}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Sort + View toggle */}
            {rest.length > 0 && (
              <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
                <span className="text-[0.85rem] text-[var(--color-ink-soft)]">
                  Showing{" "}
                  <span className="font-semibold text-[var(--color-ink)]">{visibleRest.length}</span> of{" "}
                  {rest.length} more articles
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-0.5 p-0.5 border-[1.5px] border-[var(--color-line)] rounded-full bg-white">
                    <button
                      onClick={() => setSortBy("newest")}
                      className={`px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold transition-all ${
                        sortBy === "newest" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => setSortBy("popular")}
                      className={`px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold transition-all ${
                        sortBy === "popular" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      Most Viewed
                    </button>
                  </div>
                  <div className="flex items-center gap-0.5 p-0.5 border-[1.5px] border-[var(--color-line)] rounded-full bg-white">
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
              </div>
            )}

            {/* Articles */}
            {visibleRest.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {visibleRest.map((article) =>
                  viewMode === "grid" ? (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)]"
                      style={{ borderColor: "var(--color-line)" }}
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
                        <span className="absolute bottom-2.5 right-2.5 text-[0.5rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                          {article.readTime}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
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
                  ) : (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="flex gap-4 p-4 border border-[var(--color-line)] rounded-[16px] bg-white transition-all duration-300 hover:border-[var(--color-green)] hover:shadow-[0_12px_24px_rgba(15,24,15,0.08)] group"
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
                  )
                )}
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="px-7 py-3 rounded-full border-[1.5px] border-[var(--color-line)] bg-white text-[var(--color-ink)] font-semibold text-[0.85rem] transition-all hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:shadow-[0_8px_20px_rgba(15,107,62,0.10)]"
                >
                  Load more articles
                </button>
              </div>
            )}
          </div>

          {/* ─── RIGHT SIDEBAR ────────────────────────────── */}
          <aside className="w-full lg:w-[300px] flex-shrink-0 space-y-6">
            {/* Trending in category */}
            {trending.length > 0 && (
              <div className="bg-white border border-[var(--color-line)] rounded-[16px] p-5">
                <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
                  <span>🔥</span> Trending in {category.name}
                </h3>
                <div className="space-y-3">
                  {trending.map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="flex gap-3 p-2 rounded-[10px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group"
                    >
                      <span className="text-[0.7rem] font-bold text-[var(--color-ink-soft)] w-5 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[0.82rem] font-medium group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-[0.6rem] text-[var(--color-ink-soft)]">{formatDate(article.date)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore other categories */}
            {otherCategories.length > 0 && (
              <div className="bg-white border border-[var(--color-line)] rounded-[16px] p-5">
                <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
                  <span>📂</span> Explore Categories
                </h3>
                <div className="space-y-1.5">
                  {otherCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/news/category/${cat.id}`}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-[10px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3.5 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-[0.85rem] font-medium group-hover:text-[var(--color-green)] transition-colors">
                          {cat.name}
                        </span>
                      </span>
                      {cat.count > 0 && (
                        <span className="text-[0.65rem] font-semibold text-[var(--color-ink-soft)] bg-[#f2f4ee] px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Subscribe card */}
            <div
              className="rounded-[16px] p-5 pb-6 text-white"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(accent, 1)}, ${hexToRgba(accent, 0.7)})`,
              }}
            >
              <h4 className="font-fraunces font-medium text-[1.1rem] mb-1.5 text-white flex items-center gap-2">
                <span>📬</span> Get the latest
              </h4>
              <p className="text-white/80 text-[0.78rem] leading-[1.6] mb-4">
                {category.name} news straight to your inbox. No spam, ever.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                  const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
                  if (input && input.value.trim() && input.value.includes("@")) {
                    btn.textContent = "✓ Subscribed!";
                    setTimeout(() => {
                      btn.textContent = "Subscribe";
                      input.value = "";
                    }, 2500);
                  } else {
                    alert("Please enter a valid email address");
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3.5 py-2.5 rounded-full border-none font-poppins text-[0.8rem] bg-white/92 text-[var(--color-ink)] outline-none min-w-0"
                  required
                />
                <button
                  type="submit"
                  className="px-4.5 py-2.5 rounded-full bg-white font-bold text-[0.78rem] transition-all hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] whitespace-nowrap"
                  style={{ color: accent }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
}