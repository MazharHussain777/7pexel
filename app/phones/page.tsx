// app/phones/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { PhonesHero } from "@/components/phones/PhonesHero";
import { FinderBanner } from "@/components/phones/FinderBanner";
import { Brands } from "@/components/phones/Brands";
import { RecentAdditions } from "@/components/phones/RecentAdditions";
import { getBrands, getPhoneStats } from "@/lib/phone-service";
import Link from "next/link";

// ============================================
// METADATA - SEO OPTIMIZED
// ============================================

export const metadata: Metadata = {
  title: 'Smartphone Directory - Phone Brands & Models | 7pexel',
  description: 'Explore our complete smartphone directory. Find detailed reviews, specifications, and prices for every phone. Compare brands and models side by side.',
  keywords: 'phone directory, smartphone list, all phone brands, mobile phones, phone reviews, smartphone database, phone catalog',
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
  alternates: {
    canonical: 'https://7pexel.com/phones',
  },
  openGraph: {
    title: 'Smartphone Directory -  Phone Brands & Models | 7pexel',
    description: 'Explore our complete smartphone directory. Find detailed reviews, specifications, and prices for every phone.',
    url: 'https://7pexel.com/phones',
    type: 'website',
    siteName: '7pexel',
    locale: 'en_US',
    images: [
      {
        url: 'https://7pexel.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smartphone Directory - All Phone Brands & Models',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@7pexel',
    creator: '@7pexel',
    title: 'Smartphone Directory -  Phone Brands & Models | 7pexel',
    description: 'Explore our complete smartphone directory. Find detailed reviews, specifications, and prices for every phone.',
    images: ['https://7pexel.com/og-image.jpg'],
  },
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default async function PhonesPage() {
  // Fetch from DATABASE
  const [brands, stats] = await Promise.all([
    getBrands(),
    getPhoneStats(),
  ]);

  return (
    <>
      <Header />
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6 bg-white">
        {/* Breadcrumb with Schema */}
        <nav className="flex items-center gap-2 text-[0.8rem] text-[#8B7355] pt-4.5 pb-2">
          <Link href="/" className="hover:text-[#FF6B00] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[#4A3520] font-semibold">Phones</span>
        </nav>

        {/* Hero Section */}
        <PhonesHero phonesCount={stats.published} brandsCount={brands.length} />
        
        {/* Finder Banner */}
        <FinderBanner />
        
        {/* Brands Section */}
        <Brands />
        
        {/* Recent Additions */}
        <RecentAdditions />
      </main>
    </>
  );
}