// app/guides/[slug]/GuideDetailClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
  date: Date;
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
}

interface GuideCategory {
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

interface GuideDetailClientProps {
  guide: Guide;
  relatedGuides: Guide[];
  guideCategories: GuideCategory[];
  categoryName: string;
  categoryIcon: string;
  formattedDate: string;
}

export function GuideDetailClient({
  guide,
  relatedGuides,
  guideCategories,
  categoryName,
  categoryIcon,
  formattedDate,
}: GuideDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showAllRelated, setShowAllRelated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  // Get current category related guides (same category)
  const sameCategoryGuides = relatedGuides.filter(r => r.categorySlug === guide.categorySlug);
  
  // Get other category guides (different categories)
  const otherCategoryGuides = relatedGuides.filter(r => r.categorySlug !== guide.categorySlug);
  
  // Group other category guides by category
  const groupedOtherGuides = otherCategoryGuides.reduce((acc, guide) => {
    const key = guide.categoryLabel || guide.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(guide);
    return acc;
  }, {} as Record<string, Guide[]>);

  // Display limited guides initially
  const displayedSameCategory = showAllRelated ? sameCategoryGuides : sameCategoryGuides.slice(0, 3);
  const displayedOtherCategory = showAllRelated ? otherCategoryGuides : otherCategoryGuides.slice(0, 4);

  function getDifficultyColor(level: string): string {
    const colors: Record<string, string> = {
      Beginner: "bg-green-500/10 text-green-600 border-green-200",
      Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
      Advanced: "bg-red-500/10 text-red-600 border-red-200",
    };
    return colors[level] || "bg-gray-500/10 text-gray-600 border-gray-200";
  }

  return (
    <div className="wrap">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Base guide content styles */
        .guide-content {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #222c1e;
        }

        .guide-content h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.8rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
          color: #0A3F26;
        }

        .guide-content h3 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.4rem;
          margin-top: 2rem;
          margin-bottom: 0.8rem;
          letter-spacing: -0.01em;
          color: #0A3F26;
        }

        .guide-content p {
          margin-bottom: 1.2rem;
          line-height: 1.85;
          color: #2a3a2a;
        }

        .guide-content ul {
          list-style: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.2rem;
        }

        .guide-content ul li {
          margin-bottom: 0.4rem;
          line-height: 1.7;
        }

        .guide-content .step-card {
          background: white;
          border: 1px solid rgba(15,24,15,0.09);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1rem;
        }

