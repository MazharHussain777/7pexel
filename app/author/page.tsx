// app/author/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";

// Author data
const authorData = {
  name: "Mazhar Hussan",
  title: "Senior Tech Journalist & Smartphone Analyst",
  image: "/images/azhar-huan.jpg",
  avatarInitials: "MH",
  socialLinks: {
    twitter: "https://twitter.com/mazharhussan",
    linkedin: "https://linkedin.com/in/mazharhussan",
    youtube: "https://youtube.com/@mazharhussan",
    github: "https://github.com/mazharhussan",
    website: "https://mazharhussan.com",
    instagram: "https://instagram.com/mazharhussan",
  },
};

// SVG Social Icons
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Social Icon Component
const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons: Record<string, { icon: React.ReactNode; color: string; hoverColor: string; label: string }> = {
    twitter: { 
      icon: <TwitterIcon />, 
      color: "bg-[#1DA1F2]", 
      hoverColor: "hover:bg-[#1DA1F2]", 
      label: "Twitter" 
    },
    linkedin: { 
      icon: <LinkedInIcon />, 
      color: "bg-[#0A66C2]", 
      hoverColor: "hover:bg-[#0A66C2]", 
      label: "LinkedIn" 
    },
    youtube: { 
      icon: <YouTubeIcon />, 
      color: "bg-[#FF0000]", 
      hoverColor: "hover:bg-[#FF0000]", 
      label: "YouTube" 
    },
    github: { 
      icon: <GitHubIcon />, 
      color: "bg-[#333]", 
      hoverColor: "hover:bg-[#333]", 
      label: "GitHub" 
    },
    website: { 
      icon: <WebsiteIcon />, 
      color: "bg-[#7F011F]", 
      hoverColor: "hover:bg-[#7F011F]", 
      label: "Website" 
    },
    instagram: { 
      icon: <InstagramIcon />, 
      color: "bg-[#E4405F]", 
      hoverColor: "hover:bg-[#E4405F]", 
      label: "Instagram" 
    },
  };

  const social = icons[platform];
  if (!social) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-${social.color}/40`}
      aria-label={`Follow ${authorData.name} on ${social.label}`}
      title={social.label}
    >
      {social.icon}
    </a>
  );
};

export default function AuthorPage() {
  const { name, title, image, avatarInitials, socialLinks } = authorData;

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      <main className="max-w-[61vw] mx-auto px-4 py-12">
        {/* Author Profile - Centered */}
        <div className="bg-white rounded-[3px] overflow-hidden border border-[rgba(127,1,31,0.06)] shadow-sm">
          {/* Banner */}
          <div className="relative h-32 md:h-40 bg-gradient-to-r from-[#7F011F] via-[#a80a30] to-[#c94a6a]">
            <div className="absolute inset-0 opacity-10" />
          </div>

          <div className="px-6 md:px-10 pb-10 -mt-16 relative">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative">
                {image ? (
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white text-5xl font-bold ring-4 ring-white shadow-xl">
                    {avatarInitials}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>

              {/* Author Name - Centered */}
              <div className="text-center mt-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
                  {name}
                </h2>
                <p className="text-[#7F011F] font-medium text-sm md:text-base">
                  {title}
                </p>
              </div>

              {/* Social Links - Centered */}
              <div className="mt-6 pt-6 border-t border-[rgba(127,1,31,0.06)]">
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <SocialIcon key={platform} platform={platform} url={url} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6d4a4a] hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}