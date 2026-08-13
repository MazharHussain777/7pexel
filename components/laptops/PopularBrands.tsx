// components/laptops/PopularBrands.tsx
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import LaptopBrand from "@/models/LaptopBrand";
import Laptop from "@/models/Laptop";

interface BrandData {
  _id: string;
  id: string;
  slug: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  count: number;
  isActive: boolean;
  order: number;
}

async function getBrandsFromDB() {
  await dbConnect();
  
  const brands = await LaptopBrand.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();
  
  // Get laptop counts for each brand
  const brandsWithCounts = await Promise.all(
    brands.map(async (brand) => {
      const count = await Laptop.countDocuments({ 
        brand: brand.name, 
        published: true 
      });
      return { ...brand, count };
    })
  );
  
  return JSON.parse(JSON.stringify(brandsWithCounts));
}

export async function PopularBrands() {
  const brands = await getBrandsFromDB();

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Popular <span className="text-[var(--color-green)]">Brands</span>
        </h2>
        <Link href="/laptops/finder" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {brands.map((brand: BrandData) => (
          <Link
            key={brand._id}
            href={`/laptops/brand/${brand.slug}`}
            className="border border-[var(--color-line)] rounded-[14px] p-4 bg-[var(--color-paper)] text-center flex flex-col items-center gap-2 transition-all hover:border-[var(--color-green)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,24,15,0.08)] group"
          >
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center text-white font-fraunces font-bold text-[1.2rem] transition-all group-hover:scale-110"
              style={{ background: `linear-gradient(150deg, ${brand.primaryColor || brand.color}, ${brand.secondaryColor || brand.color}dd)` }}
            >
              {brand.emoji || brand.icon || brand.name.charAt(0)}
            </div>
            <h6 className="font-fraunces font-semibold text-[0.85rem] group-hover:text-[var(--color-green)] transition-colors">
              {brand.name}
            </h6>
            <span className="font-jetbrains-mono text-[0.6rem] text-[var(--color-ink-soft)]">
              {brand.count || 0} laptops
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}