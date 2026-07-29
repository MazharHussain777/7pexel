// @ts-nocheck
// app/api/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Subscription } from "@/lib/models/Subscription";

// ============================================
// POST - Unsubscribe an email
// ============================================
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, hardDelete = false } = body;

    console.log(`📧 Unsubscribe request for: ${email}`);

    // Validate email
    if (!email || !email.includes('@')) {
      console.log(`❌ Invalid email: ${email}`);
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address",
          code: "INVALID_EMAIL",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`🔍 Looking for: ${normalizedEmail}`);

    // Check if subscription exists
    const existingSubscription = await Subscription.findOne({ 
      email: normalizedEmail 
    });

    if (!existingSubscription) {
      console.log(`❌ Email not found: ${normalizedEmail}`);
      return NextResponse.json(
        {
          success: false,
          error: "Email not found in our system",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    console.log(`📊 Current status: isActive=${existingSubscription.isActive}`);

    if (!existingSubscription.isActive) {
      console.log(`⚠️ Already unsubscribed: ${normalizedEmail}`);
      return NextResponse.json(
        {
          success: false,
          error: "Already unsubscribed",
          code: "ALREADY_UNSUBSCRIBED",
          data: {
            email: normalizedEmail,
            unsubscribedAt: existingSubscription.unsubscribedAt,
          },
        },
        { status: 409 }
      );
    }

    let subscription;
    let message;

    if (hardDelete) {
      // Hard delete - permanently remove from database
      subscription = await Subscription.hardDelete(normalizedEmail);
      message = `Email ${normalizedEmail} permanently deleted from database`;
      console.log(`🗑️ Hard deleted: ${normalizedEmail}`);
    } else {
      // Soft delete - mark as inactive
      subscription = await Subscription.unsubscribe(normalizedEmail);
      message = `Email ${normalizedEmail} unsubscribed successfully`;
      console.log(`✅ Soft deleted (inactive): ${normalizedEmail}`);
    }

    // Log the result
    console.log(`📝 Result:`, {
      email: normalizedEmail,
      isActive: subscription?.isActive || false,
      unsubscribedAt: subscription?.unsubscribedAt || new Date(),
      hardDelete,
    });

    return NextResponse.json({
      success: true,
      message,
      code: "UNSUBSCRIBED",
      data: {
        email: normalizedEmail,
        isActive: subscription?.isActive || false,
        unsubscribedAt: subscription?.unsubscribedAt || new Date(),
        hardDelete,
      },
    });
  } catch (error: any) {
    console.error("❌ Error unsubscribing:", error);

    if (error.message === "Subscription not found") {
      return NextResponse.json(
        {
          success: false,
          error: "Email not found in our system",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    if (error.message === "Already unsubscribed") {
      return NextResponse.json(
        {
          success: false,
          error: "Already unsubscribed",
          code: "ALREADY_UNSUBSCRIBED",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to unsubscribe",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

// ============================================
// GET - Check subscription status
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email",
        },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!subscription) {
      return NextResponse.json({
        success: true,
        data: {
          email: email.toLowerCase().trim(),
          isActive: false,
          exists: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        email: subscription.email,
        isActive: subscription.isActive,
        exists: true,
        subscribedAt: subscription.subscribedAt,
        unsubscribedAt: subscription.unsubscribedAt,
      },
    });
  } catch (error: any) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to check subscription",
      },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Hard delete a subscription (Admin)
// ============================================
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email",
        },
        { status: 400 }
      );
    }

    const subscription = await Subscription.hardDelete(email);

    return NextResponse.json({
      success: true,
      message: `Subscription for ${email} permanently deleted`,
      data: subscription,
    });
  } catch (error: any) {
    console.error("Error hard deleting subscription:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete subscription",
      },
      { status: 500 }
    );
  }
}