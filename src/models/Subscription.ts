import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  plan: 'mobile' | 'standard' | 'premium';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan:      { type: String, enum: ['mobile', 'standard', 'premium'], required: true },
    status:    { type: String, enum: ['active', 'cancelled', 'expired', 'pending'], default: 'pending' },
    startDate: { type: Date },
    endDate:   { type: Date },
    autoRenew: { type: Boolean, default: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;
