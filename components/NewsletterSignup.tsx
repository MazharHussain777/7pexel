// components/NewsletterSignup.tsx
"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setIsLoading(false);
    setEmail("");
    
    setTimeout(() => setSubscribed(false), 4000);
  };

  if (subscribed) {
    return (
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#7F011F] to-[#a80a30] rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-[#7F011F]/20">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-check text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold text-lg font-['Poppins',sans-serif]">You're Subscribed! 🎉</p>
            <p className="text-white/70 text-sm">Check your inbox for updates</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#7F011F] via-[#a80a30] to-[#c94a6a] rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-[#7F011F]/20">
      <div className="text-center mb-5">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-envelope text-white text-xl" />
        </div>
        <h3 className="text-xl font-bold font-['Poppins',sans-serif]">Subscribe to Newsletter</h3>
        <p className="text-white/70 text-sm mt-1">Get weekly tech updates in your inbox</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/95 text-[#2d1a1a] outline-none text-sm placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif] border-2 border-transparent focus:border-white/30 transition-all"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-[#7F011F] px-6 py-3 rounded-xl font-semibold hover:bg-[#f5ebd0] transition-all duration-300 text-sm font-['Poppins',sans-serif] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[130px]"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane text-xs" />
              Subscribe
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-white/50">
        <span className="flex items-center gap-1">
          <i className="fas fa-lock text-[8px]" />
          Secure
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1">
          <i className="fas fa-shield-alt text-[8px]" />
          No Spam
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1">
          <i className="fas fa-check-circle text-[8px]" />
          Unsubscribe Anytime
        </span>
      </div>
    </div>
  );
}