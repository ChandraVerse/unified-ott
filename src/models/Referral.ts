import { Schema, model, models } from 'mongoose';

const ReferralSchema = new Schema(
  {
    code:       { type: String, required: true },
    referrerId: { type: Schema.Types.ObjectId, ref: 'User' },
    referredId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status:     { type: String, enum: ['pending', 'rewarded', 'expired'], default: 'pending' },
  },
  { timestamps: true }
);

const Referral = models.Referral ?? model('Referral', ReferralSchema);
export default Referral;
