// components/phones/finder/PhoneComparison.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PhoneComparisonProps {
  currentPhone: any;
  relatedPhones: any[];
  allPhones: any[];
}

export function PhoneComparison({ currentPhone, relatedPhones, allPhones }: PhoneComparisonProps) {
  const [selectedPhones, setSelectedPhones] = useState<string[]>([
    currentPhone.slug,
    relatedPhones[0]?.slug || "",
    relatedPhones[1]?.slug || "",
  ]);
  const [showComparison, setShowComparison] = useState(false);

  // Get phone data by slug
  const getPhoneBySlug = (slug: string) => {
    return allPhones.find(p => p.slug === slug);
  };

  // Get selected phone objects
  const selectedPhoneData = selectedPhones
    .map(slug => getPhoneBySlug(slug))
    .filter(Boolean);

  // Compare specifications
  const compareSpecs = (phone: any) => {
    if (!phone) return null;
    return {
      brand: phone.brand,
      model: phone.model,
      year: phone.year,
      price: phone.price,
      rating: phone.rating,
      displaySize: phone.displaySize,
      camera: phone.cameraDetails,
      battery: phone.battery,
      chipset: phone.chipset,
      ram: phone.ram,
      storage: phone.storage,
      os: phone.os,
      weight: phone.weight,
    };
  };

  // Get available phones for comparison (excluding already selected)
  const availablePhones = allPhones.filter(
    p => !selectedPhones.includes(p.slug) && p.slug !== currentPhone.slug
  );

  const handlePhoneSelect = (index: number, slug: string) => {
    const newSelected = [...selectedPhones];
    newSelected[index] = slug;
    setSelectedPhones(newSelected);
  };

  const addPhone = () => {
    if (availablePhones.length > 0 && selectedPhones.length < 5) {
      setSelectedPhones([...selectedPhones, availablePhones[0].slug]);
    }
  };

  const removePhone = (index: number) => {
    if (index > 0 && selectedPhones.length > 2) {
      const newSelected = selectedPhones.filter((_, i) => i !== index);
      setSelectedPhones(newSelected);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4" aria-label="Phone Comparison">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#4A3520]">
              Compare Phones
            </h2>
          </div>
          <p className="text-gray-600 text-sm">
            Compare {currentPhone.brand} {currentPhone.model} with other smartphones side by side
          </p>
        </div>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="px-6 py-2.5 bg-[#FF6B00] text-white font-semibold rounded-full hover:bg-[#E55D00] transition-all hover:scale-105 shadow-md shadow-[#FF6B00]/25 flex items-center gap-2"
        >
          {showComparison ? "Hide" : "Show"} Comparison
          <span className="text-sm">⚖️</span>
        </button>
      </div>

      {/* Phone Selector */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-medium text-gray-600">Compare:</span>
        {selectedPhones.map((slug, index) => {
          const phone = getPhoneBySlug(slug);
          return (
            <div key={index} className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={slug}
                  onChange={(e) => handlePhoneSelect(index, e.target.value)}
                  className="appearance-none bg-white border border-[#E8E8E8] rounded-xl px-4 py-2 pr-8 text-sm font-medium text-[#4A3520] focus:border-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 cursor-pointer min-w-[150px]"
                >
                  {index === 0 ? (
                    <option value={slug}>⭐ {phone?.brand} {phone?.model}</option>
                  ) : (
                    <>
                      <option value="">Select phone</option>
                      {allPhones
                        .filter(p => !selectedPhones.includes(p.slug) || p.slug === slug)
                        .map(p => (
                          <option key={p.slug} value={p.slug}>
                            {p.brand} {p.model}
                          </option>
                        ))}
                    </>
                  )}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removePhone(index)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1"
                  aria-label="Remove phone"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
        {selectedPhones.length < 5 && availablePhones.length > 0 && (
          <button
            onClick={addPhone}
            className="px-4 py-2 border-2 border-dashed border-[#E8E8E8] rounded-xl text-sm text-gray-400 hover:text-[#FF6B00] hover:border-[#FF6B00] transition-all"
          >
            + Add Phone
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {showComparison && selectedPhoneData.length >= 2 && (
        <div className="overflow-x-auto">
          <div className="min-w-[800px] bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#FFF5EB] to-[#FFE4C4]">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#4A3520] sticky left-0 bg-gradient-to-r from-[#FFF5EB] to-[#FFE4C4]">
                    Specifications
                  </th>
                  {selectedPhoneData.map((phone, index) => (
                    <th key={index} className="px-4 py-3 text-center min-w-[150px]">
                      <Link
                        href={`/phones/finder/${phone.slug}`}
                        className="block hover:text-[#FF6B00] transition-colors"
                      >
                        <div className="relative w-16 h-16 mx-auto mb-2 bg-gray-50 rounded-xl overflow-hidden">
                          <Image
                            src={phone.image || "/images/placeholder-phone.jpg"}
                            alt={`${phone.brand} ${phone.model}`}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="font-semibold text-[#4A3520] text-sm">
                          {phone.brand}
                        </div>
                        <div className="text-xs text-gray-500">
                          {phone.model}
                        </div>
                        {index === 0 && (
                          <span className="inline-block mt-1 text-[0.5rem] bg-[#FF6B00] text-white px-2 py-0.5 rounded-full font-bold">
                            CURRENT
                          </span>
                        )}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "⭐ Rating", key: "rating", icon: "⭐" },
                  { label: "💰 Price", key: "price", icon: "💰" },
                  { label: "📱 Year", key: "year", icon: "📅" },
                  { label: "📏 Display", key: "displaySize", icon: "📱" },
                  { label: "📷 Camera", key: "camera", icon: "📷" },
                  { label: "🔋 Battery", key: "battery", icon: "🔋" },
                  { label: "⚡ Chipset", key: "chipset", icon: "⚡" },
                  { label: "🧠 RAM", key: "ram", icon: "🧠" },
                  { label: "💾 Storage", key: "storage", icon: "💾" },
                  { label: "📱 OS", key: "os", icon: "📱" },
                  { label: "⚖️ Weight", key: "weight", icon: "⚖️" },
                ].map(({ label, key, icon }) => (
                  <tr key={key} className="border-t border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-[#4A3520] sticky left-0 bg-white flex items-center gap-2">
                      <span className="text-base">{icon}</span>
                      {label}
                    </td>
                    {selectedPhoneData.map((phone, index) => {
                      const value = compareSpecs(phone)?.[key as keyof ReturnType<typeof compareSpecs>];
                      return (
                        <td key={index} className="px-4 py-3 text-center text-sm text-gray-600">
                          {value || "—"}
                          {key === "rating" && value && (
                            <span className="ml-1 text-yellow-400">★</span>
                          )}
                          {key === "price" && value && (
                            <span className="block text-xs text-gray-400">USD</span>
                          )}
                          {key === "camera" && value && (
                            <span className="block text-xs text-gray-400">MP</span>
                          )}
                          {key === "battery" && value && (
                            <span className="block text-xs text-gray-400">mAh</span>
                          )}
                          {key === "ram" && value && (
                            <span className="block text-xs text-gray-400">GB</span>
                          )}
                          {key === "storage" && value && (
                            <span className="block text-xs text-gray-400">GB</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparison Summary */}
      {showComparison && selectedPhoneData.length >= 2 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 className="text-sm font-semibold text-green-800 mb-2">✅ Best Overall</h4>
            <p className="text-sm text-green-700">
              {selectedPhoneData.reduce((best, phone) => 
                (phone.rating || 0) > (best.rating || 0) ? phone : best
              ).brand} {selectedPhoneData.reduce((best, phone) => 
                (phone.rating || 0) > (best.rating || 0) ? phone : best
              ).model}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">💰 Best Value</h4>
            <p className="text-sm text-blue-700">
              {selectedPhoneData.reduce((best, phone) => 
                parseInt(phone.price) < parseInt(best.price) ? phone : best
              ).brand} {selectedPhoneData.reduce((best, phone) => 
                parseInt(phone.price) < parseInt(best.price) ? phone : best
              ).model}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 className="text-sm font-semibold text-purple-800 mb-2">📱 Best Display</h4>
            <p className="text-sm text-purple-700">
              {selectedPhoneData.reduce((best, phone) => 
                parseFloat(phone.displaySize) > parseFloat(best.displaySize) ? phone : best
              ).brand} {selectedPhoneData.reduce((best, phone) => 
                parseFloat(phone.displaySize) > parseFloat(best.displaySize) ? phone : best
              ).model}
            </p>
          </div>
        </div>
      )}

      {/* View All Phones */}
      <div className="mt-6 text-center">
        <Link
          href="/phones/finder"
          className="inline-flex items-center gap-2 text-[#FF6B00] font-semibold hover:underline transition-all group"
        >
          <span>View all phones</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}