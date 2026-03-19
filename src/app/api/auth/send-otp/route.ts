import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const otp     = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert OTP onto user (or create minimal record)
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp, otpExpires: expires },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from:    '"Unified OTT" <no-reply@unifiedott.com>',
      to:      email,
      subject: 'Your Unified OTT Sign-In OTP',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#020617;color:#fff;padding:32px;border-radius:12px">
          <h2 style="color:#e50914">Unified<span style="color:#fff">OTT</span></h2>
          <p style="color:rgba(255,255,255,0.6)">Your one-time password (valid for 10 minutes):</p>
          <div style="font-size:40px;font-weight:900;letter-spacing:0.3em;text-align:center;padding:24px;
                      background:rgba(229,9,20,0.1);border-radius:8px;border:1px solid rgba(229,9,20,0.3)">
            ${otp}
          </div>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:16px">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'OTP sent to email.' });

  } catch (err) {
    console.error('[/api/auth/send-otp]', err);
    return NextResponse.json({ error: 'Failed to send OTP.' }, { status: 500 });
  }
}
