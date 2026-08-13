// lib/guide-service.ts
import dbConnect from './mongodb';
import Guide, { IGuide } from '@/models/Guide';
import GuideCategory, { IGuideCategory } from '@/models/GuideCategory';
import { Types } from 'mongoose';

// ─── CATEGORY OPERATIONS ──────────────────────────────────

/**
 * Get all guide categories
 */
export async function getAllGuideCategories(): Promise<IGuideCategory[]> {
  await dbConnect();
  const categories = await GuideCategory.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return categories;
}

/**
 * Get a single category by slug
 */
export async function getGuideCategoryBySlug(slug: string): Promise<IGuideCategory | null> {
  await dbConnect();
  const category = await GuideCategory.findOne({ slug }).lean();
  return category;
}

/**
 * Create a new guide category
 */
export async function createGuideCategory(data: Partial<IGuideCategory>): Promise<IGuideCategory> {
  await dbConnect();
  
  // Generate href if not provided
  if (!data.href && data.slug) {
    data.href = `/guides/category/${data.slug}`;
  }
  
  // Generate metaTitle if not provided
  if (!data.metaTitle && data.name) {
    data.metaTitle = `${data.name} Buying Guides — Expert Reviews & Comparisons | 7pexel`;
  }
  
  // Generate metaDescription if not provided
  if (!data.metaDescription && data.name) {
    data.metaDescription = `Expert ${data.name.toLowerCase()} buying guides, reviews, and comparisons. Find the best ${data.name.toLowerCase()} with our comprehensive guides.`;
  }
  
  const category = new GuideCategory(data);
  await category.save();
  return category;
}

/**
 * Update a guide category
 */
export async function updateGuideCategory(
  slug: string,
  data: Partial<IGuideCategory>
): Promise<IGuideCategory | null> {
  await dbConnect();
  
  // If slug is being updated, update href
  if (data.slug && data.slug !== slug) {
    data.href = `/guides/category/${data.slug}`;
  }
  
  const category = await GuideCategory.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
  
  return category;
}

/**
 * Delete a guide category
 */
export async function deleteGuideCategory(slug: string): Promise<boolean> {
  await dbConnect();
  
  // Check if category has guides
  const guideCount = await Guide.countDocuments({ 
    categorySlug: slug,
    published: true 
  });
  
  if (guideCount > 0) {
    throw new Error(`Cannot delete category with ${guideCount} guides. Archive or reassign guides first.`);
  }
  
  const result = await GuideCategory.deleteOne({ slug });
  return result.deletedCount > 0;
}

/**
 * Seed default guide categories
 */
