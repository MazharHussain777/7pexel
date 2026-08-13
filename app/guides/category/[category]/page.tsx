// app/guides/category/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryNav } from "./CategoryNav";
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

async function getGuideCategoriesFromDB(): Promise<IGuideCategory[]> {
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

async function getGuidesByCategoryFromDB(categorySlug: string): Promise<IGuide[]> {
  try {
    await dbConnect();
    const guides = await Guide.find({ 
      categorySlug, 
      published: true 
    })
    .sort({ isFeatured: -1, date: -1 })
    .lean();
    return guides;
  } catch (error) {
    console.error('Error fetching guides from DB:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const categories = await getGuideCategoriesFromDB();
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
  
  const cat = await getGuideCategoryFromDB(category);

  if (!cat) {
    return {
      title: "Category Not Found | 7pexel Guides",
      description: "The guide category you're looking for doesn't exist.",
    };
  }

  return {
    title: cat.metaTitle || `${cat.name} Buying Guides | 7pexel`,
    description: cat.metaDescription || `Expert ${cat.name} buying guides and comparisons.`,
    keywords: cat.keywords?.join(", ") || "",
    openGraph: {
      title: cat.metaTitle || `${cat.name} Buying Guides | 7pexel`,
      description: cat.metaDescription || `Expert ${cat.name} buying guides and comparisons.`,
      type: "website",
      url: `https://7pexel.com/guides/category/${cat.slug}`,
      siteName: "7pexel",
      images: [
        {
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: `${cat.name} Guides - 7pexel`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle || `${cat.name} Buying Guides | 7pexel`,
      description: cat.metaDescription || `Expert ${cat.name} buying guides and comparisons.`,
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop"],
    },
    alternates: {
      canonical: `https://7pexel.com/guides/category/${cat.slug}`,
    },
  };
}

export default async function CategoryGuidesPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  // Get category from DB
  const cat = await getGuideCategoryFromDB(category);

  if (!cat) {
    notFound();
  }

  // Get guides for this category from DB
  const guides = await getGuidesByCategoryFromDB(category);
  const featuredGuides = guides.filter(r => r.isFeatured);
  const trendingGuides = guides.filter(r => r.isTrending);

  function formatDate(date: Date | string): string {
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

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="wrap py-4 md:py-5" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] flex-wrap">
            <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
            <span className="opacity-40 select-none">/</span>
            <Link href="/guides" className="hover:text-[var(--color-green)] transition-colors">Guides</Link>
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
                  {cat.name} Guides
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#D4F26B] text-[var(--color-green-deep)] px-4 py-1.5 rounded-full font-semibold">
                  {guides.length} Guides
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                {cat.name} <em className="italic not-italic text-[#D4F26B]">Buying Guides</em>
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                {cat.description}
              </p>

              <div className="flex gap-8 flex-wrap mt-8">
                <div>
                  <div className="font-fraunces font-semibold text-3xl text-white">{guides.length}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Total Guides</div>
                </div>
                {featuredGuides.length > 0 && (
                  <div className="border-l border-white/20 pl-8">
                    <div className="font-fraunces font-semibold text-3xl text-white">{featuredGuides.length}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.08em] text-white/70">Featured</div>
                  </div>
                )}
                {trendingGuides.length > 0 && (
                  <div className="border-l border-white/20 pl-8">
                    <div className="font-fraunces font-semibold text-3xl text-white">{trendingGuides.length}</div>
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
              href="/guides"
              className="px-4 py-2 rounded-full border-[1.5px] border-[var(--color-line)] text-[0.78rem] font-semibold text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-all"
            >
              📖 All Guides
            </Link>
            <CategoryNav currentCategoryId={cat._id} />
          </div>
        </div>

        {/* Featured Guides */}
        {featuredGuides.length > 0 && (
          <div className="wrap mb-10">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em] mb-5">
              Featured <em className="italic not-italic text-[var(--color-green)]">Guides</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredGuides.slice(0, 3).map((guide) => (
                <Link
                  key={guide._id.toString()}
                  href={`/guides/${guide.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-2.5 right-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⏱️ {guide.readTime}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                      {guide.readTime}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h4>
                    <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1.5 line-clamp-2">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span>{guide.author}</span>
                      <span>·</span>
                      <span>{formatDate(guide.date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div className="wrap py-4">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              All <em className="italic not-italic text-[var(--color-green)]">{cat.name}</em> Guides
            </h2>
            <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{guides.length} guides</span>
          </div>

          {guides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {guides.map((guide) => (
                <Link
                  key={guide._id.toString()}
                  href={`/guides/${guide.slug}`}
                  className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      {guide.isTrending && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold uppercase tracking-[0.05em]">
                          🔥 Trending
                        </span>
                      )}
                      {guide.isFeatured && (
                        <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[#D4F26B] text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em]">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <span className="absolute top-2.5 right-2.5 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono">
                      ⏱️ {guide.readTime}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-green)]">
                        {guide.categoryLabel}
                      </span>
                      <span className="w-px h-3 bg-[var(--color-line)]" />
                      <span className="text-[0.55rem] text-[var(--color-ink-soft)]">{guide.level}</span>
                    </div>
                    <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                      {guide.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-dashed border-[var(--color-line)] text-[0.6rem] text-[var(--color-ink-soft)]">
                      <span>{guide.author}</span>
                      <span>·</span>
                      <span>{formatDate(guide.date)}</span>
                      <span>·</span>
                      <span>📋 {guide.steps}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-paper)] rounded-[20px] border border-[var(--color-line)]">
              <span className="text-4xl">📝</span>
              <h3 className="mt-3 text-xl font-medium text-[var(--color-ink)]">No guides yet</h3>
              <p className="text-[0.95rem] text-[var(--color-ink-soft)] mt-1">
                Check back soon for {cat.name} guides.
              </p>
              <Link
                href="/guides"
                className="inline-block mt-4 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
              >
                View all guides
              </Link>
            </div>
          )}
        </div>

        {/* Back to All Guides */}
        <div className="wrap py-4 pb-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
          >
            ← Back to all guides
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}