// app/auto/brands/components/Toolbar.tsx
"use client";

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCountry: string;
  onCountryChange: (country: string) => void;
  sortMode: string;
  onSortChange: (mode: string) => void;
  countries: string[];
  totalBrands: number;
}

export function Toolbar({
  searchQuery,
  onSearchChange,
  activeCountry,
  onCountryChange,
  sortMode,
  onSortChange,
  countries,
  totalBrands,
}: ToolbarProps) {
  return (
    <div className="border-[1.5px] border-[var(--color-line)] rounded-[12px] p-4.5 mb-6 bg-[var(--color-paper)]">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex-1 min-w-[200px] relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-ink-soft)] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2.5 pl-10.5 rounded-full border-[1.5px] border-[var(--color-line)] bg-white font-poppins text-[0.88rem] text-[var(--color-ink)] transition-all focus:outline-none focus:border-[var(--color-green-bright)] focus:shadow-[0_0_0_4px_rgba(31,162,90,0.12)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-black/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <select
          value={sortMode}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 rounded-full border-[1.5px] border-[var(--color-line)] bg-white text-[0.83rem] font-semibold text-[var(--color-ink)] font-poppins"
        >
          <option value="alpha">Sort: A–Z</option>
          <option value="models">Sort: Model count</option>
          <option value="founded">Sort: Founded year</option>
        </select>
      </div>

      {/* Country Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-jetbrains-mono text-[0.66rem] tracking-[0.1em] uppercase text-[var(--color-ink-soft)] mr-1">Country</span>
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => onCountryChange(country)}
            className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[0.78rem] font-semibold transition-all ${
              activeCountry === country
                ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
            }`}
          >
            {country === "all" ? "All" : country}
          </button>
        ))}
        <span className="ml-auto text-[0.78rem] text-[var(--color-ink-soft)] font-jetbrains-mono">
          <b className="text-[var(--color-ink)]">{totalBrands}</b> {totalBrands === 1 ? "brand" : "brands"}
        </span>
      </div>
    </div>
  );
}