import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:     { type: String, select: false },
    role:         { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshToken: { type: String, select: false },
    otp:          { type: String, select: false },
    otpExpires:   { type: Date,   select: false },
    avatarUrl:    { type: String },
    googleId:     { type: String },
    facebookId:   { type: String },
  },
  { timestamps: true }
);

const User = models.User ?? model('User', UserSchema);
export default User;
