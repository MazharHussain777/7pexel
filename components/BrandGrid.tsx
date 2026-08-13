// app/auto/brands/components/BrandGrid.tsx
"use client";

// ✅ Fix: Import Brand from the correct path
import { Brand } from "@/app/auto/data/vehicles";
import { BrandCard } from "./BrandCard";
import { EmptyState } from "./EmptyState";

interface BrandGridProps {
  brands: Brand[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onReset: () => void;
  variant?: "grid" | "compact" | "mini";
}

export function BrandGrid({
  brands,
  hoveredId,
  onHover,
  onReset,
  variant = "grid",
}: BrandGridProps) {
  if (brands.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  const gridClasses = {
    grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4",
    compact: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5",
    mini: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",
  };

  return (
    <div className={gridClasses[variant]}>
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          isHovered={hoveredId === brand.id}
          onMouseEnter={() => onHover(brand.id)}
          onMouseLeave={() => onHover(null)}
          variant={variant}
        />
      ))}
    </div>
  );
}