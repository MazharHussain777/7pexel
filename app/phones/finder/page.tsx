// app/phones/finder/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinderHeader } from "@/components/phones/finder/FinderHeader";
import { FinderSearch } from "@/components/phones/finder/FinderSearch";
import { FilterBar } from "@/components/phones/finder/FilterBar";
import { PhoneGrid } from "@/components/phones/finder/PhoneGrid";
import { Pagination } from "@/components/phones/finder/Pagination";
import { FinderFooter } from "@/components/phones/finder/FinderFooter";
import { getAllPhones, getBrands, getPhoneStats } from "@/lib/phone-service";
import Link from "next/link";

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

// Helper function to serialize MongoDB documents
function serializePhone(phone: any) {
  if (!phone) return null;
  return {
    _id: phone._id?.toString() || phone._id,
    id: phone.id || phone._id?.toString(),
    slug: phone.slug,
    brand: phone.brand,
    model: phone.model,
    year: phone.year,
    price: phone.price,
    image: phone.image,
    rating: phone.rating || 0,
    category: phone.category || [],
    display: phone.display,
    displaySize: phone.displaySize,
    camera: phone.camera,
    cameraDetails: phone.cameraDetails,
    battery: phone.battery,
    chipset: phone.chipset,
    ram: phone.ram,
    storage: phone.storage,
    os: phone.os,
    weight: phone.weight,
    colors: phone.colors || [],
    highlights: phone.highlights || [],
    pros: phone.pros || [],
    cons: phone.cons || [],
    author: phone.author,
    authorAvatar: phone.authorAvatar,
    date: phone.date ? new Date(phone.date).toISOString() : new Date().toISOString(),
    readTime: phone.readTime,
    customStyles: phone.customStyles || '',
    contentHtml: phone.contentHtml,
    isFeatured: phone.isFeatured || false,
    isTrending: phone.isTrending || false,
    published: phone.published !== false,
    createdAt: phone.createdAt ? new Date(phone.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: phone.updatedAt ? new Date(phone.updatedAt).toISOString() : new Date().toISOString(),
  };
}

export default async function PhoneFinderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '100'); // Show more phones
  const search = params.q || '';
  const brand = params.brand || undefined;
  const category = params.category || undefined;
  const year = params.year || undefined;
  const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined;
  const featured = params.featured === 'true';
  const trending = params.trending === 'true';
  const sort = params.sort || 'newest';

  // Fetch all data from database
  const [phonesResult, brands, stats] = await Promise.all([
    getAllPhones({
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
    getBrands(),
    getPhoneStats(),
  ]);

  // Serialize phone data for client components
  const serializedPhones = phonesResult.data.map(serializePhone);
  const serializedResult = {
    data: serializedPhones,
    total: phonesResult.total,
    totalPages: phonesResult.totalPages,
  };

  // Get unique years from database for filter
  const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  return (
    <>
      <Header />
      <div className="max-w-[1440px] mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_rgba(15,24,15,0.06)] px-6 md:px-10 py-6 md:py-7.5 pb-8 md:pb-11.5 border border-[rgba(15,24,15,0.05)] my-6 md:my-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-6">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/phones" className="hover:text-[var(--color-green)] transition-colors">Phones</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Finder</span>
        </nav>

        <FinderHeader totalPhones={stats.published} totalBrands={brands.length} />
        
        <FinderSearch initialSearch={search} />
        
        <FilterBar 
          brands={brands}
          categories={stats.categories || []}
          years={years}
          activeBrand={brand}
          activeCategory={category}
          activeYear={year}
          activeSort={sort}
        />
        
        <PhoneGrid 
          initialPhones={serializedResult.data}
          initialTotal={serializedResult.total}
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
      <Footer />
    </>
  );
}