export async function seedGuideCategories(): Promise<IGuideCategory[]> {
  await dbConnect();
  
  const defaultCategories = [
    {
      name: 'Phones',
      slug: 'phones',
      icon: '📱',
      description: 'Expert smartphone buying guides covering every budget and use case.',
      color: '#1FA25A',
      gradient: 'from-[#0A3F26] via-[#1FA25A] to-[#0A3F26]',
      href: '/guides/category/phones',
      metaTitle: 'Phone Buying Guides — Expert Smartphone Guides & Reviews | 7pexel',
      metaDescription: 'Expert smartphone buying guides covering every budget and use case. Find the perfect phone with our comprehensive guides.',
      keywords: ['phone guides', 'smartphone guides', 'buying guides', 'iPhone guide', 'Galaxy guide'],
      order: 1,
    },
    {
      name: 'Laptops',
      slug: 'laptops',
      icon: '💻',
      description: 'Comprehensive laptop buying guides for work, gaming, and creative professionals.',
      color: '#4C7A1F',
      gradient: 'from-[#2F5233] via-[#4C7A1F] to-[#2F5233]',
      href: '/guides/category/laptops',
      metaTitle: 'Laptop Buying Guides — Expert Laptop Guides & Reviews | 7pexel',
      metaDescription: 'Expert laptop buying guides for work, gaming, and creative professionals. Find the best laptop with our comprehensive guides.',
      keywords: ['laptop guides', 'buying guides', 'MacBook guide', 'gaming laptop', 'work laptop'],
      order: 2,
    },
    {
      name: 'Auto',
      slug: 'auto',
      icon: '🚗',
      description: 'Expert car buying guides for every budget and lifestyle.',
      color: '#6E8F2B',
      gradient: 'from-[#2F5233] via-[#6E8F2B] to-[#2F5233]',
      href: '/guides/category/auto',
      metaTitle: 'Auto Buying Guides — Expert Car Guides & Reviews | 7pexel',
      metaDescription: 'Expert car buying guides for every budget and lifestyle. Find the best vehicle with our comprehensive guides.',
      keywords: ['auto guides', 'car buying guides', 'SUV guides', 'EV guides', 'truck guides'],
      order: 3,
    },
    {
      name: 'Technology',
      slug: 'technology',
      icon: '💡',
      description: 'Expert technology buying guides covering gadgets, smart home, and more.',
      color: '#12836B',
      gradient: 'from-[#0A3F26] via-[#12836B] to-[#0A3F26]',
      href: '/guides/category/technology',
      metaTitle: 'Tech Buying Guides — Expert Gadget & Tech Guides | 7pexel',
      metaDescription: 'Expert technology buying guides covering gadgets, smart home, and more. Find the best tech products with our guides.',
      keywords: ['tech guides', 'buying guides', 'gadget guides', 'smart home', 'wearables'],
      order: 4,
    },
  ];

  const createdCategories = [];
  for (const catData of defaultCategories) {
    const existing = await GuideCategory.findOne({ slug: catData.slug });
    if (!existing) {
      const category = new GuideCategory(catData);
      await category.save();
      createdCategories.push(category);
    } else {
      // Update existing category
      const updated = await GuideCategory.findOneAndUpdate(
        { slug: catData.slug },
        { $set: catData },
        { new: true }
      );
      if (updated) createdCategories.push(updated);
    }
  }

  return createdCategories;
}

// ─── GUIDE OPERATIONS ─────────────────────────────────────

/**
 * Get all guides with pagination
 */
