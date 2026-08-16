// app/technology/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TechnologyHeader } from "@/components/technology/slug/TechnologyHeader";
import { TechnologyContent } from "@/components/technology/slug/TechnologyContent";
import { TechnologySidebar } from "@/components/technology/slug/TechnologySidebar";
import { connectToDatabase } from "@/lib/db/mongodb";
import TechnologyArticle from "@/lib/models/TechnologyArticle";
// ✅ IMPORT THESE - CRITICAL FOR POPULATE TO WORK
import TechnologyCategory from "@/lib/models/TechnologyCategory";
import TechnologySubCategory from "@/lib/models/TechnologySubCategory";

// ─── FETCH ARTICLE DIRECTLY FROM DATABASE ──────────────
async function getArticle(slug: string) {
  try {
    await connectToDatabase();
    
    // ✅ Now models are registered
    const article = await TechnologyArticle.findOne({ slug, isPublished: true })
      .populate('categoryId', 'name slug description color icon metaTitle metaDescription')
      .populate('subCategoryId', 'name slug description color icon metaTitle metaDescription')
      .lean();
    
    if (!article) {
      console.log(`❌ Article not found: ${slug}`);
      return null;
    }
    
    // Get related articles
    const relatedArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon')
      .lean();
    
    // Get popular articles
    const popularArticles = await TechnologyArticle.find({
      categorySlug: article.categorySlug,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .sort({ views: -1, publishedAt: -1 })
      .limit(4)
      .populate('categoryId', 'name slug color icon')
      .lean();
    
    // Increment views in background
    TechnologyArticle.findByIdAndUpdate(
      article._id,
      { $inc: { views: 1 } }
    ).catch(err => console.error('Failed to increment views:', err));
    
    return {
      article,
      relatedArticles,
      popularArticles,
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// ─── GENERATE STATIC PARAMS ──────────────────────────
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    
    const articles = await TechnologyArticle.find(
      { isPublished: true },
      { slug: 1 }
    ).lean();
    
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
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
        url: `https://www.7pexel.com/technology/${article.slug}`,
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
        canonical: `https://www.7pexel.com/technology/${article.slug}`,
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Article Not Found | 7pexel Technology",
      description: "The technology article you're looking for doesn't exist.",
      robots: { index: false },
    };
  }
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    
    if (!slug || typeof slug !== 'string') {
      console.error('Invalid slug:', slug);
      notFound();
    }
    
    const result = await getArticle(slug);
    
    if (!result) {
      console.error(`❌ Article not found for slug: ${slug}`);
      notFound();
    }
    
    const { article, relatedArticles, popularArticles } = result;
    
    // JSON-LD structured data
    const jsonLd = {
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
          "url": "https://www.7pexel.com/images/logo.png",
        },
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.7pexel.com/technology/${article.slug}`,
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
    
    // Breadcrumb JSON-LD
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.7pexel.com/" },
        { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://www.7pexel.com/technology" },
        { 
          "@type": "ListItem", 
          "position": 3, 
          "name": article.categoryId?.name || article.categorySlug, 
          "item": `https://www.7pexel.com/technology/category/${article.categorySlug}` 
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
  } catch (error) {
    console.error('Error rendering article page:', error);
    notFound();
  }
}