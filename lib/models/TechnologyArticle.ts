// lib/models/TechnologyArticle.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologyArticle extends Document {
  // ─── BASIC INFO ──────────────────────────────────────
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  
  // ─── IMAGES ──────────────────────────────────────────
  image: string;
  imageAlt?: string;
  
  // ─── CATEGORY & SUBCATEGORY ────────────────────────
  categoryId: mongoose.Types.ObjectId;
  categorySlug: string;
  subCategoryId?: mongoose.Types.ObjectId;
  subCategorySlug?: string;
  
  // ─── AUTHOR ──────────────────────────────────────────
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  authorBio?: string;
  
  // ─── METADATA ────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  
  // ─── CONTENT METADATA ──────────────────────────────
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  steps: number;
  tags: string[];
  
  // ─── FLAGS ──────────────────────────────────────────
  isFeatured: boolean;
  isTrending: boolean;
  isPublished: boolean;
  isBreaking?: boolean;
  isSponsored?: boolean;
  
  // ─── STRUCTURED DATA ──────────────────────────────
  structuredData?: mongoose.Types.DocumentDefinition;
  
  // ─── STATS ──────────────────────────────────────────
  views: number;
  likes: number;
  shares?: number;
  comments?: number;
  
  // ─── PUBLISHING ────────────────────────────────────
  publishedAt: Date;
  updatedDate?: Date;
  
  // ─── TIMESTAMPS ────────────────────────────────────
  createdAt: Date;
  updatedAt: Date;
}

