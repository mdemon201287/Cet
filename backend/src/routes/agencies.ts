import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import Agency, { IAgency } from '../models/Agency';

const router = express.Router();

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const upload = multer({ dest: uploadDir });

// POST: Create a new agency
router.post('/', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, location, teamSize, rate, description, rating, featured } = req.body;
    const newAgency: IAgency = new Agency({
      name,
      category,
      location,
      teamSize: Number(teamSize),
      rate,
      description,
      image: req.file?.path || '',
      rating: Number(rating),
      featured: featured === 'true',
    });

    await newAgency.save();
    res.status(201).json(newAgency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT: Update an existing agency by ID
router.put('/:id', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updateFields: Partial<IAgency> = {
      ...req.body,
      teamSize: Number(req.body.teamSize),
      rating: Number(req.body.rating),
      featured: req.body.featured === 'true',
    };

    if (req.file) updateFields.image = req.file.path;

    const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updatedAgency) {
      res.status(404).json({ message: 'Agency not found' });
      return;
    }

    res.json(updatedAgency);
  } catch (error) {
    console.error('Error updating agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch all agencies
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const agencies = await Agency.find();
    res.json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch an agency by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      res.status(404).json({ message: 'Agency not found' });
      return;
    }
    res.json(agency);
  } catch (error) {
    console.error('Error fetching agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch featured agencies
router.get('/featured', async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredAgencies = await Agency.find({ featured: true });
    res.json(featuredAgencies);
  } catch (error) {
    console.error('Error fetching featured agencies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE: Delete an agency by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedAgency = await Agency.findByIdAndDelete(req.params.id);
    if (!deletedAgency) {
      res.status(404).json({ message: 'Agency not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch distinct categories
router.get('/categories', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Agency.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch distinct subcategories under a category
router.get('/subcategories/:category', async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;
  try {
    const subCategories = await Agency.distinct('subCategory', { category });
    res.json(subCategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch agencies by category and subcategory
router.get('/agencies/:category/:subCategory', async (req: Request, res: Response): Promise<void> => {
  const { category, subCategory } = req.params;
  try {
    const agencies = await Agency.find({ category, subCategory });
    res.json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST: Add a new category
router.post('/categories', async (req: Request, res: Response): Promise<void> => {
  const { name, category, subCategory } = req.body;

  if (!name || !category) {
    res.status(400).json({ message: 'Name and category are required.' });
    return;
  }

  try {
    const newCategory = new Agency({
      name,
      category,
      subCategory,
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully!', newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
