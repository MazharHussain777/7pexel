// components/laptops/LaptopsHero.tsx
import Link from "next/link";

interface LaptopsHeroProps {
  laptopsCount: number;
  brandsCount: number;
}

export function LaptopsHero({ laptopsCount, brandsCount }: LaptopsHeroProps) {
  return (
    <section className="relative rounded-[20px] overflow-hidden mt-8 bg-gradient-to-br from-[#0A3F6E] via-[#1F5FA2] to-[#0A3F6E] text-white">
      <div className="relative z-10 p-8 md:p-11 flex flex-wrap justify-between gap-7">
        <div className="max-w-[600px]">
          <div className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-5 bg-white/15 border border-white/25 backdrop-blur-sm">
            <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M1 20h22l-2-4H3l-2 4z" />
            </svg>
          </div>
          <h1 className="font-fraunces font-medium text-[clamp(2.1rem,4.4vw,3.3rem)] tracking-[-0.03em]">
            <span className="text-[#D4F26B]">Laptops</span> for Every Need
          </h1>
          <p className="mt-3.5 text-white/80 text-[1rem] leading-[1.6]">
            Explore every laptop from every brand — premium ultrabooks to gaming beasts, with specs, pricing, and comparisons.
          </p>
        </div>
        <div className="flex gap-0 flex-wrap items-start">
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">{laptopsCount}</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Laptops tracked</span>
          </div>
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">{brandsCount}</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Brands</span>
          </div>
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">5+</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Categories</span>
          </div>
        </div>
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45" viewBox="0 0 800 400" preserveAspectRatio="none">
        <circle cx="660" cy="80" r="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
        <circle cx="660" cy="80" r="240" stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
      </svg>
    </section>
  );
}