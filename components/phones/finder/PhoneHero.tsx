// components/phones/finder/PhoneHero.tsx
"use client";

import { Phone, getBrandTheme, getBrandEmoji } from "@/lib/phone-data";
import Image from "next/image";
import { useState } from "react";

interface PhoneHeroProps {
  phone: Phone;
}

export function PhoneHero({ phone }: PhoneHeroProps) {
  const theme = getBrandTheme(phone.brand);
  const fullName = `${phone.brand} ${phone.model}`;
  const year = phone.year || "2026";
  const chipsetName = phone.chipset?.charAt(0).toUpperCase() + phone.chipset?.slice(1) || "N/A";
  const displayMain = phone.display === "large" ? "6.7\"+" : phone.display === "medium" ? "6.1-6.7\"" : "Under 6.1\"";
  const cameraName = phone.camera?.charAt(0).toUpperCase() + phone.camera?.slice(1) || "N/A";
  const batteryMain = `${phone.battery}mAh`;
  const osName = phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1) || "Android";
  
  const imageUrl = phone.image || phone.imageUrl || '/images/placeholder-phone.jpg';
  const isAIGenerated = true;
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <article
        className="relative bg-white border rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden"
        style={{ 
          borderColor: `${theme.primary}12`,
          boxShadow: `0 8px 40px ${theme.primary}08`
        }}
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Brand + Year + Tags */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div 
                  className="w-1 h-5 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                  aria-hidden="true" 
                />
                <span 
                  className="text-[0.7rem] font-bold tracking-[0.15em] uppercase font-['Poppins',sans-serif]"
                  style={{ color: theme.primary }}
                  itemProp="brand"
                >
                  {phone.brand}
                </span>
              </div>
              <span className="w-px h-4 bg-[#d4c5c5]" aria-hidden="true" />
              <span className="text-[0.7rem] font-medium text-[#6d4a4a] font-['Poppins',sans-serif]">
                {year}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
                <span
                  className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                  style={{ 
                    backgroundColor: `${theme.primary}06`, 
                    color: theme.primary,
                    borderColor: `${theme.primary}12`
                  }}
                >
                  {osName}
                </span>
                <span
                  className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                  style={{ 
                    backgroundColor: `${theme.primary}06`, 
                    color: theme.primary,
                    borderColor: `${theme.primary}12`
                  }}
                >
                  {phone.charging}W Charging
                </span>
              </div>
            </div>

            {/* Main Title */}
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
                <span className="text-[#1a1a1a]">{phone.brand} </span>
                <span style={{ 
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {phone.model}
                </span>
              </h2>
            </div>

            {/* Flagship Badge */}
            <div className="flex items-center gap-2.5 mb-6 flex-wrap">
              <span 
                className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white px-3.5 py-1 rounded-full font-['Poppins',sans-serif] shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 4px 12px ${theme.primary}25`
                }}
              >
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                {phone.price > 899 ? "Flagship" : "Premium"}
              </span>
            </div>

            {/* Spec Cards - Two Rows */}
            <div className="space-y-3">
              <div className="flex gap-3 w-full">
                <SpecCard
                  icon="fa-display"
                  label="Display"
                  value={displayMain}
                  subValue={`${phone.refresh_rate}Hz Refresh`}
                  theme={theme}
                />
                <SpecCard
                  icon="fa-camera"
                  label="Camera"
                  value={cameraName}
                  subValue={`${phone.price > 899 ? '50MP' : '48MP'} Main`}
                  theme={theme}
                />
                <SpecCard
                  icon="fa-battery-three-quarters"
                  label="Battery"
                  value={batteryMain}
                  subValue={`${phone.charging}W Charging`}
                  theme={theme}
                />
              </div>

              <div className="flex gap-3 w-full">
                <SpecCard
                  icon="fa-microchip"
                  label="Chipset"
                  value={chipsetName}
                  subValue={`${phone.ram}GB RAM · ${phone.storage}GB Storage`}
                  theme={theme}
                  className="flex-1"
                />
                <AntutuCard score={phone.price > 899 ? "1,850,000" : "1,200,000"} theme={theme} className="flex-1" />
              </div>
            </div>
          </div>

          {/* Phone Image - Desktop */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative">
            <div className="relative z-10">
              <div className="absolute -inset-8 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${theme.primary}, transparent 70%)` }} />
              <div className="relative w-[260px] h-[390px] mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-lg bg-white" style={{ borderColor: `${theme.primary}15`, boxShadow: `0 8px 32px ${theme.primary}10` }}>
                  <Image
                    src={imageUrl}
                    alt={fullName}
                    fill
                    className="object-contain p-2"
                    priority
                    sizes="260px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-[#e8f0ec] to-[#d5e4dd]';
                        fallback.textContent = getBrandEmoji(phone.brand);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  
                  {/* AI Render Badge - Clickable */}
                  {isAIGenerated && (
                    <button
                      onClick={() => setShowPopup(true)}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-[0.4rem] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} />
                      <span>AI Render</span>
                      <span className="text-[0.3rem] opacity-50">ⓘ</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="w-full text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase" style={{ color: theme.primary }}>{phone.brand}</span>
              </div>
              <span className="w-px h-4 bg-[#d4c5c5]" />
              <span className="text-[0.7rem] font-medium text-[#6d4a4a]">{year}</span>
            </div>

            <div className="flex justify-center">
              <h2 className="font-['Poppins',sans-serif] font-extrabold leading-[1.1] tracking-[-0.5px]" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', display: 'inline-block', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                <span className="text-[#1a1a1a]">{phone.brand} </span>
                <span style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {phone.model}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center mt-2">
              <span className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: `${theme.primary}06`, color: theme.primary, borderColor: `${theme.primary}12` }}>
                {osName}
              </span>
            </div>
          </div>

          {/* Phone Image - Mobile */}
          <div className="relative z-10 w-full flex justify-center mb-6">
            <div className="absolute -inset-10 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${theme.primary}, transparent 70%)` }} />
            <div className="relative w-[200px] h-[300px] sm:w-[240px] sm:h-[360px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-lg bg-white" style={{ borderColor: `${theme.primary}15`, boxShadow: `0 8px 32px ${theme.primary}10` }}>
                <Image
                  src={imageUrl}
                  alt={fullName}
                  fill
                  className="object-contain p-2"
                  priority
                  sizes="(max-width: 640px) 200px, 240px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[#e8f0ec] to-[#d5e4dd]';
                      fallback.textContent = getBrandEmoji(phone.brand);
                      parent.appendChild(fallback);
                    }
                  }}
                />
                
                {/* AI Render Badge - Clickable Mobile */}
                {isAIGenerated && (
                  <button
                    onClick={() => setShowPopup(true)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-[0.35rem] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <span className="inline-block w-1 h-1 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} />
                    <span>AI Render</span>
                    <span className="text-[0.25rem] opacity-50">ⓘ</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Spec Cards Mobile */}
          <div className="w-full">
            <div className="flex items-center justify-center mb-4">
              <span className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white px-3.5 py-1 rounded-full shadow-md" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                {phone.price > 899 ? "Flagship" : "Premium"}
              </span>
            </div>

            <div className="flex gap-2 w-full mb-3">
              <CompactSpecCard icon="fa-display" label="Display" value={displayMain} theme={theme} />
              <CompactSpecCard icon="fa-camera" label="Camera" value={cameraName} theme={theme} />
              <CompactSpecCard icon="fa-battery-three-quarters" label="Battery" value={batteryMain} theme={theme} />
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              <CompactSpecCard icon="fa-microchip" label="Chipset" value={chipsetName} theme={theme} />
              <CompactAntutuCard score={phone.price > 899 ? "1.85M" : "1.2M"} theme={theme} />
            </div>
          </div>
        </div>
      </article>
{showPopup && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    onClick={() => setShowPopup(false)}
  >
    <div 
      className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[var(--color-line)] animate-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
          <span className="text-white text-lg">✨</span>
        </div>
        <div>
          <h3 className="font-['Poppins',sans-serif] font-bold text-lg" style={{ color: theme.primary }}>
            AI Render
          </h3>
          <p className="text-[0.7rem] text-gray-400">Visual reference for design understanding</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 text-[0.9rem] text-[var(--color-ink-soft)]">
        <p>
          <span className="font-semibold text-[var(--color-ink)]">About this image:</span><br />
          We generate this image using AI and try our best to make it look 
          <span className="font-semibold text-[var(--color-green)]"> as close as possible</span> to the original 
          {phone.brand} {phone.model}. 
          <span className="font-semibold"> Mostly used to guess and understand</span> the mobile design very well.
        </p>
        
        <div className="bg-[var(--color-paper)] rounded-xl p-4 border border-[var(--color-line)]">
          <div className="flex items-start gap-2">
            <span className="text-[#D4F26B] text-lg">🎯</span>
            <div>
              <p className="text-[0.8rem] font-medium text-[var(--color-ink)]">Our approach:</p>
              <ul className="text-[0.75rem] space-y-1 mt-1 text-[var(--color-ink-soft)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-green)]">✓</span>
                  <span>We try our <span className="font-semibold">best of best</span> to make it look original</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-green)]">✓</span>
                  <span>Mostly used to <span className="font-semibold">guess the design</span> of the mobile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-green)]">✓</span>
                  <span>Helps you <span className="font-semibold">visualize</span> the device clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-green)]">✓</span>
                  <span>Gives you a <span className="font-semibold">good idea</span> of what to expect</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f0f7f2] to-[#e8f0ea] rounded-xl p-3 border border-[var(--color-line)]">
          <p className="text-[0.75rem] text-center text-[var(--color-ink)]">
            <span className="font-semibold">💡 Simply put:</span> This AI render helps you 
            <span className="font-semibold text-[var(--color-green)]"> guess and understand</span> the mobile design 
            very well. We put our best effort to make it look real.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setShowPopup(false)}
          className="flex-1 py-2.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
        >
          Got It 👍
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

