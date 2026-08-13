"use client";

import { useState, useEffect, useRef } from "react";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthPopup({ isOpen, onClose, onSuccess }: AuthPopupProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Popup - No scrollbar, perfect fit */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
        <div
          ref={popupRef}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          style={{ height: "51vh", maxHeight: "460px", minHeight: "400px" }}
        >
          {/* Top accent bar - Mahogany */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#7F011F]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-700 z-10"
            aria-label="Close"
          >
            <i className="fas fa-times text-sm" />
          </button>

          {/* Content - No scroll needed */}
          <div className="h-full flex flex-col justify-center px-6 pb-4 pt-6">
            {/* Logo - Mahogany */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7F011F] flex items-center justify-center shadow-lg shadow-[#7F011F]/20">
                <span className="text-white text-xl font-extrabold font-['Poppins',sans-serif]">
                  7P
                </span>
              </div>
            </div>

            {/* Title - Black */}
            <h2 className="text-xl font-bold text-black text-center font-['Poppins',sans-serif]">
              {isLogin ? "Welcome Back" : "Join 7pexel"}
            </h2>
            <p className="text-xs text-gray-500 text-center mt-0.5">
              {isLogin ? "Sign in to continue" : "Create your free account"}
            </p>

            {/* Google Button - Clean */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2">
                <i className="fas fa-exclamation-circle" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all bg-white text-sm text-black placeholder:text-gray-400"
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all bg-white text-sm text-black placeholder:text-gray-400"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all bg-white text-sm text-black placeholder:text-gray-400"
                />
                {isLogin && (
                  <button
                    type="button"
                    className="text-[10px] text-gray-400 hover:text-[#7F011F] mt-1 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#7F011F] text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-[#7F011F]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin" />
                    {isLogin ? "Signing in..." : "Creating..."}
                  </span>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-xs text-gray-500 mt-3">
              {isLogin ? "New here?" : "Already a member?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="ml-1.5 text-[#7F011F] font-medium hover:underline transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>

            {/* Trust badges - Subtle */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-center gap-3 text-[9px] text-gray-400">
                <span className="flex items-center gap-1">
                  <i className="fas fa-lock text-[7px]" />
                  Secure
                </span>
                <span className="w-px h-3 bg-gray-200" />
                <span className="flex items-center gap-1">
                  <i className="fas fa-shield-alt text-[7px]" />
                  Privacy
                </span>
                <span className="w-px h-3 bg-gray-200" />
                <span className="flex items-center gap-1">
                  <i className="fas fa-check-circle text-[7px]" />
                  Trusted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-95 {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation-duration: 200ms;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
        .duration-200 {
          animation-duration: 200ms;
        }
        
        /* Hide scrollbar completely */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}