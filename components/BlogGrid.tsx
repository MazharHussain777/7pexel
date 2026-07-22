// components/BlogGrid.tsx
"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export function BlogGrid() {
  const featuredPosts = blogPosts.slice(0, 3);

  // Helper function to generate slug from title
  const getSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
            <i className="fas fa-newspaper text-[#7F011F] text-xl" />
            Latest Tech Articles
          </h2>
          <p className="text-sm text-[#6d4a4a] mt-0.5 font-['Poppins',sans-serif]">
            Fresh insights and reviews from the tech world
          </p>
        </div>
        <Link
          href="/blog"
          className="text-xs font-medium text-[#7F011F] hover:text-[#a80a30] transition-colors flex items-center gap-1.5 group"
        >
          View all
          <i className="fas fa-arrow-right text-[0.6rem] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Blog Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post) => {
          const slug = getSlug(post.title);
          return (
            <Link
              key={post.id}
              href={`/blog/${slug}`}
              className="group bg-white rounded-lg overflow-hidden border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer block no-underline"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[0.5rem] font-bold px-3 py-1 rounded-full border border-[rgba(127,1,31,0.06)] shadow-sm text-[#7F011F] font-['Poppins',sans-serif]">
                  {post.category}
                </div>

                {/* Read Time */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[0.45rem] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <i className="far fa-clock text-[0.4rem]" />
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-[#2d1a1a] leading-tight line-clamp-2 group-hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]">
                  {post.title}
                </h3>

                {/* Date + Read More */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(127,1,31,0.06)]">
                  <div className="text-[0.6rem] text-[#6d4a4a] font-['Poppins',sans-serif]">
                    {post.date}
                  </div>

                  {/* Read More Arrow */}
                  <div className="w-8 h-8 rounded-full bg-[#7F011F]/5 flex items-center justify-center group-hover:bg-[#7F011F] transition-all">
                    <i className="fas fa-arrow-right text-[0.5rem] text-[#7F011F] group-hover:text-white transition-all" />
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