// app/technology/TechnologyClient.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { trackPageView, trackEvent } from "@/lib/analytics";

// ─── INTERFACES ─────────────────────────────────────────
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  isActive: boolean;
  order: number;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  categorySlug: string;
  subCategorySlug: string;
  author: string;
  authorRole: string;
  difficulty: string;
  readTime: number;
  steps: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt: string;
  views: number;
  likes: number;
}

// ─── HELPERS ─────────────────────────────────────────────
function formatDate(date: string): string {
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

// ─── CATEGORY CONFIG ─────────────────────────────────────
const categoryConfig: Record<string, { icon: string; color: string; gradient: string }> = {
  ai: {
    icon: "🤖",
    color: "#6C3CE1",
    gradient: "from-[#4A1FA0] via-[#6C3CE1] to-[#4A1FA0]"
  },
  "generative-ai": {
    icon: "✨",
    color: "#F59E0B",
    gradient: "from-[#D97706] via-[#F59E0B] to-[#D97706]"
  },
  "quantum-computing": {
    icon: "⚛️",
    color: "#06B6D4",
    gradient: "from-[#0891B2] via-[#06B6D4] to-[#0891B2]"
  },
  "ar-vr": {
    icon: "🥽",
    color: "#EC4899",
    gradient: "from-[#BE185D] via-[#EC4899] to-[#BE185D]"
  },
  "green-tech": {
    icon: "🌱",
    color: "#22C55E",
    gradient: "from-[#16A34A] via-[#22C55E] to-[#16A34A]"
  },
  cybersecurity: {
    icon: "🔒",
    color: "#EF4444",
    gradient: "from-[#DC2626] via-[#EF4444] to-[#DC2626]"
  },
  "space-tech": {
    icon: "🚀",
    color: "#8B5CF6",
    gradient: "from-[#7C3AED] via-[#8B5CF6] to-[#7C3AED]"
  },
  biotech: {
    icon: "🧬",
    color: "#14B8A6",
    gradient: "from-[#0D9488] via-[#14B8A6] to-[#0D9488]"
  },
};

// ─── LAZY LOAD IMAGE COMPONENT ─────────────────────────
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#e8f0ec]">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#e8f0ec] via-[#f0f5f3] to-[#e8f0ec]" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        } ${className || ""}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        decoding="async"
      />
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────
export function TechnologyClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // ─── TRACK PAGE VIEW ──────────────────────────────────
  useEffect(() => {
    trackPageView("/technology", "Technology Hub");
  }, []);

  // ─── FETCH DATA FROM API ──────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [categoriesRes, articlesRes] = await Promise.all([
          fetch('/api/technology/categories?activeOnly=true'),
          fetch('/api/technology/articles?isPublished=true&limit=50')
        ]);
        
        const categoriesData = await categoriesRes.json();
        const articlesData = await articlesRes.json();
        
        if (categoriesData.success) {
          setCategories(categoriesData.data || []);
        } else {
          setError(categoriesData.error || 'Failed to fetch categories');
        }
        
        if (articlesData.success) {
          setArticles(articlesData.data || []);
        } else {
          setError(articlesData.error || 'Failed to fetch articles');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ─── FILTERED ARTICLES ──────────────────────────────
  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter(a => a.categorySlug === activeCategory);
  }, [articles, activeCategory]);

  // ─── GET LATEST GUIDES ──────────────────────────────
  const latestGuides = useMemo(() => {
    return [...filteredArticles]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 9);
  }, [filteredArticles]);

  const getCategoryIcon = (slug: string): string => categoryConfig[slug]?.icon || "📖";
  const getCategoryColor = (slug: string): string => categoryConfig[slug]?.color || "#6C3CE1";
  const getCategoryGradient = (slug: string): string => categoryConfig[slug]?.gradient || "from-[#6C3CE1] to-[#4A1FA0]";

  // ─── HANDLE CATEGORY CLICK ──────────────────────────
  const handleCategoryClick = useCallback((slug: string) => {
    setActiveCategory(slug);
    trackEvent("category_filter", { category: slug });
  }, []);

  // ─── HANDLE ARTICLE CLICK ──────────────────────────
  const handleArticleClick = useCallback((article: Article) => {
    trackEvent("article_click", {
      title: article.title,
      category: article.categorySlug,
      slug: article.slug
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef4f2]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#033742] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#5a6f6a]">Loading technology guides...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#eef4f2]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
            <span className="text-4xl block mb-4">⚠️</span>
            <h3 className="text-xl font-bold text-[#2c3e3a] mb-2">Something went wrong</h3>
            <p className="text-[#5a6f6a]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#033742] text-white rounded-full hover:bg-[#011d24] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeCategories = categories.filter(cat => cat.isActive !== false);

  return (
    <div className="min-h-screen bg-[#eef4f2]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[0.8rem] mb-6 flex-wrap mt-5" aria-label="Breadcrumb">
          <Link href="/" className="text-[#5a7a6a] hover:text-[#011d24] transition-colors duration-200">
            Home
          </Link>
          <span className="text-[#c5d8d2] select-none" aria-hidden="true">/</span>
          <span className="text-[#011d24] font-semibold" aria-current="page">Technology</span>
        </nav>

        {/* ─── HERO SECTION ────────────────────────────── */}
        <section className="relative rounded-[24px] overflow-hidden mb-10 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#011e21] via-[#033742] via-[#044a5a] to-[#011e21]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#3a8b9a]/15 to-transparent animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#3a8b9a]/8 to-transparent animate-shimmer-reverse" />
          
          <div className="absolute -top-[40%] -right-[20%] w-[60%] h-[80%] rounded-full bg-[#3a8b9a]/8 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-[#033742]/15 blur-[100px] pointer-events-none" />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,139,154,0.06)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(58,139,154,0.04)_0%,_transparent_50%)]" />
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/30 to-transparent" />
            <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/20 to-transparent" />
            <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3a8b9a]/30 to-transparent" />
          </div>
          
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">💡</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold backdrop-blur-sm border border-white/10">
                  Technology Hub
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#3a8b9a] text-white px-4 py-1.5 rounded-full font-semibold shadow-[0_0_30px_rgba(58,139,154,0.35)]">
                  🔥 {articles.filter(g => g.isTrending).length} Trending
                </span>
              </div>
              
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Explore the Future of <em className="italic not-italic text-[#3a8b9a]">Technology</em>
              </h1>
              
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Your ultimate destination for tech news, in-depth reviews, smart buying guides, and expert insights. Stay ahead of the curve with 7pexel.
              </p>
            </div>
          </div>
        </section>


