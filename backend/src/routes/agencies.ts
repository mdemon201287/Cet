// src/routes/agencies.ts

import express, { Request, Response } from 'express';
import multer from 'multer';
import Agency, { IAgency } from '../models/Agency';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set up storage location for images

// POST: Create a new agency
router.post('/', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location, teamSize, rate, description, rating } = req.body;
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path; // Store the image path
    }

    const newAgency: IAgency = new Agency({
      name,
      location,
      teamSize: Number(teamSize), // Ensure teamSize is a number
      rate,
      description,
      image: imagePath,
      rating: Number(rating), // Ensure rating is a number
    });

    await newAgency.save();
    res.status(201).json(newAgency); // Send the response
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send the response
  }
});

// PUT: Update an existing agency by ID
router.put('/:id', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updateFields: Partial<IAgency> = {
      ...req.body,
      teamSize: Number(req.body.teamSize), // Ensure teamSize is a number
      rating: Number(req.body.rating), // Ensure rating is a number
    };

    if (req.file) {
      updateFields.image = req.file.path; // Update image if provided
    }

    const updatedAgency = await Agency.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedAgency) {
      res.status(404).json({ message: 'Agency not found' });
      return; // Make sure to return after sending a response
    }

    res.status(200).json(updatedAgency); // Send the response
  } catch (error) {
    console.error('Error updating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send the response
  }
});

// GET: Fetch all agencies
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const agencies = await Agency.find();
    res.json(agencies); // Send the response
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send the response
  }
});

// GET: Fetch an agency by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      res.status(404).json({ message: 'Agency not found' });
      return; // Make sure to return after sending a response
    }
    res.json(agency); // Send the response
  } catch (error) {
    console.error('Error fetching agency:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send the response
  }
});

// DELETE: Delete an agency by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedAgency = await Agency.findByIdAndDelete(id);
    if (!deletedAgency) {
      res.status(404).json({ message: 'Agency not found' });
      return; // Make sure to return after sending a response
    }
    res.status(204).send(); // Send the response
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Send the response
  }
});

export default router;
