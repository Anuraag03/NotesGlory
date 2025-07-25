import express from 'express';
import Note from '../models/Note.js';
import { authenticateToken } from '../utilities.js';

const router = express.Router();

// Get all notes for user
router.get('/', authenticateToken, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
  res.json(notes);
});

// Create note
router.post('/', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const note = new Note({ user: req.user.id, title, content, tags });
  await note.save();
  res.status(201).json(note);
});

// Update note
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, content, tags, isPinned },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// Delete note
router.delete('/:id', authenticateToken, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json({ message: 'Note deleted' });
});

// Pin/unpin note
router.patch('/:id/pin', authenticateToken, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { isPinned: req.body.isPinned },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

export default router;
