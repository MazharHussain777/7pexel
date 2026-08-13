// app/reviews/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReviewDetailClient } from "./ReviewDetailClient";
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

// ─── FETCH REVIEW FROM DB ──────────────────────────────
async function getReviewFromDB(slug: string): Promise<IReview | null> {
  try {
    await dbConnect();
    const review = await Review.findOne({ slug, published: true }).lean();
    return review;
  } catch (error) {
    console.error('Error fetching review from DB:', error);
    return null;
  }
}

// ─── FETCH RELATED REVIEWS FROM DB ────────────────────
async function getRelatedReviewsFromDB(slug: string, categorySlug: string, limit: number = 4): Promise<IReview[]> {
  try {
    await dbConnect();
    const reviews = await Review.find({
      categorySlug,
      slug: { $ne: slug },
      published: true
    })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
    return reviews;
  } catch (error) {
    console.error('Error fetching related reviews from DB:', error);
    return [];
  }
}

// ─── FETCH CATEGORY FROM DB ────────────────────────────
async function getCategoryFromDB(slug: string): Promise<ICategory | null> {
  try {
    await dbConnect();
    const category = await Category.findOne({ slug }).lean();
    return category;
  } catch (error) {
    console.error('Error fetching category from DB:', error);
    return null;
  }
}

// ─── FETCH ALL CATEGORIES FROM DB ──────────────────────
async function getAllCategoriesFromDB(): Promise<ICategory[]> {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return categories;
  } catch (error) {
    console.error('Error fetching categories from DB:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const reviews = await Review.find({ published: true }).select('slug').lean();
    return reviews.map((review) => ({ slug: review.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewFromDB(slug);

  if (!review) {
    return {
      title: "Review Not Found | 7pexel Reviews",
      description: "The review you're looking for doesn't exist.",
    };
  }

  return {
    title: `${review.title} | 7pexel Reviews`,
    description: review.excerpt,
    keywords: [...review.tags, review.brand, review.model, "review"].join(", "),
    openGraph: {
      title: review.title,
      description: review.excerpt,
      images: [{ url: review.image, alt: review.imageAlt || review.title }],
      type: "article",
      publishedTime: review.date?.toString(),
      authors: [review.author],
      url: review.canonical || `https://7pexel.com/reviews/${review.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: review.title,
      description: review.excerpt,
      images: [review.image],
    },
    alternates: {
      canonical: review.canonical || `https://7pexel.com/reviews/${review.slug}`,
    },
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getReviewFromDB(slug);

  if (!review) {
    notFound();
  }

  const category = await getCategoryFromDB(review.categorySlug);
  const relatedReviews = await getRelatedReviewsFromDB(slug, review.categorySlug, 4);
  const allCategories = await getAllCategoriesFromDB();

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function getStars(rating: number): string {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  const categoryName = category?.name || review.categoryLabel;
  const categoryIcon = category?.icon || review.categoryIcon || "📰";
  const formattedDate = formatDate(review.date);
  const starRating = getStars(review.rating);
  const ratingText = `${review.rating}/5`;

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main>
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="wrap py-4 md:py-5">
          <nav className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] flex-wrap mt-5 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href="/reviews" className="hover:text-[var(--color-green)] transition-colors">Reviews</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href={`/reviews/category/${review.categorySlug}`} className="hover:text-[var(--color-green)] transition-colors">
              {categoryName}
            </Link>
            <span className="opacity-40 select-none">/</span>
            <span className="text-[var(--color-ink)] font-semibold truncate max-w-[200px]">{review.brand} {review.model}</span>
          </nav>
        </div>

        {/* ─── CLIENT COMPONENT ────────────────────────── */}
        <ReviewDetailClient
          review={review}
          relatedReviews={relatedReviews}
          reviewCategories={allCategories}
          categoryName={categoryName}
          categoryIcon={categoryIcon}
          formattedDate={formattedDate}
          starRating={starRating}
          ratingText={ratingText}
        />
      </main>
      <Footer />
    </div>
  );
}