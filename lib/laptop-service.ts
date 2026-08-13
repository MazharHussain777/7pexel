// scripts/seed-laptops.ts
import dbConnect from '@/lib/mongodb';
import Laptop from '@/models/Laptop';
import LaptopCategory from '@/models/LaptopCategory';
import { laptopsData } from '@/app/laptops/finder/data/laptop-data';

async function seedLaptops() {
  await dbConnect();
  
  // Seed categories first
  const categories = [
    {
      id: 'gaming',
      slug: 'gaming',
      name: 'Gaming',
      icon: '🎮',
      description: 'High-performance gaming laptops with powerful GPUs and fast displays.',
      color: '#ff4444',
      gradient: 'from-[#1a1a1a] via-[#ff4444] to-[#1a1a1a]',
      href: '/laptops/category/gaming',
      metaTitle: 'Gaming Laptops — Best Gaming Laptops 2026 | 7pexel',
      metaDescription: 'Discover the best gaming laptops with powerful GPUs, high refresh rate displays, and premium performance.',
      keywords: ['gaming laptop', 'gaming PC', 'RTX', 'gaming performance'],
      isActive: true,
      order: 1,
    },
    {
      id: 'ultrabook',
      slug: 'ultrabook',
      name: 'Ultrabook',
      icon: '💻',
      description: 'Lightweight, portable laptops with excellent battery life and premium design.',
      color: '#0A3F6E',
      gradient: 'from-[#0A3F26] via-[#0A3F6E] to-[#0A3F26]',
      href: '/laptops/category/ultrabook',
      metaTitle: 'Ultrabooks — Best Lightweight Laptops 2026 | 7pexel',
      metaDescription: 'Discover the best ultrabooks with lightweight design, long battery life, and premium performance.',
      keywords: ['ultrabook', 'lightweight laptop', 'portable laptop', 'thin laptop'],
      isActive: true,
      order: 2,
    },
    {
      id: 'business',
      slug: 'business',
      name: 'Business',
      icon: '💼',
      description: 'Reliable business laptops with enterprise-grade security and productivity features.',
      color: '#1a1a1a',
      gradient: 'from-[#1a1a1a] via-[#444] to-[#1a1a1a]',
      href: '/laptops/category/business',
      metaTitle: 'Business Laptops — Best for Professionals 2026 | 7pexel',
      metaDescription: 'Discover the best business laptops with enterprise-grade security, durability, and productivity features.',
      keywords: ['business laptop', 'professional laptop', 'ThinkPad', 'enterprise laptop'],
      isActive: true,
      order: 3,
    },
    {
      id: 'creator',
      slug: 'creator',
      name: 'Creator',
      icon: '🎨',
      description: 'Powerful laptops for content creators with high-resolution displays and fast processors.',
      color: '#12836B',
      gradient: 'from-[#0A3F26] via-[#12836B] to-[#0A3F26]',
      href: '/laptops/category/creator',
      metaTitle: 'Creator Laptops — Best for Content Creators 2026 | 7pexel',
      metaDescription: 'Discover the best laptops for content creators with high-resolution displays, powerful processors, and great color accuracy.',
      keywords: ['creator laptop', 'content creation', 'video editing laptop', 'design laptop'],
      isActive: true,
      order: 4,
    },
  ];

  for (const cat of categories) {
    await LaptopCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    );
  }

  // Seed laptops
  for (const [slug, data] of Object.entries(laptopsData)) {
    await Laptop.findOneAndUpdate(
      { slug },
      { $set: { ...data, published: true, slug } },
      { upsert: true, new: true }
    );
  }

  console.log('✅ Laptops seeded successfully');
}

seedLaptops().catch(console.error);