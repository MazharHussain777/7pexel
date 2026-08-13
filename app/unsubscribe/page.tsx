// app/unsubscribe/page.tsx
"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />
      <main className="wrap py-20">
        <div className="max-w-md mx-auto bg-white rounded-[20px] border border-[var(--color-line)] p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-3">📧</span>
            <h1 className="font-fraunces font-medium text-2xl">Unsubscribe</h1>
            <p className="text-[var(--color-ink-soft)] text-sm mt-1">
              We're sorry to see you go. Enter your email to unsubscribe.
            </p>
          </div>

          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 rounded-full border-[1.5px] font-poppins text-[0.95rem] outline-none transition-all ${
                status === "error"
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-line)] focus:border-[var(--color-green)]"
              }`}
              disabled={status === "loading" || status === "success"}
              required
            />

            {message && (
              <p className={`text-sm text-center ${
                status === "error" ? "text-red-500" : "text-[var(--color-green)]"
              }`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`w-full py-3 rounded-full font-semibold text-[0.95rem] transition-all ${
                status === "loading"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : status === "success"
                  ? "bg-[var(--color-green)] text-white cursor-default"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {status === "loading" && "Processing..."}
              {status === "success" && "✓ Unsubscribed"}
              {status === "idle" && "Unsubscribe"}
              {status === "error" && "Try Again"}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 text-center">
              <Link href="/" className="text-[var(--color-green)] hover:underline text-sm font-semibold">
                ← Back to Home
              </Link>
            </div>
          )}

          {status !== "success" && (
            <p className="text-center text-[0.7rem] text-[var(--color-ink-soft)] mt-4">
              You can also reply to any email with "UNSUBSCRIBE" in the subject.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20"><div className="text-center"><div className="w-12 h-12 border-4 border-[#0F6B3E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-[var(--color-ink-soft)]">Loading...</p></div></div>}>
      <UnsubscribeContent />
    </Suspense>
  );
}