// lib/newsletter-service.ts
import dbConnect from './mongodb';
import Newsletter, { INewsletter } from '@/models/Newsletter';

// ─── SUBSCRIBE ──────────────────────────────────────────

export async function subscribeEmail(
  email: string,
  options?: { ipAddress?: string; userAgent?: string; source?: string }
): Promise<{ success: boolean; message: string; data?: INewsletter; isNew?: boolean }> {
  try {
    await dbConnect();

    // Validate email - client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { 
        success: false, 
        message: 'Please enter a valid email address (e.g., name@domain.com)' 
      };
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email exists
    const existing = await Newsletter.findOne({ email: normalizedEmail });

    if (existing) {
      if (existing.isActive) {
        return { 
          success: false, 
          message: 'This email is already subscribed! ✅',
          data: existing,
          isNew: false,
        };
      } else {
        // Reactivate
        existing.isActive = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = undefined;
        if (options?.ipAddress) existing.ipAddress = options.ipAddress;
        if (options?.userAgent) existing.userAgent = options.userAgent;
        if (options?.source) existing.source = options.source;
        await existing.save();
        return { 
          success: true, 
          message: 'Welcome back! 🎉 Your subscription has been reactivated.',
          data: existing,
          isNew: false,
        };
      }
    }

    // Create new subscription
    const newSubscription = new Newsletter({
      email: normalizedEmail,
      isActive: true,
      subscribedAt: new Date(),
      ipAddress: options?.ipAddress || 'unknown',
      userAgent: options?.userAgent || 'unknown',
      source: options?.source || 'website',
    });

    await newSubscription.save();

    return {
      success: true,
      message: '🎉 You\'re subscribed! Check your email for confirmation.',
      data: newSubscription,
      isNew: true,
    };
  } catch (error: any) {
    console.error('Error in subscribeEmail:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return { 
        success: false, 
        message: 'This email is already subscribed! ✅' 
      };
    }
    
    // Handle validation error
    if (error.name === 'ValidationError') {
      return { 
        success: false, 
        message: 'Please enter a valid email address' 
      };
    }
    
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    };
  }
}

// ─── UNSUBSCRIBE ────────────────────────────────────────

export async function unsubscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Newsletter.findOne({ email: normalizedEmail });

    if (!existing) {
      return { success: false, message: 'Email not found in our records' };
    }

    if (!existing.isActive) {
      return { success: true, message: 'You are already unsubscribed' };
    }

    existing.isActive = false;
    existing.unsubscribedAt = new Date();
    await existing.save();

    return { 
      success: true, 
      message: 'You have been unsubscribed successfully. We\'ll miss you! 💔' 
    };
  } catch (error) {
    console.error('Error in unsubscribeEmail:', error);
    return { 
      success: false, 
      message: 'Failed to unsubscribe. Please try again.' 
    };
  }
}

// ─── GET SUBSCRIBER ─────────────────────────────────────

export async function getSubscriber(email: string): Promise<INewsletter | null> {
  try {
    await dbConnect();
    return await Newsletter.findOne({ email: email.toLowerCase().trim() }).lean();
  } catch (error) {
    console.error('Error in getSubscriber:', error);
    return null;
  }
}

export async function getActiveSubscribers(limit?: number): Promise<INewsletter[]> {
  try {
    await dbConnect();
    const query = Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    if (limit) query.limit(limit);
    return await query.lean();
  } catch (error) {
    console.error('Error in getActiveSubscribers:', error);
    return [];
  }
}

export async function getAllSubscribers(): Promise<INewsletter[]> {
  try {
    await dbConnect();
    return await Newsletter.find({}).sort({ subscribedAt: -1 }).lean();
  } catch (error) {
    console.error('Error in getAllSubscribers:', error);
    return [];
  }
}

// ─── STATS ──────────────────────────────────────────────

export async function getNewsletterStats(): Promise<{
  total: number;
  active: number;
  inactive: number;
  newToday: number;
  newThisWeek: number;
}> {
  try {
    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [total, active, inactive, newToday, newThisWeek] = await Promise.all([
      Newsletter.countDocuments({}),
      Newsletter.countDocuments({ isActive: true }),
      Newsletter.countDocuments({ isActive: false }),
      Newsletter.countDocuments({ createdAt: { $gte: today } }),
      Newsletter.countDocuments({ createdAt: { $gte: weekAgo } }),
    ]);

    return { total, active, inactive, newToday, newThisWeek };
  } catch (error) {
    console.error('Error in getNewsletterStats:', error);
    return { total: 0, active: 0, inactive: 0, newToday: 0, newThisWeek: 0 };
  }
}

// ─── DELETE ─────────────────────────────────────────────

export async function deleteSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const result = await Newsletter.deleteOne({ email: email.toLowerCase().trim() });
    if (result.deletedCount === 0) {
      return { success: false, message: 'Email not found' };
    }
    return { success: true, message: 'Subscriber removed successfully' };
  } catch (error) {
    console.error('Error in deleteSubscriber:', error);
    return { success: false, message: 'Failed to delete subscriber' };
  }
}

export async function deleteAllSubscribers(): Promise<number> {
  try {
    await dbConnect();
    const result = await Newsletter.deleteMany({});
    return result.deletedCount || 0;
  } catch (error) {
    console.error('Error in deleteAllSubscribers:', error);
    return 0;
  }
}