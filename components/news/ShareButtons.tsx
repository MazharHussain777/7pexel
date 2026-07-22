"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
  showLabel?: boolean;
}

export function ShareButtons({ url, title, className = '', showLabel = true }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=7pexel`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm text-[#6d4a4a] font-medium flex-shrink-0">
          <i className="fas fa-share-alt mr-2" />
          Share:
        </span>
      )}
      
      {/* Twitter */}
      <button
        onClick={() => window.open(shareData.twitter, '_blank', 'width=600,height=400')}
        className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <i className="fab fa-twitter" />
      </button>
      
      {/* Facebook */}
      <button
        onClick={() => window.open(shareData.facebook, '_blank', 'width=600,height=400')}
        className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <i className="fab fa-facebook-f" />
      </button>
      
      {/* LinkedIn */}
      <button
        onClick={() => window.open(shareData.linkedin, '_blank', 'width=600,height=400')}
        className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <i className="fab fa-linkedin-in" />
      </button>
      
      {/* WhatsApp */}
      <button
        onClick={() => window.open(shareData.whatsapp, '_blank')}
        className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </button>
      
      {/* Reddit */}
      <button
        onClick={() => window.open(shareData.reddit, '_blank', 'width=600,height=400')}
        className="w-10 h-10 rounded-full bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Reddit"
        title="Share on Reddit"
      >
        <i className="fab fa-reddit-alien" />
      </button>
      
      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="w-10 h-10 rounded-full bg-[#6d4a4a]/10 text-[#6d4a4a] hover:bg-[#6d4a4a] hover:text-white transition-all flex items-center justify-center relative"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <i className="fas fa-check text-green-500" />
        ) : (
          <i className="fas fa-link" />
        )}
      </button>
    </div>
  );
}