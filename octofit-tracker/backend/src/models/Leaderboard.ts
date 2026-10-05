import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;