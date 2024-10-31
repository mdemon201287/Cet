// src/controllers/agencyController.ts

import { Request, Response } from 'express';
import Agency from '../models/Agency'; // Make sure the path is correctly referenced to the model

export const getAgencies = async (req: Request, res: Response) => {
    try {
        const agencies = await Agency.find();
        res.status(200).json(agencies);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch agencies' });
    }
};

export const getAgency = async (req: Request, res: Response) => {
    try {
        const agency = await Agency.findById(req.params.id);
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(agency);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch agency' });
    }
};

// export const createAgency = async (req: Request, res: Response) => {
//     try {
//         const { name, description, location, rate, teamSize, rating } = req.body;
//         const imagePath = req.file ? req.file.path : ''; // Get image path from multer

//         const newAgency = new Agency({
//             name,
//             description,
//             location,
//             teamSize,
//             rate,
//             rating,
//             image: imagePath, // Save image path to the database
//         });

//         await newAgency.save();
//         res.status(201).json(newAgency);
//     } catch (error) {
//         console.error('Error creating agency:', error); // Log the error for debugging
//         res.status(500).json({ message: 'Failed to create agency' });
//     }
// };

const createAgency = async (req: Request, res: Response) => {
    const { name, description, location, teamSize, rate, rating } = req.body;

    // Validate teamSize to ensure it's a number
    const parsedTeamSize = Number(teamSize);
    if (isNaN(parsedTeamSize)) {
        return res.status(400).json({ message: "teamSize must be a number" });
    }

    const newAgency = new Agency({
        name,
        description,
        location,
        teamSize: parsedTeamSize, // Use parsed number
        rate,
        rating: Number(rating) || 0,
        image: req.file ? req.file.path : '', // Use the image path if uploaded
    });

    try {
        const savedAgency = await newAgency.save();
        res.status(201).json(savedAgency);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create agency" });
    }
};

export const updateAgency = async (req: Request, res: Response) => {
    try {
        const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAgency) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(updatedAgency);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update agency' });
    }
};

export const deleteAgency = async (req: Request, res: Response) => {
    try {
        console.log('Attempting to delete agency with ID:', req.params.id);
        const deletedAgency = await Agency.findByIdAndDelete(req.params.id);
        if (!deletedAgency) {
            console.log('Agency not found');
            return res.status(404).json({ message: 'Agency not found' });
        }
        console.log('Agency deleted successfully');
        res.status(200).json({ message: 'Agency deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAgency:', error);
        res.status(500).json({ message: 'Failed to delete agency' });
    }
};

