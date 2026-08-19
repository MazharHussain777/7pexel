// app/phones/finder/[slug]/PhoneDetailClient.tsx
'use client';

import { useState } from "react";
import { Header } from "@/components/Header";
import { PhoneHero } from "@/components/phones/finder/PhoneHero";
import { PhoneSpecs } from "@/components/phones/finder/PhoneSpecs";
import { PhoneJsonLd } from "@/components/phones/finder/PhoneJsonLd";
import { PhoneReviews } from "@/components/phones/finder/PhoneReviews";
import { PhoneFAQ } from "@/components/phones/finder/PhoneFAQ";
import { PhoneGrid } from "@/components/phones/finder/PhoneGrid";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getImageKitUrl, getPhoneImage } from "@/lib/imagekit";
import { getBrandEmoji } from "@/app/phones/finder/data/phone-helpers";

interface PhoneDetailClientProps {
  phone: any;
  relatedPhones: any[];
  allPhones: any;
}

// ============================================
// RELATED PHONE CLEAN COMPONENT
// ============================================

function RelatedPhoneClean({ phone }: { phone: any }) {
  const [imgError, setImgError] = useState(false);
  
  const getImageUrl = () => {
    if (imgError) return null;
    if (phone.image) {
      if (phone.image.includes('ik.imagekit.io')) return phone.image;
      if (phone.image.includes('http')) return phone.image;
      return getImageKitUrl(phone.image, { width: 150, height: 200, quality: 80, format: 'webp' });
    }
    return getPhoneImage(phone.brand, phone.model, { width: 150, height: 200, quality: 80 });
  };

  const imageUrl = getImageUrl();

  return (
    <Link
      href={`/phones/finder/${phone.slug}`}
      className="group block transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#f5f8f6] to-[#e8f0ec]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${phone.brand} ${phone.model} smartphone`}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            {getBrandEmoji(phone.brand)}
          </div>
        )}
        <div className="absolute bottom-1 right-1 bg-black/30 backdrop-blur-sm text-white text-[0.3rem] font-medium px-1.5 py-0.5 rounded-full">
          {phone.year}
        </div>
      </div>
      <div className="text-center mt-1">
        <div className="text-[0.4rem] uppercase tracking-[0.08em] text-gray-400 font-semibold truncate">
          {phone.brand}
        </div>
        <div className="text-[0.5rem] font-medium text-gray-700 truncate group-hover:text-[#FF6B00] transition-colors">
          {phone.model}
        </div>
      </div>
    </Link>
  );
}

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

