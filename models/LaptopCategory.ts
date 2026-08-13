// models/LaptopCategory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILaptopCategory extends Document {
  id: string;
  slug: string;
  name: string;
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

const LaptopCategorySchema = new Schema<ILaptopCategory>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    gradient: { type: String, required: true },
    count: { type: Number, default: 0 },
    newCount: { type: Number, default: 0 },
    href: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LaptopCategory || mongoose.model<ILaptopCategory>('LaptopCategory', LaptopCategorySchema);