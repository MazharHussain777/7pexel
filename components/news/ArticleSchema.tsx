"use client";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  category: string;
  tags: string[];
  slug: string;
  content?: string;
  isNews?: boolean;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  category,
  tags,
  slug,
  content,
  isNews = true,
}: ArticleSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const articleUrl = `${siteUrl}/news/${slug}`;
  const wordCount = content ? content.split(/\s+/).length : 0;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url || `${siteUrl}/author/${author.name.toLowerCase().replace(/\s/g, '-')}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "width": 512,
        "height": 512,
      },
      "url": siteUrl,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    "articleSection": category,
    "keywords": tags.join(', '),
    "wordCount": wordCount,
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": category,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}