import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import AuditLog from '@/models/AuditLog';

const JWT_SECRET = process.env.JWT_SECRET ?? 'unified-ott-dev-secret';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Refresh token (stored in DB)
    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    user.refreshToken = refreshToken;
    await user.save();

    await AuditLog.create({
      userId: user._id,
      action: 'signin',
      ip:     req.headers.get('x-forwarded-for') ?? 'unknown',
    });

    return NextResponse.json({
      success: true,
      token,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

  } catch (err) {
    console.error('[/api/auth/signin]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
