// routes/files.js
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { Readable } from 'stream';

const filesRouter = express.Router();

// Use memory storage to handle file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

let bucket; // GridFS bucket reference

// Initialize GridFSBucket once Mongoose connects
mongoose.connection.once('open', () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
  console.log('GridFSBucket initialized');
});

// Upload file to MongoDB GridFS
filesRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const readableStream = Readable.from(req.file.buffer);

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype
  });

  readableStream.pipe(uploadStream)
    .on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed' });
    })
    .on('finish', (file) => {
      // file argument contains the uploaded file's metadata
      res.status(201).json({
        message: 'File uploaded successfully',
        id: uploadStream.id,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        uploadDate: new Date(),
        length: req.file.size
      });
    });
});

// Download file by ID
filesRouter.get('/:id', (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('error', () => {
      res.status(404).json({ error: 'File not found' });
    });

    downloadStream.pipe(res);
  } catch (err) {
    res.status(400).json({ error: 'Invalid file ID' });
  }
});

// List all files (metadata only)
filesRouter.get('/', async (req, res) => {
  try {
    const files = await bucket.find({}).toArray();
    const fileMetadata = files.map(f => ({
      id: f._id,
      filename: f.filename,
      contentType: f.contentType,
      uploadDate: f.uploadDate,
      length: f.length,
    }));
    res.json(fileMetadata);
  } catch (err) {
    console.error('Error listing files:', err);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Delete file by ID
filesRouter.delete('/:id', async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    await bucket.delete(fileId);
    res.json({ message: 'File deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default filesRouter;
