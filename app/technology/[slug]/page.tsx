// app/technology/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { technologyGuidesData } from "../data/technology-guides";

// ─── HELPERS ─────────────────────────────────────────────
function getTechnologyGuide(slug: string) {
  return technologyGuidesData[slug] || null;
}

function getRelatedTechnologyGuides(slug: string, limit: number = 4) {
  const current = getTechnologyGuide(slug);
  if (!current) return [];
  return Object.values(technologyGuidesData)
    .filter(g => g.slug !== slug && g.category === current.category)
    .slice(0, limit);
}

function getPopularTechnologyGuides(limit: number = 4) {
  return Object.values(technologyGuidesData)
    .filter(g => g.isFeatured)
    .slice(0, limit);
}

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getDifficultyColor(level: string): string {
  const colors: Record<string, string> = {
    Beginner: "bg-green-500/10 text-green-600 border-green-200",
    Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    Advanced: "bg-red-500/10 text-red-600 border-red-200",
  };
  return colors[level] || "bg-gray-500/10 text-gray-600 border-gray-200";
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
    "autonomous-vehicles": "Autonomous Vehicles",
    "edge-computing": "Edge Computing & IoT",
    neurotechnology: "Neurotechnology",
    smartphones: "Smartphones",
    laptops: "Laptops & Computers",
    "smart-home": "Smart Home",
    wearables: "Wearables",
    audio: "Audio",
    gaming: "Gaming",
    cameras: "Cameras",
    accessories: "Accessories",
    tablets: "Tablets",
    displays: "Monitors & Displays",
    technology: "Technology",
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
    "autonomous-vehicles": "🚗",
    "edge-computing": "💻",
    neurotechnology: "🧠",
    smartphones: "📱",
    laptops: "💻",
    "smart-home": "🏠",
    wearables: "⌚",
    audio: "🎧",
    gaming: "🎮",
    cameras: "📸",
    accessories: "🔌",
    tablets: "📋",
    displays: "🖥️",
    technology: "💡",
  };
  return icons[category] || "📖";
}

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  return Object.keys(technologyGuidesData).map((slug) => ({
    slug,
  }));
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTechnologyGuide(slug);

  if (!guide) {
    return {
      title: "Guide Not Found | 7pexel Technology",
      description: "The technology guide you're looking for doesn't exist.",
    };
  }

  return {
    title: `${guide.title} | 7pexel Technology Guides`,
    description: guide.excerpt,
    keywords: guide.tags.join(", "),
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [{ url: guide.image, alt: guide.title }],
      type: "article",
    },
  };
}

