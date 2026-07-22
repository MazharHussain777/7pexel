// components/ArticleShare.tsx
"use client";

interface ArticleShareProps {
  url: string;
  title: string;
}

export function ArticleShare({ url, title }: ArticleShareProps) {
  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    if (navigator.share && platform === 'native') {
      navigator.share({
        title: title,
        text: title,
        url: url,
      }).catch(() => {});
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-[rgba(127,1,31,0.06)]">
      <span className="text-sm text-[#2d1a1a] font-medium font-['Poppins',sans-serif]">Share:</span>
      <button
        onClick={() => handleShare('twitter')}
        className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Twitter"
      >
        <i className="fab fa-twitter" />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Facebook"
      >
        <i className="fab fa-facebook-f" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on LinkedIn"
      >
        <i className="fab fa-linkedin-in" />
      </button>
      <button
        onClick={() => handleShare('reddit')}
        className="w-10 h-10 rounded-full bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on Reddit"
      >
        <i className="fab fa-reddit-alien" />
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share on WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </button>
      <button
        onClick={() => handleShare('native')}
        className="w-10 h-10 rounded-full bg-[#7F011F]/10 text-[#7F011F] hover:bg-[#7F011F] hover:text-white transition-all flex items-center justify-center"
        aria-label="Share using native share"
      >
        <i className="fas fa-share-alt" />
      </button>
    </div>
  );
}