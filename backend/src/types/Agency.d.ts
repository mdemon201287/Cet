// src/types/Agency.d.ts

export interface IAgency {
  name: string;
  location: string;
  teamSize: number; // Change from string to number
  rate: string;
  description?: string;
  image?: string;
  rating: number;
}
