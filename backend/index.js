import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());


import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';




app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('NotesGlory backend running!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect(process.env.MONGODB_URI)
export default app;
