// app/news/category/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryClient } from "./CategoryClient";
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import NewsCategory from '@/models/NewsCategory';

// ─── TYPES ──────────────────────────────────────────────
interface INewsArticle {
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
  date: Date;
  readTime: string;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  contentHtml: string;
  customStyles: string;
  canonical?: string;
  published: boolean;
}

interface INewsCategory {
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

async function getNewsCategoriesFromDB(): Promise<INewsCategory[]> {
  try {
    await dbConnect();
    const categories = await NewsCategory.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    return categories;
  } catch (error) {
    console.error('Error fetching news categories from DB:', error);
    return [];
  }
}

async function getNewsCategoryFromDB(slug: string): Promise<INewsCategory | null> {
  try {
    await dbConnect();
    const category = await NewsCategory.findOne({ slug }).lean();
    return category;
  } catch (error) {
    console.error('Error fetching news category from DB:', error);
    return null;
  }
}

async function getNewsByCategoryFromDB(categorySlug: string): Promise<INewsArticle[]> {
  try {
    await dbConnect();
    const articles = await News.find({ 
      categorySlug, 
      published: true 
    })
    .sort({ isBreaking: -1, isFeatured: -1, date: -1 })
    .lean();
    return articles;
  } catch (error) {
    console.error('Error fetching news from DB:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const categories = await getNewsCategoriesFromDB();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getNewsCategoryFromDB(category);

  if (!cat) {
    return {
      title: "Category Not Found | 7pexel News",
      description: "The news category you're looking for doesn't exist.",
    };
  }

  return {
    title: cat.metaTitle || `${cat.name} News | 7pexel`,
    description: cat.metaDescription || `Latest ${cat.name} news, reviews, and updates.`,
    keywords: cat.keywords?.join(", ") || "",
    openGraph: {
      title: cat.metaTitle || `${cat.name} News | 7pexel`,
      description: cat.metaDescription || `Latest ${cat.name} news, reviews, and updates.`,
      type: "website",
      url: `https://7pexel.com/news/category/${cat.slug}`,
      siteName: "7pexel",
      images: [
        {
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: `${cat.name} News - 7pexel`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle || `${cat.name} News | 7pexel`,
      description: cat.metaDescription || `Latest ${cat.name} news, reviews, and updates.`,
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop"],
    },
    alternates: {
      canonical: `https://7pexel.com/news/category/${cat.slug}`,
    },
  };
}

export default async function CategoryNewsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  const cat = await getNewsCategoryFromDB(category);

  if (!cat) {
    notFound();
  }

  const articles = await getNewsByCategoryFromDB(category);
  const allCategories = await getNewsCategoriesFromDB();

  function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/news" className="hover:text-[var(--color-green)] transition-colors">News</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">{cat.name}</span>
        </nav>

        <CategoryClient
          category={{
            id: cat._id.toString(),
            name: cat.name,
            icon: cat.icon,
            color: cat.color,
            description: cat.description,
            count: articles.length,
          }}
          articles={articles.map(a => ({
            id: a._id.toString(),
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            category: a.category,
            categoryLabel: a.categoryLabel,
            categorySlug: a.categorySlug,
            categoryIcon: a.categoryIcon,
            categoryColor: a.categoryColor,
            image: a.image,
            imageAlt: a.imageAlt,
            author: a.author,
            authorAvatar: a.authorAvatar,
            date: a.date ? new Date(a.date).toISOString() : new Date().toISOString(),
            readTime: a.readTime,
            tags: a.tags || [],
            isFeatured: a.isFeatured || false,
            isBreaking: a.isBreaking || false,
            isTrending: a.isTrending || false,
            views: a.views || 0,
          }))}
          allCategories={allCategories.map(c => ({
            id: c._id.toString(),
            name: c.name,
            icon: c.icon,
            color: c.color,
            description: c.description,
            count: 0, // Will be updated in client
          }))}
        />
      </main>
      <Footer />
    </div>
  );
}