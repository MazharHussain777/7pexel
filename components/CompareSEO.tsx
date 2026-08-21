// components/CompareSEO.tsx
"use client";

import { useEffect } from 'react';

interface CompareSEOProps {
  phone1: {
    brand: string;
    model: string;
    price: string;
    year: string;
    image?: string;
    rating?: number;
  };
  phone2: {
    brand: string;
    model: string;
    price: string;
    year: string;
    image?: string;
    rating?: number;
  };
  baseUrl: string;
}

export function CompareSEO({ phone1, phone2, baseUrl }: CompareSEOProps) {
  useEffect(() => {
    // Remove existing scripts
    document.querySelectorAll('#compare-seo-script').forEach(el => el.remove());

    const script = document.createElement('script');
    script.id = 'compare-seo-script';
    script.type = 'application/ld+json';
    
    const jsonData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${phone1.brand} ${phone1.model} vs ${phone2.brand} ${phone2.model}`,
      "description": `Compare ${phone1.brand} ${phone1.model} vs ${phone2.brand} ${phone2.model} side by side. Full specs, camera, battery, and performance comparison.`,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": Math.min(parseFloat(phone1.price) || 0, parseFloat(phone2.price) || 0),
        "highPrice": Math.max(parseFloat(phone1.price) || 0, parseFloat(phone2.price) || 0),
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": (phone1.rating || 0 + phone2.rating || 0) / 2,
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "7pexel"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (phone1.rating || 0 + phone2.rating || 0) / 2,
        "reviewCount": "100"
      }
    };

    script.innerHTML = JSON.stringify(jsonData);
    document.head.appendChild(script);

    // Breadcrumb
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'compare-breadcrumb-script';
    breadcrumbScript.type = 'application/ld+json';
    
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Compare",
          "item": `${baseUrl}/compare`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${phone1.brand} ${phone1.model} vs ${phone2.brand} ${phone2.model}`,
          "item": `${baseUrl}/compare/${phone1.slug}-vs-${phone2.slug}`
        }
      ]
    };

    breadcrumbScript.innerHTML = JSON.stringify(breadcrumbData);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.querySelectorAll('#compare-seo-script, #compare-breadcrumb-script').forEach(el => el.remove());
    };
  }, [phone1, phone2, baseUrl]);

  return null;
}