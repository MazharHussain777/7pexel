// components/vehicles/VehicleBottomNav.tsx
import Link from "next/link"; // ← Add this import
import { Brand } from "@/app/auto/data/vehicles";

interface VehicleBottomNavProps {
  brand?: Brand;
  brandId: string;
}

export function VehicleBottomNav({ brand, brandId }: VehicleBottomNavProps) {
  return (
    <div className="pt-6 pb-2 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)]">
      <Link
        href={`/auto/brands/${brand?.slug || brandId}`}
        className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to {brand?.name || brandId}
      </Link>

      <div className="flex items-center gap-4 text-[0.8rem] text-[var(--color-ink-soft)]">
        <Link href="/auto" className="hover:text-[var(--color-green)] transition-colors flex items-center gap-1">
          🏠 Auto
        </Link>
        <span className="w-px h-4 bg-[var(--color-line)]" />
        <Link href="/auto/brands" className="hover:text-[var(--color-green)] transition-colors flex items-center gap-1">
          🏭 Brands
        </Link>
        <span className="w-px h-4 bg-[var(--color-line)]" />
        <span className="flex items-center gap-1">📅 {brand?.founded || "N/A"}</span>
        <span className="w-px h-4 bg-[var(--color-line)]" />
        <span className="flex items-center gap-1">🌍 {brand?.country || "N/A"}</span>
      </div>
    </div>
  );
}