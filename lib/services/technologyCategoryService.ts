// lib/services/technologyCategoryService.ts
import TechnologyCategory, { ITechnologyCategory } from '../models/TechnologyCategory';
import TechnologySubCategory from '../models/TechnologySubCategory';
import TechnologyArticle from '../models/TechnologyArticle';
import { connectToDatabase } from '../db/mongodb';
import { Types } from 'mongoose';

export class TechnologyCategoryService {
  // Get all categories
  async getAllCategories(activeOnly: boolean = true) {
    await connectToDatabase();
    const filter = activeOnly ? { isActive: true } : {};
    return await TechnologyCategory.find(filter).sort({ order: 1, name: 1 });
  }

  // Get category by ID
  async getCategoryById(id: string) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid category ID');
    }
    return await TechnologyCategory.findById(id);
  }

  // Get category by slug
  async getCategoryBySlug(slug: string) {
    await connectToDatabase();
    return await TechnologyCategory.findOne({ slug, isActive: true });
  }

  // Get category with stats by slug
  async getCategoryWithStats(slug: string) {
    await connectToDatabase();
    
    const category = await TechnologyCategory.findOne({ slug, isActive: true });
    if (!category) {
      return null;
    }

    const subcategories = await TechnologySubCategory.find({
      categoryId: category._id,
      isActive: true,
    }).sort({ order: 1, name: 1 });

    const articles = await TechnologyArticle.find({
      categoryId: category._id,
      isPublished: true,
    })
    .sort({ publishedAt: -1 })
    .limit(10);

    return {
      ...category.toObject(),
      subcategoryCount: subcategories.length,
      articleCount: articles.length,
      subcategories,
      articles,
    };
  }

  // Create category
  async createCategory(data: Partial<ITechnologyCategory>) {
    await connectToDatabase();
    const category = new TechnologyCategory(data);
    return await category.save();
  }

  // Update category by ID
  async updateCategory(id: string, data: Partial<ITechnologyCategory>) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid category ID');
    }
    return await TechnologyCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Update category by slug
  async updateCategoryBySlug(slug: string, data: Partial<ITechnologyCategory>) {
    await connectToDatabase();
    const category = await TechnologyCategory.findOne({ slug });
    if (!category) {
      throw new Error('Category not found');
    }
    return await TechnologyCategory.findByIdAndUpdate(category._id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Delete category by ID
  async deleteCategory(id: string) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid category ID');
    }
    return await TechnologyCategory.findByIdAndDelete(id);
  }

  // Delete category by slug
  async deleteCategoryBySlug(slug: string) {
    await connectToDatabase();
    const category = await TechnologyCategory.findOne({ slug });
    if (!category) {
      throw new Error('Category not found');
    }
    return await TechnologyCategory.findByIdAndDelete(category._id);
  }
}

export const technologyCategoryService = new TechnologyCategoryService();