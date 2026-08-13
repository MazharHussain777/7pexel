// components/vehicles/VehicleMoreFromBrand.tsx
import Image from "next/image";
import Link from "next/link"; // ← Add this import
import { Brand, Vehicle, formatPrice } from "@/app/auto/data/vehicles";

interface VehicleMoreFromBrandProps {
  brand: Brand;
  vehicles: Vehicle[];
}

export function VehicleMoreFromBrand({ brand, vehicles }: VehicleMoreFromBrandProps) {
  if (vehicles.length === 0) return null;

  return (
    <section className="mb-12 py-8 bg-[var(--color-paper)] border-y border-[var(--color-line)] -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-[14px] bg-green-950/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🚗</span>
          </div>
          <div className="flex justify-between items-center flex-1 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.8rem] tracking-[-0.01em]">
              More from <em className="italic not-italic text-[var(--color-green)]">
                {brand.name}
              </em>
            </h2>
            <Link
              href={`/auto/brands/${brand.slug}`}
              className="text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
            >
              View all →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {vehicles.map((v) => (
            <Link
              key={v.slug}
              href={`/auto/vehicle/${v.slug}`}
              className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_rgba(15,24,15,0.12)] hover:border-[rgba(15,107,62,0.25)]"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                <Image
                  src={v.img}
                  alt={v.model}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {v.range && (
                  <span className="absolute bottom-2 left-2 text-[0.55rem] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white font-medium">
                    {v.range}mi
                  </span>
                )}
              </div>
              <div className="p-3.5">
                <h6 className="font-fraunces font-semibold text-[0.9rem] group-hover:text-[var(--color-green)] transition-colors">
                  {v.model}
                </h6>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-jetbrains-mono text-[0.7rem] text-[var(--color-ink-soft)]">
                    {formatPrice(v.price)}
                  </span>
                  <span className="w-px h-3 bg-[var(--color-line)]" />
                  <span className="text-[0.6rem] text-[var(--color-ink-soft)] uppercase font-medium">
                    {v.size}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}