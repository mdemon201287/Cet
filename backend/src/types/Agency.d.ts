// src/types/Agency.d.ts

export interface Agency {
  _id: string; // Ensure this field is included
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description?: string; // Optional if not all agencies have descriptions
  image?: string; // Optional if not all agencies have images
  rating: number;
  category: string;
}
