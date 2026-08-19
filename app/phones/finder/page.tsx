// app/phones/finder/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { FinderHeader } from "@/components/phones/finder/FinderHeader";
import { FinderSearch } from "@/components/phones/finder/FinderSearch";
import { FilterBar } from "@/components/phones/finder/FilterBar";
import { PhoneGrid } from "@/components/phones/finder/PhoneGrid";
import { Pagination } from "@/components/phones/finder/Pagination";
import { FinderFooter } from "@/components/phones/finder/FinderFooter";
import { 
  fetchPhonesFromDB,
  fetchBrandsFromDB,
  fetchPhoneStatsFromDB,
  fetchYearsFromDB,
  fetchCategoriesFromDB
} from "@/lib/phone-data-service";
import Link from "next/link";

// ============================================
// METADATA - SEO OPTIMIZED
// ============================================

export const metadata: Metadata = {
  title: 'Phone Finder - Compare Smartphones Side by Side | 7pexel',
  description: 'Find and compare the latest smartphones. Filter by brand, price, specs, and more. Compare phones side by side to make the best choice.',
  keywords: 'phone finder, compare phones, smartphone comparison, best phones 2026, phone specs, smartphone reviews, phone filter, phone search',
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
    canonical: 'https://7pexel.com/phones/finder',
  },
  openGraph: {
    title: 'Phone Finder - Compare Smartphones | 7pexel',
    description: 'Find and compare the latest smartphones. Filter by brand, price, specs, and more.',
    url: 'https://7pexel.com/phones/finder',
    type: 'website',
    siteName: '7pexel',
    locale: 'en_US',
    images: [
      {
        url: 'https://7pexel.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Phone Finder - Compare Smartphones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@7pexel',
    creator: '@7pexel',
    title: 'Phone Finder - Compare Smartphones | 7pexel',
    description: 'Find and compare the latest smartphones. Filter by brand, price, specs, and more.',
    images: ['https://7pexel.com/og-image.jpg'],
  },
};

// ============================================
// PAGE COMPONENT
// ============================================

interface PageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    category?: string;
    year?: string;
    minPrice?: string;
    maxPrice?: string;
    featured?: string;
    trending?: string;
    sort?: 'rating' | 'year' | 'price' | 'newest';
    page?: string;
    limit?: string;
  }>;
}

export default async function PhoneFinderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '100');
  const search = params.q || '';
  const brand = params.brand || undefined;
  const category = params.category || undefined;
  const year = params.year || undefined;
  const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined;
  const featured = params.featured === 'true';
  const trending = params.trending === 'true';
  const sort = params.sort || 'newest';

  // Fetch from Supabase
  const [phonesResult, brands, stats, years, categories] = await Promise.all([
    fetchPhonesFromDB({
      search,
      brand,
      category,
      year,
      minPrice,
      maxPrice,
      featured,
      trending,
      page,
      limit,
      sort: sort as any,
    }),
    fetchBrandsFromDB(),
    fetchPhoneStatsFromDB(),
    fetchYearsFromDB(),
    fetchCategoriesFromDB(),
  ]);

  return (
    <>
      <Header />
      <div className="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 bg-white">
        <div className="w-full max-w-[1440px] mx-auto bg-white rounded-[40px] px-6 md:px-10 py-6 md:py-7.5 pb-8 md:pb-11.5 border border-[#E8E8E8]">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[0.8rem] text-[#8B7355] mb-6">
            <Link href="/" className="hover:text-[#FF6B00] transition-colors font-medium">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/phones" className="hover:text-[#FF6B00] transition-colors font-medium">
              Phones
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#4A3520] font-semibold">Finder</span>
          </nav>

          <FinderHeader totalPhones={stats.total} totalBrands={brands.length} />
          
          <FinderSearch />
          
          <FilterBar 
            brands={brands}
            categories={categories || []}
            years={years}
            activeBrand={brand}
            activeCategory={category}
            activeYear={year}
            activeSort={sort}
          />
          
          <PhoneGrid 
            initialPhones={phonesResult.data}
            initialTotal={phonesResult.total}
            searchTerm={search}
            filters={{ brand, category, year, featured, trending }}
          />
          
          <Pagination 
            currentPage={page}
            totalPages={phonesResult.totalPages}
            totalItems={phonesResult.total}
            itemsPerPage={limit}
          />
          
          <FinderFooter />
        </div>
      </div>
    </>
  );
}