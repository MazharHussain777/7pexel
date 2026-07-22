// components/PostGrid.tsx
"use client";

const posts = [
  {
    id: 1,
    category: "AI",
    title: "OpenAI's next move: what we know so far",
    author: "Maya Chen",
    date: "Jun 28, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Phones",
    title: "iPhone 17 Pro: all the leaks in one place",
    author: "Alex Rivera",
    date: "Jun 26, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    category: "Wearables",
    title: "The best smartwatches for fitness in 2026",
    author: "Sam Taylor",
    date: "Jun 24, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    category: "Laptops",
    title: "M4 MacBook Air vs. Windows Copilot+ PCs",
    author: "Jordan Lee",
    date: "Jun 22, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    category: "Gaming",
    title: "PlayStation 6: specs, price, and release date",
    author: "Chris Park",
    date: "Jun 20, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    category: "Photography",
    title: "Sony A7 VI vs. Canon R6 III: which to buy?",
    author: "Nina Patel",
    date: "Jun 18, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    featured: false,
  },
];

export function PostGrid() {
  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#2d1a1a] font-['Poppins',sans-serif]">
            Latest Articles
          </h2>
          <p className="text-[#6d4a4a] mt-1 text-sm">Fresh tech stories and insights</p>
        </div>
        <a href="#" className="text-sm font-medium text-[#7F011F] hover:text-[#a80a30] flex items-center gap-2 transition-colors">
          View all <i className="fas fa-arrow-right text-xs" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl border border-[#7F011F]/10 transition-all duration-300 cursor-pointer"
          >
            {/* Large Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Category */}
              <div className="absolute top-4 left-4 bg-white/95 text-[#2d1a1a] text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-sm">
                {post.category}
              </div>

              {/* Read Time */}
              <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-[3px] flex items-center gap-1">
                <i className="far fa-clock" /> {post.readTime}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-semibold text-[17px] leading-tight text-[#2d1a1a] line-clamp-3 group-hover:text-[#7F011F] transition-colors">
                {post.title}
              </h3>

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#7F011F]/10 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7F011F] to-[#c94a6a] flex items-center justify-center text-white text-xs font-bold">
                    {post.author[0]}
                  </div>
                  <div className="text-[#2d1a1a]">{post.author}</div>
                </div>

                <div className="text-[#6d4a4a] text-xs">
                  {post.date}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-[#7F011F] hover:bg-[#a80a30] text-white px-8 py-3.5 rounded-[3px] text-sm font-semibold transition-all active:scale-95 flex items-center gap-2 mx-auto">
          <i className="fas fa-sync-alt" />
          Load more articles
        </button>
      </div>
    </div>
  );
}