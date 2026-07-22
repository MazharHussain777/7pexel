"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage - halfVisible > 2) pages.push('...');
      
      const start = Math.max(2, currentPage - halfVisible);
      const end = Math.min(totalPages - 1, currentPage + halfVisible);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage + halfVisible < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className={`flex items-center justify-center gap-2 mt-8 ${className}`}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full border border-[rgba(127,1,31,0.1)] hover:border-[#7F011F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Previous page"
      >
        <i className="fas fa-chevron-left text-sm" />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 rounded-full text-sm transition-all ${
            page === currentPage
              ? 'bg-[#7F011F] text-white shadow-lg shadow-[#7F011F]/30 font-bold'
              : page === '...'
              ? 'cursor-default text-[#6d4a4a]'
              : 'hover:bg-[#f5ebd0] border border-[rgba(127,1,31,0.06)]'
          }`}
          aria-label={page === currentPage ? `Page ${page}, current page` : `Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full border border-[rgba(127,1,31,0.1)] hover:border-[#7F011F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Next page"
      >
        <i className="fas fa-chevron-right text-sm" />
      </button>
    </nav>
  );
}