import { Schema, model, models } from 'mongoose';

const PaymentSchema = new Schema(
  {
    userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan:             { type: String, required: true },
    amount:           { type: Number, required: true },
    method:           { type: String, enum: ['card', 'upi', 'razorpay', 'netbanking', 'stripe'], required: true },
    providerOrderId:  { type: String },
    providerPaymentId:{ type: String },
    status:           { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

const Payment = models.Payment ?? model('Payment', PaymentSchema);
export default Payment;
