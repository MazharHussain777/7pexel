// components/technology/CategoryHero.tsx
import { TechCategory } from "@/app/technology/data/technology-guides";
import { Icon, categoryIconMap } from "./icons";

interface CategoryHeroProps {
  category: TechCategory;
}

export function CategoryHero({
  category,
}: CategoryHeroProps) {
  const iconName = categoryIconMap[category.id] ?? "grid";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-6 md:pt-10 pb-6 md:pb-10">
        <div
          className="relative rounded-[20px] overflow-hidden text-white"
          style={{ background: `linear-gradient(150deg, #011d24, ${category.color})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 rounded-[20px]`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)] rounded-[20px]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer rounded-[20px]" />

          <div className="relative z-10 px-6 md:px-10 py-8 md:py-12">
            <div className="max-w-[820px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-11 h-11 rounded-[14px] bg-white/12 border border-white/15 backdrop-blur-sm">
                  <Icon name={iconName} size={22} className="text-[#D4F26B]" />
                </span>
                <span className="text-[0.62rem] font-jetbrains-mono uppercase tracking-[0.16em] bg-white/12 px-3.5 py-1.5 rounded-full font-semibold backdrop-blur-sm border border-white/10">
                  {category.name}
                </span>
              </div>

              <h1 className="font-fraunces font-medium text-[clamp(1.9rem,3.6vw,2.9rem)] tracking-[-0.03em] leading-[1.1]">
                {category.name} <em className="italic not-italic text-[#D4F26B]">Insights</em>
              </h1>

              <p className="mt-3 text-white/85 text-[0.92rem] leading-[1.65] max-w-[600px]">
                {category.description}
              </p>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 rounded-[20px]" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="350" r="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}