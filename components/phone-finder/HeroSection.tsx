// @ts-nocheck
// components/phone-finder/HeroSection.tsx
"use client";

import { Phone, getPhoneTheme } from "@/types/phone";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

interface HeroSectionProps {
  phone: Phone;
}

// Refined Spec Card - lighter weight, more breathing room
const SpecCard = ({ icon, label, value, points, theme, className = "" }: any) => {
  const primaryColor = theme?.primary || '#7F011F';

  return (
    <div
      className={`group relative bg-white border rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: `${primaryColor}0d`,
        boxShadow: `0 1px 3px ${primaryColor}05`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 20px ${primaryColor}0a`;
        e.currentTarget.style.borderColor = `${primaryColor}1a`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 3px ${primaryColor}05`;
        e.currentTarget.style.borderColor = `${primaryColor}0d`;
      }}
    >
      {/* Header with Icon + Label */}
      <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b" style={{ borderColor: `${primaryColor}08` }}>
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${primaryColor}08` }}
        >
          <i className={`fas ${icon} text-[0.5rem]`} style={{ color: `${primaryColor}b0` }} aria-hidden="true" />
        </div>
        <span className="text-[0.5rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50 font-['Poppins',sans-serif] whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* Main Value */}
      <div className="text-[0.9rem] font-semibold text-[#2a2020] leading-snug font-['Poppins',sans-serif] mb-2 tracking-[-0.1px]">
        {value}
      </div>

      {/* Supporting Points - simplified, max 1-2 points */}
      {points && points.length > 0 && (
        <div className="space-y-1.5 mt-1">
          {points.slice(0, 2).map((point: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <span
                className="w-1 h-1 rounded-full mt-[5px] flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}${idx === 0 ? '55' : '38'}` }}
              />
              <span className="text-[0.6rem] font-normal text-[#6d5555] font-['Poppins',sans-serif] leading-relaxed">
                {point}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// AnTuTu Score Card Component
const AntutuCard = ({ score, theme }: any) => {
  const primaryColor = theme?.primary || '#7F011F';
  const secondaryColor = theme?.secondary || '#7F011F';
  
  const gaugeMax = 3200000;
  const gaugePct = Math.min(100, Math.round((score || 0) / gaugeMax * 100));
  
  const perfTier = gaugePct >= 85 ? "Top-tier" : gaugePct >= 60 ? "High" : "Solid";

  return (
    <div
      className="relative bg-white border rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: `${primaryColor}0d`,
        boxShadow: `0 1px 3px ${primaryColor}05`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 20px ${primaryColor}0a`;
        e.currentTarget.style.borderColor = `${primaryColor}1a`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 3px ${primaryColor}05`;
        e.currentTarget.style.borderColor = `${primaryColor}0d`;
      }}
    >
      {/* Header with Icon + Label */}
      <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b" style={{ borderColor: `${primaryColor}08` }}>
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${primaryColor}08` }}
        >
          <i className="fas fa-gauge-high text-[0.5rem]" style={{ color: `${primaryColor}b0` }} aria-hidden="true" />
        </div>
        <span className="text-[0.5rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50 font-['Poppins',sans-serif] whitespace-nowrap">
          AnTuTu v11
        </span>
      </div>

      {/* Score */}
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-[1.1rem] font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif] tracking-[-0.5px] tabular-nums">
          {score?.toLocaleString() || "0"}
        </span>
        <span className="text-[0.45rem] font-semibold text-[#6d4a4a]/50 font-['Poppins',sans-serif]">
          pts
        </span>
      </div>

      {/* Gauge Bar with Tier Label */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[0.45rem] font-medium text-[#6d4a4a]/60 font-['Poppins',sans-serif]">
            Performance Level
          </span>
          <span 
            className="text-[0.45rem] font-bold px-2 py-0.5 rounded-full font-['Poppins',sans-serif]"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
              color: primaryColor
            }}
          >
            {perfTier}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${primaryColor}12` }}>
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${gaugePct}%`,
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export function HeroSection({ phone }: HeroSectionProps) {
  const [iconsLoaded, setIconsLoaded] = useState(false);
  
  const theme = useMemo(() => getPhoneTheme(phone.slug), [phone.slug]);
  const primaryColor = theme.primary;
  const secondaryColor = theme.secondary;
  const accentColor = theme.accent;

  const {
    name,
    brand,
    specs,
    benchmarks,
    isFlagship,
    tags,
    year,
    image,
  } = phone;

  // ========== DISPLAY: Main = Size, Points = Pixel Density Only ==========
  const displayData = useMemo(() => {
    const main = specs?.display || "N/A";
    const pixels = specs?.pixelDensity || "";
    
    const points = [];
    if (pixels) points.push(pixels);
    
    return { main, points };
  }, [specs]);

  // ========== CHIPSET: Main = Processor, Points = RAM, ROM ==========
  const chipsetData = useMemo(() => {
    const main = specs?.chipset || "N/A";
    const ram = specs?.ram || "";
    const rom = specs?.storage || "";
    
    const points = [];
    if (ram) points.push(ram);
    if (rom) points.push(rom);
    
    return { main, points };
  }, [specs]);

  // ========== CAMERA: Main = Main MP Only ==========
  const cameraData = useMemo(() => {
    const main = specs?.camera || "N/A";
    return { main, points: [] };
  }, [specs]);

  // ========== BATTERY: Main = mAh, Points = Wired Charging Only ==========
  const batteryData = useMemo(() => {
    const main = specs?.battery || "N/A";
    const wired = specs?.wiredCharging || "";
    
    const points = [];
    if (wired) points.push(wired);
    
    return { main, points };
  }, [specs]);

  // Load icons
  useEffect(() => {
    if (document.querySelector('link[href*="font-awesome"]')) {
      setIconsLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    link.onload = () => setIconsLoaded(true);
    document.head.appendChild(link);

    return () => {};
  }, []);

  // Spec Cards with simplified data
  const specCards = useMemo(() => [
    {
      icon: "fa-display",
      label: "Display",
      value: displayData.main,
      points: displayData.points,
    },
    {
      icon: "fa-microchip",
      label: "Chipset",
      value: chipsetData.main,
      points: chipsetData.points,
    },
    {
      icon: "fa-camera",
      label: "Camera",
      value: cameraData.main,
      points: cameraData.points,
    },
    {
      icon: "fa-battery-three-quarters",
      label: "Battery",
      value: batteryData.main,
      points: batteryData.points,
    },
  ], [displayData, chipsetData, cameraData, batteryData]);

  // Separate cards for different rows
  const topRowCards = specCards.filter((_, index) => index !== 1); // Display, Camera, Battery
  const bottomRowCard = specCards[1]; // Chipset only

  return (
    <article
      className="relative bg-white border rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden"
      style={{ 
        borderColor: `${primaryColor}12`,
        boxShadow: `0 8px 40px ${primaryColor}08`
      }}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Desktop Layout - lg and above */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Content */}
        <div className="lg:col-span-7 xl:col-span-7">
          {/* Brand + Year + Tags */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: primaryColor }}
                aria-hidden="true" 
              />
              <span 
                className="text-[0.7rem] font-bold tracking-[0.15em] uppercase font-['Poppins',sans-serif]"
                style={{ color: primaryColor }}
                itemProp="brand"
              >
                {brand}
              </span>
            </div>
            <span className="w-px h-4 bg-[#d4c5c5]" aria-hidden="true" />
            <span className="text-[0.7rem] font-medium text-[#6d4a4a] font-['Poppins',sans-serif]">
              {year}
            </span>

            <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
              {tags?.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                  style={{ 
                    backgroundColor: `${primaryColor}06`, 
                    color: primaryColor,
                    borderColor: `${primaryColor}12`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Title - Desktop - No wrap, auto font size */}
          <div className="mb-4">
            <h2
              className="font-['Poppins',sans-serif] font-extrabold leading-[1.1] tracking-[-0.5px]"
              style={{ 
                fontSize: "clamp(1.6rem, 3.5vw, 3.4rem)",
                display: 'inline-block',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
              itemProp="name"
            >
              <span className="text-[#1a1a1a]">{brand} </span>
              <span style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {name}
              </span>
            </h2>
          </div>

          {/* Flagship Badge */}
          <div className="flex items-center gap-2.5 mb-6 flex-wrap">
            {isFlagship && (
              <span 
                className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white px-3.5 py-1 rounded-full font-['Poppins',sans-serif] shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 4px 12px ${primaryColor}25`
                }}
              >
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                Flagship
              </span>
            )}
          </div>

          {/* Spec Cards - Two Rows with Grid */}
          <div className="space-y-3">
            {/* Row 1: Display, Camera, Battery */}
            <div className="flex gap-3 w-full">
              {topRowCards.map((item, idx) => (
                <SpecCard
                  key={idx}
                  {...item}
                  theme={theme}
                  className="flex-1"
                />
              ))}
            </div>

            {/* Row 2: Chipset (67% width) + AnTuTu (33% width) */}
            <div className="grid grid-cols-12 gap-3 w-full">
              <div className="col-span-8">
                <SpecCard
                  {...bottomRowCard}
                  theme={theme}
                  className="w-full"
                />
              </div>
              <div className="col-span-4">
                {benchmarks && benchmarks.antutu > 0 && (
                  <AntutuCard score={benchmarks.antutu} theme={theme} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Phone Image */}
        <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative">
          <div className="relative z-10">
            {/* Soft glow */}
            <div 
              className="absolute -inset-8 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)`
              }}
            />
            
            <figure className="relative w-[260px] h-[390px] mx-auto">
              <div 
                className="relative bg-white rounded-2xl overflow-hidden h-full border shadow-lg"
                style={{ 
                  borderColor: `${primaryColor}15`,
                  boxShadow: `0 8px 32px ${primaryColor}10`
                }}
              >
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={`${brand} ${name} smartphone`}
                      width={260}
                      height={390}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                      priority
                      loading="eager"
                      fetchPriority="high"
                      quality={80}
                      sizes="260px"
                    />
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <i className="fas fa-mobile-alt text-5xl" style={{ color: `${primaryColor}12` }} aria-hidden="true" />
                  </div>
                )}
                <figcaption className="sr-only">
                  {brand} {name} {year} smartphone
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* Mobile Layout - below lg screens */}
      <div className="lg:hidden flex flex-col items-center">
        {/* 1. Name First - No wrap, auto font size */}
        <div className="w-full text-center mb-4">
          {/* Brand + Year */}
          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: primaryColor }}
                aria-hidden="true" 
              />
              <span 
                className="text-[0.7rem] font-bold tracking-[0.15em] uppercase font-['Poppins',sans-serif]"
                style={{ color: primaryColor }}
                itemProp="brand"
              >
                {brand}
              </span>
            </div>
            <span className="w-px h-4 bg-[#d4c5c5]" aria-hidden="true" />
            <span className="text-[0.7rem] font-medium text-[#6d4a4a] font-['Poppins',sans-serif]">
              {year}
            </span>
          </div>

          <div className="flex justify-center">
            <h2
              className="font-['Poppins',sans-serif] font-extrabold leading-[1.1] tracking-[-0.5px]"
              style={{ 
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
              itemProp="name"
            >
              <span className="text-[#1a1a1a]">{brand} </span>
              <span style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {name}
              </span>
            </h2>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center mt-2">
            {tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                style={{ 
                  backgroundColor: `${primaryColor}06`, 
                  color: primaryColor,
                  borderColor: `${primaryColor}12`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Phone Image */}
        <div className="relative z-10 w-full flex justify-center mb-6">
          {/* Soft glow */}
          <div 
            className="absolute -inset-10 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)`
            }}
          />
          
          <figure className="relative w-[200px] h-[300px] sm:w-[240px] sm:h-[360px]">
            <div 
              className="relative bg-white rounded-2xl overflow-hidden h-full border shadow-lg"
              style={{ 
                borderColor: `${primaryColor}15`,
                boxShadow: `0 8px 32px ${primaryColor}10`
              }}
            >
              {image ? (
                <>
                  <Image
                    src={image}
                    alt={`${brand} ${name} smartphone`}
                    width={240}
                    height={360}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    quality={80}
                    sizes="(max-width: 640px) 200px, 240px"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <i className="fas fa-mobile-alt text-5xl" style={{ color: `${primaryColor}12` }} aria-hidden="true" />
                </div>
              )}
              <figcaption className="sr-only">
                {brand} {name} {year} smartphone
              </figcaption>
            </div>
          </figure>
        </div>

        {/* 3. Spec Cards - Two Rows on Mobile */}
        <div className="w-full">
          {/* Flagship Badge */}
          {isFlagship && (
            <div className="flex items-center justify-center mb-4">
              <span 
                className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white px-3.5 py-1 rounded-full font-['Poppins',sans-serif] shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 4px 12px ${primaryColor}25`
                }}
              >
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                Flagship
              </span>
            </div>
          )}

          {/* Row 1: Display, Camera, Battery */}
          <div className="flex gap-2 w-full mb-3">
            {topRowCards.map((item, idx) => (
              <SpecCard
                key={idx}
                {...item}
                theme={theme}
                className="flex-1"
              />
            ))}
          </div>

          {/* Row 2: Chipset + AnTuTu */}
          <div className="grid grid-cols-12 gap-2 w-full">
            <div className="col-span-8">
              <SpecCard
                {...bottomRowCard}
                theme={theme}
                className="w-full"
              />
            </div>
            <div className="col-span-4">
              {benchmarks && benchmarks.antutu > 0 && (
                <AntutuCard score={benchmarks.antutu} theme={theme} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}