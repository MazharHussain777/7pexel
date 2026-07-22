// components/PhoneSearchBar.tsx
"use client";

interface PhoneSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCount: number;
}

export function PhoneSearchBar({
  searchTerm,
  onSearchChange,
  filterCount,
}: PhoneSearchBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
      <h1 className="text-2xl md:text-[1.6rem] font-bold font-['Poppins',sans-serif] text-[#2d1a1a] flex items-center gap-2">
        <i className="fas fa-mobile-alt text-[#7F011F]" />
        Phone Finder
        <span className="bg-[#7F011F] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
          {filterCount}
        </span>
      </h1>
      <div className="flex items-center bg-[#F5EBD0]/60 rounded-full px-4 py-2 w-full max-w-[280px] transition-shadow focus-within:shadow-[0_0_0_2px_rgba(127,1,31,0.20)] border border-[rgba(127,1,31,0.08)]">
        <i className="fas fa-search text-[#7F011F]/60 mr-2.5" />
        <input
          type="text"
          placeholder="Search phones..."
          className="border-none bg-transparent font-['Poppins',sans-serif] text-sm w-full outline-none py-1.5 text-[#2d1a1a] placeholder:text-[#7F011F]/40"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}