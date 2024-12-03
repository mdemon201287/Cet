import express, { Request, Response } from 'express';
import multer from 'multer';
import Agency from '../models/Agency';

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Add a new agency
router.post('/', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location, category, minBudget, hourlyRate, teamSize, description } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'File upload is required.' });
      return;
    }

    const newAgency = new Agency({
      name,
      location,
      category,
      minBudget,
      hourlyRate,
      teamSize,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newAgency.save();
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Failed to add agency.' });
  }
});

export default router;
