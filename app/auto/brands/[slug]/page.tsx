// app/auto/brands/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrandCard } from "@/components/BrandCard";
import {
  BRANDS,
  VEHICLES,
  CATEGORIES,
  getBrandBySlug,
  getSimilarBrands,
  formatPrice,
} from "@/app/auto/data/vehicles";

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    slug: brand.slug,
  }));
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand Not Found | 7pexel Auto",
      description: "The brand you're looking for doesn't exist.",
    };
  }

  return {
    title: `${brand.name} — All Models, Specs & Reviews | 7pexel Auto`,
    description: `Explore all ${brand.name} models, specifications, prices, and reviews. ${brand.name} offers ${brand.models} vehicles including ${brand.popularModels.slice(0, 3).join(", ")}.`,
    keywords: `${brand.name}, ${brand.name} cars, ${brand.name} models, ${brand.name} price, ${brand.name} reviews, auto, vehicles`,
    openGraph: {
      title: `${brand.name} — Complete Brand Guide`,
      description: brand.description,
      images: [{ url: brand.image, alt: brand.name }],
      type: "website",
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const brandVehicles = VEHICLES.filter((v) => v.brandId === brand.id);
  const similarBrands = getSimilarBrands(brand, 5);

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/auto" className="hover:text-[var(--color-green)] transition-colors">
            Auto
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/auto/brands" className="hover:text-[var(--color-green)] transition-colors">
            Brands
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">{brand.name}</span>
        </div>

        {/* ─── BRAND HERO ────────────────────────────────── */}
        <section className="relative rounded-[16px] overflow-hidden mb-8 bg-white border border-[var(--color-line)] shadow-sm">
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-wrap gap-8 items-start">
              {/* Brand Logo */}
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-[16px] flex items-center justify-center text-white font-fraunces font-bold text-2xl"
                  style={{ background: brand.grad }}
                >
                  {brand.logo}
                </div>
              </div>

              {/* Brand Info */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="font-fraunces font-medium text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.02em]">
                    {brand.name}
                  </h1>
                  {brand.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/auto/${cat.toLowerCase()}`}
                      className="text-[0.6rem] px-2.5 py-0.5 rounded-full bg-green-950/10 text-[var(--color-green-deep)] font-bold uppercase tracking-[0.05em] font-jetbrains-mono hover:bg-[var(--color-green)] hover:text-white transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-[0.85rem] text-[var(--color-ink-soft)] mb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="text-lg">🌍</span>
                    {brand.country}
                  </span>
                  <span className="w-px h-4 bg-[var(--color-line)]" />
                  <span>Founded: {brand.founded}</span>
                  <span className="w-px h-4 bg-[var(--color-line)]" />
                  <span className="font-semibold text-[var(--color-ink)]">{brand.models} Models</span>
                </div>

                <p className="text-[0.95rem] text-[var(--color-ink-soft)] leading-[1.7] max-w-[600px]">
                  {brand.description}
                </p>

                {brand.popularModels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[0.7rem] font-medium text-[var(--color-ink-soft)] mr-1">Popular:</span>
                    {brand.popularModels.map((model) => (
                      <span
                        key={model}
                        className="text-[0.7rem] px-2.5 py-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] font-medium"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 flex gap-6 bg-[var(--color-paper)] px-5 py-3.5 rounded-[12px] border border-[var(--color-line)]">
                <div className="text-center">
                  <div className="font-fraunces font-semibold text-[1.5rem] text-[var(--color-green-deep)]">
                    {brandVehicles.length}
                  </div>
                  <div className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
                    Models
                  </div>
                </div>
                <div className="w-px bg-[var(--color-line)]" />
                <div className="text-center">
                  <div className="font-fraunces font-semibold text-[1.5rem] text-[var(--color-green-deep)]">
                    {brand.categories.length}
                  </div>
                  <div className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
                    Categories
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ALL MODELS ────────────────────────────────── */}
        <section>
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
              All {brand.name} <em className="italic not-italic text-[var(--color-green)]">Models</em>
            </h2>
            <span className="text-[0.84rem] text-[var(--color-ink-soft)]">{brandVehicles.length} vehicles</span>
          </div>

          {brandVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brandVehicles.map((veh) => (
                <Link
                  key={veh.slug}
                  href={`/auto/vehicle/${veh.slug}`}
                  className="border border-[var(--color-line)] rounded-[10px] overflow-hidden bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)] group block"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image
                      src={veh.img}
                      alt={`${brand.name} ${veh.model}`}
                      width={640}
                      height={480}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.4)]" />
                    <span className="absolute bottom-2.5 left-2.5 z-10 font-jetbrains-mono text-[0.63rem] text-white font-semibold capitalize bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      {veh.size}
                    </span>
                  </div>
                  <div className="p-3.5 pb-4">
                    <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3]">
                      {veh.model}
                    </h4>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {veh.cats.slice(0, 2).map((c) => {
                        const catInfo = CATEGORIES.find((cat) => cat.key === c);
                        return (
                          <span
                            key={c}
                            className="text-[0.55rem] px-2 py-0.5 rounded-full bg-green-950/10 text-[var(--color-green-deep)] font-bold uppercase tracking-[0.02em] font-jetbrains-mono"
                          >
                            {catInfo?.icon || ""} {c}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex justify-end items-center pt-2 mt-2 border-t border-dashed border-[var(--color-line)] text-[0.8rem]">
                      <span className="flex items-center gap-1.5 text-[var(--color-green)] font-semibold text-[0.7rem] group-hover:gap-2 transition-all">
                        View Details
                        <svg
                          className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 bg-[var(--color-paper)] rounded-[16px] border border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)]">No models available for {brand.name} yet.</p>
            </div>
          )}
        </section>

        {/* ─── SIMILAR BRANDS ────────────────────────────── */}
        {similarBrands.length > 0 && (
          <section className="pt-8">
            <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
              <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
                Similar <em className="italic not-italic text-[var(--color-green)]">Brands</em>
              </h2>
              <Link
                href="/auto/brands"
                className="text-[0.78rem] text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {similarBrands.map((b) => (
                <BrandCard key={b.id} brand={b} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* ─── BACK TO BRANDS ────────────────────────────── */}
        <div className="pt-6 pb-2">
          <Link
            href="/auto/brands"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline"
          >
            ← Back to all brands
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}