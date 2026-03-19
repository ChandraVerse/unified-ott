import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET ?? 'unified-ott-dev-secret';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required.' }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+otp +otpExpires');
    if (!user || user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP.' }, { status: 401 });
    }
    if (user.otpExpires && new Date() > user.otpExpires) {
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 401 });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error('[/api/auth/verify-otp]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
