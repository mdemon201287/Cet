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

    // Handle image upload
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
      rating: Number(rating) // Ensure rating is a number
    });

    await newAgency.save();
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
