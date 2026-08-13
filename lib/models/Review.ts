// lib/models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  title: string;
  slug: string;
  category: string;
  rating: number;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  pros: string[];
  cons: string[];
  price: string;
  verdict: string;
  fullReview?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Audio", "Phones", "AR/VR", "AI", "Automotive", "Laptops", "Gaming", "Wearables", "Photography", "Drones"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 5,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    pros: {
      type: [String],
      required: [true, "At least one pro is required"],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one pro is required",
      },
    },
    cons: {
      type: [String],
      required: [true, "At least one con is required"],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one con is required",
      },
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    verdict: {
      type: String,
      required: [true, "Verdict is required"],
      trim: true,
    },
    fullReview: {
      type: String,
      required: [true, "Full review content is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search
ReviewSchema.index({ title: "text", excerpt: "text", category: "text" });

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);