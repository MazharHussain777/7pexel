// lib/phone-service.ts
import dbConnect from './mongodb';
import Phone, { IPhone } from '@/models/Phone';

// ─── TYPES ──────────────────────────────────────────────

export interface PhoneFilters {
  brand?: string;
  category?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'year' | 'price' | 'newest';
}

export interface PhoneStats {
  total: number;
  published: number;
  featured: number;
  trending: number;
  brands: number;
  categories: string[];
}

// ─── CREATE ─────────────────────────────────────────────

export async function createPhone(data: Partial<IPhone>): Promise<IPhone> {
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
  
  const phone = new Phone(data);
  return await phone.save();
}

export async function createPhonesBatch(phones: Partial<IPhone>[]): Promise<IPhone[]> {
  await dbConnect();
  const results = await Promise.all(
    phones.map(async (data) => {
      if (!data.slug && data.brand && data.model) {
        data.slug = `${data.brand}-${data.model}`.toLowerCase().replace(/\s+/g, '-');
      }
      if (!data.id && data.slug) data.id = data.slug;
      return data;
    })
  );
  return await Phone.insertMany(results);
}

// ─── READ ──────────────────────────────────────────────

export async function getPhoneBySlug(slug: string): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOne({ slug, published: true }).lean();
}

export async function getPhoneById(id: string): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOne({ id, published: true }).lean();
}

export async function getPhoneByBrandAndModel(brand: string, model: string): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOne({ brand, model, published: true }).lean();
}

export async function getAllPhones(options: PhoneFilters = {}): Promise<{
  data: IPhone[];
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
    case 'rating': sortOptions.rating = -1; break;
    case 'price': sortOptions.price = 1; break;
    case 'year': sortOptions.year = -1; break;
    case 'newest':
    default: sortOptions.date = -1; break;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Phone.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
    Phone.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBrands(): Promise<string[]> {
  await dbConnect();
  return await Phone.distinct('brand', { published: true });
}

export async function getPhoneStats(): Promise<PhoneStats> {
  await dbConnect();
  
  const [total, published, featured, trending, brands, categories] = await Promise.all([
    Phone.countDocuments({}),
    Phone.countDocuments({ published: true }),
    Phone.countDocuments({ published: true, isFeatured: true }),
    Phone.countDocuments({ published: true, isTrending: true }),
    Phone.distinct('brand', { published: true }),
    Phone.distinct('category', { published: true }),
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

export async function getFeaturedPhones(limit: number = 6): Promise<IPhone[]> {
  await dbConnect();
  return await Phone.find({ published: true, isFeatured: true })
    .sort({ rating: -1 })
    .limit(limit)
    .lean();
}

export async function getTrendingPhones(limit: number = 6): Promise<IPhone[]> {
  await dbConnect();
  return await Phone.find({ published: true, isTrending: true })
    .sort({ rating: -1 })
    .limit(limit)
    .lean();
}

export async function getLatestPhones(limit: number = 6): Promise<IPhone[]> {
  await dbConnect();
  return await Phone.find({ published: true })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
}

export async function getPhonesByBrand(brand: string, limit?: number): Promise<IPhone[]> {
  await dbConnect();
  const query = Phone.find({ brand, published: true }).sort({ year: -1 });
  if (limit) query.limit(limit);
  return await query.lean();
}

export async function getRelatedPhones(slug: string, limit: number = 4): Promise<IPhone[]> {
  await dbConnect();
  const current = await getPhoneBySlug(slug);
  if (!current) return [];

  const related = await Phone.find({
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
    const extra = await Phone.find({
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

export async function searchPhones(query: string, limit: number = 20): Promise<IPhone[]> {
  await dbConnect();
  return await Phone.find(
    { published: true, $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .lean();
}

export async function getBrandsWithCounts(): Promise<{ brand: string; count: number }[]> {
  await dbConnect();
  return await Phone.aggregate([
    { $match: { published: true } },
    { $group: { _id: '$brand', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { brand: '$_id', count: 1, _id: 0 } },
  ]);
}

// ─── UPDATE ─────────────────────────────────────────────

export async function updatePhone(
  slug: string,
  data: Partial<IPhone>
): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function updatePhoneById(
  id: string,
  data: Partial<IPhone>
): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOneAndUpdate(
    { id },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function updatePhoneRating(slug: string, rating: number): Promise<IPhone | null> {
  await dbConnect();
  return await Phone.findOneAndUpdate(
    { slug },
    { $set: { rating, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function togglePhoneFeatured(slug: string): Promise<IPhone | null> {
  await dbConnect();
  const phone = await Phone.findOne({ slug });
  if (!phone) return null;
  return await Phone.findOneAndUpdate(
    { slug },
    { $set: { isFeatured: !phone.isFeatured, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function togglePhoneTrending(slug: string): Promise<IPhone | null> {
  await dbConnect();
  const phone = await Phone.findOne({ slug });
  if (!phone) return null;
  return await Phone.findOneAndUpdate(
    { slug },
    { $set: { isTrending: !phone.isTrending, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function togglePhonePublished(slug: string): Promise<IPhone | null> {
  await dbConnect();
  const phone = await Phone.findOne({ slug });
  if (!phone) return null;
  return await Phone.findOneAndUpdate(
    { slug },
    { $set: { published: !phone.published, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function incrementPhoneViews(slug: string): Promise<void> {
  await dbConnect();
  await Phone.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } }
  );
}

// ─── DELETE ─────────────────────────────────────────────

export async function deletePhone(slug: string): Promise<boolean> {
  await dbConnect();
  const result = await Phone.deleteOne({ slug });
  return result.deletedCount > 0;
}

export async function deletePhoneById(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Phone.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function deletePhonesByBrand(brand: string): Promise<number> {
  await dbConnect();
  const result = await Phone.deleteMany({ brand });
  return result.deletedCount || 0;
}

export async function deleteAllPhones(): Promise<number> {
  await dbConnect();
  const result = await Phone.deleteMany({});
  return result.deletedCount || 0;
}

// ─── SEED ───────────────────────────────────────────────

export async function seedPhones(): Promise<IPhone[]> {
  await dbConnect();
  
  const count = await Phone.countDocuments();
  if (count > 0) {
    console.log('Phones already seeded, skipping...');
    return [];
  }
  
  const { phonesData } = await import('@/app/phones/finder/data/phone-db');
  const phones = Object.values(phonesData);
  const results = await createPhonesBatch(phones);
  console.log(`Seeded ${results.length} phones`);
  return results;
}