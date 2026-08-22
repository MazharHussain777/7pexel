// app/guides/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GUIDES, GUIDE_CATEGORIES } from "./data/guides-data";
import Link from "next/link";

// ============================================
// METADATA - FIXED CANONICAL
// ============================================

export const metadata: Metadata = {
  title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
  description: "Expert smartphone guides covering buying advice, camera tips, battery life, performance, security, and more. Find the best phone for you.",
  keywords: "smartphone guides, phone buying guide, camera tips, battery life tips, phone security, tech tutorials, best phones 2026",
  openGraph: {
    title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
    description: "Expert smartphone guides covering buying advice, camera tips, battery life, performance, and security.",
    url: "https://7pexel.com/guides",
    type: "website",
    siteName: "7pexel",
    images: [
      {
        url: "/og-guides.jpg",
        width: 1200,
        height: 630,
        alt: "Smartphone Guides - 7pexel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
    description: "Expert smartphone guides covering buying advice, camera tips, battery life, and more.",
    images: ["/og-guides.jpg"],
    site: "@7pexel",
    creator: "@7pexel",
  },
  alternates: {
    canonical: "https://7pexel.com/guides", // ✅ FIXED CANONICAL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ============================================
// SCHEMA MARKUP
// ============================================

const schemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Smartphone Guides",
  "description": "Expert smartphone guides covering buying advice, camera tips, battery life, performance, security, and more.",
  "url": "https://7pexel.com/guides",
  "about": {
    "@type": "Thing",
    "name": "Smartphone Guides"
  },
  "publisher": {
    "@type": "Organization",
    "name": "7pexel",
    "logo": {
      "@type": "ImageObject",
      "url": "https://7pexel.com/logo.png"
    }
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function GuidesPage() {
  const featuredGuides = GUIDES.filter(g => g.isFeatured).slice(0, 6);
  const categories = GUIDE_CATEGORIES;

  return (
    <>
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-[#f8faf9]">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#004643] via-[#006b63] to-[#008b7a] text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
          
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">📚</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold backdrop-blur-sm border border-white/10">
                  Smartphone Guides
                </span>
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                Expert Smartphone <br />
                <span className="text-[#8bc4b8]">Guides & Tips</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                Everything you need to know about smartphones — from buying advice to photography tips,
                battery life hacks, and security guides.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/5">
                  <span className="text-2xl">📖</span>
                  <span className="text-sm font-medium">{GUIDES.length} Guides</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/5">
                  <span className="text-2xl">📂</span>
                  <span className="text-sm font-medium">{categories.length} Categories</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/5">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm font-medium">Expert Reviewed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SEARCH BAR */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-[#e8edec] p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#6d8a82]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search guides... (e.g., 'buying guide', 'camera tips')"
                className="flex-1 py-2 bg-transparent focus:outline-none text-[#1a1a1a] placeholder:text-[#a0b8b0]"
              />
              <button className="px-6 py-2 bg-[#004643] text-white rounded-xl font-medium hover:bg-[#006b63] transition-colors">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CATEGORY NAVIGATION */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/guides/category/${cat.slug}`}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#e8edec] hover:border-[#004643] transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#004643] transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs bg-[#f0f5f3] text-[#6d8a82] px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* UNIQUE CONTENT - ADDED FOR SEO */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-4">
          <div className="bg-white rounded-2xl border border-[#e8edec] p-6 md:p-8">
            <h2 className="font-fraunces text-2xl font-medium text-[#1a1a1a] mb-4">
              Expert Smartphone Guides for Every Need
            </h2>
            <div className="space-y-4 text-[#6d8a82] leading-relaxed">
              <p>
                Welcome to 7pexel's comprehensive smartphone guides section. Whether you're a first-time buyer, 
                a photography enthusiast, or someone looking to extend your battery life, our expert guides 
                are designed to help you make the most of your smartphone.
              </p>
              <p>
                Our team of technology experts has created detailed, easy-to-follow guides covering every 
                aspect of smartphone ownership. From choosing the right device to mastering advanced features, 
                we've got you covered.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="p-4 bg-[#f8faf9] rounded-xl text-center">
                  <span className="text-3xl block mb-2">🛒</span>
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">Buying Guides</h3>
                  <p className="text-xs mt-1">Choose the perfect phone</p>
                </div>
                <div className="p-4 bg-[#f8faf9] rounded-xl text-center">
                  <span className="text-3xl block mb-2">📷</span>
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">Camera Guides</h3>
                  <p className="text-xs mt-1">Take better photos</p>
                </div>
                <div className="p-4 bg-[#f8faf9] rounded-xl text-center">
                  <span className="text-3xl block mb-2">🔋</span>
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">Battery Guides</h3>
                  <p className="text-xs mt-1">Make battery last longer</p>
                </div>
                <div className="p-4 bg-[#f8faf9] rounded-xl text-center">
                  <span className="text-3xl block mb-2">🔒</span>
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">Security Guides</h3>
                  <p className="text-xs mt-1">Protect your data</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FEATURED GUIDES */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <h2 className="font-fraunces text-2xl font-medium text-[#1a1a1a]">Featured Guides</h2>
            </div>
            <Link href="/guides/featured" className="text-sm text-[#004643] font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* ALL CATEGORIES SECTIONS */}
        {/* ============================================ */}
        {categories.slice(0, 4).map((category) => {
          const categoryGuides = GUIDES.filter(g => g.categorySlug === category.slug).slice(0, 4);
          return (
            <section key={category.id} className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="font-fraunces text-2xl font-medium text-[#1a1a1a]">{category.name}</h2>
                  <span className="text-sm bg-[#f0f5f3] text-[#6d8a82] px-3 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </div>
                <Link href={`/guides/category/${category.slug}`} className="text-sm text-[#004643] font-medium hover:underline">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryGuides.map((guide) => (
                  <GuideCardSmall key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          );
        })}

        {/* ============================================ */}
        {/* FAQ SECTION - ADDED FOR SEO */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="bg-white rounded-2xl border border-[#e8edec] p-6 md:p-8">
            <h2 className="font-fraunces text-2xl font-medium text-[#1a1a1a] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border border-[#e8edec] rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f8faf9] transition-colors">
                    <span className="text-sm font-medium text-[#1a1a1a]">What are smartphone guides?</span>
                    <svg className="w-4 h-4 text-[#6d8a82] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-3 text-sm text-[#6d8a82] leading-relaxed">
                    Smartphone guides are comprehensive articles that help you understand, choose, and use your smartphone better. They cover topics like buying advice, camera tips, battery life, security, and more.
                  </div>
                </details>
              </div>
              <div className="border border-[#e8edec] rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f8faf9] transition-colors">
                    <span className="text-sm font-medium text-[#1a1a1a]">How can I find the right guide for me?</span>
                    <svg className="w-4 h-4 text-[#6d8a82] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-3 text-sm text-[#6d8a82] leading-relaxed">
                    Browse our categories to find guides that match your interests. Whether you're looking for buying advice, photography tips, or battery hacks, we have guides for every need.
                  </div>
                </details>
              </div>
              <div className="border border-[#e8edec] rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f8faf9] transition-colors">
                    <span className="text-sm font-medium text-[#1a1a1a]">Are the guides regularly updated?</span>
                    <svg className="w-4 h-4 text-[#6d8a82] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-3 text-sm text-[#6d8a82] leading-relaxed">
                    Yes, all our guides are regularly updated with the latest information, new phones, and current best practices to ensure you always have the most relevant advice.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA SECTION */}
        {/* ============================================ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
          <div className="bg-gradient-to-r from-[#004643] to-[#006b63] rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="font-fraunces text-2xl md:text-3xl font-medium mb-3">
              Ready to Find Your Perfect Phone?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Use our comparison tool to find the best smartphone for your needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/phones/finder"
                className="px-6 py-3 bg-white text-[#004643] font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
              >
                🔍 Browse All Phones
              </Link>
              <Link
                href="/compare"
                className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                📊 Compare Phones
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ============================================
// GUIDE CARD COMPONENTS
// ============================================

function GuideCard({ guide }: { guide: any }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#e8edec] hover:border-[#004643] transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#f0f5f3] to-[#e8edec]">
        {guide.image ? (
          <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {guide.icon}
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {guide.isNew && (
            <span className="bg-[#004643] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {guide.isFeatured && (
            <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">⭐ FEATURED</span>
          )}
          {guide.isTrending && (
            <span className="bg-[#EC4899] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">🔥 TRENDING</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
          {guide.readTime}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">{guide.icon}</span>
          <span className="text-xs text-[#6d8a82] font-medium">{guide.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#d0ddd8]" />
          <span className="text-xs text-[#6d8a82]">{guide.date}</span>
        </div>
        <h3 className="font-fraunces text-lg font-medium text-[#1a1a1a] group-hover:text-[#004643] transition-colors line-clamp-2">
          {guide.title}
        </h3>
        <p className="text-sm text-[#6d8a82] mt-2 line-clamp-2">{guide.excerpt}</p>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#e8edec]">
          <span className="text-xs text-[#6d8a82]">📖 {guide.readTime}</span>
          <span className="text-xs text-[#6d8a82]">•</span>
          <span className="text-xs text-[#6d8a82]">📅 {guide.date}</span>
        </div>
      </div>
    </Link>
  );
}

function GuideCardSmall({ guide }: { guide: any }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group bg-white rounded-xl p-4 border border-[#e8edec] hover:border-[#004643] transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0f5f3] to-[#e8edec] flex items-center justify-center text-2xl flex-shrink-0">
          {guide.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#6d8a82]">{guide.category}</span>
            {guide.isNew && (
              <span className="text-[8px] bg-[#004643] text-white px-1.5 py-0.5 rounded-full">NEW</span>
            )}
          </div>
          <h4 className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#004643] transition-colors line-clamp-1">
            {guide.title}
          </h4>
          <p className="text-xs text-[#6d8a82] line-clamp-1 mt-0.5">{guide.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}