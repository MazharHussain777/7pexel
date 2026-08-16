// app/phones/page.tsx
import { Header } from "@/components/Header";
import { PhonesHero } from "@/components/phones/PhonesHero";
import { FinderBanner } from "@/components/phones/FinderBanner";
import { Brands } from "@/components/phones/Brands";
import { RecentAdditions } from "@/components/phones/RecentAdditions";
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
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6 bg-white">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[#8B7355] pt-4.5 pb-2">
          <Link href="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[#4A3520] font-semibold">Phones</span>
        </div>

        <PhonesHero phonesCount={stats.published} brandsCount={brands.length} />
        
        <FinderBanner />
        
        <Brands />
        
        <RecentAdditions />
      </main>
    </>
  );
}