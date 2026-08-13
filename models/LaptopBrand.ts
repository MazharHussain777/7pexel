// models/LaptopBrand.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILaptopBrand extends Document {
  id: string;
  slug: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  founded: string;
  headquarters: string;
  website: string;
  logo: string;
  count: number;
  isActive: boolean;
  order: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LaptopBrandSchema = new Schema<ILaptopBrand>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: true },
    description: { type: String, required: true },
    founded: { type: String },
    headquarters: { type: String },
    website: { type: String },
    logo: { type: String },
    count: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Create indexes
LaptopBrandSchema.index({ name: 1 });
LaptopBrandSchema.index({ isActive: 1 });
LaptopBrandSchema.index({ order: 1 });

export default mongoose.models.LaptopBrand || mongoose.model<ILaptopBrand>('LaptopBrand', LaptopBrandSchema);