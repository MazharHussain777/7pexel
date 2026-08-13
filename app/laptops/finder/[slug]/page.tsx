// app/laptops/finder/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LaptopHero } from "@/components/laptops/finder/LaptopHero";
import { LaptopSpecs } from "@/components/laptops/finder/LaptopSpecs";
import { RelatedLaptops } from "@/components/laptops/finder/RelatedLaptops";
import { LaptopJsonLd } from "@/components/laptops/finder/LaptopJsonLd";
import dbConnect from "@/lib/mongodb";
import Laptop from "@/models/Laptop";

interface ILaptop {
  _id: string;
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  canonical?: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

// ─── FETCH FUNCTIONS ────────────────────────────────────

async function getLaptopFromDB(slug: string): Promise<ILaptop | null> {
  try {
    await dbConnect();
    const laptop = await Laptop.findOne({ slug, published: true }).lean();
    
    if (!laptop) return null;
    
    // Serialize MongoDB document to plain object
    return {
      _id: laptop._id.toString(),
      id: laptop.id || laptop._id.toString(),
      slug: laptop.slug,
      brand: laptop.brand,
      model: laptop.model,
      year: laptop.year || "2026",
      price: laptop.price,
      image: laptop.image,
      rating: laptop.rating || 0,
      category: laptop.category || [],
      display: laptop.display || "",
      displaySize: laptop.displaySize || "",
      processor: laptop.processor || "",
      processorBrand: laptop.processorBrand || "",
      ram: laptop.ram || "",
      storage: laptop.storage || "",
      storageType: laptop.storageType || "SSD",
      graphics: laptop.graphics || "",
      graphicsBrand: laptop.graphicsBrand || "",
      battery: laptop.battery || "",
      weight: laptop.weight || "",
      os: laptop.os || "",
      colors: laptop.colors || [],
      highlights: laptop.highlights || [],
      pros: laptop.pros || [],
      cons: laptop.cons || [],
      author: laptop.author || "7pexel Team",
      authorAvatar: laptop.authorAvatar || "7P",
      authorBio: laptop.authorBio || "",
      date: laptop.date ? new Date(laptop.date).toISOString() : new Date().toISOString(),
      readTime: laptop.readTime || "5 min read",
      customStyles: laptop.customStyles || "",
      contentHtml: laptop.contentHtml || "",
      canonical: laptop.canonical || "",
      published: laptop.published !== undefined ? laptop.published : true,
      isFeatured: laptop.isFeatured || false,
      isTrending: laptop.isTrending || false,
    };
  } catch (error) {
    console.error('Error fetching laptop from DB:', error);
    return null;
  }
}

async function getRelatedLaptopsFromDB(slug: string, brand: string, limit: number = 8): Promise<ILaptop[]> {
  try {
    await dbConnect();
    const laptops = await Laptop.find({
      brand,
      slug: { $ne: slug },
      published: true
    })
    .sort({ year: -1, rating: -1 })
    .limit(limit)
    .lean();
    
    return laptops.map((laptop) => ({
      _id: laptop._id.toString(),
      id: laptop.id || laptop._id.toString(),
      slug: laptop.slug,
      brand: laptop.brand,
      model: laptop.model,
      year: laptop.year || "2026",
      price: laptop.price,
      image: laptop.image,
      rating: laptop.rating || 0,
      category: laptop.category || [],
      display: laptop.display || "",
      displaySize: laptop.displaySize || "",
      processor: laptop.processor || "",
      processorBrand: laptop.processorBrand || "",
      ram: laptop.ram || "",
      storage: laptop.storage || "",
      storageType: laptop.storageType || "SSD",
      graphics: laptop.graphics || "",
      graphicsBrand: laptop.graphicsBrand || "",
      battery: laptop.battery || "",
      weight: laptop.weight || "",
      os: laptop.os || "",
      colors: laptop.colors || [],
      highlights: laptop.highlights || [],
      pros: laptop.pros || [],
      cons: laptop.cons || [],
      author: laptop.author || "7pexel Team",
      authorAvatar: laptop.authorAvatar || "7P",
      authorBio: laptop.authorBio || "",
      date: laptop.date ? new Date(laptop.date).toISOString() : new Date().toISOString(),
      readTime: laptop.readTime || "5 min read",
      customStyles: laptop.customStyles || "",
      contentHtml: laptop.contentHtml || "",
      canonical: laptop.canonical || "",
      published: laptop.published !== undefined ? laptop.published : true,
      isFeatured: laptop.isFeatured || false,
      isTrending: laptop.isTrending || false,
    }));
  } catch (error) {
    console.error('Error fetching related laptops from DB:', error);
    return [];
  }
}

async function getAllLaptopSlugs(): Promise<string[]> {
  try {
    await dbConnect();
    const laptops = await Laptop.find({ published: true }).select('slug').lean();
    return laptops.map(l => l.slug);
  } catch (error) {
    console.error('Error fetching laptop slugs:', error);
    return [];
  }
}

// ─── GENERATE STATIC PARAMS ─────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllLaptopSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── VIEWPORT ────────────────────────────────────────────

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0F6B3E',
};

