// lib/models/TechnologySubCategory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologySubCategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  categoryId: mongoose.Types.ObjectId;
  categorySlug: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySubCategorySchema = new Schema<ITechnologySubCategory>(
  {
    name: {
      type: String,
      required: [true, 'Sub-category name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Sub-category slug is required'],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Sub-category description is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Sub-category icon is required'],
      default: 'folder',
    },
    color: {
      type: String,
      required: [true, 'Sub-category color is required'],
      default: '#6C3CE1',
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TechnologyCategory',
      required: [true, 'Category ID is required'],
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug is required'],
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

TechnologySubCategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });
TechnologySubCategorySchema.index({ categorySlug: 1 });
TechnologySubCategorySchema.index({ isActive: 1 });

export default mongoose.models.TechnologySubCategory || 
  mongoose.model<ITechnologySubCategory>('TechnologySubCategory', TechnologySubCategorySchema);