        .guide-content .step-card h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0A3F26;
          margin-bottom: 0.5rem;
        }

        .guide-content .step-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        .guide-content .tip-box {
          border-left: 3px solid #0F6B3E;
          padding: 0.75rem 1rem;
          border-radius: 0 8px 8px 0;
          margin-top: 0.75rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          background: #f0f7f3;
        }

        .guide-content .tip-box .tip-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .guide-content .key-takeaways {
          background: #0A3F26;
          border-radius: 12px;
          padding: 1.25rem;
          margin: 1.5rem 0;
          color: white;
        }

        .guide-content .key-takeaways h3 {
          color: #D4F26B;
          margin-bottom: 0.75rem;
        }

        .guide-content .key-takeaways ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guide-content .key-takeaways ul li {
          padding: 0.3rem 0;
          font-size: 0.95rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: #e8f0e8;
        }

        .guide-content .key-takeaways ul li::before {
          content: "✓";
          color: #D4F26B;
          font-weight: 700;
        }

        .guide-content .conclusion-box {
          background: #0A3F26;
          border-radius: 12px;
          padding: 1.8rem;
          color: white;
          margin: 2rem 0;
        }

        .guide-content .conclusion-box h3 {
          color: #D4F26B;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        .guide-content .conclusion-box p {
          color: #e8f0e8;
          margin-bottom: 0.8rem;
        }

        .guide-content .conclusion-box strong {
          color: white;
        }

        .guide-content .overflow-x-auto {
          overflow-x: auto;
        }

        .guide-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .guide-content table thead th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.85rem;
          font-weight: 600;
          background: #0A3F26;
          color: white;
        }

        .guide-content table tbody td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(15,24,15,0.09);
          font-size: 0.9rem;
        }

        .guide-content table tbody tr:hover {
          background: #FBFDFB;
        }

        .guide-content .pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .guide-content .pros-box {
          background: #f0f7f2;
          border-radius: 12px;
          padding: 1.25rem;
          border: 2px solid #1FA25A;
        }

        .guide-content .pros-box h3 {
          color: #0A3F26;
          margin-top: 0;
        }

        .guide-content .pros-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guide-content .pros-box ul li {
          padding: 0.3rem 0;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .guide-content .pros-box ul li::before {
          content: "✅";
        }

        .guide-content .cons-box {
          background: #fdf0f0;
          border-radius: 12px;
          padding: 1.25rem;
          border: 2px solid #e53935;
        }

        .guide-content .cons-box h3 {
          color: #c62828;
          margin-top: 0;
        }

        .guide-content .cons-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guide-content .cons-box ul li {
          padding: 0.3rem 0;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .guide-content .cons-box ul li::before {
          content: "❌";
        }

        @media (max-width: 768px) {
          .guide-content .pros-cons-grid {
            grid-template-columns: 1fr;
          }
          .guide-content table {
            font-size: 0.8rem;
          }
          .guide-content table thead th,
          .guide-content table tbody td {
            padding: 0.5rem;
          }
        }
      `}} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* ─── LEFT COLUMN: CONTENT ────────────────────── */}
        <div className="flex-1 min-w-0">
          <article>
            {/* Header */}
            <header className="mb-6">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[0.7rem] px-3 py-1 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] font-semibold font-jetbrains-mono uppercase tracking-[0.05em] mb-3">
                  {categoryIcon} {categoryName}
                </span>
              </div>
              
              <h1 className="font-fraunces font-medium text-[clamp(2rem,3vw,3.2rem)] tracking-[-0.02em] leading-[1.1] -mt-0.1">
                {guide.title}
              </h1>
              
              <p className="text-[1.05rem] text-[var(--color-ink-soft)] mt-3 leading-[1.6]">{guide.excerpt}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-[var(--color-line)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.8rem]">
                    {guide.authorAvatar}
                  </div>
                  <div>
                    <div className="text-[0.8rem] font-semibold">{guide.author}</div>
                    <div className="text-[0.7rem] text-[var(--color-ink-soft)]">{formattedDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[0.7rem] text-[var(--color-ink-soft)]">
                  <span>🏷️ {guide.tags.slice(0, 3).join(", ")}</span>
                  <button
                    onClick={handleCopyLink}
                    className="px-2.5 py-1 rounded-full border border-[var(--color-line)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
                  >
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <figure className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#eef1e9] mb-6">
              <Image
                src={guide.image}
                alt={guide.imageAlt || guide.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </figure>

            {/* ─── RENDER HTML CONTENT ────────────────── */}
            {guide.customStyles && (
              <style dangerouslySetInnerHTML={{ __html: guide.customStyles }} />
            )}
            <div 
              className="guide-content"
              dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
            />

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-[var(--color-line)]">
              {guide.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/guides?tag=${tag}`}
                  className="px-3.5 py-1.5 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.75rem] font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:bg-green-50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Bio */}
            {guide.authorBio && (
              <div className="mt-6 p-4 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[1rem] flex-shrink-0">
                  {guide.authorAvatar}
                </div>
                <div>
                  <h4 className="font-fraunces font-semibold text-[0.95rem]">{guide.author}</h4>
                  <p className="text-[0.8rem] text-[var(--color-ink-soft)]">{guide.authorBio}</p>
                </div>
              </div>
            )}
          </article>
        </div>

        {/* ─── RIGHT COLUMN: SIDEBAR ────────────────────── */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
          {/* Quick Stats */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-3">📊 Quick Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Category</span>
                <span className="font-semibold">{categoryName}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Level</span>
                <span className="font-semibold">{guide.level}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Steps</span>
                <span className="font-semibold">{guide.steps}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Read Time</span>
                <span className="font-semibold">{guide.readTime}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Published</span>
                <span className="font-semibold">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Subscribe Card */}
          <div className="bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] rounded-[16px] p-5 text-white">
            <h4 className="font-fraunces font-medium text-[1.1rem] mb-1.5 text-white">📬 Get the latest</h4>
            <p className="text-[0.82rem] opacity-85 leading-[1.5] mb-3.5">
              Subscribe to our weekly newsletter for expert guides.
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3.5 py-2.5 rounded-full border-none font-poppins text-[0.8rem] bg-white/92 text-[var(--color-ink)] outline-none min-w-0"
                required
              />
              <button
                type="submit"
                className="px-4.5 py-2.5 rounded-full bg-white text-[var(--color-green-deep)] font-bold text-[0.78rem] transition-all hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* ─── RELATED GUIDES SECTION ────────────────── */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
              <span>📚</span> Related Guides
            </h3>
            
            {/* Same Category Guides */}
            {sameCategoryGuides.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-green)] mb-2 flex items-center gap-1">
                  <span>{guide.categoryIcon}</span> More {categoryName} Guides
                </h4>
                <div className="space-y-3">
                  {displayedSameCategory.map((g) => (
                    <Link
                      key={g._id.toString()}
                      href={`/guides/${g.slug}`}
                      className="flex gap-3 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group border border-transparent hover:border-[var(--color-line)]"
                    >
                      <div className="w-[60px] h-[45px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                        <Image src={g.image} alt={g.title} width={60} height={45} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[0.8rem] font-semibold group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                          {g.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[0.55rem] text-[var(--color-ink-soft)]">
                          <span>{g.author}</span>
                          <span>·</span>
                          <span>{g.readTime}</span>
                          <span>·</span>
                          <span className="text-[0.5rem] bg-[var(--color-green)]/10 px-1.5 py-0.5 rounded-full">
                            {g.categoryIcon}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Categories Guides */}
            {Object.keys(groupedOtherGuides).length > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-[var(--color-line)]">
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)] mb-2">
                  🌐 From Other Categories
                </h4>
                {Object.entries(groupedOtherGuides).slice(0, showAllRelated ? Object.keys(groupedOtherGuides).length : 2).map(([categoryLabel, guides]) => (
                  <div key={categoryLabel} className="mb-3 last:mb-0">
                    <h5 className="text-[0.65rem] font-medium text-[var(--color-ink-soft)] mb-1.5 flex items-center gap-1">
                      <span>{guides[0]?.categoryIcon || "📰"}</span> {categoryLabel}
                    </h5>
                    <div className="space-y-2">
                      {guides.slice(0, showAllRelated ? guides.length : 2).map((g) => (
                        <Link
                          key={g._id.toString()}
                          href={`/guides/${g.slug}`}
                          className="flex gap-2 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group border border-transparent hover:border-[var(--color-line)]"
                        >
                          <div className="w-[50px] h-[38px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                            <Image src={g.image} alt={g.title} width={50} height={38} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[0.75rem] font-medium group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                              {g.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[0.5rem] text-[var(--color-ink-soft)]">
                              <span>{g.author}</span>
                              <span>·</span>
                              <span>{g.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View More Button */}
            {relatedGuides.length > 6 && (
              <button
                onClick={() => setShowAllRelated(!showAllRelated)}
                className="mt-3 w-full text-center text-[0.75rem] font-semibold text-[var(--color-green)] hover:underline transition-colors py-1.5 border border-dashed border-[var(--color-line)] rounded-full hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/5"
              >
                {showAllRelated ? "Show Less ↑" : `View All ${relatedGuides.length} Related Guides ↓`}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-3">📂 Categories</h3>
            <div className="flex flex-wrap gap-2">
              {guideCategories.map((cat) => {
                const isActive = cat.slug === guide.categorySlug;
                return (
                  <Link
                    key={cat._id.toString()}
                    href={`/guides/category/${cat.slug}`}
                    className={`px-3 py-1.5 rounded-full border text-[0.7rem] font-semibold transition-all ${
                      isActive 
                        ? "border-[var(--color-green)] bg-[var(--color-green)] text-white" 
                        : "border-[var(--color-line)] hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/5"
                    }`}
                  >
                    {cat.icon} {cat.name} {isActive && "✓"}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Back to Guides */}
          <div className="pt-2">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
            >
              ← Back to all guides
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}