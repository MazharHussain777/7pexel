// components/technology/GuidesGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { TechnologyGuide } from "@/app/technology/data/technology-guides";
import { Icon } from "./icons";

interface GuidesGridProps {
  guides: TechnologyGuide[];
  categoryName: string;
  formatDate: (date: string) => string;
  getDifficultyColor: (level: string) => string;
  getCategoryName: (category: string) => string;
}

export function GuidesGrid({
  guides,
  categoryName,
  formatDate,
  getDifficultyColor,
  getCategoryName,
}: GuidesGridProps) {
  return (
    <div className="wrap pt-11 pb-11"> {/* Changed from py-6 to pt-0 pb-6 */}
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-3">
        <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em] text-[#011d24]">
          All <span className="text-[#033742]">{categoryName}</span> Guides
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-jetbrains-mono text-[#4a6a5a]">
          <Icon name="grid" size={13} />
          {guides.length} guides
        </span>
      </div>

      {guides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/technology/${guide.slug}`}
              className="group border border-[#c5d8d2] rounded-[16px] overflow-hidden bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(1,29,36,0.12)] hover:border-[#033742]"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef4f2]">
                <Image
                  src={guide.image}
                  alt={guide.imageAlt || guide.title}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10 flex-wrap">
                  {guide.isTrending && (
                    <span className="inline-flex items-center gap-1 text-[0.55rem] pl-2 pr-2.5 py-1 rounded-full bg-rose-500 text-white font-bold uppercase tracking-[0.05em]">
                      <Icon name="flame" size={10} />
                      Trending
                    </span>
                  )}
                  {guide.isFeatured && (
                    <span className="inline-flex items-center gap-1 text-[0.55rem] pl-2 pr-2.5 py-1 rounded-full bg-[#D4F26B] text-[#011d24] font-bold uppercase tracking-[0.05em]">
                      <Icon name="star" size={10} />
                      Featured
                    </span>
                  )}
                </div>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[0.55rem] pl-2 pr-2.5 py-1 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono backdrop-blur-sm">
                  <Icon name="clock" size={10} />
                  {guide.readTime}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#033742]">
                    {getCategoryName(guide.category)}
                  </span>
                  <span className="w-px h-3 bg-[#c5d8d2]" />
                  <span className={`text-[0.52rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                    {guide.level}
                  </span>
                </div>
                <h4 className="font-fraunces font-medium text-[0.98rem] leading-[1.35] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                  {guide.title}
                </h4>
                <div className="flex items-center gap-2.5 mt-3.5 pt-3 border-t border-dashed border-[#c5d8d2] text-[0.62rem] text-[#4a6a5a] flex-wrap">
                  <span className="font-semibold text-[#011d24]">{guide.author}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c5d8d2]" />
                  <span>{formatDate(guide.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c5d8d2]" />
                  <span className="inline-flex items-center gap-1">
                    <Icon name="list-checks" size={11} />
                    {guide.steps} steps
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-[20px] border border-[#c5d8d2]">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#eef4f2] text-[#033742]">
            <Icon name="file-search" size={26} />
          </span>
          <h3 className="mt-4 text-xl font-medium text-[#011d24]">No guides yet</h3>
          <p className="text-[0.95rem] text-[#4a6a5a] mt-1.5">
            Check back soon for {categoryName} guides.
          </p>
          <Link
            href="/technology"
            className="inline-block mt-5 px-6 py-2.5 rounded-full bg-[#011d24] text-white font-semibold text-[0.85rem] transition-all hover:bg-[#033742] hover:shadow-[0_4px_16px_rgba(1,29,36,0.3)]"
          >
            View all technology
          </Link>
        </div>
      )}
    </div>
  );
}