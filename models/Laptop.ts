// models/Laptop.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILaptop extends Document {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  canonical?: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LaptopSchema = new Schema<ILaptop>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    category: { type: [String], default: [] },
    display: { type: String, required: true },
    displaySize: { type: String, required: true },
    processor: { type: String, required: true },
    processorBrand: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    storageType: { type: String, required: true },
    graphics: { type: String, required: true },
    graphicsBrand: { type: String, required: true },
    battery: { type: String, required: true },
    weight: { type: String, required: true },
    os: { type: String, required: true },
    colors: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    authorBio: { type: String },
    date: { type: Date, default: Date.now },
    readTime: { type: String, required: true },
    customStyles: { type: String, default: '' },
    contentHtml: { type: String, required: true },
    canonical: { type: String },
    published: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
LaptopSchema.index({ brand: 1, model: 1 });
LaptopSchema.index({ category: 1 });
LaptopSchema.index({ rating: -1 });
LaptopSchema.index({ year: -1 });
LaptopSchema.index({ published: 1 });
LaptopSchema.index({ isFeatured: 1 });

// Text search index
LaptopSchema.index({
  brand: 'text',
  model: 'text',
  processor: 'text',
  graphics: 'text',
  'category': 'text',
});

export default mongoose.models.Laptop || mongoose.model<ILaptop>('Laptop', LaptopSchema);