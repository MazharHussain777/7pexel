// models/Category.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  count: number;
  newCount: number;
  href: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: '📰' },
    description: { type: String, default: '' },
    color: { type: String, default: '#0F6B3E' },
    gradient: { type: String, default: 'from-[#0A3F26] via-[#0F6B3E] to-[#0A3F26]' },
    count: { type: Number, default: 0 },
    newCount: { type: Number, default: 0 },
    href: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 999 },
  },
  {
    timestamps: true,
  }
);

// Use default export
const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default Category;