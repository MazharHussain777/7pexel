// components/compare/AddPhoneModal.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
}

interface AddPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (phone: Phone) => void;
  existingPhones: Phone[];
  maxPhones: number;
}

const FALLBACK_IMAGE = "/images/phone-placeholder.png";

export function AddPhoneModal({ 
  isOpen, 
  onClose, 
  onSelect, 
  existingPhones, 
  maxPhones 
}: AddPhoneModalProps) {
  const [search, setSearch] = useState("");
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchPhones = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch('/api/phones?limit=200');
        const result = await res.json();
        if (result.success) {
          setAllPhones(result.data);
        } else {
          setError("Failed to load phones");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchPhones();
  }, [isOpen]);

  const existingSlugs = useMemo(() => new Set(existingPhones.map(p => p.slug)), [existingPhones]);

  const filteredPhones = useMemo(() => {
    const available = allPhones.filter(p => !existingSlugs.has(p.slug));
    if (!search.trim()) return available;
    const q = search.toLowerCase();
    return available.filter(p => 
      p.brand.toLowerCase().includes(q) || 
      p.name.toLowerCase().includes(q)
    );
  }, [allPhones, search, existingSlugs]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
                <i className="fa-solid fa-plus-circle text-[#7F011F] mr-2" />
                Add Phone
              </h2>
              <p className="text-xs text-gray-400 ml-7">
                <i className="fa-regular fa-circle-check text-green-500 mr-1" />
                {filteredPhones.length} available • 
                <span className="ml-1 text-[#7F011F] font-medium">
                  {maxPhones - existingPhones.length} slots left
                </span>
              </p>
            </div>
            
            {/* Close Button - Top Right with visible icon */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#7F011F] transition-all duration-200 flex items-center justify-center text-gray-500 hover:text-white group shadow-sm hover:shadow-md"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-lg group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-5 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#7F011F]/20 focus-within:bg-white transition-all border border-gray-100 focus-within:border-[#7F011F]/30">
              <i className="fa-solid fa-magnifying-glass text-gray-400 mr-3 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by brand or model..."
                className="flex-1 bg-transparent outline-none text-sm text-[#1a1a1a] placeholder:text-gray-400 font-['Poppins',sans-serif]"
                autoFocus
              />
              {search && (
                <button 
                  onClick={() => setSearch("")} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
          </div>

          {/* Phone List */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-3 border-[#7F011F]/20 border-t-[#7F011F] rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-400 mt-3">
                  <i className="fa-regular fa-clock mr-2" />
                  Loading phones...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <i className="fa-solid fa-circle-exclamation text-3xl text-red-300" />
                <p className="text-sm text-red-400 mt-2">{error}</p>
              </div>
            ) : filteredPhones.length === 0 ? (
              <div className="text-center py-12">
                <i className="fa-solid fa-mobile-screen-button text-4xl text-gray-200" />
                <p className="text-sm text-gray-400 mt-3">
                  {search ? "No phones found" : "All phones added"}
                </p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-3 text-xs text-[#7F011F] hover:underline"
                  >
                    <i className="fa-solid fa-arrow-left mr-1" />
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {filteredPhones.map(phone => (
                  <button
                    key={phone._id}
                    onClick={() => { onSelect(phone); onClose(); }}
                    className="group bg-white rounded-xl border border-gray-100 hover:border-[#7F011F]/30 hover:shadow-md transition-all p-2 text-left relative overflow-hidden"
                  >
                    {/* Add hover overlay icon */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="bg-[#7F011F] text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-plus text-xs" />
                      </div>
                    </div>
                    
                    <div className="relative aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={phone.image || FALLBACK_IMAGE}
                        alt={phone.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 33vw, 25vw"
                      />
                    </div>
                    <div className="mt-1.5 text-center">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#7F011F]">
                        {phone.brand}
                      </div>
                      <div className="text-[10px] font-medium text-[#1a1a1a] line-clamp-1">
                        {phone.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50/50">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                <i className="fa-regular fa-list mr-1" />
                {filteredPhones.length} phones available
              </span>
              <span>
                <i className="fa-regular fa-check-circle mr-1 text-[#7F011F]" />
                {existingPhones.length} of {maxPhones} selected
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}