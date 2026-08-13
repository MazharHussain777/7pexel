// app/admin/news/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  author: string;
  date: string;
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/news?limit=100');
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/news/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      await fetchArticles(); // Refresh list
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const handleToggleStatus = async (slug: string, field: 'isFeatured' | 'isBreaking' | 'isTrending') => {
    const article = articles.find(a => a.slug === slug);
    if (!article) return;

    try {
      const res = await fetch(`/api/news/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !article[field] }),
      });
      if (!res.ok) throw new Error('Failed to update');
      await fetchArticles(); // Refresh list
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="wrap py-12">
          <div className="text-center">Loading articles...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="wrap py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-fraunces font-medium text-2xl">📰 News Management</h1>
          <Link
            href="/admin/news/new"
            className="px-4 py-2 bg-[var(--color-green)] text-white rounded-full font-semibold hover:bg-[var(--color-green-deep)] transition-colors"
          >
            + New Article
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <th className="p-3 text-left text-sm font-semibold">Title</th>
                <th className="p-3 text-left text-sm font-semibold">Category</th>
                <th className="p-3 text-left text-sm font-semibold">Author</th>
                <th className="p-3 text-left text-sm font-semibold">Date</th>
                <th className="p-3 text-center text-sm font-semibold">Featured</th>
                <th className="p-3 text-center text-sm font-semibold">Breaking</th>
                <th className="p-3 text-center text-sm font-semibold">Trending</th>
                <th className="p-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper)]/50">
                  <td className="p-3 text-sm">
                    <Link href={`/news/${article.slug}`} className="hover:text-[var(--color-green)] transition-colors">
                      {article.title}
                    </Link>
                  </td>
                  <td className="p-3 text-sm">
                    <span className="px-2 py-1 bg-[var(--color-green)]/10 text-[var(--color-green)] rounded-full text-xs font-semibold">
                      {article.categoryLabel}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{article.author}</td>
                  <td className="p-3 text-sm">{article.date}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleStatus(article.slug, 'isFeatured')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        article.isFeatured
                          ? 'bg-[#D4F26B] text-[var(--color-green-deep)]'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {article.isFeatured ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleStatus(article.slug, 'isBreaking')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        article.isBreaking
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {article.isBreaking ? '🔴' : '⚪'}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleStatus(article.slug, 'isTrending')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        article.isTrending
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {article.isTrending ? '🔥' : '❄️'}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/news/edit/${article.slug}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-ink-soft)]">No articles yet. Create your first article!</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}