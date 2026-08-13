// lib/laptop-brand-service.ts
import dbConnect from './mongodb';
import LaptopBrand, { ILaptopBrand } from '@/models/LaptopBrand';
import Laptop from '@/models/Laptop';

// ─── GET ALL BRANDS ──────────────────────────────────────

export async function getAllBrands(): Promise<ILaptopBrand[]> {
  await dbConnect();
  return LaptopBrand.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();
}

export async function getAllBrandsWithCounts(): Promise<ILaptopBrand[]> {
  await dbConnect();
  const brands = await LaptopBrand.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();
  
  // Get laptop counts for each brand
  const brandsWithCounts = await Promise.all(
    brands.map(async (brand) => {
      const count = await Laptop.countDocuments({ 
        brand: brand.name, 
        published: true 
      });
      return { ...brand, count };
    })
  );
  
  return brandsWithCounts;
}

// ─── GET SINGLE BRAND ────────────────────────────────────

export async function getBrandBySlug(slug: string): Promise<ILaptopBrand | null> {
  await dbConnect();
  return LaptopBrand.findOne({ slug }).lean();
}

export async function getBrandByName(name: string): Promise<ILaptopBrand | null> {
  await dbConnect();
  return LaptopBrand.findOne({ name }).lean();
}

export async function getBrandById(id: string): Promise<ILaptopBrand | null> {
  await dbConnect();
  return LaptopBrand.findOne({ id }).lean();
}

export async function getBrandWithLaptops(slug: string): Promise<{
  brand: ILaptopBrand | null;
  laptops: any[];
}> {
  await dbConnect();
  const brand = await LaptopBrand.findOne({ slug }).lean();
  if (!brand) return { brand: null, laptops: [] };
  
  const laptops = await Laptop.find({ 
    brand: brand.name, 
    published: true 
  })
  .sort({ year: -1, rating: -1 })
  .lean();
  
  return { brand, laptops };
}

// ─── CRUD OPERATIONS ─────────────────────────────────────

export async function createBrand(data: Partial<ILaptopBrand>): Promise<ILaptopBrand> {
  await dbConnect();
  
  // Generate id if not provided
  if (!data.id) {
    data.id = data.slug || data.name?.toLowerCase().replace(/\s+/g, '-');
  }
  
  // Generate slug if not provided
  if (!data.slug && data.name) {
    data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
  }
  
  // Set default color if not provided
  if (!data.color && data.primaryColor) {
    data.color = data.primaryColor;
  }
  
  // Generate metaTitle if not provided
  if (!data.metaTitle && data.name) {
    data.metaTitle = `${data.name} Laptops — Expert Reviews & Buying Guide | 7pexel`;
  }
  
  // Generate metaDescription if not provided
  if (!data.metaDescription && data.name) {
    data.metaDescription = `Explore the best ${data.name} laptops with expert reviews, specifications, and comparisons. Find the perfect ${data.name} laptop for your needs.`;
  }
  
  // Set default order if not provided
  if (data.order === undefined) {
    const maxOrder = await LaptopBrand.findOne().sort({ order: -1 }).select('order').lean();
    data.order = (maxOrder?.order || 0) + 1;
  }
  
  const brand = new LaptopBrand(data);
  return brand.save();
}

