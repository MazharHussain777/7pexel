// lib/auto-service.ts

// @ts-nocheck
import dbConnect from './mongodb';
import Auto, { IAuto } from '@/models/Auto';

// ─── TYPES ──────────────────────────────────────────────

export interface AutoFilters {
  brand?: string;
  category?: string;
  search?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  featured?: boolean;
  trending?: boolean;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'price' | 'year' | 'newest' | 'popular';
}

export interface AutoStats {
  total: number;
  published: number;
  featured: number;
  trending: number;
  brands: number;
  categories: string[];
}

// ─── CREATE ─────────────────────────────────────────────

export async function createAuto(data: Partial<IAuto>): Promise<IAuto> {
  await dbConnect();
  
  if (!data.slug && data.brand && data.model) {
    data.slug = `${data.brand}-${data.model}`.toLowerCase().replace(/\s+/g, '-');
  }
  if (!data.id && data.slug) data.id = data.slug;
  if (!data.published) data.published = true;
  if (!data.date) data.date = new Date();
  if (!data.readTime) data.readTime = '5 min read';
  if (!data.author) data.author = '7pexel Team';
  if (!data.authorAvatar) data.authorAvatar = '7P';
  if (!data.category) data.category = [];
  if (!data.colors) data.colors = [];
  if (!data.highlights) data.highlights = [];
  if (!data.pros) data.pros = [];
  if (!data.cons) data.cons = [];
  if (!data.views) data.views = 0;
  
  const auto = new Auto(data);
  return await auto.save();
}

export async function createAutosBatch(autos: Partial<IAuto>[]): Promise<IAuto[]> {
  await dbConnect();
  const results = await Promise.all(
    autos.map(async (data) => {
      if (!data.slug && data.brand && data.model) {
        data.slug = `${data.brand}-${data.model}`.toLowerCase().replace(/\s+/g, '-');
      }
      if (!data.id && data.slug) data.id = data.slug;
      return data;
    })
  );
  return await Auto.insertMany(results);
}

// ─── READ ──────────────────────────────────────────────

export async function getAutoBySlug(slug: string): Promise<IAuto | null> {
  await dbConnect();
  return await Auto.findOne({ slug, published: true }).lean();
}

export async function getAutoById(id: string): Promise<IAuto | null> {
  await dbConnect();
  return await Auto.findOne({ id, published: true }).lean();
}

export async function getAutoByBrandAndModel(brand: string, model: string): Promise<IAuto | null> {
  await dbConnect();
  return await Auto.findOne({ brand, model, published: true }).lean();
}

