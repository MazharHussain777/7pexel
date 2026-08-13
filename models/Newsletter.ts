import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,

      // Email validation
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Invalid email format',
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },

    unsubscribedAt: {
      type: Date,
      default: undefined,
    },

    ipAddress: {
      type: String,
      trim: true,
      default: undefined,
    },

    userAgent: {
      type: String,
      trim: true,
      default: undefined,
    },

    source: {
      type: String,
      trim: true,
      default: 'website',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster queries
NewsletterSchema.index({
  email: 1,
  isActive: 1,
});

// Prevent model recompilation during Next.js hot reload
const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;