export default function PhoneDetailClient({ phone, relatedPhones, allPhones }: PhoneDetailClientProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const pageUrl = `${siteUrl}/phones/finder/${phone.slug}`;

  // Get FAQ data
  const faqData = phone.seo?.faqSchema || [
    {
      question: `What is the price of ${phone.brand} ${phone.model}?`,
      answer: `The ${phone.brand} ${phone.model} is priced at $${phone.price} in ${phone.year}.`,
      category: '💰 Price'
    },
    {
      question: `What are the main features of ${phone.brand} ${phone.model}?`,
      answer: `${phone.brand} ${phone.model} features a ${phone.display_size} ${phone.display_type} display, ${phone.camera_details} camera system, ${phone.battery}mAh battery, and ${phone.chipset_details} processor.`,
      category: '✨ Features'
    },
    {
      question: `Is ${phone.brand} ${phone.model} good for gaming?`,
      answer: `Yes, ${phone.brand} ${phone.model} is excellent for gaming with its ${phone.chipset_details} chipset and ${phone.ram}GB RAM.`,
      category: '🎮 Gaming'
    },
    {
      question: `What is the battery life of ${phone.brand} ${phone.model}?`,
      answer: `${phone.brand} ${phone.model} offers ${phone.battery_life} with its ${phone.battery}mAh battery.`,
      category: '🔋 Battery'
    },
    {
      question: `Does ${phone.brand} ${phone.model} support 5G?`,
      answer: `Yes, the ${phone.brand} ${phone.model} supports 5G connectivity for ultra-fast internet speeds.`,
      category: '📶 Connectivity'
    }
  ];

  // Get Pros/Cons data
  const prosData = phone.pros || [
    'Excellent camera quality',
    'Great performance',
    'Premium design',
    'Long battery life'
  ];
  const consData = phone.cons || [
    'Expensive',
    'No charger included',
    'No expandable storage'
  ];

  // Get phone name for schema
  const fullName = `${phone.brand} ${phone.model}`;

  return (
    <>
      <Header />
      
      {/* JSON-LD Schema */}
      <PhoneJsonLd phone={phone} pageUrl={pageUrl} siteUrl={siteUrl} />
      
      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((faq: any) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Pros/Cons Schema */}
      <Script
        id="proscons-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": fullName,
            "description": `Pros and cons of ${fullName}`,
            "brand": {
              "@type": "Brand",
              "name": phone.brand
            },
            "review": [
              ...prosData.map((pro: string) => ({
                "@type": "Review",
                "reviewBody": `✅ ${pro}`,
                "author": {
                  "@type": "Person",
                  "name": "7pexel Team"
                }
              })),
              ...consData.map((con: string) => ({
                "@type": "Review",
                "reviewBody": `❌ ${con}`,
                "author": {
                  "@type": "Person",
                  "name": "7pexel Team"
                }
              }))
            ]
          })
        }}
      />

      {/* Aggregate Rating Schema */}
      <Script
        id="aggregate-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": fullName,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": phone.rating || 0,
              "reviewCount": phone.review_count || 0,
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      <div className="min-h-screen bg-white w-full overflow-x-hidden">
        <main className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12">
          
          {/* 1. BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[0.8rem] text-[#8B7355] mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="text-[#FF6B00] hover:underline font-medium transition-colors flex-shrink-0">
              Home
            </Link>
            <span className="opacity-40 flex-shrink-0">/</span>
            <Link href="/phones" className="text-[#FF6B00] hover:underline font-medium transition-colors flex-shrink-0">
              Phones
            </Link>
            <span className="opacity-40 flex-shrink-0">/</span>
            <Link href="/phones/finder" className="text-[#FF6B00] hover:underline font-medium transition-colors flex-shrink-0">
              Finder
            </Link>
            <span className="opacity-40 flex-shrink-0">/</span>
            <span className="font-medium truncate text-[#4A3520]" aria-current="page">
              {phone.brand} {phone.model}
            </span>
          </nav>

          {/* 2. PHONE HERO */}
          <div id="hero">
            <PhoneHero phone={phone} />
          </div>

          {/* 3. QUICK NAVIGATION */}
          <nav className="mt-6" aria-label="Quick navigation">
            <div className="flex flex-wrap gap-2 justify-center">
              <a href="#specs-related" className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-[#FF6B00] hover:text-white rounded-full transition-all duration-300">
                📊 Specs & 🔗 Similar
              </a>
              <a href="#reviews-faqs" className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-[#FF6B00] hover:text-white rounded-full transition-all duration-300">
                ⭐ Reviews & ❓ FAQs
              </a>
              <a href="#more-phones" className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-[#FF6B00] hover:text-white rounded-full transition-all duration-300">
                📱 More Phones
              </a>
            </div>
          </nav>

          {/* 4. SPECS & RELATED PHONES - Side by Side */}
          <div className="mt-8" id="specs-related">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* LEFT SIDE: Related Phones */}
              <div className="w-full lg:w-[22%] flex-shrink-0">
                <div className="sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🔗</span>
                    <h3 className="text-sm font-bold text-[#4A3520]">Similar Phones</h3>
                    <span className="text-[0.5rem] bg-[#FFF5EB] text-[#8B7355] px-2 py-0.5 rounded-full font-semibold ml-auto">
                      {relatedPhones.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {relatedPhones.slice(0, 4).map((phone: any) => (
                      <RelatedPhoneClean key={phone.slug} phone={phone} />
                    ))}
                  </div>
                  
                  <Link
                    href="/phones/finder"
                    className="mt-3 block text-center text-[0.55rem] font-semibold text-[#FF6B00] hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              </div>
              
              {/* RIGHT SIDE: PhoneSpecs */}
              <div className="w-full lg:w-[78%] overflow-hidden">
                <PhoneSpecs phone={phone} />
              </div>
              
            </div>
          </div>

          {/* 5. REVIEWS & FAQS - Side by Side */}
          <div className="mt-8" id="reviews-faqs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LEFT - Reviews Section */}
              <div className="w-full">
                <PhoneReviews 
                  phoneSlug={phone.slug} 
                  phoneBrand={phone.brand} 
                  phoneModel={phone.model} 
                />
              </div>

              {/* RIGHT - FAQ Section */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">❓</span>
                  <h2 className="text-lg md:text-xl font-bold text-[#4A3520]">
                    Frequently Asked Questions
                  </h2>
                  <span className="text-[0.55rem] bg-[#FFF5EB] text-[#8B7355] px-2.5 py-0.5 rounded-full font-semibold ml-auto">
                    {faqData.length}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#FFE4C4] scrollbar-track-transparent">
                  {faqData.map((faq: any, index: number) => {
                    const isOpen = index === 0;
                    return (
                      <details
                        key={index}
                        className="group border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#FF6B00]"
                        open={isOpen}
                      >
                        <summary className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#FFF5EB] transition-colors duration-200 list-none">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#FFF5EB] group-hover:text-[#FF6B00]'}`}>
                            <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <span className={`text-xs font-semibold transition-colors ${isOpen ? 'text-[#FF6B00]' : 'text-[#4A3520] group-hover:text-[#FF6B00]'}`}>
                            {faq.question}
                          </span>
                          {faq.category && (
                            <span className="text-[0.35rem] px-1.5 py-0.5 bg-[#FFF5EB] text-[#8B7355] rounded-full font-medium ml-auto whitespace-nowrap">
                              {faq.category}
                            </span>
                          )}
                        </summary>
                        <div className="px-3 pb-2 pt-0.5">
                          <div className="flex gap-2.5">
                            <div className="w-0.5 bg-gradient-to-b from-[#FF6B00] to-[#FF8C00] rounded-full flex-shrink-0" />
                            <p className="text-[0.7rem] text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* 6. MORE PHONES - Full Grid */}
          <div className="mt-8" id="more-phones">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">📱</span>
              <h2 className="text-xl md:text-2xl font-bold text-[#4A3520]">
                More Smartphones
              </h2>
              <span className="text-[0.55rem] bg-[#FFF5EB] text-[#8B7355] px-2.5 py-0.5 rounded-full font-semibold ml-auto">
                {allPhones.total} Phones
              </span>
            </div>
            
            <PhoneGrid 
              initialPhones={allPhones.data}
              initialTotal={allPhones.total}
              searchTerm=""
              filters={{}}
            />
          </div>

          {/* 7. AUTHOR SECTION */}
          <div className="mt-8">
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <img
                  src={phone.author_avatar || '/images/authors/7pexel-team.jpg'}
                  alt={phone.author || '7pexel Team'}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#4A3520]">{phone.author || '7pexel Team'}</h3>
                  <p className="text-sm text-gray-600 mt-1">{phone.author_bio || 'Tech enthusiast and smartphone reviewer.'}</p>
                  <div className="flex gap-3 mt-2">
                    {(phone.author_social || ['https://twitter.com/7pexel']).map((social: string, index: number) => (
                      <a
                        key={index}
                        href={social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      >
                        {social.includes('twitter') && '🐦'}
                        {social.includes('linkedin') && '💼'}
                        {social.includes('youtube') && '📺'}
                        {social.includes('facebook') && '📘'}
                        {social.includes('instagram') && '📷'}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {phone.date ? new Date(phone.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Recent'}
                </div>
              </div>
            </section>
          </div>

          {/* 8. CALL TO ACTION */}
          <div className="mt-8">
            <section className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Find Your Perfect Smartphone
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of smartphones and find the best device for your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/phones/finder"
                  className="px-6 py-3 bg-white text-[#FF6B00] font-bold rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  🔍 Browse All Phones
                </Link>
                <Link
                  href="/phones"
                  className="px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  📱 Phone Directory
                </Link>
              </div>
            </section>
          </div>

        </main>
      </div>
    </>
  );
}