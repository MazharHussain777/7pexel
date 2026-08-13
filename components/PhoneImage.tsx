// components/PhoneImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface PhoneImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function PhoneImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fill,
  sizes,
  priority 
}: PhoneImageProps) {
  const [error, setError] = useState(false);

  // If image failed or is missing, use placeholder
  const imageSrc = error || !src ? "/images/phone-placeholder.png" : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}