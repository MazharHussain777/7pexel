// lib/services/technologySubCategoryService.ts
import TechnologySubCategory, { ITechnologySubCategory } from '../models/TechnologySubCategory';
import TechnologyCategory from '../models/TechnologyCategory';
import { connectToDatabase } from '../db/mongodb';
import { Types } from 'mongoose';

export class TechnologySubCategoryService {
  // Get all subcategories
  async getAllSubCategories(activeOnly: boolean = true) {
    await connectToDatabase();
    const filter = activeOnly ? { isActive: true } : {};
    return await TechnologySubCategory.find(filter)
      .populate('categoryId', 'name slug')
      .sort({ order: 1, name: 1 });
  }

  // Get subcategories by category slug
  async getSubCategoriesByCategory(categorySlug: string, activeOnly: boolean = true) {
    await connectToDatabase();
    const filter: any = { categorySlug, isActive: activeOnly };
    return await TechnologySubCategory.find(filter)
      .populate('categoryId', 'name slug')
      .sort({ order: 1, name: 1 });
  }

  // Get subcategory by ID
  async getSubCategoryById(id: string) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid subcategory ID');
    }
    return await TechnologySubCategory.findById(id).populate('categoryId', 'name slug');
  }

  // Get subcategory by slug
  async getSubCategoryBySlug(slug: string) {
    await connectToDatabase();
    return await TechnologySubCategory.findOne({ slug, isActive: true })
      .populate('categoryId', 'name slug');
  }

  // Create subcategory using categorySlug
  async createSubCategory(data: Partial<ITechnologySubCategory>) {
    await connectToDatabase();
    
    let category;
    
    // Check if categorySlug is provided
    if (data.categorySlug) {
      // Find category by slug
      category = await TechnologyCategory.findOne({ slug: data.categorySlug, isActive: true });
    } else if (data.categoryId) {
      // Fallback to ID for backward compatibility
      category = await TechnologyCategory.findById(data.categoryId);
    }
    
    if (!category) {
      throw new Error('Category not found. Please provide a valid categorySlug or categoryId.');
    }

    // Create subcategory with both categoryId and categorySlug
    const subcategory = new TechnologySubCategory({
      ...data,
      categoryId: category._id,
      categorySlug: category.slug,
    });
    return await subcategory.save();
  }

  // Create subcategory by slug (simplified method)
  async createSubCategoryBySlug(data: {
    name: string;
    slug: string;
    description: string;
    categorySlug: string;
    icon?: string;
    color?: string;
    isActive?: boolean;
    order?: number;
  }) {
    await connectToDatabase();
    
    // Find category by slug
    const category = await TechnologyCategory.findOne({ 
      slug: data.categorySlug, 
      isActive: true 
    });
    
    if (!category) {
      throw new Error(`Category with slug "${data.categorySlug}" not found`);
    }

    const subcategory = new TechnologySubCategory({
      name: data.name,
      slug: data.slug,
      description: data.description,
      icon: data.icon || 'folder',
      color: data.color || '#6C3CE1',
      categoryId: category._id,
      categorySlug: category.slug,
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order || 0,
    });
    
    return await subcategory.save();
  }

  // Update subcategory by ID
  async updateSubCategory(id: string, data: Partial<ITechnologySubCategory>) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid subcategory ID');
    }
    
    // If categorySlug is provided, update categoryId as well
    if (data.categorySlug) {
      const category = await TechnologyCategory.findOne({ slug: data.categorySlug });
      if (category) {
        data.categoryId = category._id;
      }
    }
    
    return await TechnologySubCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Update subcategory by slug
  async updateSubCategoryBySlug(slug: string, data: Partial<ITechnologySubCategory>) {
    await connectToDatabase();
    const subcategory = await TechnologySubCategory.findOne({ slug });
    if (!subcategory) {
      throw new Error('Subcategory not found');
    }
    
    // If categorySlug is provided, update categoryId as well
    if (data.categorySlug) {
      const category = await TechnologyCategory.findOne({ slug: data.categorySlug });
      if (category) {
        data.categoryId = category._id;
      }
    }
    
    return await TechnologySubCategory.findByIdAndUpdate(subcategory._id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Delete subcategory by ID
  async deleteSubCategory(id: string) {
    await connectToDatabase();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid subcategory ID');
    }
    return await TechnologySubCategory.findByIdAndDelete(id);
  }

  // Delete subcategory by slug
  async deleteSubCategoryBySlug(slug: string) {
    await connectToDatabase();
    const subcategory = await TechnologySubCategory.findOne({ slug });
    if (!subcategory) {
      throw new Error('Subcategory not found');
    }
    return await TechnologySubCategory.findByIdAndDelete(subcategory._id);
  }
}

export const technologySubCategoryService = new TechnologySubCategoryService();