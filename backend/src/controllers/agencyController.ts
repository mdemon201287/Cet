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

const createAgency = async (req: Request, res: Response) => {
    const { name, category, description, location, teamSize, rate, rating } = req.body;

    // Validate teamSize to ensure it's a number
    const parsedTeamSize = Number(teamSize);
    if (isNaN(parsedTeamSize)) {
        return res.status(400).json({ message: "teamSize must be a number" });
    }

    const newAgency = new Agency({
        name,
        category,
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
    const { name, category, description, location, teamSize, rate, rating } = req.body;

    // Validate and parse fields as needed
    const updateFields: any = {
        name,
        category,
        description,
        location,
        rate,
        rating: Number(rating) || 0,
    };

    // Parse teamSize if provided
    if (teamSize !== undefined) {
        const parsedTeamSize = Number(teamSize);
        if (isNaN(parsedTeamSize)) {
            return res.status(400).json({ message: "teamSize must be a number" });
        }
        updateFields.teamSize = parsedTeamSize;
    }

    // Include image path if a new file is uploaded
    if (req.file) {
        updateFields.image = req.file.path;
    }

    try {
        const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updatedAgency) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(updatedAgency);
    } catch (error) {
        console.error('Error updating agency:', error);
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

