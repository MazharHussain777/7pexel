// app/technology/page.tsx
import { Metadata } from "next";
import { TechnologyClient } from "./TechnologyClient";
import { connectToDatabase } from "@/lib/db/mongodb";
import TechnologyArticle from "@/lib/models/TechnologyArticle";
import TechnologyCategory from "@/lib/models/TechnologyCategory";

// ─── METADATA ──────────────────────────────────────────
export const metadata: Metadata = {
  title: "Technology — Latest Tech News, Expert Reviews & Buying Guides | 7pexel",
  description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, Green Tech, Cybersecurity, and more. Expert reviews, buying guides, and tech insights from industry professionals.",
  keywords: [
    "technology", "AI", "artificial intelligence", "quantum computing", 
    "AR/VR", "green tech", "cybersecurity", "space tech", "tech news",
    "gadget reviews", "tech buying guides", "smart home", "wearables",
    "audio", "gaming", "cameras", "tech trends 2026", "technology guides"
  ].join(", "),
  openGraph: {
    title: "Technology — Expert Reviews & Tech Guides | 7pexel",
    description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, Green Tech, and more.",
    type: "website",
    url: "https://7pexel.com/technology",
    siteName: "7pexel",
    locale: "en_US",
    images: [
      {
        url: "https://7pexel.com/images/og/technology-og.jpg",
        width: 1200,
        height: 630,
        alt: "Technology - 7pexel",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology — Expert Reviews & Tech Guides | 7pexel",
    description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, and more.",
    images: ["https://7pexel.com/images/og/technology-og.jpg"],
    site: "@7pexel",
    creator: "@7pexel",
  },
  alternates: {
    canonical: "https://7pexel.com/technology",
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

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyPage() {
  // ✅ Fetch data on server
  let articles: any[] = [];
  let categories: any[] = [];

  try {
    await connectToDatabase();
    
    const [articlesData, categoriesData] = await Promise.all([
      TechnologyArticle.find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(50)
        .populate('categoryId', 'name slug color icon')
        .lean(),
      TechnologyCategory.find({ isActive: true })
        .sort({ order: 1 })
        .lean(),
    ]);

    articles = articlesData;
    categories = categoriesData;
  } catch (error) {
    console.error('Error fetching technology data:', error);
  }

  // ✅ JSON-LD SCHEMA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Technology Guides & Reviews",
    "description": "Your ultimate technology destination with expert reviews, buying guides, and tech insights.",
    "url": "https://7pexel.com/technology",
    "about": {
      "@type": "Thing",
      "name": "Technology"
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://7pexel.com/images/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.slice(0, 10).map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://7pexel.com/technology/${article.slug}`,
        "name": article.title,
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TechnologyClient 
        initialArticles={JSON.parse(JSON.stringify(articles))}
        initialCategories={JSON.parse(JSON.stringify(categories))}
      />
    </>
  );
}