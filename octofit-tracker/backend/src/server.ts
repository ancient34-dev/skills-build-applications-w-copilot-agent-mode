import express, { type RequestHandler } from 'express';
import './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const collectionHandler = (read: () => Promise<unknown>): RequestHandler =>
  async (_request, response, next) => {
    try {
      response.json(await read());
    } catch (error) {
      next(error);
    }
  };

app.use(express.json());
app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.get('/api/users/', collectionHandler(async () => User.find().lean()));
app.get('/api/teams/', collectionHandler(async () => Team.find().lean()));
app.get('/api/activities/', collectionHandler(async () => Activity.find().lean()));
app.get('/api/leaderboard/', collectionHandler(async () => Leaderboard.find().lean()));
app.get('/api/workouts/', collectionHandler(async () => Workout.find().lean()));

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});