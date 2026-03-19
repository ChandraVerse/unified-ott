import { Schema, model, models } from 'mongoose';

const SubscriptionSchema = new Schema(
  {
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan:      { type: String, enum: ['mobile', 'standard', 'premium'], required: true },
    price:     { type: Number, required: true },
    status:    { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate:   { type: Date, required: true },
  },
  { timestamps: true }
);

const Subscription = models.Subscription ?? model('Subscription', SubscriptionSchema);
export default Subscription;
