// components/vehicles/VehicleBreadcrumb.tsx
import Link from "next/link";
import { Brand } from "@/app/auto/data/vehicles";

interface VehicleBreadcrumbProps {
  brand?: Brand;
  brandId: string;
  model: string;
}

export function VehicleBreadcrumb({ brand, brandId, model }: VehicleBreadcrumbProps) {
  return (
    <div className="max-w-[91vw] mx-auto py-5 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] flex-wrap">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 hover:text-[var(--color-green)] transition-colors duration-200 font-medium"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
        <span className="opacity-30 select-none">/</span>
        <Link 
          href="/auto" 
          className="hover:text-[var(--color-green)] transition-colors duration-200"
        >
          Auto
        </Link>
        <span className="opacity-30 select-none">/</span>
        <Link 
          href="/auto/brands" 
          className="hover:text-[var(--color-green)] transition-colors duration-200"
        >
          Brands
        </Link>
        <span className="opacity-30 select-none">/</span>
        <Link
          href={`/auto/brands/${brand?.slug || brandId}`}
          className="hover:text-[var(--color-green)] transition-colors duration-200"
        >
          {brand?.name || brandId}
        </Link>
        <span className="opacity-30 select-none">/</span>
        <span className="text-[var(--color-ink)] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
          {model}
        </span>
      </nav>
    </div>
  );
}