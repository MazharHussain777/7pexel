// app/phones/finder/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { 
  fetchPhoneBySlugFromDB, 
  fetchRelatedPhonesFromDB, 
  fetchPhonesFromDB 
} from "@/lib/phone-data-service";
import PhoneDetailClient from "./PhoneDetailClient";

// ============================================
// GENERATE STATIC PATHS
// ============================================

export async function generateStaticParams() {
  try {
    const result = await fetchPhonesFromDB({ limit: 1000 });
    return result.data.map((phone) => ({
      slug: phone.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ============================================
// VIEWPORT CONFIG
// ============================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF6B00',
  colorScheme: 'light',
  viewportFit: 'cover',
};

// ============================================
// METADATA GENERATION - COMPLETE SEO
// ============================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const phone = await fetchPhoneBySlugFromDB(slug);

  // If phone not found, return 404 metadata
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
  const fullName = `${phone.brand} ${phone.model}`;
  const pageUrl = `${siteUrl}/phones/finder/${slug}`;
  const imageUrl = phone.image || `${siteUrl}/images/default-phone.jpg`;

  // Generate rich meta description with key specs
  const metaDescription = `Read our expert ${fullName} review. ${phone.ram}GB RAM, ${phone.storage}GB storage, ${phone.battery}mAh battery, ${phone.chipset_details} chipset. ${phone.camera_details} camera. Find out if ${fullName} is the best smartphone of ${phone.year}.`;

  // Generate comprehensive keywords
  const metaKeywords = [
    `${fullName} review`,
    `${fullName} specs`,
    `${phone.brand} ${phone.model}`,
    `${phone.model} ${phone.year}`,
    `${phone.brand} smartphone`,
    `${phone.model} price`,
    `${phone.model} camera`,
    `${phone.model} battery`,
    `${phone.model} performance`,
    `best smartphone ${phone.year}`,
    `${phone.brand} flagship`,
    `${phone.model} gaming`,
    `${phone.model} display`,
    `${phone.model} vs`,
    `${phone.brand} phone`,
  ];

  // Generate OG title
  const ogTitle = `${fullName} (${phone.year}) – In-Depth Review & Complete Specifications | 7pexel`;

  // Generate OG description
  const ogDescription = `Read our expert review of the ${fullName}. Discover its powerful ${phone.camera_details} camera, impressive ${phone.battery}mAh battery life, ${phone.chipset_details} performance, and stunning ${phone.display_size} display. Is it worth buying in ${phone.year}?`;

  // Generate Twitter title
  const twitterTitle = `${fullName} Review – Full Specs, Camera & Performance (${phone.year})`;

  // Generate Twitter description
  const twitterDescription = `Is ${fullName} worth buying? Read our full review with camera test, battery life, gaming performance, and benchmark scores.`;

  return {
    // ============ BASIC METADATA ============
    title: `${fullName} (${phone.year}) – Complete Review, Specs, Camera & Price | 7pexel`,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    authors: [{ 
      name: phone.author || '7pexel Team',
      url: siteUrl,
    }],
    creator: '7pexel',
    publisher: '7pexel',
    generator: 'Next.js',
    applicationName: '7pexel',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // ============ ROBOTS ============
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // ============ CANONICAL & ALTERNATES ============
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': pageUrl,
      },
    },

    // ============ OPEN GRAPH ============
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: pageUrl,
      siteName: '7pexel',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${fullName} - Smartphone Review and Specifications`,
        },
      ],
      publishedTime: phone.created_at || new Date().toISOString(),
      modifiedTime: phone.updated_at || new Date().toISOString(),
      authors: [phone.author || '7pexel Team'],
      tags: [
        phone.brand,
        phone.model,
        phone.category?.join(', ') || 'smartphone',
        `${phone.year} flagship`,
      ],
    },

    // ============ TWITTER CARDS ============
    twitter: {
      card: 'summary_large_image',
      site: '@7pexel',
      creator: '@7pexel',
      title: twitterTitle,
      description: twitterDescription,
      images: [imageUrl],
    },

    // ============ ICONS ============
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    // ============ OTHER ============
    category: 'Technology',
    classification: 'Smartphone Reviews, Tech Reviews, Phone Comparisons',
    metadataBase: new URL(siteUrl),
  };
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default async function PhoneDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const phone = await fetchPhoneBySlugFromDB(slug);

  if (!phone) {
    notFound();
  }

  const [relatedPhones, allPhones] = await Promise.all([
    fetchRelatedPhonesFromDB(slug, 11),
    fetchPhonesFromDB({ limit: 100, sort: 'newest' }),
  ]);

  // Pass data to Client Component
  return <PhoneDetailClient phone={phone} relatedPhones={relatedPhones} allPhones={allPhones} />;
}