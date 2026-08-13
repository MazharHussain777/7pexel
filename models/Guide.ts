// models/Guide.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGuide extends Document {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  level: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  steps: number;
  difficulty: string;
  contentHtml: string;
  customStyles: string;
  canonical?: string;
  published: boolean;
  structuredData?: any;
  createdAt: Date;
  updatedAt: Date;
}

const GuideSchema = new Schema<IGuide>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    categoryLabel: {
      type: String,
      required: [true, 'Category label is required'],
      trim: true,
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug is required'],
      trim: true,
      lowercase: true,
    },
    categoryIcon: {
      type: String,
      default: '📖',
    },
    categoryDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    imageAlt: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    authorAvatar: {
      type: String,
      default: '📝',
    },
    authorBio: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
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
    steps: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    contentHtml: {
      type: String,
      required: [true, 'Content HTML is required'],
    },
    customStyles: {
      type: String,
      default: '',
    },
    canonical: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: true,
    },
    structuredData: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
GuideSchema.index({ slug: 1 });
GuideSchema.index({ categorySlug: 1 });
GuideSchema.index({ published: 1 });
GuideSchema.index({ isFeatured: 1 });
GuideSchema.index({ isTrending: 1 });
GuideSchema.index({ tags: 1 });
GuideSchema.index({ date: -1 });

const Guide = mongoose.models.Guide || mongoose.model<IGuide>('Guide', GuideSchema);

export default Guide;