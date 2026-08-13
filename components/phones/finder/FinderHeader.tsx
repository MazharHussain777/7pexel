// components/phones/finder/FinderHeader.tsx
import Link from "next/link";

interface FinderHeaderProps {
  totalPhones?: number;
  totalBrands?: number;
}

export function FinderHeader({ totalPhones = 0, totalBrands = 0 }: FinderHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[0.8rem] text-[var(--color-ink-soft)] mb-5">
        <Link href="/" className="text-[var(--color-green)] hover:underline">Home</Link>
        <span className="opacity-40">/</span>
        <Link href="/phones" className="text-[var(--color-green)] hover:underline">Phones</Link>
        <span className="opacity-40">/</span>
        <span className="font-medium">Finder</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-3">
        <h1 className="font-fraunces font-medium text-[2.2rem] tracking-[-0.02em] flex items-center gap-2.5">
          <span className="text-[1.8rem]">🔍</span>
          Phone <em className="italic not-italic text-[var(--color-green)]">Finder</em>
        </h1>
        <span className="text-[0.75rem] bg-[#e9f3ed] text-[var(--color-green)] px-4.5 py-1.5 rounded-[40px] font-semibold tracking-[0.01em]">
          📱 {totalPhones}+ models · {totalBrands} brands
        </span>
      </div>
    </>
  );
}