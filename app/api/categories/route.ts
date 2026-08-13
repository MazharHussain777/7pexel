<<<<<<< HEAD
// app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, createCategory, seedCategories } from '@/lib/category-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    
    if (action === 'seed') {
      const categories = await seedCategories();
      return NextResponse.json({ message: 'Categories seeded successfully', categories });
    }
    
    const categories = await getAllCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
=======
// @ts-nocheck
// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";

// ============================================
// GET - Get all categories with filters
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const active = searchParams.get("active") !== "false";
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    let query: any = {};
    if (active) query.isActive = true;

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { label: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [categories, total] = await Promise.all([
      Category.find(query)
        .sort({ articleCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Category.countDocuments(query),
    ]);

    const stats = await Category.getStats();

    return NextResponse.json({
      success: true,
      data: categories,
      stats,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch categories" },
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = ['name', 'slug', 'icon'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const category = await createCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create category' },
=======
// ============================================
// POST - Create a new category (ANY NAME ALLOWED)
// ============================================
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // ONLY REQUIRED: name (any string allowed)
    if (!body.name) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Category name is required",
          required: "name (string)",
          example: { 
            name: "ai", 
            label: "Artificial Intelligence",
            description: "AI and machine learning content",
            icon: "fa-robot",
            color: "#7C3AED"
          }
        },
        { status: 400 }
      );
    }

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${body.name}$`, 'i') } 
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Category "${body.name}" already exists`,
          existing: existingCategory
        },
        { status: 409 }
      );
    }

    // Check if category with same slug already exists
    const slug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const existingSlug = await Category.findOne({ slug });
    if (existingSlug) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Category with slug "${slug}" already exists`,
          existing: existingSlug
        },
        { status: 409 }
      );
    }

    // Build category data
    const categoryData = {
      name: body.name,
      slug: slug,
      label: body.label || body.name
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" "),
      description: body.description || `${body.name} category content`,
      icon: body.icon || "fa-tag",
      color: body.color || "#7F011F",
      articleCount: 0,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const category = new Category(categoryData);
    await category.save();

    return NextResponse.json(
      {
        success: true,
        message: `Category "${category.label}" created successfully`,
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Category with this name or slug already exists" 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete a category
// ============================================
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const force = searchParams.get("force") === "true";

    let query: any = {};
    if (id) query._id = id;
    else if (name) query.name = { $regex: new RegExp(`^${name}$`, 'i') };
    else {
      return NextResponse.json(
        { 
          success: false, 
          error: "Please provide either 'id' or 'name' parameter",
          example: "DELETE /api/categories?name=comparison"
        },
        { status: 400 }
      );
    }

    const category = await Category.findOne(query);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    if (category.articleCount > 0 && !force) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Category "${category.label}" has ${category.articleCount} articles. Use force=true to delete anyway.`,
          articleCount: category.articleCount,
        },
        { status: 409 }
      );
    }

    if (force) {
      await Category.findByIdAndDelete(category._id);
      return NextResponse.json({
        success: true,
        message: `Category "${category.label}" deleted permanently`,
      });
    } else {
      category.isActive = false;
      await category.save();
      return NextResponse.json({
        success: true,
        message: `Category "${category.label}" deactivated`,
        data: category,
      });
    }
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT - Update a category
// ============================================
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const body = await request.json();

    let query: any = {};
    if (id) query._id = id;
    else if (name) query.name = { $regex: new RegExp(`^${name}$`, 'i') };
    else {
      return NextResponse.json(
        { 
          success: false, 
          error: "Please provide either 'id' or 'name' parameter" 
        },
        { status: 400 }
      );
    }

    // Remove _id, __v, createdAt, updatedAt from update body
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    const category = await Category.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error: any) {
    console.error("Error updating category:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Category with this name or slug already exists" 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category" },
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      { status: 500 }
    );
  }
}