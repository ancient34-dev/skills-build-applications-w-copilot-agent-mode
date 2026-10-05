import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength-training', 'cycling', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, min: 0, default: 0 },
    occurredAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;