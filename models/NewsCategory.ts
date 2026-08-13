// models/NewsCategory.ts
import mongoose, { Schema, models } from 'mongoose';

export interface INewsCategory {
  _id: string;
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
}

const NewsCategorySchema = new Schema<INewsCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: '📰' },
    description: { type: String, default: '' },
    color: { type: String, default: '#0F6B3E' },
    gradient: { type: String, default: 'from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A]' },
    count: { type: Number, default: 0 },
    newCount: { type: Number, default: 0 },
    href: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default models.NewsCategory || mongoose.model<INewsCategory>('NewsCategory', NewsCategorySchema);