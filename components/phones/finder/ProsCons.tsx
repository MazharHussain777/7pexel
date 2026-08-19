// components/phones/finder/ProsCons.tsx
"use client";

interface ProsConsProps {
  pros: string[];
  cons: string[];
  phoneName: string;
}

export function ProsCons({ pros, cons, phoneName }: ProsConsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚖️</span>
        <h2 className="text-base md:text-lg font-bold text-[#4A3520]">
          Pros & Cons
        </h2>
        <span className="text-[0.55rem] bg-[#FFF5EB] text-[#8B7355] px-2 py-0.5 rounded-full font-semibold">
          {pros.length} · {cons.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Pros - Compact */}
        <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-3 border border-green-200">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">✅</span>
            <h3 className="font-bold text-green-700 text-xs uppercase tracking-wide">Pros</h3>
            <span className="text-[0.4rem] bg-green-200 text-green-700 px-1.5 py-0.5 rounded-full font-bold ml-auto">
              {pros.length}
            </span>
          </div>
          <ul className="space-y-1">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-1.5 text-gray-700 py-0.5">
                <span className="text-green-500 font-bold text-xs flex-shrink-0 mt-0.5">+</span>
                <span className="text-[0.7rem] leading-snug">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons - Compact */}
        <div className="bg-gradient-to-br from-red-50 to-red-100/30 rounded-xl p-3 border border-red-200">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">❌</span>
            <h3 className="font-bold text-red-700 text-xs uppercase tracking-wide">Cons</h3>
            <span className="text-[0.4rem] bg-red-200 text-red-700 px-1.5 py-0.5 rounded-full font-bold ml-auto">
              {cons.length}
            </span>
          </div>
          <ul className="space-y-1">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-1.5 text-gray-700 py-0.5">
                <span className="text-red-500 font-bold text-xs flex-shrink-0 mt-0.5">-</span>
                <span className="text-[0.7rem] leading-snug">{con}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Compact Verdict */}
      <div className="mt-2 p-2 bg-gradient-to-r from-[#FFF5EB] to-[#FFE4C4] rounded-lg border border-[#FFE4C4]">
        <div className="flex items-center gap-2">
          <span className="text-sm">💡</span>
          <p className="text-[0.6rem] text-[#8B7355] leading-relaxed">
            <span className="font-semibold text-green-700">{pros.length} Pros</span> · 
            <span className="font-semibold text-red-700"> {cons.length} Cons</span>
            {pros.length > cons.length ? ' ✅ Recommended' : ' ⚠️ Consider alternatives'}
          </p>
        </div>
      </div>

      {/* Pros/Cons Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": phoneName,
            "description": `Pros and cons of ${phoneName}`,
            "review": [
              ...pros.map((pro) => ({
                "@type": "Review",
                "reviewBody": `✅ ${pro}`,
                "author": {
                  "@type": "Person",
                  "name": "7pexel Team"
                }
              })),
              ...cons.map((con) => ({
                "@type": "Review",
                "reviewBody": `❌ ${con}`,
                "author": {
                  "@type": "Person",
                  "name": "7pexel Team"
                }
              }))
            ]
          })
        }}
      />
    </div>
  );
}