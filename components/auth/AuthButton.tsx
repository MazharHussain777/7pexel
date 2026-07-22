"use client";

import { useState } from "react";
import { AuthPopup } from "./AuthPopup";

interface AuthButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function AuthButton({ 
  variant = "primary", 
  size = "md",
  className = "",
  children,
  onSuccess 
}: AuthButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white hover:shadow-lg hover:shadow-[#7F011F]/30",
    outline: "border border-[#7F011F] text-[#7F011F] hover:bg-[#7F011F]/5",
    ghost: "text-[#6d4a4a] hover:text-[#7F011F] hover:bg-[#7F011F]/5",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {children || (
          <>
            <i className="fas fa-user-plus mr-2" />
            Join
          </>
        )}
      </button>

      <AuthPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}