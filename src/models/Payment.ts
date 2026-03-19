import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  subscriptionId: mongoose.Types.ObjectId;
  method: 'card' | 'upi' | 'razorpay' | 'netbanking';
  gateway: 'stripe' | 'razorpay';
  amount: number; // in paise (INR)
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  stripePaymentIntentId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true },
    method:         { type: String, enum: ['card', 'upi', 'razorpay', 'netbanking'], required: true },
    gateway:        { type: String, enum: ['stripe', 'razorpay'], required: true },
    amount:         { type: Number, required: true },
    currency:       { type: String, default: 'INR' },
    status:         { type: String, enum: ['pending', 'success', 'failed', 'refunded'], default: 'pending' },
    gatewayOrderId:      { type: String },
    gatewayPaymentId:    { type: String },
    gatewaySignature:    { type: String },
    stripePaymentIntentId: { type: String },
    metadata:       { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;
