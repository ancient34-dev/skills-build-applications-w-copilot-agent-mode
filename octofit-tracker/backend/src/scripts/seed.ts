import mongoose from 'mongoose';
import activity from '../models/Activity.js';
import leaderboard from '../models/Leaderboard.js';
import team from '../models/Team.js';
import user from '../models/User.js';
import workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const seedIds = {
  user: new mongoose.Types.ObjectId('64a000000000000000000001'),
  team: new mongoose.Types.ObjectId('64a000000000000000000002'),
  activity: new mongoose.Types.ObjectId('64a000000000000000000003'),
  leaderboard: new mongoose.Types.ObjectId('64a000000000000000000004'),
  workout: new mongoose.Types.ObjectId('64a000000000000000000005'),
};

// Seed the octofit_db database with test data.
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      user.deleteMany({ _id: seedIds.user }),
      team.deleteMany({ _id: seedIds.team }),
      activity.deleteMany({ _id: seedIds.activity }),
      leaderboard.deleteMany({ _id: seedIds.leaderboard }),
      workout.deleteMany({ _id: seedIds.workout }),
    ]);

    await user.create({
      _id: seedIds.user,
      username: 'demo-mona',
      email: 'mona@example.test',
      passwordHash: 'seed-only-not-a-real-password-hash',
      displayName: 'Mona',
      team: seedIds.team,
    });
    await team.create({
      _id: seedIds.team,
      name: 'Demo Octocats',
      description: 'A sample team for local development',
      members: [seedIds.user],
      totalPoints: 35,
    });
    await activity.create({
      _id: seedIds.activity,
      user: seedIds.user,
      type: 'running',
      durationMinutes: 25,
      distanceKm: 3.5,
      points: 35,
      occurredAt: new Date('2026-10-01T16:00:00.000Z'),
    });
    await leaderboard.create({
      _id: seedIds.leaderboard,
      period: 'weekly',
      periodStart: new Date('2026-09-28T00:00:00.000Z'),
      periodEnd: new Date('2026-10-04T23:59:59.999Z'),
      user: seedIds.user,
      team: seedIds.team,
      points: 35,
      rank: 1,
    });
    await workout.create({
      _id: seedIds.workout,
      name: 'Easy Interval Run',
      description: 'Alternate a comfortable jog with short walking breaks.',
      activityType: 'running',
      difficulty: 'beginner',
      durationMinutes: 20,
      targetLevel: 'beginner',
    });

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
