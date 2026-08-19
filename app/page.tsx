// app/page.tsx - Using only static data, no Supabase
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { QuickAccess } from "@/components/QuickAccess";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";
import Image from "next/image";
import { STATIC_PHONES } from '@/app/phones/finder/data/static-phone-data';

// ─── USE STATIC DATA DIRECTLY ──────────────────────────
const latestPhones = STATIC_PHONES.slice(0, 6).map(phone => ({
  ...phone,
  _id: phone._id || phone.id,
  name: phone.model,
  price: phone.price ? `$${phone.price}` : 'N/A',
  category: phone.category || [],
}));

// ─── BRANDS DATA ────────────────────────────────────────
const brands = [
  { name: "Tesla", slug: "tesla" },
  { name: "Toyota", slug: "toyota" },
  { name: "BMW", slug: "bmw" },
  { name: "Ford", slug: "ford" },
  { name: "Mercedes", slug: "mercedes-benz" },
  { name: "Audi", slug: "audi" },
];

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function Home() {
  // No database calls, just use static data directly
  
  return (
    <>
      <Header />
      <main className="wrap">
        <Hero />
        <QuickAccess />

        {/* Latest Phones Section */}
        <section className="py-12">
          <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
              Latest <em className="italic not-italic text-[#063F47]">Phones</em>
            </h2>
            <Link href="/phones" className="text-[0.85rem] font-semibold text-[#063F47] hover:underline flex items-center gap-1">
              View all <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {latestPhones.length > 0 ? (
              latestPhones.map((phone: any) => {
                const brandColor = phone.brand === "Apple" ? "#555" : 
                                  phone.brand === "Samsung" ? "#1428A0" : 
                                  phone.brand === "Google" ? "#4285F4" : "#555";
                return (
                  <Link
                    key={phone._id || phone.slug || Math.random().toString()}
                    href={`/phones/finder/${phone.slug}`}
                    className="group border border-[var(--color-line)] rounded-[14px] p-4 bg-[var(--color-paper)] text-center transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-fraunces font-bold text-[0.9rem] mb-2"
                      style={{ background: `linear-gradient(150deg, ${brandColor}, ${brandColor}dd)` }}
                    >
                      {phone.brand?.charAt(0) || "?"}
                    </div>
                    <h5 className="font-fraunces font-semibold text-[0.85rem] group-hover:text-[#063F47] transition-colors line-clamp-1">
                      {phone.brand} {phone.model}
                    </h5>
                    <span className="text-[0.65rem] text-[var(--color-ink-soft)] font-jetbrains-mono">
                      {phone.price ? `$${phone.price}` : "N/A"}
                    </span>
                    <div className="flex justify-center gap-1 mt-1.5">
                      {(phone.category || []).slice(0, 2).map((cat: string) => (
                        <span key={cat} className="text-[0.45rem] px-1.5 py-0.5 rounded-full bg-green-950/10 text-[var(--color-green-deep)] font-bold uppercase tracking-[0.03em]">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-[var(--color-ink-soft)] col-span-full text-center py-8">No phones available</p>
            )}
          </div>
        </section>

        {/* Latest News - You can keep this section or remove it */}
        <section className="py-12">
          <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
              Latest <em className="italic not-italic text-[#063F47]">News</em>
            </h2>
            <Link href="/news" className="text-[0.85rem] font-semibold text-[#063F47] hover:underline flex items-center gap-1">
              View all <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <p className="text-[var(--color-ink-soft)] col-span-full text-center py-8">
              News coming soon
            </p>
          </div>
        </section>

        {/* Auto Brands Section */}
        <section className="py-16">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-8 rounded-full bg-[#063F47]" />
                <h2 className="font-fraunces font-medium text-[1.9rem] tracking-[-0.02em] text-[#1A2A2E]">
                  Auto <em className="italic not-italic text-[#063F47]">Brands</em>
                </h2>
              </div>
              <p className="text-[0.85rem] text-[#4A5A5E] font-light ml-4">
                Discover the world's finest automotive manufacturers
              </p>
            </div>
            <Link 
              href="/auto/brands" 
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#063F47]/20 text-[0.8rem] font-semibold text-[#063F47] transition-all duration-300 hover:bg-[#063F47] hover:text-white hover:shadow-[0_4px_16px_rgba(6,63,71,0.20)] hover:-translate-y-0.5"
            >
              Explore All Brands
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/auto/brands/${brand.slug}`}
                className="group relative border border-[var(--color-line)] rounded-[14px] p-5 bg-white text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(6,63,71,0.12)] hover:border-[#063F47] overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-[1.4rem] font-fraunces font-bold transition-all duration-500 bg-[#f5f8f6] text-[#063F47] group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(6,63,71,0.15)] relative">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      {brand.name.charAt(0)}
                    </span>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#063F47]/30 transition-all duration-500 scale-0 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-[#063F47] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <h5 className="font-fraunces font-semibold text-[0.95rem] mt-3 transition-colors duration-300 text-[#1A2A2E] group-hover:text-[#063F47] leading-tight tracking-[-0.01em]">
                    {brand.name}
                  </h5>
                  
                  <p className="text-[0.55rem] font-light text-[#8A9A9E] mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    {brand.name === "Tesla" ? "Innovation" :
                     brand.name === "Toyota" ? "Reliability" :
                     brand.name === "BMW" ? "Performance" :
                     brand.name === "Ford" ? "Heritage" :
                     brand.name === "Mercedes" ? "Luxury" :
                     brand.name === "Audi" ? "Precision" : "Premium"}
                  </p>
                </div>
                
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#063F47] transition-all duration-400 group-hover:w-10 rounded-full" />
                <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-[#063F47]/20 group-hover:bg-[#063F47] transition-all duration-300" />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-10 pt-6 border-t border-[var(--color-line)]">
            <div className="flex items-center gap-2 text-[0.7rem] text-[#8A9A9E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#063F47]" />
              <span>6 premium brands</span>
            </div>
            <div className="flex items-center gap-2 text-[0.7rem] text-[#8A9A9E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#063F47]" />
              <span>Luxury & performance</span>
            </div>
            <div className="flex items-center gap-2 text-[0.7rem] text-[#8A9A9E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#063F47]" />
              <span>Expert reviews</span>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </>
  );
}