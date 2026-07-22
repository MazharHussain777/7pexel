// components/RelatedPhonesSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/types/phone";

interface RelatedPhonesSidebarProps {
  phones: Phone[];
}

function DummyPhoneCard() {
  return (
    <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-[#faf5f5] to-[#fdfaf5]">
      <div className="relative w-[55px] h-[82px] rounded-[9px] bg-white border-[1.5px] border-[rgba(127,1,31,0.18)] shadow-sm flex flex-col items-center overflow-hidden">
        <div className="w-4.5 h-1 rounded-full bg-[rgba(127,1,31,0.15)] mt-1.5" />
        <div className="flex-1 w-[85%] mt-1.5 rounded-[3px] bg-gradient-to-br from-[#7F011F]/[0.06] to-[#a80a30]/[0.03] border border-[rgba(127,1,31,0.08)] flex items-center justify-center">
          <i className="fas fa-mobile-alt text-[14px] text-[#7F011F]/25" />
        </div>
        <div className="w-5.5 h-[2px] rounded-full bg-[rgba(127,1,31,0.15)] my-1.5" />
      </div>
    </div>
  );
}

export function RelatedPhonesSidebar({ phones }: RelatedPhonesSidebarProps) {
  // Show only top 2 related phones (1 per row)
  const displayPhones = phones.slice(0, 2);

  return (
    <div className="md:col-span-2 bg-white/88 backdrop-blur-sm border border-[rgba(127,1,31,0.14)] rounded-[22px] shadow-md overflow-hidden">
      {/* Header - Slightly more padding */}
      <div className="flex items-center border-b border-[rgba(127,1,31,0.08)]">
        <div className="pl-3 py-1.5 flex items-center gap-1.5">
          <i className="fas fa-phone-alt text-[#7F011F] text-[0.55rem]" />
          <h3 className="text-[0.55rem] font-bold uppercase tracking-[0.6px] text-[#2d1a1a] font-['Poppins',sans-serif]">
            Related
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(127,1,31,0.14)] to-transparent" />
      </div>

      {displayPhones.length > 0 ? (
        <>
          {/* Single column - No padding */}
          <div className="flex flex-col">
            {displayPhones.map((phone, index) => (
              <Link
                key={index}
                href={`/phones/${phone.slug}`}
                className="group bg-white/70 hover:bg-white hover:border-[rgba(127,1,31,0.15)] transition-all duration-300 cursor-pointer flex flex-col items-center border-b border-[rgba(127,1,31,0.06)] last:border-b-0 hover:shadow-sm no-underline"
              >
                {/* Phone Image - Slightly larger */}
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden relative">
                  {phone.image ? (
                    <Image
                      src={phone.image}
                      alt={phone.name}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105 p-3"
                    />
                  ) : (
                    <DummyPhoneCard />
                  )}
                </div>

                {/* Phone Name - Slightly larger text */}
                <div className="w-full text-center pb-1">
                  <div className="text-[0.55rem] font-semibold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif] truncate px-1">
                    {phone.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link - Slightly larger */}
          <div className="border-t border-[rgba(127,1,31,0.08)]">
            <Link
              href="/phone-finder"
              className="w-full text-[0.45rem] font-semibold text-[#7F011F] hover:text-[#a80a30] transition-colors flex items-center justify-center gap-1.5 py-1.5 font-['Poppins',sans-serif] group hover:bg-[#7F011F]/5"
            >
              View All Phones
              <i className="fas fa-chevron-right text-[0.25rem] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-[#6d4a4a]">
          <i className="fas fa-phone-alt text-lg text-[#7F011F]/20 mb-1 block" />
          <p className="text-[0.45rem] font-medium text-[#2d1a1a]">No related phones</p>
          <Link
            href="/phone-finder"
            className="inline-block mt-1 text-[0.4rem] font-semibold text-[#7F011F] hover:underline"
          >
            Browse all →
          </Link>
        </div>
      )}
    </div>
  );
}