// Sub-components for Hero
interface SpecCardProps {
  icon: string;
  label: string;
  value: string;
  subValue?: string;
  theme: { primary: string; secondary: string };
  className?: string;
}

function SpecCard({ icon, label, value, subValue, theme, className = "" }: SpecCardProps) {
  return (
    <div className={`flex-1 bg-white border rounded-2xl px-4 py-4 text-left ${className}`} style={{ borderColor: `${theme.primary}0d` }}>
      <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b" style={{ borderColor: `${theme.primary}08` }}>
        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}08` }}>
          <i className={`fas ${icon} text-[0.5rem]`} style={{ color: `${theme.primary}b0` }} />
        </div>
        <span className="text-[0.5rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50"> {label}</span>
      </div>
      <div className="text-[0.9rem] font-semibold text-[#2a2020] leading-snug mb-2">{value}</div>
      {subValue && (
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full mt-[5px] flex-shrink-0" style={{ backgroundColor: `${theme.primary}55` }} />
            <span className="text-[0.6rem] font-normal text-[#6d5555]">{subValue}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AntutuCard({ score, theme, className = "" }: { score: string; theme: { primary: string; secondary: string }; className?: string }) {
  const pct = parseInt(score.replace(/,/g, '')) / 1850000 * 100;
  const tier = pct >= 85 ? "Top-tier" : "High";
  
  return (
    <div className={`bg-white border rounded-2xl px-4 py-4 text-left ${className}`} style={{ borderColor: `${theme.primary}0d` }}>
      <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b" style={{ borderColor: `${theme.primary}08` }}>
        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}08` }}>
          <i className="fas fa-gauge-high text-[0.5rem]" style={{ color: `${theme.primary}b0` }} />
        </div>
        <span className="text-[0.5rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50">AnTuTu v11</span>
      </div>
      <div className="text-[1.1rem] font-extrabold text-[#1a1a1a] tracking-[-0.5px] tabular-nums mb-2">{score} pts</div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[0.45rem] font-medium text-[#6d4a4a]/60">Performance Level</span>
          <span className="text-[0.45rem] font-bold px-2 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`, color: theme.primary }}>
            {tier}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}12` }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(pct, 100)}%`, background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }} />
        </div>
      </div>
    </div>
  );
}