export async function getAllAutos(options: AutoFilters = {}): Promise<{
  data: IAuto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await dbConnect();
  
  const {
    brand,
    category,
    year,
    minPrice,
    maxPrice,
    minRating,
    featured,
    trending,
    search,
    page = 1,
    limit = 20,
    sort = 'newest'
  } = options;

  const query: any = { published: true };

  if (brand) query.brand = brand;
  if (category) query.category = { $in: [category] };
  if (year) query.year = year;
  if (featured) query.isFeatured = true;
  if (trending) query.isTrending = true;
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }
  if (minRating) query.rating = { $gte: minRating };

  if (search) {
    query.$text = { $search: search };
  }

  const sortOptions: any = {};
  switch (sort) {
    case 'rating':
      sortOptions.rating = -1;
      break;
    case 'price':
      sortOptions.price = 1;
      break;
    case 'year':
      sortOptions.year = -1;
      break;
    case 'popular':
      sortOptions.views = -1;
      break;
    case 'newest':
    default:
      sortOptions.date = -1;
      break;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Auto.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
    Auto.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getAutoBrands(): Promise<string[]> {
  await dbConnect();
  return await Auto.distinct('brand', { published: true });
}

export async function getAutoStats(): Promise<AutoStats> {
  await dbConnect();
  
  const [total, published, featured, trending, brands, categories] = await Promise.all([
    Auto.countDocuments({}),
    Auto.countDocuments({ published: true }),
    Auto.countDocuments({ published: true, isFeatured: true }),
    Auto.countDocuments({ published: true, isTrending: true }),
    Auto.distinct('brand', { published: true }),
    Auto.distinct('category', { published: true }),
  ]);

  return {
    total,
    published,
    featured,
    trending,
    brands: brands.length,
    categories: categories.flat(),
  };
}

export async function getFeaturedAutos(limit: number = 6): Promise<IAuto[]> {
  await dbConnect();
  return await Auto.find({ published: true, isFeatured: true })
    .sort({ rating: -1 })
    .limit(limit)
    .lean();
}

export async function getTrendingAutos(limit: number = 6): Promise<IAuto[]> {
  await dbConnect();
  return await Auto.find({ published: true, isTrending: true })
    .sort({ rating: -1 })
    .limit(limit)
    .lean();
}

export async function getLatestAutos(limit: number = 6): Promise<IAuto[]> {
  await dbConnect();
  return await Auto.find({ published: true })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
}

export async function getAutosByBrand(brand: string, limit?: number): Promise<IAuto[]> {
  await dbConnect();
  const query = Auto.find({ brand, published: true }).sort({ year: -1 });
  if (limit) query.limit(limit);
  return await query.lean();
}

export async function getRelatedAutos(slug: string, limit: number = 4): Promise<IAuto[]> {
  await dbConnect();
  const current = await getAutoBySlug(slug);
  if (!current) return [];

  const related = await Auto.find({
    published: true,
    slug: { $ne: slug },
    $or: [
      { brand: current.brand },
      { category: { $in: current.category || [] } },
    ],
  })
    .sort({ rating: -1 })
    .limit(limit)
    .lean();

  if (related.length < limit) {
    const extra = await Auto.find({
      published: true,
      slug: { $nin: [slug, ...related.map(r => r.slug)] },
    })
      .sort({ rating: -1 })
      .limit(limit - related.length)
      .lean();
    return [...related, ...extra];
  }

  return related;
}

export async function searchAutos(query: string, limit: number = 20): Promise<IAuto[]> {
  await dbConnect();
  return await Auto.find(
    { published: true, $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .lean();
}

export async function getAutoCategories(): Promise<string[]> {
  await dbConnect();
  const categories = await Auto.distinct('category', { published: true });
  return categories.flat().filter(Boolean);
}

// ─── UPDATE ─────────────────────────────────────────────

export async function updateAuto(
  slug: string,
  data: Partial<IAuto>
): Promise<IAuto | null> {
  await dbConnect();
  return await Auto.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function incrementAutoViews(slug: string): Promise<void> {
  await dbConnect();
  await Auto.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } }
  );
}

export async function updateAutoRating(slug: string, rating: number): Promise<IAuto | null> {
  await dbConnect();
  return await Auto.findOneAndUpdate(
    { slug },
    { $set: { rating, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function toggleAutoFeatured(slug: string): Promise<IAuto | null> {
  await dbConnect();
  const auto = await Auto.findOne({ slug });
  if (!auto) return null;
  return await Auto.findOneAndUpdate(
    { slug },
    { $set: { isFeatured: !auto.isFeatured, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function toggleAutoPublished(slug: string): Promise<IAuto | null> {
  await dbConnect();
  const auto = await Auto.findOne({ slug });
  if (!auto) return null;
  return await Auto.findOneAndUpdate(
    { slug },
    { $set: { published: !auto.published, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

// ─── DELETE ─────────────────────────────────────────────

export async function deleteAuto(slug: string): Promise<boolean> {
  await dbConnect();
  const result = await Auto.deleteOne({ slug });
  return result.deletedCount > 0;
}

export async function deleteAutosByBrand(brand: string): Promise<number> {
  await dbConnect();
  const result = await Auto.deleteMany({ brand });
  return result.deletedCount || 0;
}

// ─── SEED ───────────────────────────────────────────────

export async function seedAutos(): Promise<IAuto[]> {
  await dbConnect();
  
  const count = await Auto.countDocuments();
  if (count > 0) {
    console.log('Autos already seeded, skipping...');
    return [];
  }
  
  const { autosData } = await import('@/app/auto/data/autos-data');
  const results = await createAutosBatch(autosData);
  console.log(`Seeded ${results.length} autos`);
  return results;
}