// components/InstantIndex.tsx
"use client";

import { useState } from 'react';

interface InstantIndexProps {
  urls: string[];
  onComplete?: () => void;
}

export function InstantIndex({ urls, onComplete }: InstantIndexProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const indexNow = async () => {
    setLoading(true);
    setProgress(0);
    setStatus([]);

    // Split URLs into batches of 10
    const batches = [];
    for (let i = 0; i < urls.length; i += 10) {
      batches.push(urls.slice(i, i + 10));
    }

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      try {
        // 1. Google Indexing API
        const googleRes = await fetch('/api/google-index', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: batch }),
        });
        const googleData = await googleRes.json();
        
        // 2. Google Ping
        for (const url of batch) {
          await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`);
        }
        
        // 3. Bing IndexNow
        for (const url of batch) {
          await fetch(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${process.env.NEXT_PUBLIC_BING_KEY}`);
        }

        setStatus(prev => [...prev, `✅ Batch ${batchIndex + 1} indexed successfully`]);
        setProgress(((batchIndex + 1) / batches.length) * 100);
      } catch (error) {
        setStatus(prev => [...prev, `❌ Batch ${batchIndex + 1} failed: ${error}`]);
      }

      // Wait 5 seconds between batches
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    setLoading(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--color-line)]">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">⚡</span>
        <div>
          <h3 className="font-fraunces text-xl font-medium">Instant Indexing</h3>
          <p className="text-sm text-[#6d4a4a]">Get pages indexed in minutes</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#fbf8ff] p-4 rounded-xl border border-[var(--color-line)]">
          <p className="text-sm">
            <span className="font-semibold">{urls.length}</span> URLs ready to index
          </p>
        </div>

        <button
          onClick={indexNow}
          disabled={loading || urls.length === 0}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Indexing... {Math.round(progress)}%
            </>
          ) : (
            <>
              ⚡ Index Now
            </>
          )}
        </button>

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {status.length > 0 && (
          <div className="mt-4 max-h-40 overflow-y-auto space-y-1">
            {status.map((msg, i) => (
              <p key={i} className="text-sm">{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}