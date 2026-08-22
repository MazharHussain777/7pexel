// app/guides/category/[category]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GUIDES, GUIDE_CATEGORIES } from "../../data/guides-data";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = GUIDE_CATEGORIES.find(c => c.slug === category);
  
  if (!cat) {
    return { title: "Category Not Found | 7pexel" };
  }

  return {
    title: `${cat.name} - Expert Smartphone Guides | 7pexel`,
    description: cat.description,
    keywords: `${cat.name.toLowerCase()}, smartphone guides, phone tips, ${cat.name.toLowerCase()} tips`,
    openGraph: {
      title: `${cat.name} - Expert Smartphone Guides | 7pexel`,
      description: cat.description,
      type: "website",
      url: `https://7pexel.com/guides/category/${cat.slug}`,
    },
    alternates: {
      canonical: `https://7pexel.com/guides/category/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = GUIDE_CATEGORIES.find(c => c.slug === category);
  
  if (!cat) {
    notFound();
  }

  const categoryGuides = GUIDES.filter(g => g.categorySlug === category);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8faf9]">
        {/* Category Hero */}
        <section className={`bg-gradient-to-r ${cat.gradient} text-white py-12`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{cat.icon}</span>
              <div>
                <h1 className="font-fraunces text-4xl font-medium">{cat.name}</h1>
                <p className="text-white/80 mt-1">{cat.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {categoryGuides.length} Guides
                  </span>
                  <Link href="/guides" className="text-white/80 hover:text-white text-sm transition-colors">
                    ← Back to all guides
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
          {categoryGuides.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6d8a82]">No guides available in this category yet.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function GuideCard({ guide }: { guide: any }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#e8edec] hover:border-[#004643] transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">{guide.icon}</span>
          <span className="text-xs text-[#6d8a82] font-medium">{guide.category}</span>
        </div>
        <h3 className="font-fraunces text-lg font-medium text-[#1a1a1a] group-hover:text-[#004643] transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-[#6d8a82] mt-2 line-clamp-2">{guide.excerpt}</p>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#e8edec]">
          <span className="text-xs text-[#6d8a82]">{guide.readTime}</span>
          <span className="text-xs text-[#6d8a82]">•</span>
          <span className="text-xs text-[#6d8a82]">{guide.date}</span>
        </div>
      </div>
    </Link>
  );
}