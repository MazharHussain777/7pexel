// components/laptops/LatestReviews.tsx
import Link from "next/link";
import Image from "next/image";
import type { LaptopDetail } from "@/app/laptops/finder/data/laptop-data";

interface LatestReviewsProps {
  laptops: LaptopDetail[];
}

export function LatestReviews({ laptops }: LatestReviewsProps) {
  if (laptops.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Top <span className="text-[var(--color-green)]">Rated</span> Laptops
        </h2>
        <Link href="/reviews" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          All reviews →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {laptops.slice(0, 3).map((laptop) => (
          <Link
            key={laptop.id}
            href={`/laptops/finder/${laptop.slug}`}
            className="group border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef1e9]">
              <Image
                src={laptop.image}
                alt={`${laptop.brand} ${laptop.model}`}
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-black/70 text-white font-bold">
                  ⭐ {laptop.rating}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-[0.5rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold uppercase tracking-[0.05em]">
                  {laptop.category[0]}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3] group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                {laptop.brand} {laptop.model}
              </h4>
              <p className="text-[0.7rem] text-[var(--color-ink-soft)] mt-1 line-clamp-2">
                {laptop.processor} · {laptop.ram} · {laptop.storage}
              </p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-[var(--color-line)]">
                <span className="font-bold text-[0.85rem] text-[var(--color-green-deep)]">{laptop.price}</span>
                <span className="flex items-center gap-1.5 text-[var(--color-green)] font-semibold text-[0.7rem] group-hover:gap-2 transition-all">
                  Read review
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}