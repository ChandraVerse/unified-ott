import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  refereeId: mongoose.Types.ObjectId;
  code: string;
  status: 'pending' | 'completed' | 'rewarded';
  rewardGiven: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrerId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refereeId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code:        { type: String, required: true, index: true },
    status:      { type: String, enum: ['pending', 'completed', 'rewarded'], default: 'pending' },
    rewardGiven: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Referral: Model<IReferral> =
  mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);
export default Referral;
