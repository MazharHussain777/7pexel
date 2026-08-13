// app/api/laptops/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllBrands,
  getAllBrandsWithCounts,
  createBrand,
  seedBrands,
} from '@/lib/laptop-brand-service';
import dbConnect from '@/lib/mongodb';
import Laptop from '@/models/Laptop';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const slug = searchParams.get('slug');
    const name = searchParams.get('name');
    const includeCounts = searchParams.get('includeCounts') === 'true';
    
    // Seed brands
    if (action === 'seed') {
      const brands = await seedBrands();
      return NextResponse.json({
        success: true,
        message: 'Brands seeded successfully',
        data: brands,
        total: brands.length,
      });
    }
    
    // Get single brand by slug
    if (slug) {
      const { getBrandBySlug } = await import('@/lib/laptop-brand-service');
      const brand = await getBrandBySlug(slug);
      if (!brand) {
        return NextResponse.json(
          { success: false, error: 'Brand not found' },
          { status: 404 }
        );
      }
      
      // Get laptop count
      const count = await Laptop.countDocuments({ 
        brand: brand.name, 
        published: true 
      });
      
      return NextResponse.json({
        success: true,
        data: { ...brand, count },
      });
    }
    
    // Get brand by name
    if (name) {
      const { getBrandByName } = await import('@/lib/laptop-brand-service');
      const brand = await getBrandByName(name);
      if (!brand) {
        return NextResponse.json(
          { success: false, error: 'Brand not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: brand,
      });
    }
    
    // Get all brands
    const brands = includeCounts 
      ? await getAllBrandsWithCounts()
      : await getAllBrands();
    
    return NextResponse.json({
      success: true,
      data: brands,
      total: brands.length,
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }
    
    // Check if brand already exists
    const { getBrandBySlug } = await import('@/lib/laptop-brand-service');
    const existing = await getBrandBySlug(body.slug);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Brand with this slug already exists' },
        { status: 409 }
      );
    }
    
    // Set defaults
    if (!body.icon) body.icon = '💻';
    if (!body.emoji) body.emoji = '💻';
    if (!body.color) body.color = '#555555';
    if (!body.primaryColor) body.primaryColor = body.color;
    if (!body.secondaryColor) body.secondaryColor = body.color;
    if (!body.description) body.description = `${body.name} laptops and devices.`;
    if (!body.isActive) body.isActive = true;
    
    // Generate meta title if not provided
    if (!body.metaTitle) {
      body.metaTitle = `${body.name} Laptops — Expert Reviews & Buying Guide | 7pexel`;
    }
    
    // Generate meta description if not provided
    if (!body.metaDescription) {
      body.metaDescription = `Explore the best ${body.name} laptops with expert reviews, specifications, and comparisons.`;
    }
    
    const brand = await createBrand(body);
    
    return NextResponse.json({
      success: true,
      data: brand,
      message: 'Brand created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating brand:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Brand with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create brand' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { slug, ...updates } = body;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }
    
    const { updateBrand } = await import('@/lib/laptop-brand-service');
    const updated = await updateBrand(slug, updates);
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      );
    }
    
    // Revalidate paths
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/laptops');
    revalidatePath('/laptops/finder');
    revalidatePath(`/laptops/brand/${slug}`);
    if (updates.slug && updates.slug !== slug) {
      revalidatePath(`/laptops/brand/${updates.slug}`);
    }
    
    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Brand updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating brand:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Brand with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update brand' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }
    
    const { deleteBrand } = await import('@/lib/laptop-brand-service');
    await deleteBrand(slug);
    
    // Revalidate paths
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/laptops');
    revalidatePath('/laptops/finder');
    revalidatePath(`/laptops/brand/${slug}`);
    
    return NextResponse.json({
      success: true,
      message: 'Brand deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete brand' },
      { status: error.message.includes('Cannot delete') ? 409 : 500 }
    );
  }
}