// ─── METADATA ─────────────────────────────────────────────

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const laptop = await getLaptopFromDB(slug);

  if (!laptop) {
    return {
      title: "Laptop Not Found | 7pexel",
      description: "The laptop you're looking for doesn't exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/laptops/finder/${slug}`;

  const fullName = `${laptop.brand} ${laptop.model}`;
  const year = laptop.year || "2026";

  const title = `${fullName} (${year}) Specs, Processor, RAM, Display & Review | 7pexel`;
  const description = `Complete ${fullName} (${year}) specifications and review. ${laptop.ram}GB RAM, ${laptop.storage}GB storage, ${laptop.processor} processor, ${laptop.display} display. Read full specs, benchmarks, and pricing.`;

  return {
    title,
    description,
    openGraph: {
      title: `${fullName} (${year}) – Full Specs, Processor, Display & Performance`,
      description: `Detailed ${fullName} specifications. ${laptop.ram}GB RAM, ${laptop.storage}GB storage, ${laptop.processor} processor, ${laptop.display} display.`,
      url: pageUrl,
      siteName: "7pexel",
      images: [
        {
          url: laptop.image,
          width: 1200,
          height: 630,
          alt: `${fullName} - Premium Laptop Specifications`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// ─── MAIN COMPONENT ──────────────────────────────────────

export default async function LaptopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const laptop = await getLaptopFromDB(slug);
  const relatedLaptops = laptop ? await getRelatedLaptopsFromDB(slug, laptop.brand, 8) : [];

  if (!laptop) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/laptops/finder/${slug}`;

  return (
    <>
      <Header />
      <LaptopJsonLd laptop={laptop} pageUrl={pageUrl} siteUrl={siteUrl} />

      <div className="min-h-screen bg-[#fbf8ff] w-full">
        <main className="w-full mx-0 px-0 py-6 md:py-12">
          <h1 className="sr-only">
            {laptop.brand} {laptop.model} ({laptop.year}) – Complete Specifications, Processor Review, Battery Life & Performance | 7pexel
          </h1>

          <div className="w-full px-4 md:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[0.8rem] text-[var(--color-ink-soft)] mb-6">
              <a href="/" className="text-[var(--color-green)] hover:underline">Home</a>
              <span className="opacity-40" aria-hidden="true">/</span>
              <a href="/laptops" className="text-[var(--color-green)] hover:underline">Laptops</a>
              <span className="opacity-40" aria-hidden="true">/</span>
              <a href="/laptops/finder" className="text-[var(--color-green)] hover:underline">Finder</a>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="font-medium truncate max-w-[200px]" aria-current="page">
                {laptop.brand} {laptop.model}
              </span>
            </nav>
          </div>

          <div className="w-full px-4 md:px-6 lg:px-8">
            <LaptopHero laptop={laptop} />
          </div>

          <div className="w-full mt-8">
            <LaptopSpecs laptop={laptop} />
          </div>

          {relatedLaptops.length > 0 && (
            <div className="w-full px-4 md:px-6 lg:px-8 mt-8">
              <RelatedLaptops relatedLaptops={relatedLaptops} currentSlug={slug} />
            </div>
          )}

          <div className="w-full px-4 md:px-6 lg:px-8">
            <footer className="mt-8 pt-4 border-t border-[rgba(15,24,15,0.06)]">
              <div className="text-center text-xs text-[var(--color-ink-soft)]/50">
                <p>
                  {laptop.brand} {laptop.model} specifications and review page. Last updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}