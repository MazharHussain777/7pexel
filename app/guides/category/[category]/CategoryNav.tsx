// app/guides/category/[category]/CategoryNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  count: number;
  newCount: number;
  href: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export function CategoryNav({ currentCategoryId }: { currentCategoryId: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/guides/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <span className="text-[0.7rem] text-[var(--color-ink-soft)]">Loading...</span>;
  }

  return (
    <>
      {categories.map((c) => (
        <Link
          key={c._id || c.id}
          href={`/guides/category/${c.slug}`}
          className={`px-4 py-2 rounded-full border-[1.5px] text-[0.78rem] font-semibold transition-all ${
            c.id === currentCategoryId || c.slug === currentCategoryId
              ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
              : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
          }`}
        >
          {c.icon} {c.name}
        </Link>
      ))}
    </>
  );
}