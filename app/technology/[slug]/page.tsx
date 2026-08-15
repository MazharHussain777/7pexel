// app/technology/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TechnologyHeader } from "@/components/technology/slug/TechnologyHeader";
import { TechnologyContent } from "@/components/technology/slug/TechnologyContent";
import { TechnologySidebar } from "@/components/technology/slug/TechnologySidebar";

// ─── FETCH FUNCTIONS ────────────────────────────────────
async function getArticle(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles/${slug}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(categorySlug: string, currentSlug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles?category=${categorySlug}&limit=10`
    );
    const data = await response.json();
    if (data.success && data.data) {
      return data.data.filter((a: any) => a.slug !== currentSlug).slice(0, 4);
    }
    return [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

async function getPopularArticles() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles?featured=true&limit=4`
    );
    const data = await response.json();
    if (data.success && data.data) {
      return data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching popular articles:', error);
    return [];
  }
}

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles?limit=100`);
    const data = await response.json();
    if (data.success && data.data) {
      return data.data.map((article: any) => ({
        slug: article.slug,
      }));
    }
    return [];
  } catch (error) {
    return [];
  }
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Guide Not Found | 7pexel Technology",
      description: "The technology guide you're looking for doesn't exist.",
    };
  }

  return {
    title: `${article.title} | 7pexel Technology Guides`,
    description: article.excerpt,
    keywords: article.tags?.join(", ") || "",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }],
      type: "article",
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyGuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.categorySlug, slug);
  const popularArticles = await getPopularArticles();

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ─── LEFT COLUMN ──────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <article>
              <TechnologyHeader
                title={article.title}
                excerpt={article.excerpt}
                categorySlug={article.categorySlug}
                difficulty={article.difficulty}
                readTime={article.readTime}
                isTrending={article.isTrending}
                author={article.author}
                publishedAt={article.publishedAt}
                tags={article.tags}
                image={article.image}
                imageAlt={article.imageAlt}
              />

              <TechnologyContent
                content={article.content || article.contentHtml}
                customStyles={article.customStyles}
                tags={article.tags}
              />
            </article>
          </div>

          {/* ─── RIGHT COLUMN ─────────────────────────────── */}
          <TechnologySidebar
            categorySlug={article.categorySlug}
            publishedAt={article.publishedAt}
            relatedArticles={relatedArticles}
            popularArticles={popularArticles}
          />
        </div>
      </main>
    </div>
  );
}