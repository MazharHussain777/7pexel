// components/IndexNowButton.tsx
"use client";

import { useState } from 'react';

interface IndexNowButtonProps {
  url: string;
}

export function IndexNowButton({ url }: IndexNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const indexNow = async () => {
    setLoading(true);
    setStatus('idle');

    try {
      // 1. Google Ping
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`);
      
      // 2. Bing IndexNow
      await fetch(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=YOUR_KEY`);
      
      // 3. API submission
      await fetch('/api/google-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [url] }),
      });

      setStatus('success');
    } catch (error) {
      setStatus('error');
    }

    setLoading(false);
  };

  return (
    <button
      onClick={indexNow}
      disabled={loading}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
        status === 'success'
          ? 'bg-green-100 text-green-700'
          : status === 'error'
          ? 'bg-red-100 text-red-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } disabled:opacity-50`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Indexing...
        </>
      ) : status === 'success' ? (
        <>✅ Indexed!</>
      ) : status === 'error' ? (
        <>❌ Failed</>
      ) : (
        <>⚡ Index Now</>
      )}
    </button>
  );
}