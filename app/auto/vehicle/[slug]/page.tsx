// app/auto/vehicle/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BRANDS,
  VEHICLES,
  CATEGORIES,
  getBrandById,
  getVehicleBySlug,
  getSimilarBrands,
  formatPrice,
} from "@/app/auto/data/vehicles";
import { BrandCard } from "@/components/BrandCard";
import { VehicleBreadcrumb } from "@/components/vehicles/VehicleBreadcrumb";
import { VehicleHero } from "@/components/vehicles/VehicleHero";
import { VehicleQuickOverview } from "@/components/vehicles/VehicleQuickOverview";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { VehicleBottomNav } from "@/components/vehicles/VehicleBottomNav";
import { VehicleMoreFromBrand } from "@/components/vehicles/VehicleMoreFromBrand";

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  return VEHICLES.map((v) => ({
    slug: v.slug,
  }));
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | 7pexel Auto",
      description: "The vehicle you're looking for doesn't exist.",
    };
  }

  const brand = getBrandById(vehicle.brandId);
  const category = vehicle.cats[0]
    ? CATEGORIES.find((c) => c.key === vehicle.cats[0])?.name || vehicle.cats[0]
    : "";

  return {
    title: `${brand?.name || vehicle.brandId} ${vehicle.model} — Full Specs, Price & Reviews | 7pexel Auto`,
    description: `Explore the ${brand?.name || vehicle.brandId} ${vehicle.model}. ${category} with ${
      vehicle.range || "N/A"
    }mi range, ${vehicle.horsepower || "N/A"} HP, starting at ${formatPrice(vehicle.price)}. Full specs, reviews, and comparisons.`,
    keywords: `${brand?.name || vehicle.brandId}, ${vehicle.model}, ${vehicle.model} specs, ${vehicle.model} price, ${vehicle.model} range, ${category}, auto, vehicles`,
    openGraph: {
      title: `${brand?.name || vehicle.brandId} ${vehicle.model}`,
      description: `${category} • ${vehicle.size} • ${formatPrice(vehicle.price)}`,
      images: [{ url: vehicle.img, alt: `${brand?.name || vehicle.brandId} ${vehicle.model}` }],
      type: "website",
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const brand = getBrandById(vehicle.brandId);
  const similarBrands = brand ? getSimilarBrands(brand, 5) : [];
  const brandVehicles = brand
    ? VEHICLES.filter((v) => v.brandId === brand.id && v.slug !== slug).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main>
        <VehicleBreadcrumb
          brand={brand}
          brandId={vehicle.brandId}
          model={vehicle.model}
        />

        <VehicleHero vehicle={vehicle} brand={brand} />

        <div className="wrap">
          <VehicleQuickOverview vehicle={vehicle} />

          {/* ─── VEHICLE SPECS ────────────────────────────── */}
          <VehicleSpecs vehicle={vehicle} />

          {brand && brandVehicles.length > 0 && (
            <VehicleMoreFromBrand brand={brand} vehicles={brandVehicles} />
          )}

          {similarBrands.length > 0 && (
            <section className="mb-12 py-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-[14px] bg-green-950/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏷️</span>
                </div>
                <div className="flex justify-between items-center flex-1 flex-wrap gap-2.5">
                  <h2 className="font-fraunces font-medium text-[1.8rem] tracking-[-0.01em]">
                    Similar <em className="italic not-italic text-[var(--color-green)]">Brands</em>
                  </h2>
                  <Link
                    href="/auto/brands"
                    className="text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-colors"
                  >
                    View all →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {similarBrands.map((b) => (
                  <BrandCard key={b.id} brand={b} variant="compact" />
                ))}
              </div>
            </section>
          )}

          <VehicleBottomNav brand={brand} brandId={vehicle.brandId} />
        </div>
      </main>

      <Footer />
    </div>
  );
}