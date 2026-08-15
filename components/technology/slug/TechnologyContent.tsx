// components/technology/slug/TechnologyContent.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TechnologyContentProps {
  content: string;
  customStyles?: string;
  tags?: string[];
}

// ─── COMPLETE ADVANCED STYLES ───────────────────────────
const articleStyles = `
  :root {
    --color-primary: #0A3F26;
    --color-primary-light: #12836B;
    --color-primary-dark: #05291A;
    --color-secondary: #D4F26B;
    --color-success: #1FA25A;
    --color-danger: #E53935;
    --color-warning: #F59E0B;
    --color-text: #1A2A1A;
    --color-text-soft: #4A5A4A;
    --color-text-muted: #6A7A6E;
    --color-border: #E0E8E0;
    --color-border-light: #EEF4F2;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-md: 0 8px 30px rgba(0,0,0,0.08);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --font-serif: 'Fraunces', serif;
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  .article-content {
    font-family: var(--font-sans);
    font-size: 1.05rem;
    line-height: 1.85;
    color: var(--color-text);
  }

  .article-content a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1.5px;
    text-decoration-color: rgba(10,63,38,0.25);
    transition: all 0.2s ease;
  }

  .article-content a:hover {
    text-decoration-color: var(--color-primary);
    color: var(--color-primary-dark);
  }

  .article-content p {
    margin-bottom: 1.25rem;
    line-height: 1.85;
    color: var(--color-text);
  }

  .article-content h1 {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 2.4rem;
    margin-top: 3rem;
    margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
    color: var(--color-primary-dark);
    line-height: 1.2;
  }

  .article-content h2 {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.9rem;
    margin-top: 2.8rem;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
    color: var(--color-primary);
    line-height: 1.25;
    position: relative;
    padding-bottom: 0.6rem;
    border-bottom: 3px solid var(--color-border-light);
  }

  .article-content h2::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--color-secondary);
    border-radius: 2px;
  }

  .article-content h3 {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 0.8rem;
    letter-spacing: -0.01em;
    color: var(--color-primary);
    line-height: 1.3;
  }

  .article-content h4 {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    margin-bottom: 0.6rem;
    color: var(--color-primary);
    line-height: 1.3;
  }

  .article-content ul, .article-content ol {
    margin: 0.5rem 0 1.2rem 1.5rem;
    padding-left: 0.5rem;
  }

  .article-content ul li, .article-content ol li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
    color: var(--color-text);
  }

  .article-content blockquote {
    border-left: 4px solid var(--color-primary);
    padding: 0.8rem 1.5rem;
    margin: 1.5rem 0;
    background: #f5f8f5;
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    font-style: italic;
    color: var(--color-text-soft);
  }

  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    font-size: 0.95rem;
  }

  .article-content table thead th {
    padding: 0.85rem 1.2rem;
    text-align: left;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--color-primary);
    color: white;
  }

  .article-content table tbody td {
    padding: 0.75rem 1.2rem;
    border-bottom: 1px solid var(--color-border-light);
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .article-content table tbody tr:hover {
    background: #f8faf8;
  }

  .article-content .code-block, .article-content pre {
    background: #1a1a1a;
    color: #e0e0e0;
    padding: 1.25rem 1.5rem;
    border-radius: var(--radius-sm);
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.6;
    border: 1px solid #2a2a2a;
  }

  .article-content .code-block code, .article-content pre code {
    color: #d4f26b;
    font-family: var(--font-mono);
  }

  .article-content code {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    background: #f0f2f0;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    color: var(--color-primary);
  }

  .article-content .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .article-content .pros-box {
    background: #f0f7f2;
    padding: 1.5rem;
    border-radius: var(--radius-md);
    border-left: 4px solid #1FA25A;
    box-shadow: var(--shadow-sm);
  }

  .article-content .cons-box {
    background: #fdf0f0;
    padding: 1.5rem;
    border-radius: var(--radius-md);
    border-left: 4px solid #E53935;
    box-shadow: var(--shadow-sm);
  }

  .article-content .pros-box h3, .article-content .cons-box h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }

  .article-content .pros-box h3 { color: var(--color-primary); }
  .article-content .cons-box h3 { color: #c62828; }

  .article-content .pros-box ul, .article-content .cons-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article-content .pros-box ul li, .article-content .cons-box ul li {
    padding: 0.4rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    margin: 0;
    line-height: 1.5;
  }

  .article-content .pros-box ul li::before {
    content: "✅";
    flex-shrink: 0;
  }

  .article-content .cons-box ul li::before {
    content: "❌";
    flex-shrink: 0;
  }

  .article-content .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .article-content .spec-item {
    background: #f8faf8;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--color-border-light);
    transition: border-color 0.2s ease;
  }

  .article-content .spec-item:hover {
    border-color: var(--color-primary);
  }

  .article-content .spec-label {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  .article-content .spec-value {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .article-content .conclusion-box {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border-radius: var(--radius-md);
    padding: 2rem;
    color: white;
    margin: 2rem 0;
    box-shadow: var(--shadow-md);
  }

  .article-content .conclusion-box h3 {
    color: var(--color-secondary);
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
  }

  .article-content .conclusion-box p {
    color: rgba(255,255,255,0.9);
    margin-bottom: 0.8rem;
  }

  .article-content .step-card {
    background: white;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .article-content .step-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .article-content .step-card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .article-content .step-card h3 .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .article-content .tip-box {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    border-left: 4px solid var(--color-primary);
    background: #f0f7f2;
    padding: 0.75rem 1rem;
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    margin: 1.5rem 0;
  }

  .article-content .tip-box .tip-icon {
    font-size: 1.3rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .article-content .tip-box p {
    margin-bottom: 0;
    font-size: 0.95rem;
    color: var(--color-text-soft);
  }

  .article-content .key-takeaways {
    background: linear-gradient(135deg, #f0f7f3, #e3efe8);
    border-radius: var(--radius-md);
    padding: 1.5rem 2rem;
    margin: 1.5rem 0;
    border: 1px solid #c8dcd0;
  }

  .article-content .key-takeaways h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .article-content .key-takeaways ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article-content .key-takeaways ul li {
    padding: 0.4rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    margin: 0;
    line-height: 1.5;
  }

  .article-content .key-takeaways ul li::before {
    content: "✓";
    color: #1FA25A;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .article-content .faq-section {
    margin: 2rem 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .article-content .faq-item {
    border-bottom: 1px solid var(--color-border-light);
    padding: 0;
  }

  .article-content .faq-item:last-child {
    border-bottom: none;
  }

  .article-content .faq-question {
    padding: 1rem 1.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: var(--color-primary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    background: white;
    transition: background 0.2s ease;
  }

  .article-content .faq-question:hover {
    background: #f8faf8;
  }

  .article-content .faq-question::after {
    content: "+";
    font-size: 1.3rem;
    color: var(--color-primary);
    transition: transform 0.3s ease;
  }

  .article-content .faq-item.open .faq-question::after {
    content: "−";
  }

  .article-content .faq-answer {
    padding: 0 1.5rem 1.2rem 1.5rem;
    font-size: 0.95rem;
    color: var(--color-text-soft);
    line-height: 1.7;
    display: none;
    background: white;
  }

  .article-content .faq-item.open .faq-answer {
    display: block;
  }

  @media (max-width: 768px) {
    .article-content { font-size: 0.95rem; }
    .article-content h1 { font-size: 1.8rem; }
    .article-content h2 { font-size: 1.5rem; }
    .article-content h3 { font-size: 1.2rem; }
    .article-content .pros-cons-grid { grid-template-columns: 1fr; }
    .article-content .specs-grid { grid-template-columns: 1fr; }
    .article-content table { font-size: 0.8rem; }
    .article-content table thead th,
    .article-content table tbody td { padding: 0.5rem 0.8rem; }
  }
`;

export function TechnologyContent({ content, customStyles, tags }: TechnologyContentProps) {
  const [mounted, setMounted] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!mounted) {
    return <div className="min-h-[200px] animate-pulse bg-[#eef4f2] rounded-[12px]" />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: articleStyles + (customStyles || "") }} />
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content || "" }}
        onClick={(e) => {
          // Handle FAQ toggle clicks
          const target = e.target as HTMLElement;
          if (target.closest('.faq-question')) {
            const item = target.closest('.faq-item');
            if (item) {
              const index = Array.from(item.parentElement?.children || []).indexOf(item);
              toggleFaq(index);
            }
          }
        }}
      />
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-[#eef4f2]">
          {tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/technology?tag=${tag}`}
              className="px-3.5 py-1.5 rounded-full border-[1.5px] border-[#d8e2df] text-[0.75rem] font-medium text-[#4a6a5a] hover:border-[#033742] hover:text-[#033742] hover:bg-green-50 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}