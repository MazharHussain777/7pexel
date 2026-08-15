// lib/seo/schemas.ts
export function generateArticleSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole || "Tech Expert",
      "url": article.authorUrl || `https://7pexel.com/authors/${article.author.toLowerCase().replace(/\s/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://7pexel.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://7pexel.com/technology/${article.slug}`
    },
    "keywords": article.tags?.join(", ") || "",
    "articleSection": article.categorySlug,
    "about": {
      "@type": "Thing",
      "name": article.categorySlug
    },
    "wordCount": article.content?.split(/\s+/).length || 0,
    "timeRequired": `${article.readTime || 10} minutes`,
    "educationalUse": "guide",
    "learningResourceType": "how-to guide",
    "interactivityType": "expositive"
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateCategorySchema(category: any, articles: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Guides | 7pexel Technology`,
    "description": category.description,
    "url": `https://7pexel.com/technology/category/${category.slug}`,
    "about": {
      "@type": "Thing",
      "name": category.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://7pexel.com/technology/${article.slug}`,
        "name": article.title
      }))
    }
  };
}

export function generateSearchBoxSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://7pexel.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://7pexel.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "7pexel",
    "url": "https://7pexel.com",
    "logo": "https://7pexel.com/images/logo.png",
    "description": "Expert technology reviews, buying guides, and insights from industry professionals.",
    "sameAs": [
      "https://twitter.com/7pexel",
      "https://facebook.com/7pexel",
      "https://linkedin.com/company/7pexel",
      "https://youtube.com/@7pexel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@7pexel.com"
    }
  };
}