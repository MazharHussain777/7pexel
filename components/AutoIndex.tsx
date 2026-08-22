// components/AutoIndex.tsx
"use client";

import { useEffect } from 'react';

interface AutoIndexProps {
  url: string;
}

export function AutoIndex({ url }: AutoIndexProps) {
  useEffect(() => {
    // Auto-index after 5 seconds of page load
    const timer = setTimeout(async () => {
      try {
        // Submit to Google
        await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`);
        
        // Submit to Bing
        await fetch(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=YOUR_KEY`);
        
        console.log(`✅ Auto-indexed: ${url}`);
      } catch (error) {
        console.error('Auto-index failed:', error);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [url]);

  return null;
}