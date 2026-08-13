// components/laptops/finder/LaptopJsonLd.tsx
"use client";

interface Laptop {
  _id: string;
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  canonical?: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

interface LaptopJsonLdProps {
  laptop: Laptop;
  pageUrl: string;
  siteUrl: string;
}

export function LaptopJsonLd({ laptop, pageUrl, siteUrl }: LaptopJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${laptop.brand} ${laptop.model}`,
    description: laptop.contentHtml?.replace(/<[^>]*>/g, '').slice(0, 200) || `${laptop.brand} ${laptop.model} specifications and review.`,
    image: laptop.image,
    brand: {
      "@type": "Brand",
      name: laptop.brand,
    },
    model: laptop.model,
    sku: laptop.id,
    offers: {
      "@type": "Offer",
      price: laptop.price.replace(/[$,]/g, ''),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: laptop.rating,
      reviewCount: 42,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: laptop.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: laptop.rating,
      },
      reviewBody: laptop.pros?.join(". ") || "",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default LaptopJsonLd;