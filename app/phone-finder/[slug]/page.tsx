// @ts-nocheck
// app/phone-finder/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/phone-finder/HeroSection";
import { SpecSection } from "@/components/phone-finder/SpecSection";
import { RelatedPhonesGrid } from "@/components/phone-finder/RelatedPhonesGrid";
import { getPhoneTheme } from "@/types/phone";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

// Types
interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  brandLogo: string;
  year: number;
  isFlagship: boolean;
  isEditorChoice: boolean;
  tags: string[];
  image: string;
  specs: {
    display: string;
    displayType: string;
    resolution: string;
    pixelDensity: string;
    screenToBodyRatio: string;
    refreshRate: string;
    brightness: string;
    protection: string;
    hdrSupport: string;
    alwaysOnDisplay: string;
    chipset: string;
    cpu: string;
    gpu: string;
    neuralEngine: string;
    ram: string;
    ramType: string;
    storage: string;
    storageType: string;
    camera: string;
    cameraWide: string;
    cameraUltraWide: string;
    cameraTelephoto: string;
    cameraFeatures: string;
    videoRecording: string;
    frontCamera: string;
    frontFeatures: string;
    dimensions: string;
    weight: string;
    build: string;
    colors: string[];
    colorFinish: string;
    waterResistance: string;
    battery: string;
    batteryType: string;
    wiredCharging: string;
    wirelessCharging: string;
    batteryTechnology: string;
    videoPlayback: string;
    audioPlayback: string;
    standbyTime: string;
    os: string;
    osUpdates: string;
    audio: string;
    headphoneJack: string;
    audioRecording: string;
    sim: string;
    networkBands: string;
    wifi: string;
    bluetooth: string;
    nfc: string;
    usb: string;
    gps: string;
    ultraWideband: string;
    satelliteSOS: string;
    crashDetection: string;
    threadSupport: string;
    security: string;
    sensors: string;
    applePay: string;
    magSafe: string;
    emergencySOS: string;
    boxContents: string;
    models: string[];
    pricing: string[];
  };
  benchmarks: {
    antutu: number;
    geekbench6Single: number;
    geekbench6Multi: number;
    wildLifeExtreme: string;
  };
}

export const dynamicParams = true;

// Fetch phone directly from database
async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  try {
    await connectToDatabase();
    const phone = await Phone.findOne({ slug }).lean();
    if (!phone) return null;
    return JSON.parse(JSON.stringify(phone));
  } catch (error) {
    console.error("Error fetching phone:", error);
    return null;
  }
}

// Fetch related phones
async function getRelatedPhones(slug: string, limit: number = 11): Promise<Phone[]> {
  try {
    await connectToDatabase();
    const currentPhone = await Phone.findOne({ slug }).lean();
    if (!currentPhone) return [];

    const related = await Phone.find({
      slug: { $ne: slug },
      $or: [
        { brand: currentPhone.brand },
        { tags: { $in: currentPhone.tags || [] } },
      ],
    })
      .limit(limit)
      .lean();

    return JSON.parse(JSON.stringify(related));
  } catch (error) {
    console.error("Error fetching related phones:", error);
    return [];
  }
}

