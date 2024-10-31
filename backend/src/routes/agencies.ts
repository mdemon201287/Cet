// src/routes/agencies.ts

import express from 'express';
import multer from 'multer';
import Agency from '../models/Agency';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set up storage location for images

// POST: Create a new agency
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, location, teamSize, rate, description, rating } = req.body;
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path; // Store the image path
    }

    const newAgency = new Agency({
      name,
      location,
      teamSize, // Keep as string
      rate,
      description,
      image: imagePath,
      rating: Number(rating), // Ensure rating is a number
    });

    await newAgency.save();
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT: Update an existing agency by ID
router.put('/:id', upload.single('image'), async (req, res): Promise<void> => {
  const { name, location, teamSize, rate, description, rating } = req.body;
  const { id } = req.params;

  (async (): Promise<void> => {
    try {
      const updateFields: any = {
        name,
        location,
        teamSize,
        rate,
        description,
        rating: Number(rating),
      };

      if (req.file) {
        updateFields.image = req.file.path;
      }

      const updatedAgency = await Agency.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedAgency) {
        res.status(404).json({ message: 'Agency not found' });
        return;
      }

      res.status(200).json(updatedAgency);
    } catch (error) {
      console.error('Error updating agency:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })();
});


// GET: Fetch all agencies
router.get('/', async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE: Delete an agency by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Agency.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
