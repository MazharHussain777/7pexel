// models/Auto.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAuto extends Document {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  range: string;
  acceleration: string;
  topSpeed: string;
  battery: string;
  drivetrain: string;
  seating: string;
  cargo: string;
  charging: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  date: Date;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  isFeatured: boolean;
  isTrending: boolean;
  published: boolean;
  views: number;
  excerpt: string;
  country: string;
  founded: number;
  models: number;
  logo: string;
  grad: string;
  color: string;
  textColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AutoSchema = new Schema<IAuto>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    category: { type: [String], default: [] },
    range: { type: String, required: true },
    acceleration: { type: String, required: true },
    topSpeed: { type: String, required: true },
    battery: { type: String, required: true },
    drivetrain: { type: String, required: true },
    seating: { type: String, required: true },
    cargo: { type: String, required: true },
    charging: { type: String, required: true },
    colors: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, default: '7pexel Team' },
    authorAvatar: { type: String, default: '7P' },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    customStyles: { type: String, default: '' },
    contentHtml: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    excerpt: { type: String, required: true },
    country: { type: String, required: true },
    founded: { type: Number, required: true },
    models: { type: Number, default: 0 },
    logo: { type: String, required: true },
    grad: { type: String, required: true },
    color: { type: String, required: true },
    textColor: { type: String },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast queries
AutoSchema.index({ brand: 1, year: -1 });
AutoSchema.index({ rating: -1 });
AutoSchema.index({ category: 1 });
AutoSchema.index({ isFeatured: 1 });
AutoSchema.index({ isTrending: 1 });
AutoSchema.index({ published: 1 });
AutoSchema.index({ brand: 'text', model: 'text', 'category': 'text' });
AutoSchema.index({ views: -1 });

export default mongoose.models.Auto || mongoose.model<IAuto>('Auto', AutoSchema);