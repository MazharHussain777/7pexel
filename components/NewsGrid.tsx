// @ts-nocheck 
// components/NewsGrid.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles, generateSlug } from "@/lib/newsData";

// Export the Article type for use in parent
export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  readTime?: string;
  comments?: number;
  slug?: string;
  excerpt?: string;
  content?: string;
}

// Accept items as an optional prop
interface NewsGridProps {
  items?: Article[];
  showAll?: boolean;
}

export function NewsGrid({ items, showAll = false }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If items are passed as props, use them
    if (items) {
      setArticles(items);
      setLoading(false);
      return;
    }

    // Otherwise fetch internally
    const allArticles = getAllArticles();
    // Show 4 featured articles by default, or all if showAll is true
    const filtered = showAll 
      ? allArticles 
      : allArticles.filter(a => a.isFeatured).slice(0, 4);
    setArticles(filtered);
    setLoading(false);
  }, [items, showAll]);

  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
              <i className="fas fa-newspaper text-[#7F011F] text-xl" />
              Latest Tech News
            </h2>
            <p className="text-sm text-[#6d4a4a] mt-0.5 font-['Poppins',sans-serif]">
              Breaking stories and updates from the tech world
            </p>
          </div>
          <Link
            href="/news"
            className="text-xs font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors flex items-center gap-1.5 group"
          >
            View all news
            <i className="fas fa-arrow-right text-[0.6rem] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden border border-[rgba(127,1,31,0.06)] animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
            <i className="fas fa-newspaper text-[#7F011F] text-xl" />
            Latest Tech News
          </h2>
          <p className="text-sm text-[#6d4a4a] mt-0.5 font-['Poppins',sans-serif]">
            Breaking stories and updates from the tech world
          </p>
        </div>
        <Link
          href="/news"
          className="text-xs font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors flex items-center gap-1.5 group"
        >
          View all news
          <i className="fas fa-arrow-right text-[0.6rem] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* News Grid - 4 cards in 1 row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => {
          const slug = article.slug || generateSlug(article.title);
          return (
            <Link
              key={article.id}
              href={`/news/${slug}`}
              className="group bg-white rounded-lg overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer block no-underline"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {article.isBreaking && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[0.4rem] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    Breaking
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[0.4rem] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i className="far fa-clock text-[0.35rem]" />
                  {article.readTime || "3 min read"}
                </div>
              </div>
              <div className="p-4">
                <div className="text-[0.55rem] font-bold text-[#7F011F] mb-1 uppercase tracking-wider">
                  {article.category}
                </div>
                <h3 className="text-sm font-bold text-[#2d1a1a] leading-tight line-clamp-2 group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(127,1,31,0.06)]">
                  <div className="flex items-center gap-1.5 text-[0.55rem] text-[#6d4a4a]">
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.55rem] text-[#6d4a4a]">
                    <span className="flex items-center gap-0.5">
                      <i className="far fa-comment text-[0.45rem]" />
                      {article.comments || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}