// app/phones/finder/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { getPhoneBySlug, getRelatedPhones, getAllPhones } from "@/lib/phone-service";
import { PhoneHero } from "@/components/phones/finder/PhoneHero";
import { PhoneSpecs } from "@/components/phones/finder/PhoneSpecs";
import { RelatedPhones } from "@/components/phones/finder/RelatedPhones";
import { PhoneJsonLd } from "@/components/phones/finder/PhoneJsonLd";
import Link from "next/link";

function serializePhone(phone: any) {
  if (!phone) return null;
  return {
    _id: phone._id?.toString() || phone._id,
    id: phone.id || phone._id?.toString(),
    slug: phone.slug,
    brand: phone.brand,
    model: phone.model,
    year: phone.year,
    price: phone.price,
    image: phone.image,
    rating: phone.rating || 0,
    category: phone.category || [],
    display: phone.display,
    displaySize: phone.displaySize,
    camera: phone.camera,
    cameraDetails: phone.cameraDetails,
    battery: phone.battery,
    chipset: phone.chipset,
    ram: phone.ram,
    storage: phone.storage,
    os: phone.os,
    weight: phone.weight,
    colors: phone.colors || [],
    highlights: phone.highlights || [],
    pros: phone.pros || [],
    cons: phone.cons || [],
    author: phone.author,
    authorAvatar: phone.authorAvatar,
    date: phone.date ? new Date(phone.date).toISOString() : new Date().toISOString(),
    readTime: phone.readTime,
    customStyles: phone.customStyles || '',
    contentHtml: phone.contentHtml,
    isFeatured: phone.isFeatured || false,
    isTrending: phone.isTrending || false,
    published: phone.published !== false,
    createdAt: phone.createdAt ? new Date(phone.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: phone.updatedAt ? new Date(phone.updatedAt).toISOString() : new Date().toISOString(),
  };
}

export async function generateStaticParams() {
  const { data: phones } = await getAllPhones({ limit: 1000 });
  return phones.map((phone) => ({
    slug: phone.slug,
  }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF6B00',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    return {
      title: "Phone Not Found | 7pexel",
      description: "The phone you're looking for doesn't exist or has been removed.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const fullName = `${phone.brand} ${phone.model}`;
  const year = phone.year || "2026";

  return {
    title: `${fullName} (${year}) Specs, Camera, Battery, Chipset & Review | 7pexel`,
    description: `Complete ${fullName} (${year}) specifications and review. ${phone.ram}GB RAM, ${phone.storage}GB storage, ${phone.battery} battery, ${phone.chipset} chipset.`,
    openGraph: {
      title: `${fullName} (${year}) – Full Specs, Camera, Battery & Performance`,
      description: `Detailed ${fullName} specifications and review.`,
      url: `${siteUrl}/phones/finder/${slug}`,
      siteName: "7pexel",
      images: [{ url: phone.image, width: 1200, height: 630, alt: fullName }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullName} – Full Specs & Review`,
      description: `Complete ${fullName} specifications and review.`,
      images: [phone.image],
    },
    alternates: {
      canonical: `${siteUrl}/phones/finder/${slug}`,
    },
  };
}

export default async function PhoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    notFound();
  }

  const relatedPhones = await getRelatedPhones(slug, 11);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/phones/finder/${slug}`;

  const serializedPhone = serializePhone(phone);
  const serializedRelated = relatedPhones.map(p => serializePhone(p));

  return (
    <>
      <Header />
      <PhoneJsonLd phone={serializedPhone} pageUrl={pageUrl} siteUrl={siteUrl} />

      <div className="min-h-screen bg-white w-full">
        <main className="w-full mx-0 px-0 py-6 md:py-12">
          <h1 className="sr-only">
            {phone.brand} {phone.model} ({phone.year}) – Complete Specifications, Camera Review, Battery Life & Performance | 7pexel
          </h1>

          <div className="w-full px-4 md:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[0.8rem] text-[#8B7355] mb-6">
              <Link href="/" className="text-[#FF6B00] hover:underline font-medium">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/phones" className="text-[#FF6B00] hover:underline font-medium">Phones</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/phones/finder" className="text-[#FF6B00] hover:underline font-medium">Finder</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="font-medium truncate max-w-[200px] text-[#4A3520]" aria-current="page">
                {phone.brand} {phone.model}
              </span>
            </nav>
          </div>

          <div className="w-full px-4 md:px-6 lg:px-8">
            <PhoneHero phone={serializedPhone} />
          </div>

          <div className="w-full mt-8">
            <PhoneSpecs phone={serializedPhone} />
          </div>

          <div className="w-full px-4 md:px-6 lg:px-8 mt-8">
            <RelatedPhones relatedPhones={serializedRelated} currentSlug={slug} />
          </div>
        </main>
      </div>
    </>
  );
}