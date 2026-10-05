import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;