// ─── BASE STYLES ─────────────────────────────────────────
const baseStyles = `
  .guide-content p {
    font-size: 1.05rem;
    line-height: 1.85;
    margin-bottom: 1.2rem;
    color: #222c1e;
  }
  .guide-content h2 {
    font-family: 'Fraunces', serif;
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #0A3F26;
  }
  .guide-content h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
    color: #0A3F26;
  }
  .guide-content h4 {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1.2rem;
    margin-bottom: 0.6rem;
    color: #0A3F26;
  }
  .guide-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: 12px;
    overflow: hidden;
  }
  .guide-content table thead th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 600;
    background: #0A3F26;
    color: white;
  }
  .guide-content table tbody td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(15,24,15,0.09);
    font-size: 0.9rem;
  }
  .guide-content table tbody tr:hover {
    background: #FBFDFB;
  }
  .guide-content .step-card {
    background: white;
    border: 1px solid rgba(15,24,15,0.09);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
  .guide-content .step-card h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #0A3F26;
    margin-bottom: 0.5rem;
  }
  .guide-content .step-card p {
    font-size: 0.95rem;
    margin-bottom: 0;
  }
  .guide-content .step-card ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
  }
  .guide-content .step-card ul li {
    padding: 0.25rem 0;
    font-size: 0.9rem;
  }
  .guide-content .tip-box {
    border-left: 3px solid #0F6B3E;
    background: #e8f5e9;
    padding: 0.75rem 1rem;
    border-radius: 0 8px 8px 0;
    margin-top: 0.75rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .guide-content .tip-box .tip-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .guide-content .key-takeaways {
    background: linear-gradient(135deg, #f0f7f3, #e3efe8);
    border-radius: 12px;
    padding: 1.25rem;
    margin: 1.5rem 0;
  }
  .guide-content .key-takeaways h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #0A3F26;
  }
  .guide-content .key-takeaways ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .guide-content .key-takeaways ul li {
    padding: 0.3rem 0;
    font-size: 0.95rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .guide-content .key-takeaways ul li::before {
    content: "✓";
    color: #0F6B3E;
    font-weight: 700;
  }
  .guide-content .conclusion-box {
    background: #0A3F26;
    border-radius: 12px;
    padding: 1.25rem;
    margin: 1.5rem 0;
    color: white;
  }
  .guide-content .conclusion-box h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #D4F26B;
  }
  .guide-content .conclusion-box p {
    font-size: 0.95rem;
    margin: 0;
    color: #ddd;
  }
  .guide-content .overflow-x-auto {
    overflow-x: auto;
  }
  .guide-content .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .guide-content .pros-box {
    background: #e8f5e9;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid #1FA25A;
  }
  .guide-content .pros-box h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #0A3F26;
  }
  .guide-content .pros-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .guide-content .pros-box ul li {
    padding: 0.3rem 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .guide-content .pros-box ul li::before {
    content: "✅";
  }
  .guide-content .cons-box {
    background: #fce4ec;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid #e53935;
  }
  .guide-content .cons-box h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #c62828;
  }
  .guide-content .cons-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .guide-content .cons-box ul li {
    padding: 0.3rem 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .guide-content .cons-box ul li::before {
    content: "❌";
  }
  .guide-content .rating-badge {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 100px;
    font-weight: 700;
    font-size: 0.8rem;
  }
  .guide-content .rating-badge.gold {
    background: #FFD700;
    color: #1a1a1a;
  }
  .guide-content .rating-badge.silver {
    background: #C0C0C0;
    color: #1a1a1a;
  }
  .guide-content .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5rem 0 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(15,24,15,0.09);
  }
  .guide-content .tag {
    padding: 0.3rem 0.8rem;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 1px solid rgba(15,24,15,0.09);
    background: #f5f7f6;
    color: #0A3F26;
  }
  .guide-content .tag:hover {
    background: #0F6B3E;
    color: white;
    border-color: #0F6B3E;
    cursor: pointer;
  }
  .guide-content .faq-item {
    background: white;
    border: 1px solid rgba(15,24,15,0.09);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 0.75rem;
  }
  .guide-content .faq-item:last-child {
    margin-bottom: 0;
  }
  .guide-content .faq-item h4 {
    font-family: 'Fraunces', serif;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #0A3F26;
  }
  .guide-content .faq-item h4::before {
    content: "❓";
    font-size: 0.9rem;
  }
  .guide-content .faq-item p {
    font-size: 0.9rem;
    color: #455040;
    margin: 0;
    padding-left: 1.6rem;
  }

  @media (max-width: 768px) {
    .guide-content .pros-cons-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function TechnologyGuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getTechnologyGuide(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedTechnologyGuides(slug);
  const popularGuides = getPopularTechnologyGuides(4);

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/technology" className="hover:text-[var(--color-green)] transition-colors">
            Technology
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold truncate max-w-[200px]">{guide.title}</span>
        </div>

        {/* ─── TWO-COLUMN LAYOUT ──────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ─── LEFT COLUMN: CONTENT ────────────────────── */}
          <div className="flex-1 min-w-0">
            <article>
              {/* Header */}
              <header className="mb-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[0.7rem] px-3 py-1 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] font-semibold font-jetbrains-mono uppercase tracking-[0.05em]">
                    {getCategoryIcon(guide.category)} {getCategoryName(guide.category)}
                  </span>
                  <span className={`text-[0.65rem] px-3 py-1 rounded-full font-semibold font-jetbrains-mono uppercase tracking-[0.05em] border ${getDifficultyColor(guide.level)}`}>
                    {guide.level}
                  </span>
                  <span className="text-[0.65rem] text-[var(--color-ink-soft)] font-jetbrains-mono">⏱️ {guide.readTime}</span>
                  {guide.isTrending && (
                    <span className="text-[0.65rem] px-3 py-1 rounded-full bg-red-500/10 text-red-500 font-semibold font-jetbrains-mono uppercase tracking-[0.05em] border border-red-500/20">
                      🔥 Trending
                    </span>
                  )}
                </div>
                <h1 className="font-fraunces font-medium text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.02em] leading-[1.1]">
                  {guide.title}
                </h1>
                <p className="text-[1.05rem] text-[var(--color-ink-soft)] mt-3 leading-[1.6]">{guide.excerpt}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[var(--color-line)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green-bright)] flex items-center justify-center text-white font-semibold text-[0.8rem]">
                      {guide.authorAvatar}
                    </div>
                    <div>
                      <div className="text-[0.8rem] font-semibold">{guide.author}</div>
                      <div className="text-[0.7rem] text-[var(--color-ink-soft)]">{formatDate(guide.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto text-[0.7rem] text-[var(--color-ink-soft)]">
                    <span>📋 {guide.steps} steps</span>
                    <span>🏷️ {guide.tags.slice(0, 3).join(", ")}</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#eef1e9] mb-6">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* ─── RENDER HTML CONTENT ────────────────── */}
              <style dangerouslySetInnerHTML={{ __html: baseStyles + (guide.customStyles || "") }} />
              <div 
                className="guide-content"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />
            </article>
          </div>

          {/* ─── RIGHT COLUMN: SIDEBAR ────────────────────── */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
            {/* Quick Stats */}
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
              <h3 className="font-fraunces font-medium text-[1rem] mb-3">📊 Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-[var(--color-ink-soft)]">Category</span>
                  <span className="font-semibold">{getCategoryName(guide.category)}</span>
                </div>
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-[var(--color-ink-soft)]">Difficulty</span>
                  <span className="font-semibold">{guide.level}</span>
                </div>
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-[var(--color-ink-soft)]">Steps</span>
                  <span className="font-semibold">{guide.steps}</span>
                </div>
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-[var(--color-ink-soft)]">Read Time</span>
                  <span className="font-semibold">{guide.readTime}</span>
                </div>
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-[var(--color-ink-soft)]">Published</span>
                  <span className="font-semibold">{formatDate(guide.date)}</span>
                </div>
                {guide.isTrending && (
                  <div className="flex justify-between text-[0.85rem]">
                    <span className="text-[var(--color-ink-soft)]">Status</span>
                    <span className="font-semibold text-red-500">🔥 Trending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
                <h3 className="font-fraunces font-medium text-[1rem] mb-3">📚 Related Guides</h3>
                <div className="space-y-3">
                  {relatedGuides.map((g) => (
                    <Link
                      key={g.id}
                      href={`/technology/${g.slug}`}
                      className="flex gap-3 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group"
                    >
                      <div className="w-[60px] h-[45px] flex-shrink-0 rounded-[6px] overflow-hidden bg-[#eef1e9]">
                        <Image src={g.image} alt={g.title} width={60} height={45} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[0.8rem] font-semibold group-hover:text-[var(--color-green)] transition-colors line-clamp-2">
                          {g.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[0.55rem] text-[var(--color-ink-soft)]">
                          <span>{g.author}</span>
                          <span>·</span>
                          <span>{g.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Guides */}
            {popularGuides.length > 0 && (
              <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
                <h3 className="font-fraunces font-medium text-[1rem] mb-3">⭐ Popular Guides</h3>
                <div className="space-y-2">
                  {popularGuides.map((g) => (
                    <Link
                      key={g.id}
                      href={`/technology/${g.slug}`}
                      className="flex items-center gap-2.5 p-2 rounded-[8px] transition-all hover:bg-[var(--color-green)]/5 hover:pl-3 group"
                    >
                      <span className="text-[1.2rem]">{getCategoryIcon(g.category)}</span>
                      <span className="text-[0.82rem] font-medium group-hover:text-[var(--color-green)] transition-colors line-clamp-1">
                        {g.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Quick Links */}
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px] p-5">
              <h3 className="font-fraunces font-medium text-[1rem] mb-3">📂 Categories</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "ai", label: "AI" },
                  { id: "generative-ai", label: "Gen AI" },
                  { id: "quantum-computing", label: "Quantum" },
                  { id: "ar-vr", label: "AR/VR" },
                  { id: "green-tech", label: "Green Tech" },
                  { id: "cybersecurity", label: "Security" },
                  { id: "space-tech", label: "Space" },
                  { id: "biotech", label: "Biotech" },
                ].map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/technology?category=${cat.id}`}
                    className="px-3 py-1.5 rounded-full border border-[var(--color-line)] text-[0.7rem] font-semibold hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/5 transition-colors"
                  >
                    {getCategoryIcon(cat.id)} {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Technology */}
            <div className="pt-2">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline"
              >
                ← Back to Technology
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}