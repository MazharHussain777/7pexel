// app/admin/instant-index/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { InstantIndex } from '@/components/InstantIndex';

export default function InstantIndexPage() {
  const [allUrls, setAllUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUrls();
  }, []);

  const fetchAllUrls = async () => {
    try {
      const response = await fetch('/api/get-all-urls');
      const data = await response.json();
      setAllUrls(data.urls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading URLs...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="font-fraunces text-3xl font-medium mb-2">
        Instant Index <span className="text-[#7F011F]">Dashboard</span>
      </h1>
      <p className="text-[#6d4a4a] mb-8">
        Submit all pages to Google and Bing for instant indexing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#fbf8ff] p-4 rounded-xl border border-[var(--color-line)]">
          <p className="text-sm text-[#6d4a4a]">Total Pages</p>
          <p className="text-2xl font-bold">{allUrls.length}</p>
        </div>
        <div className="bg-[#fbf8ff] p-4 rounded-xl border border-[var(--color-line)]">
          <p className="text-sm text-[#6d4a4a]">Status</p>
          <p className="text-sm font-medium text-green-600">● Ready to index</p>
        </div>
      </div>

      <InstantIndex urls={allUrls} />

      <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-800">
          ⚡ <strong>Pro Tip:</strong> Pages typically index within 10-30 minutes using this method
        </p>
      </div>
    </div>
  );
}