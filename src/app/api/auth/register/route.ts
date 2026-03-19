import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Referral from '@/models/Referral';
import AuditLog from '@/models/AuditLog';

const JWT_SECRET = process.env.JWT_SECRET ?? 'unified-ott-dev-secret';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, refCode } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email:    email.toLowerCase(),
      password: hashed,
      role:     'user',
    });

    // Handle referral
    if (refCode) {
      await Referral.create({
        code:       refCode,
        referredId: user._id,
        status:     'pending',
      });
    }

    // JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    await AuditLog.create({
      userId: user._id,
      action: 'register',
      ip:     req.headers.get('x-forwarded-for') ?? 'unknown',
    });

    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    }, { status: 201 });

  } catch (err) {
    console.error('[/api/auth/register]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
