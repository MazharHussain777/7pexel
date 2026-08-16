// app/technology/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TechnologyHeader } from "@/components/technology/slug/TechnologyHeader";
import { TechnologyContent } from "@/components/technology/slug/TechnologyContent";
import { TechnologySidebar } from "@/components/technology/slug/TechnologySidebar";

// ─── FETCH ARTICLE ────────────────────────────────────
async function getArticle(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles/${slug}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    
    if (data.success && data.data) {
      return {
        article: data.data.article,
        relatedArticles: data.data.relatedArticles || [],
        popularArticles: data.data.popularArticles || [],
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// ─── GENERATE STATIC PARAMS ──────────────────────────
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/technology/articles?limit=100&isPublished=true`
    );
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
  const result = await getArticle(slug);
  
  if (!result) {
    return {
      title: "Article Not Found | 7pexel Technology",
      description: "The technology article you're looking for doesn't exist.",
      robots: { index: false },
    };
  }
  
  const { article } = result;
  
  const title = article.metaTitle || `${article.title} | 7pexel Technology Guides`;
  const description = article.metaDescription || article.excerpt || `${article.title} - Expert guide and tutorial.`;
  
  return {
    title,
    description,
    keywords: article.keywords?.join(", ") || article.tags?.join(", ") || "",
    openGraph: {
      title,
      description,
      url: `https://7pexel.com/technology/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedDate || article.updatedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.image],
    },
    alternates: {
      canonical: article.canonicalUrl || `https://7pexel.com/technology/${article.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getArticle(slug);
  
  if (!result) {
    notFound();
  }
  
  const { article, relatedArticles, popularArticles } = result;
  
  // ✅ Enhanced JSON-LD structured data
  const jsonLd = article.structuredData || {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedDate || article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole || "Technology Expert",
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://7pexel.com/images/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://7pexel.com/technology/${article.slug}`,
    },
    "about": {
      "@type": "Thing",
      "name": article.categoryId?.name || article.categorySlug,
    },
    "keywords": article.tags?.join(", ") || "",
    "articleSection": article.categoryId?.name || article.categorySlug,
    "wordCount": article.content?.split(/\s+/).length || 0,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
  };
  
  // ✅ Add breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://7pexel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://7pexel.com/technology" },
      { 
        "@type": "ListItem", 
        "position": 3, 
        "name": article.categoryId?.name || article.categorySlug, 
        "item": `https://7pexel.com/technology/category/${article.categorySlug}` 
      },
      { "@type": "ListItem", "position": 4, "name": article.title },
    ],
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <div className="min-h-screen bg-[#fbfdfb]">
        <Header />
        
        <main className="wrap py-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ─── LEFT COLUMN ──────────────────────────── */}
            <div className="flex-1 min-w-0">
              <article>
                <TechnologyHeader
                  title={article.title}
                  excerpt={article.excerpt}
                  categorySlug={article.categorySlug}
                  categoryName={article.categoryId?.name || article.categorySlug}
                  difficulty={article.difficulty}
                  readTime={article.readTime}
                  isTrending={article.isTrending}
                  isFeatured={article.isFeatured}
                  author={article.author}
                  authorRole={article.authorRole}
                  authorAvatar={article.authorAvatar}
                  publishedAt={article.publishedAt}
                  updatedDate={article.updatedDate}
                  tags={article.tags}
                  image={article.image}
                  imageAlt={article.imageAlt}
                />
                
                <TechnologyContent
                  content={article.content}
                  tags={article.tags}
                />
              </article>
            </div>
            
            {/* ─── RIGHT COLUMN ─────────────────────────── */}
            <TechnologySidebar
              categorySlug={article.categorySlug}
              categoryName={article.categoryId?.name || article.categorySlug}
              publishedAt={article.publishedAt}
              readTime={article.readTime}
              difficulty={article.difficulty}
              tags={article.tags}
              relatedArticles={relatedArticles}
              popularArticles={popularArticles}
            />
          </div>
        </main>
      </div>
    </>
  );
}