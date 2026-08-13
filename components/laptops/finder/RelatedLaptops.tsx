// components/laptops/finder/RelatedLaptops.tsx
import Link from "next/link";
import Image from "next/image";
import type { LaptopDetail } from "@/app/laptops/finder/data/laptop-data";
import { getBrandColor } from "@/app/laptops/finder/data/laptop-data";

interface RelatedLaptopsProps {
  relatedLaptops: LaptopDetail[];
  currentSlug: string;
}

export function RelatedLaptops({ relatedLaptops, currentSlug }: RelatedLaptopsProps) {
  if (relatedLaptops.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Related <span className="text-[var(--color-green)]">Laptops</span>
        </h2>
        <Link
          href="/laptops/finder"
          className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {relatedLaptops.slice(0, 8).map((laptop) => {
          const brandColor = getBrandColor(laptop.brand);
          return (
            <Link
              key={laptop.id}
              href={`/laptops/finder/${laptop.slug}`}
              className="border border-[var(--color-line)] rounded-[12px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)] group"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                <Image
                  src={laptop.image}
                  alt={`${laptop.brand} ${laptop.model}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className="text-[0.4rem] px-1.5 py-0.5 rounded-full text-white font-bold"
                    style={{ background: brandColor }}
                  >
                    {laptop.brand}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h6 className="font-fraunces font-semibold text-[0.85rem] group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                  {laptop.model}
                </h6>
                <div className="flex items-center gap-2 mt-1 text-[0.6rem] text-[var(--color-ink-soft)]">
                  <span>{laptop.processor}</span>
                  <span className="w-px h-3 bg-[var(--color-line)]" />
                  <span>{laptop.ram}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}