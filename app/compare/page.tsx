// @ts-nocheck
// app/compare/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";
import CompareClient from "./CompareClient";

// ============= INTERFACE =============
interface ComparePageProps {
  searchParams: Promise<{ phones?: string }>;
}

// ============= FETCH PHONES FOR SEO =============
async function getPhonesForSEO(slugs: string[]) {
  if (slugs.length === 0) return [];
  try {
    await connectToDatabase();
    return await Phone.find({ slug: { $in: slugs } }).lean();
  } catch (error) {
    console.error("Error fetching phones for SEO:", error);
    return [];
  }
}

// ============= GENERATE AGGRESSIVE KEYWORD-RICH METADATA =============
export async function generateMetadata({ 
  searchParams 
}: ComparePageProps): Promise<Metadata> {
  const params = await searchParams;
  const phonesParam = params.phones || "";
  const slugs = phonesParam.split(",").filter(Boolean);
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://7pexel.com";
  
  if (slugs.length === 0) {
    return {
      title: "Compare Smartphones 2026 - Side by Side Specs, Camera, Battery & Price Comparison | 7pexel",
      description: "Compare smartphones side by side. Full specifications, camera quality, battery life, performance benchmarks, and pricing. Find the best phone for you.",
      robots: { index: true, follow: true },
    };
  }

  const phones = await getPhonesForSEO(slugs);
  
  if (phones.length === 0) {
    return {
      title: "Smartphone Comparison - Compare Phones Side by Side | 7pexel",
      description: "Compare smartphones specifications, features, and prices.",
      robots: { index: true, follow: true },
    };
  }

  // Build dynamic content
  const phoneNames = phones.map(p => `${p.brand} ${p.name}`).join(" vs ");
  const shortNames = phones.map(p => p.name).join(" vs ");
  const brands = phones.map(p => p.brand).join(" vs ");
  const years = phones.map(p => p.year).filter(Boolean).join(", ");
  
  // Get key specs for description
  const specsSummary = phones.map(p => {
    const specs = [];
    if (p.specs?.display) specs.push(`${p.specs.display} display`);
    if (p.specs?.chipset) specs.push(p.specs.chipset);
    if (p.specs?.camera) specs.push(`${p.specs.camera} camera`);
    if (p.specs?.battery) specs.push(`${p.specs.battery} battery`);
    if (p.specs?.ram) specs.push(`${p.specs.ram} RAM`);
    if (p.specs?.storage) specs.push(`${p.specs.storage} storage`);
    return `${p.brand} ${p.name}: ${specs.join(", ")}`;
  }).join(" | ");

  const compareUrl = `${siteUrl}/compare?phones=${slugs.join(",")}`;

  // ============= AGGRESSIVE TITLE KEYWORDS =============
  let title = "";
  const p1 = phones[0];
  const p2 = phones[1];
  const p3 = phones[2];

  if (phones.length === 2) {
    // 2-phone comparison - Most search queries
    title = [
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} Comparison 2026`,
      `${p1.name} vs ${p2.name} - Which is Better? Full Specs, Camera, Battery & Performance`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Complete Comparison Review`,
      `${p1.brand} vs ${p2.brand} - ${p1.name} vs ${p2.name} Specifications, Price & Features`,
      `${p1.name} vs ${p2.name} Comparison - Display, Processor, Camera & Battery Life`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Which Phone Should You Buy?`,
      `${p1.name} or ${p2.name} - Full Specs Comparison & Review ${p1.year || ""} vs ${p2.year || ""}`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} - Camera, Battery, Performance & Price`,
      `${p1.name} vs ${p2.name} Comparison - The Ultimate Smartphone Battle`,
      `${p1.brand} vs ${p2.brand} - ${p1.name} vs ${p2.name} Full Specifications`,
    ].join(" | ");
  } else if (phones.length === 3) {
    // 3-phone comparison
    title = [
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} vs ${p3.brand} ${p3.name} Comparison 2026`,
      `${p1.name} vs ${p2.name} vs ${p3.name} - Which is Best? Full Specs, Camera & Battery`,
      `${p1.brand} vs ${p2.brand} vs ${p3.brand} - ${p1.name} vs ${p2.name} vs ${p3.name} Complete Review`,
      `${p1.name} vs ${p2.name} vs ${p3.name} Comparison - Display, Processor, Camera & Battery Life`,
      `${p1.brand} ${p1.name} vs ${p2.brand} ${p2.name} vs ${p3.brand} ${p3.name} - Which Phone Wins?`,
      `3-Way Smartphone Battle: ${p1.name} vs ${p2.name} vs ${p3.name} - Full Specs Comparison`,
      `${p1.name}, ${p2.name} & ${p3.name} Compared - Camera, Battery, Performance & Price`,
      `${p1.brand} vs ${p2.brand} vs ${p3.brand} - ${p1.year || ""} vs ${p2.year || ""} vs ${p3.year || ""} Phones`,
    ].join(" | ");
  } else {
    // Multi-phone comparison
    title = [
      `${phoneNames} Comparison - Complete Specs, Camera, Battery & Performance Review`,
      `${shortNames} - Full Comparison of ${phones.length} Smartphones`,
      `Compare ${phones.length} Phones: ${shortNames} - Which One is Best?`,
    ].join(" | ");
  }

  // ============= AGGRESSIVE DESCRIPTION KEYWORDS =============
  const description = [
    `Compare ${phoneNames} side by side.`,
    `Full specifications comparison including display, processor, camera, battery, RAM, storage, and more.`,
    `${p1?.brand} ${p1?.name} features ${p1?.specs?.camera || "powerful"} camera, ${p1?.specs?.battery || "long-lasting"} battery, and ${p1?.specs?.chipset || "fast"} processor.`,
    `${p2?.brand} ${p2?.name} offers ${p2?.specs?.display || "stunning"} display, ${p2?.specs?.camera || "excellent"} camera, and ${p2?.specs?.battery || "great"} battery life.`,
    `Which phone is better? Read our detailed comparison to find out.`,
    `${specsSummary}`,
  ].join(" ");

  // ============= AGGRESSIVE KEYWORDS =============
  const keywords = [
    // Brand + Name combinations
    ...phones.map(p => `${p.brand} ${p.name}`),
    ...phones.map(p => `${p.name} specs`),
    ...phones.map(p => `${p.brand} ${p.name} review`),
    ...phones.map(p => `${p.brand} ${p.name} price`),
    ...phones.map(p => `${p.brand} ${p.name} camera`),
    ...phones.map(p => `${p.brand} ${p.name} battery`),
    ...phones.map(p => `${p.brand} ${p.name} display`),
    ...phones.map(p => `${p.brand} ${p.name} processor`),
    ...phones.map(p => `${p.brand} ${p.name} RAM`),
    ...phones.map(p => `${p.brand} ${p.name} storage`),
    
    // Comparison phrases
    `${p1?.brand} vs ${p2?.brand}`,
    `${p1?.name} vs ${p2?.name}`,
    `${p1?.brand} ${p1?.name} vs ${p2?.brand} ${p2?.name}`,
    `${p1?.name} vs ${p2?.name} comparison`,
    `compare ${p1?.name} vs ${p2?.name}`,
    `${p1?.brand} vs ${p2?.brand} comparison`,
    `which is better ${p1?.name} or ${p2?.name}`,
    `${p1?.name} or ${p2?.name}`,
    
    // Year-specific
    ...phones.map(p => `${p.brand} ${p.name} ${p.year || ""}`),
    ...phones.map(p => `${p.name} ${p.year || ""}`),
    `${p1?.brand} ${p1?.name} vs ${p2?.brand} ${p2?.name} ${p1?.year || ""}`,
    
    // General keywords
    "phone comparison",
    "smartphone comparison",
    "compare phones",
    "specs comparison",
    "phone specs",
    "smartphone specs",
    "best phone",
    "phone review",
    "smartphone review",
    "phone camera comparison",
    "battery comparison",
    "performance comparison",
    "phone price comparison",
    "flagship phone",
    "best smartphone",
    "mobile comparison",
    "cell phone comparison",
    "phone battle",
    "specs comparison",
    "phone features",
    "smartphone features",
    "tech comparison",
    "gadget comparison",
    
    // Tags from phones
    ...phones.flatMap(p => p.tags || []),
  ].filter(Boolean).join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "7pexel Team", url: siteUrl }],
    creator: "7pexel",
    publisher: "7pexel",
    
    openGraph: {
      title: `${phoneNames} Comparison - Full Specs, Camera, Battery & Performance Review`,
      description: `Compare ${phoneNames} side by side. ${specsSummary}. Which phone is better? Find out with our detailed comparison.`,
      url: compareUrl,
      siteName: "7pexel",
      images: phones.map(p => ({
        url: p.image || `${siteUrl}/images/default-phone.jpg`,
        width: 1200,
        height: 630,
        alt: `${p.brand} ${p.name} vs ${phones[0]?.brand} ${phones[0]?.name}`,
      })),
      type: "website",
      locale: "en_US",
    },
    
    twitter: {
      card: "summary_large_image",
      site: "@7pexel",
      creator: "@7pexel",
      title: `${p1?.name} vs ${p2?.name} - Full Comparison`,
      description: `Compare ${phoneNames} - Camera, battery, performance, display, and more.`,
      images: phones.map(p => p.image || `${siteUrl}/images/default-phone.jpg`),
    },
    
    alternates: {
      canonical: compareUrl,
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
    
    other: {
      'article:section': 'Technology',
      'article:tag': phones.map(p => p.name).join(', '),
      'product:brand': phones.map(p => p.brand).join(', '),
      'product:category': 'Smartphones',
    },
  };
}

// ============= PAGE COMPONENT =============
export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const phonesParam = params.phones || "";
  const slugs = phonesParam.split(",").filter(Boolean);
  
  let phonesData: any[] = [];
  let comparisonTitle = "Compare Smartphones";
  
  if (slugs.length > 0) {
    try {
      await connectToDatabase();
      phonesData = await Phone.find({ 
        slug: { $in: slugs } 
      }).lean();
      
      if (phonesData.length > 0) {
        comparisonTitle = phonesData.map(p => `${p.brand} ${p.name}`).join(" vs ");
      }
    } catch (error) {
      console.error("Error fetching phones for compare:", error);
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://7pexel.com";
  const compareUrl = `${siteUrl}/compare?phones=${slugs.join(",")}`;
  const p1 = phonesData[0];
  const p2 = phonesData[1];
  const p3 = phonesData[2];

  // ============= JSON-LD STRUCTURED DATA =============
  
  // 1. Comparison Schema
  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": compareUrl,
    "name": `${comparisonTitle} Comparison - Which is Better? Full Specs & Review | 7pexel`,
    "description": `Compare ${comparisonTitle} side by side. Full specifications, camera, battery, performance, and pricing comparison.`,
    "url": compareUrl,
    "about": {
      "@type": "Thing",
      "name": "Phone Comparison",
      "description": "Side by side comparison of smartphone specifications and features."
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": phonesData.map((phone, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${phone.brand} ${phone.name}`,
          "brand": {
            "@type": "Brand",
            "name": phone.brand
          },
          "image": phone.image || `${siteUrl}/images/default-phone.jpg`,
          "description": `${phone.brand} ${phone.name} (${phone.year}) with ${phone.specs?.chipset || ""} processor, ${phone.specs?.camera || ""} camera, ${phone.specs?.battery || ""} battery, and ${phone.specs?.display || ""} display.`,
          "offers": {
            "@type": "Offer",
            "price": phone.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
            "priceCurrency": "USD"
          }
        }
      }))
    }
  };

  // 2. Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Phone Finder",
        "item": `${siteUrl}/phone-finder`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Compare",
        "item": compareUrl
      }
    ]
  };

  // 3. FAQ Schema - Aggressive keyword targeting
  const faqQuestions = [];
  
  if (phonesData.length >= 2) {
    // Which is better?
    faqQuestions.push({
      "@type": "Question",
      "name": `Which is better, ${p1?.brand} ${p1?.name} or ${p2?.brand} ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Both ${p1?.brand} ${p1?.name} and ${p2?.brand} ${p2?.name} are excellent flagship smartphones. ${p1?.brand} ${p1?.name} features ${p1?.specs?.camera || "amazing"} camera quality with ${p1?.specs?.cameraWide || "multiple"} lenses, ${p1?.specs?.battery || "long-lasting"} battery life with ${p1?.specs?.wiredCharging || "fast"} charging, and ${p1?.specs?.chipset || "powerful"} performance. ${p2?.brand} ${p2?.name} offers ${p2?.specs?.display || "stunning"} ${p2?.specs?.displayType || "OLED"} display, ${p2?.specs?.camera || "excellent"} camera system, and ${p2?.specs?.chipset || "high-performance"} processor. Choose ${p1?.brand} if you prioritize ${p1?.specs?.camera || "camera"} and battery, or ${p2?.brand} if you prefer display and performance.`
      }
    });

    // Camera comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better camera: ${p1?.name} vs ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Camera comparison: ${p1?.brand} ${p1?.name} has ${p1?.specs?.camera || "a"} camera system with ${p1?.specs?.cameraWide || "wide"} lens and ${p1?.specs?.cameraUltraWide || "ultra-wide"} lens, while ${p2?.brand} ${p2?.name} features ${p2?.specs?.camera || "a"} camera setup with ${p2?.specs?.cameraWide || "wide"} lens. Both support ${p1?.specs?.videoRecording || "4K"} video recording and ${p1?.specs?.cameraFeatures || "advanced"} camera features. ${p1?.brand} excels in ${p1?.specs?.cameraTelephoto || "zoom"} capabilities, while ${p2?.brand} offers better ${p2?.specs?.cameraUltraWide || "ultra-wide"} shots.`
      }
    });

    // Battery comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better battery life: ${p1?.name} or ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Battery comparison: ${p1?.brand} ${p1?.name} has ${p1?.specs?.battery || "a"} battery with ${p1?.specs?.wiredCharging || "fast"} wired charging and ${p1?.specs?.wirelessCharging || "wireless"} charging support. ${p2?.brand} ${p2?.name} features ${p2?.specs?.battery || "a"} battery with ${p2?.specs?.wiredCharging || "fast"} charging. ${p1?.brand} ${p1?.name} offers ${p1?.specs?.batteryTechnology || "advanced"} battery technology and ${p1?.specs?.videoPlayback || "long"} playback time. ${p2?.brand} ${p2?.name} provides ${p2?.specs?.battery || "competitive"} battery life with ${p2?.specs?.wirelessCharging || "wireless"} charging support.`
      }
    });

    // Display comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone has better display: ${p1?.name} vs ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Display comparison: ${p1?.brand} ${p1?.name} features a ${p1?.specs?.display || "large"} ${p1?.specs?.displayType || "OLED"} display with ${p1?.specs?.resolution || "high"} resolution and ${p1?.specs?.refreshRate || "smooth"} refresh rate. ${p2?.brand} ${p2?.name} offers a ${p2?.specs?.display || "large"} ${p2?.specs?.displayType || "OLED"} display with ${p2?.specs?.resolution || "high"} resolution and ${p2?.specs?.refreshRate || "smooth"} refresh rate. Both support ${p1?.specs?.hdrSupport || "HDR"} and have ${p1?.specs?.protection || "gorilla glass"} protection. ${p1?.brand} ${p1?.name} has ${p1?.specs?.brightness || "high"} brightness, while ${p2?.brand} ${p2?.name} offers ${p2?.specs?.pixelDensity || "sharp"} pixel density.`
      }
    });

    // Performance comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `Which phone is faster: ${p1?.name} or ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Performance comparison: ${p1?.brand} ${p1?.name} is powered by ${p1?.specs?.chipset || "a"} processor with ${p1?.specs?.cpu || "powerful"} CPU and ${p1?.specs?.gpu || "fast"} GPU, coupled with ${p1?.specs?.ram || "ample"} RAM and ${p1?.specs?.storage || "large"} storage. ${p2?.brand} ${p2?.name} features ${p2?.specs?.chipset || "a"} processor with ${p2?.specs?.cpu || "powerful"} CPU and ${p2?.specs?.gpu || "fast"} GPU, ${p2?.specs?.ram || "ample"} RAM and ${p2?.specs?.storage || "large"} storage. Both phones offer ${p1?.specs?.chipset || "flagship-level"} performance and ${p1?.benchmarks?.antutu || "excellent"} benchmark scores.`
      }
    });

    // Price comparison
    if (phonesData.length >= 2) {
      const prices = phonesData.map(p => {
        const price = p.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "N/A";
        return `${p.brand} ${p.name}: $${price}`;
      }).join(" vs ");
      faqQuestions.push({
        "@type": "Question",
        "name": `Which is cheaper: ${p1?.name} or ${p2?.name}? Price comparison`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Price comparison: ${prices}. ${p1?.brand} ${p1?.name} is priced at ${p1?.specs?.pricing?.[0] || "contact for pricing"} with models including ${p1?.specs?.models?.join(", ") || "various storage variants"}. ${p2?.brand} ${p2?.name} starts at ${p2?.specs?.pricing?.[0] || "contact for pricing"} with ${p2?.specs?.models?.join(", ") || "multiple storage options"}. ${p1?.brand} ${p1?.name} offers ${p1?.specs?.pricing?.length || "various"} pricing options, while ${p2?.brand} ${p2?.name} provides ${p2?.specs?.pricing?.length || "various"} price points.`
        }
      });
    }

    // Features comparison
    faqQuestions.push({
      "@type": "Question",
      "name": `What are the key differences between ${p1?.name} and ${p2?.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Key differences: ${p1?.brand} ${p1?.name} features ${p1?.specs?.displayType || "OLED"} display, ${p1?.specs?.chipset || "flagship"} processor, ${p1?.specs?.camera || "advanced"} camera, ${p1?.specs?.battery || "large"} battery with ${p1?.specs?.wiredCharging || "fast"} charging. ${p2?.brand} ${p2?.name} offers ${p2?.specs?.displayType || "OLED"} display, ${p2?.specs?.chipset || "flagship"} processor, ${p2?.specs?.camera || "advanced"} camera, ${p2?.specs?.battery || "large"} battery with ${p2?.specs?.wiredCharging || "fast"} charging. ${p1?.brand} excels in ${p1?.specs?.camera || "camera"} and ${p1?.specs?.battery || "battery"}, while ${p2?.brand} stands out with ${p2?.specs?.display || "display"} and ${p2?.specs?.chipset || "performance"}.`
      }
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions
  };

  // 4. Product Comparison Schema
  const productComparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${phonesData.map(p => p.name).join(" vs ")} Comparison`,
    "description": `Compare ${phonesData.map(p => `${p.brand} ${p.name}`).join(" vs ")} specifications side by side. Full camera, battery, performance, display comparison.`,
    "brand": {
      "@type": "Brand",
      "name": phonesData.map(p => p.brand).join(", ")
    },
    "offers": phonesData.map(p => ({
      "@type": "Offer",
      "price": p.specs?.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
      "priceCurrency": "USD",
      "itemOffered": {
        "@type": "Product",
        "name": `${p.brand} ${p.name}`,
        "image": p.image || `${siteUrl}/images/default-phone.jpg`
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      {/* ===== ALL JSON-LD STRUCTURED DATA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqQuestions.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {phonesData.length >= 2 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productComparisonJsonLd) }}
        />
      )}

      {/* ===== HIDDEN HEADINGS FOR KEYWORD TARGETING ===== */}
      <h1 className="sr-only">
        {comparisonTitle} Comparison 2026 - Full Specs, Camera, Battery & Performance Review | 7pexel
      </h1>
      
      <h2 className="sr-only">
        Compare {phonesData.map(p => `${p.brand} ${p.name}`).join(", ")} - Specifications, Camera Quality, Battery Life, Performance Benchmarks & Pricing
      </h2>

      <h3 className="sr-only">
        {p1?.brand} {p1?.name} vs {p2?.brand} {p2?.name} - Which Phone is Better? Complete Comparison Guide
      </h3>

      {/* ===== CLIENT COMPONENT ===== */}
      <Suspense fallback={<CompareSkeleton />}>
        <CompareClient initialPhones={phonesData} />
      </Suspense>
    </div>
  );
}

// ============= SKELETON COMPONENT =============
function CompareSkeleton() {
  return (
    <div className="w-[77vw] max-w-[77vw] mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-56 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
        <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-[220px] flex-shrink-0">
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-1" />
            </div>
          ))}
        </div>
        <div className="space-y-4 mt-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}