// components/HeroSection.tsx
"use client";

import { Phone } from "@/types/phone";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  phone: Phone;
}

export function HeroSection({ phone }: HeroSectionProps) {
  const {
    name,
    brand,
    specs,
    benchmarks,
    rating,
    reviewCount,
    isEditorChoice,
    isFlagship,
    tags,
    year,
    image,
    slug,
    stats,
  } = phone;

  // Get primary color from tags or default
  const primaryColor =
    tags.find((tag) =>
      ["Titanium", "Black", "White", "Blue", "Natural", "Obsidian", "Porcelain", "Bay", "Violet", "Yellow", "Gray"].some(
        (color) => tag.includes(color)
      )
    ) || "Premium";

  // Calculate gauge percentage + a plain-language performance tier
  const gaugeMax = 2200000;
  const gaugePct = Math.min(100, Math.round((benchmarks.antutu / gaugeMax) * 100));
  const perfTier =
    gaugePct >= 85 ? "Top-tier performance" : gaugePct >= 60 ? "High performance" : "Solid performance";

  const specCards = [
    {
      icon: "fa-display",
      label: "Display",
      value: specs.display,
      sub: `${specs.refreshRate} · ${specs.resolution}`,
    },
    {
      icon: "fa-microchip",
      label: "Chipset",
      value: specs.chipset,
      sub: `${specs.ram} RAM · ${specs.storage}`,
    },
    {
      icon: "fa-camera",
      label: "Camera",
      value: specs.camera,
      sub: specs.cameraTelephoto || specs.cameraWide?.split(",")[0] || "Main sensor",
    },
    {
      icon: "fa-battery-three-quarters",
      label: "Battery",
      value: specs.battery,
      sub: `${specs.wiredCharging}${specs.videoPlayback ? ` · ${specs.videoPlayback}` : ""}`,
    },
  ];

  return (
    <article
      className="relative bg-gradient-to-br from-white via-[#fdfaf5] to-[#f5ebd0] border border-[rgba(127,1,31,0.10)] rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-xl shadow-[rgba(127,1,31,0.06)] overflow-hidden"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Hidden Schema Meta Data */}
      <meta itemProp="name" content={`${brand} ${name}`} />
      <meta itemProp="brand" content={brand} />
      <meta itemProp="releaseDate" content={year.toString()} />
      <meta itemProp="sku" content={slug} />
      <meta itemProp="model" content={name} />
      <meta
        itemProp="description"
        content={`${brand} ${name} - ${specs.display} display, ${specs.chipset}, ${specs.camera} camera, ${specs.battery} battery.`}
      />

      {/* Aggregate Rating Schema */}
      <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
        <meta itemProp="ratingValue" content={rating.toString()} />
        <meta itemProp="reviewCount" content={reviewCount.toString()} />
        <meta itemProp="bestRating" content="5" />
      </div>

      {/* Premium Background Effects */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(127,1,31,0.05),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(127,1,31,0.03),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 xl:col-span-8">
          {/* Brand + Year + Tags */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#7F011F] to-[#a80a30]" aria-hidden="true" />
              <span className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-[#7F011F] font-['Poppins',sans-serif]">
                {brand}
              </span>
            </div>
            <span className="w-px h-4 bg-[#2d1a1a]/20" aria-hidden="true" />
            <span className="text-[0.75rem] font-medium text-[#2d1a1a]/55 font-['Poppins',sans-serif]">
              {year} Edition
            </span>

            <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
              {tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[0.7rem] font-semibold text-[#7F011F] bg-[#7F011F]/[0.06] px-2.5 py-1 rounded-full border border-[rgba(127,1,31,0.08)] whitespace-nowrap font-['Poppins',sans-serif]"
                >
                  {tag}
                </span>
              ))}
              <span className="text-[0.7rem] font-bold text-white bg-gradient-to-r from-[#7F011F] to-[#a80a30] px-2.5 py-1 rounded-full whitespace-nowrap font-['Poppins',sans-serif] shadow-sm shadow-[#7F011F]/20">
                {primaryColor}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="font-['Poppins',sans-serif] text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold leading-[1.08] tracking-[-1.5px] text-[#160c0c] mb-3"
            itemProp="name"
          >
            {brand} <span className="text-[#7F011F]">{name}</span>
          </h1>

          {/* Views + Flagship Badge - Removed Rating, Reviews, Editor's Choice */}
          <div className="flex items-center gap-2.5 mb-7 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(127,1,31,0.06)] shadow-sm">
              <i className="fas fa-eye text-[#7F011F]/60 text-[0.75rem]" aria-hidden="true" />
              <span className="text-[0.8rem] font-semibold text-[#2d1a1a] font-['Poppins',sans-serif]">{stats.views}</span>
              <span className="text-[0.7rem] text-[#2d1a1a]/40 font-['Poppins',sans-serif]">views</span>
            </div>

            {isFlagship && (
              <span className="flex items-center gap-1.5 text-[0.7rem] font-bold text-white bg-[#160c0c] px-3 py-1.5 rounded-full font-['Poppins',sans-serif] shadow-md">
                <i className="fas fa-crown text-[0.65rem] text-[#FFD700]" />
                Flagship
              </span>
            )}
          </div>

          {/* Spec Grid — clearer 2-line hierarchy, no cramped third line */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {specCards.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white/80 backdrop-blur-sm border border-[rgba(127,1,31,0.06)] rounded-2xl px-4 py-4 text-left hover:shadow-lg hover:border-[rgba(127,1,31,0.15)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7F011F]/10 to-[#a80a30]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#7F011F]/20 group-hover:to-[#a80a30]/20 transition-all duration-300">
                    <i className={`fas ${item.icon} text-[#7F011F] text-[0.75rem]`} aria-hidden="true" />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#2d1a1a]/45 font-['Poppins',sans-serif]">
                    {item.label}
                  </span>
                </div>
                <div className="text-[0.95rem] font-bold text-[#160c0c] leading-snug tracking-[-0.2px] font-['Poppins',sans-serif] mb-1">
                  {item.value}
                </div>
                <div className="text-[0.72rem] text-[#2d1a1a]/55 font-medium font-['Poppins',sans-serif] leading-snug">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Performance Benchmark Card — real numbers, no decoration for its own sake */}
          <div className="relative bg-gradient-to-br from-[#faf7f7] to-[#f5f0f0] border border-[rgba(127,1,31,0.08)] rounded-2xl px-5 py-5 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#7F011F]/[0.03] blur-2xl" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#7F011F]/20">
                    <i className="fas fa-gauge-high text-white text-[0.9rem]" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[0.75rem] font-bold text-[#160c0c] uppercase tracking-[0.06em] font-['Poppins',sans-serif] leading-tight">
                      Performance Benchmark
                    </div>
                    <div className="text-[0.7rem] text-[#7F011F]/70 font-semibold font-['Poppins',sans-serif]">
                      AnTuTu v10 Verified
                    </div>
                  </div>
                </div>
                <span className="text-[0.7rem] font-bold text-white bg-gradient-to-r from-[#7F011F] to-[#a80a30] px-3 py-1.5 rounded-full shadow-md shadow-[#7F011F]/30 font-['Poppins',sans-serif] whitespace-nowrap">
                  {perfTier}
                </span>
              </div>

              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex-1 min-w-[160px]">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[1.7rem] sm:text-[2rem] font-extrabold text-[#160c0c] font-['Poppins',sans-serif] tracking-[-1px] tabular-nums">
                      {benchmarks.antutu.toLocaleString()}
                    </span>
                    <span className="text-[0.75rem] font-semibold text-[#2d1a1a]/45 font-['Poppins',sans-serif]">
                      AnTuTu points
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#7F011F]/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7F011F] to-[#a80a30] transition-all duration-1000"
                      style={{ width: `${gaugePct}%` }}
                    />
                  </div>
                </div>

                <div className="w-px h-11 bg-[rgba(127,1,31,0.10)] hidden sm:block" aria-hidden="true" />

                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#2d1a1a]/45 font-['Poppins',sans-serif] mb-1">
                      Geekbench 6 · Single
                    </div>
                    <div className="text-[1.05rem] font-bold text-[#160c0c] font-['Poppins',sans-serif] tracking-[-0.3px] tabular-nums">
                      {benchmarks.geekbench6Single}
                    </div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#2d1a1a]/45 font-['Poppins',sans-serif] mb-1">
                      Geekbench 6 · Multi
                    </div>
                    <div className="text-[1.05rem] font-bold text-[#160c0c] font-['Poppins',sans-serif] tracking-[-0.3px] tabular-nums">
                      {benchmarks.geekbench6Multi}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Image Section */}
        <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center relative">
          {/* Premium Glow Rings */}
          <div
            className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(127,1,31,0.06),transparent_60%)] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full bg-[radial-gradient(circle,rgba(127,1,31,0.04),transparent_60%)] blur-2xl top-0 right-4"
            aria-hidden="true"
          />
          <div
            className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(201,74,106,0.04),transparent_60%)] blur-2xl bottom-0 left-0"
            aria-hidden="true"
          />

          {/* Phone Frame with Reflection */}
          <div className="relative z-10 group">
            <figure className="relative w-[240px] h-[360px] sm:w-[280px] sm:h-[420px] lg:w-[320px] lg:h-[480px] mx-auto">
              <div
                className="absolute -inset-8 bg-gradient-to-b from-[#7F011F]/5 via-transparent to-[#7F011F]/10 rounded-3xl blur-2xl"
                aria-hidden="true"
              />
              <div className="absolute -inset-2 bg-gradient-to-br from-[#7F011F]/10 via-transparent to-[#a80a30]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[rgba(127,1,31,0.12)] h-full">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={`${brand} ${name} smartphone - ${specs.display} display with ${specs.chipset} processor and ${specs.camera} camera system`}
                      width={320}
                      height={480}
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                      priority
                      loading="eager"
                      fetchPriority="high"
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf5]/20 via-transparent to-white/10 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <i className="fas fa-mobile-alt text-6xl text-[#7F011F]/10" aria-hidden="true" />
                  </div>
                )}
                <figcaption className="sr-only">
                  {brand} {name} {year} - {specs.display} display, {specs.chipset} chipset, {specs.camera} main camera
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
}