// @ts-nocheck 
// components/RelatedArticles.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsArticle, generateSlug } from "@/lib/newsData";

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[rgba(127,1,31,0.06)] shadow-sm">
        <h3 className="text-lg font-bold text-[#2d1a1a] mb-4 font-['Poppins',sans-serif] flex items-center gap-2">
          <i className="fas fa-link text-[#7F011F]" />
          Related Articles
        </h3>
        <p className="text-sm text-[#6d4a4a] text-center py-4">No related articles found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[rgba(127,1,31,0.06)] shadow-sm">
      <h3 className="text-lg font-bold text-[#2d1a1a] mb-4 font-['Poppins',sans-serif] flex items-center gap-2">
        <i className="fas fa-link text-[#7F011F]" />
        Related Articles
      </h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug || generateSlug(article.title)}`}
            className="group flex gap-3 hover:bg-[#f5ebd0]/20 p-2 rounded-xl transition-all -mx-2"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#7F011F]">
                {article.category}
              </div>
              <h4 className="text-sm font-semibold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif]">
                {article.title}
              </h4>
              <div className="text-xs text-[#6d4a4a] mt-1">
                {article.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}