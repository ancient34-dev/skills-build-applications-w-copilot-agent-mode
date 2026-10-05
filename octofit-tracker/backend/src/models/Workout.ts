import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'strength-training', 'cycling', 'other'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true },
);

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;