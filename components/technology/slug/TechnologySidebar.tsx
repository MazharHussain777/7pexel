// components/technology/slug/TechnologySidebar.tsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

interface Article {
  _id: string;
  title: string;
  slug: string;
  image: string;
  author: string;
  readTime: number;
  categorySlug: string;
  subCategorySlug: string | null;
  subCategoryId?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
}

interface TechnologySidebarProps {
  categorySlug: string;
  publishedAt: string;
  relatedArticles: Article[];
  popularArticles: Article[];
  currentSlug: string;
}

function formatDate(date: string): string {
  if (!date) return 'No date';
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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

export function TechnologySidebar({
  categorySlug,
  publishedAt,
  relatedArticles,
  popularArticles,
  currentSlug,
}: TechnologySidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // ─── GROUP RELATED ARTICLES BY SUBCATEGORY ──────────────
  const groupedBySubcategory = useMemo(() => {
    const groups: Record<string, Article[]> = {};
    
    // Filter out current article
    const filtered = relatedArticles.filter(a => a.slug !== currentSlug);
    
    filtered.forEach(article => {
      // Get subcategory name
      let subName = 'Other';
      if (article.subCategoryId && typeof article.subCategoryId === 'object') {
        subName = article.subCategoryId.name;
      } else if (article.subCategorySlug) {
        subName = article.subCategorySlug.replace(/-/g, ' ');
      }
      
      if (!groups[subName]) {
        groups[subName] = [];
      }
      groups[subName].push(article);
    });
    
    return groups;
  }, [relatedArticles, currentSlug]);

  // ─── GET SUBCATEGORY COUNT ──────────────────────────────
  const subcategoryCount = Object.keys(groupedBySubcategory).length;

  return (
    <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
      {/* ─── QUICK STATS ────────────────────────────────────── */}
      <div className="bg-white border border-[#d8e2df] rounded-[12px] p-5 shadow-sm">
        <h3 className="font-fraunces font-medium text-[1rem] mb-3">📊 Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-[0.85rem]">
            <span className="text-[#4a6a5a]">Category</span>
            <span className="font-semibold">{getCategoryName(categorySlug)}</span>
          </div>
          <div className="flex justify-between text-[0.85rem]">
            <span className="text-[#4a6a5a]">Published</span>
            <span className="font-semibold">{formatDate(publishedAt)}</span>
          </div>
          {subcategoryCount > 0 && (
            <div className="flex justify-between text-[0.85rem]">
              <span className="text-[#4a6a5a]">Subcategories</span>
              <span className="font-semibold">{subcategoryCount}</span>
            </div>
          )}
          {relatedArticles.length > 0 && (
            <div className="flex justify-between text-[0.85rem]">
              <span className="text-[#4a6a5a]">Related Articles</span>
              <span className="font-semibold">{relatedArticles.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── SUBSCRIBE CARD ────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#011d24] to-[#033742] rounded-[16px] p-5 text-white">
        <h4 className="font-fraunces font-medium text-[1.1rem] mb-1.5 text-white">📬 Get the latest</h4>
        <p className="text-[0.82rem] opacity-85 leading-[1.5] mb-3.5">
          Subscribe to our weekly newsletter for expert tech guides.
        </p>
        {subscribed ? (
          <div className="text-center py-2 text-[#D4F26B] font-semibold">
            ✅ Subscribed! Thank you 🎉
          </div>
        ) : (
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-full border-none font-poppins text-[0.8rem] bg-white/92 text-[#011d24] outline-none min-w-0 focus:ring-2 focus:ring-[#D4F26B]"
              required
            />
            <button
              type="submit"
              className="px-4.5 py-2.5 rounded-full bg-white text-[#011d24] font-bold text-[0.78rem] transition-all hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* ─── RELATED ARTICLES BY SUBCATEGORY ────────────── */}
      {relatedArticles.length > 0 && (
        <div className="bg-white border border-[#d8e2df] rounded-[12px] p-5 shadow-sm">
          <h3 className="font-fraunces font-medium text-[1rem] mb-3 flex items-center gap-2">
            📚 Related Guides
            <span className="text-[0.6rem] font-jetbrains-mono bg-[#eef4f2] px-2 py-0.5 rounded-full text-[#4a6a5a]">
              {relatedArticles.length}
            </span>
          </h3>
          
          {/* Show articles grouped by subcategory */}
          {Object.entries(groupedBySubcategory).map(([subName, articles]) => (
            <div key={subName} className="mb-4 last:mb-0">
              <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#033742] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#033742]" />
                {subName}
                <span className="text-[0.5rem] font-jetbrains-mono text-[#4a6a5a] ml-1">
                  ({articles.length})
                </span>
              </h4>
              <div className="space-y-2.5">
                {articles.slice(0, 4).map((g: Article) => (
                  <Link
                    key={g._id}
                    href={`/technology/${g.slug}`}
                    className="flex gap-3 p-2 rounded-[8px] transition-all hover:bg-[#eef4f2] hover:pl-3 group"
                  >
                    <div className="w-[60px] h-[45px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[0.8rem] font-semibold group-hover:text-[#033742] transition-colors line-clamp-2">
                        {g.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[0.55rem] text-[#4a6a5a]">
                        <span>{g.author || "7pexel Team"}</span>
                        <span>·</span>
                        <span>{g.readTime} min</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {articles.length > 4 && (
                <Link
                  href={`/technology/category/${categorySlug}`}
                  className="text-[0.6rem] font-medium text-[#033742] hover:underline mt-1 inline-block"
                >
                  View all {articles.length} articles →
                </Link>
              )}
            </div>
          ))}
          
          {/* If no subcategory grouping, show all related articles */}
          {subcategoryCount === 0 && (
            <div className="space-y-2.5">
              {relatedArticles.slice(0, 4).map((g: Article) => (
                <Link
                  key={g._id}
                  href={`/technology/${g.slug}`}
                  className="flex gap-3 p-2 rounded-[8px] transition-all hover:bg-[#eef4f2] hover:pl-3 group"
                >
                  <div className="w-[60px] h-[45px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[0.8rem] font-semibold group-hover:text-[#033742] transition-colors line-clamp-2">
                      {g.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[0.55rem] text-[#4a6a5a]">
                      <span>{g.author || "7pexel Team"}</span>
                      <span>·</span>
                      <span>{g.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── POPULAR GUIDES ────────────────────────────────── */}
      {popularArticles && popularArticles.length > 0 && (
        <div className="bg-white border border-[#d8e2df] rounded-[12px] p-5 shadow-sm">
          <h3 className="font-fraunces font-medium text-[1rem] mb-3">⭐ Popular Guides</h3>
          <div className="space-y-2">
            {popularArticles.slice(0, 4).map((g: Article) => (
              <Link
                key={g._id}
                href={`/technology/${g.slug}`}
                className="flex items-center gap-2.5 p-2 rounded-[8px] transition-all hover:bg-[#eef4f2] hover:pl-3 group"
              >
                <span className="text-[1.2rem]">{getCategoryIcon(g.categorySlug)}</span>
                <span className="text-[0.82rem] font-medium group-hover:text-[#033742] transition-colors line-clamp-1">
                  {g.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ─── BACK TO TECHNOLOGY ────────────────────────────── */}
      <div className="pt-2">
        <Link
          href="/technology"
          className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#033742] hover:underline"
        >
          ← Back to Technology
        </Link>
      </div>
    </aside>
  );
}