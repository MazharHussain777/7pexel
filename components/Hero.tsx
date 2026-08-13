// components/Hero.tsx

"use client";
import Link from "next/link";

export function Hero() {
  // Refined color palette based on #063F47
  const colors = {
    primary: "#063F47",
    primaryLight: "#0A5A64",
    primaryDark: "#042A30",
    primaryGradient: "linear-gradient(135deg, #063F47 0%, #0A5A64 50%, #063F47 100%)",
    primaryGlow: "rgba(6, 63, 71, 0.15)",
    primarySubtle: "rgba(6, 63, 71, 0.06)",
    primarySoft: "rgba(6, 63, 71, 0.08)",
    textDark: "#1A2A2E",
    textSoft: "#4A5A5E",
    textMuted: "#8A9A9E",
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Premium animated background with refined colors */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-40%] right-[-20%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#063F47]/8 via-[#0A5A64]/4 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0A5A64]/6 via-[#063F47]/3 to-transparent blur-3xl animate-pulse-slow-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#063F47]/5 to-[#0A5A64]/5 blur-3xl animate-pulse-slow" />
      </div>

      {/* Premium grid pattern */}
      <div className="absolute inset-0 -z-5 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(rgba(6, 63, 71, 0.2) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(6, 63, 71, 0.2) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Decorative accent rings */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] -z-5 opacity-[0.04]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" stroke="#063F47" />
          <circle cx="50" cy="50" r="30" stroke="#063F47" />
          <circle cx="50" cy="50" r="20" stroke="#063F47" />
          <circle cx="50" cy="50" r="10" stroke="#063F47" />
        </svg>
      </div>

      {/* Floating dots decoration */}
      <div className="absolute left-[10%] top-[15%] -z-5 opacity-[0.06]">
        <div className="flex flex-col gap-4">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primaryLight }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.primaryLight }} />
        </div>
      </div>

      <div className="relative w-full max-w-[1280px] mx-auto px-10">
        {/* Premium badge with refined styling - left aligned */}
        <div className="relative inline-flex items-center gap-4 mb-8 md:mb-9">
          <span className="w-12 h-[2px] rounded-full" style={{ background: colors.primaryGradient }} />
          <span className="relative group">
            <span className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: `${colors.primary}20` }} />
            <span 
              className="relative font-jetbrains-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase font-semibold px-5 py-2 rounded-full backdrop-blur-sm border"
              style={{ 
                color: colors.primary,
                backgroundColor: `${colors.primary}08`,
                borderColor: `${colors.primary}15`,
              }}
            >
              <span className="relative z-10">Phones · Laptops · Watches · Audio · Cameras</span>
            </span>
          </span>
        </div>

        {/* Main headline with premium typography - left aligned */}
        <div className="max-w-[900px]">
          <h1 className="font-fraunces font-medium text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.03em]">
            Every device,{" "}
            <span className="relative inline-block group">
              <span 
                className="absolute -inset-3 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: `${colors.primary}15` }}
              />
              <em 
                className="relative z-10 italic not-italic text-transparent bg-clip-text bg-[length:200%_100%] animate-shimmer"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 40%, ${colors.primaryLight} 70%, ${colors.primary} 100%)`,
                  backgroundSize: '200% 100%',
                }}
              >
                decoded
              </em>
              <span 
                className="absolute bottom-2 left-0 w-full h-3 -z-10 rounded-full blur-sm group-hover:opacity-100 transition-all duration-500"
                style={{ 
                  backgroundColor: `${colors.primary}15`,
                  opacity: 0.5,
                }}
              />
              <span 
                className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: colors.primaryGradient }}
              />
            </span>
            {" "}<br className="hidden sm:block" />
            before you buy.
          </h1>
        </div>

        {/* Description with refined typography - left aligned */}
        <p className="mt-6 max-w-[560px] text-[1rem] md:text-[1.1rem] leading-[1.8] tracking-[-0.01em] font-light" style={{ color: colors.textSoft }}>
          Specs, reviews and side-by-side comparisons across every category — 
          <span className="font-medium" style={{ color: colors.primary }}> phones, laptops, watches, audio</span> and more, all in one place.
        </p>

        {/* Premium CTA buttons - left aligned */}
        <div className="flex items-center gap-5 mt-10 flex-wrap">
          {/* Primary CTA - Gradient button */}
          <Link
            href="#arrivals"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[0.9rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]"
          >
            <span 
              className="absolute inset-0 bg-[length:200%_100%] animate-shimmer"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 40%, ${colors.primaryLight} 70%, ${colors.primary} 100%)`,
                backgroundSize: '200% 100%',
              }}
            />
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
              }}
            />
            <span className="relative z-10 flex items-center gap-3 text-white">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:rotate-12">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              Browse Devices
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
          
          {/* Secondary CTA - Outlined with refined styling */}
          <Link
            href="#compare"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[0.9rem] border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            style={{ 
              borderColor: `${colors.primary}25`,
              color: colors.textDark,
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:rotate-12">
              <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" />
            </svg>
            Compare Now
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Trust indicators - New addition */}
        <div className="flex items-center gap-8 mt-12 pt-8 border-t" style={{ borderColor: `${colors.primary}10` }}>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.primary }}>✦</span>
            <span className="text-xs font-medium" style={{ color: colors.textMuted }}>1,200+ Devices</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.primary }}>✦</span>
            <span className="text-xs font-medium" style={{ color: colors.textMuted }}>50+ Brands</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.primary }}>✦</span>
            <span className="text-xs font-medium" style={{ color: colors.textMuted }}>Real Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.primary }}>✦</span>
            <span className="text-xs font-medium" style={{ color: colors.textMuted }}>Side-by-Side</span>
          </div>
        </div>
      </div>

      {/* Animation keyframes - refined */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 1; }
        }
        @keyframes pulse-slow-delay {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.15) rotate(-5deg); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 10s ease-in-out infinite 2s;
        }
        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        /* Hover effect for secondary CTA */
        .group:hover {
          border-color: ${colors.primary} !important;
          color: ${colors.primary} !important;
          background-color: ${colors.primary}08 !important;
        }

        /* Trust indicator hover */
        .flex.items-center.gap-2:hover span.text-xs {
          color: ${colors.primary} !important;
          transition: color 0.2s ease;
        }
      `}</style>
    </section>
  );
}