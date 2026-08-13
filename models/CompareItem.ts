// models/CompareItem.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICompareItem extends Document {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'phones' | 'laptops' | 'auto' | 'technology' | 'audio' | 'gaming';
  categoryLabel: string;
  categoryIcon: string;
  image: string;
  price: string;
  rating: number;
  specs: Map<string, string>;
  pros: string[];
  cons: string[];
  description: string;
  isActive: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompareItemSchema = new Schema<ICompareItem>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['phones', 'laptops', 'auto', 'technology', 'audio', 'gaming'],
      index: true 
    },
    categoryLabel: { type: String, required: true },
    categoryIcon: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    specs: { type: Map, of: String, default: {} },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast queries
CompareItemSchema.index({ category: 1, rating: -1 });
CompareItemSchema.index({ brand: 1, category: 1 });
CompareItemSchema.index({ name: 'text', brand: 'text', description: 'text' });
CompareItemSchema.index({ views: -1 });
CompareItemSchema.index({ rating: -1 });

export default mongoose.models.CompareItem || 
  mongoose.model<ICompareItem>('CompareItem', CompareItemSchema);