export async function updateBrand(slug: string, data: Partial<ILaptopBrand>): Promise<ILaptopBrand | null> {
  await dbConnect();
  
  // If slug is being updated, ensure consistency
  if (data.slug && data.slug !== slug) {
    // Update slug
  }
  
  return LaptopBrand.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function deleteBrand(slug: string): Promise<boolean> {
  await dbConnect();
  
  // Check if brand has laptops
  const brand = await LaptopBrand.findOne({ slug }).lean();
  if (brand) {
    const laptopCount = await Laptop.countDocuments({ 
      brand: brand.name, 
      published: true 
    });
    
    if (laptopCount > 0) {
      throw new Error(`Cannot delete brand with ${laptopCount} laptops. Archive or reassign laptops first.`);
    }
  }
  
  const result = await LaptopBrand.deleteOne({ slug });
  return result.deletedCount > 0;
}

// ─── SEED BRANDS ─────────────────────────────────────────

export async function seedBrands(): Promise<ILaptopBrand[]> {
  await dbConnect();
  
  const brands = [
    {
      id: 'apple',
      slug: 'apple',
      name: 'Apple',
      icon: '🍎',
      emoji: '🍎',
      color: '#555555',
      primaryColor: '#555555',
      secondaryColor: '#888888',
      description: 'Apple designs premium laptops with powerful M-series chips, stunning displays, and industry-leading build quality.',
      founded: '1976',
      headquarters: 'Cupertino, California, USA',
      website: 'https://www.apple.com',
      logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 1,
      metaTitle: 'Apple Laptops — MacBook Reviews & Buying Guide | 7pexel',
      metaDescription: 'Explore the best Apple MacBooks with expert reviews, specifications, and comparisons. Find your perfect MacBook Pro or MacBook Air.',
      keywords: ['Apple', 'MacBook', 'MacBook Pro', 'MacBook Air', 'Apple laptop'],
    },
    {
      id: 'dell',
      slug: 'dell',
      name: 'Dell',
      icon: '🖥️',
      emoji: '🖥️',
      color: '#0066CC',
      primaryColor: '#0066CC',
      secondaryColor: '#4D94E8',
      description: 'Dell offers a wide range of premium laptops including the iconic XPS series known for their stunning displays and premium build.',
      founded: '1984',
      headquarters: 'Round Rock, Texas, USA',
      website: 'https://www.dell.com',
      logo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 2,
      metaTitle: 'Dell Laptops — XPS, Alienware & More Reviews | 7pexel',
      metaDescription: 'Explore the best Dell laptops including XPS, Alienware, and Latitude. Expert reviews, specifications, and comparisons.',
      keywords: ['Dell', 'Dell XPS', 'Alienware', 'Dell laptop', 'Dell Latitude'],
    },
    {
      id: 'asus',
      slug: 'asus',
      name: 'ASUS',
      icon: '💻',
      emoji: '💻',
      color: '#003366',
      primaryColor: '#003366',
      secondaryColor: '#004C99',
      description: 'ASUS creates innovative laptops for every need, from gaming ROG series to premium ZenBook ultrabooks.',
      founded: '1989',
      headquarters: 'Taipei, Taiwan',
      website: 'https://www.asus.com',
      logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 3,
      metaTitle: 'ASUS Laptops — ROG, ZenBook & More Reviews | 7pexel',
      metaDescription: 'Explore the best ASUS laptops including ROG gaming laptops, ZenBook ultrabooks, and expert reviews.',
      keywords: ['ASUS', 'ROG', 'ZenBook', 'ASUS laptop', 'gaming laptop'],
    },
    {
      id: 'lenovo',
      slug: 'lenovo',
      name: 'Lenovo',
      icon: '📋',
      emoji: '📋',
      color: '#E2231A',
      primaryColor: '#E2231A',
      secondaryColor: '#FF4D4D',
      description: 'Lenovo offers reliable business laptops like the ThinkPad series, known for legendary keyboards and enterprise-grade durability.',
      founded: '1984',
      headquarters: 'Beijing, China',
      website: 'https://www.lenovo.com',
      logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 4,
      metaTitle: 'Lenovo Laptops — ThinkPad, Yoga & More Reviews | 7pexel',
      metaDescription: 'Explore the best Lenovo laptops including ThinkPad, Yoga, and Legion. Expert reviews, specifications, and comparisons.',
      keywords: ['Lenovo', 'ThinkPad', 'Yoga', 'Legion', 'Lenovo laptop'],
    },
    {
      id: 'hp',
      slug: 'hp',
      name: 'HP',
      icon: '🔵',
      emoji: '🔵',
      color: '#0096D6',
      primaryColor: '#0096D6',
      secondaryColor: '#4DB8E8',
      description: 'HP offers versatile laptops ranging from premium Spectre ultrabooks to reliable EliteBook business laptops.',
      founded: '1939',
      headquarters: 'Palo Alto, California, USA',
      website: 'https://www.hp.com',
      logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 5,
      metaTitle: 'HP Laptops — Spectre, EliteBook & More Reviews | 7pexel',
      metaDescription: 'Explore the best HP laptops including Spectre, EliteBook, and Pavilion. Expert reviews, specifications, and comparisons.',
      keywords: ['HP', 'Spectre', 'EliteBook', 'Pavilion', 'HP laptop'],
    },
    {
      id: 'microsoft',
      slug: 'microsoft',
      name: 'Microsoft',
      icon: '🟦',
      emoji: '🟦',
      color: '#00A4EF',
      primaryColor: '#00A4EF',
      secondaryColor: '#4DC3F5',
      description: 'Microsoft creates premium Surface laptops and 2-in-1 devices with innovative design and Windows integration.',
      founded: '1975',
      headquarters: 'Redmond, Washington, USA',
      website: 'https://www.microsoft.com',
      logo: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 6,
      metaTitle: 'Microsoft Surface Laptops — Reviews & Buying Guide | 7pexel',
      metaDescription: 'Explore the best Microsoft Surface laptops and 2-in-1 devices. Expert reviews, specifications, and comparisons.',
      keywords: ['Microsoft', 'Surface', 'Surface Laptop', 'Surface Pro', 'Windows laptop'],
    },
    {
      id: 'acer',
      slug: 'acer',
      name: 'Acer',
      icon: '🟩',
      emoji: '🟩',
      color: '#83B81A',
      primaryColor: '#83B81A',
      secondaryColor: '#A8D44A',
      description: 'Acer offers affordable and performance-focused laptops including the popular Predator gaming series.',
      founded: '1976',
      headquarters: 'New Taipei City, Taiwan',
      website: 'https://www.acer.com',
      logo: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 7,
      metaTitle: 'Acer Laptops — Predator, Swift & More Reviews | 7pexel',
      metaDescription: 'Explore the best Acer laptops including Predator gaming laptops and Swift ultrabooks. Expert reviews and comparisons.',
      keywords: ['Acer', 'Predator', 'Swift', 'Acer laptop', 'gaming laptop'],
    },
    {
      id: 'razer',
      slug: 'razer',
      name: 'Razer',
      icon: '🟢',
      emoji: '🟢',
      color: '#44D62C',
      primaryColor: '#44D62C',
      secondaryColor: '#7AE35A',
      description: 'Razer is known for premium gaming laptops with sleek design, powerful performance, and RGB lighting.',
      founded: '2005',
      headquarters: 'Irvine, California, USA',
      website: 'https://www.razer.com',
      logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 8,
      metaTitle: 'Razer Laptops — Blade Gaming Reviews | 7pexel',
      metaDescription: 'Explore the best Razer gaming laptops including Blade series. Expert reviews, specifications, and comparisons.',
      keywords: ['Razer', 'Razer Blade', 'gaming laptop', 'Razer laptop'],
    },
    {
      id: 'msi',
      slug: 'msi',
      name: 'MSI',
      icon: '🟦',
      emoji: '🟦',
      color: '#00A3E0',
      primaryColor: '#00A3E0',
      secondaryColor: '#4DBEE8',
      description: 'MSI specializes in high-performance gaming laptops with powerful GPUs and advanced cooling systems.',
      founded: '1986',
      headquarters: 'New Taipei City, Taiwan',
      website: 'https://www.msi.com',
      logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
      count: 0,
      isActive: true,
      order: 9,
      metaTitle: 'MSI Laptops — Gaming & Creator Reviews | 7pexel',
      metaDescription: 'Explore the best MSI gaming and creator laptops. Expert reviews, specifications, and comparisons.',
      keywords: ['MSI', 'MSI laptop', 'gaming laptop', 'creator laptop'],
    },
  ];

  const results = [];
  for (const brand of brands) {
    const result = await LaptopBrand.findOneAndUpdate(
      { slug: brand.slug },
      { $set: brand },
      { upsert: true, new: true }
    );
    results.push(result);
  }
  
  return results;
}