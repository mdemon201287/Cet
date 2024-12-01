// src/models/Agency.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IAgency extends Document {
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description?: string;
  image?: string;
  rating: number;
  category: string;
  subCategory?: string;  // Optional for subcategories
}

const agencySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  teamSize: { type: String, required: true },
  rate: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  rating: { type: Number, min: 0, max: 5, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },  // Optional subcategory field
});

const Agency = mongoose.model<IAgency>('Agency', agencySchema);

export default Agency;
