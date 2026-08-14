// components/SelectedBrandsBar.tsx
"use client";

import { getBrandColor } from "@/lib/brandColors";

interface SelectedBrandsBarProps {
  brands: string[];
  totalCount: number;
  onRemoveBrand: (brand: string) => void;
  onClearAll: () => void;a
}

export function SelectedBrandsBar({
  brands,
  totalCount,
  onRemoveBrand,
  onClearAll,
}: SelectedBrandsBarProps) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className="mb-5 p-4 rounded-2xl bg-white border border-[rgba(127,1,31,0.08)] shadow-[0_8px_24px_-12px_rgba(127,1,31,0.12)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#6d4a4a] font-['Poppins',sans-serif]">
          Showing {totalCount} {totalCount === 1 ? "phone" : "phones"} from
        </p>
        {brands.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-[0.7rem] font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors"
          >
            Clear brands
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => {
          const color = getBrandColor(brand);
          return (
            <div
              key={brand}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border transition-all duration-200"
              style={{ backgroundColor: `${color}14`, borderColor: `${color}40` }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span
                className="text-[0.8rem] font-bold tracking-tight font-['Poppins',sans-serif]"
                style={{ color }}
              >
                {brand}
              </span>
              <button
                onClick={() => onRemoveBrand(brand)}
                aria-label={`Remove ${brand} filter`}
                className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] text-[#6d4a4a] hover:text-white hover:bg-[#7F011F] transition-colors"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}