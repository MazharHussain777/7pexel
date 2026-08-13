// app/admin/news/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'phones', label: '📱 Phones' },
  { id: 'laptops', label: '💻 Laptops' },
  { id: 'watches', label: '⌚ Watches' },
  { id: 'technology', label: '💡 Technology' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'audio', label: '🎧 Audio' },
  { id: 'cameras', label: '📸 Cameras' },
  { id: 'auto', label: '🚗 Auto' },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'technology',
    author: '',
    authorBio: '',
    contentHtml: '',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop&crop=center',
    imageAlt: '',
    tags: '',
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        readTime: `${Math.max(3, Math.ceil(formData.contentHtml.length / 1000))} min read`,
        date: new Date().toISOString().split('T')[0],
        authorAvatar: formData.author.charAt(0).toUpperCase(),
      };

      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create article');
      }

      router.push('/admin/news');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="wrap py-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/news" className="text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors">
            ← Back
          </Link>
          <h1 className="font-fraunces font-medium text-2xl">✍️ Create New Article</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="Enter article title"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold mb-1">Excerpt *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="Brief summary of the article"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold mb-1">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="Author name"
            />
          </div>

          {/* Author Bio */}
          <div>
            <label className="block text-sm font-semibold mb-1">Author Bio</label>
            <textarea
              name="authorBio"
              value={formData.authorBio}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="Brief author biography"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-1">Content (HTML) *</label>
            <textarea
              name="contentHtml"
              value={formData.contentHtml}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)] font-mono text-sm"
              placeholder="<p>Write your article content in HTML...</p>"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Image Alt */}
          <div>
            <label className="block text-sm font-semibold mb-1">Image Alt Text</label>
            <input
              type="text"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="Descriptive alt text for image"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:border-[var(--color-green)]"
              placeholder="tech, AI, innovation"
            />
          </div>

          {/* Status Flags */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 accent-[var(--color-green)]"
              />
              ⭐ Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isBreaking"
                checked={formData.isBreaking}
                onChange={handleChange}
                className="w-4 h-4 accent-red-500"
              />
              🔴 Breaking News
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="w-4 h-4 accent-orange-500"
              />
              🔥 Trending
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[var(--color-green)] text-white rounded-full font-semibold hover:bg-[var(--color-green-deep)] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Article'}
            </button>
            <Link
              href="/admin/news"
              className="px-6 py-2.5 border border-[var(--color-line)] rounded-full font-semibold hover:bg-[var(--color-paper)] transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}