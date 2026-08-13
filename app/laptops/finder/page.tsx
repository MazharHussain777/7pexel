// app/laptops/finder/page.tsx
"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinderHeader } from "@/components/laptops/finder/FinderHeader";
import { FinderSearchBar } from "@/components/laptops/finder/FinderSearch";
import { FilterBar } from "@/components/laptops/finder/FilterBar";
import { LaptopGrid } from "@/components/laptops/finder/LaptopGrid";
import { Pagination } from "@/components/laptops/finder/Pagination";
import { FinderFooter } from "@/components/laptops/finder/FinderFooter";

interface Laptop {
  _id: string;
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

function LaptopFinderContent() {
  const searchParams = useSearchParams();
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchLaptops = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '12');

      const q = searchParams.get('q');
      if (q) {
        params.set('search', q);
        setSearchTerm(q);
      }

      const brand = searchParams.get('brands');
      if (brand) {
        params.set('brand', brand);
      }

      const category = searchParams.get('categories');
      if (category) {
        params.set('category', category);
      }

      const sort = searchParams.get('sort');
      if (sort) {
        params.set('sort', sort);
      }

      const response = await fetch(`/api/laptops?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setLaptops(data.data || []);
        setTotalItems(data.total || 0);
        setTotalBrands(data.brands || 0);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.page || 1);
      } else {
        setError(data.error || 'Failed to fetch laptops');
      }
    } catch (error) {
      console.error('Error fetching laptops:', error);
      setError('An error occurred while fetching laptops');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchLaptops(currentPage);
  }, [fetchLaptops, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="max-w-[1440px] mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_rgba(15,24,15,0.06)] px-6 md:px-10 py-6 md:py-7.5 pb-8 md:pb-11.5 border border-[rgba(15,24,15,0.05)] my-6 md:my-10">
        <FinderHeader 
          title="Laptop Finder"
          subtitle="Compare laptops side by side"
          totalItems={totalItems}
          totalBrands={totalBrands}
        />
        
        <div className="mt-5">
          <FinderSearchBar 
            placeholder="Search laptops by brand, model, or processor..."
            initialValue={searchTerm}
          />
        </div>
        
        <FilterBar />
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-[12px] text-red-600 text-sm">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#0F6B3E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[var(--color-ink-soft)]">Loading laptops...</p>
            </div>
          </div>
        ) : (
          <>
            <LaptopGrid 
              searchTerm={searchTerm} 
              filters={Object.fromEntries(searchParams.entries())}
              laptops={laptops}
              loading={loading}
            />
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
        <FinderFooter />
      </div>
      <Footer />
    </>
  );
}

export default function LaptopFinderPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20"><div className="text-center"><div className="w-12 h-12 border-4 border-[#0F6B3E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-[var(--color-ink-soft)]">Loading...</p></div></div>}>
      <LaptopFinderContent />
    </Suspense>
  );
}