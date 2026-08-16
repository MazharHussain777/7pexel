// components/phones/finder/FinderHeader.tsx
import Link from "next/link";

interface FinderHeaderProps {
  totalPhones?: number;
  totalBrands?: number;
}

export function FinderHeader({ totalPhones = 0, totalBrands = 0 }: FinderHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-3">
        <h1 className="font-fraunces font-medium text-[2.2rem] tracking-[-0.02em] flex items-center gap-2.5">
          <span className="text-[1.8rem]">🔍</span>
          Phone <em className="italic not-italic text-[#FF6B00]">Finder</em>
        </h1>
        <span className="text-[0.75rem] bg-[#FFF5EB] text-[#FF6B00] px-4.5 py-1.5 rounded-[40px] font-semibold tracking-[0.01em] border border-[#FFE4C4]">
          📱 {totalPhones}+ models · {totalBrands} brands
        </span>
      </div>
    </>
  );
}