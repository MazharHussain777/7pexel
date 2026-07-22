// lib/blogData.ts
export interface BlogPost {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "AI",
    title: "OpenAI's next move: what we know so far",
    author: "Maya Chen",
    date: "Jun 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    excerpt: "Latest developments in AI technology and what to expect from OpenAI's next major release."
  },
  {
    id: 2,
    category: "Phones",
    title: "iPhone 17 Pro: all the leaks in one place",
    author: "Alex Rivera",
    date: "Jun 26, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt: "Everything we know about Apple's upcoming flagship phone including design, specs, and features."
  },
  {
    id: 3,
    category: "Wearables",
    title: "The best smartwatches for fitness in 2026",
    author: "Sam Taylor",
    date: "Jun 24, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    excerpt: "Top fitness smartwatches compared including features, battery life, and health tracking."
  },
  {
    id: 4,
    category: "Laptops",
    title: "M4 MacBook Air vs. Windows Copilot+ PCs",
    author: "Jordan Lee",
    date: "Jun 22, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    excerpt: "Comparing Apple's latest MacBook Air with Windows AI-powered laptops in performance and features."
  },
  {
    id: 5,
    category: "Gaming",
    title: "PlayStation 6: specs, price, and release date",
    author: "Chris Park",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
    excerpt: "What we know about Sony's next-gen PlayStation console including rumored specs and release timeline."
  },
  {
    id: 6,
    category: "Photography",
    title: "Sony A7 VI vs. Canon R6 III: which to buy?",
    author: "Nina Patel",
    date: "Jun 18, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    excerpt: "Head-to-head comparison of two premium mirrorless cameras for professional photographers."
  },
];