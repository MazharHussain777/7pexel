// lib/compare-service.ts

// @ts-nocheck
import dbConnect from './mongodb';
import Phone from '@/models/Phone';
import Laptop from '@/models/Laptop';
import Auto from '@/models/Auto';

// ─── TYPES ──────────────────────────────────────────────

export interface CompareItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'phones' | 'laptops' | 'auto';
  categoryLabel: string;
  categoryIcon: string;
  image: string;
  price: string;
  rating: number;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  description: string;
  source: 'phone' | 'laptop' | 'auto';
  originalId: string;
}

export interface CompareFilters {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'price' | 'name' | 'newest';
}

export interface CompareStats {
  total: number;
  categories: { category: string; count: number }[];
  brands: { brand: string; count: number }[];
  avgRating: number;
}

// ─── HELPERS ─────────────────────────────────────────────

function transformPhoneToCompareItem(phone: any): CompareItem {
  return {
    id: phone.slug || phone._id.toString(),
    slug: phone.slug,
    name: `${phone.brand} ${phone.model}`,
    brand: phone.brand,
    category: 'phones',
    categoryLabel: 'Phones',
    categoryIcon: '📱',
    image: phone.image || '/images/phones/default.jpg',
    price: phone.price || 'N/A',
    rating: phone.rating || 0,
    specs: {
      'Display': phone.display || 'N/A',
      'Processor': phone.chipset || 'N/A',
      'RAM': phone.ram || 'N/A',
      'Storage': phone.storage || 'N/A',
      'Camera': phone.camera || 'N/A',
      'Battery': phone.battery || 'N/A',
      'OS': phone.os || 'N/A',
      'Weight': phone.weight || 'N/A',
      'Year': phone.year || 'N/A',
    },
    pros: phone.pros || [],
    cons: phone.cons || [],
    description: phone.excerpt || `${phone.brand} ${phone.model} smartphone with advanced features.`,
    source: 'phone',
    originalId: phone._id.toString(),
  };
}

function transformLaptopToCompareItem(laptop: any): CompareItem {
  return {
    id: laptop.slug || laptop._id.toString(),
    slug: laptop.slug,
    name: `${laptop.brand} ${laptop.model}`,
    brand: laptop.brand,
    category: 'laptops',
    categoryLabel: 'Laptops',
    categoryIcon: '💻',
    image: laptop.image || '/images/laptops/default.jpg',
    price: laptop.price || 'N/A',
    rating: laptop.rating || 0,
    specs: {
      'Display': laptop.display || 'N/A',
      'Processor': laptop.processor || 'N/A',
      'RAM': laptop.ram || 'N/A',
      'Storage': laptop.storage || 'N/A',
      'Graphics': laptop.graphics || 'N/A',
      'Battery': laptop.battery || 'N/A',
      'OS': laptop.os || 'N/A',
      'Weight': laptop.weight || 'N/A',
      'Year': laptop.year || 'N/A',
    },
    pros: laptop.pros || [],
    cons: laptop.cons || [],
    description: laptop.excerpt || `${laptop.brand} ${laptop.model} laptop with powerful performance.`,
    source: 'laptop',
    originalId: laptop._id.toString(),
  };
}

function transformAutoToCompareItem(auto: any): CompareItem {
  return {
    id: auto.slug || auto._id.toString(),
    slug: auto.slug,
    name: `${auto.brand} ${auto.model}`,
    brand: auto.brand,
    category: 'auto',
    categoryLabel: 'Auto',
    categoryIcon: '🚗',
    image: auto.image || '/images/auto/default.jpg',
    price: auto.price || 'N/A',
    rating: auto.rating || 0,
    specs: {
      'Range': auto.range || 'N/A',
      '0-60 mph': auto.acceleration || 'N/A',
      'Top Speed': auto.topSpeed || 'N/A',
      'Battery': auto.battery || 'N/A',
      'Drivetrain': auto.drivetrain || 'N/A',
      'Seating': auto.seating || 'N/A',
      'Cargo': auto.cargo || 'N/A',
      'Charging': auto.charging || 'N/A',
      'Year': auto.year || 'N/A',
    },
    pros: auto.pros || [],
    cons: auto.cons || [],
    description: auto.excerpt || `${auto.brand} ${auto.model} vehicle with impressive features.`,
    source: 'auto',
    originalId: auto._id.toString(),
  };
}

