// components/CategoryBar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND_COLORS } from "@/lib/brandColors";

interface CategoryBarProps {
  onCategoryClick?: (category: any) => void;
}

interface Brand {
  name: string;
  color: string;
}

const brands: Brand[] = [
  { name: "Apple", color: BRAND_COLORS.Apple },
  { name: "Samsung", color: BRAND_COLORS.Samsung },
  { name: "Google", color: BRAND_COLORS.Google },
  { name: "OnePlus", color: BRAND_COLORS.OnePlus },
  { name: "Xiaomi", color: BRAND_COLORS.Xiaomi },
  { name: "Infinix", color: BRAND_COLORS.Infinix },
  { name: "Sony", color: BRAND_COLORS.Sony },
  { name: "Motorola", color: BRAND_COLORS.Motorola },
  { name: "Nothing", color: BRAND_COLORS.Nothing },
  { name: "Asus", color: BRAND_COLORS.Asus },
  { name: "Huawei", color: BRAND_COLORS.Huawei },
  { name: "Oppo", color: BRAND_COLORS.Oppo },
  { name: "Vivo", color: BRAND_COLORS.Vivo },
];

export function CategoryBar({ onCategoryClick }: CategoryBarProps) {
  const router = useRouter();

  const handleBrandClick = (brand: Brand, e: React.MouseEvent) => {
    e.preventDefault();
    if (onCategoryClick) onCategoryClick(brand);
    // Navigate to phone-finder with brand filter applied
    router.push(`/phone-finder?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold tracking-tight text-[#2d1a1a] font-['Poppins',sans-serif]">
            Popular Brands
          </h3>
          <span className="text-[0.65rem] font-medium text-[#6d4a4a] bg-[#F5EBD0]/50 px-2.5 py-0.5 rounded-full">
            {brands.length} brands
          </span>
        </div>
        <Link
          href="/phone-finder"
          className="text-xs font-medium text-[#004643] hover:text-[#003a33] transition-colors flex items-center gap-1.5"
        >
          View all
          <i className="fas fa-arrow-right text-[0.6rem]" />
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {brands.map((brand) => (
          <div
            key={brand.name}
            onClick={(e) => handleBrandClick(brand, e)}
            className="group relative bg-white hover:bg-[#f8f8f8] rounded-xl px-3 py-3.5 border border-[#e8e8e8] hover:border-[#004643]/30 transition-all duration-300 cursor-pointer flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              style={{ color: brand.color }}
              className="text-[0.8rem] font-bold tracking-tight font-['Poppins',sans-serif] leading-tight text-center transition-transform duration-300 group-hover:scale-105"
            >
              {brand.name}
            </span>
            {/* Active indicator line - green to match theme */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#004643] group-hover:w-4 transition-all duration-300 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}