// components/laptops/finder/LaptopSpecs.tsx
"use client";

import { useState } from "react";
import type { LaptopDetail } from "@/app/laptops/finder/data/laptop-data";

interface LaptopSpecsProps {
  laptop: LaptopDetail;
}

export function LaptopSpecs({ laptop }: LaptopSpecsProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  const contentHtml = laptop.contentHtml || "";

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="border-b border-[var(--color-line)] pb-4 mb-6">
              <h2 className="font-fraunces font-medium text-[1.6rem] tracking-[-0.01em]">
                Full <span className="text-[var(--color-green)]">Specifications</span>
              </h2>
              <p className="text-[0.9rem] text-[var(--color-ink-soft)] mt-1">
                Complete technical details for the {laptop.brand} {laptop.model}
              </p>
            </div>

            {/* Specs Grid - Price Removed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Brand
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.brand}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Model
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.model}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Year
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.year}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Display
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.display}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Processor
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.processor}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  RAM
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.ram}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Storage
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.storage} {laptop.storageType}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Graphics
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.graphics}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Battery
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.battery}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Weight
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.weight}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  OS
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.os}</p>
              </div>
              <div className="p-4 bg-[var(--color-paper)] rounded-[12px] border border-[var(--color-line)]">
                <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                  Display Size
                </span>
                <p className="font-semibold text-[0.95rem] mt-1">{laptop.displaySize}"</p>
              </div>
            </div>

            {/* Highlights */}
            {laptop.highlights && laptop.highlights.length > 0 && (
              <div className="mt-6">
                <h3 className="font-fraunces font-medium text-[1.1rem] mb-3">✨ Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {laptop.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-[0.9rem] text-[var(--color-ink-soft)]">
                      <span className="text-[var(--color-green)] mt-0.5">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {laptop.pros && laptop.pros.length > 0 && (
                <div className="p-4 rounded-[12px] bg-green-50 border border-green-200">
                  <h4 className="font-fraunces font-semibold text-[1rem] text-green-700 mb-2">✅ Pros</h4>
                  <ul className="list-none space-y-1">
                    {laptop.pros.map((pro, index) => (
                      <li key={index} className="text-[0.85rem] text-[var(--color-ink-soft)] flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {laptop.cons && laptop.cons.length > 0 && (
                <div className="p-4 rounded-[12px] bg-red-50 border border-red-200">
                  <h4 className="font-fraunces font-semibold text-[1rem] text-red-700 mb-2">❌ Cons</h4>
                  <ul className="list-none space-y-1">
                    {laptop.cons.map((con, index) => (
                      <li key={index} className="text-[0.85rem] text-[var(--color-ink-soft)] flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Full Review Content */}
            {contentHtml && (
              <div className="mt-8">
                <div className="border-t border-[var(--color-line)] pt-6">
                  <button
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline"
                  >
                    {showFullContent ? "Hide full review" : "Read full review"}
                    <svg className={`w-4 h-4 transition-transform ${showFullContent ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showFullContent && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-line)]">
                      <style dangerouslySetInnerHTML={{ __html: laptop.customStyles || "" }} />
                      <div className="laptop-detail" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Rating & Price Removed */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Quick Stats - Rating Removed */}
              <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-4">
                <h4 className="font-fraunces font-medium text-[0.95rem] mb-3">📊 Quick Specs</h4>
                <div className="space-y-2 text-[0.8rem]">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Display</span>
                    <span className="font-semibold">{laptop.displaySize}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Processor</span>
                    <span className="font-semibold text-[0.7rem]">{laptop.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">RAM</span>
                    <span className="font-semibold">{laptop.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Storage</span>
                    <span className="font-semibold">{laptop.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Graphics</span>
                    <span className="font-semibold text-[0.7rem]">{laptop.graphics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Weight</span>
                    <span className="font-semibold">{laptop.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">Battery</span>
                    <span className="font-semibold">{laptop.battery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-ink-soft)]">OS</span>
                    <span className="font-semibold">{laptop.os}</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              {laptop.colors && laptop.colors.length > 0 && (
                <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-4">
                  <h4 className="font-fraunces font-medium text-[0.95rem] mb-2">🎨 Colors</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {laptop.colors.map((color) => (
                      <span
                        key={color}
                        className="px-2.5 py-1 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] text-[0.65rem] font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}