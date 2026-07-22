// app/news/author/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { NewsletterFull } from "@/components/NewsletterFull";

interface Author {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  image?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  expertise: string[];
  joinedDate: string;
  articlesCount: number;
  totalViews: number;
  isActive: boolean;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  views: number;
  comments: number;
}

// AuthorData interface - using extends instead of spread
interface AuthorData extends Author {
  articles: Article[];
  stats: {
    totalArticles: number;
    totalViews: number;
    categories: string[];
    tags: string[];
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/authors/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        title: "Author Not Found",
        description: "The author you're looking for doesn't exist.",
      };
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return {
        title: "Author Not Found",
        description: "The author you're looking for doesn't exist.",
      };
    }

    const author = result.data;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techblog.com";

    return {
      title: `${author.name} - Author Profile | 7pexel Tech News`,
      description: author.bio || `${author.name} is a technology journalist and expert.`,
      openGraph: {
        title: `${author.name} - Author Profile | 7pexel`,
        description: author.bio || `${author.name} is a technology journalist.`,
        url: `${siteUrl}/news/author/${slug}`,
        siteName: "7pexel",
        images: author.image ? [author.image] : undefined,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${author.name} - Author Profile`,
        description: author.bio || `${author.name} is a technology journalist.`,
        images: author.image ? [author.image] : undefined,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Author Not Found",
      description: "The author you're looking for doesn't exist.",
    };
  }
}

// Generate static params for all authors
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/authors?limit=1000`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return [];
    }

    return result.data.map((author: any) => ({
      slug: author.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/authors/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      notFound();
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      notFound();
    }

    const authorData = result.data as AuthorData;
    const author = authorData;
    const articles = authorData.articles || [];
    const stats = authorData.stats || {
      totalArticles: 0,
      totalViews: 0,
      categories: [],
      tags: [],
    };

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Get initials for avatar fallback
    const initials = author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />

        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#6d4a4a] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#7F011F] transition-colors">
              <i className="fas fa-home" />
            </Link>
            <i className="fas fa-chevron-right text-[10px]" />
            <Link href="/news" className="hover:text-[#7F011F] transition-colors">
              News
            </Link>
            <i className="fas fa-chevron-right text-[10px]" />
            <span className="text-[#7F011F] font-medium truncate max-w-[200px]">
              {author.name}
            </span>
          </nav>

          {/* Author Profile */}
          <div className="bg-white rounded-[3px] overflow-hidden shadow-lg border border-[rgba(127,1,31,0.06)] mb-8">
            {/* Cover */}
            <div className="relative h-32 bg-gradient-to-r from-[#7F011F]/10 via-[#a80a30]/5 to-[#f5ebd0]/30">
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap items-end gap-6">
                {/* Avatar */}
                <div className="relative -mb-12">
                  {author.image ? (
                    <div className="relative w-24 h-24 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-2xl font-bold ring-4 ring-white shadow-xl">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name and Stats */}
                <div className="flex-1 min-w-[200px] pb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
                    {author.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-[#6d4a4a]">
                    <span className="flex items-center gap-1.5 bg-[#7F011F]/5 px-3 py-1 rounded-full">
                      <i className="fas fa-pen-fancy text-[#7F011F] text-xs" />
                      {stats.totalArticles} {stats.totalArticles === 1 ? "Article" : "Articles"}
                    </span>
                    <span className="flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full">
                      <i className="far fa-eye text-purple-600 text-xs" />
                      {stats.totalViews.toLocaleString()} Views
                    </span>
                    <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full">
                      <i className="far fa-calendar-alt text-emerald-600 text-xs" />
                      Joined {author.joinedDate || "2024"}
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 pb-2">
                  {author.socialLinks?.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all flex items-center justify-center"
                      aria-label={`Follow ${author.name} on Twitter`}
                    >
                      <i className="fab fa-twitter text-sm" />
                    </a>
                  )}
                  {author.socialLinks?.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
                      aria-label={`Connect with ${author.name} on LinkedIn`}
                    >
                      <i className="fab fa-linkedin-in text-sm" />
                    </a>
                  )}
                  {author.socialLinks?.github && (
                    <a
                      href={author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#333]/10 text-[#333] hover:bg-[#333] hover:text-white transition-all flex items-center justify-center"
                      aria-label={`Follow ${author.name} on GitHub`}
                    >
                      <i className="fab fa-github text-sm" />
                    </a>
                  )}
                  {author.socialLinks?.youtube && (
                    <a
                      href={author.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center"
                      aria-label={`Subscribe to ${author.name} on YouTube`}
                    >
                      <i className="fab fa-youtube text-sm" />
                    </a>
                  )}
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#7F011F]/10 text-[#7F011F] hover:bg-[#7F011F] hover:text-white transition-all flex items-center justify-center"
                      aria-label={`Visit ${author.name}'s website`}
                    >
                      <i className="fas fa-globe text-sm" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6 pt-20">
              <div className="max-w-3xl">
                <h2 className="text-xs font-semibold text-[#6d4a4a] uppercase tracking-wider mb-2">About</h2>
                <p className="text-[#2d1a1a] leading-relaxed">{author.bio}</p>

                {/* Expertise */}
                {stats.categories && stats.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {stats.categories.map((category: string) => (
                      <Link
                        key={category}
                        href={`/news?category=${category}`}
                        className="text-xs bg-[#f5ebd0] text-[#2d1a1a] px-3 py-1.5 rounded-full hover:bg-[#7F011F]/10 hover:text-[#7F011F] transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                    {stats.tags && stats.tags.slice(0, 5).map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/news?tag=${tag.toLowerCase()}`}
                        className="text-xs bg-[#f5ebd0]/50 text-[#6d4a4a] px-3 py-1.5 rounded-full hover:bg-[#7F011F]/10 hover:text-[#7F011F] transition-colors"
                      >
                        #{tag.toLowerCase().replace(/\s/g, "")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Articles by Author */}
          <div>
            <h2 className="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-2 font-['Poppins',sans-serif]">
              <i className="fas fa-newspaper text-[#7F011F]" />
              Articles by {author.name}
              <span className="text-sm font-normal text-[#6d4a4a] ml-2">
                ({stats.totalArticles} articles)
              </span>
            </h2>

            {articles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {articles.map((article: Article) => (
                  <Link
                    key={article._id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 bg-[#7F011F] text-white text-[0.5rem] font-bold px-2 py-0.5 rounded-full">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-semibold text-[#2d1a1a] leading-tight line-clamp-2 group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif] min-h-[2.5rem]">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(127,1,31,0.04)]">
                        <div className="flex items-center gap-1.5 text-[0.5rem] text-[#6d4a4a]">
                          <span className="whitespace-nowrap">{formatDate(article.date).split(",")[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[0.5rem] text-[#6d4a4a]">
                          <i className="far fa-eye" />
                          <span>{article.views?.toLocaleString() || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-[3px] border border-[rgba(127,1,31,0.06)]">
                <i className="fas fa-newspaper text-4xl text-[#7F011F]/20 mb-4 block" />
                <p className="text-[#6d4a4a] font-['Poppins',sans-serif]">
                  No articles found from this author
                </p>
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div className="mt-12">
            <NewsletterFull />
          </div>

          {/* Back to News */}
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-[#6d4a4a] hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]"
            >
              <i className="fas fa-arrow-left" />
              Back to News
            </Link>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading author:", error);
    notFound();
  }
}