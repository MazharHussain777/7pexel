// components/SponsoredContent.tsx
"use client";

interface SponsoredContentProps {
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

export function SponsoredContent({ theme }: SponsoredContentProps) {
  const primaryColor = theme?.primary || '#7F011F';
  const secondaryColor = theme?.secondary || '#a80a30';
  const accentColor = theme?.accent || '#c94a6a';
  
  return (
    <div 
      className="md:col-span-2 relative rounded-[22px] p-5 flex flex-col items-center justify-center text-center gap-3 shadow-sm border overflow-hidden min-h-[120px]"
      style={{ 
        background: `linear-gradient(145deg, ${primaryColor}06, ${accentColor}08)`,
        borderColor: `${primaryColor}15`
      }}
    >
      {/* Subtle decorative gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${primaryColor}10, transparent 70%)`
        }}
      />

      {/* Sponsored Badge */}
      <div className="relative flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base shadow-md flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          <i className="fas fa-crown text-[0.9rem]" />
        </div>
        <div className="text-left">
          <div className="font-bold text-[#2d1a1a] text-[0.85rem] font-['Poppins',sans-serif] tracking-wide">
            Sponsored
          </div>
          <div className="text-[0.55rem] text-[#6d4a4a]/70 font-['Poppins',sans-serif]">
            Premium Content
          </div>
        </div>
      </div>

      {/* Divider */}
      <div 
        className="relative w-20 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}25, transparent)` }}
      />

      {/* Sponsored Message */}
      <div className="relative">
        <p className="text-[0.65rem] text-[#6d4a4a]/80 font-['Poppins',sans-serif] leading-relaxed max-w-xs">
          This content is brought to you by our sponsors
        </p>
      </div>

      {/* Small "Ad" indicator */}
      <div className="relative text-[0.4rem] text-[#6d4a4a]/30 font-['Poppins',sans-serif] tracking-widest uppercase mt-1">
        Ad · Sponsored
      </div>
    </div>
  );
}