import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import filesRouter from './routes/files.js';

const app = express();

// Allow all origins (CORS)
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/files', filesRouter);

app.get('/', (req, res) => {
  res.send('NotesGlory backend running!');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });
