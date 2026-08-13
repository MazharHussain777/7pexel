// models/GuideCategory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGuideCategory extends Document {
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

const GuideCategorySchema = new Schema<IGuideCategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    icon: {
      type: String,
      default: '📖',
    },
    description: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#0F6B3E',
    },
    gradient: {
      type: String,
      default: 'from-[#0A3F26] via-[#1FA25A] to-[#0A3F26]',
    },
    count: {
      type: Number,
      default: 0,
    },
    newCount: {
      type: Number,
      default: 0,
    },
    href: {
      type: String,
      default: '',
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
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

// Indexes
GuideCategorySchema.index({ slug: 1 });
GuideCategorySchema.index({ isActive: 1 });
GuideCategorySchema.index({ order: 1 });

const GuideCategory = mongoose.models.GuideCategory || 
  mongoose.model<IGuideCategory>('GuideCategory', GuideCategorySchema);

export default GuideCategory;