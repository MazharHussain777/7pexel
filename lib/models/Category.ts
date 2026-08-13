// lib/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
  articleCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#7F011F",
    },
    articleCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware
CategorySchema.pre("save", function () {
  // Generate slug from name
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Auto-generate label from name
  if (!this.label && this.name) {
    this.label = this.name
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
});

// Static method to get category by name
CategorySchema.statics.getByName = async function (name: string) {
  return this.findOne({ name, isActive: true }).lean();
};

// Static method to get all active categories
CategorySchema.statics.getAllActive = async function () {
  return this.find({ isActive: true })
    .sort({ articleCount: -1, createdAt: -1 })
    .lean();
};

// Static method to update article count
CategorySchema.statics.updateArticleCount = async function (
  name: string,
  increment: number = 1
) {
  return this.findOneAndUpdate(
    { name },
    { $inc: { articleCount: increment } },
    { new: true }
  );
};

// Static method to get category stats
CategorySchema.statics.getStats = async function () {
  const [total, active] = await Promise.all([
    this.countDocuments({}),
    this.countDocuments({ isActive: true }),
  ]);

  return {
    total,
    active,
    inactive: total - active,
  };
};

// Static method to search categories
CategorySchema.statics.search = async function (query: string) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { label: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
    isActive: true,
  }).lean();
};

export const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);