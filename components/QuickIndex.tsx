// components/QuickIndex.tsx
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function QuickIndex() {
  const pathname = usePathname();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const indexPage = async () => {
    setStatus('loading');
    const url = `https://www.7pexel.com${pathname}`;
    
    try {
      await fetch('/api/google-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [url] }),
      });
      
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`);
      await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`);
      
      setStatus('done');
    } catch (error) {
      console.error('Indexing failed:', error);
    }
  };

  return (
    <button
      onClick={indexPage}
      disabled={status === 'loading'}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 text-sm flex items-center gap-2"
    >
      {status === 'loading' ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Indexing...
        </>
      ) : status === 'done' ? (
        <>✅ Indexed!</>
      ) : (
        <>⚡ Index This Page</>
      )}
    </button>
  );
}