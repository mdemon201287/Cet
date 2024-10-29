// src/routes/agencies.ts


import express, { Request, Response } from 'express';
import { getAgencies, getAgency, createAgency, updateAgency, deleteAgency } from '../controllers/agencyController';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer to store images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure the 'uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Define routes correctly
router.get('/', async (req: Request, res: Response) => {
    await getAgencies(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await getAgency(req, res);
});

// Use multer middleware for file uploads in the create route
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    await createAgency(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await updateAgency(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await deleteAgency(req, res);
});

export default router;
