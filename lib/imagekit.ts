// lib/imagekit.ts
import ImageKit from 'imagekit';

// Check if credentials exist
const hasCredentials = !!(
  process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
);

// Server-side ImageKit instance (only if credentials exist)
export const imagekit = hasCredentials
  ? new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    })
  : null;

// Get ImageKit URL with transformations
export function getImageKitUrl(
  path: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    crop?: string;
  }
): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  // If no ImageKit URL or path is already a full URL, return as-is
  if (!baseUrl || path.startsWith('http')) {
    return path;
  }

  let url = baseUrl;

  if (options) {
    const transformations: string[] = [];
    if (options.width) transformations.push(`w-${options.width}`);
    if (options.height) transformations.push(`h-${options.height}`);
    if (options.quality) transformations.push(`q-${options.quality}`);
    if (options.format) transformations.push(`f-${options.format}`);
    if (options.crop) transformations.push(`c-${options.crop}`);

    if (transformations.length > 0) {
      url += `/tr:${transformations.join(',')}`;
    }
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  url += cleanPath;

  return url;
}

// Get phone image URL
export function getPhoneImage(
  brand: string,
  model: string,
  options?: { width?: number; height?: number; quality?: number }
): string {
  const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = model
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const path = `/phones/${brandSlug}/${modelSlug}.jpg`;

  // Check if ImageKit is configured
  if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    // Fallback to local path
    return path;
  }

  return getImageKitUrl(path, options);
}

// Check if ImageKit is available
export const isImageKitAvailable = hasCredentials;