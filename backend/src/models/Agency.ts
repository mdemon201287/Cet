// src/models/Agency.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IAgency extends Document {
  name: string;
  location: string;
  teamSize: string; // Keep as string
  rate: string;
  description?: string;
  image?: string;
  rating: number;
}

const agencySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  teamSize: { type: String, required: true }, // Ensure this is a string
  rate: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  rating: { type: Number, min: 0, max: 5, required: true }
});

const Agency = mongoose.model<IAgency>('Agency', agencySchema);

export default Agency;

