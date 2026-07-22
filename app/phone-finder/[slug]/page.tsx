// app/phone-finder/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SpecSection } from "@/components/SpecSection";
import { RelatedPhonesGrid } from "@/components/RelatedPhonesGrid";

// Types
interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  brandLogo: string;
  year: number;
  rating: number;
  reviewCount: number;
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
  stats: {
    views: string;
    favorites: string;
    shares: string;
    reviews: string;
  };
}

// Enable dynamic params for new phones not pre-rendered
export const dynamicParams = true;

// Fetch phone data from API with proper caching
async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/phones/${slug}`, {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: [`phone-${slug}`],
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch phone: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching phone:", error);
    return null;
  }
}

// Fetch related phones from API
async function getRelatedPhones(slug: string, limit: number = 11): Promise<Phone[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/phones/${slug}/related?limit=${limit}`, {
      next: {
        revalidate: 3600,
        tags: [`phone-related-${slug}`],
      },
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching related phones:", error);
    return [];
  }
}

// Get all phone slugs for static generation
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/phones?limit=1000`, {
      next: { revalidate: 86400 }, // Revalidate once per day
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    if (!result.success) {
      return [];
    }
    
    return result.data.map((phone: Phone) => ({
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
  
  if (!phone) {
    return {
      title: "Phone Not Found | TechBlog",
      description: "The phone you're looking for doesn't exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const pageUrl = `${siteUrl}/phone-finder/${phone.slug}`;
  
  // Generate comprehensive title with keywords
  const title = `${phone.brand} ${phone.name} Review (${phone.year}) – Full Specs, Camera, Battery & Benchmarks | TechBlog`;
  
  // Generate rich description with key specs
  const description = `Comprehensive review of the ${phone.brand} ${phone.name} (${phone.year}). Features ${phone.specs.display} display, ${phone.specs.chipset} chipset, ${phone.specs.camera} camera, and ${phone.specs.battery} battery. Read expert analysis, benchmarks, and user ratings.`;
  
  // Generate keywords from phone specs
  const keywords = [
    phone.brand,
    phone.name,
    phone.specs.chipset,
    phone.specs.camera,
    phone.specs.display,
    `${phone.year}`,
    'phone review',
    'smartphone specs',
    'flagship phone',
    'tech review',
    'mobile phone',
    phone.specs.ram,
    phone.specs.storage,
    ...phone.tags,
  ].filter(Boolean).join(', ');

  // Generate OG image URL with fallback
  const ogImage = phone.image || `${siteUrl}/images/default-phone.jpg`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "TechBlog Team", url: siteUrl }],
    creator: "TechBlog",
    publisher: "TechBlog",
    generator: "Next.js",
    applicationName: "TechBlog",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    
    // Open Graph
    openGraph: {
      title: `${phone.brand} ${phone.name} Review – Complete Specifications & Expert Analysis`,
      description: `Detailed review of the ${phone.brand} ${phone.name}. ${phone.specs.display} display, ${phone.specs.chipset}, ${phone.specs.camera} camera, ${phone.specs.battery} battery. All specs, benchmarks, and ratings.`,
      url: pageUrl,
      siteName: "TechBlog",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${phone.brand} ${phone.name} - Premium Smartphone Review`,
          type: 'image/jpeg',
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      authors: ["TechBlog Team"],
      tags: phone.tags,
    },
    
    // Twitter Cards
    twitter: {
      card: "summary_large_image",
      site: "@techblog",
      creator: "@techblog",
      title: `${phone.brand} ${phone.name} Review – Full Specs & Analysis`,
      description: `Comprehensive review of the ${phone.brand} ${phone.name}. Camera, battery, performance benchmarks and more.`,
      images: [ogImage],
    },
    
    // Canonical and Alternates
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': pageUrl,
        // Add other languages if supported
      },
    },
    
    // Robots
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
    
    // Additional meta
    category: "Technology",
    classification: "Phone Review",
    other: {
      'article:section': 'Technology',
      'article:published_time': new Date().toISOString(),
      'article:modified_time': new Date().toISOString(),
      'article:tag': phone.tags.join(', '),
      'og:availability': 'instock',
      'og:price:amount': phone.specs.pricing?.[0]?.match(/\$(\d+)/)?.[1] || '999',
      'og:price:currency': 'USD',
      'product:brand': phone.brand,
      'product:category': 'Electronics',
      'product:retailer_item_id': phone.slug,
    },
  };
}

