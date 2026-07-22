// components/news/AuthorBio.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

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
    youtube?: string;
    website?: string;
  };
  showFullBio?: boolean;
}

export function AuthorBio({
  name,
  bio,
  image,
  articlesCount = 0,
  joinedDate = "2024",
  expertise = [],
  socialLinks = {},
  showFullBio = false,
}: AuthorBioProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-[#f5ebd0]/30 to-[#fbf8ff] rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {image ? (
            <div className="relative w-16 h-16 rounded-full ring-2 ring-white shadow-lg overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-lg font-bold ring-2 ring-white shadow-lg">
              {getInitials(name)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
              {name}
            </h4>
            {articlesCount > 0 && (
              <span className="text-xs bg-[#7F011F]/10 text-[#7F011F] px-2 py-0.5 rounded-full">
                {articlesCount} articles
              </span>
            )}
            {joinedDate && (
              <span className="text-xs text-[#6d4a4a]">
                Joined {joinedDate}
              </span>
            )}
          </div>

          <p className={`text-sm text-[#6d4a4a] leading-relaxed mt-1 ${showFullBio ? '' : 'line-clamp-3'}`}>
            {bio}
          </p>

          {/* Expertise Tags */}
          {expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {expertise.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.5rem] bg-[#f5ebd0]/50 px-2 py-0.5 rounded-full text-[#6d4a4a]"
                >
                  #{tag.toLowerCase().replace(/\s/g, "")}
                </span>
              ))}
            </div>
          )}

          {/* Social Links */}
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Follow ${name} on Twitter`}
                >
                  <i className="fab fa-twitter text-xs" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Connect with ${name} on LinkedIn`}
                >
                  <i className="fab fa-linkedin-in text-xs" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#333]/10 text-[#333] hover:bg-[#333] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Follow ${name} on GitHub`}
                >
                  <i className="fab fa-github text-xs" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Subscribe to ${name} on YouTube`}
                >
                  <i className="fab fa-youtube text-xs" />
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#7F011F]/10 text-[#7F011F] hover:bg-[#7F011F] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Visit ${name}'s website`}
                >
                  <i className="fas fa-globe text-xs" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}