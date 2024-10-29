// src/models/agency.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IAgency extends Document {
  name: string;
  description: string;
  location: string;
  teamSize: number;
  rate: string;
  rating: number;
  image?: string; // Optional, can be URL path or base64 string if you're storing images in the database
}

const AgencySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  teamSize: { type: Number, required: true },
  rate: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  image: { type: String } // Optional, for image URL or path
});

export default mongoose.model<IAgency>('Agency', AgencySchema);
