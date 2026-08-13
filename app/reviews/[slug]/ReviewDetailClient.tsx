// app/reviews/[slug]/ReviewDetailClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Review {
  _id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  rating: number;
  price: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  isFeatured: boolean;
  isTrending: boolean;
  tags: string[];
  contentHtml: string;
  customStyles: string;
  canonical?: string;
}

interface ReviewCategory {
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

interface ReviewDetailClientProps {
  review: Review;
  relatedReviews: Review[];
  reviewCategories: ReviewCategory[];
  categoryName: string;
  categoryIcon: string;
  formattedDate: string;
  starRating: string;
  ratingText: string;
}

export function ReviewDetailClient({
  review,
  relatedReviews,
  reviewCategories,
  categoryName,
  categoryIcon,
  formattedDate,
  starRating,
  ratingText,
}: ReviewDetailClientProps) {
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

  // FAQ toggle functionality
  useEffect(() => {
    if (isClient) {
      document.querySelectorAll('.faq-question').forEach((question) => {
        question.addEventListener('click', function() {
          const parent = this.closest('.faq-item');
          if (parent) {
            parent.classList.toggle('open');
          }
        });
      });
    }
  }, [isClient, review.contentHtml]);

  // Get current category related reviews (same category)
  const sameCategoryReviews = relatedReviews.filter(r => r.categorySlug === review.categorySlug);
  
  // Get other category reviews (different categories)
  const otherCategoryReviews = relatedReviews.filter(r => r.categorySlug !== review.categorySlug);
  
  // Group other category reviews by category
  const groupedOtherReviews = otherCategoryReviews.reduce((acc, review) => {
    const key = review.categoryLabel || review.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(review);
    return acc;
  }, {} as Record<string, Review[]>);

  // Display limited reviews initially
  const displayedSameCategory = showAllRelated ? sameCategoryReviews : sameCategoryReviews.slice(0, 3);
  const displayedOtherCategory = showAllRelated ? otherCategoryReviews : otherCategoryReviews.slice(0, 4);

  // Helper function for stars
  function getStars(rating: number): string {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  return (
    <div className="wrap">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Base review content styles */
        .review-content {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #222c1e;
        }

        .review-content h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.8rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
          color: #0A3F26;
        }

        .review-content h3 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.4rem;
          margin-top: 2rem;
          margin-bottom: 0.8rem;
          letter-spacing: -0.01em;
          color: #0A3F26;
        }

        .review-content p {
          margin-bottom: 1.2rem;
          line-height: 1.85;
          color: #2a3a2a;
        }

        .review-content ul {
          list-style: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.2rem;
        }

        .review-content ul li {
          margin-bottom: 0.4rem;
          line-height: 1.7;
        }

        .review-content .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .review-content .pros,
        .review-content .cons {
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid;
        }

        .review-content .pros {
          background: #f0f7f2;
          border-color: #1FA25A;
        }

        .review-content .cons {
          background: #fdf0f0;
          border-color: #e53935;
        }

        .review-content .pros h3,
        .review-content .cons h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
        }

        .review-content .pros h3 {
          color: #0A3F26;
        }

        .review-content .cons h3 {
          color: #c62828;
        }

        .review-content .pros ul,
        .review-content .cons ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .review-content .pros ul li {
          padding: 0.4rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin: 0;
        }

        .review-content .pros ul li::before {
          content: "✅";
          flex-shrink: 0;
        }

        .review-content .cons ul li {
          padding: 0.4rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin: 0;
        }

        .review-content .cons ul li::before {
          content: "❌";
          flex-shrink: 0;
        }

        .review-content .spec-table {
          background: #f8faf8;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0;
          border: 1px solid #e0e8e0;
          overflow-x: auto;
        }

        .review-content .spec-table table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .review-content .spec-table th {
          text-align: left;
          padding: 0.75rem 0.5rem;
          font-weight: 700;
          color: #0A3F26;
          border-bottom: 2px solid #0A3F26;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .review-content .spec-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #e0e8e0;
        }

        .review-content .spec-table tr:last-child td {
          border-bottom: none;
        }

        .review-content .spec-table .badge {
          background: #0A3F26;
          color: white;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }

