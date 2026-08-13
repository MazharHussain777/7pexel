// app/guides/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideDetailClient } from "./GuideDetailClient";
import dbConnect from '@/lib/mongodb';
import Guide from '@/models/Guide';
import GuideCategory from '@/models/GuideCategory';

// ─── TYPES ──────────────────────────────────────────────
interface IGuide {
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
  published: boolean;
  structuredData?: any;
}

interface IGuideCategory {
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

// ─── FETCH FUNCTIONS ────────────────────────────────────

async function getGuideFromDB(slug: string): Promise<IGuide | null> {
  try {
    await dbConnect();
    const guide = await Guide.findOne({ slug, published: true }).lean();
    return guide;
  } catch (error) {
    console.error('Error fetching guide from DB:', error);
    return null;
  }
}

async function getRelatedGuidesFromDB(slug: string, categorySlug: string, limit: number = 4): Promise<IGuide[]> {
  try {
    await dbConnect();
    const guides = await Guide.find({
      categorySlug,
      slug: { $ne: slug },
      published: true
    })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
    return guides;
  } catch (error) {
    console.error('Error fetching related guides from DB:', error);
    return [];
  }
}

async function getGuideCategoryFromDB(slug: string): Promise<IGuideCategory | null> {
  try {
    await dbConnect();
    const category = await GuideCategory.findOne({ slug }).lean();
    return category;
  } catch (error) {
    console.error('Error fetching guide category from DB:', error);
    return null;
  }
}

async function getAllGuideCategoriesFromDB(): Promise<IGuideCategory[]> {
  try {
    await dbConnect();
    const categories = await GuideCategory.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return categories;
  } catch (error) {
    console.error('Error fetching guide categories from DB:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const guides = await Guide.find({ published: true }).select('slug').lean();
    return guides.map((guide) => ({ slug: guide.slug }));
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
  const guide = await getGuideFromDB(slug);

  if (!guide) {
    return {
      title: "Guide Not Found | 7pexel Guides",
      description: "The guide you're looking for doesn't exist.",
    };
  }

  return {
    title: `${guide.title} | 7pexel Guides`,
    description: guide.excerpt,
    keywords: guide.tags?.join(", ") || "",
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [{ url: guide.image, alt: guide.imageAlt || guide.title }],
      type: "article",
      publishedTime: guide.date?.toString(),
      authors: [guide.author],
      url: guide.canonical || `https://7pexel.com/guides/${guide.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: [guide.image],
    },
    alternates: {
      canonical: guide.canonical || `https://7pexel.com/guides/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideFromDB(slug);

  if (!guide) {
    notFound();
  }

  const category = await getGuideCategoryFromDB(guide.categorySlug);
  const relatedGuides = await getRelatedGuidesFromDB(slug, guide.categorySlug, 4);
  const allCategories = await getAllGuideCategoriesFromDB();

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function getStars(rating: number): string {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  const categoryName = category?.name || guide.categoryLabel;
  const categoryIcon = category?.icon || guide.categoryIcon || "📖";
  const formattedDate = formatDate(guide.date);

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main>
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="wrap py-4 md:py-5">
          <nav className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] flex-wrap mt-5 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href="/guides" className="hover:text-[var(--color-green)] transition-colors">Guides</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href={`/guides/category/${guide.categorySlug}`} className="hover:text-[var(--color-green)] transition-colors">
              {categoryName}
            </Link>
            <span className="opacity-40 select-none">/</span>
            <span className="text-[var(--color-ink)] font-semibold truncate max-w-[200px]">{guide.title}</span>
          </nav>
        </div>

        {/* ─── CLIENT COMPONENT ────────────────────────── */}
        <GuideDetailClient
          guide={guide}
          relatedGuides={relatedGuides}
          guideCategories={allCategories}
          categoryName={categoryName}
          categoryIcon={categoryIcon}
          formattedDate={formattedDate}
        />
      </main>
      <Footer />
    </div>
  );
}