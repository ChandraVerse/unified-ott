import { Schema, model, models } from 'mongoose';

const AuditLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    ip:     { type: String },
    meta:   { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const AuditLog = models.AuditLog ?? model('AuditLog', AuditLogSchema);
export default AuditLog;
