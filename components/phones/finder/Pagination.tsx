// components/phones/finder/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemsPerPage 
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Don't show pagination if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/phones/finder?${params.toString()}`, { scroll: false });
    
    // Scroll to top of the container
    const container = document.querySelector('.container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate range of pages to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show 5 pages at a time
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4);
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis before if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis after if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-4 mt-9.5">
      {/* Page numbers */}
      <div className="flex justify-center gap-2 flex-wrap">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 ${
            currentPage === 1
              ? 'border border-[#E8E8E8] text-[#B8B8B8] cursor-not-allowed bg-[#F5F5F5]'
              : 'border-[1.5px] border-[#E8E8E8] text-[#4A3520] hover:bg-[#FFF5EB] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-transparent'
          }`}
          aria-label="Previous page"
        >
          ←
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-[0.8rem] text-[#8B7355] flex items-center"
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page as number)}
              className={`px-4.5 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 ${
                isActive
                  ? 'bg-[#FF6B00] border-[1.5px] border-[#FF6B00] text-white shadow-[0_4px_16px_rgba(255,107,0,0.25)] hover:bg-[#E55D00] hover:border-[#E55D00]'
                  : 'bg-transparent border-[1.5px] border-[#E8E8E8] text-[#4A3520] hover:bg-[#FFF5EB] hover:border-[#FF6B00] hover:text-[#FF6B00]'
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-[40px] font-semibold text-[0.8rem] transition-all duration-200 ${
            currentPage === totalPages
              ? 'border border-[#E8E8E8] text-[#B8B8B8] cursor-not-allowed bg-[#F5F5F5]'
              : 'border-[1.5px] border-[#E8E8E8] text-[#4A3520] hover:bg-[#FFF5EB] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-transparent'
          }`}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      {/* Showing results info */}
      <div className="text-[0.75rem] text-[#8B7355]">
        Showing <span className="font-semibold text-[#4A3520]">{startItem}</span> to{' '}
        <span className="font-semibold text-[#4A3520]">{endItem}</span> of{' '}
        <span className="font-semibold text-[#FF6B00]">{totalItems}</span> results
      </div>
    </div>
  );
}