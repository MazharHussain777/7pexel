// app/guides/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { fetchPhonesFromDB } from "@/lib/phone-data-service";

interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  relatedGuides: string[];
}

const guides: Record<string, Guide> = {
  "phone-photography": {
    slug: "phone-photography",
    title: "Phone Photography: Master Your Smartphone Camera",
    excerpt: "Learn professional photography techniques using just your smartphone. From composition to editing, become a mobile photography expert.",
    category: "photography",
    icon: "📸",
    content: `
      <h2>Mastering Phone Photography</h2>
      <p>Smartphone cameras have evolved to rival professional cameras. This guide will help you take stunning photos with your phone.</p>
      
      <h3>1. Composition Techniques</h3>
      <ul>
        <li><strong>Rule of Thirds:</strong> Place subjects along grid lines</li>
        <li><strong>Leading Lines:</strong> Use natural lines to guide the eye</li>
        <li><strong>Symmetry:</strong> Create balanced, harmonious images</li>
        <li><strong>Framing:</strong> Use natural frames like doorways</li>
      </ul>
      
      <h3>2. Lighting Tips</h3>
      <ul>
        <li>Shoot during golden hour (sunrise/sunset)</li>
        <li>Avoid harsh midday sun</li>
        <li>Use natural light whenever possible</li>
        <li>Experiment with backlighting</li>
      </ul>
      
      <h3>3. Camera Settings</h3>
      <ul>
        <li>Adjust exposure manually</li>
        <li>Use HDR for high contrast scenes</li>
        <li>Shoot in RAW for more editing flexibility</li>
        <li>Use portrait mode for depth effect</li>
      </ul>
    `,
    author: "7pexel Team",
    date: "2026-08-15",
    readTime: "10 min read",
    tags: ["photography", "camera", "tips", "tutorial"],
    relatedGuides: ["phone-camera-guide", "editing-tips"],
  },
  "phone-security": {
    slug: "phone-security",
    title: "Phone Security: Protect Your Digital Life",
    excerpt: "Essential security tips to keep your smartphone and personal data safe from threats.",
    category: "security",
    icon: "🔒",
    content: `
      <h2>Essential Phone Security Guide</h2>
      <p>Your smartphone contains sensitive personal information. Protect it with these essential security practices.</p>
      
      <h3>1. Password & Biometrics</h3>
      <ul>
        <li>Use strong, unique passwords</li>
        <li>Enable biometric authentication (fingerprint/face)</li>
        <li>Use a password manager</li>
      </ul>
      
      <h3>2. App Security</h3>
      <ul>
        <li>Only download from official app stores</li>
        <li>Review app permissions regularly</li>
        <li>Keep apps updated</li>
      </ul>
      
      <h3>3. Data Protection</h3>
      <ul>
        <li>Enable encryption</li>
        <li>Regular backups</li>
        <li>Use a VPN on public WiFi</li>
      </ul>
    `,
    author: "7pexel Team",
    date: "2026-08-10",
    readTime: "8 min read",
    tags: ["security", "privacy", "protection", "tips"],
    relatedGuides: ["privacy-guide", "data-backup"],
  },
  "phone-accessories": {
    slug: "phone-accessories",
    title: "Best Phone Accessories: Must-Have Additions",
    excerpt: "The best accessories to enhance your smartphone experience. From cases to headphones, find what you need.",
    category: "accessories",
    icon: "🎧",
    content: `
      <h2>Essential Phone Accessories</h2>
      <p>Enhance your smartphone experience with these must-have accessories.</p>
      
      <h3>1. Protection</h3>
      <ul>
        <li>Screen protector</li>
        <li>Protective case</li>
        <li>Camera lens protector</li>
      </ul>
      
      <h3>2. Audio</h3>
      <ul>
        <li>Wireless earbuds</li>
        <li>Portable speakers</li>
        <li>Headphone adapter</li>
      </ul>
      
      <h3>3. Charging</h3>
      <ul>
        <li>Fast charger</li>
        <li>Wireless charging pad</li>
        <li>Power bank</li>
      </ul>
    `,
    author: "7pexel Team",
    date: "2026-08-05",
    readTime: "6 min read",
    tags: ["accessories", "gadgets", "cases", "audio"],
    relatedGuides: ["best-cases", "best-earbuds"],
  },
  "upgrade-guide": {
    slug: "upgrade-guide",
    title: "When to Upgrade: Smartphone Replacement Guide",
    excerpt: "Know when it's time to upgrade your smartphone. Signs, timing, and what to look for in a new phone.",
    category: "upgrade",
    icon: "📈",
    content: `
      <h2>Smartphone Upgrade Guide</h2>
      <p>Deciding when to upgrade your phone can be tricky. Here's what to consider.</p>
      
      <h3>1. Signs You Should Upgrade</h3>
      <ul>
        <li>Battery no longer lasts full day</li>
        <li>Phone is slow/laggy</li>
        <li>No more software updates</li>
        <li>Physical damage</li>
      </ul>
      
      <h3>2. Best Time to Upgrade</h3>
      <ul>
        <li>After 2-3 years of use</li>
        <li>When new features matter</li>
        <li>During sales events (Black Friday, etc.)</li>
      </ul>
      
      <h3>3. What to Look For</h3>
      <ul>
        <li>Better camera</li>
        <li>Longer battery life</li>
        <li>Faster processor</li>
        <li>5G connectivity</li>
      </ul>
    `,
    author: "7pexel Team",
    date: "2026-08-01",
    readTime: "7 min read",
    tags: ["upgrade", "buying", "decision", "timing"],
    relatedGuides: ["buying-guide", "value-guide"],
  },
};

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    return {
      title: "Guide Not Found | 7pexel",
      description: "The guide you're looking for doesn't exist.",
    };
  }

  return {
    title: `${guide.title} | 7pexel Guides`,
    description: guide.excerpt,
    keywords: guide.tags.join(", "),
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

  // Fetch phones for recommendations
  let phones = [];
  try {
    const result = await fetchPhonesFromDB({ limit: 20 });
    phones = result.data || [];
  } catch (error) {
    phones = [];
  }

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6d4a4a] mb-6">
          <Link href="/" className="hover:text-[#7F011F]">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#7F011F]">Guides</Link>
          <span>/</span>
          <span className="text-[#1a1a1a] font-medium">{guide.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{guide.icon}</span>
                <div>
                  <h1 className="font-fraunces text-2xl md:text-3xl font-medium">{guide.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-[#6d4a4a] mt-1">
                    <span>✍️ {guide.author}</span>
                    <span>📅 {new Date(guide.date).toLocaleDateString()}</span>
                    <span>⏱️ {guide.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {guide.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-[#fbf8ff] rounded-full border border-[var(--color-line)]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div 
                className="prose prose-sm md:prose-base max-w-none prose-headings:font-fraunces prose-a:text-[#7F011F] prose-strong:text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />

              {/* Related Guides */}
              {guide.relatedGuides.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[var(--color-line)]">
                  <h3 className="font-semibold text-[#1a1a1a] mb-3">📚 Related Guides</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.relatedGuides.map((slug) => {
                      const relatedGuide = guides[slug];
                      if (!relatedGuide) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/guides/${slug}`}
                          className="px-4 py-2 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm"
                        >
                          {relatedGuide.icon} {relatedGuide.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-2xl border border-[var(--color-line)] p-5">
                <h3 className="font-semibold text-[#1a1a1a] mb-3">📚 All Guides</h3>
                <div className="space-y-2">
                  {Object.values(guides).map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className={`block text-sm p-2 rounded-lg transition-colors ${
                        g.slug === slug
                          ? "bg-[#7F011F]/10 text-[#7F011F] font-medium"
                          : "hover:bg-[#fbf8ff] text-[#6d4a4a]"
                      }`}
                    >
                      {g.icon} {g.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recommended Phones */}
              {phones.length > 0 && (
                <div className="bg-white rounded-2xl border border-[var(--color-line)] p-5">
                  <h3 className="font-semibold text-[#1a1a1a] mb-3">📱 Recommended Phones</h3>
                  <div className="space-y-2">
                    {phones.slice(0, 4).map((phone: any) => (
                      <Link
                        key={phone.slug}
                        href={`/phones/finder/${phone.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#fbf8ff] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                          {phone.image ? (
                            <img src={phone.image} alt="" className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#7F011F]">
                              {phone.brand?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{phone.brand} {phone.model}</p>
                          <p className="text-xs text-[#6d4a4a]">${phone.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/phones/finder"
                    className="block text-center text-sm text-[#7F011F] font-medium mt-3 hover:underline"
                  >
                    View All Phones →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}