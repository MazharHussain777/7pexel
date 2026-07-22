// components/PhoneFilterChips.tsx
"use client";

interface FilterGroup {
  id: string;
  label: string;
  type: "checkboxes" | "range" | "toggle";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface PhoneFilterChipsProps {
  filterGroups: FilterGroup[];
  selected: Record<string, any>;
  onRemoveChip: (filterId: string, value: string) => void;
  onClearAll?: () => void;
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

interface Chip {
  key: string;
  groupLabel: string;
  valueLabel: string;
  onRemove: () => void;
}

export function PhoneFilterChips({
  filterGroups,
  selected,
  onRemoveChip,
  onClearAll,
}: PhoneFilterChipsProps) {
  const chips: Chip[] = [];

  Object.keys(selected).forEach((key) => {
    const val = selected[key];
    const group = filterGroups.find((g) => g.id === key);
    if (!group) return;

    if (Array.isArray(val) && val.length > 0) {
      val.forEach((v: string) => {
        chips.push({
          key: `${key}-${v}`,
          groupLabel: group.label,
          valueLabel: v,
          onRemove: () => onRemoveChip(key, v),
        });
      });
    } else if (val?.min !== undefined && val?.max !== undefined) {
      const unit = getUnit(group.label);
      const isDefault = val.min === group.min && val.max === group.max;
      if (!isDefault) {
        chips.push({
          key: `${key}-range`,
          groupLabel: group.label,
          valueLabel: `${val.min}${unit} – ${val.max}${unit}`,
          onRemove: () => onRemoveChip(key, "range"),
        });
      }
    }
  });

  if (chips.length === 0) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <i className="fas fa-filter text-[0.6rem] text-[#7F011F]/20" />
        <span className="text-xs text-[#6d4a4a]/70 font-['Poppins',sans-serif]">
          No active filters
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 my-2 animate-in fade-in-0 duration-200">
      <span className="text-[0.65rem] font-semibold text-[#7F011F]/50 uppercase tracking-[0.06em] pr-1 font-['Poppins',sans-serif]">
        {chips.length} active
      </span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="group inline-flex items-center gap-1.5 bg-white border border-[rgba(127,1,31,0.12)] hover:border-[#7F011F]/30 rounded-full pl-3 pr-2 py-1 text-xs font-medium text-[#2d1a1a] font-['Poppins',sans-serif] transition-all duration-200 hover:shadow-sm animate-in fade-in-0 zoom-in-95"
        >
          <span className="text-[#7F011F]/60 font-semibold">{chip.groupLabel}:</span>
          <span>{chip.valueLabel}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove ${chip.groupLabel} filter: ${chip.valueLabel}`}
            className="w-4 h-4 rounded-full flex items-center justify-center bg-transparent hover:bg-[#7F011F] transition-colors ml-0.5"
          >
            <i className="fas fa-times text-[8px] text-[#7F011F]/60 group-hover:text-[#7F011F]/60 [button:hover>&]:text-white transition-colors" />
          </button>
        </span>
      ))}

      {chips.length > 1 && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-[#7F011F] hover:text-[#a80a30] px-2 py-1 transition-colors font-['Poppins',sans-serif]"
        >
          Clear all
        </button>
      )}
    </div>
  );
}