        .review-content .spec-table .badge-green {
          background: #1FA25A;
          color: white;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }

        .review-content .spec-table .badge-gold {
          background: #D4A843;
          color: white;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }

        .review-content .benchmark-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          margin: 2rem 0;
        }

        .review-content .benchmark-card {
          background: #f8faf8;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e0e8e0;
          text-align: center;
        }

        .review-content .benchmark-card .score {
          font-size: 2.2rem;
          font-weight: 700;
          color: #0A3F26;
        }

        .review-content .benchmark-card .label {
          font-size: 0.85rem;
          color: #5a6a5a;
          margin-top: 0.3rem;
        }

        .review-content .benchmark-card .improvement {
          color: #1FA25A;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 0.3rem;
          display: block;
        }

        .review-content .conclusion-box {
          background: #0A3F26;
          border-radius: 12px;
          padding: 1.8rem;
          color: white;
          margin: 2rem 0;
        }

        .review-content .conclusion-box h3 {
          color: #D4F26B;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        .review-content .conclusion-box p {
          color: #e8f0e8;
          margin-bottom: 0.8rem;
        }

        .review-content .conclusion-box strong {
          color: white;
        }

        .review-content .faq-section {
          margin: 2rem 0;
          border: 1px solid #e0e8e0;
          border-radius: 12px;
          overflow: hidden;
        }

        .review-content .faq-item {
          border-bottom: 1px solid #e0e8e0;
          padding: 0;
        }

        .review-content .faq-item:last-child {
          border-bottom: none;
        }

        .review-content .faq-question {
          padding: 1rem 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          color: #0A3F26;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
          margin: 0;
        }

        .review-content .faq-question:hover {
          background: #f5f8f5;
        }

        .review-content .faq-question::after {
          content: "+";
          font-size: 1.3rem;
          color: #0A3F26;
          transition: transform 0.3s ease;
        }

        .review-content .faq-item.open .faq-question::after {
          content: "−";
        }

        .review-content .faq-answer {
          padding: 0 1.5rem 1rem 1.5rem;
          font-size: 0.95rem;
          color: #4a5a4a;
          line-height: 1.7;
          display: none;
        }

        .review-content .faq-item.open .faq-answer {
          display: block;
        }

        @media (max-width: 768px) {
          .review-content .pros-cons {
            grid-template-columns: 1fr;
          }
          .review-content .benchmark-grid {
            grid-template-columns: 1fr;
          }
          .review-content .spec-table {
            padding: 0.8rem;
          }
          .review-content .spec-table table {
            font-size: 0.8rem;
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
                {review.title}
              </h1>
              
              <p className="text-[1.05rem] text-[var(--color-ink-soft)] mt-3 leading-[1.6]">{review.excerpt}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-[var(--color-line)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.8rem]">
                    {review.authorAvatar}
                  </div>
                  <div>
                    <div className="text-[0.8rem] font-semibold">{review.author}</div>
                    <div className="text-[0.7rem] text-[var(--color-ink-soft)]">{formattedDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[0.7rem] text-[var(--color-ink-soft)]">
                  <span>🏷️ {review.tags.slice(0, 3).join(", ")}</span>
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
                src={review.image}
                alt={review.imageAlt || review.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </figure>

            {/* ─── RENDER HTML CONTENT ────────────────── */}
            {review.customStyles && (
              <style dangerouslySetInnerHTML={{ __html: review.customStyles }} />
            )}
            <div 
              className="review-content"
              dangerouslySetInnerHTML={{ __html: review.contentHtml }}
            />

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-[var(--color-line)]">
              {review.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/reviews?tag=${tag}`}
                  className="px-3.5 py-1.5 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.75rem] font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] hover:bg-green-50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Bio */}
            {review.authorBio && (
              <div className="mt-6 p-4 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[1rem] flex-shrink-0">
                  {review.authorAvatar}
                </div>
                <div>
                  <h4 className="font-fraunces font-semibold text-[0.95rem]">{review.author}</h4>
                  <p className="text-[0.8rem] text-[var(--color-ink-soft)]">{review.authorBio}</p>
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
                <span className="text-[var(--color-ink-soft)]">Brand</span>
                <span className="font-semibold">{review.brand}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Model</span>
                <span className="font-semibold">{review.model}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Rating</span>
                <span className="font-semibold text-[var(--color-green)]">{starRating} {ratingText}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Price</span>
                <span className="font-semibold">{review.price}</span>
              </div>
              <div className="flex justify-between text-[0.85rem]">
                <span className="text-[var(--color-ink-soft)]">Published</span>
                <span className="font-semibold">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Subscribe Card - Fixed padding */}
          <div className="bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] rounded-[16px] p-5 text-white">
            <h4 className="font-fraunces font-medium text-[1.1rem] mb-1.5 text-white">📬 Get the latest</h4>
            <p className="text-[0.82rem] opacity-85 leading-[1.5] mb-3.5">
              Subscribe to our weekly newsletter for expert reviews.
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

          {/* ─── RELATED REVIEWS SECTION ────────────────── */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
              <span>📚</span> Related Reviews
            </h3>
            
            {/* Same Category Reviews */}
            {sameCategoryReviews.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-green)] mb-2 flex items-center gap-1">
                  <span>{review.categoryIcon}</span> More {categoryName} Reviews
                </h4>
                <div className="space-y-3">
                  {displayedSameCategory.map((r) => {
                    const rStars = getStars(r.rating);
                    return (
                      <Link
                        key={r._id}
                        href={`/reviews/${r.slug}`}
                        className="flex gap-3 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group border border-transparent hover:border-[var(--color-line)]"
                      >
                        <div className="w-[60px] h-[45px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                          <Image src={r.image} alt={r.title} width={60} height={45} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[0.8rem] font-semibold group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                            {r.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[0.55rem] text-[var(--color-ink-soft)]">
                            <span>{r.brand} {r.model}</span>
                            <span>·</span>
                            <span>{rStars}</span>
                            <span>·</span>
                            <span className="text-[0.5rem] bg-[var(--color-green)]/10 px-1.5 py-0.5 rounded-full">
                              {r.categoryIcon}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Categories Reviews */}
            {Object.keys(groupedOtherReviews).length > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-[var(--color-line)]">
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)] mb-2">
                  🌐 From Other Categories
                </h4>
                {Object.entries(groupedOtherReviews).slice(0, showAllRelated ? Object.keys(groupedOtherReviews).length : 2).map(([categoryLabel, reviews]) => (
                  <div key={categoryLabel} className="mb-3 last:mb-0">
                    <h5 className="text-[0.65rem] font-medium text-[var(--color-ink-soft)] mb-1.5 flex items-center gap-1">
                      <span>{reviews[0]?.categoryIcon || "📰"}</span> {categoryLabel}
                    </h5>
                    <div className="space-y-2">
                      {reviews.slice(0, showAllRelated ? reviews.length : 2).map((r) => {
                        const rStars = getStars(r.rating);
                        return (
                          <Link
                            key={r._id}
                            href={`/reviews/${r.slug}`}
                            className="flex gap-2 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group border border-transparent hover:border-[var(--color-line)]"
                          >
                            <div className="w-[50px] h-[38px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                              <Image src={r.image} alt={r.title} width={50} height={38} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[0.75rem] font-medium group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                                {r.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[0.5rem] text-[var(--color-ink-soft)]">
                                <span>{rStars}</span>
                                <span>·</span>
                                <span>{r.brand}</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View More Button */}
            {relatedReviews.length > 6 && (
              <button
                onClick={() => setShowAllRelated(!showAllRelated)}
                className="mt-3 w-full text-center text-[0.75rem] font-semibold text-[var(--color-green)] hover:underline transition-colors py-1.5 border border-dashed border-[var(--color-line)] rounded-full hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/5"
              >
                {showAllRelated ? "Show Less ↑" : `View All ${relatedReviews.length} Related Reviews ↓`}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
            <h3 className="font-fraunces font-medium text-[1rem] mb-3">📂 Categories</h3>
            <div className="flex flex-wrap gap-2">
              {reviewCategories.map((cat) => {
                const isActive = cat.slug === review.categorySlug;
                return (
                  <Link
                    key={cat._id}
                    href={`/reviews/category/${cat.slug}`}
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

          {/* Back to Reviews */}
          <div className="pt-2">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
            >
              ← Back to all reviews
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}