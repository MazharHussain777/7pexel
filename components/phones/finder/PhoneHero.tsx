// components/phones/finder/PhoneHero.tsx
"use client";

import { useState, useEffect } from "react";
import { getBrandTheme, getBrandEmoji } from "@/lib/phone-data";
import { getReviewStats } from "@/lib/review-service";
import { getImageKitUrl, getPhoneImage } from "@/lib/imagekit";
import Image from "next/image";

interface PhoneHeroProps {
  phone: any;
}

export function PhoneHero({ phone }: PhoneHeroProps) {
  const theme = getBrandTheme(phone.brand);
  const fullName = `${phone.brand} ${phone.model}`;
  const year = phone.year || "2026";
  const chipsetName = phone.chipset?.charAt(0).toUpperCase() + phone.chipset?.slice(1) || "N/A";
  const displayMain = phone.display_size || phone.display || "6.1\"";
  const cameraName = phone.camera?.charAt(0).toUpperCase() + phone.camera?.slice(1) || "N/A";
  const batteryMain = `${phone.battery || '4500'}mAh`;
  const osName = phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1) || "Android";
  const price = phone.price ? `$${phone.price}` : "Price on Request";
  const colors = phone.colors || [];
  const ram = phone.ram || '8';
  const storage = phone.storage || '256';
  const refreshRate = phone.refresh_rate || phone.refreshRate || '120';
  const charging = phone.charging || '45';
  const antutuScore = phone.antutu_score || phone.antutuScore || '1,850,000';

  // State for real-time reviews
  const [reviewsCount, setReviewsCount] = useState(phone.review_count || 0);
  const [averageRating, setAverageRating] = useState(phone.rating || 0);

  const [showPopup, setShowPopup] = useState(false);

  // Get image URL with ImageKit support
  const getImageUrl = (path: string, width?: number, height?: number) => {
    if (!path) return '/images/placeholder-phone.jpg';
    if (path.includes('ik.imagekit.io')) return path;
    if (path.includes('http')) return path;
    return getImageKitUrl(path, { width: width || 600, height: height || 900, quality: 80, format: 'webp' });
  };

  const imageUrl = phone.image
    ? getImageUrl(phone.image, 600, 900)
    : getPhoneImage(phone.brand, phone.model, { width: 600, height: 900, quality: 80 });

  const isAIGenerated = true;

  useEffect(() => {
    const loadReviewStats = async () => {
      try {
        const stats = await getReviewStats(phone.slug);
        if (stats && stats.total_reviews > 0) {
          setAverageRating(stats.average_rating);
          setReviewsCount(stats.total_reviews);
        } else {
          setAverageRating(phone.rating || 0);
          setReviewsCount(phone.review_count || 0);
        }
      } catch (error) {
        console.error('Error loading review stats:', error);
        setAverageRating(phone.rating || 0);
        setReviewsCount(phone.review_count || 0);
      }
    };
    loadReviewStats();
  }, [phone.slug, phone.rating, phone.review_count]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-base">★</span>
        ))}
        {halfStar && <span className="text-yellow-400 text-base">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-base">★</span>
        ))}
      </div>
    );
  };

  const getReviewCountDisplay = (count: number) => {
    if (count === 0) return 'No reviews yet';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K reviews`;
    return `${count.toLocaleString()} reviews`;
  };

  const getReviewEmoji = (count: number) => {
    if (count >= 500) return '🔥';
    if (count >= 100) return '⭐';
    if (count >= 50) return '📝';
    return '💬';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  const getFullChipsetName = (chipset: string) => {
    const chipsetMap: Record<string, string> = {
      apple: 'Apple A18 Pro',
      snapdragon: 'Snapdragon 8 Gen 4',
      tensor: 'Tensor G4',
      mediatek: 'Dimensity 9400',
      exynos: 'Exynos 2400',
      dimensity: 'Dimensity 9300',
    };
    return chipsetMap[chipset?.toLowerCase()] || chipset || 'N/A';
  };

  const fullChipsetName = getFullChipsetName(phone.chipset);

  const formatAntutuScore = (score: string | number): string => {
    const num = typeof score === 'string' ? parseInt(score.replace(/,/g, '')) : score;
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const antutuFormatted = formatAntutuScore(antutuScore);

  return (
    <>
      <article
        className="relative bg-white border-2 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        style={{ borderColor: `${theme.primary}22` }}
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
                  className="w-1.5 h-6 rounded-full"
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
              <span className="w-px h-5 bg-[#d4c5c5]" aria-hidden="true" />
              <span className="text-[0.7rem] font-medium text-[#6d4a4a] font-['Poppins',sans-serif]">
                {year}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
                <span
                  className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                  style={{
                    backgroundColor: `${theme.primary}08`,
                    color: `${theme.primary}90`,
                    borderColor: `${theme.primary}25`
                  }}
                >
                  {osName}
                </span>
                <span
                  className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap font-['Poppins',sans-serif]"
                  style={{
                    backgroundColor: `${theme.primary}08`,
                    color: `${theme.primary}90`,
                    borderColor: `${theme.primary}25`
                  }}
                >
                  {charging}W
                </span>
              </div>
            </div>

            {/* Main Title */}
            <div className="mb-2">
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

            {/* Rating & Review Count */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                {renderStars(averageRating)}
                <span className={`text-[0.8rem] font-bold ${getRatingColor(averageRating)} ml-0.5`}>
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1">
                <span className="text-[0.65rem] font-medium text-gray-500">
                  {getReviewCountDisplay(reviewsCount)}
                </span>
                {reviewsCount > 0 && (
                  <span className="text-[0.55rem] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">
                    {getReviewEmoji(reviewsCount)}
                  </span>
                )}
              </div>
              <span className="w-px h-4 bg-gray-200" />
              <span className="text-[1.1rem] font-bold text-[#FF6B00]">
                {price}
              </span>
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[0.6rem] font-medium text-gray-400 uppercase tracking-wide">
                  Colors:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {colors.map((color: string) => (
                    <span
                      key={color}
                      className="text-[0.5rem] font-medium px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${theme.primary}08`,
                        borderColor: `${theme.primary}25`,
                        color: `${theme.primary}90`
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Flagship Badge */}
            <div className="flex items-center gap-2.5 mb-6 flex-wrap">
              <span
                className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white px-3.5 py-1 rounded-full font-['Poppins',sans-serif] shadow-sm"
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              >
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                {parseInt(phone.price) > 899 ? "Flagship" : "Premium"}
              </span>
            </div>

            {/* Row 1: Spec Cards - 3 columns */}
            <div className="grid grid-cols-3 gap-3">
              <SpecCard icon="fa-display" label="Display" value={displayMain} subValue={`${refreshRate}Hz`} theme={theme} />
              <SpecCard icon="fa-camera" label="Camera" value={cameraName} subValue={`${parseInt(phone.price) > 899 ? '50MP' : '48MP'}`} theme={theme} />
              <SpecCard icon="fa-battery-three-quarters" label="Battery" value={batteryMain} subValue={`${charging}W`} theme={theme} />
            </div>

            {/* Row 2: Chipset + Antutu */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <ChipsetCard chipsetName={fullChipsetName} ram={`${ram}GB`} storage={`${storage}GB`} theme={theme} />
              <AntutuCard antutuScore={antutuFormatted} theme={theme} />
            </div>
          </div>

          {/* Phone Image - Desktop, glassy frame */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative">
            <div className="relative z-10">
              {/* ambient color glow behind glass */}
              <div
                className="absolute -inset-10 rounded-full blur-[70px] opacity-25 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${theme.primary}, transparent 70%)` }}
              />
              <div className="relative w-[270px] h-[400px] mx-auto">
                {/* glass frame */}
                <div
                  className="relative w-full h-full rounded-[28px] overflow-hidden"
                  style={{
                    background: `linear-gradient(160deg, rgba(255,255,255,0.65), rgba(255,255,255,0.15))`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${theme.primary}30`,
                    boxShadow: `0 20px 40px -12px ${theme.primary}25, 0 0 0 1px rgba(255,255,255,0.4) inset, 0 1px 0 rgba(255,255,255,0.6) inset`,
                  }}
                >
                  {/* top glass reflection streak */}
                  <div
                    className="absolute -top-1/4 -left-1/4 w-3/4 h-1/2 rotate-[-20deg] pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))',
                      filter: 'blur(2px)',
                    }}
                  />
                  {/* subtle inner ring */}
                  <div
                    className="absolute inset-0 rounded-[28px] pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${theme.primary}12` }}
                  />

                  <div className="relative w-full h-full p-3">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden bg-white/70"
                      style={{ border: `1px solid ${theme.primary}18` }}
                    >
                      <Image
                        src={imageUrl}
                        alt={fullName}
                        fill
                        className="object-contain p-2"
                        priority
                        sizes="270px"
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

                      {isAIGenerated && (
                        <button
                          onClick={() => setShowPopup(true)}
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-[0.4rem] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} />
                          <span>AI Render</span>
                          <span className="text-[0.3rem] opacity-60">ⓘ</span>
                        </button>
                      )}
                    </div>
                  </div>
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
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase" style={{ color: theme.primary }}>{phone.brand}</span>
              </div>
              <span className="w-px h-5 bg-[#d4c5c5]" />
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

            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                {renderStars(averageRating)}
                <span className={`text-[0.7rem] font-bold ${getRatingColor(averageRating)}`}>
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-[0.6rem] text-gray-500">
                {getReviewCountDisplay(reviewsCount)}
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="text-[0.85rem] font-bold text-[#FF6B00]">{price}</span>
            </div>

            {colors.length > 0 && (
              <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[0.5rem] font-medium text-gray-400">Colors:</span>
                {colors.slice(0, 3).map((color: string) => (
                  <span
                    key={color}
                    className="text-[0.45rem] font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${theme.primary}08`,
                      borderColor: `${theme.primary}25`,
                      color: `${theme.primary}90`
                    }}
                  >
                    {color}
                  </span>
                ))}
                {colors.length > 3 && (
                  <span className="text-[0.45rem] text-gray-400">+{colors.length - 3}</span>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 flex-wrap justify-center mt-2">
              <span className="text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: `${theme.primary}08`, color: `${theme.primary}90`, borderColor: `${theme.primary}25` }}>
                {osName}
              </span>
            </div>
          </div>

          {/* Phone Image - Mobile, glassy frame */}
          <div className="relative z-10 w-full flex justify-center mb-6">
            <div
              className="absolute -inset-10 rounded-full blur-[60px] opacity-25 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${theme.primary}, transparent 70%)` }}
            />
            <div className="relative w-[210px] h-[315px] sm:w-[250px] sm:h-[375px]">
              <div
                className="relative w-full h-full rounded-[24px] overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, rgba(255,255,255,0.65), rgba(255,255,255,0.15))`,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: `1px solid ${theme.primary}30`,
                  boxShadow: `0 16px 32px -10px ${theme.primary}25, 0 0 0 1px rgba(255,255,255,0.4) inset, 0 1px 0 rgba(255,255,255,0.6) inset`,
                }}
              >
                <div
                  className="absolute -top-1/4 -left-1/4 w-3/4 h-1/2 rotate-[-20deg] pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))', filter: 'blur(2px)' }}
                />
                <div
                  className="absolute inset-0 rounded-[24px] pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${theme.primary}12` }}
                />

                <div className="relative w-full h-full p-2.5">
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden bg-white/70"
                    style={{ border: `1px solid ${theme.primary}18` }}
                  >
                    <Image
                      src={imageUrl}
                      alt={fullName}
                      fill
                      className="object-contain p-2"
                      priority
                      sizes="(max-width: 640px) 210px, 250px"
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

                    {isAIGenerated && (
                      <button
                        onClick={() => setShowPopup(true)}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/80 text-[0.35rem] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        <span className="inline-block w-1 h-1 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} />
                        <span>AI Render</span>
                        <span className="text-[0.25rem] opacity-60">ⓘ</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Spec Cards */}
          <div className="w-full">
            <div className="flex items-center justify-center mb-4">
              <span className="flex items-center gap-1.5 text-[0.55rem] font-semibold text-white px-3.5 py-1 rounded-full shadow-sm" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                <i className="fas fa-crown text-[0.5rem] text-[#FFD700]" />
                {parseInt(phone.price) > 899 ? "Flagship" : "Premium"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mb-3">
              <CompactSpecCard icon="fa-display" label="Display" value={displayMain} theme={theme} />
              <CompactSpecCard icon="fa-camera" label="Camera" value={cameraName} theme={theme} />
              <CompactSpecCard icon="fa-battery-three-quarters" label="Battery" value={batteryMain} theme={theme} />
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              <CompactChipsetCard chipsetName={fullChipsetName} ram={`${ram}GB`} storage={`${storage}GB`} theme={theme} />
              <CompactAntutuCard antutuScore={antutuFormatted} theme={theme} />
            </div>
          </div>
        </div>
      </article>

      {/* AI Render Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 border border-[var(--color-line)] animate-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>

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

// ============================================
// SPEC CARD COMPONENTS
// ============================================

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
    <div
      className={`bg-white border-2 rounded-xl px-4 py-3.5 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-2 mb-2.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.secondary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className={`fas ${icon} text-[0.6rem]`} style={{ color: theme.primary }} />
        </div>
        <span
          className="text-[0.5rem] font-bold uppercase tracking-[0.08em]"
          style={{ color: `${theme.primary}90` }}
        >
          {label}
        </span>
      </div>
      <div className="text-[0.95rem] font-bold text-[#1a1a1a] leading-snug mb-2">
        {value}
      </div>
      {subValue && (
        <div className="flex items-start gap-2">
          <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: `${theme.primary}50` }} />
          <span className="text-[0.6rem] font-medium" style={{ color: `${theme.primary}90` }}>
            {subValue}
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================
// CHIPSET CARD
// ============================================

interface ChipsetCardProps {
  chipsetName: string;
  ram: string;
  storage: string;
  theme: { primary: string; secondary: string };
}

function ChipsetCard({ chipsetName, ram, storage, theme }: ChipsetCardProps) {
  return (
    <div
      className="bg-white border-2 rounded-xl px-4 py-3.5 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-2 mb-2.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.secondary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className="fas fa-microchip text-[0.6rem]" style={{ color: theme.primary }} />
        </div>
        <span
          className="text-[0.5rem] font-bold uppercase tracking-[0.08em]"
          style={{ color: `${theme.primary}90` }}
        >
          Chipset
        </span>
      </div>
      <div className="text-[0.8rem] font-bold text-[#1a1a1a] leading-snug mb-1">
        {chipsetName}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[0.6rem] font-medium text-gray-400">{ram}</span>
        <span className="w-px h-3 bg-gray-200" />
        <span className="text-[0.6rem] font-medium text-gray-400">{storage}</span>
      </div>
    </div>
  );
}

// ============================================
// ANTUTU CARD
// ============================================

interface AntutuCardProps {
  antutuScore: string;
  theme: { primary: string; secondary: string };
}

function AntutuCard({ antutuScore, theme }: AntutuCardProps) {
  return (
    <div
      className="bg-white border-2 rounded-xl px-4 py-3.5 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-2 mb-2.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.secondary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className="fas fa-gauge-high text-[0.6rem]" style={{ color: theme.primary }} />
        </div>
        <span
          className="text-[0.5rem] font-bold uppercase tracking-[0.08em]"
          style={{ color: `${theme.primary}90` }}
        >
          AnTuTu
        </span>
      </div>
      <div className="text-[0.8rem] font-bold text-[#1a1a1a] leading-snug">
        {antutuScore} pts
      </div>
    </div>
  );
}

// ============================================
// COMPACT SPEC CARDS FOR MOBILE
// ============================================

function CompactSpecCard({ icon, label, value, theme }: { icon: string; label: string; value: string; theme: { primary: string } }) {
  return (
    <div
      className="bg-white border-2 rounded-xl px-3 py-3 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.primary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className={`fas ${icon} text-[0.5rem]`} style={{ color: theme.primary }} />
        </div>
        <span className="text-[0.4rem] font-bold uppercase tracking-[0.08em]" style={{ color: `${theme.primary}90` }}>
          {label}
        </span>
      </div>
      <div className="text-[0.7rem] font-bold text-[#1a1a1a]">
        {value}
      </div>
    </div>
  );
}

function CompactChipsetCard({ chipsetName, ram, storage, theme }: { chipsetName: string; ram: string; storage: string; theme: { primary: string } }) {
  return (
    <div
      className="bg-white border-2 rounded-xl px-3 py-3 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.primary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className="fas fa-microchip text-[0.5rem]" style={{ color: theme.primary }} />
        </div>
        <span className="text-[0.4rem] font-bold uppercase tracking-[0.08em]" style={{ color: `${theme.primary}90` }}>
          Chipset
        </span>
      </div>
      <div className="text-[0.65rem] font-bold text-[#1a1a1a]">
        {chipsetName}
      </div>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[0.5rem] font-medium text-gray-400">{ram}</span>
        <span className="w-px h-2.5 bg-gray-200" />
        <span className="text-[0.5rem] font-medium text-gray-400">{storage}</span>
      </div>
    </div>
  );
}

function CompactAntutuCard({ antutuScore, theme }: { antutuScore: string; theme: { primary: string } }) {
  return (
    <div
      className="bg-white border-2 rounded-xl px-3 py-3 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: `${theme.primary}20`,
        boxShadow: `0 1px 3px ${theme.primary}0d`
      }}
    >
      <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b" style={{ borderColor: `${theme.primary}14` }}>
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}14, ${theme.primary}08)`,
            border: `1px solid ${theme.primary}20`
          }}
        >
          <i className="fas fa-gauge-high text-[0.5rem]" style={{ color: theme.primary }} />
        </div>
        <span className="text-[0.4rem] font-bold uppercase tracking-[0.08em]" style={{ color: `${theme.primary}90` }}>
          AnTuTu
        </span>
      </div>
      <div className="text-[0.65rem] font-bold text-[#1a1a1a]">
        {antutuScore} pts
      </div>
    </div>
  );
}