{/* ─── CATEGORIES GRID ──────────────────────────── */}
<section className="mb-12" aria-label="Technology Categories">
  <div className="flex justify-between items-center mb-5">
    <h2 className="font-fraunces text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.02em] text-[#011d24]">
      Browse by <span className="text-[#033742] underline decoration-[#3a8b9a]/30 underline-offset-4">Category</span>
    </h2>
  </div>

  {activeCategories.length === 0 ? (
    <div className="text-center py-12 bg-white rounded-xl border border-[#d8e2df]">
      <p className="text-[#5a6f6a]">No categories available.</p>
    </div>
  ) : (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {/* All Categories - navigates to technology home */}
      <Link
        href="/technology"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[0.85rem] font-medium ${
          activeCategory === "all"
            ? "bg-[#033742] text-white border-[#033742] shadow-md"
            : "bg-white text-[#2c3e3a] border-[#d8e2df] hover:border-[#033742] hover:shadow-md hover:text-[#033742]"
        }`}
      >
        <span className="font-fraunces font-medium">All Categories</span>
        <span className={`text-xs ${activeCategory === "all" ? "text-white/70" : "text-[#7a8f8a]"}`}>
          ({articles.length})
        </span>
      </Link>

      {/* Individual Categories - navigate to category page */}
      {activeCategories.map((cat) => (
        <Link
          key={cat._id}
          href={`/technology/category/${cat.slug}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[0.85rem] font-medium ${
            activeCategory === cat.slug
              ? "bg-[#033742] text-white border-[#033742] shadow-md"
              : "bg-white text-[#2c3e3a] border-[#d8e2df] hover:border-[#033742] hover:shadow-md hover:text-[#033742]"
          }`}
        >
          <span className="text-[1.1rem] group-hover:scale-110 transition-transform duration-300">
            {getCategoryIcon(cat.slug)}
          </span>
          <span className="font-fraunces font-medium capitalize">
            {cat.name}
          </span>
          <span className={`text-xs ${activeCategory === cat.slug ? "text-white/70" : "text-[#7a8f8a]"}`}>
            ({articles.filter(a => a.categorySlug === cat.slug).length})
          </span>
        </Link>
      ))}
    </div>
  )}
</section>

        {/* ─── LATEST ARTICLES ──────────────────────────── */}
        <section className="mb-12" aria-label="Latest Technology Articles">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📰</span>
            <h2 className="font-fraunces font-medium text-[1.8rem] tracking-[-0.02em] text-[#011d24]">
              Latest <span className="text-[#033742]">Articles</span>
            </h2>
            <span className="text-[0.7rem] font-jetbrains-mono bg-[#033742]/10 text-[#033742] px-3 py-1 rounded-full font-semibold">
              {latestGuides.length} Posts
            </span>
          </div>

          {latestGuides.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-[#d8e2df]">
              <p className="text-[#5a6f6a]">No articles available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestGuides.map((guide, index) => (
                <Link
                  key={guide._id}
                  href={`/technology/${guide.slug}`}
                  onClick={() => handleArticleClick(guide)}
                  className="group bg-white rounded-[7px] overflow-hidden border border-[#c5d8d2] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(1,29,36,0.12)] hover:border-[#033742]"
                  prefetch={index < 3}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#e8f0ec]">
                    <LazyImage
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                      <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-[#011d24] text-white font-bold uppercase tracking-[0.05em]">
                        {getCategoryName(guide.categorySlug)}
                      </span>
                      {guide.isTrending && (
                        <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-rose-500 text-white font-bold uppercase tracking-[0.05em]">
                          🔥 Trending
                        </span>
                      )}
                      {guide.isFeatured && (
                        <span className="text-[0.55rem] px-2.5 py-1 rounded-full bg-[#3a8b9a] text-white font-bold uppercase tracking-[0.05em]">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                      <span className="text-[0.5rem] px-2 py-1 rounded-full bg-black/70 text-white font-bold font-jetbrains-mono backdrop-blur-sm">
                        ⏱️ {guide.readTime} min
                      </span>
                      {guide.difficulty && (
                        <span className={`text-[0.5rem] px-2 py-1 rounded-full text-white font-bold font-jetbrains-mono backdrop-blur-sm ${
                          guide.difficulty === "Beginner" ? "bg-emerald-600/80" :
                          guide.difficulty === "Intermediate" ? "bg-amber-600/80" :
                          "bg-rose-600/80"
                        }`}>
                          {guide.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.6rem] font-medium text-[#4a6a5a]">{getCategoryName(guide.categorySlug)}</span>
                      <span className="w-1 h-1 rounded-full bg-[#c5d8d2]" />
                      <span className="text-[0.6rem] text-[#4a6a5a]">{formatDate(guide.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-[#c5d8d2]" />
                      <span className="text-[0.6rem] text-[#4a6a5a]">👁️ {guide.views || 0}</span>
                    </div>
                    
                    <h3 className="font-fraunces font-medium text-[1.05rem] leading-[1.3] group-hover:text-[#033742] transition-colors line-clamp-2 text-[#011d24]">
                      {guide.title}
                    </h3>
                    
                    <p className="text-[0.85rem] text-[#5a6f6a] mt-2 line-clamp-2">
                      {guide.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {guide.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.5rem] px-2 py-0.5 bg-[#eef4f2] text-[#4a6a5a] rounded-full font-medium"
                        >
                          #{tag.toLowerCase().replace(/\s/g, '-')}
                        </span>
                      ))}
                      {guide.tags?.length > 3 && (
                        <span className="text-[0.5rem] text-[#7a8f8a]">+{guide.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ─── NEWSLETTER ────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#011d24] to-[#033742] rounded-[20px] p-10 md:p-12 my-6 text-white relative overflow-hidden">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#3a8b9a]/8 -top-[80px] -right-[60px] pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#3a8b9a]/5 -bottom-[60px] -left-[40px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,139,154,0.06)_0%,_transparent_60%)]" />
          
          <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
            <div className="flex-1 min-w-[200px]">
              <span className="inline-block font-jetbrains-mono text-[0.6rem] tracking-[0.08em] uppercase bg-white/15 px-3 py-0.75 rounded-full font-semibold mb-2.5 border border-white/10">
                📬 Stay ahead
              </span>
              <h3 className="font-fraunces font-medium text-[1.6rem] leading-[1.3] mb-1">Subscribe to the 7pexel weekly</h3>
              <p className="text-[0.9rem] opacity-80 leading-[1.6] max-w-[440px]">
                Get the week's top tech stories, hands-on reviews and industry insights — delivered fresh every Monday.
              </p>
            </div>
            <form
              className="flex gap-2.5 flex-wrap relative z-10 flex-shrink-0"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
                const success = e.currentTarget.querySelector(".success-message") as HTMLDivElement;
                if (input && input.value.trim() && input.value.includes("@")) {
                  trackEvent("newsletter_subscribe", { email: input.value });
                  btn.style.display = "none";
                  input.style.display = "none";
                  if (success) success.classList.add("show", "flex");
                } else {
                  alert("Please enter a valid email address");
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3.5 rounded-full border-none font-poppins text-[0.9rem] bg-white/92 text-[#011d24] outline-none min-w-[240px] transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(58,139,154,0.3)]"
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#3a8b9a] text-white font-bold text-[0.9rem] transition-all duration-200 whitespace-nowrap flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(58,139,154,0.4)]"
              >
                Subscribe
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <div className="success-message hidden font-semibold text-[1rem] items-center gap-2.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You're subscribed! 🎉
              </div>
            </form>
          </div>
        </section>

        {/* ─── BACK TO TOP ────────────────────────────────── */}
        <div className="py-4 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#4a6a5a] hover:text-[#011d24] transition-colors"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </button>
        </div>
      </main>
    </div>
  );
}