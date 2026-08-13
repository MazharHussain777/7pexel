// app/laptops/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LaptopsHero } from "@/components/laptops/LaptopsHero";
import { FinderBanner } from "@/components/laptops/FinderBanner";
import { QuickAccess } from "@/components/laptops/QuickAccess";
import { PopularBrands } from "@/components/laptops/PopularBrands";
import { LatestLaptops } from "@/components/laptops/LatestLaptops";
import { LatestReviews } from "@/components/laptops/LatestReviews";
import { PopularComparisons } from "@/components/laptops/PopularComparisons";
import { BuyingGuides } from "@/components/laptops/BuyingGuides";
import { LatestNews } from "@/components/laptops/LatestNews";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Laptop from "@/models/Laptop";

async function getLaptopsData() {
  await dbConnect();
  
  const [allLaptops, latestLaptops, popularLaptops] = await Promise.all([
    Laptop.find({ published: true }).lean(),
    Laptop.find({ published: true })
      .sort({ year: -1 })
      .limit(6)
      .lean(),
    Laptop.find({ published: true })
      .sort({ rating: -1 })
      .limit(6)
      .lean(),
  ]);

  return {
    allLaptops: JSON.parse(JSON.stringify(allLaptops)),
    latestLaptops: JSON.parse(JSON.stringify(latestLaptops)),
    popularLaptops: JSON.parse(JSON.stringify(popularLaptops)),
  };
}

export default async function LaptopsPage() {
  const { allLaptops, latestLaptops, popularLaptops } = await getLaptopsData();

  return (
    <>
      <Header />
      <main className="wrap">
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] pt-4.5">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Laptops</span>
        </div>

        <LaptopsHero laptopsCount={allLaptops.length} brandsCount={0} />
        <FinderBanner />
        <QuickAccess />
        <PopularBrands />
        <LatestLaptops laptops={latestLaptops} />
        <LatestReviews laptops={popularLaptops} />
        <PopularComparisons />
        <BuyingGuides />
        <LatestNews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}