// lib/models/TechnologyArticle.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologyArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  categoryId: mongoose.Types.ObjectId;
  categorySlug: string;
  subCategoryId?: mongoose.Types.ObjectId;
  subCategorySlug?: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  steps: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isPublished: boolean;
  publishedAt: Date;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologyArticleSchema = new Schema<ITechnologyArticle>(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Article slug is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Article excerpt is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    image: {
      type: String,
      required: [true, 'Article image is required'],
    },
    imageAlt: {
      type: String,
      default: '',
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
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TechnologySubCategory',
    },
    subCategorySlug: {
      type: String,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
    },
    authorRole: {
      type: String,
      default: 'Technology Expert',
    },
    authorAvatar: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    readTime: {
      type: Number,
      default: 5,
    },
    steps: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

TechnologyArticleSchema.index({ slug: 1 });
TechnologyArticleSchema.index({ categorySlug: 1 });
TechnologyArticleSchema.index({ subCategorySlug: 1 });
TechnologyArticleSchema.index({ isPublished: 1 });
TechnologyArticleSchema.index({ isFeatured: 1 });
TechnologyArticleSchema.index({ isTrending: 1 });
TechnologyArticleSchema.index({ publishedAt: -1 });

export default mongoose.models.TechnologyArticle || 
  mongoose.model<ITechnologyArticle>('TechnologyArticle', TechnologyArticleSchema);