export async function getAllGuides(
  options: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    trending?: boolean;
    tag?: string;
    search?: string;
  } = {}
): Promise<{ guides: IGuide[]; total: number }> {
  await dbConnect();
  
  const { page = 1, limit = 20, category, featured, trending, tag, search } = options;
  const query: any = { published: true };
  
  if (category) query.categorySlug = category;
  if (featured) query.isFeatured = true;
  if (trending) query.isTrending = true;
  if (tag) query.tags = tag;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }
  
  const skip = (page - 1) * limit;
  
  const [guides, total] = await Promise.all([
    Guide.find(query)
      .sort({ isFeatured: -1, date: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Guide.countDocuments(query),
  ]);
  
  return { guides, total };
}

/**
 * Get a single guide by slug
 */
export async function getGuideBySlug(slug: string): Promise<IGuide | null> {
  await dbConnect();
  const guide = await Guide.findOne({ slug, published: true }).lean();
  return guide;
}

/**
 * Get guides by category slug
 */
export async function getGuidesByCategory(categorySlug: string): Promise<IGuide[]> {
  await dbConnect();
  const guides = await Guide.find({ categorySlug, published: true })
    .sort({ isFeatured: -1, date: -1 })
    .lean();
  return guides;
}

/**
 * Get featured guides
 */
export async function getFeaturedGuides(limit: number = 4): Promise<IGuide[]> {
  await dbConnect();
  const guides = await Guide.find({ published: true, isFeatured: true })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  return guides;
}

/**
 * Get trending guides
 */
export async function getTrendingGuides(limit: number = 4): Promise<IGuide[]> {
  await dbConnect();
  const guides = await Guide.find({ published: true, isTrending: true })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  return guides;
}

/**
 * Get related guides (same category)
 */
export async function getRelatedGuides(
  slug: string,
  categorySlug: string,
  limit: number = 4
): Promise<IGuide[]> {
  await dbConnect();
  const guides = await Guide.find({
    categorySlug,
    slug: { $ne: slug },
    published: true,
  })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  return guides;
}

/**
 * Search guides
 */
export async function searchGuides(query: string): Promise<IGuide[]> {
  await dbConnect();
  const guides = await Guide.find({
    published: true,
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { excerpt: { $regex: query, $options: 'i' } },
      { tags: { $regex: query, $options: 'i' } },
      { categoryLabel: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
    ],
  })
    .sort({ date: -1 })
    .lean();
  return guides;
}

/**
 * Get all unique tags from guides
 */
export async function getAllGuideTags(): Promise<string[]> {
  await dbConnect();
  const result = await Guide.aggregate([
    { $match: { published: true } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags' } },
    { $sort: { _id: 1 } },
  ]);
  return result.map(item => item._id);
}

/**
 * Get guide statistics
 */
export async function getGuideStats(): Promise<{
  total: number;
  featured: number;
  categories: number;
  tags: number;
}> {
  await dbConnect();
  
  const [total, featured, tags] = await Promise.all([
    Guide.countDocuments({ published: true }),
    Guide.countDocuments({ published: true, isFeatured: true }),
    GuideCategory.countDocuments({ isActive: true }),
  ]);
  
  return {
    total,
    featured,
    categories: 0, // Will be replaced with actual categories count
    tags,
  };
}

/**
 * Create a new guide
 */
export async function createGuide(data: Partial<IGuide>): Promise<IGuide> {
  await dbConnect();
  
  // Validate required fields
  const requiredFields = ['title', 'excerpt', 'category', 'categorySlug', 'author', 'contentHtml'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Generate slug if not provided
  if (!data.slug && data.title) {
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Check if slug already exists
  if (data.slug) {
    const existing = await Guide.findOne({ slug: data.slug });
    if (existing) {
      throw new Error(`Guide with slug "${data.slug}" already exists`);
    }
  }
  
  // Get category info to populate category fields
  if (data.categorySlug) {
    const category = await GuideCategory.findOne({ slug: data.categorySlug });
    if (category) {
      data.categoryLabel = category.name;
      data.categoryIcon = category.icon;
      data.categoryDescription = category.description;
    }
  }
  
  const guide = new Guide(data);
  await guide.save();
  
  // Update category count
  if (data.categorySlug) {
    await GuideCategory.findOneAndUpdate(
      { slug: data.categorySlug },
      { $inc: { count: 1 } }
    );
  }
  
  return guide;
}

/**
 * Update a guide
 */
export async function updateGuide(
  slug: string,
  data: Partial<IGuide>
): Promise<IGuide | null> {
  await dbConnect();
  
  // If categorySlug is changing, update categoryLabel, categoryIcon, categoryDescription
  if (data.categorySlug) {
    const category = await GuideCategory.findOne({ slug: data.categorySlug });
    if (category) {
      data.categoryLabel = category.name;
      data.categoryIcon = category.icon;
      data.categoryDescription = category.description;
    }
  }
  
  const guide = await Guide.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
  
  return guide;
}

/**
 * Delete a guide
 */
export async function deleteGuide(slug: string): Promise<boolean> {
  await dbConnect();
  
  const guide = await Guide.findOne({ slug });
  if (!guide) {
    return false;
  }
  
  // Get category slug before deleting
  const categorySlug = guide.categorySlug;
  
  await Guide.deleteOne({ slug });
  
  // Update category count
  if (categorySlug) {
    await GuideCategory.findOneAndUpdate(
      { slug: categorySlug },
      { $inc: { count: -1 } }
    );
  }
  
  return true;
}

/**
 * Bulk seed guides (for migration)
 */
export async function seedGuides(guidesData: Partial<IGuide>[]): Promise<IGuide[]> {
  await dbConnect();
  
  const createdGuides = [];
  for (const guideData of guidesData) {
    try {
      // Check if guide already exists
      if (guideData.slug) {
        const existing = await Guide.findOne({ slug: guideData.slug });
        if (existing) {
          // Update existing
          const updated = await Guide.findOneAndUpdate(
            { slug: guideData.slug },
            { $set: guideData },
            { new: true }
          );
          if (updated) createdGuides.push(updated);
          continue;
        }
      }
      
      // Create new guide
      const guide = await createGuide(guideData);
      createdGuides.push(guide);
    } catch (error) {
      console.error(`Error seeding guide ${guideData.title}:`, error);
    }
  }
  
  return createdGuides;
}