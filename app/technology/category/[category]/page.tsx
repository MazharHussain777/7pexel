// app/technology/category/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CategoryHero } from "@/components/technology/CategoryHero";
import { CategoryContent } from "./CategoryContent";

// ─── FETCH CATEGORIES FROM API ──────────────────────────
async function getCategory(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/categories/${slug}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function getAllCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/categories`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getSubCategories(categorySlug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/subcategories?category=${categorySlug}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
}

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category: any) => ({
      category: category.slug,
    }));
  } catch (error) {
    return [];
  }
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategory(category);

  if (!cat) {
    return {
      title: "Category Not Found | 7pexel Technology",
      description: "The technology category you're looking for doesn't exist.",
    };
  }

  return {
    title: cat.metaTitle || `${cat.name} Guides | 7pexel Technology`,
    description: cat.metaDescription || cat.description,
    keywords: cat.keywords?.join(", ") || "",
    openGraph: {
      title: cat.metaTitle || `${cat.name} Guides | 7pexel Technology`,
      description: cat.metaDescription || cat.description,
      type: "website",
      url: `https://7pexel.com/technology/category/${cat.slug}`,
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
      title: cat.metaTitle || `${cat.name} Guides | 7pexel Technology`,
      description: cat.metaDescription || cat.description,
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop"],
    },
    alternates: {
      canonical: `https://7pexel.com/technology/category/${cat.slug}`,
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await getCategory(category);

  if (!cat) {
    notFound();
  }

  const subCategories = await getSubCategories(category);
  const allCategories = await getAllCategories();

  return (
    <div className="min-h-screen bg-[#eef4f2]">
      <Header />
      <main>
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
          <nav className="flex items-center gap-2 text-[0.8rem] text-[#5a7a6a] flex-wrap" aria-label="Breadcrumb">
            <Link 
              href="/" 
              className="hover:text-[#011d24] transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-[#c5d8d2] select-none" aria-hidden="true">/</span>
            <Link 
              href="/technology" 
              className="hover:text-[#011d24] transition-colors duration-200"
            >
              Technology
            </Link>
            <span className="text-[#c5d8d2] select-none" aria-hidden="true">/</span>
            <span className="text-[#011d24] font-semibold capitalize" aria-current="page">
              {cat.name}
            </span>
          </nav>
        </div>

        {/* ─── HERO ──────────────────────────────────────── */}
        <CategoryHero category={cat} />

        {/* ─── CLIENT CONTENT ───────────────────────────── */}
        <CategoryContent
          category={cat}
          subCategories={subCategories}
        />

        {/* ─── BOTTOM CATEGORY NAVIGATION ──────────────── */}
        <section className="w-full bg-white border-t border-[#d8e2df] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-sm font-semibold text-[#1a7a6a] uppercase tracking-wider mb-2">
                Explore More
              </h3>
              <h2 className="text-3xl font-bold text-[#2c3e3a]">
                Other Technology Categories
              </h2>
              <p className="text-[#5a6f6a] mt-2 max-w-2xl mx-auto">
                Discover guides and resources from our curated technology collections
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allCategories
                .filter((c: any) => c.slug !== cat.slug && c.isActive !== false)
                .map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/technology/category/${category.slug}`}
                    className="group p-6 rounded-2xl border border-[#d8e2df] bg-[#f8faf9] hover:border-[#1a7a6a] hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                  >
                    <span className="block text-lg font-bold text-[#2c3e3a] group-hover:text-[#1a7a6a] transition-colors">
                      {category.name}
                    </span>
                    <div className="mt-3 w-8 h-0.5 bg-[#1a7a6a] mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 text-[#1a7a6a] font-medium hover:underline transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Technology Hub
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}