// lib/models/TechnologyCategory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologyCategory extends Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologyCategorySchema = new Schema<ITechnologyCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'Category color is required'],
      default: '#011d24',
    },
    gradient: {
      type: String,
      required: [true, 'Category gradient is required'],
      default: 'from-[#011d24] to-[#033742]',
    },
    icon: {
      type: String,
      required: [true, 'Category icon is required'],
      default: 'grid',
    },
    metaTitle: {
      type: String,
      required: [true, 'Meta title is required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Meta description is required'],
    },
    keywords: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

TechnologyCategorySchema.index({ slug: 1 });
TechnologyCategorySchema.index({ isActive: 1 });
TechnologyCategorySchema.index({ order: 1 });

export default mongoose.models.TechnologyCategory || 
  mongoose.model<ITechnologyCategory>('TechnologyCategory', TechnologyCategorySchema);