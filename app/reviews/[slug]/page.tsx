// app/reviews/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { NewsletterSidebar } from "@/components/NewsletterSidebar";
import { ArticleComments } from "@/components/ArticleComments";

interface Review {
  id: number;
  title: string;
  category: string;
  rating: number;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  pros: string[];
  cons: string[];
  price: string;
  verdict: string;
  slug: string;
  fullReview?: string;
}

// All reviews data
const reviewsData: Review[] = [
  {
    id: 1,
    title: "Sony WH-1000XM6: The Best Noise-Canceling Headphones?",
    category: "Audio",
    rating: 4.8,
    author: "David Kim",
    date: "July 7, 2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    excerpt: "Sony's latest flagship headphones deliver exceptional audio quality and industry-leading noise cancellation.",
    pros: ["Excellent sound quality", "Industry-leading ANC", "40-hour battery life", "Comfortable design"],
    cons: ["Premium price", "No EQ customization", "Bulky case"],
    price: "$399",
    verdict: "The Sony WH-1000XM6 sets a new standard for wireless noise-canceling headphones.",
    slug: "sony-wh-1000xm6-review",
    fullReview: `
      <p>The Sony WH-1000XM6 is the latest iteration of Sony's legendary noise-canceling headphones. Building on the success of the WH-1000XM5, the new model brings significant improvements in noise cancellation, sound quality, and comfort.</p>
      
      <h2>Design and Build Quality</h2>
      <p>The headphones feature a refined design with premium materials. The headband is well-padded, and the ear cups are comfortable for extended listening sessions. The folding mechanism is sturdy and compact for travel.</p>
      
      <h2>Sound Performance</h2>
      <p>The sound signature is well-balanced with detailed highs, clear mids, and punchy bass. The new DSEE Extreme upscaling technology enhances compressed audio, while the LDAC codec supports high-resolution wireless streaming.</p>
      
      <h2>Noise Cancellation</h2>
      <p>The industry-leading ANC has been further improved with new AI-powered algorithms that adapt to your environment. The headphones effectively block out ambient noise, making them perfect for commuting, flying, or working in noisy environments.</p>
      
      <h2>Battery Life</h2>
      <p>With up to 40 hours of battery life with ANC on, the WH-1000XM6 offers excellent endurance. Quick charging gives you 5 hours of playback from just a 10-minute charge.</p>
    `,
  },
  {
    id: 2,
    title: "Samsung Galaxy Z Fold 7: The Ultimate Foldable Experience",
    category: "Phones",
    rating: 4.6,
    author: "Mike Chen",
    date: "July 9, 2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt: "Samsung's latest foldable smartphone pushes the boundaries of mobile technology.",
    pros: ["Stunning display", "Great multitasking", "Premium build", "Improved durability"],
    cons: ["Heavy", "Expensive", "Battery life could be better"],
    price: "$1,899",
    verdict: "The Galaxy Z Fold 7 is the most refined foldable phone Samsung has ever made.",
    slug: "samsung-galaxy-z-fold-7-review",
    fullReview: `
      <p>Samsung has once again raised the bar for foldable smartphones with the Galaxy Z Fold 7. This device represents the pinnacle of Samsung's engineering and design capabilities, offering a truly premium foldable experience.</p>
      
      <h2>Display and Design</h2>
      <p>The Z Fold 7 features a stunning 7.8-inch foldable AMOLED display with a 120Hz refresh rate. The new hinge design is smoother and more durable, while the overall build quality is exceptional.</p>
      
      <h2>Performance</h2>
      <p>Powered by the Snapdragon 8 Gen 4 processor with 16GB of RAM, the Z Fold 7 handles multitasking with ease. Whether you're gaming, streaming, or working, performance is consistently smooth.</p>
    `,
  },
  {
    id: 3,
    title: "Apple Vision Pro 2: The Future of Spatial Computing",
    category: "AR/VR",
    rating: 4.5,
    author: "Alex Rivera",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    excerpt: "Apple's second-generation Vision Pro headset pushes the boundaries of mixed reality.",
    pros: ["Incredible display quality", "Smooth performance", "Great ecosystem integration"],
    cons: ["Very expensive", "Limited content", "Heavy for long use"],
    price: "$3,499",
    verdict: "The Vision Pro 2 is the most advanced consumer AR/VR device ever created.",
    slug: "apple-vision-pro-2-review",
    fullReview: `
      <p>Apple has refined its spatial computing platform with the Vision Pro 2, delivering an even more immersive and capable mixed reality experience.</p>
      
      <h2>Visual Experience</h2>
      <p>The dual 4K OLED displays offer stunning clarity and color accuracy. The new optical system provides a wider field of view and reduced distortion.</p>
      
      <h2>Performance</h2>
      <p>The R2 chip delivers smooth performance with reduced latency and improved efficiency.</p>
    `,
  },
  {
    id: 4,
    title: "Google Pixel 9 Pro: AI-Powered Photography",
    category: "Phones",
    rating: 4.4,
    author: "Sarah Johnson",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    excerpt: "Google's latest flagship phone delivers exceptional camera performance powered by AI.",
    pros: ["Best camera in its class", "Clean Android experience", "Great AI features"],
    cons: ["Average battery life", "Slow charging", "Limited storage options"],
    price: "$999",
    verdict: "The Pixel 9 Pro is the best Android phone for photography enthusiasts.",
    slug: "google-pixel-9-pro-review",
    fullReview: `
      <p>Google continues to dominate the smartphone photography space with the Pixel 9 Pro. The AI-powered camera system delivers stunning results in any lighting condition.</p>
      
      <h2>Camera System</h2>
      <p>The 50MP main sensor, combined with Google's computational photography magic, produces photos that rival professional cameras.</p>
    `,
  },
  {
    id: 5,
    title: "Tesla Model 3 2026: Electric Perfection",
    category: "Automotive",
    rating: 4.3,
    author: "James Wilson",
    date: "July 18, 2026",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    excerpt: "Tesla's refreshed Model 3 sets new standards for electric vehicles.",
    pros: ["Great range", "Fast acceleration", "Excellent tech features"],
    cons: ["Build quality issues", "Expensive repairs", "Limited service centers"],
    price: "$45,000",
    verdict: "The Model 3 remains one of the best EVs you can buy.",
    slug: "tesla-model-3-2026-review",
    fullReview: `
      <p>Tesla's Model 3 has been refreshed for 2026 with improved range, updated styling, and enhanced technology features.</p>
      
      <h2>Performance and Range</h2>
      <p>With up to 400 miles of range and 0-60 mph in 3.1 seconds, the Model 3 delivers exhilarating performance.</p>
    `,
  },
  {
    id: 6,
    title: "OpenAI GPT-5: A New Era of AI",
    category: "AI",
    rating: 4.9,
    author: "Maya Chen",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    excerpt: "OpenAI's latest model demonstrates unprecedented reasoning capabilities.",
    pros: ["Human-level reasoning", "Multimodal understanding", "Fast inference"],
    cons: ["Still limited access", "High cost for API", "Potential misuse concerns"],
    price: "Subscription",
    verdict: "GPT-5 is a quantum leap in artificial intelligence.",
    slug: "openai-gpt-5-review",
    fullReview: `
      <p>OpenAI has achieved a remarkable milestone with GPT-5, delivering an AI model that demonstrates capabilities previously thought to be years away.</p>
      
      <h2>Intelligence and Reasoning</h2>
      <p>GPT-5 excels at complex reasoning tasks, solving problems that require deep understanding and analysis.</p>
    `,
  },
];

