// lib/category-service.ts
import dbConnect from './mongodb';
import Category, { ICategory } from '@/models/Category';
import { ObjectId } from 'mongodb';

// Get all categories
export async function getAllCategories(): Promise<ICategory[]> {
  await dbConnect();
  return await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await dbConnect();
  return await Category.findOne({ slug }).lean();
}

// Get category by ID
export async function getCategoryById(id: string): Promise<ICategory | null> {
  await dbConnect();
  return await Category.findById(id).lean();
}

// Create new category
export async function createCategory(data: Partial<ICategory>): Promise<ICategory> {
  await dbConnect();
  
  // Generate href if not provided
  if (!data.href && data.slug) {
    data.href = `/reviews/category/${data.slug}`;
  }
  
  // Generate metaTitle if not provided
  if (!data.metaTitle && data.name) {
    data.metaTitle = `${data.name} Reviews — Expert Reviews & Ratings | 7pexel`;
  }
  
  // Generate metaDescription if not provided
  if (!data.metaDescription && data.name) {
    data.metaDescription = `Read expert ${data.name.toLowerCase()} reviews with honest ratings, pros & cons, and buying advice.`;
  }
  
  const category = new Category(data);
  return await category.save();
}

// Update category
export async function updateCategory(
  slug: string,
  data: Partial<ICategory>
): Promise<ICategory | null> {
  await dbConnect();
  
  // Update href if slug changes
  if (data.slug) {
    data.href = `/reviews/category/${data.slug}`;
  }
  
  return await Category.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

// Delete category
export async function deleteCategory(slug: string): Promise<boolean> {
  await dbConnect();
  const result = await Category.deleteOne({ slug });
  return result.deletedCount > 0;
}

// Get category with articles
export async function getCategoryWithArticles(slug: string): Promise<{ category: ICategory | null; articles: any[] }> {
  await dbConnect();
  const category = await Category.findOne({ slug }).lean();
  if (!category) return { category: null, articles: [] };
  
  // You can add article fetching logic here if you have an Article model
  // For now, return empty articles array
  return { 
    category, 
    articles: [] 
  };
}

// Seed default categories
export async function seedCategories(): Promise<number> {
  await dbConnect();
  
  const defaultCategories = [
    {
      name: "Phones",
      slug: "phones",
      icon: "📱",
      description: "In-depth smartphone reviews covering the latest flagship and budget devices.",
      color: "#1FA25A",
      gradient: "from-[#0A3F26] via-[#1FA25A] to-[#0A3F26]",
      href: "/reviews/category/phones",
      metaTitle: "Phone Reviews — Expert Smartphone Reviews & Ratings | 7pexel",
      metaDescription: "Read expert phone reviews with honest ratings, pros & cons, and buying advice for the latest smartphones.",
      keywords: ["phone reviews", "smartphone reviews", "iPhone review", "Galaxy review", "Pixel review"],
      count: 3,
      newCount: 1,
      order: 0
    },
    {
      name: "Laptops",
      slug: "laptops",
      icon: "💻",
      description: "Comprehensive laptop reviews for work, gaming, and creative professionals.",
      color: "#4C7A1F",
      gradient: "from-[#2F5233] via-[#4C7A1F] to-[#2F5233]",
      href: "/reviews/category/laptops",
      metaTitle: "Laptop Reviews — Expert Laptop Reviews & Buying Guide | 7pexel",
      metaDescription: "Read expert laptop reviews with honest ratings, performance tests, and buying advice for every use case.",
      keywords: ["laptop reviews", "MacBook review", "gaming laptop", "ultrabook review", "work laptop"],
      count: 1,
      newCount: 1,
      order: 1
    },
    {
      name: "Auto",
      slug: "auto",
      icon: "🚗",
      description: "Expert car reviews and comparisons for every budget and lifestyle.",
      color: "#6E8F2B",
      gradient: "from-[#2F5233] via-[#6E8F2B] to-[#2F5233]",
      href: "/reviews/category/auto",
      metaTitle: "Car Reviews — Expert Auto Reviews & Comparisons | 7pexel",
      metaDescription: "Read expert car reviews with honest ratings, performance tests, and buying advice for every budget.",
      keywords: ["car reviews", "auto reviews", "SUV reviews", "electric car reviews", "truck reviews"],
      count: 0,
      newCount: 0,
      order: 2
    },
    {
      name: "Technology",
      slug: "technology",
      icon: "💡",
      description: "In-depth technology reviews covering the latest gadgets and innovations.",
      color: "#12836B",
      gradient: "from-[#0A3F26] via-[#12836B] to-[#0A3F26]",
      href: "/reviews/category/technology",
      metaTitle: "Tech Reviews — Expert Gadget & Technology Reviews | 7pexel",
      metaDescription: "Read expert technology reviews with honest ratings and buying advice for the latest gadgets.",
      keywords: ["tech reviews", "gadget reviews", "technology reviews", "smart home reviews", "wearable reviews"],
      count: 0,
      newCount: 0,
      order: 3
    },
    {
      name: "Audio",
      slug: "audio",
      icon: "🎧",
      description: "Expert audio reviews for headphones, earbuds, speakers, and more.",
      color: "#347A5B",
      gradient: "from-[#0F6B3E] via-[#347A5B] to-[#0F6B3E]",
      href: "/reviews/category/audio",
      metaTitle: "Audio Reviews — Expert Headphone & Speaker Reviews | 7pexel",
      metaDescription: "Read expert audio reviews with honest ratings for headphones, earbuds, speakers, and more.",
      keywords: ["audio reviews", "headphone reviews", "earbud reviews", "speaker reviews", "ANC reviews"],
      count: 0,
      newCount: 0,
      order: 4
    },
    {
      name: "Gaming",
      slug: "gaming",
      icon: "🎮",
      description: "In-depth gaming reviews for consoles, games, and gaming accessories.",
      color: "#8FA83E",
      gradient: "from-[#5A6E1F] via-[#8FA83E] to-[#5A6E1F]",
      href: "/reviews/category/gaming",
      metaTitle: "Gaming Reviews — Expert Console & Game Reviews | 7pexel",
      metaDescription: "Read expert gaming reviews with honest ratings for consoles, games, and accessories.",
      keywords: ["gaming reviews", "console reviews", "game reviews", "PS5 review", "Xbox review"],
      count: 0,
      newCount: 0,
      order: 5
    }
  ];

  let insertedCount = 0;
  
  for (const cat of defaultCategories) {
    const existing = await Category.findOne({ slug: cat.slug });
    if (!existing) {
      await Category.create(cat);
      insertedCount++;
    }
  }
  
  return insertedCount;
}