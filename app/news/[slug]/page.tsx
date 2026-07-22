// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { ArticleComments } from "@/components/ArticleComments";
import { NewsletterSidebar } from "@/components/NewsletterSidebar";
import { ArticleSchema } from "@/components/news/ArticleSchema";
import { BreadcrumbSchema } from "@/components/news/BreadcrumbSchema";
import { ShareButtons } from "@/components/news/ShareButtons";
import { ReadingProgress } from "@/components/news/ReadingProgress";
import { TableOfContents } from "@/components/news/TableOfContents";
import { AuthorBio } from "@/components/news/AuthorBio";

// Revalidate every hour
export const revalidate = 3600;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/articles/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        title: "Article Not Found",
        description: "The article you're looking for doesn't exist.",
      };
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return {
        title: "Article Not Found",
        description: "The article you're looking for doesn't exist.",
      };
    }

    const article = result.data;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techblog.com";
    const articleUrl = `${siteUrl}/news/${article.slug}`;

    return {
      title: article.metaTitle || `${article.title} | Tech News | 7pexel`,
      description: article.metaDescription || article.excerpt,
      keywords: article.metaKeywords || article.tags?.join(", ") || "",
      authors: [{ name: article.author }],
      openGraph: {
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        url: articleUrl,
        siteName: "7pexel",
        images: [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.imageAlt || article.title,
          },
        ],
        type: "article",
        publishedTime: new Date(article.date).toISOString(),
        modifiedTime: article.updatedDate
          ? new Date(article.updatedDate).toISOString()
          : new Date(article.date).toISOString(),
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: "summary_large_image",
        site: "@7pexel",
        creator: "@7pexel",
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        images: [article.image],
      },
      alternates: {
        canonical: articleUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist.",
    };
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/articles?limit=1000`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return [];
    }

    return result.data.map((article: any) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// MAIN PAGE COMPONENT
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    // Fetch article from API
    const response = await fetch(`${baseUrl}/api/articles/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.log(`❌ Article not found: ${slug}`);
      // This will render the not-found.tsx in the same directory
      notFound();
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      console.log(`❌ Article data not found for slug: ${slug}`);
      notFound();
    }

    const article = result.data;

    // Get related articles
    const relatedArticles = article.relatedArticles || [];

    // Get author's articles count
    const authorArticlesCount = 0;

    const authorSlug = article.author?.toLowerCase().replace(/\s+/g, "-") || "";

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techblog.com";
    const articleUrl = `${siteUrl}/news/${article.slug}`;

    // Get author's expertise from their articles
    const authorExpertise = article.tags?.slice(0, 4) || [];

    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />

        {/* Reading Progress Bar */}
        <ReadingProgress />

        {/* Article Schema */}
        <ArticleSchema
          title={article.title}
          description={article.excerpt}
          image={article.image}
          datePublished={article.date}
          dateModified={article.updatedDate}
          author={{ name: article.author }}
          category={article.category}
          tags={article.tags || []}
          slug={article.slug}
          content={article.content}
          isNews={true}
        />

        {/* Breadcrumb Schema */}
        <BreadcrumbSchema
          items={[
            { name: "Home", item: "https://techblog.com/" },
            { name: "News", item: "https://techblog.com/news" },
            { name: article.title },
          ]}
        />

        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-[#6d4a4a] mb-6 overflow-x-auto"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[#7F011F] transition-colors flex-shrink-0"
            >
              <i className="fas fa-home" />
            </Link>
            <i className="fas fa-chevron-right text-[10px] flex-shrink-0" />
            <Link
              href="/news"
              className="hover:text-[#7F011F] transition-colors flex-shrink-0"
            >
              News
            </Link>
            <i className="fas fa-chevron-right text-[9px] flex-shrink-0" />
            <span className="text-[#7F011F] font-medium truncate max-w-[200px] md:max-w-none">
              {article.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <article
              className="lg:col-span-8"
              itemScope
              itemType="https://schema.org/NewsArticle"
            >
              {/* Article Header */}
              <header className="mb-8">
                {/* Category */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Link
                    href={`/news?category=${article.category}`}
                    className="bg-[#7F011F] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#a80a30] transition-colors"
                  >
                    {article.category}
                  </Link>
                  {article.isBreaking && (
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      Breaking
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#2d1a1a] leading-tight font-['Poppins',sans-serif] mb-3 max-w-4xl"
                  itemProp="headline"
                >
                  {article.title}
                </h1>

                {/* Headline */}
                <p
                  className="text-base md:text-md text-[#4a2a2a] leading-relaxed mb-4 max-w-3xl"
                  itemProp="description"
                >
                  {article.headline}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {/* Date */}
                  <span className="flex items-center gap-1.5 bg-[#7F011F]/5 px-3 py-1.5 rounded-full border border-[#7F011F]/10">
                    <i className="far fa-calendar-alt text-[#7F011F] text-xs" />
                    <span className="text-[#7F011F] font-medium">
                      {formatDate(article.date)}
                    </span>
                  </span>

                  {/* Views */}
                  <span className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                    <i className="far fa-eye text-purple-600 text-xs" />
                    <span className="text-purple-700 font-medium">
                      {article.views?.toLocaleString() || 0} views
                    </span>
                  </span>

                  {/* Author - Clickable */}
                  {article.author && (
                    <Link
                      href={`/news/author/${authorSlug}`}
                      className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all group"
                    >
                      <i className="far fa-user text-amber-600 text-xs" />
                      <span className="text-amber-700 font-medium group-hover:text-[#7F011F] transition-colors">
                        {article.author}
                      </span>
                      <i className="fas fa-arrow-right text-[8px] text-amber-400 group-hover:text-[#7F011F] transition-colors" />
                    </Link>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-[3px] overflow-hidden mb-6">
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                  itemProp="image"
                />
                {article.imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white text-xs p-3">
                    {article.imageCaption}
                  </div>
                )}
              </div>

              {/* Table of Contents */}
              <TableOfContents content={article.content} />

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none font-['Poppins',sans-serif] article-content text-[#2d1a1a]"
                dangerouslySetInnerHTML={{ __html: article.content }}
                itemProp="articleBody"
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[rgba(127,1,31,0.06)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[#6d4a4a] mr-1">
                      🏷️ Tags:
                    </span>
                    {article.tags.map((tag: string, index: number) => {
                      const colors = [
                        "bg-[#7F011F]/10 text-[#7F011F] hover:bg-[#7F011F]/20",
                        "bg-blue-50 text-blue-700 hover:bg-blue-100",
                        "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
                        "bg-purple-50 text-purple-700 hover:bg-purple-100",
                        "bg-orange-50 text-orange-700 hover:bg-orange-100",
                        "bg-pink-50 text-pink-700 hover:bg-pink-100",
                      ];
                      const colorClass = colors[index % colors.length];
                      return (
                        <Link
                          key={tag}
                          href={`/news?tag=${tag.toLowerCase()}`}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${colorClass}`}
                        >
                          #{tag.toLowerCase().replace(/\s/g, "")}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Share Buttons */}
              <ShareButtons url={articleUrl} title={article.title} className="mt-6" />

              {/* Author Bio */}
              {article.author && (
                <AuthorBio
                  name={article.author}
                  bio={
                    article.authorBio ||
                    `${article.author} is a technology journalist and expert in ${article.category}.`
                  }
                  image={article.authorImage}
                  articlesCount={authorArticlesCount}
                  joinedDate="2024"
                  expertise={authorExpertise.length > 0 ? authorExpertise : [article.category]}
                  socialLinks={{
                    twitter: `https://twitter.com/${article.author.toLowerCase().replace(/\s/g, "")}`,
                    linkedin: `https://linkedin.com/in/${article.author.toLowerCase().replace(/\s/g, "-")}`,
                  }}
                  showFullBio={false}
                />
              )}

              {/* Comments */}
              <div className="mt-8">
                <ArticleComments articleId={article._id} slug={slug} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <NewsletterSidebar />

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
                  <h3 className="text-lg font-bold text-[#2d1a1a] mb-4 font-['Poppins',sans-serif] flex items-center gap-2">
                    <i className="fas fa-link text-[#7F011F]" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related: any) => (
                      <Link
                        key={related._id}
                        href={`/news/${related.slug}`}
                        className="group flex gap-3 hover:bg-[#f5ebd0]/20 p-2 rounded-[3px] transition-all -mx-2"
                      >
                        <div className="relative w-20 h-20 rounded-[3px] overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#7F011F]">
                            {related.category}
                          </div>
                          <h4 className="text-sm font-semibold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif]">
                            {related.title}
                          </h4>
                          <div className="text-xs text-[#6d4a4a] mt-1">
                            {formatDate(related.date)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Sticky Sidebar Ad */}
              <div className="bg-gradient-to-br from-[#f5ebd0]/30 to-[#fbf8ff] rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)] text-center">
                <div className="text-xs text-[#6d4a4a] mb-2">Advertisement</div>
                <div className="bg-white/50 rounded-xl p-8 border border-dashed border-[rgba(127,1,31,0.1)]">
                  <i className="fas fa-ad text-3xl text-[#7F011F]/20 mb-2 block" />
                  <p className="text-sm text-[#6d4a4a]">Ad Space Available</p>
                  <p className="text-xs text-[#6d4a4a]/60">Contact us for advertising</p>
                </div>
              </div>
            </aside>
          </div>

          {/* Back to News */}
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-[#6d4a4a] hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]"
            >
              <i className="fas fa-arrow-left" />
              Back to News
            </Link>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("❌ Error loading article:", error);
    notFound();
  }
}