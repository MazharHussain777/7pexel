// components/phones/finder/PhoneJsonLd.tsx
"use client";

import { Phone } from "@/lib/phone-data";

interface PhoneJsonLdProps {
  phone: Phone;
  pageUrl: string;
  siteUrl: string;
}

export function PhoneJsonLd({ phone, pageUrl, siteUrl }: PhoneJsonLdProps) {
  const fullName = `${phone.brand} ${phone.model}`;
  const year = phone.year || "2026";
  const seo = phone.seo || {};
  
  const chipsetName = phone.chipset?.charAt(0).toUpperCase() + phone.chipset?.slice(1) || "N/A";
  const displayMain = phone.display === "large" ? "6.7\"+" : phone.display === "medium" ? "6.1-6.7\"" : "Under 6.1\"";
  const cameraName = phone.camera?.charAt(0).toUpperCase() + phone.camera?.slice(1) || "N/A";
  const batteryMain = `${phone.battery}mAh`;
  const osName = phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1) || "Android";

  // Use FAQ schema from SEO data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (seo.faqSchema || [
      {
        question: `What is the price of ${fullName}?`,
        answer: `The ${fullName} (${year}) is priced at $${phone.price}. Available in multiple colors including ${phone.colors?.join(', ') || 'Black and White'}.`
      },
      {
        question: `What is the camera quality of ${fullName}?`,
        answer: `The ${fullName} features a ${cameraName} camera system with ${phone.cameraDetails || 'advanced'} features. Supports 4K video recording with OIS and HDR support.`
      },
      {
        question: `What is the battery life of ${fullName}?`,
        answer: `The ${fullName} comes with a ${batteryMain} battery supporting fast charging. Offers up to 20 hours of video playback.`
      },
      {
        question: `What is the ${fullName} display size?`,
        answer: `The ${fullName} features a ${displayMain} AMOLED display with high refresh rate and HDR support.`
      },
      {
        question: `What chipset does ${fullName} use?`,
        answer: `The ${fullName} is powered by the ${chipsetName} chipset with ${phone.ram}GB RAM and ${phone.storage}GB storage.`
      }
    ]).map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Product Schema with SEO data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": seo.schemaType || "Product",
    "@id": `${pageUrl}#product`,
    "name": fullName,
    "description": seo.metaDescription || `Complete specifications of the ${fullName} (${year}) with ${chipsetName} processor, ${cameraName} camera, and ${batteryMain} battery.`,
    "brand": {
      "@type": "Brand",
      "name": phone.brand,
    },
    "model": phone.model,
    "mpn": phone.model,
    "sku": phone.model,
    "image": phone.image || `${siteUrl}/images/default-phone.jpg`,
    "releaseDate": `${year}-01-01`,
    "manufacturer": {
      "@type": "Organization",
      "name": phone.brand,
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Display", "value": displayMain },
      { "@type": "PropertyValue", "name": "Refresh Rate", "value": `${phone.refresh_rate || '120'}Hz` },
      { "@type": "PropertyValue", "name": "Chipset", "value": chipsetName },
      { "@type": "PropertyValue", "name": "RAM", "value": `${phone.ram}GB` },
      { "@type": "PropertyValue", "name": "Storage", "value": `${phone.storage}GB` },
      { "@type": "PropertyValue", "name": "Camera", "value": cameraName },
      { "@type": "PropertyValue", "name": "Battery", "value": batteryMain },
      { "@type": "PropertyValue", "name": "Operating System", "value": osName },
      { "@type": "PropertyValue", "name": "Charging Speed", "value": `${phone.charging || '45'}W` },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": seo.reviewSchema?.[0]?.rating || phone.rating || 4.5,
      "reviewCount": "125",
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": (seo.reviewSchema || []).map((review: any) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author || "7pexel Team"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || 4.5,
        "bestRating": "5"
      },
      "reviewBody": review.reviewBody || `The ${fullName} is an impressive smartphone with great features.`
    })),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": phone.price || "999",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "url": pageUrl,
      "seller": {
        "@type": "Organization",
        "name": "7pexel",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    "datePublished": phone.createdAt || new Date().toISOString(),
    "dateModified": phone.updatedAt || new Date().toISOString(),
    "isFamilyFriendly": true,
    "mobileUrl": pageUrl,
    "category": "Electronics > Smartphones",
    "inLanguage": "en-US",
    "keywords": (seo.metaKeywords || []).join(', '),
    "about": {
      "@type": "Thing",
      "name": fullName,
      "description": `Review and specifications of ${fullName}`
    }
  };

  // Breadcrumb Schema from SEO data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": (seo.breadcrumbList || [
      { name: "Home", url: siteUrl, position: 1 },
      { name: "Phones", url: `${siteUrl}/phones`, position: 2 },
      { name: "Phone Finder", url: `${siteUrl}/phones/finder`, position: 3 },
      { name: fullName, url: pageUrl, position: 4 }
    ]).map((item: any) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url
    }))
  };

  // Organization Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "7pexel",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "7pexel - Your trusted source for smartphone reviews, tech news, and buying guides.",
    "email": "info@7pexel.com",
    "sameAs": [
      "https://twitter.com/7pexel",
      "https://facebook.com/7pexel",
      "https://instagram.com/7pexel",
      "https://youtube.com/7pexel"
    ],
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "7pexel Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  // Article Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seo.metaTitle || `${fullName} Review and Specifications`,
    "description": seo.metaDescription || `Complete review of ${fullName}`,
    "image": phone.image || `${siteUrl}/images/default-phone.jpg`,
    "author": {
      "@type": "Person",
      "name": phone.author || "7pexel Team",
      "url": `${siteUrl}/authors/${phone.author?.toLowerCase().replace(/\s+/g, '-') || '7pexel-team'}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": phone.createdAt || new Date().toISOString(),
    "dateModified": phone.updatedAt || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "keywords": (seo.metaKeywords || []).join(', '),
    "articleSection": "Smartphone Reviews",
    "wordCount": seo.wordCount || 1200,
    "about": {
      "@type": "Thing",
      "name": fullName,
      "description": `Detailed review and specifications of ${fullName}`
    }
  };

  // WebPage Schema
  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    "name": seo.metaTitle || `${fullName} Review | 7pexel`,
    "description": seo.metaDescription || `Complete review of ${fullName}`,
    "url": pageUrl,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "7pexel",
      "url": siteUrl
    },
    "breadcrumb": {
      "@id": `${pageUrl}#breadcrumb`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": phone.image || `${siteUrl}/images/default-phone.jpg`
    },
    "about": {
      "@type": "Thing",
      "name": fullName
    },
    "datePublished": phone.createdAt || new Date().toISOString(),
    "dateModified": phone.updatedAt || new Date().toISOString(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
    </>
  );
}