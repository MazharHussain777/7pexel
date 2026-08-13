// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getArticleBySlug, getAllArticles } from "@/lib/news-service";
import { ArticleDetailClient } from "./ArticleDetailClient";
import { baseArticleStyles } from "./article-styles";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    phones: "Phones",
    laptops: "Laptops",
    watches: "Watches",
    technology: "Technology",
    gaming: "Gaming",
    audio: "Audio",
    cameras: "Cameras",
    auto: "Auto",
  };
  return names[category] || category;
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    phones: "📱",
    laptops: "💻",
    watches: "⌚",
    technology: "💡",
    gaming: "🎮",
    audio: "🎧",
    cameras: "📸",
    auto: "🚗",
  };
  return icons[category] || "📰";
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    phones: "#0F6B3E",
    laptops: "#4C7A1F",
    watches: "#12836B",
    technology: "#063F47",
    gaming: "#8FA83E",
    audio: "#347A5B",
    cameras: "#6E8F2B",
    auto: "#2F5233",
  };
  return colors[category] || "#0F6B3E";
}

// Helper function to parse tags
function getTagsArray(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | 7pexel News",
      description: "The article you're looking for doesn't exist.",
    };
  }

  return {
    title: `${article.title} | 7pexel News`,
    description: article.excerpt,
    keywords: getTagsArray(article.tags).join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  
  // Get related articles (same category, excluding current)
  const relatedArticles = allArticles
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 5);

  const categoryName = getCategoryName(article.category);
  const categoryIcon = article.categoryIcon || getCategoryIcon(article.category);
  const categoryColor = article.categoryColor || getCategoryColor(article.category);
  const formattedDate = formatDate(article.date);
  const tagsArray = getTagsArray(article.tags);

  // Determine if content uses structured classes
  const hasStructuredContent = article.contentHtml?.includes('<div') || 
                               article.contentHtml?.includes('<table') ||
                               article.contentHtml?.includes('class="');

  // Wrap content if needed
  const content = hasStructuredContent 
    ? article.contentHtml 
    : `<div class="news-content">${article.contentHtml || ''}</div>`;

  // Combine base styles with custom styles from database
  const combinedStyles = `
    ${baseArticleStyles}
    ${article.customStyles || ''}
  `;

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main className="wrap py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-6 pt-2 pb-1 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/news" className="hover:text-[var(--color-green)] transition-colors">
            News
          </Link>
          <span className="opacity-40">/</span>
          <Link href={`/news/category/${article.categorySlug || article.category}`} className="hover:text-[var(--color-green)] transition-colors">
            {categoryName}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold truncate max-w-[200px]">{article.title}</span>
        </nav>

        <ArticleDetailClient
          article={{
            ...article,
            categoryIcon: categoryIcon,
            categoryColor: categoryColor,
          }}
          relatedArticles={relatedArticles}
          categoryName={categoryName}
          categoryIcon={categoryIcon}
          categoryColor={categoryColor}
          formattedDate={formattedDate}
          tagsArray={tagsArray}
          content={content}
          styles={combinedStyles}
        />
      </main>
      <Footer />
    </div>
  );
}