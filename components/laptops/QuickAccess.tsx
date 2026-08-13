// components/laptops/QuickAccess.tsx
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import LaptopBrand from "@/models/LaptopBrand";

async function getQuickAccessBrands() {
  await dbConnect();
  
  const brands = await LaptopBrand.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .limit(8)
    .lean();
  
  return JSON.parse(JSON.stringify(brands));
}

export async function QuickAccess() {
  const brands = await getQuickAccessBrands();

  const quickLinks = brands.map((brand: any) => ({
    icon: brand.emoji || brand.icon || '💻',
    label: brand.name,
    href: `/laptops/brand/${brand.slug}`,
    color: brand.primaryColor || brand.color,
  }));

  // Add some category quick links
  const categoryLinks = [
    { icon: '🎮', label: 'Gaming', href: '/laptops/finder?categories=Gaming' },
    { icon: '💼', label: 'Business', href: '/laptops/finder?categories=Business' },
    { icon: '✨', label: 'Premium', href: '/laptops/finder?categories=Premium' },
    { icon: '🚀', label: 'Ultrabook', href: '/laptops/finder?categories=Ultrabook' },
  ];

  const allLinks = [...quickLinks, ...categoryLinks];

  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">⚡</span>
        <h2 className="font-fraunces font-medium text-[1.2rem] tracking-[-0.01em]">
          Quick <span className="text-[var(--color-green)]">Access</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {allLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-col items-center gap-1.5 p-3.5 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-paper)] transition-all hover:border-[var(--color-green)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,24,15,0.08)] group"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-[0.7rem] font-semibold group-hover:text-[var(--color-green)] transition-colors">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}