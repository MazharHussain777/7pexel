// components/phones/FinderBanner.tsx
"use client";

import Link from "next/link";

export function FinderBanner() {
  return (
    <section className="my-6">
      <Link
        href="/phones/finder"
        className="group block relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#FF6B00] via-[#FF8C00] to-[#FFA500] text-white p-8 transition-all hover:shadow-[0_16px_40px_rgba(255,107,0,0.30)]"
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔍</span>
              <span className="text-[0.6rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/20 px-3 py-1 rounded-full font-semibold">
                Smart Search
              </span>
            </div>
            <h3 className="font-fraunces font-medium text-[1.6rem] leading-[1.2]">
              Find Your Perfect <em className="italic not-italic text-[#FFD700]">Phone</em>
            </h3>
            <p className="text-white/90 text-[0.9rem] mt-1 max-w-[400px]">
              Filter by brand, price, specs, and more. Compare side by side.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 text-[0.8rem] text-white/90">
              <span>500+ phones</span>
              <span className="w-px h-4 bg-white/30" />
              <span>9 brands</span>
            </span>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#FF6B00] font-bold text-[0.85rem] transition-all group-hover:scale-[1.02] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              Start Searching
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
        {/* Decorative orange elements */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
          <circle cx="700" cy="60" r="200" stroke="rgba(255,215,0,0.15)" strokeWidth="1" fill="none" />
          <circle cx="700" cy="60" r="260" stroke="rgba(255,215,0,0.10)" strokeWidth="1" fill="none" />
          <circle cx="50" cy="380" r="120" stroke="rgba(255,215,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      </Link>
    </section>
  );
}