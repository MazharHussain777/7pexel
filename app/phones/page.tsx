// app/phones/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhonesHero } from "@/components/phones/PhonesHero";
import { FinderBanner } from "@/components/phones/FinderBanner";
import { QuickAccess } from "@/components/phones/QuickAccess";
import { PopularBrands } from "@/components/phones/PopularBrands";
import { LatestPhones } from "@/components/phones/LatestPhones";
import { LatestReviews } from "@/components/phones/LatestReviews";
import { PopularComparisons } from "@/components/phones/PopularComparisons";
import { BuyingGuides } from "@/components/phones/BuyingGuides";
import { LatestNews } from "@/components/phones/LatestNews";
import { getBrands, getPhoneStats } from "@/lib/phone-service";
import Link from "next/link";

export default async function PhonesPage() {
  // Fetch data from database
  const [brands, stats] = await Promise.all([
    getBrands(),
    getPhoneStats(),
  ]);

  return (
    <>
      <Header />
      <main className="wrap">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] pt-4.5">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Phones</span>
        </div>

        <PhonesHero phonesCount={stats.published} brandsCount={brands.length} />
        
        <FinderBanner />
        
        <QuickAccess />
        
        <PopularBrands />
        
        <LatestPhones />
        
        <LatestReviews />
        
        <PopularComparisons />
        
        <BuyingGuides />
        
        <LatestNews />
        
    
      </main>
      <Footer />
    </>
  );
}