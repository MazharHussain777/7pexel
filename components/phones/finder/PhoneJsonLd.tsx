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
  const chipsetName = phone.chipset?.charAt(0).toUpperCase() + phone.chipset?.slice(1) || "N/A";
  const displayMain = phone.display === "large" ? "6.7\"+" : phone.display === "medium" ? "6.1-6.7\"" : "Under 6.1\"";
  const cameraName = phone.camera?.charAt(0).toUpperCase() + phone.camera?.slice(1) || "N/A";
  const batteryMain = `${phone.battery}mAh`;
  const osName = phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1) || "Android";

  // Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    "name": fullName,
    "description": `Complete specifications of the ${fullName} (${year}) with ${chipsetName} processor, ${cameraName} camera, and ${batteryMain} battery. ${displayMain} display with ${phone.refresh_rate}Hz refresh rate.`,
    "brand": {
      "@type": "Brand",
      "name": phone.brand,
    },
    "model": phone.model,
    "mpn": phone.model,
    "sku": phone.model,
    "image": `${siteUrl}/images/phones/${phone.model.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
    "releaseDate": `${year}-01-01`,
    "manufacturer": {
      "@type": "Organization",
      "name": phone.brand,
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Display", "value": displayMain },
      { "@type": "PropertyValue", "name": "Refresh Rate", "value": `${phone.refresh_rate}Hz` },
      { "@type": "PropertyValue", "name": "Chipset", "value": chipsetName },
      { "@type": "PropertyValue", "name": "RAM", "value": `${phone.ram}GB` },
      { "@type": "PropertyValue", "name": "Storage", "value": `${phone.storage}GB` },
      { "@type": "PropertyValue", "name": "Camera", "value": cameraName },
      { "@type": "PropertyValue", "name": "Battery", "value": batteryMain },
      { "@type": "PropertyValue", "name": "Operating System", "value": osName },
      { "@type": "PropertyValue", "name": "Charging Speed", "value": `${phone.charging}W` },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "125",
      "bestRating": "5",
      "worstRating": "1",
    },
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
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "isFamilyFriendly": true,
    "mobileUrl": pageUrl,
    "category": "Electronics > Smartphones",
    "inLanguage": "en-US",
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Phones", "item": `${siteUrl}/phones` },
      { "@type": "ListItem", "position": 3, "name": "Phone Finder", "item": `${siteUrl}/phones/finder` },
      { "@type": "ListItem", "position": 4, "name": fullName, "item": pageUrl },
    ],
  };

  // FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of ${fullName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${fullName} (${year}) is priced at $${phone.price}. Available in multiple colors including Black, White, and Green.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the camera quality of ${fullName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${fullName} features a ${cameraName} camera system with a ${phone.price > 899 ? '50MP' : '48MP'} wide lens and ultra-wide lens. Supports 8K@30fps video recording with OIS and HDR support.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the battery life of ${fullName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${fullName} comes with a ${batteryMain} battery supporting ${phone.charging}W wired charging and ${phone.charging && phone.charging >= 25 ? '15W' : 'No'} wireless charging. Offers up to 20 hours of video playback.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the ${fullName} display size?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${fullName} features a ${displayMain} AMOLED display with ${phone.refresh_rate}Hz refresh rate, HDR10+ support, and up to ${phone.price > 899 ? '2000' : '1200'} nits brightness.`
        }
      },
      {
        "@type": "Question",
        "name": `What chipset does ${fullName} use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${fullName} is powered by the ${chipsetName} chipset with ${phone.ram}GB RAM and ${phone.storage}GB storage, delivering ${phone.price > 899 ? 'flagship' : 'high'} level performance.`
        }
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}