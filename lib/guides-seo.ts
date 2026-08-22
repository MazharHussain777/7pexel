// lib/guides-seo.ts

export function generateGuideSchema(guide: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.excerpt,
    "image": guide.image || "/og-guides.jpg",
    "datePublished": guide.date,
    "dateModified": guide.date,
    "author": {
      "@type": "Person",
      "name": guide.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://7pexel.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://7pexel.com/guides/${guide.slug}`
    },
    "about": {
      "@type": "Thing",
      "name": guide.category
    },
    "keywords": guide.tags.join(", "),
    "articleSection": guide.category,
    "wordCount": guide.content?.split(/\s+/).length || 0,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
  };
}

export function generateBreadcrumbSchema(guide: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://7pexel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://7pexel.com/guides" },
      { "@type": "ListItem", "position": 3, "name": guide.category, "item": `https://7pexel.com/guides/category/${guide.categorySlug}` },
      { "@type": "ListItem", "position": 4, "name": guide.title },
    ]
  };
}