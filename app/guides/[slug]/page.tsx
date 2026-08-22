// app/guides/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GUIDES } from "../data/guides-data";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find(g => g.slug === slug);
  
  if (!guide) {
    return { title: "Guide Not Found | 7pexel" };
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
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find(g => g.slug === slug);
  
  if (!guide) {
    notFound();
  }

  const relatedGuides = GUIDES.filter(g => g.id !== guide.id && g.categorySlug === guide.categorySlug).slice(0, 4);

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
      
      {/* FAQ Schema */}
      {guide.faqs && guide.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-[#f8faf9]">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-6">
          <nav className="flex items-center gap-2 text-sm text-[#6d8a82]">
            <Link href="/" className="hover:text-[#004643] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#004643] transition-colors">Guides</Link>
            <span>/</span>
            <Link href={`/guides/category/${guide.categorySlug}`} className="hover:text-[#004643] transition-colors">
              {guide.category}
            </Link>
            <span>/</span>
            <span className="text-[#1a1a1a] font-medium truncate">{guide.title}</span>
          </nav>
        </div>

        {/* Article */}
        <article className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#e8edec] p-6 md:p-8 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{guide.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-[#f0f5f3] text-[#6d8a82] px-2 py-0.5 rounded-full">
                        {guide.category}
                      </span>
                      <span className="text-xs text-[#6d8a82]">•</span>
                      <span className="text-xs text-[#6d8a82]">{guide.readTime}</span>
                      <span className="text-xs text-[#6d8a82]">•</span>
                      <span className="text-xs text-[#6d8a82]">{guide.date}</span>
                    </div>
                    <h1 className="font-fraunces text-2xl md:text-3xl font-medium text-[#1a1a1a]">
                      {guide.title}
                    </h1>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-[#f0f5f3] text-[#6d8a82] rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-fraunces prose-a:text-[#004643] prose-strong:text-[#1a1a1a]">
                  <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                </div>

                {/* FAQs */}
                {guide.faqs && guide.faqs.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-[#e8edec]">
                    <h2 className="font-fraunces text-xl font-medium text-[#1a1a1a] mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {guide.faqs.map((faq, idx) => (
                        <div key={idx} className="border border-[#e8edec] rounded-xl overflow-hidden">
                          <details className="group">
                            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f8faf9] transition-colors">
                              <span className="text-sm font-medium text-[#1a1a1a]">{faq.question}</span>
                              <svg className="w-4 h-4 text-[#6d8a82] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="px-4 pb-3 text-sm text-[#6d8a82] leading-relaxed">
                              {faq.answer}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <div className="bg-white rounded-2xl border border-[#e8edec] p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#004643] to-[#006b63] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                    {guide.authorAvatar ? (
                      <img src={guide.authorAvatar} alt={guide.author} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      guide.author.charAt(0)
                    )}
                  </div>
                  <h4 className="font-semibold text-[#1a1a1a] mt-2">{guide.author}</h4>
                  <p className="text-xs text-[#6d8a82]">Technology Expert</p>
                </div>

                {/* Table of Contents */}
                <div className="bg-white rounded-2xl border border-[#e8edec] p-4">
                  <h4 className="font-semibold text-[#1a1a1a] mb-3">📑 In This Guide</h4>
                  <ul className="space-y-1 text-sm text-[#6d8a82]">
                    <li><Link href="#introduction" className="hover:text-[#004643] transition-colors">1. Introduction</Link></li>
                    <li><Link href="#main-content" className="hover:text-[#004643] transition-colors">2. Main Content</Link></li>
                    <li><Link href="#faq" className="hover:text-[#004643] transition-colors">3. FAQs</Link></li>
                  </ul>
                </div>

                {/* Related Guides */}
                {relatedGuides.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#e8edec] p-4">
                    <h4 className="font-semibold text-[#1a1a1a] mb-3">📚 Related Guides</h4>
                    <div className="space-y-2">
                      {relatedGuides.map((g) => (
                        <Link
                          key={g.id}
                          href={`/guides/${g.slug}`}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#f8faf9] transition-colors"
                        >
                          <span className="text-xl">{g.icon}</span>
                          <span className="text-sm text-[#1a1a1a] hover:text-[#004643] transition-colors line-clamp-1">
                            {g.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}