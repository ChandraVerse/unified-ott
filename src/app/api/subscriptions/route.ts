import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Subscription from '@/models/Subscription';

const JWT_SECRET = process.env.JWT_SECRET ?? 'unified-ott-dev-secret';

function getUserFromToken(req: NextRequest): { userId: string } | null {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    const decoded = jwt.verify(auth.slice(7), JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const sub = await Subscription.findOne({ userId: user.userId, status: 'active' })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: sub });

  } catch (err) {
    console.error('[GET /api/subscriptions]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { plan } = await req.json();
    const PRICES: Record<string, number> = { mobile: 149, standard: 499, premium: 799 };

    if (!PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });
    }

    // Deactivate existing
    await Subscription.updateMany({ userId: user.userId, status: 'active' }, { status: 'cancelled' });

    const now     = new Date();
    const expires = new Date(now);
    expires.setMonth(expires.getMonth() + 1);

    const sub = await Subscription.create({
      userId:    user.userId,
      plan,
      price:     PRICES[plan],
      status:    'active',
      startDate: now,
      endDate:   expires,
    });

    return NextResponse.json({ success: true, data: sub }, { status: 201 });

  } catch (err) {
    console.error('[POST /api/subscriptions]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
