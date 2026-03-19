import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import Stripe from 'stripe';
import { connectDB } from '@/lib/mongodb';
import Payment from '@/models/Payment';

const JWT_SECRET = process.env.JWT_SECRET ?? 'unified-ott-dev-secret';

const PRICES: Record<string, number> = { mobile: 149, standard: 499, premium: 799 };
const PLATFORM_FEE = 20;
const GST_RATE     = 0.18;

function getUserFromToken(req: NextRequest): { userId: string } | null {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { plan, method } = await req.json(); // method: 'razorpay' | 'stripe'
    const base = PRICES[plan];
    if (!base) return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });

    const subtotal = base + PLATFORM_FEE;
    const gst      = Math.round(subtotal * GST_RATE);
    const total    = subtotal + gst;

    let providerOrderId = '';
    let clientSecret    = '';

    if (method === 'razorpay') {
      const razorpay = new Razorpay({
        key_id:     process.env.RAZORPAY_KEY_ID    ?? '',
        key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
      });
      const order = await razorpay.orders.create({
        amount:   total * 100, // paise
        currency: 'INR',
        receipt:  `receipt_${Date.now()}`,
      });
      providerOrderId = order.id;

    } else {
      // Stripe
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', { apiVersion: '2025-02-24.acacia' });
      const intent = await stripe.paymentIntents.create({
        amount:   total * 100, // smallest unit (paise for INR)
        currency: 'inr',
        metadata: { plan, userId: user.userId },
      });
      providerOrderId = intent.id;
      clientSecret    = intent.client_secret ?? '';
    }

    await Payment.create({
      userId:          user.userId,
      plan,
      amount:          total,
      method,
      providerOrderId,
      status:          'pending',
    });

    return NextResponse.json({
      success: true,
      orderId: providerOrderId,
      clientSecret,
      total,
    });

  } catch (err) {
    console.error('[POST /api/payments/create-order]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