// ─── FETCH FUNCTIONS ─────────────────────────────────────

export async function getAllCompareItems(filters: CompareFilters = {}): Promise<{
  data: CompareItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await dbConnect();
  
  const {
    category,
    brand,
    search,
    page = 1,
    limit = 20,
    sort = 'newest'
  } = filters;

  // Build queries for each collection
  const query: any = { published: true };
  if (brand) query.brand = brand;
  if (search) {
    query.$or = [
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } },
    ];
  }

  // Fetch from all three collections
  const [phones, laptops, autos] = await Promise.all([
    Phone.find(query).lean(),
    Laptop.find(query).lean(),
    Auto.find(query).lean(),
  ]);

  // Transform and combine
  let allItems: CompareItem[] = [
    ...phones.map(transformPhoneToCompareItem),
    ...laptops.map(transformLaptopToCompareItem),
    ...autos.map(transformAutoToCompareItem),
  ];

  // Filter by category if specified
  if (category && category !== 'all') {
    allItems = allItems.filter(item => item.category === category);
  }

  // Sort
  switch (sort) {
    case 'rating':
      allItems.sort((a, b) => b.rating - a.rating);
      break;
    case 'price':
      allItems.sort((a, b) => parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, '')));
      break;
    case 'name':
      allItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
    default:
      // Keep as is (already in order from DB)
      break;
  }

  // Pagination
  const total = allItems.length;
  const start = (page - 1) * limit;
  const paginated = allItems.slice(start, start + limit);

  return {
    data: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getCompareItemBySlug(slug: string): Promise<CompareItem | null> {
  await dbConnect();
  
  // Try to find in each collection
  const [phone, laptop, auto] = await Promise.all([
    Phone.findOne({ slug, published: true }).lean(),
    Laptop.findOne({ slug, published: true }).lean(),
    Auto.findOne({ slug, published: true }).lean(),
  ]);

  if (phone) return transformPhoneToCompareItem(phone);
  if (laptop) return transformLaptopToCompareItem(laptop);
  if (auto) return transformAutoToCompareItem(auto);
  
  return null;
}

export async function getCompareStats(): Promise<CompareStats> {
  await dbConnect();
  
  const [phones, laptops, autos] = await Promise.all([
    Phone.find({ published: true }).lean(),
    Laptop.find({ published: true }).lean(),
    Auto.find({ published: true }).lean(),
  ]);

  const allItems = [
    ...phones.map(transformPhoneToCompareItem),
    ...laptops.map(transformLaptopToCompareItem),
    ...autos.map(transformAutoToCompareItem),
  ];

  const categories = ['phones', 'laptops', 'auto'].map(cat => ({
    category: cat,
    count: allItems.filter(item => item.category === cat).length,
  }));

  const brands = [...new Set(allItems.map(item => item.brand))].map(brand => ({
    brand,
    count: allItems.filter(item => item.brand === brand).length,
  }));

  const avgRating = allItems.length > 0 
    ? allItems.reduce((sum, item) => sum + item.rating, 0) / allItems.length 
    : 0;

  return {
    total: allItems.length,
    categories: categories.filter(c => c.count > 0),
    brands: brands.filter(b => b.count > 0),
    avgRating,
  };
}

export async function getCompareCategories(): Promise<string[]> {
  await dbConnect();
  
  const [phones, laptops, autos] = await Promise.all([
    Phone.countDocuments({ published: true }),
    Laptop.countDocuments({ published: true }),
    Auto.countDocuments({ published: true }),
  ]);

  const categories = [];
  if (phones > 0) categories.push('phones');
  if (laptops > 0) categories.push('laptops');
  if (autos > 0) categories.push('auto');
  
  return categories;
}

export async function getCompareBrands(): Promise<string[]> {
  await dbConnect();
  
  const [phoneBrands, laptopBrands, autoBrands] = await Promise.all([
    Phone.distinct('brand', { published: true }),
    Laptop.distinct('brand', { published: true }),
    Auto.distinct('brand', { published: true }),
  ]);

  const allBrands = [...new Set([...phoneBrands, ...laptopBrands, ...autoBrands])];
  return allBrands.sort();
}

export async function getTopRatedCompareItems(limit: number = 6): Promise<CompareItem[]> {
  await dbConnect();
  
  const [phones, laptops, autos] = await Promise.all([
    Phone.find({ published: true }).sort({ rating: -1 }).limit(limit).lean(),
    Laptop.find({ published: true }).sort({ rating: -1 }).limit(limit).lean(),
    Auto.find({ published: true }).sort({ rating: -1 }).limit(limit).lean(),
  ]);

  const allItems = [
    ...phones.map(transformPhoneToCompareItem),
    ...laptops.map(transformLaptopToCompareItem),
    ...autos.map(transformAutoToCompareItem),
  ];

  return allItems.sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export async function getPopularCompareItems(limit: number = 6): Promise<CompareItem[]> {
  await dbConnect();
  
  const [phones, laptops, autos] = await Promise.all([
    Phone.find({ published: true }).sort({ views: -1 }).limit(limit).lean(),
    Laptop.find({ published: true }).sort({ views: -1 }).limit(limit).lean(),
    Auto.find({ published: true }).sort({ views: -1 }).limit(limit).lean(),
  ]);

  const allItems = [
    ...phones.map(transformPhoneToCompareItem),
    ...laptops.map(transformLaptopToCompareItem),
    ...autos.map(transformAutoToCompareItem),
  ];

  return allItems.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}

export async function searchCompareItems(query: string, limit: number = 20): Promise<CompareItem[]> {
  await dbConnect();
  
  const searchRegex = new RegExp(query, 'i');
  const searchQuery = {
    $or: [
      { brand: searchRegex },
      { model: searchRegex },
    ],
    published: true,
  };

  const [phones, laptops, autos] = await Promise.all([
    Phone.find(searchQuery).limit(limit).lean(),
    Laptop.find(searchQuery).limit(limit).lean(),
    Auto.find(searchQuery).limit(limit).lean(),
  ]);

  const allItems = [
    ...phones.map(transformPhoneToCompareItem),
    ...laptops.map(transformLaptopToCompareItem),
    ...autos.map(transformAutoToCompareItem),
  ];

  return allItems.slice(0, limit);
}

export async function getRelatedCompareItems(slug: string, limit: number = 4): Promise<CompareItem[]> {
  await dbConnect();
  
  const current = await getCompareItemBySlug(slug);
  if (!current) return [];

  // Find items in same category
  const query = { published: true };
  
  let related: any[] = [];
  
  if (current.category === 'phones') {
    related = await Phone.find({ 
      ...query, 
      slug: { $ne: slug },
      brand: current.brand,
    }).limit(limit).lean();
  } else if (current.category === 'laptops') {
    related = await Laptop.find({ 
      ...query, 
      slug: { $ne: slug },
      brand: current.brand,
    }).limit(limit).lean();
  } else if (current.category === 'auto') {
    related = await Auto.find({ 
      ...query, 
      slug: { $ne: slug },
      brand: current.brand,
    }).limit(limit).lean();
  }

  // If not enough, get top rated from same category
  if (related.length < limit) {
    let additional: any[] = [];
    if (current.category === 'phones') {
      additional = await Phone.find({ 
        ...query, 
        slug: { $ne: slug, $nin: related.map(r => r.slug) },
      }).sort({ rating: -1 }).limit(limit - related.length).lean();
    } else if (current.category === 'laptops') {
      additional = await Laptop.find({ 
        ...query, 
        slug: { $ne: slug, $nin: related.map(r => r.slug) },
      }).sort({ rating: -1 }).limit(limit - related.length).lean();
    } else if (current.category === 'auto') {
      additional = await Auto.find({ 
        ...query, 
        slug: { $ne: slug, $nin: related.map(r => r.slug) },
      }).sort({ rating: -1 }).limit(limit - related.length).lean();
    }
    related = [...related, ...additional];
  }

  // Transform to CompareItem format
  let transformFn: any;
  if (current.category === 'phones') {
    transformFn = transformPhoneToCompareItem;
  } else if (current.category === 'laptops') {
    transformFn = transformLaptopToCompareItem;
  } else {
    transformFn = transformAutoToCompareItem;
  }

  return related.map(transformFn).slice(0, limit);
}export async function updateCompareItem(slug, data) { return null; } export async function deleteCompareItem(slug) { return true; } export async function incrementCompareItemViews(slug) { return null; }