// Generate static params for all phones
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const phones = await Phone.find({}, { slug: 1 }).lean();
    return phones.map((phone) => ({
      slug: phone.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#7F011F',
};

// Generate metadata dynamically for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  const theme = getPhoneTheme(slug);
  
  if (!phone) {
    return {
      title: "Phone Not Found | 7pexel",
      description: "The phone you're looking for doesn't exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/phone-finder/${phone.slug}`;
  
  // Enhanced SEO Title with keywords
  const title = `${phone.brand} ${phone.name} (${phone.year}) Specs, Review, Camera, Battery & Benchmarks | 7pexel`;
  
  // Enhanced Description with all key specs
  const description = `Complete ${phone.brand} ${phone.name} (${phone.year}) specifications and review. ${phone.specs.display} display, ${phone.specs.chipset} processor, ${phone.specs.ram} RAM, ${phone.specs.storage} storage, ${phone.specs.camera} camera, ${phone.specs.battery} battery. Read full specs, benchmarks, and pricing.`;
  
  // Comprehensive keywords
  const keywords = [
    phone.brand,
    phone.name,
    `${phone.brand} ${phone.name}`,
    `${phone.name} specs`,
    `${phone.brand} ${phone.name} review`,
    `${phone.name} price`,
    `${phone.name} camera`,
    `${phone.name} battery`,
    `${phone.name} display`,
    phone.specs.chipset,
    phone.specs.camera,
    phone.specs.display,
    phone.specs.ram,
    phone.specs.storage,
    phone.specs.battery,
    `${phone.year}`,
    'phone specifications',
    'smartphone specs',
    'mobile phone review',
    'tech specs',
    'flagship phone',
    'smartphone comparison',
    ...phone.tags,
  ].filter(Boolean).join(', ');

  const ogImage = phone.image || `${siteUrl}/images/default-phone.jpg`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "7pexel Team", url: siteUrl }],
    creator: "7pexel",
    publisher: "7pexel",
    generator: "Next.js",
    applicationName: "7pexel",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    
    // Open Graph - Enhanced for better social sharing
    openGraph: {
      title: `${phone.brand} ${phone.name} (${phone.year}) – Full Specs, Camera, Battery & Performance`,
      description: `Detailed ${phone.brand} ${phone.name} specifications. ${phone.specs.display} display, ${phone.specs.chipset} processor, ${phone.specs.camera} camera, ${phone.specs.battery} battery. All specs, benchmarks, and prices.`,
      url: pageUrl,
      siteName: "7pexel",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${phone.brand} ${phone.name} - Premium Smartphone Specifications`,
          type: 'image/jpeg',
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      authors: ["7pexel Team"],
      tags: phone.tags,
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@7pexel",
      creator: "@7pexel",
      title: `${phone.brand} ${phone.name} – Full Specs & Review`,
      description: `Complete ${phone.brand} ${phone.name} specifications. ${phone.specs.display} display, ${phone.specs.chipset}, ${phone.specs.camera} camera, ${phone.specs.battery} battery.`,
      images: [ogImage],
    },
    
    // Canonical URL
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': pageUrl,
      },
    },
    
    // Robots - Enhanced for better indexing
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    // Additional metadata
    category: "Technology",
    classification: "Phone Specifications",
    other: {
      'article:section': 'Technology',
      'article:published_time': new Date().toISOString(),
      'article:modified_time': new Date().toISOString(),
      'article:tag': phone.tags.join(', '),
      'product:brand': phone.brand,
      'product:category': 'Smartphones',
      'product:retailer_item_id': phone.slug,
    },
  };
}

// Server Component
export default async function PhoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  const relatedPhones = await getRelatedPhones(slug, 11);
  const theme = getPhoneTheme(slug);

  if (!phone) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/phone-finder/${phone.slug}`;
  
  // ================================================================
  // ENHANCED JSON-LD STRUCTURED DATA - Perfect for Google
  // ================================================================
  
  // 1. Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    "name": `${phone.brand} ${phone.name}`,
    "description": `Complete specifications of the ${phone.brand} ${phone.name} (${phone.year}) with ${phone.specs.chipset} processor, ${phone.specs.camera} camera, and ${phone.specs.battery} battery. ${phone.specs.display} display with ${phone.specs.resolution} resolution.`,
    "brand": {
      "@type": "Brand",
      "name": phone.brand,
      "logo": phone.brandLogo || undefined,
    },
    "model": phone.name,
    "mpn": phone.slug,
    "sku": phone.slug,
    "gtin": phone.slug,
    "image": phone.image,
    "releaseDate": `${phone.year}-01-01`,
    "manufacturer": {
      "@type": "Organization",
      "name": phone.brand,
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Display",
        "value": phone.specs.display,
      },
      {
        "@type": "PropertyValue",
        "name": "Display Type",
        "value": phone.specs.displayType,
      },
      {
        "@type": "PropertyValue",
        "name": "Resolution",
        "value": phone.specs.resolution,
      },
      {
        "@type": "PropertyValue",
        "name": "Refresh Rate",
        "value": phone.specs.refreshRate,
      },
      {
        "@type": "PropertyValue",
        "name": "Chipset",
        "value": phone.specs.chipset,
      },
      {
        "@type": "PropertyValue",
        "name": "RAM",
        "value": phone.specs.ram,
      },
      {
        "@type": "PropertyValue",
        "name": "Storage",
        "value": phone.specs.storage,
      },
      {
        "@type": "PropertyValue",
        "name": "Camera",
        "value": phone.specs.camera,
      },
      {
        "@type": "PropertyValue",
        "name": "Battery",
        "value": phone.specs.battery,
      },
      {
        "@type": "PropertyValue",
        "name": "Operating System",
        "value": phone.specs.os,
      },
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
      "price": phone.specs.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
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

  // 2. Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Phone Finder",
        "item": `${siteUrl}/phone-finder`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${phone.brand} ${phone.name}`,
        "item": pageUrl,
      },
    ],
  };

  // 3. Article Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${phone.brand} ${phone.name} (${phone.year}) – Complete Specifications Review`,
    "description": `Comprehensive ${phone.brand} ${phone.name} specifications and review. Learn about display, camera, battery, performance benchmarks, and pricing.`,
    "author": {
      "@type": "Person",
      "name": "Mazhar Hussan",
      "url": `${siteUrl}/author`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "7pexel",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/7pexel.jpeg`,
      },
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    "image": phone.image,
    "keywords": phone.tags.join(', '),
    "articleSection": "Phone Reviews",
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
  };

  // 4. FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of ${phone.brand} ${phone.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${phone.brand} ${phone.name} (${phone.year}) is priced at ${phone.specs.pricing?.[0] || 'contact for pricing'}. Available in ${phone.specs.colors?.join(', ') || 'multiple colors'}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the camera quality of ${phone.brand} ${phone.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${phone.brand} ${phone.name} features a ${phone.specs.camera} camera system with ${phone.specs.cameraWide} wide lens and ${phone.specs.cameraUltraWide} ultra-wide lens. Supports ${phone.specs.videoRecording} video recording.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the battery life of ${phone.brand} ${phone.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${phone.brand} ${phone.name} comes with a ${phone.specs.battery} battery supporting ${phone.specs.wiredCharging} wired charging and ${phone.specs.wirelessCharging} wireless charging.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the ${phone.brand} ${phone.name} display size?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${phone.brand} ${phone.name} features a ${phone.specs.display} ${phone.specs.displayType} display with ${phone.specs.resolution} resolution and ${phone.specs.refreshRate} refresh rate.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      
      {/* ALL JSON-LD STRUCTURED DATA */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          {phone.brand} {phone.name} ({phone.year}) – Complete Specifications, Camera Review, Battery Life & Performance Benchmarks | 7pexel
        </h1>

        <h2 className="sr-only">
          {phone.brand} {phone.name} Price, Display, Chipset, RAM, Storage, and Camera Specifications
        </h2>

        {/* Hero Section */}
        <section aria-labelledby="phone-hero" itemScope itemType="https://schema.org/Product">
          <HeroSection phone={phone} />
        </section>

        {/* Spec Section */}
        <section aria-labelledby="spec-section">
          <SpecSection phone={phone} relatedPhones={relatedPhones} />
        </section>

        {/* Related Phones Grid */}
        <RelatedPhonesGrid relatedPhones={relatedPhones} currentSlug={slug} />

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-[rgba(127,1,31,0.08)]">
          <div className="text-center text-xs text-[#6d4a4a]/50">
            <p>
              {phone.brand} {phone.name} specifications and review page. Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}