export default function ReviewDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the review by slug - case insensitive
    const found = reviewsData.find(r => 
      r.slug.toLowerCase() === slug.toLowerCase()
    );
    setReview(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-[#7F011F]/40" />
          <p className="text-[#6d4a4a] mt-4">Loading review...</p>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-[#fbf8ff]">
        <Header />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-6">
            <i className="fas fa-star text-4xl text-[#7F011F]/40" />
          </div>
          <h1 className="text-3xl font-bold text-[#2d1a1a] mb-4">Review Not Found</h1>
          <p className="text-[#6d4a4a] mb-8 max-w-md mx-auto">
            The review you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-4 rounded-2xl hover:bg-[#a80a30] transition-colors shadow-lg shadow-[#7F011F]/30"
            >
              <i className="fas fa-arrow-left" />
              Browse All Reviews
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white border border-[rgba(127,1,31,0.2)] text-[#2d1a1a] px-8 py-4 rounded-2xl hover:bg-[#f5ebd0] transition-colors"
            >
              <i className="fas fa-home" />
              Go Home
            </Link>
          </div>
          {/* Show available reviews */}
          <div className="mt-8 text-left max-w-md mx-auto">
            <p className="text-sm font-semibold text-[#2d1a1a] mb-2">Available reviews:</p>
            <ul className="space-y-1">
              {reviewsData.map(r => (
                <li key={r.id}>
                  <Link 
                    href={`/reviews/${r.slug}`}
                    className="text-sm text-[#7F011F] hover:underline"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star text-[#FFD700] text-sm" />
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt text-[#FFD700] text-sm" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star text-[#FFD700] text-sm" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6d4a4a] mb-6">
          <Link href="/" className="hover:text-[#7F011F] transition-colors">
            <i className="fas fa-home" />
          </Link>
          <i className="fas fa-chevron-right text-[10px]" />
          <Link href="/reviews" className="hover:text-[#7F011F] transition-colors">
            Reviews
          </Link>
          <i className="fas fa-chevron-right text-[10px]" />
          <span className="text-[#7F011F] font-medium truncate max-w-[200px] md:max-w-none">
            {review.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link
                  href={`/reviews?category=${review.category}`}
                  className="bg-[#7F011F] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#a80a30] transition-colors"
                >
                  {review.category}
                </Link>
                <span className="bg-[#FFD700]/20 text-[#2d1a1a] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <i className="fas fa-tag" />
                  {review.price}
                </span>
              </div>

              {/* Optimized Title - Same as News page */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#2d1a1a] leading-tight font-['Poppins',sans-serif] mb-3 max-w-4xl">
                {review.title}
              </h1>

              {/* Meta Info - Colorful pills like News page */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 bg-[#7F011F]/5 px-3 py-1.5 rounded-full border border-[#7F011F]/10">
                  <i className="fas fa-star text-[#FFD700] text-xs" />
                  <span className="text-[#7F011F] font-medium">{review.rating.toFixed(1)} / 5</span>
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <i className="far fa-calendar-alt text-emerald-600 text-xs" />
                  <span className="text-emerald-700 font-medium">{review.date}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                  <i className="far fa-user text-purple-600 text-xs" />
                  <span className="text-purple-700 font-medium">{review.author}</span>
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-[3px] overflow-hidden mb-6">
              <Image
                src={review.image}
                alt={review.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Rating Summary */}
            <div className="bg-gradient-to-r from-[#f5ebd0]/30 to-[#fbf8ff] rounded-[3px] p-6 mb-8 border border-[rgba(127,1,31,0.06)]">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#2d1a1a]">{review.rating.toFixed(1)}</div>
                    <div className="text-xs text-[#6d4a4a]">Overall Rating</div>
                  </div>
                  <div className="w-px h-12 bg-[rgba(127,1,31,0.1)]" />
                  <div>
                    <div className="flex gap-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="text-xs text-[#6d4a4a]">Based on expert review</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#2d1a1a]">{review.verdict}</div>
                </div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#00A86B]/5 rounded-[3px] p-6 border border-[#00A86B]/20">
                <h3 className="font-bold text-[#00A86B] text-lg mb-3 flex items-center gap-2">
                  <i className="fas fa-check-circle" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#2d1a1a]">
                      <span className="text-[#00A86B] mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FF4444]/5 rounded-[3px] p-6 border border-[#FF4444]/20">
                <h3 className="font-bold text-[#FF4444] text-lg mb-3 flex items-center gap-2">
                  <i className="fas fa-times-circle" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {review.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#2d1a1a]">
                      <span className="text-[#FF4444] mt-0.5">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Review Content */}
            {review.fullReview && (
              <div 
                className="prose prose-lg max-w-none font-['Poppins',sans-serif] article-content text-[#2d1a1a]"
                dangerouslySetInnerHTML={{ __html: review.fullReview }}
              />
            )}

            {/* Comments - Imported from separate file */}
            <div className="mt-8">
              <ArticleComments articleId={review.id} />
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-[rgba(127,1,31,0.06)]">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6d4a4a] font-medium">Share this review:</span>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors flex items-center justify-center">
                  <i className="fab fa-twitter" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors flex items-center justify-center">
                  <i className="fab fa-facebook-f" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center">
                  <i className="fab fa-linkedin-in" />
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <NewsletterSidebar />

            {/* Similar Reviews */}
            <div className="bg-white rounded-[3px] p-6 border border-[rgba(127,1,31,0.06)]">
              <h3 className="text-lg font-bold text-[#2d1a1a] mb-4 font-['Poppins',sans-serif] flex items-center gap-2">
                <i className="fas fa-link text-[#7F011F]" />
                Similar Reviews
              </h3>
              <div className="space-y-3">
                {reviewsData
                  .filter(r => r.id !== review.id && r.category === review.category)
                  .slice(0, 3)
                  .map((similar) => (
                    <Link
                      key={similar.id}
                      href={`/reviews/${similar.slug}`}
                      className="group flex gap-3 hover:bg-[#f5ebd0]/20 p-2 rounded-[3px] transition-all -mx-2"
                    >
                      <div className="relative w-16 h-16 rounded-[3px] overflow-hidden flex-shrink-0">
                        <Image
                          src={similar.image}
                          alt={similar.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#7F011F]">
                          {similar.category}
                        </div>
                        <h4 className="text-sm font-semibold text-[#2d1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-2 font-['Poppins',sans-serif]">
                          {similar.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(similar.rating)}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Back to Reviews */}
        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm text-[#6d4a4a] hover:text-[#7F011F] transition-colors font-['Poppins',sans-serif]"
          >
            <i className="fas fa-arrow-left" />
            Back to All Reviews
          </Link>
        </div>
      </main>
    </div>
  );
}