// app/guides/[slug]/page.tsx - REMOVE styled-jsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GUIDES, getRelatedGuides, COLOR_SCHEMES } from "../data/guides-data";
import Link from "next/link";

// ============================================
// METADATA
// ============================================

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find(g => g.slug === slug);
  
  if (!guide) {
    return {
      title: "Guide Not Found | 7pexel",
      description: "The guide you're looking for doesn't exist.",
    };
  }

  return {
    title: guide.seoTitle || `${guide.title} | 7pexel Guides`,
    description: guide.seoDescription || guide.excerpt,
    keywords: guide.seoKeywords?.join(", ") || guide.tags.join(", "),
    openGraph: {
      title: guide.seoTitle || `${guide.title} | 7pexel Guides`,
      description: guide.seoDescription || guide.excerpt,
      type: "article",
      url: `https://7pexel.com/guides/${guide.slug}`,
      publishedTime: guide.date,
      authors: [guide.author],
      tags: guide.tags,
      images: [
        {
          url: guide.image || "/og-guides.jpg",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: [guide.image || "/og-guides.jpg"],
    },
    alternates: {
      canonical: `https://7pexel.com/guides/${guide.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// ============================================
// GENERATE STATIC PARAMS
// ============================================

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

// ============================================
// MAIN COMPONENT
// ============================================

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find(g => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(slug, 4);

  // ─── GET COLORS FROM GUIDE DATA ───
  const colors = guide.colors || COLOR_SCHEMES.buying;

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || []
  };

  return (
    <>
      <Header />
      
      {guide.faqs && guide.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-white">
        {/* ============================================================ */}
        {/* HERO - FULL BLEED WITH DYNAMIC COLORS */}
        {/* ============================================================ */}
        <div 
          className="w-full text-white"
          style={{ background: colors.heroBg }}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span 
                className="text-sm tracking-[0.14em] uppercase font-medium"
                style={{ color: colors.heroAccent }}
              >
                7pexel / {guide.category} / 2026
              </span>
            </div>
            <h1 className="font-poppins font-medium text-3xl md:text-4xl lg:text-5xl leading-[1.15] max-w-4xl mx-auto">
              {guide.title}
            </h1>
            <p 
              className="text-base md:text-lg max-w-3xl mx-auto mt-4"
              style={{ color: colors.heroAccent + 'cc' }}
            >
              {guide.excerpt}
            </p>
            <div 
              className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm"
              style={{ color: colors.heroAccent + '99' }}
            >
              <span>📅 Updated: {new Date(guide.updatedDate || guide.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>⏱️ {guide.readTime}</span>
              <span>📊 {guide.difficulty}</span>
              <span>👁️ {guide.views} views</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* HERO IMAGE - FULL WIDTH */}
        {/* ============================================================ */}
        <div className="w-full">
          <img
            src={guide.image || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1600&q=80'}
            alt={guide.title}
            className="w-full h-[44vw] max-h-[520px] min-h-[280px] object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* ============================================================ */}
        {/* TICKER / SPEC SCROLLER WITH DYNAMIC COLORS */}
        {/* ============================================================ */}
        <div 
          className="w-full border-t overflow-hidden whitespace-nowrap guide-ticker"
          style={{ 
            borderColor: colors.border,
            background: colors.primary + '08'
          }}
        >
          <div className="inline-flex guide-ticker-track py-4">
            {guide.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[13px] px-8 border-r"
                style={{ 
                  color: colors.primaryDark,
                  borderColor: colors.border
                }}
              >
                <b style={{ color: colors.accent }} className="font-medium">#{tag}</b>
              </span>
            ))}
            {/* Duplicate for seamless scroll */}
            {guide.tags.map((tag, idx) => (
              <span 
                key={`dup-${idx}`} 
                className="text-[13px] px-8 border-r"
                style={{ 
                  color: colors.primaryDark,
                  borderColor: colors.border
                }}
              >
                <b style={{ color: colors.accent }} className="font-medium">#{tag}</b>
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN LAYOUT - CONTENT + SIDEBAR */}
        {/* ============================================================ */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
          
          {/* ─── CONTENT ─── */}
          <div className="flex-1 min-w-0 max-w-full lg:max-w-[68%]">
            
            {/* Intro */}
            <div className="mb-8">
              <p 
                className="text-lg font-medium max-w-2xl"
                style={{ color: colors.primary }}
              >
                {guide.excerpt}
              </p>
            </div>

            {/* ─── TABLE OF CONTENTS WITH DYNAMIC COLORS ─── */}
            {guide.tableOfContents && guide.tableOfContents.length > 0 && (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border rounded-xl overflow-hidden mb-12"
                style={{ 
                  background: colors.border,
                  borderColor: colors.border
                }}
              >
                {guide.tableOfContents.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    className="bg-white p-5 hover:bg-[#F3F2ED] transition-colors text-[13px] tracking-[0.02em] flex flex-col gap-1 no-underline"
                    style={{ color: colors.primary }}
                  >
                    <span style={{ color: colors.accent }} className="font-medium">{String(idx + 1).padStart(2, '0')}</span>
                    {item.title}
                  </a>
                ))}
              </div>
            )}

            {/* ─── CONTENT RENDER ─── */}
            <div 
              className="prose prose-sm md:prose-base max-w-none guide-content"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            {/* ─── RELATED GUIDES BOTTOM ─── */}
            {relatedGuides.length > 0 && (
              <div className="mt-12 pt-8 border-t" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-poppins text-xl font-bold" style={{ color: colors.primary }}>
                    Related Guides
                  </h2>
                  <span className="text-[#54655F] text-xs uppercase tracking-[0.08em]">Keep Reading</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {relatedGuides.map((related) => (
                    <Link
                      key={related.id}
                      href={`/guides/${related.slug}`}
                      className="group block border rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all"
                      style={{ borderColor: colors.border }}
                    >
                      <img
                        src={related.image || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80'}
                        alt={related.title}
                        className="w-full h-[140px] object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <span className="text-[10.5px] uppercase font-semibold tracking-[0.06em]" style={{ color: colors.accent }}>
                          {related.category}
                        </span>
                        <h5 className="font-poppins font-semibold text-sm mt-2 mb-1 leading-tight group-hover:transition-colors" style={{ color: colors.primary }}>
                          {related.title}
                        </h5>
                        <p className="text-[#54655F] text-[13px] line-clamp-2">{related.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ─── FOOTER ─── */}
            <footer className="mt-12 pt-6 border-t text-[#54655F] text-xs" style={{ borderColor: colors.border }}>
              7PEXEL — SMARTPHONE SPECS, COMPARISONS &amp; BUYING GUIDES — 2026
            </footer>
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="w-full lg:w-[300px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start">
            <div 
              className="border rounded-xl p-5"
              style={{ 
                background: colors.bg,
                borderColor: colors.border
              }}
            >
              <div className="text-[#54655F] text-xs uppercase tracking-[0.1em] flex items-center gap-2 mb-4">
                <span className="w-4 h-px inline-block" style={{ background: colors.accent }}></span>
                Related Guides
              </div>

              {relatedGuides.slice(0, 4).map((related) => (
                <Link
                  key={related.id}
                  href={`/guides/${related.slug}`}
                  className="block pb-4 mb-4 border-b last:border-b-0 last:mb-0 last:pb-0 group"
                  style={{ borderColor: colors.border }}
                >
                  <img
                    src={related.image || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80'}
                    alt={related.title}
                    className="w-full h-[150px] object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <span className="text-[10.5px] uppercase font-semibold tracking-[0.06em]" style={{ color: colors.accent }}>
                    {related.category}
                  </span>
                  <h5 className="font-poppins font-semibold text-base mt-2 mb-1 leading-snug group-hover:transition-colors" style={{ color: colors.primary }}>
                    {related.title}
                  </h5>
                  <p className="text-[#54655F] text-sm">{related.excerpt}</p>
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                <Link
                  href="/guides"
                  className="block text-center text-white font-semibold text-sm py-3 rounded-lg transition-colors"
                  style={{ background: colors.primary }}
                >
                  Browse All Guides →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}