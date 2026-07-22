// components/news/AuthorBio.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface AuthorBioProps {
  name: string;
  bio: string;
  image?: string;
  articlesCount?: number;
  joinedDate?: string;
  expertise?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    youtube?: string;
  };
  className?: string;
}

export function AuthorBio({
  name,
  bio,
  image,
  articlesCount = 0,
  joinedDate = "2024",
  expertise = [],
  socialLinks = {},
  className = "",
}: AuthorBioProps) {
  const authorSlug = name.toLowerCase().replace(/\s+/g, "-");
  
  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`mt-8 p-5 bg-gradient-to-br from-[#f5ebd0]/20 to-[#fbf8ff] rounded-[3px] border border-[rgba(127,1,31,0.06)] ${className}`}>
      <div className="flex flex-wrap items-start gap-4">
        {/* Author Image - Clickable */}
        <Link
          href={`/news/author/${authorSlug}`}
          className="flex-shrink-0 group relative"
          aria-label={`View ${name}'s profile`}
        >
          {image ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#7F011F]/20 group-hover:ring-[#7F011F]/40 transition-all duration-300 group-hover:scale-105">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-xl font-bold ring-2 ring-[#7F011F]/20 group-hover:ring-[#7F011F]/40 transition-all duration-300 group-hover:scale-105">
              {initials}
            </div>
          )}
        </Link>

        {/* Author Info */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/news/author/${authorSlug}`}
              className="font-bold text-[#2d1a1a] text-base hover:text-[#7F011F] transition-colors group flex items-center gap-1.5 font-['Poppins',sans-serif]"
            >
              {name}
              <i className="fas fa-arrow-right text-[10px] text-[#7F011F]/30 group-hover:text-[#7F011F] transition-colors" />
            </Link>
            <span className="text-[10px] bg-[#7F011F]/10 text-[#7F011F] px-2 py-0.5 rounded-full font-medium">
              Author
            </span>
            {articlesCount > 0 && (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                {articlesCount} {articlesCount === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          <p className="text-sm text-[#6d4a4a] mt-1 leading-relaxed line-clamp-2">
            {bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link
              href={`/news/author/${authorSlug}`}
              className="text-xs text-[#7F011F] hover:underline font-medium flex items-center gap-1.5"
            >
              <i className="fas fa-user" />
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}