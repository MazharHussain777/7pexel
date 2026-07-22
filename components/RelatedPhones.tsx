// components/RelatedPhones.tsx
"use client";

import Link from "next/link";
import { Phone } from "@/types/phone";

interface RelatedPhonesProps {
  phones: Phone[];
  currentSlug: string;
}

export function RelatedPhones({ phones, currentSlug }: RelatedPhonesProps) {
  // Filter out the current phone and limit to 2
  const relatedPhones = phones
    .filter(phone => phone.slug !== currentSlug)
    .slice(0, 2);

  if (relatedPhones.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
        <h3 className="text-sm font-semibold text-[#2d1a1a] font-['Poppins',sans-serif]">
          Related Phones
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(127,1,31,0.14)] to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedPhones.map((phone) => (
          <Link
            key={phone.slug}
            href={`/phones/${phone.slug}`}
            className="group bg-white/90 backdrop-blur-sm border border-[rgba(127,1,31,0.08)] rounded-2xl p-4 hover:bg-white hover:border-[rgba(127,1,31,0.15)] transition-all hover:shadow-lg cursor-pointer flex items-center gap-4"
          >
            {/* Phone Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5EBD0] to-[#e8dcc0] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform relative overflow-hidden">
              <div className="w-10 h-14 bg-gradient-to-b from-[#e8dcc0] to-[#d4c4a8] rounded-lg flex items-center justify-center">
                <div className="w-6 h-8 bg-[#2d1a1a]/10 rounded-sm" />
              </div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#2d1a1a]/20 rounded-full" />
            </div>

            {/* Phone Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#7F011F] bg-[#7F011F]/10 px-2 py-0.5 rounded-full">
                  {phone.brand}
                </span>
                {phone.isEditorChoice && (
                  <span className="text-[0.4rem] font-bold text-[#7F011F] bg-[#7F011F]/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    Editor's Pick
                  </span>
                )}
              </div>
              <div className="text-base font-semibold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif] truncate">
                {phone.name}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star text-[0.3rem] ${i < Math.floor(phone.rating) ? 'text-[#F5EBD0]' : 'text-[#F5EBD0]/30'}`} 
                    />
                  ))}
                  <span className="text-[0.45rem] font-semibold text-[#6d4a4a] ml-0.5">
                    {phone.rating}
                  </span>
                </div>
                <span className="text-[0.35rem] text-[#6d4a4a]">•</span>
                <span className="text-[0.4rem] text-[#6d4a4a]">{phone.specs.chipset}</span>
                <span className="text-[0.35rem] text-[#6d4a4a]">•</span>
                <span className="text-[0.4rem] text-[#6d4a4a]">{phone.specs.ram}</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#7F011F]/10 flex items-center justify-center group-hover:bg-[#7F011F] transition-all">
                <i className="fas fa-arrow-right text-[0.5rem] text-[#7F011F] group-hover:text-white transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}