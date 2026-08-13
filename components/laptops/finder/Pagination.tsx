// components/laptops/finder/Pagination.tsx
"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        start = 2;
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[rgba(15,24,15,0.06)]">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold text-[var(--color-ink-soft)] transition-all hover:border-[var(--color-green)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-[0.8rem] text-[var(--color-ink-soft)]">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 rounded-full font-semibold text-[0.85rem] transition-all ${
              currentPage === page
                ? "bg-[var(--color-green)] text-white shadow-[0_4px_12px_rgba(15,107,62,0.2)]"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-green)]/10 hover:text-[var(--color-ink)]"
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold text-[var(--color-ink-soft)] transition-all hover:border-[var(--color-green)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}