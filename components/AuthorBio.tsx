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

// SVG Icon Components
const TwitterIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

export function AuthorBio({
  name = "AZhar Huan",
  bio = "AZhar Huan is a passionate technology journalist and smartphone enthusiast with over 8 years of experience in the tech industry. He specializes in in-depth phone comparisons, performance analysis, and camera reviews.",
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

  const authorName = name || "AZhar Huan";
  const authorBio = bio || "AZhar Huan is a passionate technology journalist and smartphone enthusiast with over 8 years of experience in the tech industry.";

  return (
    <div className="bg-gradient-to-r from-[#f5ebd0]/30 to-[#fbf8ff] rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {image ? (
            <div className="relative w-16 h-16 rounded-full ring-2 ring-white shadow-lg overflow-hidden">
              <Image
                src={image}
                alt={authorName}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-xl font-bold ring-2 ring-white shadow-lg">
              MH
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
              {authorName}
              <span className="text-[10px] bg-[#7F011F] text-white px-2 py-0.5 rounded-full font-normal">
                Author
              </span>
            </h4>
            {articlesCount > 0 && (
              <span className="text-xs bg-[#7F011F]/10 text-[#7F011F] px-2 py-0.5 rounded-full">
                {articlesCount} articles
              </span>
            )}
            {joinedDate && (
              <span className="text-xs text-[#6d4a4a] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {joinedDate}
              </span>
            )}
          </div>

          <p className={`text-sm text-[#6d4a4a] leading-relaxed mt-1 ${showFullBio ? '' : 'line-clamp-3'}`}>
            {authorBio}
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
                  aria-label={`Follow ${authorName} on Twitter`}
                >
                  <TwitterIcon />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Connect with ${authorName} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#333]/10 text-[#333] hover:bg-[#333] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Follow ${authorName} on GitHub`}
                >
                  <GitHubIcon />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Subscribe to ${authorName} on YouTube`}
                >
                  <YouTubeIcon />
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#7F011F]/10 text-[#7F011F] hover:bg-[#7F011F] hover:text-white transition-all flex items-center justify-center"
                  aria-label={`Visit ${authorName}'s website`}
                >
                  <WebsiteIcon />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}