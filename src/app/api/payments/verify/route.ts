import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Subscription from '@/models/Subscription';

const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? '';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      plan,
    } = await req.json();

    // Verify Razorpay signature
    const body     = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto
      .createHmac('sha256', RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 });
    }

    // Update payment record
    await Payment.findOneAndUpdate(
      { providerOrderId: razorpay_order_id },
      { status: 'success', providerPaymentId: razorpay_payment_id }
    );

    // Activate subscription
    await Subscription.updateMany({ userId, status: 'active' }, { status: 'cancelled' });

    const PRICES: Record<string, number> = { mobile: 149, standard: 499, premium: 799 };
    const now     = new Date();
    const expires = new Date(now);
    expires.setMonth(expires.getMonth() + 1);

    await Subscription.create({
      userId,
      plan,
      price:     PRICES[plan] ?? 499,
      status:    'active',
      startDate: now,
      endDate:   expires,
    });

    return NextResponse.json({ success: true, message: 'Payment verified & subscription activated.' });

  } catch (err) {
    console.error('[POST /api/payments/verify]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
