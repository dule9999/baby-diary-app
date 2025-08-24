import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './db';
import { initDb } from './dbInit';
import authRoutes from './routes/authRoutes';
import babyRoutes from './routes/babyRoutes';
import entryRoutes from './routes/entryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Baby Diary Backend is running!');
});

app.use('/auth', authRoutes);
app.use('/api/babies', babyRoutes);
app.use('/api', entryRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testConnection(); // test DB when server starts
  await initDb();         // ensure the entries table exists
});
