"use client";

import { useEffect, useState, useRef } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract h2 and h3 headings from content
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g;
    const matches = [...content.matchAll(headingRegex)];
    
    const extracted = matches.map((match, index) => ({
      id: `heading-${index}`,
      text: match[2].replace(/<[^>]*>/g, '').trim(),
      level: parseInt(match[1]),
    }));
    
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;
    
    // Add IDs to actual headings in the DOM
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
      const headingElements = articleContent.querySelectorAll('h2, h3');
      headingElements.forEach((el, index) => {
        if (index < headings.length) {
          el.id = headings[index].id;
        }
      });
    }

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-100px 0px -400px 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div 
      ref={tocRef}
      className={`bg-[#f5ebd0]/20 rounded-[3px] p-6 mb-8 border border-[rgba(127,1,31,0.06)] ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#2d1a1a] flex items-center gap-2 font-['Poppins',sans-serif]">
          <i className="fas fa-list-ul text-[#7F011F]" />
          Table of Contents
        </h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-[#6d4a4a] hover:text-[#7F011F] transition-colors"
          aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`} />
        </button>
      </div>
      
      {!isCollapsed && (
        <ul className="space-y-1.5">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`text-sm transition-colors block py-1.5 px-2 rounded ${
                  activeId === heading.id
                    ? 'text-[#7F011F] font-medium bg-[#7F011F]/5'
                    : 'text-[#6d4a4a] hover:text-[#7F011F] hover:bg-[#f5ebd0]/30'
                } ${heading.level === 3 ? 'pl-6' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                    
                    // Update URL hash without scrolling
                    window.history.pushState(null, '', `#${heading.id}`);
                    setActiveId(heading.id);
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}