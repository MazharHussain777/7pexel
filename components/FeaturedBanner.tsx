// components/FeaturedBanner.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function FeaturedBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white border border-[rgba(127,1,31,0.06)] mb-10 min-h-[320px] md:min-h-[400px] group shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf8ff] via-white to-[#f5f0e8]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7F011F]/5 blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c94a6a]/5 blur-[100px] translate-y-1/2 -translate-x-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(127,1,31,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(127,1,31,0.2) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Floating geometric shapes */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-lg border border-[#7F011F]/5 rotate-12 opacity-30 hidden md:block" />
      <div className="absolute bottom-12 left-8 w-8 h-8 rounded-full border border-[#7F011F]/5 opacity-20 hidden md:block" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#7F011F]/5 animate-pulse hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-12 md:px-12 md:py-16">
        {/* Animated badge */}
        <div 
          className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#7F011F]/5 to-[#c94a6a]/5 text-[#7F011F] text-[0.5rem] font-bold tracking-[0.15em] px-5 py-2 rounded-full border border-[#7F011F]/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7F011F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7F011F]" />
            </span>
            PREMIUM COMPARISON TOOL
          </div>
        </div>

        {/* Main heading with gradient */}
        <div 
          className={`transform transition-all duration-700 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-[-1px] text-[#1a1a1a] max-w-3xl font-['Poppins',sans-serif] mt-4">
            Find Your
            <span className="block relative">
              <span className="bg-gradient-to-r from-[#7F011F] via-[#a80a30] to-[#c94a6a] bg-clip-text text-transparent">
                Perfect Phone
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#7F011F]/20 via-[#c94a6a]/20 to-transparent rounded-full blur-sm" />
            </span>
          </h2>
        </div>

        {/* Description */}
        <div 
          className={`transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-sm md:text-base text-[#6d4a4a] max-w-lg mt-4 leading-relaxed font-['Poppins',sans-serif]">
            Compare specifications
            <span className="block text-[#7F011F]/60 text-xs mt-1 font-medium tracking-wide">
              ⚡  smartphones analyzed
            </span>
          </p>
        </div>

        {/* CTA Buttons with hover effects */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-3 mt-6 transform transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link
            href="/phone-finder"
            className="group/btn relative inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-3 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#7F011F]/25 hover:-translate-y-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#7F011F] via-[#a80a30] to-[#c94a6a] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              <i className="fas fa-search text-xs" />
              Browse All Phones
            </span>
          </Link>

          <Link
            href="/compare"
            className="group/compare relative inline-flex items-center gap-2 border-2 border-[#7F011F]/20 text-[#7F011F] px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:border-[#7F011F] hover:bg-[#7F011F]/5 hover:-translate-y-1"
          >
            <i className="fas fa-arrows-left-right text-xs" />
            Start Comparing
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c94a6a] animate-ping" />
          </Link>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7F011F]/30 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c94a6a]/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#7F011F]/5 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#7F011F]/5 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#7F011F]/5 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7F011F]/5 rounded-br-2xl" />
    </div>
  );
}