function CompactSpecCard({ icon, label, value, theme }: { icon: string; label: string; value: string; theme: { primary: string } }) {
  return (
    <div className="flex-1 bg-white border rounded-2xl px-3 py-3 text-left" style={{ borderColor: `${theme.primary}0d` }}>
      <div className="flex items-center gap-2 pb-2 mb-2 border-b" style={{ borderColor: `${theme.primary}08` }}>
        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}08` }}>
          <i className={`fas ${icon} text-[0.5rem]`} style={{ color: `${theme.primary}b0` }} />
        </div>
        <span className="text-[0.45rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50">{label}</span>
      </div>
      <div className="text-[0.75rem] font-semibold text-[#2a2020]">{value}</div>
    </div>
  );
}

function CompactAntutuCard({ score, theme }: { score: string; theme: { primary: string } }) {
  return (
    <div className="bg-white border rounded-2xl px-3 py-3 text-left" style={{ borderColor: `${theme.primary}0d` }}>
      <div className="flex items-center gap-2 pb-2 mb-2 border-b" style={{ borderColor: `${theme.primary}08` }}>
        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}08` }}>
          <i className="fas fa-gauge-high text-[0.5rem]" style={{ color: `${theme.primary}b0` }} />
        </div>
        <span className="text-[0.45rem] font-medium uppercase tracking-[0.1em] text-[#6d4a4a]/50">AnTuTu</span>
      </div>
      <div className="text-[0.7rem] font-extrabold text-[#1a1a1a]">{score} pts</div>
    </div>
  );
}