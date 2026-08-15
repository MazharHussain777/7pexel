// components/technology/GuideCard.tsx
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  categorySlug: string;
  subCategorySlug: string | null;
  author: string;
  difficulty: string;
  readTime: number;
  steps: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  publishedAt: string;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
  };
  subCategoryId?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
}

interface GuideCardProps {
  guide: Article;
  isLarge?: boolean;
  formatDate: (date: string) => string;
  getDifficultyColor: (level: string) => string;
}

export function GuideCard({
  guide,
  isLarge = false,
  formatDate,
  getDifficultyColor,
}: GuideCardProps) {
  if (!guide) {
    return null;
  }

  return (
    <Link
      href={`/technology/${guide.slug}`}
      className={`group bg-white border border-[#d8e2df] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isLarge ? 'lg:col-span-4' : 'lg:col-span-3'
      } col-span-1 rounded-[7px]`}
    >
      {/* Image - 16:9 ratio */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef4f2]">
        <img
          src={guide.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"}
          alt={guide.imageAlt || guide.title || "Article image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {guide.isFeatured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full font-jetbrains-mono">
            Featured
          </span>
        )}
        {guide.isTrending && (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full font-jetbrains-mono">
            Trending
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-fraunces font-medium text-[#2c3e3a] group-hover:text-[#1a7a6a] transition-colors leading-tight ${
          isLarge ? 'text-base' : 'text-sm'
        } line-clamp-2`}>
          {guide.title || "Untitled"}
        </h3>
        
        {/* Date */}
        <div className="flex items-center gap-1.5 mt-2">
          <svg className="w-3 h-3 text-[#7a8f8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] text-[#5a6f6a] font-jetbrains-mono">
            {guide.publishedAt ? formatDate(guide.publishedAt) : "No date"}
          </span>
        </div>

        {/* Tags for larger cards only */}
        {isLarge && guide.tags && guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-[#eef4f2]">
            {guide.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[8px] text-[#5a6f6a] bg-[#eef4f2] px-1.5 py-0.5 rounded-full font-jetbrains-mono">
                #{tag}
              </span>
            ))}
            {guide.tags.length > 2 && (
              <span className="text-[8px] text-[#7a8f8a] font-jetbrains-mono">
                +{guide.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}