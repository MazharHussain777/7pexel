// app/api/get-all-urls/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer, isSupabaseAvailable } from '@/lib/supabase/server';
import { STATIC_PHONES } from '@/app/phones/finder/data/static-phone-data';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const urls: string[] = [];

  // Static pages
  const staticPages = [
    '',
    '/phones',
    '/phones/finder',
    '/compare',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  for (const page of staticPages) {
    urls.push(`${baseUrl}${page}`);
  }

  // Phone pages
  let phones = [];
  try {
    if (isSupabaseAvailable && supabaseServer) {
      const { data } = await supabaseServer
        .from('phones')
        .select('slug')
        .eq('published', true);
      if (data) phones = data;
    }
  } catch (error) {
    console.error('Error fetching phones:', error);
  }

  if (phones.length === 0) {
    phones = STATIC_PHONES.map(p => ({ slug: p.slug }));
  }

  for (const phone of phones) {
    urls.push(`${baseUrl}/phones/finder/${phone.slug}`);
  }

  // Comparison pages (top 50)
  const topPhones = phones.slice(0, 20);
  let compareCount = 0;
  const maxCompare = 50;

  for (let i = 0; i < topPhones.length && compareCount < maxCompare; i++) {
    for (let j = i + 1; j < topPhones.length && compareCount < maxCompare; j++) {
      const p1 = topPhones[i];
      const p2 = topPhones[j];
      if (p1 && p2 && p1.slug !== p2.slug) {
        urls.push(`${baseUrl}/compare/${p1.slug}-vs-${p2.slug}`);
        compareCount++;
      }
    }
  }

  return NextResponse.json({
    total: urls.length,
    urls,
  });
}