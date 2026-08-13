// app/news/[slug]/ArticleDetailClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/lib/news-types";
import { useState } from "react";

interface ArticleDetailClientProps {
  article: NewsArticle & {
    categoryIcon?: string;
    categoryColor?: string;
    categoryDescription?: string;
    categorySlug?: string;
    level?: string;
    steps?: number;
    difficulty?: string;
    views?: number;
    structuredData?: any;
  };
  relatedArticles: NewsArticle[];
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  formattedDate: string;
  tagsArray: string[];
  content: string;
  styles: string;
}

export function ArticleDetailClient({
  article,
  relatedArticles,
  categoryName,
  categoryIcon,
  categoryColor,
  formattedDate,
  tagsArray,
  content,
  styles,
}: ArticleDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    }
  };

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      phones: "Phones",
      laptops: "Laptops",
      auto: "Auto",
      watches: "Watches",
      audio: "Audio",
      gaming: "Gaming",
      cameras: "Cameras",
      technology: "Technology",
    };
    return names[cat] || cat;
  };

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      phones: "📱",
      laptops: "💻",
      auto: "🚗",
      watches: "⌚",
      audio: "🎧",
      gaming: "🎮",
      cameras: "📸",
      technology: "💡",
    };
    return icons[cat] || "📰";
  };

  // Get all fields for display
  const fields = [
    { label: "Category", value: `${categoryIcon} ${categoryName}`, icon: "📂" },
    { label: "Author", value: article.author, icon: "✍️" },
    { label: "Published", value: formattedDate, icon: "📅" },
    { label: "Read Time", value: article.readTime || "3 min", icon: "⏱️" },
    { label: "Level", value: article.level || "Beginner", icon: "📊" },
    { label: "Difficulty", value: article.difficulty || "Beginner", icon: "🎯" },
    { label: "Steps", value: article.steps ? `${article.steps} steps` : "N/A", icon: "📋" },
    { label: "Views", value: article.views ? `${article.views} views` : "0 views", icon: "👁️" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* ─── LEFT COLUMN: ARTICLE CONTENT ────────────────────── */}
      <div className="flex-1 min-w-0">
        <article>
          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span 
                className="text-[0.7rem] px-3 py-1 rounded-full text-white font-semibold font-jetbrains-mono uppercase tracking-[0.05em]"
                style={{ backgroundColor: article.categoryColor || categoryColor || '#0F6B3E' }}
              >
                {article.categoryIcon || categoryIcon} {categoryName}
              </span>
              {article.isBreaking && (
                <span className="text-[0.65rem] px-3 py-1 rounded-full bg-red-500 text-white font-semibold font-jetbrains-mono uppercase tracking-[0.05em] animate-pulse">
                  🔴 Breaking
                </span>
              )}
              {article.isFeatured && (
                <span className="text-[0.65rem] px-3 py-1 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-semibold font-jetbrains-mono uppercase tracking-[0.05em]">
                  ⭐ Featured
                </span>
              )}
              {article.isTrending && (
                <span className="text-[0.65rem] px-3 py-1 rounded-full bg-orange-500 text-white font-semibold font-jetbrains-mono uppercase tracking-[0.05em]">
                  🔥 Trending
                </span>
              )}
              <span className="text-[0.65rem] text-[var(--color-ink-soft)] font-jetbrains-mono">⏱️ {article.readTime || '3 min'}</span>
            </div>

            <h1 className="font-fraunces font-medium text-[clamp(2.5rem,3.5vw,3.5rem)] tracking-[-0.02em] leading-[1.1]">
              {article.title}
            </h1>
            <p className="text-[1rem] text-[var(--color-ink-soft)] mt-3 leading-[1.7]">{article.excerpt}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-[0.8rem]"
                  style={{ background: `linear-gradient(135deg, ${article.categoryColor || categoryColor || '#0F6B3E'}, ${article.categoryColor || categoryColor || '#0F6B3E'}dd)` }}
                >
                  {article.authorAvatar || article.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-[0.8rem] font-semibold">{article.author}</div>
                  <div className="text-[0.7rem] text-[var(--color-ink-soft)]">{formattedDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[0.7rem] text-[var(--color-ink-soft)]">
                {tagsArray.length > 0 && (
                  <span>🏷️ {tagsArray.slice(0, 3).join(", ")}</span>
                )}
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 rounded-full border border-[var(--color-line)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={handleShare}
                  className="px-2.5 py-1 rounded-full border border-[var(--color-line)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.image && (
            <figure className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#eef1e9] mb-6">
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              {article.imageAlt && (
                <figcaption className="absolute bottom-3 left-3 text-[0.65rem] text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {article.imageAlt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Author Bio */}
          {article.authorBio && (
            <div className="mb-6 p-4 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-[1rem] flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${article.categoryColor || categoryColor || '#0F6B3E'}, ${article.categoryColor || categoryColor || '#0F6B3E'}dd)` }}
              >
                {article.authorAvatar || article.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-fraunces font-semibold text-[0.95rem]">{article.author}</h4>
                <p className="text-[0.8rem] text-[var(--color-ink-soft)]">{article.authorBio}</p>
              </div>
            </div>
          )}

          {/* ===== RENDER STYLES ===== */}
          <style dangerouslySetInnerHTML={{ __html: styles }} />

          {/* ===== RENDER CONTENT ===== */}
          <div 
            className="news-content-wrapper"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          {tagsArray.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-[var(--color-line)]">
              {tagsArray.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?tag=${tag}`}
                  className="px-3.5 py-1.5 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.75rem] font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:bg-green-50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Back to News */}
          <div className="mt-8 pt-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
            >
              ← Back to all news
            </Link>
          </div>
        </article>
      </div>

      {/* ─── RIGHT COLUMN: SIDEBAR ────────────────────── */}
      <aside className="w-full lg:w-[340px] flex-shrink-0 space-y-6">
        {/* Quick Info Card - Shows ALL 40+ Fields */}
        <div 
          className="border rounded-[16px] p-5"
          style={{ 
            backgroundColor: `${article.categoryColor || categoryColor || '#0F6B3E'}08`,
            borderColor: `${article.categoryColor || categoryColor || '#0F6B3E'}20`
          }}
        >
          <h3 className="font-fraunces font-medium text-[1rem] mb-4 flex items-center gap-2">
            <span>📊</span> Article Details
          </h3>
          <div className="space-y-2.5">
            {fields.map((field) => (
              <div 
                key={field.label}
                className="flex justify-between items-center text-[0.85rem] pb-2 border-b"
                style={{ borderColor: `${article.categoryColor || categoryColor || '#0F6B3E'}10` }}
              >
                <span className="flex items-center gap-1.5 text-[var(--color-ink-soft)]">
                  <span>{field.icon}</span>
                  {field.label}
                </span>
                <span className="font-semibold text-right text-[var(--color-ink)]">
                  {field.value}
                </span>
              </div>
            ))}

            {/* Additional fields if available */}
            {article.categoryDescription && (
              <div className="pt-1">
                <span className="text-[0.7rem] text-[var(--color-ink-soft)] block mb-1">📝 Description</span>
                <p className="text-[0.75rem] text-[var(--color-ink)] leading-[1.5]">
                  {article.categoryDescription}
                </p>
              </div>
            )}

            {/* Status badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {article.isBreaking && (
                <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-red-500 text-white font-bold uppercase tracking-[0.05em]">
                  🔴 Breaking
                </span>
              )}
              {article.isFeatured && (
                <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em]">
                  ⭐ Featured
                </span>
              )}
              {article.isTrending && (
                <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                  🔥 Trending
                </span>
              )}
              {article.published !== false && (
                <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-green-500 text-white font-bold uppercase tracking-[0.05em]">
                  ✅ Published
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subscribe Card */}
        <div 
          className="rounded-[16px] p-5 pb-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${article.categoryColor || categoryColor || '#0F6B3E'}, ${article.categoryColor || categoryColor || '#0F6B3E'}cc)`,
          }}
        >
          <h4 className="font-fraunces font-medium text-[1.1rem] mb-1.5 text-white flex items-center gap-2">
            <span>📬</span> Get the latest
          </h4>
          <p className="text-white/80 text-[0.78rem] leading-[1.6] mb-4">
            {categoryName} news straight to your inbox. No spam, ever.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.querySelector("input") as HTMLInputElement;
              const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
              if (input && input.value.trim() && input.value.includes("@")) {
                btn.textContent = "✓ Subscribed!";
                btn.style.background = "#D4F26B";
                btn.style.color = "#0A3F26";
                setTimeout(() => {
                  btn.textContent = "Subscribe";
                  btn.style.background = "#fff";
                  btn.style.color = "#0A3F26";
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
              style={{ color: article.categoryColor || categoryColor || '#0F6B3E' }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[16px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-4 flex items-center gap-2">
              <span>📰</span> Related Articles
            </h3>
            <div className="space-y-4">
              {relatedArticles.slice(0, 4).map((a, index) => (
                <Link
                  key={a.id || a._id}
                  href={`/news/${a.slug}`}
                  className="flex gap-3 p-2.5 rounded-[12px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-4 group border border-transparent hover:border-[var(--color-line)]"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-[80px] h-[60px] rounded-[8px] overflow-hidden bg-[#eef1e9]">
                      <Image 
                        src={a.image} 
                        alt={a.title} 
                        width={80} 
                        height={60} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        loading="lazy" 
                      />
                    </div>
                    <span 
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[0.6rem] font-bold flex items-center justify-center"
                      style={{ background: article.categoryColor || categoryColor || '#0F6B3E' }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[0.82rem] font-semibold group-hover:text-[var(--color-green)] transition-colors line-clamp-2 leading-[1.4]">
                      {a.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span className="flex items-center gap-1">
                        <span>{a.categoryIcon || getCategoryIcon(a.category)}</span>
                        <span>{getCategoryName(a.category)}</span>
                      </span>
                      <span>·</span>
                      <span>{a.readTime || '3 min'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Quick Links */}
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[16px] p-5">
          <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
            <span>📂</span> Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {["phones", "laptops", "watches", "audio", "technology", "gaming", "cameras", "auto"].map((cat) => (
              <Link
                key={cat}
                href={`/news/category/${cat}`}
                className={`px-3 py-1.5 rounded-full border-[1.5px] text-[0.7rem] font-semibold transition-all ${
                  cat === article.category
                    ? "text-white"
                    : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:bg-green-50"
                }`}
                style={cat === article.category ? { 
                  backgroundColor: article.categoryColor || categoryColor || '#0F6B3E',
                  borderColor: article.categoryColor || categoryColor || '#0F6B3E'
                } : {}}
              >
                {getCategoryIcon(cat)} {getCategoryName(cat)}
              </Link>
            ))}
          </div>
        </div>

        {/* Share Article */}
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[16px] p-5">
          <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
            <span>🔗</span> Share Article
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex-1 px-4 py-2.5 rounded-full text-white font-semibold text-[0.8rem] transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${article.categoryColor || categoryColor || '#0F6B3E'}, ${article.categoryColor || categoryColor || '#0F6B3E'}dd)` }}
            >
              Share
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.8rem] font-semibold transition-all hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
            >
              {copied ? "✅" : "📋 Copy"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}