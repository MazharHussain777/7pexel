// components/FeaturedBanner.tsx
"use client";

export function FeaturedBanner() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#7F011F]/15 mb-12 h-[480px] md:h-[520px] group cursor-pointer">
      {/* Large Background Image - Fully Visible with Smooth Hover */}
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=2000&q=90&auto=format&fit=crop"
        alt="Featured Article"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
      />

      {/* Strong Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* Subtle Brand Accent - More Subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7F011F]/20 via-transparent to-transparent" />

      {/* Content - Bottom Aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 z-10">
        <div>
          {/* Category Tag - Smaller and Cleaner */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[0.6rem] font-semibold tracking-[0.15em] px-4 py-1.5 rounded-full border border-white/15 mb-4">
            <i className="fas fa-bolt text-[#FFD700] text-[0.5rem]" />
            EDITOR'S PICK
          </div>

          {/* Main Title - Bottom Aligned */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-1.5px] text-white drop-shadow-2xl max-w-3xl">
            Inside the Circuit: How Modern Electronics Actually Work
          </h1>

          {/* Meta Info - Cleaner */}
          <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F011F] to-[#c94a6a] flex items-center justify-center text-[0.5rem] font-bold text-white">
                JD
              </div>
              <div>
                <span className="font-medium text-white text-sm">Jamie Dixon</span>
                <span className="ml-2 text-xs text-white/60">• June 28, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right Accent - Cleaner */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md text-white text-[0.55rem] px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
        <i className="fas fa-microchip text-[0.5rem]" />
        ELECTRONICS
      </div>

      {/* Hover Zoom Indicator - More Subtle */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 text-white/50 text-[0.55rem] flex items-center gap-1.5">
        <span className="block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        EXPLORE
      </div>
    </div>
  );
}