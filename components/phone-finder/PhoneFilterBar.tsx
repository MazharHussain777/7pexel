// @ts-nocheck
// components/phone-finder/PhoneFilterBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface FilterGroup {
  id: string;
  label: string;
  type: "checkboxes" | "range" | "toggle";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  presets?: { label: string; min: number; max: number }[];
}

interface PhoneFilterBarProps {
  filterGroups: FilterGroup[];
  selected: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onApply: () => void;
  onReset: () => void;
  filterCount: number;
}

function getUnit(label: string): string {
  const units: Record<string, string> = {
    RAM: "GB",
    Storage: "GB",
    Battery: "mAh",
    Display: '"',
    Refresh: "Hz",
    "Back Camera": "MP",
    "Front Camera": "MP",
  };
  return units[label] || "";
}

function groupActiveCount(group: FilterGroup, value: any): number {
  if (group.type === "range") {
    if (!value || value.min === undefined) return 0;
    return value.min !== group.min || value.max !== group.max ? 1 : 0;
  }
  return Array.isArray(value) ? value.length : 0;
}

export function PhoneFilterBar({
  filterGroups,
  selected,
  onFilterChange,
  onApply,
  onReset,
  filterCount,
}: PhoneFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [search, setSearch] = useState<Record<string, string>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const closeAllDropdowns = () => setOpenDropdown(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDropdowns();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!openDropdown) return;

      const target = e.target as Node;
      const dropdownElement = dropdownRefs.current[openDropdown];
      const buttonElement = document.querySelector(`[data-filter-id="${openDropdown}"]`);

      const isOutsideDropdown = dropdownElement && !dropdownElement.contains(target);
      const isOutsideButton = buttonElement && !buttonElement.contains(target);

      if (isOutsideDropdown && isOutsideButton) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const current = selected[filterId] || [];
    if (checked) {
      onFilterChange(filterId, [...current, value]);
    } else {
      onFilterChange(filterId, current.filter((v: string) => v !== value));
    }
  };

  const handleRangeChange = (filterId: string, type: "min" | "max", value: number) => {
    const current = selected[filterId] || { min: 0, max: 0 };
    onFilterChange(filterId, { ...current, [type]: value });
  };

  const handleToggleChange = (filterId: string, value: string, checked: boolean) => {
    const current = selected[filterId] || [];
    if (checked) {
      onFilterChange(filterId, [...current, value]);
    } else {
      onFilterChange(filterId, current.filter((v: string) => v !== value));
    }
  };

  const clearGroup = (group: FilterGroup) => {
    if (group.type === "range") {
      onFilterChange(group.id, { min: group.min, max: group.max });
    } else {
      onFilterChange(group.id, []);
    }
  };

  return (
    <div
      ref={barRef}
      className="sticky top-2 z-30 flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-[rgba(108,43,217,0.08)] mb-4 shadow-[0_4px_20px_rgba(108,43,217,0.06)]"
    >
      {filterGroups.map((group) => {
        const isOpen = openDropdown === group.id;
        const selectedValues = selected[group.id];
        const activeCount = groupActiveCount(group, selectedValues);
        const isLongList = (group.options?.length ?? 0) > 8;
        const query = (search[group.id] || "").toLowerCase();
        const filteredOptions =
          isLongList && query
            ? group.options?.filter((o) => o.toLowerCase().includes(query))
            : group.options;

        return (
          <div key={group.id} className="relative inline-block">
            <button
              type="button"
              aria-expanded={isOpen}
              data-filter-id={group.id}
              className={`relative bg-white border rounded-full pl-4 pr-3.5 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-all duration-300 whitespace-nowrap cursor-pointer font-['Poppins',sans-serif] ${
                isOpen
                  ? "border-[#6C2BD9] shadow-[0_0_0_3px_rgba(108,43,217,0.10)] text-[#6C2BD9]"
                  : activeCount > 0
                  ? "border-[#6C2BD9]/40 bg-[#6C2BD9]/5 text-[#6C2BD9]"
                  : "border-[rgba(108,43,217,0.15)] text-[#160c0c] hover:border-[#6C2BD9] hover:bg-[#f5f0ff] hover:shadow-[0_0_0_3px_rgba(108,43,217,0.06)]"
              }`}
              onClick={() => toggleDropdown(group.id)}
            >
              {group.label}
              {activeCount > 0 && (
                <span className="flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-gradient-to-r from-[#6C2BD9] to-[#E9407A] text-white text-[0.6rem] font-bold leading-none">
                  {activeCount}
                </span>
              )}
              <i
                className={`fas fa-chevron-down text-[0.6rem] text-[#6C2BD9]/50 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div
                ref={(el) => {
                  dropdownRefs.current[group.id] = el;
                }}
                className={`absolute top-full left-0 mt-2 bg-white backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-12px_rgba(108,43,217,0.15)] p-3 z-50 border border-[rgba(108,43,217,0.08)] animate-in fade-in-0 zoom-in-95 duration-200 ${
                  group.type === "checkboxes" && isLongList
                    ? "min-w-[340px] max-w-[420px]"
                    : "min-w-[250px] max-h-[420px] overflow-y-auto"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Dropdown header: search + clear */}
                <div className="flex items-center gap-2 mb-2 px-0.5">
                  {isLongList && (
                    <div className="relative flex-1">
                      <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-[0.6rem] text-[#6C2BD9]/40" />
                      <input
                        type="text"
                        value={search[group.id] || ""}
                        onChange={(e) =>
                          setSearch((prev) => ({ ...prev, [group.id]: e.target.value }))
                        }
                        placeholder={`Search ${group.label.toLowerCase()}`}
                        className="w-full text-xs bg-[#f5f0ff] border border-[rgba(108,43,217,0.08)] rounded-full pl-7 pr-2.5 py-1.5 text-[#160c0c] placeholder:text-[#6d4a6b]/60 focus:outline-none focus:border-[#6C2BD9]/40 font-['Poppins',sans-serif]"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  {activeCount > 0 && (
                    <button
                      type="button"
                      onClick={() => clearGroup(group)}
                      className="text-[0.65rem] font-semibold text-[#6C2BD9] hover:text-[#E9407A] whitespace-nowrap px-1.5 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {group.type === "checkboxes" && (
                  <>
                    {filteredOptions && filteredOptions.length > 0 ? (
                      filteredOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl hover:bg-[#f5f0ff] cursor-pointer text-[#160c0c] font-['Poppins',sans-serif] transition-all duration-200 group/label"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            className="appearance-none w-4 h-4 border-2 border-[rgba(108,43,217,0.20)] rounded bg-white flex-shrink-0 cursor-pointer relative checked:bg-gradient-to-r checked:from-[#6C2BD9] checked:to-[#E9407A] checked:border-[#6C2BD9] checked:after:content-['✓'] checked:after:text-white checked:after:text-[10px] checked:after:flex checked:after:items-center checked:after:justify-center transition-all duration-200"
                            checked={(selectedValues || []).includes(opt)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange(group.id, opt, e.target.checked);
                            }}
                          />
                          <span className="group-hover/label:text-[#6C2BD9] transition-colors">
                            {opt}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-xs text-[#6d4a6b] text-center py-4 font-['Poppins',sans-serif]">
                        No matches for "{search[group.id]}"
                      </p>
                    )}
                  </>
                )}

                {group.type === "range" && (
                  <div className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                    {/* Type-in values */}
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="number"
                        value={selectedValues?.min ?? group.min}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v)) {
                            handleRangeChange(
                              group.id,
                              "min",
                              Math.min(Math.max(v, group.min!), selectedValues?.max ?? group.max!)
                            );
                          }
                        }}
                        className="w-full text-center text-xs font-semibold bg-[#f5f0ff] border border-[rgba(108,43,217,0.12)] rounded-full py-1.5 text-[#6C2BD9] focus:outline-none focus:border-[#6C2BD9]/50"
                      />
                      <span className="text-[#6d4a6b]/50 text-xs">–</span>
                      <input
                        type="number"
                        value={selectedValues?.max ?? group.max}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v)) {
                            handleRangeChange(
                              group.id,
                              "max",
                              Math.max(Math.min(v, group.max!), selectedValues?.min ?? group.min!)
                            );
                          }
                        }}
                        className="w-full text-center text-xs font-semibold bg-[#f5f0ff] border border-[rgba(108,43,217,0.12)] rounded-full py-1.5 text-[#6C2BD9] focus:outline-none focus:border-[#6C2BD9]/50"
                      />
                      <span className="text-[10px] text-[#6d4a6b]/60 whitespace-nowrap">
                        {getUnit(group.label)}
                      </span>
                    </div>

                    {/* Single-track dual-handle slider */}
                    <div className="relative h-6 flex items-center mb-1">
                      <div className="absolute w-full h-1.5 bg-[#e8e8e8] rounded-full" />
                      <div
                        className="absolute h-1.5 bg-gradient-to-r from-[#6C2BD9] to-[#E9407A] rounded-full"
                        style={{
                          left: `${(
                            ((selectedValues?.min ?? group.min!) - group.min!) /
                            (group.max! - group.min!)) *
                            100
                          }%`,
                          right: `${(
                            100 -
                            (((selectedValues?.max ?? group.max!) - group.min!) /
                              (group.max! - group.min!)) *
                              100
                          )}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={group.min}
                        max={group.max}
                        step={group.step}
                        value={selectedValues?.min ?? group.min}
                        onChange={(e) =>
                          handleRangeChange(
                            group.id,
                            "min",
                            Math.min(parseFloat(e.target.value), selectedValues?.max ?? group.max!)
                          )
                        }
                        className="range-thumb absolute w-full appearance-none bg-transparent"
                        style={{
                          zIndex:
                            (selectedValues?.min ?? group.min!) >
                            group.min! + (group.max! - group.min!) * 0.85
                              ? 5
                              : 3,
                        }}
                      />
                      <input
                        type="range"
                        min={group.min}
                        max={group.max}
                        step={group.step}
                        value={selectedValues?.max ?? group.max}
                        onChange={(e) =>
                          handleRangeChange(
                            group.id,
                            "max",
                            Math.max(parseFloat(e.target.value), selectedValues?.min ?? group.min!)
                          )
                        }
                        className="range-thumb absolute w-full appearance-none bg-transparent"
                        style={{ zIndex: 4 }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-[#6d4a6b]/50 font-medium mb-3">
                      <span>
                        {group.min}
                        {getUnit(group.label)}
                      </span>
                      <span>
                        {group.max}
                        {getUnit(group.label)}
                      </span>
                    </div>

                    {/* Quick presets — one-tap common ranges */}
                    {group.presets && group.presets.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {group.presets.map((p) => {
                          const active =
                            (selectedValues?.min ?? group.min) === p.min &&
                            (selectedValues?.max ?? group.max) === p.max;
                          return (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() =>
                                onFilterChange(group.id, { min: p.min, max: p.max })
                              }
                              className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                                active
                                  ? "border-[#6C2BD9] bg-gradient-to-r from-[#6C2BD9] to-[#E9407A] text-white shadow-sm shadow-[#6C2BD9]/25"
                                  : "border-[rgba(108,43,217,0.12)] text-[#6d4a6b] hover:border-[#6C2BD9] hover:text-[#6C2BD9] hover:bg-[#f5f0ff]"
                              }`}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <style jsx>{`
                      .range-thumb {
                        height: 20px;
                        margin: 0;
                        pointer-events: none;
                      }
                      .range-thumb::-webkit-slider-runnable-track {
                        -webkit-appearance: none;
                        background: transparent;
                      }
                      .range-thumb::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        pointer-events: auto;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #6C2BD9;
                        box-shadow: 0 2px 8px rgba(108, 43, 217, 0.35);
                        cursor: pointer;
                        transition: transform 0.15s ease;
                      }
                      .range-thumb::-webkit-slider-thumb:hover,
                      .range-thumb:active::-webkit-slider-thumb {
                        transform: scale(1.15);
                      }
                      .range-thumb::-moz-range-track {
                        background: transparent;
                      }
                      .range-thumb::-moz-range-thumb {
                        pointer-events: auto;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #6C2BD9;
                        box-shadow: 0 2px 8px rgba(108, 43, 217, 0.35);
                        cursor: pointer;
                      }
                    `}</style>
                  </div>
                )}

                {group.type === "toggle" &&
                  group.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 text-sm py-2 px-3 rounded-xl hover:bg-[#f5f0ff] cursor-pointer text-[#160c0c] font-['Poppins',sans-serif] transition-all duration-200 group/label"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="appearance-none w-10 h-5 bg-[rgba(108,43,217,0.15)] rounded-full cursor-pointer transition-all duration-300 relative checked:bg-gradient-to-r checked:from-[#6C2BD9] checked:to-[#E9407A] before:content-[''] before:w-3.5 before:h-3.5 before:bg-white before:rounded-full before:absolute before:top-[3px] before:left-[3px] before:transition-all before:duration-300 checked:before:left-[23px] before:shadow-md before:shadow-[rgba(108,43,217,0.15)]"
                        checked={(selectedValues || []).includes(opt)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleChange(group.id, opt, e.target.checked);
                        }}
                      />
                      <span className="group-hover/label:text-[#6C2BD9] transition-colors">
                        {opt}
                      </span>
                    </label>
                  ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Action Buttons - Vibrant Colors */}
      <div className="flex gap-2 ml-auto flex-wrap">
        <button
          type="button"
          className="relative bg-gradient-to-r from-[#6C2BD9] to-[#E9407A] text-white px-5 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:from-[#7a35e0] hover:to-[#f04a7e] hover:shadow-[0_8px_24px_rgba(108,43,217,0.30)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer font-['Poppins',sans-serif]"
          onClick={() => {
            onApply();
            closeAllDropdowns();
          }}
        >
          <i className="fas fa-check text-[10px]" /> Apply
          {filterCount > 0 && (
            <span className="flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-white text-[#6C2BD9] text-[0.6rem] font-bold leading-none">
              {filterCount}
            </span>
          )}
        </button>
        <button
          type="button"
          className="border border-[rgba(108,43,217,0.15)] bg-white text-[#160c0c] px-5 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-[#f5f0ff] hover:border-[#6C2BD9]/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer font-['Poppins',sans-serif] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          onClick={onReset}
          disabled={filterCount === 0}
        >
          <i className="fas fa-undo-alt text-[10px]" /> Reset
        </button>
      </div>
    </div>
  );
}