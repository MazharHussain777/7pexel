// components/technology/slug/TechnologyHeader.tsx
import Link from "next/link";
import Image from "next/image";

interface TechnologyHeaderProps {
  title: string;
  excerpt: string;
  categorySlug: string;
  author: string;
  tags: string[];
  image: string;
  imageAlt?: string;
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    ai: "Artificial Intelligence",
    "generative-ai": "Generative AI",
    "quantum-computing": "Quantum Computing",
    "ar-vr": "AR/VR & Metaverse",
    "green-tech": "Green Tech & Sustainability",
    cybersecurity: "Cybersecurity",
    "space-tech": "Space Tech",
    biotech: "Biotech & Health Tech",
  };
  return names[category] || category;
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    ai: "🤖",
    "generative-ai": "✨",
    "quantum-computing": "⚛️",
    "ar-vr": "🥽",
    "green-tech": "🌱",
    cybersecurity: "🔒",
    "space-tech": "🚀",
    biotech: "🧬",
  };
  return icons[category] || "📖";
}

export function TechnologyHeader({
  title,
  excerpt,
  categorySlug,
  author,
  tags,
  image,
  imageAlt,
}: TechnologyHeaderProps) {
  return (
    <>
      {/* ─── TOP SPACING ──────────────────────────────────── */}
      <div className="pt-4 md:pt-6 lg:pt-8" />

      {/* ─── BREADCRUMB ──────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[0.75rem] md:text-[0.8rem] text-[#6a7a6e] mb-6 flex-wrap" aria-label="Breadcrumb">
        <Link 
          href="/" 
          className="hover:text-[#033742] transition-colors duration-200 font-medium"
        >
          Home
        </Link>
        <svg className="w-3 h-3 text-[#b8c9c4] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link 
          href="/technology" 
          className="hover:text-[#033742] transition-colors duration-200 font-medium"
        >
          Technology
        </Link>
        <svg className="w-3 h-3 text-[#b8c9c4] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link 
          href={`/technology/category/${categorySlug}`} 
          className="hover:text-[#033742] transition-colors duration-200 capitalize font-medium"
        >
          {categorySlug.replace(/-/g, ' ')}
        </Link>
        <svg className="w-3 h-3 text-[#b8c9c4] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[#011d24] font-semibold truncate max-w-[180px] md:max-w-[300px]">
          {title}
        </span>
      </nav>

      {/* ─── ARTICLE HEADER ───────────────────────────────── */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[0.65rem] md:text-[0.7rem] px-3 py-1.5 rounded-full bg-[#033742]/10 text-[#033742] font-semibold font-jetbrains-mono uppercase tracking-[0.05em]">
            {getCategoryIcon(categorySlug)} {getCategoryName(categorySlug)}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-fraunces font-medium text-[clamp(1.6rem,3vw,2.6rem)] tracking-[-0.02em] leading-[1.15] text-[#011d24]">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-[0.95rem] md:text-[1.05rem] text-[#4a6a5a] mt-3 leading-[1.7] max-w-[750px]">
          {excerpt}
        </p>

        {/* Meta - Author only (no date) */}
        <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-[#eef4f2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#011d24] to-[#033742] flex items-center justify-center text-white font-semibold text-[0.8rem] flex-shrink-0">
              {author?.charAt(0) || "A"}
            </div>
            <div>
              <div className="text-[0.85rem] font-semibold text-[#011d24]">{author || "7pexel Team"}</div>
            </div>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-2 ml-auto text-[0.7rem] text-[#4a6a5a]">
              <span className="hidden sm:inline">🏷️</span>
              <span className="truncate max-w-[200px] md:max-w-[300px]">
                {tags.slice(0, 3).join(", ")}
                {tags.length > 3 && ` +${tags.length - 3}`}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ─── FEATURED IMAGE ────────────────────────────────── */}
      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#eef1e9] mb-8 shadow-sm">
        <Image
          src={image}
          alt={imageAlt || title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </>
  );
}