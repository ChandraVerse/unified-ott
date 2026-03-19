import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  avatar?: string;
  provider: 'local' | 'google' | 'facebook';
  providerId?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  refreshToken?: string;
  subscriptionId?: mongoose.Types.ObjectId;
  referralCode?: string;
  referredBy?: string;
  watchHistory: mongoose.Types.ObjectId[];
  watchlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:  { type: String },
    avatar:        { type: String },
    provider:      { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
    providerId:    { type: String },
    isVerified:    { type: Boolean, default: false },
    otp:           { type: String },
    otpExpiry:     { type: Date },
    refreshToken:  { type: String },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    referralCode:  { type: String, unique: true, sparse: true },
    referredBy:    { type: String },
    watchHistory:  [{ type: Schema.Types.ObjectId, ref: 'Content' }],
    watchlist:     [{ type: Schema.Types.ObjectId, ref: 'Content' }],
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ referralCode: 1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
