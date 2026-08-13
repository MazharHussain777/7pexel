// components/laptops/LatestLaptops.tsx
import Link from "next/link";
import Image from "next/image";
import type { LaptopDetail } from "@/app/laptops/finder/data/laptop-data";

interface LatestLaptopsProps {
  laptops: LaptopDetail[];
}

export function LatestLaptops({ laptops }: LatestLaptopsProps) {
  if (laptops.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Latest <span className="text-[var(--color-green)]">Laptops</span>
        </h2>
        <Link href="/laptops/finder" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {laptops.map((laptop) => (
          <Link
            key={laptop.id}
            href={`/laptops/finder/${laptop.slug}`}
            className="group border border-[var(--color-line)] rounded-[14px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.35)]" />
              <span className="absolute bottom-2 left-2 z-10 text-[0.5rem] px-2 py-0.5 rounded-full bg-white/92 text-[var(--color-ink)] font-bold uppercase tracking-[0.05em]">
                {laptop.year}
              </span>
            </div>
            <div className="p-3">
              <h5 className="font-fraunces font-semibold text-[0.8rem] group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                {laptop.brand} {laptop.model}
              </h5>
              <div className="flex items-center gap-1 mt-1 text-[0.55rem] text-[var(--color-ink-soft)]">
                <span>{laptop.processor}</span>
                <span className="w-px h-3 bg-[var(--color-line)]" />
                <span>{laptop.ram}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}