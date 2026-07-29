// components/compare/SpecCategory.tsx
"use client";

interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  year: number;
  rating: number;
  isFlagship: boolean;
  image: string;
  specs: Record<string, any>;
  benchmarks?: Record<string, any>;
}

interface SpecCategoryProps {
  category: string;
  phones: Phone[];
  specFieldsMap: Record<string, { label: string; icon: string; category: string }>;
  categoryLabels: Record<string, string>;
}

// Category color palette - colorful headings, white background
const CATEGORY_STYLES: Record<string, { 
  icon: string; 
  border: string; 
  headerBg: string;
  accent: string;
  label: string;
  dot: string;
}> = {
  display: {
    icon: "text-blue-600",
    border: "border-blue-100",
    headerBg: "bg-blue-50/80",
    accent: "bg-blue-50",
    label: "text-blue-700",
    dot: "bg-blue-500"
  },
  performance: {
    icon: "text-purple-600",
    border: "border-purple-100",
    headerBg: "bg-purple-50/80",
    accent: "bg-purple-50",
    label: "text-purple-700",
    dot: "bg-purple-500"
  },
  benchmarks: {
    icon: "text-violet-600",
    border: "border-violet-100",
    headerBg: "bg-violet-50/80",
    accent: "bg-violet-50",
    label: "text-violet-700",
    dot: "bg-violet-500"
  },
  camera: {
    icon: "text-rose-600",
    border: "border-rose-100",
    headerBg: "bg-rose-50/80",
    accent: "bg-rose-50",
    label: "text-rose-700",
    dot: "bg-rose-500"
  },
  battery: {
    icon: "text-emerald-600",
    border: "border-emerald-100",
    headerBg: "bg-emerald-50/80",
    accent: "bg-emerald-50",
    label: "text-emerald-700",
    dot: "bg-emerald-500"
  },
  design: {
    icon: "text-amber-600",
    border: "border-amber-100",
    headerBg: "bg-amber-50/80",
    accent: "bg-amber-50",
    label: "text-amber-700",
    dot: "bg-amber-500"
  },
  software: {
    icon: "text-cyan-600",
    border: "border-cyan-100",
    headerBg: "bg-cyan-50/80",
    accent: "bg-cyan-50",
    label: "text-cyan-700",
    dot: "bg-cyan-500"
  },
  connectivity: {
    icon: "text-sky-600",
    border: "border-sky-100",
    headerBg: "bg-sky-50/80",
    accent: "bg-sky-50",
    label: "text-sky-700",
    dot: "bg-sky-500"
  },
  security: {
    icon: "text-red-600",
    border: "border-red-100",
    headerBg: "bg-red-50/80",
    accent: "bg-red-50",
    label: "text-red-700",
    dot: "bg-red-500"
  },
  pricing: {
    icon: "text-emerald-600",
    border: "border-emerald-100",
    headerBg: "bg-emerald-50/80",
    accent: "bg-emerald-50",
    label: "text-emerald-700",
    dot: "bg-emerald-500"
  }
};

const getNestedValue = (obj: any, path: string): any => {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return 'N/A';
    current = current[part];
  }
  return current !== undefined && current !== null ? current : 'N/A';
};

const formatValue = (value: any): string => {
  if (value === null || value === undefined) return 'N/A';
  if (Array.isArray(value)) {
    const filtered = value.filter(v => v && v !== '');
    return filtered.length > 0 ? filtered.join(', ') : 'N/A';
  }
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || 'N/A';
  }
  return String(value);
};

const extractNumeric = (value: any): number | null => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }
  return null;
};

export function SpecCategory({ 
  category, 
  phones, 
  specFieldsMap, 
  categoryLabels 
}: SpecCategoryProps) {
  const fields = Object.entries(specFieldsMap)
    .filter(([_, info]) => info.category === category)
    .map(([key, info]) => ({ key, ...info }));
  
  if (fields.length === 0) return null;

  const hasData = phones.some(phone => 
    fields.some(({ key }) => {
      const val = getNestedValue(phone, key);
      return val && val !== 'N/A' && val !== '';
    })
  );
  if (!hasData) return null;

  const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES.display;
  const phoneCount = phones.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Category Header - Colorful background with white text */}
      <div className={`${styles.headerBg} flex items-center gap-3 px-5 py-3.5 border-b ${styles.border}`}>
        <div className={`w-1.5 h-6 rounded-full ${styles.dot} flex-shrink-0`} />
        <span className={`text-base ${styles.icon}`}>
          <i className={`fas ${fields[0]?.icon || 'fa-circle'}`} />
        </span>
        <h3 className={`text-sm font-semibold ${styles.label} font-['Poppins',sans-serif] tracking-tight`}>
          {categoryLabels[category] || category}
        </h3>
        <span className={`text-[10px] font-medium ${styles.label}/60 bg-white/60 px-2 py-0.5 rounded-full border ${styles.border}`}>
          {fields.length}
        </span>
      </div>

      {/* Spec Rows - Clean white background */}
      <div className="px-4 py-1 bg-white">
        {fields.map(({ key, label, icon }) => {
          const values = phones.map(phone => {
            const raw = getNestedValue(phone, key);
            return formatValue(raw);
          });

          const numerics = phones.map(p => extractNumeric(getNestedValue(p, key)));
          const hasNumeric = numerics.some(n => n !== null);
          let bestIdx = -1;
          if (hasNumeric) {
            const max = Math.max(...numerics.filter(n => n !== null) as number[]);
            bestIdx = numerics.indexOf(max);
          }

          const allSame = values.every(v => v === values[0]);

          return (
            <div
              key={key}
              className="grid py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-150 rounded-lg -mx-1 px-1"
              style={{ gridTemplateColumns: `140px repeat(${phoneCount}, 1fr)` }}
            >
              {/* Label - Colorful icon */}
              <div className="flex items-center gap-2.5 text-xs font-medium text-gray-500 pr-3">
                <i className={`fas ${icon} ${styles.icon} text-xs w-4 text-center`} />
                <span className="truncate">{label}</span>
              </div>

              {/* Values */}
              {values.map((val, idx) => {
                const isBest = bestIdx === idx && bestIdx >= 0 && val !== 'N/A' && !allSame;
                
                return (
                  <div
                    key={idx}
                    className={`text-xs text-center px-1 py-0.5 rounded transition-all duration-200 ${
                      isBest 
                        ? `${styles.accent} ${styles.label} font-semibold` 
                        : val === 'N/A' 
                          ? 'text-gray-300' 
                          : 'text-gray-600'
                    }`}
                  >
                    {isBest && (
                      <span className="inline-block mr-1 text-[10px]">✦</span>
                    )}
                    {val}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}