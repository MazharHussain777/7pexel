// components/phones/finder/PhoneFAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface PhoneFAQProps {
  faqs: FAQItem[];
  phoneName: string;
}

export function PhoneFAQ({ faqs, phoneName }: PhoneFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">❓</span>
        <h2 className="text-lg md:text-xl font-bold text-[#4A3520]">
          Frequently Asked Questions
        </h2>
        <span className="text-xs bg-[#FFF5EB] text-[#8B7355] px-2.5 py-0.5 rounded-full">
          {faqs.length} Questions
        </span>
      </div>

      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#FFE4C4] scrollbar-track-transparent">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? "border-[#FF6B00] shadow-sm shadow-[#FF6B00]/10" 
                  : "border-[#E8E8E8] hover:border-[#FFE4C4]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex items-start gap-3 group"
                aria-expanded={isOpen}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "bg-[#FF6B00] text-white rotate-180" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-[#FFF5EB] group-hover:text-[#FF6B00]"
                  }`}>
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold text-[#4A3520] transition-colors ${
                      isOpen ? "text-[#FF6B00]" : "group-hover:text-[#FF6B00]"
                    }`}>
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="text-[0.45rem] px-2 py-0.5 bg-[#FFF5EB] text-[#8B7355] rounded-full font-medium whitespace-nowrap">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <div
                className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] pb-3 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2 border-t border-[#FFF5EB]">
                  <div className="flex gap-3">
                    <div className="w-0.5 bg-gradient-to-b from-[#FF6B00] to-[#FF8C00] rounded-full flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
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
    </div>
  );
}