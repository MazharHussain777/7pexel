// app/reviews/category/[category]/page.tsx

// @ts-nocheck
export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryNav } from "./CategoryNav";
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import Category from '@/models/Category';

// ─── TYPES ──────────────────────────────────────────────
interface IReview {
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
  published: boolean;
}

interface ICategory {
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

// ─── FETCH CATEGORIES FROM DB ──────────────────────────
async function getCategoriesFromDB(): Promise<ICategory[]> {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    // ✅ Convert ObjectId to string
    return categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));
  } catch (error) {
    console.error('Error fetching categories from DB:', error);
    return [];
  }
}

// ─── FETCH SINGLE CATEGORY FROM DB ────────────────────
async function getCategoryFromDB(slug: string): Promise<ICategory | null> {
  try {
    await dbConnect();
    const category = await Category.findOne({ slug }).lean();
    if (category) {
      // ✅ Convert ObjectId to string
      return {
        ...category,
        _id: category._id.toString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching category from DB:', error);
    return null;
  }
}

// ─── FETCH REVIEWS BY CATEGORY FROM DB ────────────────
async function getReviewsByCategoryFromDB(categorySlug: string): Promise<IReview[]> {
  try {
    await dbConnect();
    const reviews = await Review.find({ 
      categorySlug, 
      published: true 
    })
    .sort({ date: -1 })
    .lean();
    // ✅ Convert ObjectId to string
    return reviews.map(review => ({
      ...review,
      _id: review._id.toString()
    }));
  } catch (error) {
    console.error('Error fetching reviews from DB:', error);
    return [];
  }
}
export async function generateStaticParams() {
  try {
    const categories = await getCategoriesFromDB();

    return categories
      .filter(
        (category) =>
          typeof category.slug === "string" &&
          category.slug.trim().length > 0
      )
      .map((category) => ({
        category: category.slug.trim(),
      }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  
  const cat = await getCategoryFromDB(category);

  if (!cat) {
    return {
      title: "Category Not Found | 7pexel Reviews",
      description: "The review category you're looking for doesn't exist.",
    };
  }

  return {
    title: cat.metaTitle || `${cat.name} Reviews | 7pexel`,
    description: cat.metaDescription || `Expert ${cat.name} reviews and ratings.`,
    keywords: cat.keywords?.join(", ") || "",
    openGraph: {
      title: cat.metaTitle || `${cat.name} Reviews | 7pexel`,
      description: cat.metaDescription || `Expert ${cat.name} reviews and ratings.`,
      type: "website",
      url: `https://7pexel.com/reviews/category/${cat.slug}`,
      siteName: "7pexel",
      images: [
        {
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: `${cat.name} Reviews - 7pexel`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle || `${cat.name} Reviews | 7pexel`,
      description: cat.metaDescription || `Expert ${cat.name} reviews and ratings.`,
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop"],
    },
    alternates: {
      canonical: `https://7pexel.com/reviews/category/${cat.slug}`,
    },
  };
}

export default async function CategoryReviewsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  // Get category from DB
  const cat = await getCategoryFromDB(category);

  if (!cat) {
    notFound();
  }

  // Get reviews for this category from DB
  const reviews = await getReviewsByCategoryFromDB(category);
  const featuredReviews = reviews.filter(r => r.isFeatured);
  const trendingReviews = reviews.filter(r => r.isTrending);

  function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function getStars(rating: number): string {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  // ✅ Convert to string for client component
  const categoryId = cat._id.toString();

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="wrap py-4 md:py-5" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] flex-wrap">
            <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href="/reviews" className="hover:text-[var(--color-green)] transition-colors">Reviews</Link>
            <span className="opacity-40 select-none">/</span>
            <span className="text-[var(--color-ink)] font-semibold">{cat.name}</span>
          </div>
        </nav>

        {/* Category Hero */}
        <section
          className="relative rounded-[24px] overflow-hidden mx-auto max-w-[91vw] mb-10 text-white"
          style={{ background: `linear-gradient(150deg, var(--color-green-deep), ${cat.color})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                  {cat.name} Reviews
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[var(--color-green-deep)] px-4 py-1.5 rounded-full font-semibold">
                  {reviews.length} Reviews
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                {cat.name} <em className="italic not-italic text-[#D4F26B]">Reviews</em>
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                {cat.description}
              </p>

              <div className="flex gap-8 flex-wrap mt-8">
                <div>
                  <div className="font-fraunces font-semibold text-3xl text-white">{reviews.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Total Reviews</div>
                </div>
                {trendingReviews.length > 0 && (
                  <div className="border-l border-white/20 pl-8">
                    <div className="font-fraunces font-semibold text-3xl text-white">{trendingReviews.length}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Trending</div>
                  </div>
                )}
                <div className="border-l border-white/20 pl-8">
                  <div className="font-fraunces font-semibold text-3xl text-white">{cat.newCount || 0}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">New This Week</div>
                </div>
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* Quick Nav */}
        <div className="wrap mb-6">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/reviews"
              className="px-4 py-2 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.78rem] font-semibold text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-all"
            >
              📋 All Reviews
            </Link>
            {/* ✅ Pass string ID */}
            <CategoryNav currentCategoryId={categoryId} />
          </div>
        </div>

        {/* Featured Reviews */}
        {featuredReviews.length > 0 && (
          <div className="wrap mb-10">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em] mb-5">
              Featured <em className="italic not-italic text-[var(--color-green)]">Reviews</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredReviews.slice(0, 3).map((review) => (
                <Link
                  key={review._id.toString()}
                  href={`/reviews/${review.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={review.image}
                      alt={review.imageAlt || review.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-2.5 right-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⭐ {review.rating}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                      {review.readTime}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {review.title}
                    </h4>
                    <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">
                      {review.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span>{review.author}</span>
                      <span>·</span>
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Reviews */}
        <div className="wrap py-4">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              All <em className="italic not-italic text-[var(--color-green)]">{cat.name}</em> Reviews
            </h2>
            <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{reviews.length} reviews</span>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review) => (
                <Link
                  key={review._id.toString()}
                  href={`/reviews/${review.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={review.image}
                      alt={review.imageAlt || review.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      {review.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <span className="absolute top-2.5 right-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-green)]">
                        {review.categoryLabel}
                      </span>
                      <span className="w-px h-3 bg-[var(--color-line)]" />
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">{review.brand}</span>
                    </div>
                    <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {review.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[0.7rem]">{getStars(review.rating)}</span>
                      <span className="text-[0.6rem] font-bold text-[var(--color-green)]">{review.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span>{review.author}</span>
                      <span>·</span>
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-paper)] rounded-[20px] border border-[var(--color-line)]">
              <span className="text-4xl">📝</span>
              <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No reviews yet</h3>
              <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">
                Check back soon for {cat.name} reviews.
              </p>
              <Link
                href="/reviews"
                className="inline-block mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
              >
                View all reviews
              </Link>
            </div>
          )}
        </div>

        {/* Back to All Reviews */}
        <div className="wrap py-4 pb-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
          >
            ← Back to all reviews
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}