const TechnologyArticleSchema = new Schema<ITechnologyArticle>(
  {
    // ─── BASIC INFO ──────────────────────────────────────
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Article slug is required'],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Article excerpt is required'],
      trim: true,
      maxlength: [350, 'Excerpt cannot exceed 350 characters'],
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    
    // ─── IMAGES ──────────────────────────────────────────
    image: {
      type: String,
      required: [true, 'Article image is required'],
    },
    imageAlt: {
      type: String,
      default: '',
      maxlength: [125, 'Image alt text cannot exceed 125 characters'],
    },
    
    // ─── CATEGORY & SUBCATEGORY ────────────────────────
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TechnologyCategory',
      required: [true, 'Category ID is required'],
      index: true,
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug is required'],
      index: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TechnologySubCategory',
      index: true,
    },
    subCategorySlug: {
      type: String,
      index: true,
    },
    
    // ─── AUTHOR ──────────────────────────────────────────
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      index: true,
    },
    authorRole: {
      type: String,
      default: 'Technology Expert',
      trim: true,
    },
    authorAvatar: {
      type: String,
      default: '',
    },
    authorBio: {
      type: String,
      trim: true,
      default: '',
    },
    
    // ─── METADATA ────────────────────────────────────────
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
      default: function(this: any) {
        return `${this.title} | 7pexel Technology Guides`;
      },
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
      default: function(this: any) {
        return this.excerpt || `${this.title} - Expert guide and tutorials. Learn from industry professionals.`;
      },
    },
    keywords: {
      type: [String],
      default: [],
      index: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
      default: function(this: any) {
        return `https://7pexel.com/technology/${this.slug}`;
      },
    },
    
    // ─── CONTENT METADATA ──────────────────────────────
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    readTime: {
      type: Number,
      default: 5,
      min: [1, 'Read time must be at least 1 minute'],
    },
    steps: {
      type: Number,
      default: 0,
      min: [0, 'Steps cannot be negative'],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    
    // ─── FLAGS ──────────────────────────────────────────
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    isBreaking: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    
    // ─── STRUCTURED DATA ──────────────────────────────
    structuredData: {
      type: Schema.Types.Mixed,
      default: null,
    },
    
    // ─── STATS ──────────────────────────────────────────
    views: {
      type: Number,
      default: 0,
      min: [0, 'Views cannot be negative'],
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    
    // ─── PUBLISHING ────────────────────────────────────
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ─── COMPOUND INDEXES ──────────────────────────────────
TechnologyArticleSchema.index({ categorySlug: 1, publishedAt: -1 });
TechnologyArticleSchema.index({ subCategorySlug: 1, publishedAt: -1 });
TechnologyArticleSchema.index({ isFeatured: 1, publishedAt: -1 });
TechnologyArticleSchema.index({ isTrending: 1, publishedAt: -1 });
TechnologyArticleSchema.index({ tags: 1, publishedAt: -1 });
TechnologyArticleSchema.index({ author: 1, publishedAt: -1 });

// ─── TEXT SEARCH INDEX ─────────────────────────────────
TechnologyArticleSchema.index(
  { 
    title: 'text', 
    content: 'text', 
    excerpt: 'text', 
    tags: 'text',
    keywords: 'text',
    author: 'text',
  },
  {
    weights: {
      title: 10,
      tags: 8,
      keywords: 6,
      excerpt: 4,
      author: 3,
      content: 1,
    },
    name: 'TechnologyArticleTextSearch',
  }
);

// ─── VIRTUAL FIELDS ────────────────────────────────────
TechnologyArticleSchema.virtual('url').get(function() {
  return `/technology/${this.slug}`;
});

TechnologyArticleSchema.virtual('wordCount').get(function() {
  return this.content ? this.content.split(/\s+/).length : 0;
});

TechnologyArticleSchema.virtual('isNew').get(function() {
  const daysOld = (Date.now() - this.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysOld < 7;
});

// ─── METHODS ────────────────────────────────────────────
TechnologyArticleSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

TechnologyArticleSchema.methods.incrementLikes = async function() {
  this.likes += 1;
  return this.save();
};

TechnologyArticleSchema.methods.incrementShares = async function() {
  this.shares += 1;
  return this.save();
};

TechnologyArticleSchema.methods.incrementComments = async function() {
  this.comments += 1;
  return this.save();
};

// ─── STATIC METHODS ────────────────────────────────────
TechnologyArticleSchema.statics.findPublished = function() {
  return this.find({ isPublished: true }).sort({ publishedAt: -1 });
};

TechnologyArticleSchema.statics.findFeatured = function(limit: number = 4) {
  return this.find({ isPublished: true, isFeatured: true })
    .sort({ publishedAt: -1 })
    .limit(limit);
};

TechnologyArticleSchema.statics.findTrending = function(limit: number = 4) {
  return this.find({ isPublished: true, isTrending: true })
    .sort({ views: -1, publishedAt: -1 })
    .limit(limit);
};

TechnologyArticleSchema.statics.findByCategory = function(categorySlug: string, limit?: number) {
  const query = this.find({ 
    isPublished: true, 
    categorySlug,
  }).sort({ publishedAt: -1 });
  
  if (limit) {
    query.limit(limit);
  }
  
  return query;
};

TechnologyArticleSchema.statics.findBySubCategory = function(subCategorySlug: string, limit?: number) {
  const query = this.find({
    isPublished: true,
    subCategorySlug,
  }).sort({ publishedAt: -1 });
  
  if (limit) {
    query.limit(limit);
  }
  
  return query;
};

TechnologyArticleSchema.statics.search = function(query: string, limit: number = 20, page: number = 1) {
  const skip = (page - 1) * limit;
  
  if (!query || query.length < 2) {
    return this.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
  }
  
  return this.find(
    { 
      $text: { $search: query },
      isPublished: true,
    },
    { 
      score: { $meta: 'textScore' },
    }
  )
    .sort({ 
      score: { $meta: 'textScore' },
      publishedAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

TechnologyArticleSchema.statics.getStats = async function() {
  const [total, published, featured, trending] = await Promise.all([
    this.countDocuments(),
    this.countDocuments({ isPublished: true }),
    this.countDocuments({ isPublished: true, isFeatured: true }),
    this.countDocuments({ isPublished: true, isTrending: true }),
  ]);

  return {
    total,
    published,
    featured,
    trending,
    draft: total - published,
  };
};

TechnologyArticleSchema.statics.getCategoryStats = async function() {
  return this.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$categorySlug',
        count: { $sum: 1 },
        featured: {
          $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] },
        },
        trending: {
          $sum: { $cond: [{ $eq: ['$isTrending', true] }, 1, 0] },
        },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

// ─── PRE-SAVE HOOKS ─────────────────────────────────────
// ─── PRE-SAVE HOOKS ─────────────────────────────────────
TechnologyArticleSchema.pre('save', async function() {
  // Auto-generate slug if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Auto-generate metaTitle if not provided
  if (!this.metaTitle && this.title) {
    this.metaTitle = `${this.title} | 7pexel Technology Guides`;
  }

  // Auto-generate metaDescription if not provided
  if (!this.metaDescription && this.excerpt) {
    this.metaDescription = this.excerpt.slice(0, 157) + '...';
  }

  // Auto-generate canonicalUrl if not provided
  if (!this.canonicalUrl && this.slug) {
    this.canonicalUrl = `https://7pexel.com/technology/${this.slug}`;
  }

  // Ensure publishedAt is set
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Update updatedDate on save
  if (this.isNew) {
    this.updatedDate = undefined;
  } else {
    this.updatedDate = new Date();
  }
});

// ─── POST-SAVE HOOKS ────────────────────────────────────
TechnologyArticleSchema.post('save', async function(doc) {
  // Update category article count
  try {
    const TechnologyCategory = mongoose.model('TechnologyCategory');
    await TechnologyCategory.findByIdAndUpdate(doc.categoryId, {
      $inc: { articleCount: 1 },
    });
  } catch (error) {
    console.error('Error updating category article count:', error);
  }
});

// ─── MODEL EXPORT ──────────────────────────────────────
export default mongoose.models.TechnologyArticle || 
  mongoose.model<ITechnologyArticle>('TechnologyArticle', TechnologyArticleSchema);