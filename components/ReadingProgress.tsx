// components/news/ReadingProgress.tsx
"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#f5ebd0] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#7F011F] via-[#a80a30] to-[#c94a6a] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Progress percentage */}
      <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-3 py-1.5 text-xs font-medium text-[#7F011F] border border-[rgba(127,1,31,0.1)]">
        {Math.round(progress)}% read
      </div>
    </>
  );
}