// Server Component - No "use client"
export default async function PhoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);
  const relatedPhones = await getRelatedPhones(slug, 11);

  if (!phone) {
    notFound();
  }

  // Generate JSON-LD Structured Data - Enhanced Version
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${phone.brand} ${phone.name}`,
    description: `Complete specifications and review of the ${phone.brand} ${phone.name} (${phone.year}) with ${phone.specs.chipset} processor, ${phone.specs.camera} camera, and ${phone.specs.battery} battery.`,
    brand: {
      "@type": "Brand",
      name: phone.brand,
      logo: phone.brandLogo || undefined,
    },
    model: phone.name,
    releaseDate: `${phone.year}-01-01`,
    manufacturer: {
      "@type": "Organization",
      name: phone.brand,
    },
    sku: phone.slug,
    gtin: phone.slug, // Use slug as identifier
    image: phone.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: phone.specs.pricing?.[0]?.match(/\$(\d+)/)?.[1] || "999",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: "https://schema.org/InStock",
      url: `https://techblog.com/phone-finder/${phone.slug}`,
      seller: {
        "@type": "Organization",
        name: "TechBlog",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: phone.rating || 4.5,
      reviewCount: phone.reviewCount || 100,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: phone.rating || 4.5,
        bestRating: 5,
      },
      author: {
        "@type": "Organization",
        name: "TechBlog",
      },
      datePublished: new Date().toISOString().split('T')[0],
      reviewBody: `The ${phone.brand} ${phone.name} delivers exceptional performance with its ${phone.specs.chipset} chipset, ${phone.specs.camera} camera system, and ${phone.specs.battery} battery. A ${phone.isFlagship ? 'flagship-grade' : 'premium'} device that excels in ${phone.tags.join(', ')}.`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://techblog.com/phone-finder/${phone.slug}`,
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    isFamilyFriendly: true,
    mobileUrl: `https://techblog.com/phone-finder/${phone.slug}`,
    category: "Electronics",
    potentialAction: {
      "@type": "ReviewAction",
      target: `https://techblog.com/phone-finder/${phone.slug}#review`,
    },
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://techblog.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Phone Finder",
        item: "https://techblog.com/phone-finder",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${phone.brand} ${phone.name}`,
        item: `https://techblog.com/phone-finder/${phone.slug}`,
      },
    ],
  };

  // FAQ Schema - Common questions about the phone
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is the ${phone.brand} ${phone.name} worth buying?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${phone.brand} ${phone.name} features a ${phone.specs.display} display, ${phone.specs.chipset} processor, and ${phone.specs.camera} camera system. With a ${phone.rating || 4.5}/5 rating from ${phone.reviewCount || 100}+ reviews, it's ${phone.isFlagship ? 'a flagship-grade device' : 'a solid choice'} for ${phone.tags.join(' and ')} enthusiasts.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the key specifications of the ${phone.brand} ${phone.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Key specs include: ${phone.specs.display} display with ${phone.specs.refreshRate} refresh rate, ${phone.specs.chipset} chipset, ${phone.specs.ram} RAM, ${phone.specs.storage} storage, ${phone.specs.camera} rear camera, ${phone.specs.frontCamera} front camera, and ${phone.specs.battery} battery with ${phone.specs.wiredCharging} charging.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does the ${phone.brand} ${phone.name} cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${phone.brand} ${phone.name} is priced at ${phone.specs.pricing?.join(' or ') || 'competitive pricing'}, depending on the storage and color variant. Current pricing reflects the ${phone.year} model.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the battery life of the ${phone.brand} ${phone.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${phone.brand} ${phone.name} features a ${phone.specs.battery} battery with ${phone.specs.batteryType} technology. It offers ${phone.specs.videoPlayback || 'excellent'} video playback and ${phone.specs.audioPlayback || 'great'} audio playback time, with ${phone.specs.wiredCharging} wired and ${phone.specs.wirelessCharging || 'wireless'} charging support.`,
        },
      },
    ],
  };

  // Get current URL for meta
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const pageUrl = `${siteUrl}/phone-finder/${phone.slug}`;

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Hidden H1 for SEO - Descriptive and keyword-rich */}
        <h1 className="sr-only">
          {phone.brand} {phone.name} ({phone.year}) – Complete Review, Full Specifications, Camera Test, Battery Life & Performance Benchmarks
        </h1>

        {/* Hero Section */}
        <section aria-labelledby="phone-hero">
          <HeroSection phone={phone} />
        </section>

        {/* Spec Section */}
        <section aria-labelledby="spec-section">
          <SpecSection phone={phone} relatedPhones={relatedPhones} />
        </section>

        {/* Related Phones Grid */}
        <RelatedPhonesGrid relatedPhones={relatedPhones} currentSlug={slug} />

        {/* Footer with microdata */}
        <footer className="mt-8 pt-4 border-t border-[rgba(127,1,31,0.08)]" />
      </main>
    </div>
  );
}