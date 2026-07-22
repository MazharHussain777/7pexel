// @ts-nocheck 
"use client";

import { phoneData } from "@/lib/phoneData";
import { HeroSection } from "./HeroSection";
import { SpecSection } from "./SpecSection";

export function PhoneFinder() {
  return (
    <div className="max-w-[1320px] mx-auto px-8 py-12">
      <HeroSection phone={phoneData} />
      <SpecSection phone={phoneData} />
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-[rgba(120,76,176,0.14)] flex justify-between items-center flex-wrap gap-4 text-[0.78rem] text-[#6d5489]">
        <span>
          <i className="fas fa-phone-alt mr-1" /> {phoneData.name} · 256GB · Titanium
        </span>
        <span>
          <i className="fas fa-microchip mr-1" /> A17 Pro · {phoneData.specs.ram} RAM
        </span>
        <span className="flex items-center gap-1.5 bg-white/60 px-5 py-1 rounded-full border border-[rgba(120,76,176,0.14)]">
          <i className="fas fa-star text-[#cf9b3f]" />
          <i className="fas fa-star text-[#cf9b3f]" />
          <i className="fas fa-star text-[#cf9b3f]" />
          <i className="fas fa-star text-[#cf9b3f]" />
          <i className="fas fa-star-half-alt text-[#cf9b3f]" />
          4.8
        </span>
      </div>
    </div>
  );
}